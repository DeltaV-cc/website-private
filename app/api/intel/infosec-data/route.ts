import { NextResponse } from 'next/server';

export async function GET() {
  const result: any = { kev: [], cves: [], breaches: [], updatedAt: new Date().toISOString() };

  // CISA KEV — latest 6 known exploited vulns
  try {
    const r = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json');
    if (r.ok) {
      const d = await r.json();
      result.kev = (d.vulnerabilities || []).slice(0, 6).map((v: any) => ({
        cve: v.cveID,
        product: v.product,
        vendor: v.vendorProject,
        name: v.vulnerabilityName,
        dateAdded: v.dateAdded,
        dueDate: v.dueDate,
      }));
    }
  } catch (e) {}

  // NVD — latest 6 CVEs with severity
  try {
    const r = await fetch('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=6');
    if (r.ok) {
      const d = await r.json();
      result.cves = (d.vulnerabilities || []).map((v: any) => {
        const cve = v.cve || {};
        const metrics = cve.metrics?.cvssMetricV31?.[0]?.cvssData ||
                        cve.metrics?.cvssMetricV30?.[0]?.cvssData ||
                        {};
        const desc = (cve.descriptions || []).find((x: any) => x.lang === 'en');
        return {
          id: cve.id,
          severity: metrics.baseSeverity || 'N/A',
          score: metrics.baseScore || 0,
          description: (desc?.value || '').slice(0, 140),
          published: cve.published,
        };
      });
    }
  } catch (e) {}

  // HIBP — latest breaches
  try {
    const r = await fetch('https://haveibeenpwned.com/api/v3/breaches');
    if (r.ok) {
      const d = await r.json();
      result.breaches = (Array.isArray(d) ? d : []).slice(0, 8).map((b: any) => ({
        name: b.Name || b.Title,
        domain: b.Domain,
        date: b.BreachDate,
        count: b.PwnCount,
        data: (b.DataClasses || []).slice(0, 5).join(', '),
      }));
    }
  } catch (e) {}

  return NextResponse.json(result);
}
