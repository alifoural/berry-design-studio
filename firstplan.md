**berrydesign.online**

Website Rebuild & Blog - Full Project Plan

_Stack: Next.js 16 · Sanity CMS · Vercel_

Prepared: April 17, 2026

# **1\. Executive Summary**

BerryDesign is rebuilding its web presence from the ground up. The current site is a fully client-side JavaScript app, which limits search-engine visibility and lacks a content publishing workflow. This plan documents the full scope of the rebuild: site architecture, technology decisions, implementation phases, and SEO strategy.

The new site will be a high-performance, SEO-first platform featuring a portfolio showcase with individual case studies, a fully managed blog, and clean service pages - all delivered through Next.js 16 static generation on Vercel's edge network.

# **2\. Project Goals**

## **2.1 Primary Goals**

- Achieve fast Google indexing on all pages through Server-Side Generation (SSG)
- Launch a professional portfolio with individual case study pages for each project
- Publish a blog to attract organic traffic and establish industry authority
- Enable content editing without touching code via Sanity CMS
- Achieve a Lighthouse score of 90+ across Performance, SEO, and Accessibility

## **2.2 Secondary Goals**

- Establish a scalable codebase that supports future features (testimonials, pricing calculator, client portal)
- Integrate analytics from day one to track traffic sources and conversion
- Build a design system that is consistent and easy to extend

# **3\. Site Architecture**

The following pages make up the complete site structure. Every page is statically generated at build time for maximum SEO performance.

| **Route**               | **Page**           | **Content Source**              | **Priority** |
| ----------------------- | ------------------ | ------------------------------- | ------------ |
| /                       | Home               | Static + Sanity (featured work) | P0           |
| /services               | Services Overview  | Static                          | P0           |
| /services/\[slug\]      | Individual Service | Sanity                          | P1           |
| /portfolio              | Portfolio Grid     | Sanity (all projects)           | P0           |
| /portfolio/\[slug\]     | Case Study         | Sanity (per project)            | P0           |
| /blog                   | Blog Index         | Sanity (all posts)              | P0           |
| /blog/\[slug\]          | Blog Post          | Sanity (per post)               | P0           |
| /blog/category/\[slug\] | Blog Category      | Sanity (filtered)               | P1           |
| /about                  | About / Team       | Static + Sanity                 | P1           |
| /contact                | Contact            | Static                          | P1           |

## **3.1 Portfolio - Case Study Structure**

Each portfolio item lives at /portfolio/\[slug\] and contains the following sections:

- Hero - project title, client name, category tag, and hero image
- Challenge - the problem the client came to BerryDesign to solve
- Solution - design and technical approach taken
- Results - measurable outcomes (load time, conversion lift, etc.)
- Gallery - 4-8 screenshots or design mockups
- Tech Stack - tags for technologies used
- Next Project - link to the following case study

## **3.2 Blog Structure**

Each blog post is a Sanity document with the following fields: title, slug, publishedAt, author, category, tags, coverImage, excerpt, and body (Portable Text). Posts are served as static pages and revalidated via ISR every 60 seconds so new content goes live without a full rebuild.

# **4\. Technology Stack**

## **4.1 Next.js 16**

Next.js 16 is the core framework. The App Router is used throughout. All public-facing pages use generateStaticParams for full SSG at build time. The Turbopack bundler (stable in v16) reduces local development cold start times significantly compared to webpack.

| **Feature**        | **Next.js Config**           | **Why**                                                       |
| ------------------ | ---------------------------- | ------------------------------------------------------------- |
| Static pages       | generateStaticParams + fetch | Full HTML at build time - Googlebot sees everything           |
| Blog revalidation  | revalidate: 60 (ISR)         | New posts go live in under 60s without full rebuild           |
| Image optimisation | next/image                   | WebP/AVIF auto-conversion, lazy load, CLS = 0                 |
| Font loading       | next/font (Google Fonts)     | Zero layout shift, font preload in HTML head                  |
| Metadata           | generateMetadata() per page  | Dynamic title, description, OG tags for every route           |
| Sitemap            | app/sitemap.ts               | Auto-generated XML sitemap submitted to Google Search Console |
| Robots             | app/robots.ts                | Programmatic robots.txt                                       |

## **4.2 Sanity CMS**

Sanity is the headless CMS powering all dynamic content: portfolio projects, blog posts, service details, and team members. The Sanity Studio is deployed at berrydesign.online/studio, meaning content editors never leave the domain.

| **Schema**   | **Fields**                                                                                      | **Used For**             |
| ------------ | ----------------------------------------------------------------------------------------------- | ------------------------ |
| project      | title, slug, client, category, tags, challenge, solution, results, gallery\[\], techStack\[\]   | Portfolio / Case Studies |
| post         | title, slug, publishedAt, author, category, tags\[\], coverImage, excerpt, body (Portable Text) | Blog Posts               |
| category     | title, slug, description                                                                        | Blog Categories          |
| service      | title, slug, summary, description, icon, cta                                                    | Service Detail Pages     |
| teamMember   | name, role, bio, photo, linkedIn                                                                | About Page               |
| siteSettings | logo, seoDefault, socialLinks, ctaText                                                          | Global Site Config       |

## **4.3 Vercel**

Vercel is the deployment and hosting platform. It integrates natively with Next.js 16 and provides the following out of the box:

- Global Edge Network - static assets cached across 40+ PoPs worldwide
- Preview Deployments - every Git branch gets a unique preview URL for client review
- ISR support - Incremental Static Regeneration works with zero configuration
- Analytics - Core Web Vitals tracking in the Vercel dashboard
- Environment Variables - secure storage for Sanity tokens and API keys
- Custom Domain - berrydesign.online with automatic SSL certificate

# **5\. SEO Strategy**

## **5.1 Technical SEO**

Because every page is statically generated, Googlebot receives complete HTML on the first request - no JavaScript execution required. This is the single most impactful SEO change from the current site.

| **Element**        | **Implementation**                                        | **Status**   |
| ------------------ | --------------------------------------------------------- | ------------ |
| Page titles        | generateMetadata() - unique per page                      | Built-in     |
| Meta descriptions  | generateMetadata() - unique per page                      | Built-in     |
| OG / Twitter cards | openGraph object in metadata                              | Built-in     |
| Canonical URLs     | alternates.canonical in metadata                          | Built-in     |
| XML Sitemap        | app/sitemap.ts - auto-includes blog + portfolio           | Built-in     |
| Structured data    | JSON-LD per page (Article, BreadcrumbList, LocalBusiness) | Custom       |
| robots.txt         | app/robots.ts                                             | Built-in     |
| Core Web Vitals    | next/image + next/font + no render-blocking JS            | Architecture |

## **5.2 Content SEO**

- Publish a minimum of 2 blog posts per month targeting keywords relevant to web design, UI/UX, and front-end development
- Each case study targets long-tail keywords such as 'e-commerce website redesign Egypt' or 'Next.js landing page for SaaS'
- Service pages target commercial-intent keywords: 'web design company Cairo', 'Next.js development agency'
- Internal linking between blog posts and related case studies strengthens topical authority

# **6\. Project Folder Structure**

The repository is a monorepo containing both the Next.js app and the Sanity Studio.

berrydesign/  
├── app/ # Next.js App Router  
│ ├── (site)/ # Public-facing routes  
│ │ ├── page.tsx # Home  
│ │ ├── portfolio/\[slug\]/page.tsx  
│ │ ├── blog/\[slug\]/page.tsx  
│ │ ├── services/\[slug\]/page.tsx  
│ │ ├── about/page.tsx  
│ │ └── contact/page.tsx  
│ ├── studio/\[\[...tool\]\]/ # Sanity Studio embedded  
│ ├── sitemap.ts  
│ └── robots.ts  
├── components/ # Shared UI components  
├── lib/ # Sanity client, queries, helpers  
├── sanity/ # Sanity schemas & config  
│ ├── schemas/  
│ └── sanity.config.ts  
└── public/ # Static assets

# **7\. Implementation Phases**

## **Phase 1 - Foundation (Weeks 1-2)**

| **Task**          | **Detail**                                                        | **Owner** |
| ----------------- | ----------------------------------------------------------------- | --------- |
| Repo setup        | Next.js 16 + TypeScript + Tailwind CSS + ESLint / Prettier        | Dev       |
| Sanity init       | Install Sanity, connect to project, embed Studio at /studio       | Dev       |
| Global layout     | Header, Footer, Navigation - responsive + mobile menu             | Dev       |
| Design tokens     | Colors, typography scale, spacing - defined in tailwind.config.ts | Dev       |
| Home page         | Hero, Services summary, Featured Portfolio, CTA, Blog teaser      | Dev       |
| About page        | Team section pulled from Sanity teamMember schema                 | Dev       |
| Services page     | Static overview + dynamic detail pages from Sanity                | Dev       |
| Contact page      | Form with server action (no third-party form service needed)      | Dev       |
| Vercel deployment | Connect repo, set env vars, configure custom domain + SSL         | Dev       |

## **Phase 2 - Portfolio (Weeks 3-4)**

| **Task**              | **Detail**                                                   | **Owner** |
| --------------------- | ------------------------------------------------------------ | --------- |
| Sanity project schema | All case study fields: challenge, solution, results, gallery | Dev       |
| Portfolio grid page   | Filterable grid by category, animated card hover states      | Dev       |
| Case study template   | Full single-project page layout with all sections            | Dev       |
| Image gallery         | Lightbox component for project screenshots                   | Dev       |
| Content entry         | Enter all existing projects into Sanity Studio               | Content   |
| SEO metadata          | generateMetadata() for portfolio index + each case study     | Dev       |
| Structured data       | JSON-LD BreadcrumbList + CreativeWork per case study         | Dev       |

## **Phase 3 - Blog, SEO & Launch (Weeks 5-6)**

| **Task**              | **Detail**                                                    | **Owner** |
| --------------------- | ------------------------------------------------------------- | --------- |
| Sanity post schema    | Full post schema with Portable Text body renderer             | Dev       |
| Blog index page       | List with category filter, search, pagination (12 per page)   | Dev       |
| Blog post template    | Reading time, author bio, related posts, social share         | Dev       |
| Category pages        | /blog/category/\[slug\] with filtered post list               | Dev       |
| XML Sitemap           | Auto-includes all blog posts and portfolio slugs from Sanity  | Dev       |
| robots.txt            | Block /studio from indexing                                   | Dev       |
| Google Search Console | Submit sitemap, verify domain ownership                       | Dev       |
| Analytics             | Vercel Analytics + Google Analytics 4 via @next/third-parties | Dev       |
| First 2 blog posts    | Publish 2 SEO-optimised articles before launch                | Content   |
| Lighthouse audit      | Target 90+ score before go-live                               | Dev       |
| Launch                | DNS cutover from old site to Vercel, monitor 24h              | Dev       |

# **8\. Project Timeline**

| **Week** | **Milestone**   | **Deliverable**                                                   |
| -------- | --------------- | ----------------------------------------------------------------- |
| Week 1   | Foundation      | Repo, Sanity, global layout, design tokens live on Vercel preview |
| Week 2   | Core pages      | Home, About, Services, Contact deployed to preview URL            |
| Week 3   | Portfolio build | Portfolio grid + case study template complete                     |
| Week 4   | Content entry   | All projects entered in Sanity, case studies reviewed             |
| Week 5   | Blog build      | Blog index + post template + category pages live                  |
| Week 6   | SEO + Launch    | Sitemap, analytics, Lighthouse 90+, DNS cutover                   |

# **9\. Key Dependencies & Tools**

| **Package**         | **Version** | **Purpose**                                               |
| ------------------- | ----------- | --------------------------------------------------------- |
| next                | 16.x        | Core framework - App Router, SSG, ISR, image optimisation |
| react / react-dom   | 19.x        | UI rendering                                              |
| typescript          | 5.x         | Type safety across the codebase                           |
| tailwindcss         | 4.x         | Utility-first CSS - no separate CSS files needed          |
| @sanity/client      | latest      | Fetch data from Sanity API                                |
| next-sanity         | latest      | Sanity Visual Editing + Live Preview in Next.js           |
| @portabletext/react | latest      | Render Sanity Portable Text as React components           |
| sanity              | 3.x         | CMS Studio embedded at /studio                            |
| @vercel/analytics   | latest      | Web Vitals + page view tracking                           |
| @next/third-parties | latest      | Google Analytics 4 with no performance penalty            |
| sharp               | latest      | Server-side image processing for next/image               |
| zod                 | 3.x         | Runtime validation of Sanity query results                |

# **10\. Environment Variables**

The following environment variables must be set in Vercel's project settings and in a local .env.local file. Never commit these to Git.

| **Variable**                  | **Where Used**  | **Description**                                      |
| ----------------------------- | --------------- | ---------------------------------------------------- |
| NEXT_PUBLIC_SANITY_PROJECT_ID | Client + Server | Sanity project ID (public)                           |
| NEXT_PUBLIC_SANITY_DATASET    | Client + Server | Sanity dataset name (usually 'production')           |
| SANITY_API_READ_TOKEN         | Server only     | Read token for draft content (preview mode)          |
| SANITY_WEBHOOK_SECRET         | Server only     | Secret to verify on-demand ISR revalidation requests |
| NEXT_PUBLIC_GA_ID             | Client          | Google Analytics 4 Measurement ID                    |
| CONTACT_FORM_EMAIL            | Server only     | Recipient address for contact form submissions       |

# **11\. Post-Launch Checklist**

- Submit sitemap to Google Search Console (berrydesign.online/sitemap.xml)
- Verify domain in Google Search Console and Bing Webmaster Tools
- Set up 301 redirects for any old URLs that have changed
- Monitor Core Web Vitals in Vercel Analytics for the first 2 weeks
- Publish first 2 blog posts within 48 hours of launch
- Share portfolio on LinkedIn, Behance, and Dribbble
- Set a recurring calendar task: 2 blog posts per month minimum

# **12\. Success Metrics**

| **Metric**                      | **Target**                | **Measured By**                    |
| ------------------------------- | ------------------------- | ---------------------------------- |
| Lighthouse Performance          | ≥ 90                      | Vercel / Google PageSpeed Insights |
| Lighthouse SEO                  | ≥ 95                      | Vercel / Google PageSpeed Insights |
| Google indexing (all pages)     | < 2 weeks post-launch     | Google Search Console              |
| Organic impressions (3 months)  | +200% vs current site     | Google Search Console              |
| Blog organic traffic (6 months) | 500+ sessions/month       | Google Analytics 4                 |
| Contact form conversions        | Track baseline from day 1 | Google Analytics 4                 |

_BerryDesign - Confidential Project Plan_

_berrydesign.online_
