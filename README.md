This is a [Next.js](https://nextjs.org) project for the static rewrite of [deltav.cc](https://deltav.cc), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Static Export

This project is configured with `output: "export"` in `next.config.ts`.

```bash
npm run build
```

The static site is emitted to `out/`, which can be deployed to any static host. To preview a built export locally:

```bash
npm run preview
```

Static export does not support Next.js server-only features such as request-time cookies, rewrites, redirects, dynamic server routes, or default image optimization.

## Delta V Migration Notes

The initial Next implementation uses the live site as the source of truth for:

- Fonts: Fraunces, Inter Tight, and JetBrains Mono via `next/font`
- Brand tokens: dark OKLCH ink/paper palette with the electric cyan accent
- Static assets: favicon and Signal username QR under `public/assets/`
- Landing copy: hero, services, why-us, contact channels, and footer

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
