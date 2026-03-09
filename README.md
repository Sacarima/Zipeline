# Zipeline

Zipeline is a work Automation platform, the project is still under development, for this particular assessment there a  AI-powered job description analysis feature built with **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **Aceternity UI**.

It combines a polished marketing-style landing page with a protected application area, passwordless authentication, and an AI workflow for analyzing job descriptions into structured output.

The project was built as a frontend-focused technical assessment and is intentionally organized to highlight architecture, maintainability, modern React patterns, accessibility, and production-oriented tooling.

## Live Demo

- **Production URL:** `<After deployement I need to add the URL here>`
- **Public GitHub Repository:** `<My github link will be placed here>`

---

## Overview

Zipeline has two main product surfaces:

### 1. Public landing page
The landing page acts as the product entry point and marketing surface. It introduces the product visually, uses animated UI sections, and establishes the design system used across the rest of the app.

### 2. Protected app area
Authenticated users can access the application shell and interact with the AI job description workflow inside a shared dashboard-style layout.

This split was intentional:
- the **landing page** demonstrates product presentation, layout composition, theme support, and animation
- the **protected app area** demonstrates route organization, shared layouts, auth protection, stateful UI, and form-driven workflows

---

## Features

- Modern landing page with animated UI sections
- AI-powered job description analysis
- Passwordless authentication via Supabase magic link
- Protected dashboard/application area
- Shared authenticated layout
- Responsive desktop and mobile navigation
- Light and dark mode support
- “Coming soon” handling for incomplete sections
- Local Web Vitals instrumentation
- Unit and route tests with Vitest + Testing Library
- End-to-end coverage with Playwright
- Linting, type-checking, Lighthouse, Husky hooks, commit linting, and Changesets

---

## Tech Stack

### Core
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

### UI / Design System
- **shadcn/ui**
- **Aceternity UI**
- **lucide-react**
- **framer-motion / motion**
- **next-themes**

### Forms / Validation
- **react-hook-form**
- **zod**
- **@hookform/resolvers**

### AI / Auth
- **OpenAI SDK**
- **Supabase Auth** for passwordless login

### Quality / Tooling
- **ESLint**
- **Vitest**
- **Testing Library**
- **Playwright**
- **Lighthouse CI**
- **Husky**
- **lint-staged**
- **commitlint**
- **Changesets**

---

## UI Approach

This project uses a blend of **shadcn/ui** and **Aceternity UI**.

### Why both
- **shadcn/ui** is used for reusable, accessible building blocks such as forms, buttons, inputs, tooltips, and layout-friendly primitives.
- **Aceternity UI** is used for more expressive visual sections and motion-based presentation, especially on the landing page and authentication experience.

This combination allowed the project to keep:
- a consistent design system
- strong accessibility defaults
- expressive visual presentation where appropriate
- maintainable component composition

---

## Architecture

The codebase is organized around clear boundaries between:
- routes/layouts
- shared UI primitives
- composed feature components
- external integrations
- validation and types

### High-level routing structure

#### Public routes
- `/`
- `/login`
- `/auth/confirm`

#### Protected routes
Protected routes live inside the shared grouped layout under:
- `src/app/(main)/layout.tsx`

Examples:
- `/dashboard`
- `/job-description`
- `/settings`
- `/billing`
- `/connections`
- `/workflows`

This ensures that authenticated routes share one layout shell and one access control point.

---

## Why the app is structured this way

As per requirement, I should focused on:
- modern React patterns
- component organization
- route/layout thinking
- maintainability
- production readiness

Because of that, the project intentionally emphasizes frontend architecture over backend.

### Key decisions

#### 1. Route groups + shared layout
The authenticated area lives behind a shared grouped layout:
- `src/app/(main)/layout.tsx`

This keeps navigation, infobar, mobile nav, and route protection centralized.

#### 2. Route protection at layout level
Instead of only guarding individual pages client-side, the protected app shell is checked at the shared layout level. This avoids rendering private navigation and dashboard chrome for unauthenticated users.

Relevant file:
- `src/app/(main)/layout.tsx`

#### 3. Passwordless auth instead of backend complexity(as the requirement pointed)
The assessment did not require a full backend/database implementation. To bypass that I opted to use supabase with Passwordless authentication.

Relevant files:
- `src/app/login/page.tsx`
- `src/app/auth/confirm/route.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`

#### 4. Typed validation and form handling
User input is handled with `react-hook-form` and `zod` for maintainable, typesafe validation.

Relevant files:
- `src/components/forms/job-description-form.tsx`
- `src/app/login/page.tsx`

#### 5. Clear component layering
The project separates:
- `src/app` → routes, layouts, route handlers
- `src/components/ui` → reusable low-level UI primitives
- `src/components/global` → app-wide composed visual components
- `src/components/forms` → feature-oriented forms
- `src/lib` → constants, schemas, external clients, shared types

---

## Landing Page

The landing page lives at:

- `src/app/page.tsx`

It is the public-facing entry point of the product and is designed to:
- present the product visually
- establish the brand/design language
- showcase motion and compositional UI
- provide a polished first impression before authentication

It uses a mix of:
- global UI sections
- animated visual components
- theme-aware styling
- marketing/product-oriented composition

Relevant files include:
- `src/app/page.tsx`
- `src/components/global/navbar.tsx`
- `src/components/global/footer.tsx`
- `src/components/global/lamp.tsx`
- `src/components/global/connect-parallax.tsx`
- `src/components/global/container-scroll-animation.tsx`
- `src/components/global/infinite-moving-cards.tsx`
- `src/components/global/sparkles.tsx`
- `src/components/background-beams-with-collision-demo.tsx`

---

## Authentication Flow

The application uses **Supabase passwordless email login**.

### Flow
1. User visits `/login`
2. User enters email
3. Supabase sends a magic link
4. User clicks the emailed link
5. `/auth/confirm` verifies the token
6. Session is established
7. Protected routes under `(main)` become accessible

### Relevant files
- `src/app/login/page.tsx`
- `src/app/login/page.test.tsx`
- `src/app/auth/confirm/route.ts`
- `src/app/auth/confirm/route.test.ts`
- `src/app/auth/logout-button.tsx`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`


---

## AI Job Description Flow

The app includes a typed AI workflow for analyzing job descriptions.

### Flow
1. User submits job description text
2. Frontend validates the payload
3. The request is sent to the route handler
4. Server-side logic calls OpenAI
5. The response is normalized into a typed structure
6. The UI renders the structured result

### Relevant files
- `src/components/forms/job-description-form.tsx`
- `src/app/api/job-description/analyze/route.ts`
- `src/app/api/job-description/analyze/route.test.ts`
- `src/lib/openai/client.ts`
- `src/lib/openai/analyze-job.ts`
- `src/lib/schemas/job-analysis.schema.ts`
- `src/components/job-description/result-panel.tsx`
- `src/components/job-description/result-panel.test.tsx`

---

## Navigation

The app contains both desktop and mobile navigation.

### Desktop
- `src/components/sidebar/index.tsx`

### Mobile
- `src/components/sidebar/mobile-nav.tsx`

Navigation items that are not yet implemented are intentionally marked as **Coming soon** instead of routing users to missing pages. This was a deliberate UX improvement over sending users to a 404 page.
Majoruty of the links in the landing/product page do not work, As I mainly focus on design and the scope of this assement doesn't require it.

Relevant file:
- `src/lib/constant.ts`

---

## Theming

The application supports both **light** and **dark** mode.

### Implementation
- `next-themes` handles theme switching
- Tailwind and CSS variables handle theme-aware styling
- `ThemeProvider` is wired at the root layout level

Relevant files:
- `src/providers/theme-provider.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/global/mode-toggle.tsx`

Dark mode is the primary visual style, but light mode support is also implemented for key surfaces, including the authentication flow.

---

## Accessibility

Accessibility was treated as a core implementation concern.

Examples include:
- semantic landmarks (`main`, `nav`, `section`, `footer`)
- explicit form labels and validation messaging
- `aria-current` for active nav state
- `aria-disabled` for “Coming soon” items
- live region messaging for confirmation states
- tooltip triggers on semantic interactive elements
- keyboard-focus-compatible navigation and controls

The goal was to keep the app polished without sacrificing usability.

---

## Local Core Web Vitals

The project includes local Web Vitals instrumentation.

Relevant file:
- `src/components/analytics/web-vitals.tsx`

This component is mounted from the root layout and is used to capture performance signals during development and local evaluation.

Relevant root file:
- `src/app/layout.tsx`

In addition to local instrumentation, the project also includes **Lighthouse CI** support for repeatable performance checks.

Relevant files:
- `lighthouserc.json`
- `.lighthouseci/`

---

## Project Structure

```txt
src
├── app
│   ├── (main)
│   │   ├── (pages)
│   │   │   ├── billing
│   │   │   ├── connections
│   │   │   ├── dashboard
│   │   │   ├── job-description
│   │   │   ├── settings
│   │   │   └── workflows
│   │   └── layout.tsx
│   ├── api
│   │   └── job-description/analyze
│   ├── auth
│   │   ├── callback
│   │   ├── confirm
│   │   └── logout-button.tsx
│   ├── login
│   │   ├── page.tsx
│   │   └── page.test.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── analytics
│   ├── forms
│   ├── global
│   ├── icons
│   ├── infobar
│   ├── job-description
│   ├── sidebar
│   └── ui
├── lib
│   ├── openai
│   ├── schemas
│   ├── supabase
│   ├── constant.ts
│   ├── types.ts
│   └── utils.ts
├── providers
└── test
```

Running Locally
Prerequisites

Node.js >=20

npm >=10

These versions are enforced in package.json.

1. Clone the repository
```
git clone <ADD_PUBLIC_GITHUB_REPO_URL_HERE>
cd ai-job-description
```

2. Install dependencies
```
npm install
```
3. Configure environment variables

Create a .env file using .env.example as a reference.

Example:
```
OPENAI_API_KEY=your_openai_api_key

NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_or_anon_key
```
4. Configure Supabase Auth

In Supabase:

set Site URL to:
```
http://localhost:3000
```
add this Redirect URL:

```
http://localhost:3000/auth/confirm
```
5. Start the development server
```
npm run dev
```
Then open:
```
http://localhost:3000
```
Scripts
Development
```
npm run dev
```
Production build
```
npm run build
npm run start
```
Linting
```
npm run lint
```
Type checking
```
npm run typecheck
```
Tests
```
npm run test
npm run test:run
npm run test:watch
npm run test:coverage
```
E2E
```
npm run e2e
npm run e2e:ui
```
Lighthouse
```
npm run lhci
```
Security audit
```
npm run audit
```
Release / versioning
```
npm run changeset
npm run version-packages
```
Quality Tooling

The project includes several tools aimed at production readiness and maintainability.

ESLint

Used for code quality, consistency, and React/Next best practices.

Vitest + Testing Library

Used for unit and UI behavior tests.

Playwright

Used for browser-level testing of user flows.

Lighthouse CI

Used for repeatable performance verification.

Husky + lint-staged

Used to catch issues before code is committed or pushed.

commitlint

Ensures consistent commit message formatting.

Changesets

Supports maintainable versioning and release workflows.

Coverage output

Coverage reports are generated locally and available under:

coverage/

Testing
Current automated coverage includes

job description analysis route logic

auth confirmation redirects

login page behavior

result panel UI behavior

Relevant files:

src/app/api/job-description/analyze/route.test.ts

src/app/auth/confirm/route.test.ts

src/app/login/page.test.tsx

src/components/job-description/result-panel.test.tsx

e2e/job-description.spec.ts

Reviewer Guide

If you are reviewing this project, these are the best starting points.

Product entry point

src/app/page.tsx

Shared authenticated shell

src/app/(main)/layout.tsx

Authentication

src/app/login/page.tsx

src/app/auth/confirm/route.ts

src/lib/supabase/client.ts

src/lib/supabase/server.ts

AI flow

src/components/forms/job-description-form.tsx

src/app/api/job-description/analyze/route.ts

src/lib/openai/analyze-job.ts

Navigation / shell

src/components/sidebar/index.tsx

src/components/sidebar/mobile-nav.tsx

src/components/infobar/index.tsx

Visual system / landing page

src/components/global/navbar.tsx

src/components/global/footer.tsx

src/components/global/lamp.tsx

src/components/global/connect-parallax.tsx

Performance / instrumentation

src/components/analytics/web-vitals.tsx

lighthouserc.json

Trade-offs and Scope Decisions

This project was built to satisfy the assessment while keeping scope focused.

Intentional decisions

Supabase is used only for lightweight authentication, not as a full application backend

a full domain database layer was intentionally not introduced because the assessment did not require it

some sections are intentionally marked Coming soon

the codebase favors clean route/layout separation and frontend architecture over unnecessary backend complexity

Possible future improvements

persisted analysis history per user

richer analytics inside the dashboard

expanded settings and billing flows

stronger usage tracking / quotas

more end-to-end coverage

naming cleanup from supabase → supabase

Submission Notes

This project was implemented with emphasis on:

frontend architecture

shared layouts

maintainable component composition

typed validation

realistic auth integration

semantic markup

theme support

testing and performance tooling

The best way to evaluate it is:

run it locally

test the landing page

test the login flow

access the protected app area

submit a job description for AI analysis

review the referenced files above

License

This project is provided for assessment/review purposes unless otherwise stated.


---

This version is much closer to a real submission README.

Two things would make it even stronger:
- your exact **GitHub repo URL**
- your exact **deployment URL**

And one thing I still want to confirm before I polish it one last time:

License

This project is provided for assessment/review purposes unless otherwise stated.
