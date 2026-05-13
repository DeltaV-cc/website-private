import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type LegalArticle = {
  n: string;
  slug: string;
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  active: "cgu" | "privacy";
  title: ReactNode;
  kicker: string;
  eyebrow: string;
  meta: Array<[string, string]>;
  articles: LegalArticle[];
  closingTitle: ReactNode;
};

function DeltaLogo({ size = 24 }: { size?: number }) {
  return (
    <Image
      aria-hidden
      alt=""
      className="delta-logo"
      height={size}
      src="/assets/favicon.svg"
      width={size}
    />
  );
}

function SpaceBackground() {
  return (
    <div className="space-bg" aria-hidden>
      <div className="space-bg-base" />
      <div className="space-orb space-orb-1" />
      <div className="space-orb space-orb-2" />
      <div className="space-orb space-orb-3" />
      <div className="space-bg-stars" />
      <div className="space-bg-grain" />
    </div>
  );
}

function LegalNav() {
  return (
    <nav className="nav legal-nav">
      <div className="container nav-inner">
        <Link href="/" className="brand-mark" aria-label="Delta V home">
          <DeltaLogo />
          <span className="mono nav-brand-txt">DELTA V</span>
        </Link>
        <div className="nav-links mono" aria-label="Legal navigation">
          <Link href="/cgu">CGU</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <Link href="/" className="nav-cta mono">
          Back to site
        </Link>
      </div>
    </nav>
  );
}

function LegalFooter({ active }: { active: "cgu" | "privacy" }) {
  return (
    <footer className="footer legal-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="footer-brand">
              <DeltaLogo size={28} />
              <span className="mono nav-brand-txt">DELTA V</span>
            </Link>
          </div>
          <div className="footer-col">
            <Link
              href="/cgu"
              className={active === "cgu" ? "is-active" : ""}
            >
              CGU
            </Link>
            <Link
              href="/privacy"
              className={active === "privacy" ? "is-active" : ""}
            >
              Privacy Policy
            </Link>
          </div>
          <div className="footer-col footer-col-meta">
            <span className="mono">&copy; 2026 Delta V</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LegalPage({
  active,
  title,
  kicker,
  eyebrow,
  meta,
  articles,
  closingTitle,
}: LegalPageProps) {
  return (
    <>
      <SpaceBackground />
      <div className="site-shell">
        <LegalNav />

        <main>
          <header className="legal-head">
            <div className="legal-watermark" aria-hidden>
              {eyebrow}
            </div>
            <div className="container legal-head-inner">
              <div className="legal-crumbs mono">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Legal</span>
                <span className="sep">/</span>
                <span className="legal-current">{eyebrow}</span>
              </div>

              <div className="legal-kicker mono">
                <span className="dot pulse" />
                <span>{kicker}</span>
              </div>

              <h1 className="display legal-title">{title}</h1>

              <div className="legal-meta">
                {meta.map(([label, value]) => (
                  <div className="legal-meta-col" key={label}>
                    <span className="legal-meta-k mono">{label}</span>
                    <span className="legal-meta-v">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section className="container legal-body">
            <aside className="legal-toc">
              <div className="legal-toc-head mono">Contents</div>
              {articles.map((article) => (
                <a key={article.slug} href={`#${article.slug}`}>
                  <span className="legal-toc-num">{article.n}</span>
                  <span className="legal-toc-label">{article.title}</span>
                </a>
              ))}
            </aside>

            <div className="legal-articles">
              {articles.map((article) => (
                <article
                  className="legal-art reveal is-in"
                  id={article.slug}
                  key={article.slug}
                >
                  <div className="legal-art-head">
                    <span className="legal-art-num mono">{article.n}</span>
                    <h2 className="legal-art-title">{article.title}</h2>
                  </div>
                  <div className="legal-art-body">{article.body}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="legal-close">
            <div className="container legal-close-inner">
              <h2 className="display legal-close-title">{closingTitle}</h2>
              <a href="mailto:contact@deltav.cc" className="legal-close-cta">
                <span>Get in touch</span>
                <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </section>
        </main>

        <LegalFooter active={active} />
      </div>
    </>
  );
}
