import type { Metadata } from "next";
import { LegalPage, type LegalArticle } from "../legal-page";

export const metadata: Metadata = {
  title: "Terms of Use (CGU)",
  description:
    "Terms of use and conditions for Delta V decentralized technology services.",
  alternates: {
    canonical: "/cgu",
  },
  openGraph: {
    title: "Terms of Use (CGU) - Delta V",
    description:
      "Terms of use and conditions for Delta V decentralized technology services.",
    url: "https://deltav.cc/cgu",
  },
};

const articles: LegalArticle[] = [
  {
    n: "01",
    slug: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <>
        <p>
          By accessing or using the website <strong>deltav.cc</strong> or any
          services provided by <strong>Delta V SRL</strong>, you agree to be
          bound by these Terms of Use.
        </p>
        <p>
          If you do not agree, you must not use the site or our services. These
          terms apply to visitors, clients, and partners.
        </p>
      </>
    ),
  },
  {
    n: "02",
    slug: "company",
    title: "Company Information",
    body: (
      <>
        <p>
          Delta V SRL is a Romanian company registered with the Trade Registry
          under number <strong>51301377</strong>, with its registered office in
          Bucharest, Sector 1, Romania.
        </p>
        <p>
          Contact: <a href="mailto:contact@deltav.cc">contact@deltav.cc</a>.
        </p>
      </>
    ),
  },
  {
    n: "03",
    slug: "services",
    title: "Services",
    body: (
      <>
        <p>
          Delta V provides IT solutions, AI security, cryptocurrency services,
          research, and related consulting. Service details, pricing, and
          availability may change without notice.
        </p>
        <p>
          Specific contract terms may apply to individual engagements and take
          precedence over these Terms where applicable.
        </p>
      </>
    ),
  },
  {
    n: "04",
    slug: "obligations",
    title: "User Obligations",
    body: (
      <>
        <p>You agree to:</p>
        <ul className="legal-list">
          <li data-i="a.">
            Use the site and services lawfully and in accordance with these
            Terms.
          </li>
          <li data-i="b.">
            Not misuse, disrupt, or attempt to gain unauthorized access to our
            systems.
          </li>
          <li data-i="c.">
            Provide accurate information when engaging with us.
          </li>
          <li data-i="d.">
            Be solely responsible for any content you submit.
          </li>
        </ul>
        <p>
          Failure to comply may result in suspension or termination of access
          without refund or liability on our part.
        </p>
      </>
    ),
  },
  {
    n: "05",
    slug: "ip",
    title: "Intellectual Property",
    body: (
      <>
        <div className="legal-callout">
          <span className="legal-callout-label">MIT License</span>
          <p className="legal-callout-body">
            Permission is granted, free of charge, to any person obtaining a
            copy of this software and associated documentation files, to deal in
            the software without restriction, subject to preserving the copyright
            and permission notice in all copies or substantial portions.
          </p>
        </div>
        <p>
          Third-party content, including images and iframe assets, may be owned
          by third parties and is not covered by this license. Its use is
          governed by the respective owner&apos;s terms.
        </p>
      </>
    ),
  },
  {
    n: "06",
    slug: "liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>To the fullest extent permitted by Romanian law:</p>
        <ul className="legal-list">
          <li data-i="a.">
            The site and services are provided as-is, without warranties of any
            kind.
          </li>
          <li data-i="b.">
            Delta V is not liable for indirect, incidental, consequential, or
            punitive damages arising from use of the site or services.
          </li>
          <li data-i="c.">
            Our total liability for any claim shall not exceed the amount paid
            for the specific service giving rise to the claim.
          </li>
        </ul>
      </>
    ),
  },
  {
    n: "07",
    slug: "third-party",
    title: "Third-Party Content and Links",
    body: (
      <p>
        The site may include links to third-party websites or services not
        controlled by Delta V. We are not responsible for their availability,
        accuracy, or legal compliance. Use them at your own risk.
      </p>
    ),
  },
  {
    n: "08",
    slug: "termination",
    title: "Termination",
    body: (
      <p>
        We may terminate or suspend access to the site or services at our sole
        discretion, without notice, for any reason, including breach of these
        Terms.
      </p>
    ),
  },
  {
    n: "09",
    slug: "force-majeure",
    title: "Force Majeure",
    body: (
      <>
        <p>
          Delta V is not liable for delays, failures, or interruptions caused by
          events beyond our reasonable control, including natural disasters,
          governmental actions, civil unrest, cyberattacks, blockchain protocol
          issues, AI platform failures, or infrastructure outages.
        </p>
        <p>
          Users acknowledge the inherent risks of decentralized and third-party
          technologies and assume responsibility for those risks.
        </p>
      </>
    ),
  },
  {
    n: "10",
    slug: "law",
    title: "Governing Law and Jurisdiction",
    body: (
      <>
        <p>
          These Terms are governed by the laws of <strong>Romania</strong>. Any
          disputes shall be resolved exclusively in the courts of Bucharest,
          Romania.
        </p>
        <p>
          EU consumers may also have rights to pursue claims in their home
          jurisdiction under EU law.
        </p>
      </>
    ),
  },
  {
    n: "11",
    slug: "amendments",
    title: "Amendments",
    body: (
      <p>
        We may update these Terms at any time by posting the revised version on
        the site. Continued use after changes constitutes acceptance.
      </p>
    ),
  },
  {
    n: "12",
    slug: "contact",
    title: "Contact Us",
    body: (
      <p>
        For questions or complaints, contact us at{" "}
        <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or via Signal
        at <strong>@DeltaV.01</strong>.
      </p>
    ),
  },
];

export default function CguPage() {
  return (
    <LegalPage
      active="cgu"
      articles={articles}
      closingTitle={
        <>
          Questions about these <em>Terms</em>?
        </>
      }
      eyebrow="CGU"
      kicker="Terms of Use"
      meta={[
        ["Last updated", "March 30, 2025"],
        ["Jurisdiction", "Romania, Bucharest courts"],
        ["Entity", "Delta V SRL, RO 51301377"],
      ]}
      title={
        <>
          Terms of <em>Use</em><span className="period">.</span>
        </>
      }
    />
  );
}
