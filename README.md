# JobJourney

A job-tracking dashboard built with Next.js, React, Prisma, Clerk, and Tailwind CSS. This project helps users manage job applications, track status, and view summary statistics in a clean dashboard UI.

## 🚀 Project Overview

- Built with **Next.js 16.2.6** and **React 19.2.4**
- Uses **Prisma** and **PostgreSQL** for database modeling and persistence
- Authentication handled by **Clerk**
- Forms built with **React Hook Form** and **Zod** validation
- Data fetching and caching managed by **React Query**
- UI styled with **Tailwind CSS 4** and **Radix UI** primitives
- Charts created with **Recharts**
- Theme support with **next-themes**

## 📦 Dependencies

### Runtime dependencies

- `@clerk/nextjs` `^7.3.5`
- `@hookform/resolvers` `^5.2.2`
- `@prisma/client` `^7.8.0`
- `@tanstack/react-query` `^5.100.14`
- `@tanstack/react-query-devtools` `^5.100.14`
- `class-variance-authority` `^0.7.1`
- `clsx` `^2.1.1`
- `dayjs` `^1.11.21`
- `lucide-react` `^1.16.0`
- `next` `16.2.6`
- `next-themes` `^0.4.6`
- `radix-ui` `^1.4.3`
- `react` `19.2.4`
- `react-dom` `19.2.4`
- `react-hook-form` `^7.76.0`
- `recharts` `^3.8.1`
- `shadcn` `^4.7.0`
- `sonner` `^2.0.7`
- `tailwind-merge` `^3.6.0`
- `tw-animate-css` `^1.4.0`
- `zod` `^4.4.3`

### Development dependencies

- `@prisma/adapter-pg` `^7.8.0`
- `@tailwindcss/postcss` `^4`
- `@types/node` `^20.19.41`
- `@types/pg` `^8.20.0`
- `@types/react` `^19`
- `@types/react-dom` `^19`
- `dotenv` `^17.4.2`
- `eslint` `^9`
- `eslint-config-next` `16.2.6`
- `pg` `^8.21.0`
- `prisma` `^7.8.0`
- `tailwindcss` `^4`
- `tsx` `^4.22.4`
- `typescript` `^5.9.3`

## 🌐 Deploy

Deploy link: **[Add your deployment URL here]**

## 🎓 What I learned

During this project I learned how to:

- Build a modern dashboard app with **Next.js** and **React 19**
- Integrate **Clerk** authentication into a Next.js app
- Use **Prisma** to model database schema and connect to PostgreSQL
- Implement rich forms with **React Hook Form** and schema validation using **Zod**
- Manage server state and API data with **React Query**
- Create reusable UI components with **Tailwind CSS**, **Radix UI**, and **shadcn/ui**
- Add charts and visual summaries using **Recharts**
- Support theming with **next-themes** and dark mode styles
- Structure a production-ready app with nested routes, loading states, and dashboard pages

## 📁 Project structure

- `app/` - Next.js application routes and layouts
- `components/` - shared UI components and form components
- `lib/` - utility helpers and generated Prisma client
- `prisma/` - database schema, seed script, and migration files
- `utils/` - custom actions, database helpers, and types
