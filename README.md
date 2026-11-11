# Portfolio Ahmad Gozali

Personal portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Clerk** authentication.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3
- **Auth:** Clerk
- **Icons:** Lucide React
- **Data:** MySQL (via `mysql2`)
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Clerk keys and MySQL credentials

# Create database, run migrations, seed from data/*.json (idempotent)
npm run db:setup

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/dashboard

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portofolio
DB_USERNAME=root
DB_PASSWORD=
DB_SSL=false              # true for managed MySQL requiring TLS
DB_CREATE_DATABASE=true   # false if the DB user cannot CREATE DATABASE
```

## Database

Schema changes live in `db/migrations/*.sql` (applied in filename order and tracked in the `migrations` table).
Seed data comes from `data/*.json` and only fills tables that are still empty, so re-running is safe.

| Command | Description |
| --- | --- |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:seed` | Seed empty tables from `data/*.json` |
| `npm run db:setup` | Migrate + seed |
| `npm run db:status` | Show applied / pending migrations |
| `npm run db:fresh` | Drop all tables, then migrate + seed (local only) |

To add a schema change, create a new file such as `db/migrations/002_add_sort_order.sql`.

### Deploy

Production needs a MySQL host reachable from Vercel (`127.0.0.1` only works locally).

1. Create `.env.production` (gitignored) with the production `DB_*` values, plus `DB_SSL=true` if the provider requires TLS and `DB_CREATE_DATABASE=false` if the user cannot create databases.
2. Run `npm run db:deploy` (migrate + seed), or `npm run db:migrate:prod` / `npm run db:seed:prod` separately.
3. Add the same `DB_*` variables in Vercel → Project Settings → Environment Variables.

In CI, you can set the `DB_*` variables in the environment instead and run `node scripts/db.mjs setup`. Environment variables take precedence over values in env files.

## Project Structure

```
├── app/
│   ├── layout.js              # Root layout (ClerkProvider + ThemeProvider)
│   ├── page.js                # Landing page (ISR, revalidated on admin writes)
│   ├── globals.css            # Global styles
│   ├── admin/
│   │   ├── layout.js          # Admin sidebar layout
│   │   ├── dashboard/page.js  # Stats overview
│   │   ├── projects/page.js   # CRUD projects
│   │   ├── tech/page.js       # CRUD tech stack
│   │   ├── profile/page.js    # Edit profile
│   │   └── sign-in/           # Clerk sign-in
│   └── api/
│       ├── profile/route.js   # GET/PUT profile
│       ├── projects/route.js  # GET/POST projects
│       ├── projects/[id]/     # GET/PUT/DELETE project
│       ├── tech/route.js      # GET/POST tech stacks
│       └── tech/[id]/         # GET/PUT/DELETE tech stack
├── components/                # React components
├── data/                      # Seed data for `npm run db:setup`
│   ├── profile.json
│   ├── projects.json
│   └── techStacks.json
├── lib/db.js                  # MySQL connection pool
├── lib/data.js                # Data read/write helpers (MySQL)
├── db/migrations/             # Versioned SQL migrations
├── scripts/db.mjs             # migrate / seed / status / fresh CLI
├── middleware.js               # Clerk auth middleware
└── public/images/             # Static assets
```

## Admin Panel

Access `/admin` after signing in via Clerk. Manage:
- **Projects** — Add, edit, delete portfolio projects
- **Tech Stack** — Manage skills and proficiency levels
- **Profile** — Update bio, social links, and resume

### File uploads

Avatar, resume (PDF), project images, and tech icons can be uploaded directly from the admin forms (max 8 MB; images: png/jpg/webp/gif/svg/ico, documents: pdf).
Files are saved to `storage/uploads/{images,documents}/` (override with `UPLOAD_DIR`) and served at `/uploads/...`. The upload endpoint `/api/upload` requires sign-in.

> ⚠️ The filesystem on Vercel is ephemeral/read-only, so uploads are **not persistent** there. Use a server/VPS with a persistent `UPLOAD_DIR` or switch to object storage (e.g. Vercel Blob/S3) for production.

## Deploy to Vercel

```bash
npm run build
# Or connect your GitHub repo to Vercel for auto-deploy
```
