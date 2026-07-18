import Link from 'next/link';

export default function CguPage() {
  return (
    <main className="min-h-screen page-container py-16 md:py-24" aria-labelledby="cgu-heading">
      <div className="max-w-3xl">
        <div className="eyebrow">Legal / 01</div>
        <h1 id="cgu-heading" className="section-title mt-3">Conditions Générales d&apos;Utilisation</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
          Les conditions d&apos;utilisation de Delta V encadrent l&apos;accès au site, à ses contenus et à ses ressources.
        </p>
        <div className="mt-12 space-y-8 border-y border-[var(--border-default)] py-8 text-sm leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Document de référence</h2>
            <p className="mt-2">La version complète et à jour des CGU est maintenue sur le site officiel Delta V.</p>
            <a href="https://deltav.cc/cgu/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex button-secondary">Lire les CGU <span aria-hidden="true">↗</span></a>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Contact</h2>
            <p className="mt-2">Pour toute question relative à l&apos;utilisation du site, contactez-nous à <a href="mailto:engage@deltav.cc" className="text-[var(--accent-cyan)] hover:underline">engage@deltav.cc</a>.</p>
          </section>
        </div>
        <Link href="/" className="mt-8 inline-flex text-sm text-[var(--accent-cyan)] hover:underline">← Retour à Delta V</Link>
      </div>
    </main>
  );
}
