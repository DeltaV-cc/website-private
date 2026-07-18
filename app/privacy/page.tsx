import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen page-container py-16 md:py-24" aria-labelledby="privacy-heading">
      <div className="max-w-3xl">
        <div className="eyebrow">Legal / 02</div>
        <h1 id="privacy-heading" className="section-title mt-3">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
          Delta V privilégie une approche locale, transparente et respectueuse des données personnelles.
        </p>
        <div className="mt-12 space-y-8 border-y border-[var(--border-default)] py-8 text-sm leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Document de référence</h2>
            <p className="mt-2">La version complète et à jour de notre politique de confidentialité est maintenue sur le site officiel Delta V.</p>
            <a href="https://deltav.cc/privacy/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex button-secondary">Lire la Privacy Policy <span aria-hidden="true">↗</span></a>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Contact</h2>
            <p className="mt-2">Pour toute question relative à vos données, contactez-nous à <a href="mailto:engage@deltav.cc" className="text-[var(--accent-cyan)] hover:underline">engage@deltav.cc</a>.</p>
          </section>
        </div>
        <Link href="/" className="mt-8 inline-flex text-sm text-[var(--accent-cyan)] hover:underline">← Retour à Delta V</Link>
      </div>
    </main>
  );
}
