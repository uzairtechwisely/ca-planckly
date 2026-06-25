## 1. Product Overview
Planckly California is a high-conversion landing experience that mirrors the exact visual feel of https://joinnow.planckly.com/ while localizing messaging, pricing, and trust cues for a California audience.
- Purpose: generate interest, capture leads, and enroll visitors into a Free Plan via a modal signup flow
- Target users: California residents evaluating Planckly; early adopters responding to a local/trust-first message

## 2. Core Features

### 2.1 Feature Module
1. **Landing page (/)**: pixel-level visual replication, localized content, pricing in USD (roughly converted from PKR), and strong CTA
2. **Privacy (/privacy)**: simple privacy policy for lead capture and analytics
3. **Terms (/terms)**: simple terms for Free Plan signup and site usage
4. **Analytics (site-wide)**: unique visitor measurement, source attribution, funnel events (view → join click → submit), and optional cookie consent for efficient tracking (with a no-cookie fallback)

### 2.2 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| / | Header | Reuse Planckly logo/brand mark from the current site; sticky/animated header if present on original; primary “Join Planckly” CTA |
| / | Hero | Replicate original hero layout, typography, gradients, and motion; update copy to emphasize California trust/localization; primary CTA opens modal |
| / | Social Proof / Trust | Replicate cosmetics; adjust references to California (e.g., “Serving California households”, “Built for California compliance” as appropriate) |
| / | Benefits | Same visual sectioning and iconography style as original; localized benefit copy |
| / | Pricing | Keep card style and animations; show USD pricing roughly converted from PKR; keep “Free Plan” highlighted; CTA opens modal |
| / | FAQ | Replicate accordion aesthetics/animations; include California-centric questions |
| / | Footer | Links to Privacy/Terms + contact email; same background/gradient styling as original |
| Modal | Lead capture | Beautiful animated modal collecting Name, Email, Phone (optional) and “Sign up for Free Plan”; validates input; submits to backend; success and error states |
| Site-wide | Cookie consent | Optional consent banner (Accept / Decline) enabling persistent cookie-based visitor ID; if declined, use session-only tracking without cookies |
| Site-wide | Analytics tracking | Track: unique page views, “Join Planckly” clicks, and lead submit clicks; capture attribution parameters (UTM + ad click IDs) |
| /privacy | Content | Clear sections: data collected, purpose, retention, contact; match site styling |
| /terms | Content | Clear sections: eligibility, Free Plan, disclaimers, changes; match site styling |

## 3. Core Process
Primary user flow (lead capture):
1. Visitor lands on the homepage and scrolls through hero/benefits/pricing.
2. Visitor clicks “Join Planckly”.
3. Modal opens with animated entrance; user enters name + email, optionally phone.
4. Submit stores the lead in Upstash Redis and shows a polished success state.
5. In parallel, the site records analytics events (page_view, cta click, submit click) and associates them with a unique visitor id (cookie-based only when consent is given).

```mermaid
flowchart TD
  A["Visit landing page"] --> B["Explore sections / pricing"]
  B --> C["Click 'Join Planckly' CTA"]
  C --> D["Modal opens with animation"]
  D --> E["Enter name + email (+ optional phone)"]
  E --> F["Submit"]
  F --> G["Validate input"]
  G -->| "Valid" | H["Store lead in Upstash Redis"]
  G -->| "Invalid" | I["Inline error state"]
  H --> J["Success state + close modal"]
  H --> K["Optional: show 'What happens next' message"]

  A --> L["Record page_view event"]
  C --> M["Record cta_join_click event"]
  F --> N["Record lead_submit_click event"]
```

## 4. User Interface Design

### 4.1 Design Style
- Visual direction: exact replication of joinnow.planckly.com cosmetics (spacing, gradients, shadows, border radii, button treatments, section shapes) with US/California copy and USD pricing
- Color system: extracted from the reference site (primary, background, accent, neutral); implemented via CSS variables for strict consistency
- Typography: match the reference site as closely as licensing allows; otherwise pick nearest equivalent with the same weight/contrast and optical sizing
- Buttons: match the reference site’s primary CTA styling; include hover/press micro-interactions and subtle glow/gradient shifts if present on original
- Motion: page-load staggered reveals + scroll-based reveals + CTA hover effects; modal opens/closes with spring-like easing; keep motion consistent with reference
- Iconography: match reference style (stroke weight, rounding, color); keep minimal and brand-aligned

### 4.2 Page Design Overview
| Page Name | Module Name | UI Elements |
|-----------|-------------|-------------|
| / | Global | Full-bleed background treatment matching reference; subtle grain/noise overlay if present; responsive spacing tuned per breakpoint |
| / | Hero | Replicated headline styling; animated highlight/underline/gradient text if used; CTA button with premium micro-interactions |
| / | Pricing | Card layout matching reference; featured plan styling; USD amounts; CTA launches modal |
| / | Modal | Centered or side-sheet (match reference if present); backdrop blur; animated entrance/exit; field focus states; disabled/loading button state |
| /privacy | Content | Readable “legal” typography while staying on-brand; same header/footer |
| /terms | Content | Readable “legal” typography while staying on-brand; same header/footer |

### 4.3 Responsiveness
- Desktop-first implementation with careful scaling to tablet and mobile
- Maintain the reference site’s proportions and typography rhythm at common breakpoints
- Modal must be fully usable on mobile: scrollable content, large tap targets, safe-area padding

