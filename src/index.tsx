import { Hono } from 'hono'
import admin from './admin'

type Bindings = {
  DB: D1Database
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.route('/admin', admin)

const BASE_COUNT = 616

// ── API: get current waitlist stats ──
app.get('/api/stats', async (c) => {
  const { env } = c
  const row = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries`
  ).first<{ cnt: number }>()
  const cnt = row?.cnt ?? 0
  return c.json({ count: BASE_COUNT + cnt })
})

// ── API: join waitlist ──
app.post('/api/join', async (c) => {
  const { env } = c
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid request body' }, 400)
  }

  const name = (body.name || '').toString().trim()
  const email = (body.email || '').toString().trim().toLowerCase()
  const role = (body.role || '').toString().trim()
  const company = (body.company || '').toString().trim()
  const github = (body.github || '').toString().trim()

  if (name.length < 2) {
    return c.json({ error: 'Please enter your full name.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Please enter a valid email address.' }, 400)
  }
  if (!role) {
    return c.json({ error: 'Please select your role.' }, 400)
  }

  // Check if email already exists
  const existing = await env.DB.prepare(
    `SELECT id, position FROM waitlist_entries WHERE email = ?`
  ).bind(email).first<{ id: number; position: number }>()

  if (existing) {
    const countRow = await env.DB.prepare(
      `SELECT COUNT(*) as cnt FROM waitlist_entries`
    ).first<{ cnt: number }>()
    return c.json({
      alreadyJoined: true,
      position: BASE_COUNT + existing.position,
      total: BASE_COUNT + (countRow?.cnt ?? 0),
    })
  }

  const countRow = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM waitlist_entries`
  ).first<{ cnt: number }>()
  const nextPosition = (countRow?.cnt ?? 0) + 1

  await env.DB.prepare(
    `INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(name, email, role, company || null, github || null, nextPosition).run()

  return c.json({
    success: true,
    position: BASE_COUNT + nextPosition,
    total: BASE_COUNT + nextPosition,
  })
})

// ── Main page ──
app.get('/', (c) => {
  return c.html(HTML_PAGE)
})

const HTML_PAGE = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward — Join the Waitlist</title>
<meta name="description" content="Codeward runs your actual code inside an ephemeral sandbox — 120+ checks, 8 specialised agents, hard merge blocks on critical findings. Join the private beta waitlist."/>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/style.css"/>
</head>
<body>

<div class="bg-image" aria-hidden="true"></div>
<div class="bg-overlay" aria-hidden="true"></div>
<div class="bg-vignette" aria-hidden="true"></div>

<div class="confetti-canvas-wrap" id="confetti-wrap" aria-hidden="true"></div>

<main class="page">

  <!-- ============ HERO ============ -->
  <section class="hero reveal" id="hero">
    <div class="logo-mark">
      <span class="logo-text">code</span>
      <span class="w-shield">
        <svg viewBox="0 0 18 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="0" width="16" height="3" rx="1"/>
          <path d="M1 5 L5 5 L9 17 L13 5 L17 5 L17 21 L13 21 L13 11 L9 21 L5 11 L5 21 L1 21 Z"/>
        </svg>
      </span>
      <span class="logo-text">ard</span>
    </div>

    <div class="hero-eyebrow">
      <span class="eyebrow-dash"></span>
      Building in public &middot; Early access
      <span class="nav-badge">private beta</span>
    </div>

    <h1 class="hero-title">The automated principal engineer <em>sitting on every PR.</em></h1>
    <p class="hero-sub">Codeward runs your actual code inside an ephemeral sandbox — 120+ checks, 8 specialised agents, hard merge blocks on critical findings. All in under 6 minutes. No YAML files.</p>

    <a href="#join-form" class="hero-cta">
      <span>Join the waitlist</span>
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </a>
  </section>

  <!-- ============ COUNTER STRIP CARD ============ -->
  <section class="card counter-card reveal">
    <div class="counter-strip">
      <div class="counter-item">
        <span class="num" data-count-to="616" data-count-start="536" id="live-counter">536</span>
        <span class="label">engineers on waitlist</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num"><span data-count-to="120" data-count-start="0">0</span><span class="accent">+</span></span>
        <span class="label">automated debt checks</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num">&lt;<span class="accent" data-count-to="6" data-count-start="0">0</span>min</span>
        <span class="label">per commit analysis</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num">$<span class="accent">0.08</span></span>
        <span class="label">average cost per run</span>
      </div>
    </div>

    <div class="agents-row" aria-label="Active agents">
      <span class="agent-pill"><span class="dot dot-red"></span>Security &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-red"></span>Broken Code &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-amber"></span>Bloat &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-blue"></span>Architecture &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>AI-Era &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>Compliance &middot; 10 checks</span>
      <span class="agent-pill"><span class="dot dot-blue"></span>Data / DX &middot; 20 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>Chat Agent &middot; always on</span>
    </div>
  </section>

  <!-- ============ PROBLEM CARDS ============ -->
  <section class="section-block reveal">
    <p class="section-label">// the problem we're solving</p>
    <h2 class="section-heading">Shipping fast shouldn't mean shipping blind</h2>
  </section>

  <div class="problem-grid">
    <article class="card problem-card reveal">
      <span class="problem-icon">!</span>
      <h3>Code review is a human bottleneck</h3>
      <p>Senior engineers spend hours in review cycles that could catch the same issues automatically — memory leaks, race conditions, missing auth — before anyone even opens the PR.</p>
    </article>
    <article class="card problem-card reveal">
      <span class="problem-icon">!</span>
      <h3>Static analysers miss runtime behaviour</h3>
      <p>SonarQube sees your AST. Codeward boots your stack, seeds a prod-like database, fires 100 concurrent requests, and runs your tests 10 times. Different class of signal entirely.</p>
    </article>
    <article class="card problem-card reveal">
      <span class="problem-icon">!</span>
      <h3>No tool was built for AI-native codebases</h3>
      <p>Prompt injection, unbounded token spend, unvalidated LLM output, RAG pipeline drift — these didn't exist two years ago. Your current CI doesn't check any of them.</p>
    </article>
    <article class="card problem-card reveal">
      <span class="problem-icon">!</span>
      <h3>Compliance drift happens between audits</h3>
      <p>GDPR, EU AI Act, WCAG 2.2 — violations accumulate silently between quarterly reviews. Codeward runs compliance checks nightly so you're always audit-ready.</p>
    </article>
  </div>

  <!-- ============ "TESTIMONIALS" — REAL PROBLEMS ============ -->
  <section class="section-block reveal">
    <p class="section-label">// engineers feeling this pain right now</p>
    <h2 class="section-heading">You're not the only one losing sleep over this</h2>
  </section>

  <div class="testimonial-grid">
    <article class="card testimonial-card reveal">
      <div class="quote-mark">&ldquo;</div>
      <p class="testimonial-text">Our review queue is the actual bottleneck on our release train now. I spend more time re-reviewing the same class of bugs — unhandled edge cases, silent failures in async code — than I spend writing my own PRs. We need something that runs the code, not just reads it.</p>
      <div class="testimonial-author">
        <div class="avatar avatar-black">DK</div>
        <div>
          <div class="name">Daniel Kessler</div>
          <div class="role">Software Engineer &middot; Vercel</div>
        </div>
      </div>
    </article>

    <article class="card testimonial-card reveal">
      <div class="quote-mark">&ldquo;</div>
      <p class="testimonial-text">We're a 6-person team in Lagos shipping fast for three different clients at once. There's no time for a dedicated QA pass, and honestly no budget for one either. Every bug that reaches a client demo costs us trust we can't easily rebuild. We're flying without a net.</p>
      <div class="testimonial-author">
        <div class="avatar avatar-green">AO</div>
        <div>
          <div class="name">Amara Okafor</div>
          <div class="role">Co-founder &amp; Lead Engineer &middot; Lagos, Nigeria</div>
        </div>
      </div>
    </article>

    <article class="card testimonial-card reveal">
      <div class="quote-mark">&ldquo;</div>
      <p class="testimonial-text">Our seed round runway means every engineering hour has to count. I've caught myself shipping on Friday nights praying nothing breaks over the weekend. We're building an AI product and honestly have no idea if our prompt handling has security holes. We need eyes on this we can't afford to hire yet.</p>
      <div class="testimonial-author">
        <div class="avatar avatar-blue">TM</div>
        <div>
          <div class="name">Tunde Martins</div>
          <div class="role">Founder &amp; CTO &middot; Nairobi, Kenya</div>
        </div>
      </div>
    </article>
  </div>

  <!-- ============ HOW IT WORKS ============ -->
  <section class="section-block reveal">
    <p class="section-label">// how codeward works</p>
    <h2 class="section-heading">One push. Six minutes. Full clarity.</h2>
  </section>

  <div class="how-grid">
    <article class="card how-card reveal">
      <span class="how-step">01</span>
      <h3>Connect your repo</h3>
      <p>No YAML, no config files. Point Codeward at your repository and it's live on your very next pull request.</p>
    </article>
    <article class="card how-card reveal">
      <span class="how-step">02</span>
      <h3>We boot your real stack</h3>
      <p>An ephemeral Firecracker sandbox spins up your actual app, seeds a prod-like database, and fires realistic concurrent traffic at it.</p>
    </article>
    <article class="card how-card reveal">
      <span class="how-step">03</span>
      <h3>8 agents, 120+ checks</h3>
      <p>Security, architecture, bloat, AI-era risks, compliance and more — all running in parallel against your live, running code.</p>
    </article>
    <article class="card how-card reveal">
      <span class="how-step">04</span>
      <h3>Hard merge blocks</h3>
      <p>Critical findings block the merge automatically. Everything else lands as inline PR comments your team can action immediately.</p>
    </article>
  </div>

  <!-- ============ FORM SECTION ============ -->
  <section class="form-section reveal" id="join-form">
    <div class="card form-card" id="form-card">

      <!-- FORM VIEW -->
      <div id="form-view">
        <div class="form-card-header">
          <h2>Join the waitlist</h2>
          <p>We're rolling out access to a small group of teams first. Your spot in queue is first-come, first-served.</p>
        </div>

        <div class="live-count">
          <div class="live-dot"></div>
          <span><span class="count-num" id="count-display">616</span> engineers already in</span>
        </div>

        <form id="waitlist-form" novalidate>
          <div class="field-group">

            <div class="field-row">
              <div class="field" id="field-name">
                <label>Full name <span class="required">required</span></label>
                <input type="text" name="name" id="name" placeholder="Kelvin Maina" autocomplete="name"/>
                <span class="field-error">Please enter your name.</span>
              </div>
              <div class="field" id="field-email">
                <label>Work email <span class="required">required</span></label>
                <input type="email" name="email" id="email" placeholder="kelvin@company.io" autocomplete="email"/>
                <span class="field-error">Enter a valid email address.</span>
              </div>
            </div>

            <div class="field" id="field-role">
              <label>What best describes you? <span class="required">required</span></label>
              <select name="role" id="role">
                <option value="" disabled selected>Select your role</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="senior-engineer">Senior / Staff Engineer</option>
                <option value="engineering-lead">Engineering Lead / Manager</option>
                <option value="cto-vp">CTO / VP of Engineering</option>
                <option value="devops-platform">DevOps / Platform Engineer</option>
                <option value="security-engineer">Security Engineer</option>
                <option value="freelancer">Freelance Developer</option>
                <option value="open-source">Open Source Contributor</option>
                <option value="student">Student / Bootcamp</option>
                <option value="founder">Founder / Indie Hacker</option>
                <option value="other">Other</option>
              </select>
              <span class="field-error">Please select your role.</span>
            </div>

            <div class="field">
              <label>Company / Organisation <span class="optional">optional</span></label>
              <input type="text" name="company" id="company" placeholder="Cres Dynamics, JKUAT, freelance…"/>
            </div>

            <div class="field">
              <label>GitHub profile or repo URL <span class="optional">optional</span></label>
              <input type="url" name="github" id="github" placeholder="https://github.com/username"/>
            </div>

          </div>

          <button type="submit" class="submit-btn" id="submit-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Request early access
          </button>

          <div class="form-footer">
            <p>No spam. We'll notify you when your access is ready — one email, that's it. Unsubscribe anytime.</p>
          </div>
        </form>
      </div>

    </div>
  </section>

</main>

<!-- ============ SUCCESS MODAL ============ -->
<div class="modal-overlay" id="modal-overlay">
  <div class="modal-card" id="modal-card">
    <button class="modal-close" id="modal-close" aria-label="Close">&times;</button>

    <div class="success-ring">
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle class="track" cx="36" cy="36" r="32"/>
        <circle class="progress" cx="36" cy="36" r="32"/>
      </svg>
      <span class="check">&#10003;</span>
    </div>

    <div class="success-position">
      You're on the list at
      <strong>#<span id="your-position">617</span></strong>
    </div>

    <div class="success-msg">
      <h3>Welcome to Codeward! 🎉</h3>
      <p>Congratulations — you've secured your spot. Our team is working around the clock to get every check, every agent, and every sandbox ready for a smooth, safe launch. As an early member, you'll get priority access, founder pricing, and a direct line to shape the roadmap.</p>
    </div>

    <div class="devs-joined">
      <div class="dev-avatars">
        <div class="av" style="background:rgba(59,130,246,0.15);color:#60a5fa;">AK</div>
        <div class="av" style="background:rgba(34,197,94,0.15);color:#22c55e;">SM</div>
        <div class="av" style="background:rgba(245,158,11,0.15);color:#f59e0b;">RO</div>
        <div class="av" style="background:rgba(168,85,247,0.15);color:#c084fc;">JP</div>
        <div class="av" style="background:rgba(239,68,68,0.15);color:#f87171;">TN</div>
      </div>
      <div class="dev-text">
        <strong id="total-count">617 engineers</strong> are already waiting.<br/>
        Firecracker sandboxes ready. Agents standing by.
      </div>
    </div>

    <button class="modal-done-btn" id="modal-done">Got it, thanks!</button>
  </div>
</div>

<script src="/static/app.js"></script>
</body>
</html>`

export default app
