import { NextResponse } from 'next/server';

export async function GET() {
  const result: any = { kev: [], cves: [], breaches: [], updatedAt: new Date().toISOString() };

  // CISA KEV — Known Exploited Vulnerabilities (fast, reliable)
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    const r = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json', { signal: controller.signal });
    clearTimeout(t);
    if (r.ok) {
      const d = await r.json();
      result.kev = (d.vulnerabilities || []).slice(0, 8).map((v: any) => ({
        cve: v.cveID,
        product: (v.product || '').slice(0, 60),
        vendor: v.vendorProject,
        name: (v.vulnerabilityName || '').slice(0, 80),
        dateAdded: v.dateAdded,
        dueDate: v.dueDate,
      }));
    }
  } catch (e) { console.error('KEV:', e); }

  // NVD CVEs — may be slow, use short timeout
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    const r = await fetch('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5', { signal: controller.signal });
    clearTimeout(t);
    if (r.ok) {
      const d = await r.json();
      result.cves = (d.vulnerabilities || []).map((v: any) => {
        const cve = v.cve || {};
        const m = cve.metrics?.cvssMetricV31?.[0]?.cvssData || cve.metrics?.cvssMetricV30?.[0]?.cvssData || {};
        const desc = (cve.descriptions || []).find((x: any) => x.lang === 'en');
        return { id: cve.id, severity: m.baseSeverity || '?', score: m.baseScore || 0, description: (desc?.value || '').slice(0, 120), published: cve.published };
      });
    }
  } catch (e) { console.error('NVD:', e); }

  // HIBP Breaches
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    const r = await fetch('https://haveibeenpwned.com/api/v3/breaches', { signal: controller.signal });
    clearTimeout(t);
    if (r.ok) {
      const d = await r.json();
      result.breaches = (Array.isArray(d) ? d : []).slice(0, 8).map((b: any) => ({
        name: b.Name || b.Title || 'Unknown',
        domain: b.Domain || '',
        date: b.BreachDate || '',
        count: b.PwnCount || 0,
        data: (b.DataClasses || []).slice(0, 4).join(', '),
      }));
    }
  } catch (e) { console.error('HIBP:', e); }

  return NextResponse.json(result);
}
