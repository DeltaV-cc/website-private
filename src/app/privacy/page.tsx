import type { Metadata } from "next";
import { LegalPage, type LegalArticle } from "../legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Delta V and how we handle data with a decentralization-first approach.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy - Delta V",
    description:
      "Privacy policy for Delta V and how we handle data with a decentralization-first approach.",
    url: "https://deltav.cc/privacy",
  },
};

const articles: LegalArticle[] = [
  {
    n: "01",
    slug: "commitment",
    title: "Our Commitment",
    body: (
      <>
        <p>
          Delta V SRL goes beyond legal minimums to protect your privacy. While
          compliant with GDPR and Romanian Law No. 506/2004, we apply stricter
          standards for care, transparency, and respect.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, and safeguard
          personal data when you use deltav.cc or our services.
        </p>
      </>
    ),
  },
  {
    n: "02",
    slug: "controller",
    title: "Data Controller",
    body: (
      <>
        <p>
          Delta V SRL, registered with the Trade Registry under number{" "}
          <strong>51301377</strong>, located in Bucharest, Romania, is the data
          controller.
        </p>
        <p>
          Contact: <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or
          Signal <strong>@DeltaV.01</strong>.
        </p>
      </>
    ),
  },
  {
    n: "03",
    slug: "data-we-collect",
    title: "Data We Collect",
    body: (
      <>
        <p>We collect only what is strictly necessary:</p>
        <ul className="legal-list">
          <li data-i="a.">
            <strong>Personal data.</strong> Name, email address, phone number if
            provided, and message content submitted through direct
            communication.
          </li>
          <li data-i="b.">
            <strong>Usage data.</strong> Minimal, privacy-first analytics such
            as anonymized page visits.
          </li>
          <li data-i="c.">
            <strong>Third-party data.</strong> None if you contact us through
            secure channels such as Signal ID.
          </li>
        </ul>
        <p>
          We do not collect sensitive data unless explicitly required for a
          service and consented to by you.
        </p>
      </>
    ),
  },
  {
    n: "04",
    slug: "how-we-use",
    title: "How We Use Your Data",
    body: (
      <>
        <p>We process data solely for:</p>
        <ul className="legal-list">
          <li data-i="a.">
            Responding to inquiries and delivering services.
          </li>
          <li data-i="b.">Improving the site with anonymized insights.</li>
          <li data-i="c.">Legal compliance, including tax obligations.</li>
        </ul>
        <p>
          Legal bases include explicit consent, contract necessity, and limited
          legitimate interests such as security.
        </p>
      </>
    ),
  },
  {
    n: "05",
    slug: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          We use only essential cookies for site functionality. No advertising
          or third-party tracking cookies are deployed.
        </p>
        <p>
          You can disable cookies through browser settings without losing core
          functionality.
        </p>
      </>
    ),
  },
  {
    n: "06",
    slug: "sharing",
    title: "Data Sharing",
    body: (
      <>
        <p>We share data only when unavoidable:</p>
        <ul className="legal-list">
          <li data-i="a.">
            With vetted service providers under enhanced data protection
            agreements.
          </li>
          <li data-i="b.">
            With authorities, only under a verified legal mandate.
          </li>
        </ul>
        <div className="legal-callout">
          <span className="legal-callout-label">Non-negotiable</span>
          <p className="legal-callout-body">
            We never sell, rent, or monetize your data. Third-party recipients
            are contractually bound to delete data after use.
          </p>
        </div>
      </>
    ),
  },
  {
    n: "07",
    slug: "retention",
    title: "Data Retention and Deletion",
    body: (
      <>
        <p>We delete your data faster than required by law:</p>
        <ul className="legal-list">
          <li data-i="a.">
            Contact data from inquiries is deleted within 90 days of resolving
            your request, unless you explicitly request otherwise.
          </li>
          <li data-i="b.">
            Client records are retained for one year after service ends, unless
            tax or legal obligations require longer retention.
          </li>
          <li data-i="c.">
            Anonymized usage data is kept for 30 days, then purged.
          </li>
        </ul>
      </>
    ),
  },
  {
    n: "08",
    slug: "rights",
    title: "Your Enhanced Rights",
    body: (
      <>
        <p>Beyond GDPR, we offer:</p>
        <ul className="legal-list">
          <li data-i="a.">
            <strong>Access.</strong> Full data reports in a human-readable
            format within 15 days.
          </li>
          <li data-i="b.">
            <strong>Rectification or erasure.</strong> Immediate updates or
            deletion upon request unless legally required to retain.
          </li>
          <li data-i="c.">
            <strong>Restriction or objection.</strong> Processing stops upon
            request.
          </li>
          <li data-i="d.">
            <strong>Portability.</strong> Data in open formats within 15 days.
          </li>
          <li data-i="e.">
            <strong>Consent withdrawal.</strong> Revoke consent anytime with no
            penalties.
          </li>
        </ul>
        <p>
          Exercise rights at{" "}
          <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or Signal{" "}
          <strong>@DeltaV.01</strong>.
        </p>
      </>
    ),
  },
  {
    n: "09",
    slug: "security",
    title: "Security",
    body: (
      <>
        <p>We exceed GDPR with:</p>
        <ul className="legal-list">
          <li data-i="a.">
            End-to-end encryption for communications where possible.
          </li>
          <li data-i="b.">
            Regular security review, with results available upon request.
          </li>
          <li data-i="c.">
            Zero-knowledge principles where practical, especially around crypto
            wallet data.
          </li>
        </ul>
        <p>Despite this, no system is infallible. Use at your own risk.</p>
      </>
    ),
  },
  {
    n: "10",
    slug: "transfers",
    title: "International Transfers",
    body: (
      <p>
        Data stays in the EEA unless you request otherwise. If transferred, we
        use safeguards such as Standard Contractual Clauses and encryption.
      </p>
    ),
  },
  {
    n: "11",
    slug: "third-party",
    title: "Third-Party Links",
    body: (
      <p>
        Links to third-party sites or services are not our responsibility. We
        vet them for privacy where possible, but cannot control their practices.
      </p>
    ),
  },
  {
    n: "12",
    slug: "updates",
    title: "Updates",
    body: (
      <p>
        We notify you of material changes 30 days in advance through email or a
        site notice. Continued use after an update implies acceptance.
      </p>
    ),
  },
  {
    n: "13",
    slug: "contact",
    title: "Contact Us",
    body: (
      <p>
        For privacy concerns, reach us at{" "}
        <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or Signal{" "}
        <strong>@DeltaV.01</strong>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      active="privacy"
      articles={articles}
      closingTitle={
        <>
          Questions about your <em>data</em>?
        </>
      }
      eyebrow="Privacy"
      kicker="Privacy Policy"
      meta={[
        ["Last updated", "March 30, 2025"],
        ["Framework", "GDPR, Law 506/2004"],
        ["Controller", "Delta V SRL, RO 51301377"],
      ]}
      title={
        <>
          Privacy <em>Policy</em><span className="period">.</span>
        </>
      }
    />
  );
}
