# 📚 CourseHub — Course Management Platform

A modern, full-stack course management web application built with **Next.js 16**, **Supabase**, and **tRPC v11**. Features secure authentication, CRUD operations, pagination, and a premium dark UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3FCF8E?style=flat-square&logo=supabase)
![tRPC](https://img.shields.io/badge/tRPC-v11-2596BE?style=flat-square&logo=trpc)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

## ✨ Features

- **🔐 Secure Authentication** — Email/password sign up & sign in via Supabase Auth with middleware-based route protection
- **📖 Full CRUD** — Create, Read, Update, and Delete courses with form validation (Zod)
- **📄 Pagination** — Server-side pagination with smart page number display
- **🔍 Search** — Debounced search across course titles and descriptions
- **🛡️ Row Level Security** — Supabase RLS policies ensure users only access their own data
- **🎨 Premium Dark UI** — Glassmorphism, gradient accents, micro-animations, skeleton loaders
- **📱 Responsive** — Fully responsive design (mobile → desktop)
- **⚡ Type-Safe** — End-to-end type safety with tRPC + TypeScript + Zod

## 🏗️ Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── api/trpc/[trpc]/route.ts  # tRPC fetch adapter
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── (dashboard)/              # Protected pages (courses)
│   ├── globals.css               # Design system
│   └── layout.tsx                # Root layout with providers
├── server/                       # Server-side code
│   ├── trpc/                     # tRPC config (init, context, router)
│   └── routers/                  # Domain routers (course.ts)
├── lib/                          # Shared libraries
│   ├── supabase/                 # Supabase clients (browser, server, middleware)
│   └── trpc/                     # tRPC React client
├── components/                   # React components
│   ├── auth/                     # LoginForm, SignupForm
│   ├── courses/                  # CourseCard, CourseForm, CourseList, Pagination
│   ├── providers/                # TRPCProvider
│   └── ui/                       # Navbar, Toast
├── middleware.ts                 # Auth middleware (session refresh + protect routes)
└── supabase/migrations/          # SQL migration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account and project

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** and run the migration script:
   - File: `supabase/migrations/001_create_courses.sql`
3. Go to **Project Settings → API** and copy your:
   - Project URL
   - `anon` public API key

### 3. Configure Environment Variables

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page.

### 5. Create an Account

1. Click **"Create an Account"** on the login page
2. Fill in your details (password must be 8+ chars, uppercase, number)
3. Check your email to verify (if email confirmation is enabled in Supabase)
4. Log in and start creating courses!

## 🔧 Tech Stack

| Technology            | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| **Next.js 16**        | Full-stack React framework (App Router)          |
| **Supabase**          | Auth + PostgreSQL database + Row Level Security  |
| **tRPC v11**          | Type-safe API layer with React Query integration |
| **TanStack Query v5** | Server state management, caching                 |
| **Zod v4**            | Schema validation for API inputs                 |
| **TypeScript 5**      | End-to-end type safety                           |
| **Tailwind CSS v4**   | Utility-first styling                            |
| **Lucide React**      | Beautiful icon library                           |
| **React Hot Toast**   | Toast notifications                              |

## 🛡️ Security

- **Supabase Auth** handles password hashing, session tokens, and JWTs
- **Row Level Security (RLS)** ensures users can only access their own courses at the database level
- **tRPC Protected Procedures** verify authentication before allowing CRUD operations
- **Next.js Middleware** refreshes sessions and redirects unauthenticated users
- **Zod Validation** sanitizes all inputs on both client and server

## 📜 License

MIT
