# Arya Chakraborty — Portfolio

## Problem Statement
Build a portfolio for Arya Chakraborty. Sections: Home, About, Services, Projects, Contact. Skip Blog. Contact form redirects to WhatsApp (+91 9073568772). Newsletter signup. AI chatbot to answer questions about Arya (Gemini 3 Flash via Emergent Universal Key). Design reference: dark theme, vibrant orange (#FF6B1A) accents, editorial/scrapbook aesthetic with "PASS CARD" about section.

## Architecture
- **Backend**: FastAPI (Python) + MongoDB (Motor). Endpoints under `/api`.
- **Frontend**: React 19 + Tailwind + shadcn/ui + sonner + framer-motion + lucide-react. Fonts: Outfit (display), DM Sans (body), Caveat (script accent).
- **LLM**: `emergentintegrations` with `EMERGENT_LLM_KEY`, model `gemini-3-flash-preview`, streamed via SSE.

## Backend endpoints
- `GET  /api/`
- `POST /api/newsletter/subscribe`  — stores email in `newsletter` collection (dedupe on email)
- `POST /api/contact`               — stores message in `contacts` collection
- `POST /api/chat/stream`           — SSE stream of Gemini 3 Flash reply grounded in Arya's persona; persists messages in `chat_messages`

## Frontend sections
1. Sticky Nav (glass, monogram AC logo, section links, "Let's Connect" CTA, mobile drawer)
2. Hero — big display name with orange script "Arya", role chips, stats card, portrait with orange sun glow, "Building Digital Experiences" script accent, scroll hint
3. About — "PASS CARD" ID with orange background, photo, fields, rotated text tags & doodles
4. Services — 6 cards (Full Stack Web Dev, SEO, Digital Marketing, Data Analytics, AI & Automation, UI/UX)
5. Projects — 3 alternating rows (CitiFix, EduVerse, School ERP) with image, tech tags, CTA
6. Skills — pill cloud
7. Achievements — orange marquee strip
8. Newsletter — email subscribe → backend
9. Contact — form that saves to DB + opens WhatsApp deep link (+919073568772) with prefilled message
10. Footer — socials (LinkedIn, Instagram, GitHub, WhatsApp) + back-to-top
11. Floating AI ChatBot — bottom-right FAB, streaming SSE responses, session-persisted history

## Implemented (2026-07)
- All 10 UI sections
- Backend: newsletter, contact, chat/stream endpoints
- SSE streaming chat with persona-grounded system prompt
- Chat message history persisted to MongoDB

## Known issue / next
- LLM Universal Key on account has $0 budget → chat returns `Budget exceeded` error. User needs to top up in Emergent Profile → Universal Key → Add Balance. Frontend gracefully shows error message.
- Resume PDF: currently "Download Resume" triggers `window.print()` (fallback since user said "skip"). Replace with real PDF URL later.

## Backlog (P1/P2)
- Admin dashboard to view newsletter subscribers & contact messages
- Real resume PDF upload/hosting
- Case-study pages per project (dedicated /projects/:slug routes)
- Blog section (deferred by user)
