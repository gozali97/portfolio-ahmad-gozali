# Portfolio Ahmad Gozali

Personal portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Clerk** authentication.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3
- **Auth:** Clerk
- **Icons:** Lucide React
- **Data:** JSON files (no database needed)
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Clerk keys

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
```

## Project Structure

```
├── app/
│   ├── layout.js              # Root layout (ClerkProvider + ThemeProvider)
│   ├── page.js                # Landing page (SSG)
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
├── data/                      # JSON data files
│   ├── profile.json
│   ├── projects.json
│   └── techStacks.json
├── lib/data.js                # Data read/write helpers
├── middleware.js               # Clerk auth middleware
└── public/images/             # Static assets
```

## Admin Panel

Access `/admin` after signing in via Clerk. Manage:
- **Projects** — Add, edit, delete portfolio projects
- **Tech Stack** — Manage skills and proficiency levels
- **Profile** — Update bio, social links, and resume

## Deploy to Vercel

```bash
npm run build
# Or connect your GitHub repo to Vercel for auto-deploy
```
