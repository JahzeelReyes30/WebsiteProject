# WebsiteProject — MajinCleaningSolutions

A real business website, built end to end with Claude Code: **MajinCleaningSolutions**, a
healthcare-inspired home & office cleaning company. This is a business site meant to
actually go live and support the real business, so it had to hold up like a real product,
not just a demo.

Every change made in this directory during a Claude Code session is automatically committed
and pushed to GitHub after each turn.

**Live site:** https://jahzeelreyes30.github.io/WebsiteProject/ (hosted via GitHub Pages,
deployed from the `main` branch root).

## What's on the site

- **Hero** — the pitch: hospital-grade cleaning standards applied to everyday homes and offices.
- **Free Quote funnel** — the whole point of the site commercially. Any "Free Quote" button
  opens a modal asking for name, email, and phone, and submits straight to an inbox via
  [Formspree](https://formspree.io) — no backend server required.
- **Pricing** — one flat rate, $200, no tiers to get confused by.
- **About Us** — the healthcare-inspired angle: hospital-grade disinfectants, color-coded
  tools to avoid cross-contamination, and a checklist-driven process.
- **Before & After gallery** — placeholder illustrations for now (see "What's fake right now"
  below), sized and positioned exactly where real customer photos will eventually go.
- **Reviews** — placeholder testimonials, same idea.

## About this project

This site had two jobs at once: it needed to look and work like something a real customer
could actually book a cleaning through, *and* it needed to double as something an employer
could look at and understand exactly how it was planned and built.

**Why plain HTML/CSS/JS, no framework.** I'm still learning, and I wanted every file to be
something I could read top to bottom and actually understand — no build step, no
`node_modules`, nothing to install just to open the page. It also means the site works the
instant someone opens `index.html`, and deploys to GitHub Pages with zero configuration.

**The funnel.** The brief was: the moment someone lands on the site, there should be an
obvious path to "contact us for a free quote." Rather than force a popup on load (which most
visitors find annoying and just close), I put a prominent "Get Your Free Quote Today" button
right in the hero — the first thing anyone sees — plus repeated quote buttons in the nav,
the pricing card, and the footer, so the funnel is never more than one click away no matter
where someone is on the page. Clicking any of them opens the same modal form.

**Why Formspree instead of a real backend.** A static site has nowhere to *send* form
submissions on its own — there's no server listening. Formspree solves that with a plain
HTML `<form action="...">` pointed at their endpoint; they forward whatever gets submitted
straight to an email inbox. No server code, no hosting bill, no database, and it's free at
this scale.

**What's fake right now, on purpose:**
- The before/after gallery uses hand-built SVG illustrations (`images/before.svg` /
  `images/after.svg`), not real photos, since there aren't any customer jobs yet.
- The reviews are sample text, not real customers.
- The quote form points at `YOUR_FORM_ID` — a placeholder — until Formspree is actually
  set up (see below).

These are clearly labeled on the page itself ("sample" / "coming soon") so nothing is
presented as real that isn't.

## Setup still needed before this goes fully live

1. **Wire up the real Formspree endpoint.**
   - Go to [formspree.io](https://formspree.io) and create a free account.
   - Create a new form; Formspree gives you an endpoint like
     `https://formspree.io/f/abc1234`.
   - In `index.html`, find the line `action="https://formspree.io/f/YOUR_FORM_ID"` inside
     the `<form id="quote-form">` tag and replace `YOUR_FORM_ID` with your real ID.
   - That's it — no other code changes needed. Submissions will start emailing you directly.

2. **Turn on GitHub Pages.**
   - In this repo on GitHub: Settings → Pages → Source → deploy from the `main` branch,
     root folder.
   - The site goes live at `https://jahzeelreyes30.github.io/WebsiteProject/`.

3. **Point a real domain at it (later, once you own one).**
   - Buy `majincleaningsolutions.com` (or similar) from any domain registrar.
   - Add a `CNAME` file to this repo containing just the domain name.
   - In the registrar's DNS settings, add the records GitHub Pages' custom domain docs ask
     for (an `A` record pointing at GitHub's IPs, or a `CNAME` record if using a subdomain).
   - GitHub Pages will serve the exact same site at your own domain instead of the
     `github.io` address.

4. **Swap in real photos and reviews** once you've done a few jobs — replace
   `images/before.svg` / `images/after.svg` with real photos (same filenames, or update the
   `<img src>` paths in `index.html`), and swap the sample `<blockquote>` reviews for real
   ones.

## Files

```
WebsiteProject/
├── index.html        the whole page: hero, about, pricing, gallery, reviews, quote modal
├── css/style.css      all styling, mobile-responsive
├── js/script.js       opens/closes the quote modal, submits the form via fetch()
├── images/
│   ├── before.svg      placeholder "messy room" illustration
│   └── after.svg       placeholder "clean room" illustration
└── README.md           this file
```
