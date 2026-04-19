# Next.js 16.2 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Berry Design Studio from TanStack Start + Vite to Next.js 16.2 with App Router, Turbopack, full SSR, and strong SEO — deployable to Vercel.

**Architecture:** Next.js App Router with Server Components for all data-fetching pages (blog, portfolio) and Client Components for interactive/animated pieces (Nav, Reveal, ContactForm, Home hero). Sanity CMS (project `r1uw45l0`) is queried directly in Server Component page files. TanStack Query is kept for future client-side use, wrapped in `app/providers.tsx`.

**Tech Stack:** Next.js 16.2, React 19, Tailwind v4 + `@tailwindcss/postcss`, Framer Motion, `@sanity/client` + `next-sanity` v9, TanStack Query v5, shadcn/ui (Radix), TypeScript 5.

---

## File Map

### Created (new)
| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (Turbopack, PPR, browser log forwarding) |
| `postcss.config.mjs` | Tailwind v4 PostCSS pipeline |
| `app/layout.tsx` | Root HTML shell + Nav + Footer + providers |
| `app/globals.css` | Tailwind v4 global styles (moved from `src/styles.css`) |
| `app/providers.tsx` | TanStack Query client provider ("use client") |
| `app/not-found.tsx` | 404 page |
| `app/page.tsx` | Home page — Server Component, exports metadata, renders `<HomePage />` |
| `components/site/HomePage.tsx` | Home page UI — "use client" (framer-motion) |
| `app/about/page.tsx` | About — Server Component |
| `app/services/page.tsx` | Services — Server Component |
| `app/contact/page.tsx` | Contact shell — Server Component |
| `app/blog/page.tsx` | Blog — Server Component, fetches from Sanity |
| `app/portfolio/page.tsx` | Portfolio — Server Component, fetches from Sanity |
| `app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio |
| `app/sitemap.ts` | Next.js built-in sitemap |
| `app/robots.ts` | Next.js built-in robots |
| `components/site/ContactForm.tsx` | Contact form ("use client", extracted for useState) |
| `components/site/HomePage.tsx` | Home page UI — "use client" (framer-motion) |
| `AGENTS.md` | Next.js agent rules (points to bundled docs) |
| `CLAUDE.md` | Includes AGENTS.md for Claude Code |

### Moved + modified
| From | To | Changes |
|------|-----|---------|
| `src/styles.css` | `app/globals.css` | Update `@source` paths |
| `src/lib/sanity.ts` | `lib/sanity.ts` | Remove token, keep project ID hardcoded |
| `src/lib/sanity-queries.ts` | `lib/sanity-queries.ts` | Update import path |
| `src/lib/utils.ts` | `lib/utils.ts` | No changes |
| `src/hooks/use-mobile.tsx` | `hooks/use-mobile.tsx` | No changes |
| `src/components/site/Nav.tsx` | `components/site/Nav.tsx` | next/link + usePathname, "use client" |
| `src/components/site/Footer.tsx` | `components/site/Footer.tsx` | next/link |
| `src/components/site/Reveal.tsx` | `components/site/Reveal.tsx` | Add "use client" |
| `src/components/site/Marquee.tsx` | `components/site/Marquee.tsx` | No changes |
| All `src/components/ui/*` | `components/ui/*` | No changes |
| `tsconfig.json` | `tsconfig.json` | Next.js settings, `@/*` → `./*` |
| `components.json` | `components.json` | Update CSS path + rsc: true |
| `.gitignore` | `.gitignore` | Add Next.js entries, remove Vite/Cloudflare |
| `sanity.json` | `sanity.json` | Fix project ID `p4fpe4fl` → `r1uw45l0` |

### Deleted
- `vite.config.ts`
- `wrangler.jsonc`
- `bunfig.toml`
- `bun.lockb`
- `deploy-studio.ps1`
- `test-deploy.ps1`
- `src/router.tsx`
- `src/routeTree.gen.ts`
- `src/routes/` (all 8 files)
- `src/styles.css`
- `sanity/sanity.client.ts` (duplicate)
- `docs/superpowers/specs/2026-04-18-sanity-integration-design.md` (superseded)

---

## Phase 1 — Bootstrap Next.js

### Task 1: Read Next.js bundled docs before writing any code

- [ ] **Step 1: Install Next.js 16 and swap deps**

Run from the project root:
```bash
cd "c:/Users/Ali Foural/Desktop/berry-design-studio-main/berry-design-studio-main"

# Remove Vite/TanStack/Cloudflare packages
npm uninstall \
  @tanstack/react-start \
  @tanstack/react-router \
  @tanstack/router-plugin \
  @cloudflare/vite-plugin \
  "@lovable.dev/vite-tanstack-config" \
  vite \
  @vitejs/plugin-react \
  @tailwindcss/vite

# Install Next.js 16 and Tailwind PostCSS adapter
npm install next@16 @tailwindcss/postcss
```

Expected: no errors, `node_modules/next/dist/docs/` now exists.

- [ ] **Step 2: Verify docs are present**

```bash
ls node_modules/next/dist/docs/
```

Expected: list of `.md` files.

- [ ] **Step 3: Read the App Router getting-started doc**

```bash
cat node_modules/next/dist/docs/app/getting-started/installation.md 2>/dev/null \
  || ls node_modules/next/dist/docs/app/
```

Read the output. Understand the expected project structure for Next.js 16.2 App Router.

- [ ] **Step 4: Read the metadata API doc**

```bash
cat node_modules/next/dist/docs/app/api-reference/functions/generate-metadata.md 2>/dev/null \
  || find node_modules/next/dist/docs -name "*metadata*" | head -5
```

Read the `generateMetadata` API before writing any page.

- [ ] **Step 5: Read the sitemap and robots docs**

```bash
cat node_modules/next/dist/docs/app/api-reference/file-conventions/metadata/sitemap.md 2>/dev/null
cat node_modules/next/dist/docs/app/api-reference/file-conventions/metadata/robots.md 2>/dev/null
```

---

### Task 2: Create `next.config.ts`

**Files:**
- Create: `next.config.ts`
- Delete: `vite.config.ts`

- [ ] **Step 1: Write next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: true,
  },
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
```

- [ ] **Step 2: Delete vite.config.ts**

```bash
rm vite.config.ts
```

---

### Task 3: Create `postcss.config.mjs`

**Files:**
- Create: `postcss.config.mjs`

- [ ] **Step 1: Write PostCSS config**

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

---

### Task 4: Update `tsconfig.json` for Next.js

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Note: `@/*` now maps to `./*` (project root), not `./src/*`. So `@/components` → `./components`, `@/lib` → `./lib`.

---

### Task 5: Update `package.json` scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Replace the scripts block**

Edit `package.json` and replace the `"scripts"` section with:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
```

---

## Phase 2 — App Foundation

### Task 6: Create `app/globals.css`

**Files:**
- Create: `app/globals.css`
- The content is the full CSS from `src/styles.css` with updated `@source` paths.

- [ ] **Step 1: Write app/globals.css**

```css
@import "tailwindcss" source(none);
@source "../app";
@source "../components";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@import url("https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");

@theme inline {
  --font-display: "Syne", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-berry: var(--berry);
  --color-berry-glow: var(--berry-glow);
  --color-pink: var(--pink);
}

:root {
  --radius: 1rem;

  --background: oklch(0.13 0.03 310);
  --foreground: oklch(0.97 0.01 310);

  --card: oklch(0.17 0.04 310);
  --card-foreground: oklch(0.97 0.01 310);
  --popover: oklch(0.17 0.04 310);
  --popover-foreground: oklch(0.97 0.01 310);

  --primary: oklch(0.7 0.21 305);
  --primary-foreground: oklch(0.13 0.03 310);

  --secondary: oklch(0.22 0.05 310);
  --secondary-foreground: oklch(0.97 0.01 310);

  --muted: oklch(0.2 0.04 310);
  --muted-foreground: oklch(0.7 0.04 310);

  --accent: oklch(0.7 0.24 0);
  --accent-foreground: oklch(0.13 0.03 310);

  --destructive: oklch(0.65 0.24 25);
  --destructive-foreground: oklch(0.97 0.01 310);

  --border: oklch(0.3 0.04 310 / 60%);
  --input: oklch(0.25 0.04 310);
  --ring: oklch(0.7 0.21 305);

  --berry: oklch(0.7 0.21 305);
  --berry-glow: oklch(0.78 0.18 320);
  --pink: oklch(0.72 0.24 0);

  --gradient-berry: linear-gradient(135deg, oklch(0.7 0.21 305), oklch(0.72 0.24 0));
  --gradient-aurora: radial-gradient(
      ellipse at top,
      oklch(0.7 0.21 305 / 30%),
      transparent 60%
    ),
    radial-gradient(ellipse at bottom right, oklch(0.72 0.24 0 / 25%), transparent 55%);

  --shadow-glow: 0 20px 60px -20px oklch(0.7 0.21 305 / 50%);
  --shadow-pink: 0 20px 60px -20px oklch(0.72 0.24 0 / 45%);
}

.dark {
  /* same — site is dark by default */
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    background-image: var(--gradient-aurora);
    background-attachment: fixed;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    letter-spacing: -0.03em;
  }

  ::selection {
    background-color: var(--berry);
    color: var(--background);
  }
}

@layer utilities {
  .text-gradient-berry {
    background-image: var(--gradient-berry);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .bg-gradient-berry {
    background-image: var(--gradient-berry);
  }

  .shadow-glow {
    box-shadow: var(--shadow-glow);
  }

  .shadow-pink {
    box-shadow: var(--shadow-pink);
  }

  .glass {
    background: oklch(0.17 0.04 310 / 60%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .noise::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .marquee {
    animation: marquee 30s linear infinite;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
}
```

---

### Task 7: Create `app/providers.tsx`

**Files:**
- Create: `app/providers.tsx`

- [ ] **Step 1: Write providers.tsx**

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

---

### Task 8: Create `app/layout.tsx`

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Write root layout**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://berrydesign.online"),
  title: {
    default: "BerryDesign — Web Design & Development Studio",
    template: "%s — BerryDesign",
  },
  description:
    "BerryDesign is a design & development studio building fast, SEO-first websites, brands, and digital products.",
  openGraph: {
    type: "website",
    siteName: "BerryDesign",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@berrydesign",
  },
  authors: [{ name: "BerryDesign" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className="relative min-h-screen">
            <Nav />
            <main className="pt-28">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

---

### Task 9: Create `app/not-found.tsx`

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Write not-found.tsx**

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gradient-berry">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-berry px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 3 — Sanity Client

### Task 10: Write `lib/sanity.ts`

**Files:**
- Create: `lib/sanity.ts`

- [ ] **Step 1: Write the Sanity client**

```ts
// lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "r1uw45l0",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getDocuments<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch(query, params);
}
```

No token — dataset is public, reads don't require authentication.

---

### Task 11: Write `lib/sanity-queries.ts`

**Files:**
- Create: `lib/sanity-queries.ts`

- [ ] **Step 1: Write sanity-queries.ts**

```ts
// lib/sanity-queries.ts
import { getDocuments } from "./sanity";

export interface SanityPost {
  _id: string;
  _type: "post";
  slug: { current: string };
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface SanityProject {
  _id: string;
  _type: "project";
  slug: { current: string };
  title: string;
  description?: string;
  year?: string;
  tag?: string;
  color?: string;
}

export async function getPosts(): Promise<SanityPost[]> {
  return getDocuments<SanityPost[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, _type, slug, title, excerpt, publishedAt, tags
    }`
  );
}

export async function getProjects(): Promise<SanityProject[]> {
  return getDocuments<SanityProject[]>(
    `*[_type == "project"] | order(year desc) {
      _id, _type, slug, title, description, year, tag, color
    }`
  );
}
```

---

### Task 12: Write `lib/utils.ts`

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Write utils.ts**

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Phase 4 — Component Updates

### Task 13: Move and add "use client" to `components/site/Reveal.tsx`

**Files:**
- Create: `components/site/Reveal.tsx`

- [ ] **Step 1: Write Reveal.tsx**

```tsx
// components/site/Reveal.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

### Task 14: Rewrite `components/site/Nav.tsx` for Next.js

**Files:**
- Create: `components/site/Nav.tsx`

Uses `next/link` instead of TanStack Router `Link`, and `usePathname` from `next/navigation` instead of `useLocation`. Must be "use client" (uses useState, framer-motion, usePathname).

- [ ] **Step 1: Write Nav.tsx**

```tsx
// components/site/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-full border border-border px-5 py-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="inline-block h-3 w-3 rounded-full bg-gradient-berry shadow-glow" />
            <span>berry<span className="text-gradient-berry">design</span></span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active =
                pathname === l.to ||
                (l.to !== "/" && pathname.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-berry px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 md:inline-flex"
          >
            Start a project
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 rounded-3xl border border-border p-4 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
```

---

### Task 15: Rewrite `components/site/Footer.tsx` for Next.js

**Files:**
- Create: `components/site/Footer.tsx`

- [ ] **Step 1: Write Footer.tsx**

```tsx
// components/site/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-2xl font-bold">
              <span className="inline-block h-4 w-4 rounded-full bg-gradient-berry shadow-glow" />
              berry<span className="text-gradient-berry">design</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A design & development studio crafting fast, beautiful, SEO-first
              websites. Based remote, working worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Studio
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/portfolio" className="hover:text-gradient-berry">Work</Link></li>
              <li><Link href="/services" className="hover:text-gradient-berry">Services</Link></li>
              <li><Link href="/about" className="hover:text-gradient-berry">About</Link></li>
              <li><Link href="/blog" className="hover:text-gradient-berry">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-gradient-berry">Contact</Link></li>
              <li>
                <a href="mailto:hello@berrydesign.online" className="hover:text-gradient-berry">
                  hello@berrydesign.online
                </a>
              </li>
              <li><a href="#" className="hover:text-gradient-berry">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gradient-berry">Dribbble</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} BerryDesign. All rights reserved.</p>
          <p>Crafted with care · berrydesign.online</p>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 16: Copy `components/site/Marquee.tsx`

**Files:**
- Create: `components/site/Marquee.tsx`

No changes from source — pure HTML/CSS, no browser APIs.

- [ ] **Step 1: Write Marquee.tsx**

```tsx
// components/site/Marquee.tsx
const tags = [
  "Web Design",
  "Brand Identity",
  "Next.js",
  "SEO",
  "UI / UX",
  "Motion",
  "Strategy",
  "E-commerce",
  "Case Studies",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-background/50 py-6">
      <div className="flex w-max gap-12 marquee">
        {[...tags, ...tags].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-3xl font-semibold"
          >
            <span className="text-foreground/70">{t}</span>
            <span className="h-2 w-2 rounded-full bg-gradient-berry" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Task 17: Copy all `components/ui/*` files

**Files:**
- Create: `components/ui/` (all files from `src/components/ui/`)

- [ ] **Step 1: Copy UI components**

```bash
cp -r src/components/ui components/ui
```

No content changes — the `@/lib/utils` import path still resolves correctly with the new tsconfig (maps `@/*` → `./*`, so `@/lib/utils` → `./lib/utils`).

---

### Task 18: Copy `hooks/use-mobile.tsx`

**Files:**
- Create: `hooks/use-mobile.tsx`

- [ ] **Step 1: Write use-mobile.tsx**

```tsx
// hooks/use-mobile.tsx
"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

Added "use client" — uses `useEffect` and `window`.

---

## Phase 5 — Pages

### Task 19: Write `app/page.tsx` (Home) + `components/site/HomePage.tsx`

**Files:**
- Create: `app/page.tsx`
- Create: `components/site/HomePage.tsx`

`generateMetadata` cannot be exported from a "use client" component. Fix: `app/page.tsx` is a Server Component that owns metadata and renders the `<HomePage />` client component. All framer-motion code lives in `HomePage.tsx`.

- [ ] **Step 1: Write components/site/HomePage.tsx**

```tsx
// components/site/HomePage.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, Search, Layers } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

const services = [
  { icon: Sparkles, title: "Brand & Identity", desc: "Visual systems with personality and rigor." },
  { icon: Layers, title: "Web Design", desc: "Editorial layouts, motion, and craft." },
  { icon: Zap, title: "Next.js Development", desc: "Fast, accessible, production-grade." },
  { icon: Search, title: "SEO & Content", desc: "Get found. Stay found. Convert." },
];

const featured = [
  { title: "Lumen Studio", tag: "Brand · Web", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit Commerce", tag: "E-commerce · Next.js", color: "from-pink-500 to-rose-600" },
  { title: "North Atlas", tag: "SaaS · Marketing", color: "from-violet-500 to-indigo-600" },
  { title: "Field Notes", tag: "Editorial · CMS", color: "from-rose-500 to-fuchsia-600" },
];

export function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-4">
        <div className="mx-auto max-w-6xl pt-16 pb-32 text-center md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-berry" />
            Studio · Open for Q3
          </motion.div>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            {["We", "design", "websites", "that"].map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-gradient-berry"
            >
              get found.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            BerryDesign is a small studio for brands that want to look serious
            on the web — fast, accessible, and built for SEO from the first pixel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              View our work
            </Link>
          </motion.div>

          <div className="pointer-events-none absolute left-[-10%] top-1/3 h-72 w-72 rounded-full bg-berry/30 blur-3xl animate-float" />
          <div
            className="pointer-events-none absolute right-[-10%] top-1/2 h-80 w-80 rounded-full bg-pink/30 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </section>

      <Marquee />

      {/* SERVICES */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">What we do</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  Four disciplines.<br />
                  <span className="text-gradient-berry">One outcome.</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1 text-sm font-semibold hover:text-gradient-berry md:inline-flex"
              >
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-berry hover:shadow-glow">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected work</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  Recent <span className="text-gradient-berry">case studies</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  href="/portfolio"
                  className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.color}`}>
                    <div className="absolute inset-0 bg-background/10 transition-opacity group-hover:opacity-0" />
                    <motion.div
                      className="absolute right-6 top-6 rounded-full bg-background/90 p-3"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-20">
              <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-60" />
              <h2 className="relative font-display text-4xl font-bold md:text-6xl">
                Have a project <br />
                <span className="text-gradient-berry">in mind?</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-md text-muted-foreground">
                We take on a small number of projects each quarter. Tell us about
                yours — we usually reply within 24 hours.
              </p>
              <Link
                href="/contact"
                className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-berry px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Write app/page.tsx**

Server Component — owns `generateMetadata`, renders `<HomePage />`.

```tsx
// app/page.tsx
import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";

export const metadata: Metadata = {
  title: "BerryDesign — Web Design & Development Studio",
  description:
    "We craft fast, beautiful, SEO-first websites. Strategy, design, and Next.js development under one roof.",
  openGraph: {
    title: "BerryDesign — Web Design & Development Studio",
    description: "Strategy, design, and Next.js development for ambitious brands.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online" },
};

export default function Page() {
  return <HomePage />;
}
```

---

### Task 19b: Add LocalBusiness JSON-LD to `app/layout.tsx`

**Files:**

- Modify: `app/layout.tsx`

Adds a `<script type="application/ld+json">` tag to the root layout so every page carries the structured data. Google uses this for local SEO and Knowledge Graph features. Location is Qatar.

- [ ] **Step 1: Add JSON-LD script to app/layout.tsx**

Replace the existing `app/layout.tsx` `<body>` block with the version below that includes the JSON-LD `<script>` tag:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://berrydesign.online"),
  title: {
    default: "BerryDesign — Web Design & Development Studio",
    template: "%s — BerryDesign",
  },
  description:
    "BerryDesign is a design & development studio building fast, SEO-first websites, brands, and digital products.",
  openGraph: {
    type: "website",
    siteName: "BerryDesign",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@berrydesign",
  },
  authors: [{ name: "BerryDesign" }],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BerryDesign",
  url: "https://berrydesign.online",
  email: "hello@berrydesign.online",
  description:
    "A design & development studio crafting fast, beautiful, SEO-first websites. Based in Qatar, working worldwide.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "QA",
  },
  areaServed: "Worldwide",
  priceRange: "$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Providers>
          <div className="relative min-h-screen">
            <Nav />
            <main className="pt-28">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify JSON-LD renders in page source**

```bash
curl -s http://localhost:3000/ | grep -o 'application/ld+json'
```

Expected output: `application/ld+json`

---

### Task 20: Write `app/about/page.tsx`

**Files:**
- Create: `app/about/page.tsx`

Server Component — no browser APIs. `generateMetadata` replaces the TanStack head config.

- [ ] **Step 1: Write about/page.tsx**

```tsx
// app/about/page.tsx
import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "BerryDesign is a small, senior studio. We partner with founders and marketing teams to ship websites that work.",
  openGraph: {
    title: "About — BerryDesign",
    description: "A small, senior studio shipping websites that work.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/about" },
};

const values = [
  {
    title: "Senior, hands-on",
    desc: "No layers between you and the people doing the work. Same designer and developer from kickoff to launch.",
  },
  {
    title: "Built to be found",
    desc: "Static rendering, semantic HTML, real meta — every page indexable from day one.",
  },
  {
    title: "Made to last",
    desc: "Clean code, a real design system, and a CMS your team can actually use after we hand it off.",
  },
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            A small studio that <span className="text-gradient-berry">ships</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg text-muted-foreground">
            <p>
              BerryDesign is an independent design and development studio. We
              work with founders, marketing teams, and other agencies to design
              and build websites that look great and rank well.
            </p>
            <p>
              We&apos;re senior practitioners — not a stack of juniors managed by a
              project manager. You get the people doing the work, on every call.
              That&apos;s the only way we know how to make things we&apos;re proud of.
            </p>
            <p>
              Most of our work is in Next.js, with content managed in Sanity or
              a Cloud-based CMS, deployed to the edge. We care a lot about
              performance, accessibility, and SEO — they&apos;re not features, they
              are the work.
            </p>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold text-gradient-berry">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 21: Write `app/services/page.tsx`

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Write services/page.tsx**

```tsx
// app/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Zap, Search } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, web design, Next.js development, and SEO. End-to-end services for ambitious brands.",
  openGraph: {
    title: "Services — BerryDesign",
    description: "Brand, web design, Next.js development, and SEO under one roof.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/services" },
};

const services = [
  {
    icon: Sparkles,
    title: "Brand & Identity",
    desc: "Logos, type systems, and visual languages that hold up across every touchpoint.",
    items: ["Logo & wordmark", "Type & color system", "Brand guidelines", "Launch assets"],
  },
  {
    icon: Layers,
    title: "Web Design",
    desc: "Editorial, motion-rich layouts designed in Figma and prototyped to feel.",
    items: ["UX strategy", "Wireframes", "High-fidelity design", "Design system"],
  },
  {
    icon: Zap,
    title: "Next.js Development",
    desc: "Production-grade React + Next.js builds. Static, fast, accessible.",
    items: ["Next.js 16 / SSG", "Sanity / Cloud CMS", "Animations (Framer)", "CI / Vercel"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    desc: "Technical SEO baked in, plus content systems that compound over time.",
    items: ["Technical SEO", "Schema / OpenGraph", "Content strategy", "Analytics setup"],
  },
];

export default function ServicesPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Services</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            What we <span className="text-gradient-berry">do</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            We work across brand, design, and engineering — usually together.
            Below is what an engagement typically looks like.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-berry hover:shadow-glow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Need something <span className="text-gradient-berry">custom?</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Most projects we take on don&apos;t fit a tidy box. Tell us what
              you&apos;re thinking and we&apos;ll figure it out together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

---

### Task 22: Write `app/contact/page.tsx` + `components/site/ContactForm.tsx`

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/site/ContactForm.tsx`

The `useState` for the sent state must live in a Client Component. The page shell stays a Server Component for metadata.

- [ ] **Step 1: Write components/site/ContactForm.tsx**

```tsx
// components/site/ContactForm.tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
      />
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-border bg-card p-8"
    >
      {sent ? (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground shadow-glow">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-bold">Message sent</h2>
          <p className="mt-3 max-w-xs text-muted-foreground">
            Thanks — we got it. Expect a reply within 24 hours.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Company" name="company" required={false} />
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Project details
            </label>
            <textarea
              required
              rows={6}
              className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-berry"
              placeholder="What are you building, and when do you need it?"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Send message
            <span className="transition-transform group-hover:rotate-45">↗</span>
          </button>
        </div>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Write app/contact/page.tsx**

```tsx
// app/contact/page.tsx
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project. We usually reply within 24 hours.",
  openGraph: {
    title: "Contact — BerryDesign",
    description: "Tell us about your project.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/contact" },
};

export default function ContactPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Let&apos;s <span className="text-gradient-berry">talk</span>.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us a bit about your project, your timeline, and your budget.
            We usually reply within 24 hours.
          </p>

          <div className="mt-12 space-y-4">
            <a
              href="mailto:hello@berrydesign.online"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-berry"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-berry text-primary-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="text-sm font-medium">hello@berrydesign.online</div>
              </div>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-berry text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Studio</div>
                <div className="text-sm font-medium">Remote · Working worldwide</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
```

---

### Task 23: Write `app/blog/page.tsx`

**Files:**
- Create: `app/blog/page.tsx`

Server Component — `getPosts()` is called directly (no useEffect). Falls back to static posts if Sanity returns empty array.

- [ ] **Step 1: Write blog/page.tsx**

```tsx
// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getPosts } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on web design, performance, SEO, and the craft of shipping the modern web.",
  openGraph: {
    title: "Blog — BerryDesign",
    description: "Notes on web design, performance, SEO, and shipping the modern web.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/blog" },
};

const staticPosts = [
  {
    slug: "ssg-vs-csr",
    title: "Why we still bet on Static Generation in 2026",
    excerpt: "SSG isn't a relic — it's the cheapest, fastest, most SEO-friendly way to ship a marketing site.",
    date: "Apr 12, 2026",
    tag: "Performance",
  },
  {
    slug: "design-system-on-a-budget",
    title: "A design system on a budget",
    excerpt: "How to build a small, useful design system without spending six months on tokens.",
    date: "Mar 28, 2026",
    tag: "Design",
  },
  {
    slug: "seo-for-portfolios",
    title: "SEO for portfolio sites that actually rank",
    excerpt: "Most portfolios bury their best content. Here's how to structure case studies for search.",
    date: "Mar 14, 2026",
    tag: "SEO",
  },
];

export default async function BlogPage() {
  let posts: Array<{ slug: string; title: string; excerpt?: string; date?: string; publishedAt?: string; tag?: string; tags?: string[] }>;

  try {
    const sanityPosts = await getPosts();
    posts = sanityPosts.length > 0
      ? sanityPosts.map((p) => ({
          slug: p.slug.current,
          title: p.title,
          excerpt: p.excerpt,
          publishedAt: p.publishedAt,
          tag: p.tags?.[0],
        }))
      : staticPosts;
  } catch {
    posts = staticPosts;
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Journal</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Notes & <span className="text-gradient-berry">field reports</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Things we&apos;ve learned shipping web work.
          </p>
        </Reveal>

        <div className="mt-20 space-y-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href="/blog"
                className="group flex items-start justify-between gap-6 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-berry hover:shadow-glow md:p-8"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="rounded-full border border-border px-3 py-1">
                      {p.tag || "Post"}
                    </span>
                    <span>{p.date || p.publishedAt || ""}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{p.excerpt}</p>
                </div>
                <div className="rounded-full bg-secondary p-3 transition-transform group-hover:rotate-45 group-hover:bg-gradient-berry group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 24: Write `app/portfolio/page.tsx`

**Files:**
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Write portfolio/page.tsx**

```tsx
// app/portfolio/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getProjects } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from BerryDesign — brand systems, marketing sites, and Next.js builds.",
  openGraph: {
    title: "Work — BerryDesign Portfolio",
    description: "Selected case studies — brand systems, marketing sites, and Next.js builds.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/portfolio" },
};

const staticProjects = [
  { title: "Lumen Studio", tag: "Brand · Web", year: "2025", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit Commerce", tag: "E-commerce · Next.js", year: "2025", color: "from-pink-500 to-rose-600" },
  { title: "North Atlas", tag: "SaaS · Marketing", year: "2024", color: "from-violet-500 to-indigo-600" },
  { title: "Field Notes", tag: "Editorial · CMS", year: "2024", color: "from-rose-500 to-fuchsia-600" },
  { title: "Solace Wellness", tag: "Brand · Web", year: "2024", color: "from-purple-500 to-pink-600" },
  { title: "Quanta Labs", tag: "Identity · Site", year: "2023", color: "from-indigo-500 to-violet-600" },
];

export default async function PortfolioPage() {
  let projects: Array<{ title: string; tag?: string; year?: string; color?: string }>;

  try {
    const sanityProjects = await getProjects();
    projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;
  } catch {
    projects = staticProjects;
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Selected <span className="text-gradient-berry">work</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A small set of projects we&apos;re proud of — across brand, web, and
            commerce. Every site is built for performance and SEO from day one.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${
                    p.color || "from-violet-500 to-indigo-600"
                  }`}
                >
                  <div className="absolute inset-0 bg-background/10 transition-opacity group-hover:opacity-0" />
                  <div className="absolute right-6 top-6 rounded-full bg-background/90 p-3 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {p.tag || "Project"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{p.year || ""}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 25: Write `app/studio/[[...tool]]/page.tsx`

**Files:**
- Create: `app/studio/[[...tool]]/page.tsx`
- Keep: `sanity.config.ts` (already exists at project root — do NOT recreate it)

`sanity.config.ts` already exists at the project root with the correct project ID (`r1uw45l0`), dataset, and schema imports. Task 25 imports it as `@/sanity.config` — that import will resolve correctly with the updated tsconfig `@/*` → `./*` alias.

Uses `NextStudio` from `next-sanity/studio`. Must be "use client" and `dynamic = "force-dynamic"` to prevent static caching of the studio.

- [ ] **Step 1: Write the studio page**

```tsx
// app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  );
}
```

---

## Phase 6 — SEO

### Task 26: Write `app/sitemap.ts`

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Write sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://berrydesign.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
```

---

### Task 27: Write `app/robots.ts`

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Write robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/",
    },
    sitemap: "https://berrydesign.online/sitemap.xml",
  };
}
```

---

## Phase 7 — AI Agent Setup

### Task 28: Create `AGENTS.md` and `CLAUDE.md`

**Files:**
- Create: `AGENTS.md`
- Create: `CLAUDE.md`

- [ ] **Step 1: Write AGENTS.md**

```md
<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
<!-- END:nextjs-agent-rules -->
```

- [ ] **Step 2: Write CLAUDE.md**

```md
@AGENTS.md
```

---

## Phase 8 — Cleanup

### Task 29: Delete Vite/TanStack/Cloudflare files

**Files:**
- Delete: all listed below

- [ ] **Step 1: Delete old files**

```bash
# TanStack Router generated files and routes
rm -rf src/routes src/router.tsx src/routeTree.gen.ts

# Old CSS (moved to app/globals.css)
rm src/styles.css

# Vite/Cloudflare/Bun config
rm -f wrangler.jsonc bunfig.toml deploy-studio.ps1 test-deploy.ps1 bun.lockb

# Duplicate Sanity client
rm -f sanity/sanity.client.ts

# Old design doc (superseded by this plan)
rm -f "docs/superpowers/specs/2026-04-18-sanity-integration-design.md"
```

- [ ] **Step 2: Delete the now-empty src/ directory if applicable**

```bash
# Only run this if src/ is empty after the above removals
# Check first:
ls src/
# If only components/, lib/, hooks/ remain (moved to root), then:
rm -rf src/
```

Note: If `src/components/`, `src/lib/`, `src/hooks/` still exist after copying to root, confirm the root-level versions are complete, then delete `src/`.

---

### Task 30: Fix `sanity.json`

**Files:**
- Modify: `sanity.json`

- [ ] **Step 1: Update project ID**

Replace the contents of `sanity.json`:

```json
{
  "root": true,
  "project": {
    "name": "berry-design",
    "base": "production"
  },
  "api": {
    "projectId": "r1uw45l0",
    "dataset": "production"
  }
}
```

---

### Task 31: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Replace .gitignore with Next.js-appropriate version**

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Next.js build output
/.next/
/out/

# Production
/build

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

---

### Task 32: Update `components.json`

**Files:**
- Modify: `components.json`

- [ ] **Step 1: Update components.json for Next.js**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

Changed: `rsc: true` (was `false`), `tailwind.css` updated to `app/globals.css`.

---

## Phase 9 — Git & GitHub

### Task 33: Verify build then init git and push

**Files:**
- No code changes — verification + git operations.

- [ ] **Step 1: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`. No TypeScript or import errors in the terminal output.

- [ ] **Step 2: Check all 7 routes load**

Visit each in the browser (or `curl -s http://localhost:3000/<path> | head -5`):
- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/services`
- `http://localhost:3000/portfolio`
- `http://localhost:3000/blog`
- `http://localhost:3000/contact`
- `http://localhost:3000/studio`

Expected: Each returns HTML (not a 404 or error page). Studio may take a few seconds to load.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build completes without errors. All 7 routes should appear as static/dynamic in the build output.

- [ ] **Step 4: STOP — show user the build output and diff before pushing**

Do not proceed to push until the user reviews and confirms. Show:
1. The `npm run build` output
2. `git status` (what will be committed)
3. Ask: "Ready to push to `https://github.com/berrydesignonline-lab/berry-design-studio`?"

- [ ] **Step 5: Initialize git (only after user confirms)**

```bash
git init
git add .
git status
```

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: migrate from TanStack Start + Vite to Next.js 16.2 App Router

- Replace Vite/TanStack Router with Next.js 16.2 + Turbopack
- Add App Router pages with generateMetadata for full SEO
- Server Components for blog and portfolio (Sanity fetch in page)
- Client Components for Nav, Reveal, Home (framer-motion)
- Extract ContactForm to client component (useState)
- Add sitemap.ts and robots.ts
- Add AGENTS.md + CLAUDE.md for Next.js agent awareness
- Remove Cloudflare/Wrangler config, target is Vercel

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 7: Set remote and push**

```bash
git remote add origin https://github.com/berrydesignonline-lab/berry-design-studio.git
git branch -M main
git push -u origin main
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|---|---|
| Remove TanStack Start/Router/Vite/Cloudflare | Task 1 (uninstall), Task 29 (delete files) |
| Install next@16 | Task 1 |
| Replace vite.config.ts with next.config.ts | Task 2 |
| Replace routes with App Router under /app | Tasks 19–25 |
| next.config.ts with logging + PPR | Task 2 |
| Route mapping (all 7) | Tasks 19–25 |
| next-sanity with App Router patterns | Tasks 23–25 |
| Sanity fetches in async Server Components | Tasks 23–24 |
| generateMetadata on every page | Tasks 20–24 |
| og:title, og:description, og:image, canonical, twitter:card | Tasks 8, 20–24 |
| app/sitemap.ts | Task 26 |
| app/robots.ts | Task 27 |
| PPR + Suspense for per-request data | Not applicable (no view counts/dynamic per-request data yet) |
| Tailwind v4 + PostCSS, remove @tailwindcss/vite | Tasks 1, 3, 6 |
| "use client" on framer-motion components | Tasks 13–14, 19 |
| TanStack Query in providers.tsx | Task 7 |
| package.json scripts with --turbopack | Task 5 |
| AGENTS.md + CLAUDE.md | Task 28 |
| Do not change UI components | Task 17 (copy only) |
| Read bundled docs before coding | Task 1 (Steps 3–5) |
| Review before push | Task 33 (Step 4) |
| Push to GitHub | Task 33 (Steps 5–7) |

**Placeholder scan:** None found.

**Type consistency:** `SanityPost` and `SanityProject` defined in `lib/sanity-queries.ts` (Task 11) and used in Tasks 23–24. `getPosts()` and `getProjects()` signatures match usage sites. `Providers` component in Task 7 matches import in Task 8.

**Ambiguity resolved:** Home page is "use client" (uses framer-motion directly across multiple sections — not worth extracting all to sub-components). Blog/portfolio are async Server Components with Sanity fetch + static fallback.
