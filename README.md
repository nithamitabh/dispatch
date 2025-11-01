# ⚡ Dispatch - CI/CD for Newsletters

> **Write in Markdown. Push to GitHub. We handle the rest.**  
> Automate your newsletter publishing with GitHub integration.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📦 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Database & Auth:** [Supabase](https://supabase.com)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Language:** TypeScript
- **Deployment:** [Vercel](https://vercel.com)

---

## 🗺️ Development Roadmap

### 🧱 Phase 1 — Core Dashboard (Next.js + Supabase)

**Goal:** Basic user dashboard, login, and repo connection.

#### ✅ Completed Features

- [x] 🎨 **Beautiful SaaS Landing Page**
  - Hero section with animated gradients
  - Feature cards with hover effects
  - Responsive design with mobile menu
  - Stats showcase and "How It Works" section

- [x] 🔐 **GitHub OAuth Authentication**
  - Login page with glassmorphism design
  - OAuth integration via Supabase
  - Loading page with real-time status updates
  - Secure httpOnly cookie session management

- [x] 🌓 **Light & Dark Theme System**
  - React Context with localStorage persistence
  - Amber/cream light theme + Cyan/blue dark theme
  - Theme toggle component with sun/moon icons
  - Smooth transitions across all pages

- [x] 📊 **Dashboard Layout**
  - Sidebar navigation (Home, Publications, Settings)
  - User profile display with GitHub username
  - Stats cards with animations
  - Recent publications list
  - Getting started checklist

- [x] 📰 **Publications Management**
  - Create new publication (repo name + webhook secret)
  - Publications table with GitHub icons
  - Copy webhook URL button
  - Delete publication functionality
  - Empty state with CTA

- [x] ⚙️ **Settings Page**
  - Theme selector with preview cards
  - Account settings section
  - GitHub integration status
  - Danger zone for account deletion

- [x] 🎯 **User Experience**
  - Smooth scrolling throughout app
  - Loading states for async operations
  - Clean error handling (no console logs)
  - External features page redirect

#### 🚧 In Progress

- [X] 🔗 **Webhook URL Generation**
  - Generate unique webhook endpoints per publication
  - Display webhook setup instructions

- [X] 💾 **Token Storage**
  - Store GitHub access_token securely in Supabase
  - Encrypt sensitive tokens

#### 📋 Remaining Phase 1 Tasks

- [X] ✅ **Basic Testing**
  - Test GitHub OAuth flow end-to-end
  - Verify publication CRUD operations
  - Test theme persistence across sessions

---

### ⚙️ Phase 2 — Webhook Trigger (Fast + Reliable)

**Goal:** Receive GitHub push events and queue jobs.

#### 🎯 Planned Features

- [ ] 🪝 **Webhook Endpoint**
  - `/api/github/webhook` route in Next.js
  - Validate GitHub signature using shared secret
  - Parse push event payload

- [ ] 📋 **Job Queue System**
  - Create `jobs` table in Supabase
  - Insert job on push: `{ repo, commit, status }`
  - Simple queue without QStash (Supabase as mini queue)

- [ ] 🔔 **Event Processing**
  - Detect MDX file changes in push events
  - Filter relevant commits
  - Queue processing jobs

---

### 🧠 Phase 3 — Processing Worker (MDX to Email HTML)

**Goal:** Process MDX → HTML for email delivery.

#### 🎯 Planned Features

- [ ] ⏰ **CRON Job / Worker**
  - Vercel Cron Job or Next.js route
  - Run every few minutes
  - Pull next unprocessed job from `jobs` table

- [ ] 📝 **MDX Processing Pipeline**
  - Fetch `.mdx` file from GitHub API
  - Parse using `mdx-bundler`
  - Sanitize HTML with `DOMPurify`
  - Inline CSS via `juice`
  - Save HTML to `posts` table

- [ ] 🚀 **Job Status Updates**
  - Update job status: `pending → processing → completed`
  - Error handling and retry logic
  - Webhook status notifications

---

## 🏗️ Project Structure

```
dispatch/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page with GitHub OAuth
│   │   └── loading/        # OAuth callback loading page
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── publications/   # Publications CRUD API
│   │   └── user/           # User profile API
│   ├── dashboard/
│   │   ├── publications/   # Publications management
│   │   ├── settings/       # User settings
│   │   ├── layout.tsx      # Dashboard wrapper with sidebar
│   │   └── page.tsx        # Dashboard home
│   ├── globals.css         # Global styles & theme
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── header.tsx          # App header
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Theme switcher button
├── lib/
│   ├── auth.ts             # Server-side auth helper
│   └── supabaseClient.ts   # Supabase client config
└── public/                 # Static assets
```

---

## 🗄️ Database Schema

### `publications` table
```sql
id              uuid PRIMARY KEY
user_id         uuid REFERENCES auth.users
repo_name       text NOT NULL
webhook_secret  text
created_at      timestamptz DEFAULT now()
```

### `user_tokens` table
```sql
user_id         uuid PRIMARY KEY REFERENCES auth.users
access_token    text NOT NULL (encrypted)
created_at      timestamptz DEFAULT now()
```

### `jobs` table (Phase 2)
```sql
id              uuid PRIMARY KEY
publication_id  uuid REFERENCES publications
commit_sha      text NOT NULL
status          text DEFAULT 'pending'
created_at      timestamptz DEFAULT now()
processed_at    timestamptz
```

### `posts` table (Phase 3)
```sql
id              uuid PRIMARY KEY
job_id          uuid REFERENCES jobs
html_content    text
metadata        jsonb
created_at      timestamptz DEFAULT now()
```

---

## 🌐 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# GitHub OAuth (configured in Supabase)
# Callback URL: https://your-domain.com/api/auth/callback
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (TypeScript + ESLint)
- Add meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Links

- **Live Demo:** [Coming Soon]
- **Features Documentation:** [https://dispatch-mdx.vercel.app/](https://dispatch-mdx.vercel.app/)
- **GitHub:** [Repository Link]

---

**Built with ❤️ by the Dispatch team**
