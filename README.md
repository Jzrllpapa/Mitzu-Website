# Mitzu's Home 🐾

A warm, premium, single-page digital home for a very good dog — built with React 19, Vite, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build (outputs to dist/)
npm run preview   # preview the production build locally
npm run lint       # ESLint
npm run format     # Prettier, writes in place
```

## Tech stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · hand-built shadcn-style UI kit on Radix UI · GSAP (ScrollTrigger entrance/reveal animations) · Framer Motion (micro-interactions) · React Router · TanStack Query · React Hook Form + Zod · Lucide icons · Sonner toasts · Embla Carousel · React Photo View (gallery lightbox) · Recharts (health dashboard) · ESLint + Prettier.

## Making it yours

Almost everything content-related lives in `src/data/` as plain TypeScript objects — no CMS, no build step, just edit and save:

| File                     | Controls                                                                         |
| ------------------------ | -------------------------------------------------------------------------------- |
| `src/data/profile.ts`    | Name, breed, birthday, weight, favorite food/toy, personality, hero photo, quote |
| `src/data/photos.ts`     | The gallery — swap `src` for your own photo URLs or files in `src/assets/`       |
| `src/data/memories.ts`   | Story cards in the Memories section                                              |
| `src/data/milestones.ts` | Entries on the horizontal Timeline                                               |
| `src/data/favorites.ts`  | Favorite Things, grouped by category                                             |
| `src/data/health.ts`     | Weight history, vaccinations, vet visits, medications                            |
| `src/data/facts.ts`      | Pool for the "random dog fact" widget                                            |

Design tokens (colors, radii, shadows, fonts) live in `src/index.css` under `@theme` — change the palette or typography once, and it updates everywhere.

## Structure

```
src/
  assets/            static files bundled by Vite
  components/
    ui/              shadcn-style primitives (button, card, dialog, tabs, carousel, ...)
    layout/          navbar, scroll progress bar, theme toggle, back-to-top
    sections/        one file per homepage section (hero, gallery, health, ...)
    shared/          reusable pieces used across sections (paw icon, section heading, ...)
  hooks/             theme, scroll progress, active-section, GSAP scroll-reveal, etc.
  lib/               gsap setup, query client, zod schemas, cn() helper, confetti
  data/              all editable content, typed against src/types/dog.ts
  pages/             route-level components (home, 404)
  types/             shared TypeScript types
  utils/             date formatting helpers
```

## Notes

- Below-the-fold sections (Gallery, Memories, Timeline, Favorite Things, Health, Contact) are lazy-loaded via `React.lazy` for code splitting.
- Dark/light mode persists to `localStorage` and respects the OS preference on first visit.
- `⌘/Ctrl + K` opens a command palette to jump to any section.
- The contact form validates client-side only (React Hook Form + Zod) and shows a toast on "send" — wire `ContactForm`'s `onSubmit` in `src/components/sections/contact-form.tsx` up to your own backend or a service like Formspree when you're ready.
- Update the Open Graph image reference in `index.html` (`/og-image.jpg`) with a real image in `public/` for nice link previews.
