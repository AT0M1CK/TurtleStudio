# Turtle Studio — Project Brief for Claude Code

## What this is
Turtle Studio is a minimal, mobile-first production companion app for indie filmmakers, built by Turtle Theory (a 5-person independent filmmaking crew in Kerala, India). It is NOT a clone of StudioBinder. It is a lightweight tool focused on one core loop: pre-production basics → shoot day execution → keeping the project's creative history in one place.

Design philosophy: minimal, fast, mobile-first, zero clutter. Every screen must be understandable in under 10 seconds with no onboarding. If a feature needs an explainer, cut it or simplify it.

---

## Tech Stack
- **Frontend:** Next.js 14, App Router, TypeScript (strict mode)
- **Styling:** Tailwind CSS only — no component library unless explicitly requested
- **Backend/DB:** Supabase (Postgres, Auth, Storage, Realtime)
- **Hosting:** Vercel
- **AI (V2, not MVP):** Anthropic API, Claude Haiku 4.5, server-side only

---

## Conventions
- Use Server Components by default. Only use `'use client'` when interactivity is required.
- Use `@supabase/ssr` helpers for auth — never expose service role keys client-side.
- API/data logic lives in Server Actions or `app/api/*/route.ts` — keep it server-side.
- Environment variables go in `.env.local`, never committed.
- Every async page gets a corresponding `loading.tsx` and `error.tsx`.
- Mobile-first CSS — design for a 375px viewport first, then scale up.
- Dark theme by default. One accent color. No gradient soup, no excessive shadows, no generic "AI dashboard" look. This should feel like a tool a filmmaker is proud to use, not a SaaS template.
- Run `npm run build` after any major feature addition. Fix all TypeScript errors before moving to the next feature.
- Row Level Security (RLS) must be enabled on every table — no exceptions, even in MVP.

---

## Database Schema (already created in Supabase)
Five tables: `profiles`, `projects`, `project_members`, `shoot_days`, `shots`.
Relationships: a user owns/joins projects via `project_members` (with a `role` field). Each project has `shoot_days`. Each shoot day has `shots`.
RLS policies already applied — owners and members can view their own projects only.

---

## MVP Scope — Build in this exact order, one feature at a time. Do not skip ahead.

1. **Auth** — Supabase email/password sign up, login, logout. Redirect to dashboard on success.
2. **Dashboard** — list of the logged-in user's projects (owned + member-of), with status badges (pre-production / shooting / post-production / done). "Create Project" button.
3. **Create/View Project** — project name, description, status. Shows team list and shoot days.
4. **Team Management** — add a project member by email, assign a role (director, writer, DP, sound, editor, AD, etc.). Members see a role label on their dashboard.
5. **Shoot Day** — create a shoot day (date, location, call time, notes). Add shots to it (scene number, description, shot type, completed checkbox, drag-reorder via order_index).
6. **Shoot Day Share** — a button that generates a clean, formatted text summary of the shoot day and opens it in WhatsApp (via `wa.me` link) for the user to send to their crew.
7. **Polish & Deploy** — fix bugs, responsive check on mobile, deploy to Vercel with the custom domain.

## Explicitly OUT of scope for MVP — do not build unless told to:
- Real-time collaborative script co-editing (single-editor only, others view)
- In-app chat / messaging
- AI script breakdown or AI storyboard generation
- Public searchable profiles / talent marketplace
- Badges / gamification
- Call sheet PDF generation
- Budget tracking
- In-app video meetings
- Google Maps API embedding (use a plain `maps.google.com/?q=lat,lng` link instead)

---

## First Prompt to Give Claude Code

Copy-paste this as your first message after running `claude` in the project folder:

```
This is a Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase project called
Turtle Studio — a minimal, mobile-first production companion app for indie filmmakers.
Read CLAUDE.md in this repo root for full project context, conventions, and scope before
doing anything else.

Supabase environment variables are already set in .env.local. The database schema
(profiles, projects, project_members, shoot_days, shots) is already created with RLS
policies applied.

Start with Step 1 from the MVP Scope in CLAUDE.md: set up the Supabase client (browser
and server, following @supabase/ssr best practices), build a clean minimal landing page,
and implement authentication — email/password sign up and login using Supabase Auth,
with logout functionality. Redirect authenticated users to a placeholder /dashboard route.

Design: dark theme, mobile-first, minimal — not a generic SaaS template. One accent color.

Do not build anything beyond auth in this step. I will test it and confirm before we move
to Step 2.
```

After auth works, give Claude Code one step at a time from the MVP Scope list above. Test each step before moving to the next. Do not let it build multiple features in one prompt — that's how bugs hide.
