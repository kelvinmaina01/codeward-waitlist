if (typeof process !== 'undefined' && process.env) {
  process.env.POSTGRES_URL = process.env.POSTGRES_URL || process.env.DATABASE_POSTGRES_URL || process.env.DATABASE_URL;
}

import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { sendWaitlistEmail } from './index'

import { neon } from '@neondatabase/serverless'

let _sql: ReturnType<typeof neon> | null = null;
function getDb(c?: any) {
  if (!_sql) {
    const connStr =
      (c?.env?.POSTGRES_URL || c?.env?.DATABASE_POSTGRES_URL || c?.env?.DATABASE_URL) ||
      (typeof process !== 'undefined' && process.env ? (process.env.POSTGRES_URL || process.env.DATABASE_POSTGRES_URL || process.env.DATABASE_URL) : undefined);
    _sql = neon(connStr as string);
  }
  return _sql;
}

type Bindings = {
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
  RESEND_API_KEY?: string
}

const admin = new Hono<{ Bindings: Bindings }>()

// ── Session Middleware ──
admin.use('*', async (c, next) => {
  const path = new URL(c.req.url).pathname
  if (path === '/admin/login' || path.startsWith('/static/')) {
    return next()
  }
  
  const expectedSession = c.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'paraKenya8#'
  const session = getCookie(c, 'codeward_admin_session')
  
  if (session === expectedSession) {
    return next()
  }
  
  return c.redirect('/admin/login')
})

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
  .login-btn:hover {
    background: #f4f4f5;
  }
  .error-msg {
    color: #ef4444;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    display: none;
  }
  .error-msg.visible {
    display: block;
  }
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
  return str
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

// ── Admin dashboard (HTML) ──
admin.get('/', async (c) => {
  const { env } = c
  const url = new URL(c.req.url)
  const search = (url.searchParams.get('q') || '').trim()
  const roleFilter = (url.searchParams.get('role') || '').trim()
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1)
  const pageSize = 25
  const msg = url.searchParams.get('msg') || ''

  let alertHtml = ''
  if (msg === 'retrigger_success') {
    alertHtml = `<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> Email successfully resent!</div>`
  } else if (msg === 'retrigger_failed') {
    alertHtml = `<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> Failed to resend email. Please check the logs.</div>`
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

  const client = await getDb(c).connect()

  const countRes = await client.query(`SELECT COUNT(*) as cnt FROM waitlist_entries ${where}`, params)
  const totalMatching = Number(countRes.rows[0]?.cnt ?? 0)
  const totalPages = Math.max(1, Math.ceil(totalMatching / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const listParams = [...params, pageSize, offset]
  const listRes = await client.query(
    `SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked
     FROM waitlist_entries ${where}
     ORDER BY created_at DESC
     LIMIT $${pIdx++} OFFSET $${pIdx++}`, listParams
  )
  const rows = (listRes.rows || []) as Entry[]

  const allTotalRes = await client.query(`SELECT COUNT(*) as cnt FROM waitlist_entries`)
  const allTotal = Number(allTotalRes.rows[0]?.cnt ?? 0)

  const emailStatsRes = await client.query(
    `SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed
     FROM waitlist_entries`
  )
  const emailsSent = Number(emailStatsRes.rows[0]?.sent ?? 0)
  const emailsFailed = Number(emailStatsRes.rows[0]?.failed ?? 0)

  const todayRes = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE`
  )
  const todayCount = Number(todayRes.rows[0]?.cnt ?? 0)

  const roleBreakdownRes = await client.query(
    `SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC`
  )
  const roleBreakdown = roleBreakdownRes.rows

  const companyRes = await client.query(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''`
  )
  const withCompany = Number(companyRes.rows[0]?.cnt ?? 0)

  const roleOptions = Object.entries(ROLE_LABELS)
    .map(
      ([val, label]) =>
        `<option value="${val}" ${roleFilter === val ? 'selected' : ''}>${escapeHtml(label)}</option>`
    )
    .join('')

  const tableRows = rows.length
    ? rows
        .map((r) => {
          const date = new Date(r.created_at + 'Z')
          const dateStr = isNaN(date.getTime())
            ? r.created_at
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
              ' · ' +
              date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          return `
        <tr>
          <td class="pos-cell">#${616 + r.position}</td>
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
            ${r.email_sent === 1 
              ? '<span class="role-badge" style="background:#059669;color:#fff;">Sent</span>' 
              : `<div style="display:flex;gap:8px;align-items:center;">
                   <span class="role-badge" style="background:#dc2626;color:#fff;">Failed</span>
                   <form method="post" action="/admin/retrigger" style="margin:0;">
                     <input type="hidden" name="email" value="${escapeHtml(r.email)}" />
                     <button type="submit" class="filter-btn" style="padding:2px 8px;font-size:11px;">Retrigger</button>
                   </form>
                 </div>`
            }
          </td>
          <td>
            ${r.linkedin_clicked === 1 
              ? '<span class="role-badge" style="background:#0077b5;color:#fff;">Yes</span>'
              : '<span class="role-badge" style="opacity:0.5;">No</span>'
            }
          </td>
        </tr>`
        })
        .join('')
    : `<tr><td colspan="7" class="empty-row">No waitlist entries match your filters.</td></tr>`

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
    p.set('page', String(safePage))
    Object.entries(overrides).forEach(([k, v]) => p.set(k, String(v)))
    return '?' + p.toString()
  }

  const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward Admin — Waitlist</title>
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
    <div style="display: flex; gap: 16px; align-items: center;">
      <a href="/" class="back-link">&larr; View public page</a>
      <a href="/admin/logout" class="back-link" style="color: #ef4444;">Logout</a>
    </div>
  </header>

  ${alertHtml}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
    <div class="stat-card">
      <span class="stat-num">${allTotal.toLocaleString()}</span>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <span class="stat-num accent">+${todayCount.toLocaleString()}</span>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${withCompany.toLocaleString()}</span>
      <span class="stat-label">with company listed</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#10b981;">${emailsSent.toLocaleString()}</span>
      <span class="stat-label">emails sent</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#ef4444;">${emailsFailed.toLocaleString()}</span>
      <span class="stat-label">emails failed</span>
    </div>
  </section>

  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${roleBreakdownHtml || '<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries</h2>
      <a class="export-btn" href="/admin/export.csv${search || roleFilter ? qs({}) : ''}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Export CSV
      </a>
    </div>

    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${escapeHtml(search)}" class="search-input"/>
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${roleOptions}
      </select>
      <button type="submit" class="filter-btn">Filter</button>
      ${search || roleFilter ? '<a href="/admin" class="clear-btn">Clear</a>' : ''}
    </form>

    <div class="table-wrap">
      <table class="entries-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name / Email</th>
            <th>Role</th>
            <th>Company</th>
            <th>GitHub</th>
            <th>Joined</th>
            <th>Email Status</th>
            <th>LinkedIn?</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="page-info">Showing ${rows.length ? offset + 1 : 0}–${offset + rows.length} of ${totalMatching.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${qs({ page: Math.max(1, safePage - 1) })}" class="page-btn ${safePage <= 1 ? 'disabled' : ''}">&larr; Prev</a>
        <span class="page-current">Page ${safePage} of ${totalPages}</span>
        <a href="/admin${qs({ page: Math.min(totalPages, safePage + 1) })}" class="page-btn ${safePage >= totalPages ? 'disabled' : ''}">Next &rarr;</a>
      </div>
    </div>
  </section>

</div>
</body>
</html>`

  return c.html(html)
})

// ── CSV export (respects current filters) ──
admin.get('/export.csv', async (c) => {
  const { env } = c
  const url = new URL(c.req.url)
  const search = (url.searchParams.get('q') || '').trim()
  const roleFilter = (url.searchParams.get('role') || '').trim()

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

  const client = await getDb(c).connect()
  const res = await client.query(
    `SELECT id, name, email, role, company, github, position, created_at
     FROM waitlist_entries ${where}
     ORDER BY created_at ASC`, params
  )
  const rows = (res.rows || []) as Entry[]
  const header = ['Position', 'Name', 'Email', 'Role', 'Company', 'GitHub', 'Joined At (UTC)']
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [
        616 + r.position,
        escapeCsv(r.name),
        escapeCsv(r.email),
        escapeCsv(ROLE_LABELS[r.role] || r.role),
        escapeCsv(r.company || ''),
        escapeCsv(r.github || ''),
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
    const success = await sendWaitlistEmail(env, email, entry.name, entry.position)
    if (success) {
      await client.query(`UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1`, [email])
      return c.redirect('/admin?msg=retrigger_success')
    }
  }

  return c.redirect('/admin?msg=retrigger_failed')
})

export default admin
