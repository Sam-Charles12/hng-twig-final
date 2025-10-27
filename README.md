# TicketFlow (Twig)

A lightweight, client-side ticket management app built with Twig templates and a minimal PHP router. It uses Tailwind CSS for styling, Lucide for icons, and Toastify for notifications. All data and auth are client-only (localStorage), making it fast to set up and easy to demo.

## Tech stack

- Twig (templating)
- PHP (simple router) — no server/db logic beyond serving templates
- Tailwind CSS (CDN)
- Lucide icons (CDN)
- Toastify (CDN)
- Client-side modules (vanilla JS):
  - `Auth` (localStorage-based session)
  - `TicketManager` (localStorage CRUD with demo data)
  - `URLHelper` (base-path aware navigation)

## Features

- Marketing landing page with decorative wave and circles
- Auth screens (Login, Register) with validation and toasts
- Protected app pages (Dashboard, Tickets, Ticket Form, Ticket Detail)
- Full ticket CRUD using localStorage (create, read, update, delete)
- Responsive UI with a 1440px content max width
- Navbar that adapts to authentication state (login/signup vs user menu)
- Toast notifications for key actions

## Project structure

- `index.php` — tiny router with dynamic `base_path` injection
- `templates/base.twig` — global layout, assets, navbar/footer
- `templates/partials/` — `navbar.twig`, `footer.twig`
- `templates/pages/` — `landing.twig`, `login.twig`, `register.twig`, `dashboard.twig`, `tickets.twig`, `ticket-form.twig`, `ticket-detail.twig`
- `public/js/` — `auth.js`, `tickets.js`, `url-helper.js`

## Prerequisites

- PHP 8+ (works with XAMPP/Apache on Windows)
- Composer for Twig: `composer require twig/twig`

## Running locally (Windows + XAMPP)

1. Place the repo under your web root, e.g. `C:\xampp\htdocs\hng-twig`.
1. Install Twig dependencies using Composer in the project folder:

```powershell
cd C:\xampp\htdocs\hng-twig
composer install
```

1. Start Apache in XAMPP, then open:

- <http://localhost/hng-twig/index.php>
- The app auto-detects the base path (e.g., `/hng-twig`) for links via `URLHelper`.

Optional: If you serve from web root (e.g., <http://localhost/>), base path detection will be empty and still work.

## Routes

Public:

- `/` — Landing page
- `/login` and `/auth/login` — Login
- `/register` and `/auth/register` — Register

Protected (requires client-side auth):

- `/dashboard` — Overview, stats, recent tickets, quick actions
- `/tickets` — List with view/edit/delete
- `/ticket-form` — Create or edit (uses `?id=` for edit mode)
- `/ticket-detail` — Detail view (uses `?id=`)

## Authentication

- Client-only (no backend): session stored in `localStorage` under `ticketapp_session`.
- Any valid email/password signs you in. Use `admin@example.com` to get `admin` role (for demo only).
- Logout clears session and redirects home.

## Tickets data

- Stored in `localStorage` under `ticketapp_tickets` with demo seed data.
- Ticket fields: `id`, `title`, `description`, `status` (`open|in_progress|closed`), `priority` (`low|medium|high|critical`), `assignee`, `createdAt`, `updatedAt`, `createdBy`.

## Compliance checklist (Stage 2)

- [x] Twig base layout with navbar and footer partials
- [x] Tailwind, Lucide, Toastify CDNs integrated
- [x] Landing page with wave SVG and decorative circles; responsive, max width 1440px
- [x] Client-side auth (login/register), localStorage session (`ticketapp_session`)
- [x] Protected routes: dashboard, tickets, ticket form, ticket detail (redirects to `/auth/login` when unauthenticated)
- [x] Full tickets CRUD via `TicketManager` (localStorage) + validation
- [x] Separate ticket form and ticket detail pages
- [x] Tickets list includes “View” text button and icon-only edit/delete
- [x] Navbar reflects auth state; user dropdown and new ticket action
- [x] Dashboard with stats, recent tickets, quick actions, critical alert, overview
- [x] Dynamic base path handling for dev/prod via `URLHelper`

## Notes and decisions

- Router aliases: `/auth/login` and `/auth/register` are supported in addition to `/login` and `/register`.
- All protected pages now redirect to `/auth/login` if not authenticated.
- Toastify is loaded once globally in `base.twig`; page-level duplicates were removed.
- No server-side persistence is implemented by design; it’s a front-end demo using Twig templates.

## Troubleshooting

- If links look broken in a subfolder setup, confirm the app is served at `http://localhost/hng-twig/` and that `URLHelper` detects the base path. Refresh after changing folders.
- If Twig templates don’t render, ensure Composer dependencies are installed and Apache’s document root points to the project folder.
- Clearing browser storage will reset the demo tickets and auth session.

## License

MIT
