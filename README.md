# Codeward — Waitlist Landing Page

## Project Overview
- **Name**: Codeward Waitlist
- **Goal**: A centered, card-based waitlist landing page for **Codeward** — "the automated principal engineer sitting on every PR." Collects early-access signups with a live queue position and a celebratory success popup.
- **Features**:
  - Fully centered, single-column layout — no header/footer, everything flows as stacked glass-morphism cards
  - Custom background (starry pink/blue sunset artwork) with a dark gradient overlay for readability
  - **DM Sans** typography throughout (with **JetBrains Mono** for numeric/code accents)
  - Animated hero counters (count-up animation) for waitlist size, checks, speed, and cost
  - Scroll-triggered reveal animations on every card (IntersectionObserver, staggered)
  - "Problem" cards explaining what Codeward solves
  - 3 large "testimonial-style" cards showing real pain points from an engineer at Vercel and two African startup founders (Lagos, Nairobi)
  - "How it works" 4-step card grid
  - Waitlist form as the final section, but linked directly from a prominent hero CTA button so users can jump straight to it
  - Server-validated join flow backed by **Vercel Postgres** (persistent, not in-memory)
  - Duplicate-email detection (returns existing queue position instead of erroring)
  - Success **popup modal** on submit: shows the user's exact queue position, a congratulations message, mentions the team is working hard for a safe launch + early-member benefits, plus a live "N engineers waiting" strip — all with a canvas-free CSS/Web-Animations **confetti burst**
  - Live stats endpoint keeps the "already joined" counter in sync with the real DB count

## URLs
- **Local/Sandbox preview**: (see sandbox service URL provided in session)
- **Production**: Not yet deployed — see Deployment section below

## Data Architecture
- **Data Model**: `waitlist_entries` table
  - `id` (PK, autoincrement)
  - `name`, `email` (unique), `role`, `company` (optional), `github` (optional)
  - `position` — sequential position within this DB (added to a `BASE_COUNT` of 616 to look like a live, growing waitlist)
  - `created_at`
- **Storage Service**: Vercel Postgres
- **Data Flow**:
  1. Frontend `POST /api/join` → Hono validates fields → checks for existing email → inserts row → returns `{ position, total }`
  2. Frontend `GET /api/stats` → returns live total count (`BASE_COUNT + rows`) used to keep counters accurate on page load
  3. Success modal reads `position`/`total` straight from the API response — no client-side guessing

## API Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/` | Renders the full landing page |
| GET | `/api/stats` | Returns `{ count }` — current live total on the waitlist |
| POST | `/api/join` | Body: `{ name, email, role, company?, github? }`. Returns `{ success, position, total }` or `{ alreadyJoined, position, total }` if the email already exists. Validates name (≥2 chars), email format, and required role. |

## User Guide
1. Visitor lands on the hero, reads the value proposition, and can click **"Join the waitlist"** to smooth-scroll straight to the form (skipping past all the content) or scroll normally through problem/testimonial/how-it-works cards.
2. Fill in **Full name**, **Work email**, and **Role** (required); Company and GitHub URL are optional.
3. On submit, the button shows a loading spinner, then a **popup** appears with:
   - Animated checkmark ring
   - The user's exact queue position (e.g. `#617`)
   - A congratulations + "we're working hard for a safe launch, you'll get benefits" message
   - A live count of how many engineers have joined, with avatar chips
   - A confetti burst thrown across the whole screen
4. Submitting the same email twice returns the same position instead of creating a duplicate row.

## Deployment
- **Platform**: Vercel (Hono + Vite + Vercel Edge/Serverless Functions)
- **Status**: ❌ Not yet deployed to production — currently running locally in the sandbox via PM2 + `npm run dev` with Vercel Postgres
- **Tech Stack**: Hono (TypeScript, JSX-free — HTML returned via `c.html()`), Vercel Postgres, vanilla JS (no framework) + Web Animations API for confetti, DM Sans / JetBrains Mono via Google Fonts, Tailwind-free hand-written CSS with glassmorphism cards

### Data Structure (Vercel Postgres)
- Users: `id`, `name`, `email`, `role`, `company`, `github`, `position`, `created_at`

### Production Deployment Notes
- **To deploy to production**: Link your repository to Vercel, provision a Vercel Postgres database via the Storage tab, run the `schema.sql` queries, and Vercel will automatically build and deploy it using `vite build`.
- Production Vercel deployment
- Email notification integration (e.g. via Resend/SendGrid) when a user's access is ready
- Admin view / export of waitlist entries
- Rate limiting on `/api/join` to prevent spam submissions
- Optional: social share button in the success modal ("I'm #617 on the Codeward waitlist")
