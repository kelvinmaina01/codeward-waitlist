if (typeof process !== 'undefined' && process.env) {
  process.env.POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_POSTGRES_URL || process.env.DATABASE_URL;
}

import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { sendWaitlistEmail, sendResendWithRetry, sendWeeklyDigestEmail, getSql } from './index'

function getDb(c?: any) {
  return getSql(c);
}

type Bindings = {
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  RESEND_API_KEY?: string
}

const admin = new Hono<{ Bindings: Bindings }>()

// ── Auto DB Schema Upgrade ──
let dbMigrated = false;
async function ensureSchemaUpgraded(c: any) {
  if (dbMigrated) return;
  try {
    const client = await getDb(c).connect();
    await client.query(`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';`);
    await client.query(`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP;`);
    await client.query(`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS last_email_error TEXT;`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS daily_milestones (
        day DATE PRIMARY KEY,
        milestone_10_sent INTEGER DEFAULT 0
      );
    `);
    dbMigrated = true;
  } catch (e) {
    console.error('Failed schema upgrade:', e);
  }
}

// ── Session Middleware ──
admin.use('*', async (c, next) => {
  const path = new URL(c.req.url).pathname
  if (path === '/admin/login' || path.startsWith('/static/')) {
    return next()
  }
  
  const expectedSession = c.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'paraKenya8#'
  const session = getCookie(c, 'codeward_admin_session')
  
  if (session === expectedSession) {
    await ensureSchemaUpgraded(c);
    return next()
  }
  
  return c.redirect('/admin/login')
})

// ── Lead Priority Scoring Algorithm ──
export function calculatePriorityScore(entry: { email: string; role: string; company?: string | null; github?: string | null }) {
  let score = 0;
  const emailDomain = (entry.email.split('@')[1] || '').toLowerCase();
  const freeMail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'proton.me', 'protonmail.com', 'aol.com', 'live.com', 'yandex.com', 'mail.com'];
  
  if (emailDomain && !freeMail.includes(emailDomain)) {
    score += 35; // Corporate domain
  }
  
  const seniorRoles = ['senior-engineer', 'engineering-lead', 'cto-vp', 'founder', 'security-engineer', 'devops-platform'];
  if (seniorRoles.includes(entry.role)) {
    score += 30;
  }
  
  if (entry.github && entry.github.trim().length > 0) {
    score += 20;
  }
  
  if (entry.company && entry.company.trim().length > 0) {
    score += 15;
  }
  
  if (score >= 65) return { score, label: '🔥 High', class: 'priority-high', level: 'high' };
  if (score >= 35) return { score, label: '⚡ Medium', class: 'priority-medium', level: 'medium' };
  return { score, label: '🟢 Standard', class: 'priority-standard', level: 'standard' };
}

// ── Beta Invitation Email Dispatch ──
export async function sendBetaInviteEmail(env: any, email: string, name: string, position: number): Promise<{ ok: boolean; error?: string }> {
  const inviteHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="color-scheme" content="dark">
</head>
<body style="margin:0;padding:32px 16px;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#0d1117;border:1px solid #22232a;border-radius:12px;overflow:hidden;">
  <tr>
    <td style="padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:24px;margin-bottom:12px;">Your Codeward Access is Ready! 🎉</h1>
      <p style="color:#c9d1d9;font-size:15px;line-height:24px;margin-bottom:24px;">
        Hi ${escapeHtml(name)}, your spot in the Codeward private beta is now active. Your repository sandboxes and 11 review agents are standing by.
      </p>
      <a href="https://app.codeward.cloud/onboarding?token=beta_access_${position}" style="display:inline-block;background:#22c55e;color:#000000;font-weight:600;font-size:15px;padding:14px 28px;border-radius:99px;text-decoration:none;">
        Access Codeward Sandbox &rarr;
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;

  return sendResendWithRetry(env, {
    from: 'Codeward <founders@codeward.cloud>',
    to: [email],
    subject: '🎉 Your Codeward Early Access is Ready!',
    html: inviteHtml
  });
}

// ── Admin Login Page ──
admin.get('/login', (c) => {
  const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Admin Login — Codeward</title>
<link rel="icon" type="image/gif" href="/static/images/logo.gif"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/admin.css"/>
<style>
  body {
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .login-card {
    background: #09090b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-header img {
    width: 48px;
    border-radius: 50%;
    margin-bottom: 16px;
  }
  .login-header h1 {
    font-size: 24px;
    margin: 0;
    font-weight: 600;
  }
  .field {
    margin-bottom: 20px;
  }
  .field label {
    display: block;
    margin-bottom: 8px;
    color: #a1a1aa;
    font-size: 14px;
  }
  .field input {
    width: 100%;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 12px;
    padding: 12px 16px;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .field input:focus {
    outline: none;
    border-color: #22c55e;
  }
  .login-btn {
    width: 100%;
    background: #fff;
    color: #000;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }
  .login-btn:hover { background: #f4f4f5; }
  .error-msg {
    color: #ef4444;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    display: none;
  }
  .error-msg.visible { display: block; }
</style>
</head>
<body>
  <div class="login-card">
    <div class="login-header">
      <img src="/static/images/logo.gif" alt="Codeward" />
      <h1>Admin Login</h1>
    </div>
    <div class="error-msg ${c.req.query('error') ? 'visible' : ''}">Invalid username or password.</div>
    <form method="post" action="/admin/login">
      <div class="field">
        <label>Username</label>
        <input type="text" name="username" required autofocus />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit" class="login-btn">Sign in</button>
    </form>
  </div>
</body>
</html>`
  return c.html(html)
})

admin.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const expectedUser = c.env.ADMIN_USERNAME || process.env.ADMIN_USERNAME || 'kelvin.reallife8@gmail.com'
  const expectedPass = c.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'paraKenya8#'
  
  if (body.username === expectedUser && body.password === expectedPass) {
    setCookie(c, 'codeward_admin_session', expectedPass, {
      path: '/admin',
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return c.redirect('/admin')
  }
  
  return c.redirect('/admin/login?error=1')
})

admin.get('/logout', (c) => {
  deleteCookie(c, 'codeward_admin_session', { path: '/admin' })
  return c.redirect('/admin/login')
})

type Entry = {
  id: number
  name: string
  email: string
  role: string
  company: string | null
  github: string | null
  position: number
  created_at: string
  email_sent: number
  linkedin_clicked: number
  status?: string | null
  invited_at?: string | null
}

const ROLE_LABELS: Record<string, string> = {
  'software-engineer': 'Software Engineer',
  'senior-engineer': 'Senior / Staff Engineer',
  'engineering-lead': 'Engineering Lead / Manager',
  'cto-vp': 'CTO / VP of Engineering',
  'devops-platform': 'DevOps / Platform Engineer',
  'security-engineer': 'Security Engineer',
  'freelancer': 'Freelance Developer',
  'open-source': 'Open Source Contributor',
  'student': 'Student / Bootcamp',
  'founder': 'Founder / Indie Hacker',
  'other': 'Other',
}

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeCsv(str: string): string {
  if (str == null) return ''
  const s = String(str)
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

// ── Admin Dashboard HTML Page ──
admin.get('/', async (c) => {
  const { env } = c
  const url = new URL(c.req.url)
  const search = (url.searchParams.get('q') || '').trim()
  const roleFilter = (url.searchParams.get('role') || '').trim()
  const priorityFilter = (url.searchParams.get('priority') || '').trim()
  const statusFilter = (url.searchParams.get('status') || '').trim()
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1)
  const pageSize = 25
  const msg = url.searchParams.get('msg') || ''

  let alertHtml = ''
  if (msg === 'retrigger_success') {
    alertHtml = `<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Email successfully resent!</div>`
  } else if (msg === 'invite_success') {
    alertHtml = `<div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 12px 16px; border-radius: 8px; font-weight: 500;">🎉 Early access invitation sent successfully!</div>`
  } else if (msg === 'add_lead_success') {
    alertHtml = `<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ VIP Lead added to waitlist!</div>`
  } else if (msg === 'bulk_success') {
    alertHtml = `<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Bulk action executed successfully!</div>`
  } else if (msg === 'delete_success') {
    alertHtml = `<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Waitlist entry deleted.</div>`
  } else if (msg === 'queue_processed') {
    const cnt = url.searchParams.get('cnt') || '0';
    alertHtml = `<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">⚡ Queue processed: ${cnt} pending email(s) successfully resent!</div>`
  } else if (msg === 'digest_success') {
    alertHtml = `<div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); color: #c084fc; padding: 12px 16px; border-radius: 8px; font-weight: 500;">📧 Weekly digest report dispatched to your inbox!</div>`
  } else if (msg === 'digest_failed') {
    alertHtml = `<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">⚠️ Failed to dispatch weekly digest email.</div>`
  }

  let where = 'WHERE 1=1'
  const params: any[] = []
  let pIdx = 1

  if (search) {
    where += ` AND (LOWER(name) LIKE $${pIdx++} OR LOWER(email) LIKE $${pIdx++} OR LOWER(company) LIKE $${pIdx++})`
    const like = `%${search.toLowerCase()}%`
    params.push(like, like, like)
  }
  if (roleFilter) {
    where += ` AND role = $${pIdx++}`
    params.push(roleFilter)
  }
  if (statusFilter) {
    where += ` AND COALESCE(status, 'pending') = $${pIdx++}`
    params.push(statusFilter)
  }

  const client = await getDb(c).connect()

  // Query Failed & Pending Email Queue
  const failedQueueRes = await client.query(
    `SELECT id, name, email, role, company, position, created_at, last_email_error
     FROM waitlist_entries
     WHERE email_sent = 0 OR last_email_error IS NOT NULL
     ORDER BY created_at DESC`
  )
  const failedEntries = failedQueueRes.rows || []

  // Fetch all matching entries for priority filtering & pagination
  const allListRes = await client.query(
    `SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked, status, invited_at
     FROM waitlist_entries ${where}
     ORDER BY created_at DESC`, params
  )
  let allEntries = (allListRes.rows || []).map((r: any) => {
    const priority = calculatePriorityScore(r);
    return { ...r, priority };
  })

  if (priorityFilter) {
    allEntries = allEntries.filter(e => e.priority.level === priorityFilter);
  }

  const totalMatching = allEntries.length;
  const totalPages = Math.max(1, Math.ceil(totalMatching / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize
  const pageEntries = allEntries.slice(offset, offset + pageSize)

  // Overall Statistics
  const allTotalRes = await client.query(`SELECT COUNT(*) as cnt FROM waitlist_entries`)
  const allTotal = Number(allTotalRes.rows[0]?.cnt ?? 0)

  const emailStatsRes = await client.query(
    `SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed,
       SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited
     FROM waitlist_entries`
  )
  const emailsSent = Number(emailStatsRes.rows[0]?.sent ?? 0)
  const emailsFailed = Number(emailStatsRes.rows[0]?.failed ?? 0)
  const totalInvited = Number(emailStatsRes.rows[0]?.invited ?? 0)

  // ── Daily Signups & Growth Analytics ──
  const todayRes = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE`
  )
  const todayCount = Number(todayRes.rows[0]?.cnt ?? 0)

  const yesterdayRes = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE - INTERVAL '1 day'`
  )
  const yesterdayCount = Number(yesterdayRes.rows[0]?.cnt ?? 0)

  let growthBadgeHtml = '';
  if (yesterdayCount === 0) {
    if (todayCount > 0) {
      growthBadgeHtml = `<span class="growth-badge positive">↑ +100% vs yesterday</span>`;
    } else {
      growthBadgeHtml = `<span class="growth-badge neutral">0% vs yesterday</span>`;
    }
  } else {
    const diffPct = Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);
    if (diffPct > 0) {
      growthBadgeHtml = `<span class="growth-badge positive">↑ +${diffPct}% vs yesterday</span>`;
    } else if (diffPct < 0) {
      growthBadgeHtml = `<span class="growth-badge negative">↓ ${diffPct}% vs yesterday</span>`;
    } else {
      growthBadgeHtml = `<span class="growth-badge neutral">0% vs yesterday</span>`;
    }
  }

  const last7Res = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'`
  )
  const last7Count = Number(last7Res.rows[0]?.cnt ?? 0)

  const last30Res = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'`
  )
  const last30Count = Number(last30Res.rows[0]?.cnt ?? 0)
  const avgDaily30 = (last30Count / 30).toFixed(1);

  const roleBreakdownRes = await client.query(
    `SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC`
  )
  const roleBreakdown = roleBreakdownRes.rows

  const companyRes = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''`
  )
  const withCompany = Number(companyRes.rows[0]?.cnt ?? 0)

  // Top Corporate Domains Insight
  const domainCounts: Record<string, number> = {};
  const freeMailSet = new Set(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'proton.me', 'protonmail.com', 'aol.com', 'live.com']);
  let corporateCount = 0;

  for (const e of allEntries) {
    const domain = (e.email.split('@')[1] || '').toLowerCase();
    if (domain) {
      if (!freeMailSet.has(domain)) {
        corporateCount++;
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      }
    }
  }

  const topDomains = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Timeframe selector for Daily Graph (default 14 days)
  const daysLimitParam = parseInt(url.searchParams.get('days') || '14', 10);
  const daysLimit = [7, 14, 30, 60].includes(daysLimitParam) ? daysLimitParam : 14;

  const dailyGraphRes = await client.query(
    `SELECT DATE(created_at) as day, COUNT(*) as cnt,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corp_cnt
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY day DESC
     LIMIT $1`, [daysLimit]
  );
  const dailyRows = (dailyGraphRes.rows || []).reverse();
  const maxDaily = Math.max(1, ...dailyRows.map((r: any) => Number(r.cnt)));

  let peakDayStr = 'N/A';
  let peakDayCnt = 0;
  dailyRows.forEach((r: any) => {
    const cnt = Number(r.cnt);
    if (cnt > peakDayCnt) {
      peakDayCnt = cnt;
      peakDayStr = new Date(r.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const chartBarsHtml = dailyRows.map((r: any) => {
    const cnt = Number(r.cnt);
    const corpCnt = Number(r.corp_cnt || 0);
    const heightPct = Math.round((cnt / maxDaily) * 100);
    const dateObj = new Date(r.day);
    const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const isToday = dateObj.toISOString().split('T')[0] === todayStr;

    return `
      <div class="chart-bar-col" title="${dateLabel}: ${cnt} total (${corpCnt} corporate)">
        <div class="chart-bar-track">
          <span class="chart-bar-value">${cnt}</span>
          <div class="chart-bar-fill ${isToday ? 'today-bar' : ''}" style="height: ${Math.max(14, heightPct)}%;"></div>
        </div>
        <span class="chart-bar-label" style="${isToday ? 'color:#f59e0b;font-weight:700;' : ''}">${dateLabel}</span>
      </div>
    `;
  }).join('');

  // Day of Week Distribution (Weekly Patterns)
  const dowRes = await client.query(
    `SELECT EXTRACT(DOW FROM created_at) as dow, COUNT(*) as cnt
     FROM waitlist_entries
     GROUP BY dow
     ORDER BY dow`
  );
  const dowMap: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  (dowRes.rows || []).forEach((r: any) => {
    dowMap[Math.floor(Number(r.dow))] = Number(r.cnt);
  });

  const maxDowCnt = Math.max(1, ...Object.values(dowMap));
  const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dowOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon to Sun
  const dowCardsHtml = dowOrder.map((dowIdx) => {
    const cnt = dowMap[dowIdx] || 0;
    const pct = Math.round((cnt / maxDowCnt) * 100);
    return `
      <div class="dow-card">
        <span class="dow-name">${DOW_LABELS[dowIdx]}</span>
        <span class="dow-count">${cnt}</span>
        <div class="dow-bar-track">
          <div class="dow-bar-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  const roleOptions = Object.entries(ROLE_LABELS)
    .map(
      ([val, label]) =>
        `<option value="${val}" ${roleFilter === val ? 'selected' : ''}>${escapeHtml(label)}</option>`
    )
    .join('')

  const tableRows = pageEntries.length
    ? pageEntries
        .map((r) => {
          const date = new Date(r.created_at + 'Z')
          const dateStr = isNaN(date.getTime())
            ? r.created_at
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
              ' · ' +
              date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          
          const isInvited = r.status === 'invited';

          return `
        <tr>
          <td><input type="checkbox" class="entry-checkbox" name="ids" value="${r.id}"/></td>
          <td class="pos-cell">#${616 + r.position}</td>
          <td><span class="priority-badge ${r.priority.class}">${r.priority.label} (${r.priority.score})</span></td>
          <td>
            <div class="name-cell">${escapeHtml(r.name)}</div>
            <div class="email-cell">${escapeHtml(r.email)}</div>
          </td>
          <td><span class="role-badge">${escapeHtml(ROLE_LABELS[r.role] || r.role)}</span></td>
          <td>${r.company ? escapeHtml(r.company) : '<span class="muted">—</span>'}</td>
          <td>${
            r.github
              ? `<a href="${escapeHtml(r.github)}" target="_blank" rel="noopener" class="github-link">${escapeHtml(
                  r.github.replace(/^https?:\/\/(www\.)?github\.com\//, '@')
                )}</a>`
              : '<span class="muted">—</span>'
          }</td>
          <td class="date-cell">${dateStr}</td>
          <td>
            ${isInvited
              ? '<span class="status-badge status-invited">Beta Invited</span>'
              : '<span class="status-badge status-pending">In Queue</span>'
            }
          </td>
          <td>
            <div style="display:flex;gap:6px;align-items:center;">
              <form method="post" action="/admin/invite" style="margin:0;">
                <input type="hidden" name="email" value="${escapeHtml(r.email)}" />
                <button type="submit" class="action-btn invite-btn">${isInvited ? 'Re-invite' : 'Invite'}</button>
              </form>
              <form method="post" action="/admin/retrigger" style="margin:0;">
                <input type="hidden" name="email" value="${escapeHtml(r.email)}" />
                <button type="submit" class="action-btn">Resend Waitlist</button>
              </form>
              <form method="post" action="/admin/delete" style="margin:0;" onsubmit="return confirm('Delete ${escapeHtml(r.name)} from waitlist?');">
                <input type="hidden" name="id" value="${r.id}" />
                <button type="submit" class="action-btn danger-btn">&times;</button>
              </form>
            </div>
          </td>
        </tr>`
        })
        .join('')
    : `<tr><td colspan="10" class="empty-row">No waitlist entries match your filters.</td></tr>`

  const roleBreakdownHtml = (roleBreakdown || [])
    .map((r: any) => {
      const cnt = Number(r.cnt)
      const pct = allTotal ? Math.round((cnt / allTotal) * 100) : 0
      return `
      <div class="role-bar-row">
        <div class="role-bar-label">${escapeHtml(ROLE_LABELS[r.role] || r.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${pct}%"></div></div>
        <div class="role-bar-count">${cnt}</div>
      </div>`
    })
    .join('')

  const qs = (overrides: Record<string, string | number>) => {
    const p = new URLSearchParams()
    if (search) p.set('q', search)
    if (roleFilter) p.set('role', roleFilter)
    if (priorityFilter) p.set('priority', priorityFilter)
    if (statusFilter) p.set('status', statusFilter)
    p.set('page', String(safePage))
    Object.entries(overrides).forEach(([k, v]) => p.set(k, String(v)))
    return '?' + p.toString()
  }

  const resendApiKey = env?.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined);
  const deliveryRatePct = allTotal ? Math.round((emailsSent / allTotal) * 100) : 100;

  const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward Admin — Waitlist Control</title>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/admin.css"/>
</head>
<body>
<div class="admin-page">

  <header class="admin-header">
    <div class="admin-brand">
      <span class="logo-text">code</span>
      <span class="w-shield">
        <svg viewBox="0 0 18 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="0" width="16" height="3" rx="1"/>
          <path d="M1 5 L5 5 L9 17 L13 5 L17 5 L17 21 L13 21 L13 11 L9 21 L5 11 L5 21 L1 21 Z"/>
        </svg>
      </span>
      <span class="logo-text">ard</span>
      <span class="admin-tag">admin</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <button class="action-btn invite-btn" onclick="document.getElementById('vip-modal').classList.add('active')">+ Add VIP Lead</button>
      <a href="/" class="back-link">&larr; Public site</a>
      <a href="/admin/logout" class="back-link" style="color: #ef4444;">Logout</a>
    </div>
  </header>

  <!-- ── SYSTEM HEALTH BAR ── -->
  <div class="health-bar">
    <div class="health-item">
      <div class="health-dot"></div>
      <span>Neon PostgreSQL: <strong>Connected</strong></span>
    </div>
    <div class="health-item">
      <div class="health-dot ${resendApiKey ? '' : 'red'}"></div>
      <span>Resend API: <strong>${resendApiKey ? 'Active' : 'Missing API Key'}</strong></span>
    </div>
    <div class="health-item">
      <span>Delivery Rate: <strong>${deliveryRatePct}%</strong></span>
    </div>
    <div class="health-item">
      <span>Corporate Leads: <strong>${corporateCount}</strong></span>
    </div>
  </div>

  ${alertHtml}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num">${allTotal.toLocaleString()}</span>
      </div>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num accent">+${todayCount.toLocaleString()}</span>
        ${growthBadgeHtml}
      </div>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#a855f7;">${last7Count.toLocaleString()}</span>
      <span class="stat-label">last 7 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#3b82f6;">${last30Count.toLocaleString()} <span style="font-size:12px;color:var(--muted);font-weight:400;">(${avgDaily30}/day)</span></span>
      <span class="stat-label">last 30 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#f59e0b;">${peakDayCnt}</span>
      <span class="stat-label">peak day (${peakDayStr})</span>
    </div>
  </section>

  <!-- ── ANALYTICS GRID ── -->
  <div class="analytics-grid">
    <section class="panel chart-card" style="grid-column: span 2;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <h2 class="panel-title" style="margin:0;">Daily Signups & Velocity</h2>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="timeframe-picker">
            <a href="${qs({ days: 7 })}" class="timeframe-btn ${daysLimit === 7 ? 'active' : ''}">7D</a>
            <a href="${qs({ days: 14 })}" class="timeframe-btn ${daysLimit === 14 ? 'active' : ''}">14D</a>
            <a href="${qs({ days: 30 })}" class="timeframe-btn ${daysLimit === 30 ? 'active' : ''}">30D</a>
            <a href="${qs({ days: 60 })}" class="timeframe-btn ${daysLimit === 60 ? 'active' : ''}">60D</a>
          </div>
          <a href="/admin/export-daily-csv" class="action-btn" style="text-decoration:none;">
            📥 Export Daily CSV
          </a>
        </div>
      </div>

      <div class="chart-container">
        ${chartBarsHtml || '<p class="muted">No recent signups.</p>'}
      </div>

      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot regular"></div> Daily Signups</div>
        <div class="legend-item"><div class="legend-dot today"></div> Today's Signups</div>
        <div style="margin-left:auto;font-size:11px;color:var(--muted);">Showing last ${daysLimit} days</div>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Top Corporate Domains</h2>
      <div class="domain-list">
        ${topDomains.length
          ? topDomains.map(([dom, cnt]) => `
            <div class="domain-item">
              <span class="domain-name">@${escapeHtml(dom)}</span>
              <span class="domain-count">${cnt} lead${cnt > 1 ? 's' : ''}</span>
            </div>
          `).join('')
          : '<p class="muted" style="font-size:13px;">No corporate domains yet.</p>'
        }
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Day-of-Week Pattern (Mon–Sun)</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px;">Signup velocity across days of the week:</p>
      <div class="dow-grid">
        ${dowCardsHtml}
      </div>
    </section>
  <!-- ── FAILED & PENDING EMAIL QUEUE PANEL ── -->
  <section class="panel" style="border: 1px solid ${failedEntries.length > 0 ? 'rgba(239, 68, 68, 0.4)' : 'var(--border)'}; background: ${failedEntries.length > 0 ? 'rgba(239, 68, 68, 0.03)' : 'var(--surface)'};">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
      <div>
        <h2 class="panel-title" style="margin:0;color:${failedEntries.length > 0 ? '#f87171' : 'var(--text)'};">
          ${failedEntries.length > 0 ? '⚠️ Failed & Pending Email Queue (' + failedEntries.length + ')' : '📬 Email Queue Status'}
        </h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:2px;">
          ${failedEntries.length > 0 ? 'Emails that encountered Resend rate limits or API delivery issues' : 'All waitlist emails have been delivered successfully!'}
        </p>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <form method="post" action="/admin/send-weekly-digest" style="margin:0;">
          <button type="submit" class="action-btn" style="background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.3);">
            📧 Send Weekly Digest Now
          </button>
        </form>
        ${failedEntries.length > 0 ? `
          <form method="post" action="/admin/retry-failed-queue" style="margin:0;">
            <button type="submit" class="action-btn invite-btn" style="background:#ef4444;">
              ⚡ Process Queue / Retry All (${failedEntries.length})
            </button>
          </form>
        ` : ''}
      </div>
    </div>

    ${failedEntries.length > 0 ? `
      <div class="table-wrap">
        <table class="entries-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Failure Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${failedEntries.slice(0, 10).map((fe: any) => `
              <tr>
                <td class="pos-cell">#${616 + fe.position}</td>
                <td>
                  <div class="name-cell">${escapeHtml(fe.name)}</div>
                  <div class="email-cell">${escapeHtml(fe.email)}</div>
                </td>
                <td>${escapeHtml(ROLE_LABELS[fe.role] || fe.role)}</td>
                <td>
                  <span style="font-family:var(--font-mono);font-size:11px;color:#f87171;background:rgba(239,68,68,0.12);padding:3px 8px;border-radius:6px;border:1px solid rgba(239,68,68,0.25);">
                    ${escapeHtml(fe.last_email_error || 'Delivery Pending')}
                  </span>
                </td>
                <td>
                  <form method="post" action="/admin/retrigger" style="margin:0;">
                    <input type="hidden" name="email" value="${escapeHtml(fe.email)}" />
                    <button type="submit" class="action-btn">Retry Send</button>
                  </form>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${failedEntries.length > 10 ? `<p style="font-size:12px;color:var(--muted);margin-top:10px;">Showing 10 of ${failedEntries.length} queued emails.</p>` : ''}
    ` : ''}
  </section>

  <!-- ── ROLE BREAKDOWN PANEL ── -->
  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${roleBreakdownHtml || '<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <!-- ── MAIN WAITLIST TABLE PANEL ── -->
  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries (${totalMatching.toLocaleString()})</h2>
      <div style="display:flex;gap:10px;">
        <a class="export-btn" href="/admin/export.csv${qs({})}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export CSV
        </a>
      </div>
    </div>

    <!-- Filter Bar -->
    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${escapeHtml(search)}" class="search-input"/>
      
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${roleOptions}
      </select>

      <select name="priority" class="role-select">
        <option value="">All priorities</option>
        <option value="high" ${priorityFilter === 'high' ? 'selected' : ''}>🔥 High Priority (VIP)</option>
        <option value="medium" ${priorityFilter === 'medium' ? 'selected' : ''}>⚡ Medium Priority</option>
        <option value="standard" ${priorityFilter === 'standard' ? 'selected' : ''}>🟢 Standard</option>
      </select>

      <select name="status" class="role-select">
        <option value="">All statuses</option>
        <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>In Queue</option>
        <option value="invited" ${statusFilter === 'invited' ? 'selected' : ''}>Beta Invited</option>
      </select>

      <button type="submit" class="filter-btn">Filter</button>
      ${search || roleFilter || priorityFilter || statusFilter ? '<a href="/admin" class="clear-btn">Clear</a>' : ''}
    </form>

    <!-- Bulk Action Toolbar -->
    <form id="bulk-form" method="post" action="/admin/bulk-action">
      <div class="bulk-toolbar" id="bulk-bar" style="display:none;">
        <span class="bulk-count" id="bulk-count-text">0 selected</span>
        <button type="submit" name="action" value="invite" class="action-btn invite-btn">Bulk Invite to Beta</button>
        <button type="submit" name="action" value="retrigger" class="action-btn">Bulk Resend Email</button>
        <button type="submit" name="action" value="delete" class="action-btn danger-btn" onclick="return confirm('Delete selected entries?');">Bulk Delete</button>
      </div>

      <div class="table-wrap">
        <table class="entries-table">
          <thead>
            <tr>
              <th width="30"><input type="checkbox" id="select-all"/></th>
              <th>Pos</th>
              <th>Score</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Company</th>
              <th>GitHub</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </form>

    <div class="pagination">
      <span class="page-info">Showing ${pageEntries.length ? offset + 1 : 0}–${offset + pageEntries.length} of ${totalMatching.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${qs({ page: Math.max(1, safePage - 1) })}" class="page-btn ${safePage <= 1 ? 'disabled' : ''}">&larr; Prev</a>
        <span class="page-current">Page ${safePage} of ${totalPages}</span>
        <a href="/admin${qs({ page: Math.min(totalPages, safePage + 1) })}" class="page-btn ${safePage >= totalPages ? 'disabled' : ''}">Next &rarr;</a>
      </div>
    </div>
  </section>

</div>

<!-- ── ADD VIP LEAD MODAL ── -->
<div class="admin-modal-overlay" id="vip-modal">
  <div class="admin-modal">
    <div class="admin-modal-header">
      <h3>Add VIP Waitlist Lead</h3>
      <button class="admin-modal-close" onclick="document.getElementById('vip-modal').classList.remove('active')">&times;</button>
    </div>
    <form class="modal-form" method="post" action="/admin/add-lead">
      <div class="modal-field">
        <label>Full Name</label>
        <input type="text" name="name" placeholder="e.g. Elon Musk" required />
      </div>
      <div class="modal-field">
        <label>Email Address</label>
        <input type="email" name="email" placeholder="e.g. elon@x.com" required />
      </div>
      <div class="modal-field">
        <label>Role</label>
        <select name="role" required>
          <option value="cto-vp">CTO / VP of Engineering</option>
          <option value="founder" selected>Founder / Indie Hacker</option>
          <option value="engineering-lead">Engineering Lead / Manager</option>
          <option value="senior-engineer">Senior / Staff Engineer</option>
          <option value="software-engineer">Software Engineer</option>
        </select>
      </div>
      <div class="modal-field">
        <label>Company</label>
        <input type="text" name="company" placeholder="e.g. xAI, Tesla" />
      </div>
      <div class="modal-field">
        <label>GitHub Profile</label>
        <input type="text" name="github" placeholder="https://github.com/elonmusk" />
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button type="submit" class="filter-btn" style="flex:1;">Add Lead &rarr;</button>
        <button type="button" class="clear-btn" onclick="document.getElementById('vip-modal').classList.remove('active')">Cancel</button>
      </div>
    </form>
  </div>
</div>

<script>
  // Bulk selection handling
  const selectAll = document.getElementById('select-all');
  const checkboxes = document.querySelectorAll('.entry-checkbox');
  const bulkBar = document.getElementById('bulk-bar');
  const bulkText = document.getElementById('bulk-count-text');

  function updateBulkBar() {
    const checked = document.querySelectorAll('.entry-checkbox:checked');
    if (checked.length > 0) {
      bulkBar.style.display = 'flex';
      bulkText.textContent = checked.length + ' selected';
    } else {
      bulkBar.style.display = 'none';
    }
  }

  if (selectAll) {
    selectAll.addEventListener('change', () => {
      checkboxes.forEach(cb => cb.checked = selectAll.checked);
      updateBulkBar();
    });
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateBulkBar);
  });
</script>

</body>
</html>`

  return c.html(html)
})

// ── Single Invite Action ──
admin.post('/invite', async (c) => {
  const { env } = c
  const body = await c.req.parseBody()
  const email = (body.email || '').toString().trim()
  if (!email) return c.redirect('/admin')

  const client = await getDb(c).connect()
  const res = await client.query(`SELECT name, position FROM waitlist_entries WHERE email = $1`, [email])
  const entry = res.rows[0] as { name: string; position: number } | undefined

  if (entry) {
    const inviteRes = await sendBetaInviteEmail(env, email, entry.name, entry.position)
    if (inviteRes.ok) {
      await client.query(`UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP, last_email_error = NULL WHERE email = $1`, [email])
      return c.redirect('/admin?msg=invite_success')
    } else {
      await client.query(`UPDATE waitlist_entries SET last_email_error = $1 WHERE email = $2`, [inviteRes.error || 'Failed sending invite', email])
    }
  }
  return c.redirect('/admin?msg=retrigger_failed')
})

// ── Bulk Actions Handler ──
admin.post('/bulk-action', async (c) => {
  const { env } = c
  const body = await c.req.parseBody()
  const action = (body.action || '').toString()
  let ids = body['ids']
  if (!ids) return c.redirect('/admin')

  if (!Array.isArray(ids)) {
    ids = [ids]
  }

  const client = await getDb(c).connect()

  for (const idStr of ids) {
    const id = parseInt(idStr.toString(), 10)
    if (isNaN(id)) continue

    const res = await client.query(`SELECT email, name, position FROM waitlist_entries WHERE id = $1`, [id])
    const entry = res.rows[0] as { email: string; name: string; position: number } | undefined
    if (!entry) continue

    if (action === 'invite') {
      const inviteRes = await sendBetaInviteEmail(env, entry.email, entry.name, entry.position)
      if (inviteRes.ok) {
        await client.query(`UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP, last_email_error = NULL WHERE id = $1`, [id])
      } else {
        await client.query(`UPDATE waitlist_entries SET last_email_error = $1 WHERE id = $2`, [inviteRes.error || 'Bulk invite failed', id])
      }
    } else if (action === 'retrigger') {
      const sendRes = await sendWaitlistEmail(env, entry.email, entry.name, entry.position)
      if (sendRes.ok) {
        await client.query(`UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE id = $1`, [id])
      } else {
        await client.query(`UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE id = $2`, [sendRes.error || 'Bulk retrigger failed', id])
      }
    } else if (action === 'delete') {
      await client.query(`DELETE FROM waitlist_entries WHERE id = $1`, [id])
    }

    // Pacing delay (600ms per email to stay under Resend free tier rate limits)
    await new Promise(r => setTimeout(r, 600))
  }

  return c.redirect('/admin?msg=bulk_success')
})

// ── Process Failed Queue Handler ──
admin.post('/retry-failed-queue', async (c) => {
  const { env } = c
  const client = await getDb(c).connect()
  const res = await client.query(`SELECT id, email, name, position FROM waitlist_entries WHERE email_sent = 0 OR last_email_error IS NOT NULL`)
  const failedList = res.rows || []

  let successCount = 0
  for (const entry of failedList) {
    const sendRes = await sendWaitlistEmail(env, entry.email, entry.name, entry.position)
    if (sendRes.ok) {
      await client.query(`UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE id = $1`, [entry.id])
      successCount++
    } else {
      await client.query(`UPDATE waitlist_entries SET last_email_error = $1 WHERE id = $2`, [sendRes.error || 'Failed retry', entry.id])
    }
    await new Promise(r => setTimeout(r, 600))
  }

  return c.redirect(`/admin?msg=queue_processed&cnt=${successCount}`)
})

// ── Send Weekly Digest Handler ──
admin.post('/send-weekly-digest', async (c) => {
  const { env } = c
  const res = await sendWeeklyDigestEmail(env, c)
  if (res.ok) {
    return c.redirect('/admin?msg=digest_success')
  }
  return c.redirect('/admin?msg=digest_failed')
})

// ── Add VIP Lead Form Handler ──
admin.post('/add-lead', async (c) => {
  const { env } = c
  const body = await c.req.parseBody()
  const name = (body.name || '').toString().trim()
  const email = (body.email || '').toString().trim().toLowerCase()
  const role = (body.role || 'founder').toString().trim()
  const company = (body.company || '').toString().trim()
  const github = (body.github || '').toString().trim()

  if (name.length >= 2 && email.includes('@')) {
    const client = await getDb(c).connect()
    const countRes = await client.query(`SELECT COUNT(*) as cnt FROM waitlist_entries`)
    const nextPos = Number(countRes.rows[0]?.cnt ?? 0) + 1

    await client.query(
      `INSERT INTO waitlist_entries (name, email, role, company, github, position) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (email) DO NOTHING`,
      [name, email, role, company || null, github || null, nextPos]
    )

    const sendRes = await sendWaitlistEmail(env, email, name, nextPos)
    if (sendRes.ok) {
      await client.query(`UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE email = $1`, [email])
    } else {
      await client.query(`UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE email = $2`, [sendRes.error || 'Add lead email failed', email])
    }
  }

  return c.redirect('/admin?msg=add_lead_success')
})

// ── Delete Single Entry Handler ──
admin.post('/delete', async (c) => {
  const body = await c.req.parseBody()
  const id = parseInt((body.id || '').toString(), 10)
  if (!isNaN(id)) {
    const client = await getDb(c).connect()
    await client.query(`DELETE FROM waitlist_entries WHERE id = $1`, [id])
  }
  return c.redirect('/admin?msg=delete_success')
})

// ── CSV export (respects current filters) ──
admin.get('/export.csv', async (c) => {
  const { env } = c
  const url = new URL(c.req.url)
  const search = (url.searchParams.get('q') || '').trim()
  const roleFilter = (url.searchParams.get('role') || '').trim()
  const statusFilter = (url.searchParams.get('status') || '').trim()

  let where = 'WHERE 1=1'
  const params: any[] = []
  let pIdx = 1
  if (search) {
    where += ` AND (LOWER(name) LIKE $${pIdx++} OR LOWER(email) LIKE $${pIdx++} OR LOWER(company) LIKE $${pIdx++})`
    const like = `%${search.toLowerCase()}%`
    params.push(like, like, like)
  }
  if (roleFilter) {
    where += ` AND role = $${pIdx++}`
    params.push(roleFilter)
  }
  if (statusFilter) {
    where += ` AND COALESCE(status, 'pending') = $${pIdx++}`
    params.push(statusFilter)
  }

  const client = await getDb(c).connect()
  const res = await client.query(
    `SELECT id, name, email, role, company, github, position, created_at, status, invited_at
     FROM waitlist_entries ${where}
     ORDER BY created_at ASC`, params
  )
  const rows = (res.rows || []) as Entry[]
  const header = ['Position', 'Priority Score', 'Name', 'Email', 'Role', 'Company', 'GitHub', 'Beta Status', 'Joined At (UTC)']
  const lines = [header.join(',')]
  for (const r of rows) {
    const priority = calculatePriorityScore(r);
    lines.push(
      [
        616 + r.position,
        `${priority.score} (${priority.level})`,
        escapeCsv(r.name),
        escapeCsv(r.email),
        escapeCsv(ROLE_LABELS[r.role] || r.role),
        escapeCsv(r.company || ''),
        escapeCsv(r.github || ''),
        escapeCsv(r.status || 'pending'),
        escapeCsv(r.created_at),
      ].join(',')
    )
  }
  const csv = lines.join('\n')
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
})

// ── Daily Signups CSV Export ──
admin.get('/export-daily-csv', async (c) => {
  const client = await getDb(c).connect()
  const res = await client.query(
    `SELECT DATE(created_at) as date,
            COUNT(*) as total_signups,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corporate_signups,
            SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited_count
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY date DESC`
  )

  const header = ['Date', 'Total Signups', 'Corporate Signups', 'Invited Count']
  const lines = [header.join(',')]
  for (const r of res.rows || []) {
    const d = r.date ? new Date(r.date).toISOString().split('T')[0] : ''
    lines.push(
      [
        escapeCsv(d),
        r.total_signups || 0,
        r.corporate_signups || 0,
        r.invited_count || 0,
      ].join(',')
    )
  }
  const csv = lines.join('\n')
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="codeward-daily-signups-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
})

admin.post('/retrigger', async (c) => {
  const { env } = c
  const body = await c.req.parseBody()
  const email = (body.email || '').toString().trim()
  if (!email) return c.redirect('/admin')

  const client = await getDb(c).connect()
  const res = await client.query(
    `SELECT name, position FROM waitlist_entries WHERE email = $1`, [email]
  )
  const entry = res.rows[0] as { name: string; position: number } | undefined

  if (entry) {
    const sendRes = await sendWaitlistEmail(env, email, entry.name, entry.position)
    if (sendRes.ok) {
      await client.query(`UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE email = $1`, [email])
      return c.redirect('/admin?msg=retrigger_success')
    } else {
      await client.query(`UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE email = $2`, [sendRes.error || 'Retrigger email failed', email])
    }
  }

  return c.redirect('/admin?msg=retrigger_failed')
})

export default admin
