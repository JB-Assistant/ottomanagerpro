# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OilChange Pro (GarageOSPro) is a multi-tenant SaaS CRM for auto repair shops. Built with Next.js 16 (App Router), React 19, TypeScript, Prisma/PostgreSQL, Clerk auth, and Twilio SMS. Shops track customers, vehicles, service records, and send automated SMS reminders.

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run Prisma migrations
npm run db:push          # Push schema to DB (no migration file)
npm run db:studio        # Open Prisma Studio GUI
npm run db:seed          # Seed database with sample data
```

After changing `prisma/schema.prisma`, run `db:migrate` (creates migration) or `db:push` (quick sync), then `db:generate`.

## Architecture

### Route Groups (App Router)

- `app/(auth)/` — Clerk sign-in/sign-up (public)
- `app/(dashboard)/` — Protected pages: dashboard, customers, settings, import, reminders
- `app/(marketing)/` — Public landing page
- `app/api/` — REST API routes, all org-scoped via Clerk `auth()`

### Multi-Tenancy

Every database query is scoped by `orgId` from Clerk's `auth()`. The Organization model links to Clerk via `clerkOrgId`. Clerk webhooks (`/api/webhooks/clerk`) auto-create/update/delete Organization records.

### Key Libraries

- **lib/prisma.ts** — Singleton Prisma client
- **lib/customer-status.ts** — Calculates customer status (overdue/due_now/due_soon/up_to_date) from service records, mileage, and time thresholds
- **lib/reminder-engine.ts** — Evaluates which customers need reminders based on ReminderRules and service due dates
- **lib/template-engine.ts** — Renders SMS templates with `{{variable}}` placeholders (firstName, shopName, dueDate, etc.)
- **lib/twilio.ts** — Twilio SMS send wrapper
- **lib/sms-queue.ts** — Batch SMS sending and inbound SMS processing (STOP/START/BOOK keywords)

### SMS Reminder System

Two cron endpoints power the reminder pipeline:
1. `/api/cron/process-reminders` — Daily: evaluates due services, creates queued ReminderMessage records
2. `/api/cron/send-queued` — Sends queued messages in batches of 100, respects quiet hours

Consent is tracked per-customer (`smsConsent` flag) with an audit log (`ConsentLog` model). Inbound SMS replies are processed via Twilio webhook at `/api/webhooks/twilio`.

### Database Schema (Prisma)

11 models: Organization, Customer, Vehicle, ServiceRecord, FollowUpRecord, ServiceType, ReminderRule, ReminderTemplate, ReminderMessage, ConsentLog, TwilioConfig. Key enums: CustomerStatus, MessageStatus, MessageDirection, ContactMethod, FollowUpOutcome, ConsentAction, ConsentSource.

All tenant data cascades from Organization. Customers are unique per org by phone number.

### UI Stack

- **shadcn/ui** (New York style, zinc base) with Radix UI primitives in `components/ui/`
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Lucide React** icons
- **Recharts** for dashboard charts
- Utility: `cn()` from `lib/utils.ts` (clsx + tailwind-merge)

### Client vs Server Components

Page components are async server components that fetch data directly with Prisma. Interactive forms (`add-customer-form.tsx`, `add-service-form.tsx`, etc.) are `"use client"` components that call API routes via `fetch()`.

### Auth Middleware

`middleware.ts` uses Clerk's `clerkMiddleware` with `createRouteMatcher`. Protected: `/dashboard/*`, `/customers/*`, `/import/*`, `/settings/*`, `/api/*` (except webhooks). Public: `/`, `/sign-in/*`, `/sign-up/*`, `/api/webhooks/*`.

## Environment Variables

Required: `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `CRON_SECRET`. Optional: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `TWILIO_WEBHOOK_URL`. Clerk URL vars are set for sign-in/sign-up/after-auth redirects.

## Conventions

- Path alias: `@/*` maps to project root
- API routes return `NextResponse.json()` with appropriate status codes
- All API routes validate `orgId` from `auth()` before proceeding
- Next.js config: standalone output, ignores TS build errors, allows Clerk image domain
- Pages needing real-time data use `export const dynamic = "force-dynamic"`
