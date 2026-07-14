import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

type Bindings = {
  DB: D1Database
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
}

const admin = new Hono<{ Bindings: Bindings }>()

// ── Protect every /admin* route with HTTP Basic Auth ──
admin.use('*', async (c, next) => {
  const username = c.env.ADMIN_USERNAME || 'admin'
  const password = c.env.ADMIN_PASSWORD || 'changeme'
  const auth = basicAuth({ username, password })
  return auth(c, next)
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

  let where = 'WHERE 1=1'
  const params: any[] = []

  if (search) {
    where += ' AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(company) LIKE ?)'
    const like = `%${search.toLowerCase()}%`
    params.push(like, like, like)
  }
  if (roleFilter) {
    where += ' AND role = ?'
    params.push(roleFilter)
  }

  const countRow = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries ${where}`
  ).bind(...params).first<{ cnt: number }>()
  const totalMatching = countRow?.cnt ?? 0
  const totalPages = Math.max(1, Math.ceil(totalMatching / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const { results } = await env.DB.prepare(
    `SELECT id, name, email, role, company, github, position, created_at
     FROM waitlist_entries ${where}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`
  ).bind(...params, pageSize, offset).all<Entry>()

  const allTotalRow = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries`
  ).first<{ cnt: number }>()
  const allTotal = allTotalRow?.cnt ?? 0

  const todayRow = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE date(created_at) = date('now')`
  ).first<{ cnt: number }>()
  const todayCount = todayRow?.cnt ?? 0

  const roleBreakdown = await env.DB.prepare(
    `SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC`
  ).all<{ role: string; cnt: number }>()

  const companyRow = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''`
  ).first<{ cnt: number }>()
  const withCompany = companyRow?.cnt ?? 0

  const rows = results || []

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
        </tr>`
        })
        .join('')
    : `<tr><td colspan="6" class="empty-row">No waitlist entries match your filters.</td></tr>`

  const roleBreakdownHtml = (roleBreakdown.results || [])
    .map((r) => {
      const pct = allTotal ? Math.round((r.cnt / allTotal) * 100) : 0
      return `
      <div class="role-bar-row">
        <div class="role-bar-label">${escapeHtml(ROLE_LABELS[r.role] || r.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${pct}%"></div></div>
        <div class="role-bar-count">${r.cnt}</div>
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
    <a href="/" class="back-link">&larr; View public page</a>
  </header>

  <section class="stats-row">
    <div class="stat-card">
      <span class="stat-num">${allTotal.toLocaleString()}</span>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${(616 + allTotal).toLocaleString()}</span>
      <span class="stat-label">public waitlist count</span>
    </div>
    <div class="stat-card">
      <span class="stat-num accent">+${todayCount.toLocaleString()}</span>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${withCompany.toLocaleString()}</span>
      <span class="stat-label">with company listed</span>
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
  if (search) {
    where += ' AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(company) LIKE ?)'
    const like = `%${search.toLowerCase()}%`
    params.push(like, like, like)
  }
  if (roleFilter) {
    where += ' AND role = ?'
    params.push(roleFilter)
  }

  const { results } = await env.DB.prepare(
    `SELECT id, name, email, role, company, github, position, created_at
     FROM waitlist_entries ${where}
     ORDER BY created_at ASC`
  ).bind(...params).all<Entry>()

  const rows = results || []
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

export default admin
