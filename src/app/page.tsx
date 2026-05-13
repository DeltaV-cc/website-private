import Image from "next/image";
import { Reveal } from "./reveal";

const services = [
  {
    n: "01",
    title: "Tech Foundations",
    lede: "Build IT systems ready for tomorrow's challenge.",
    items: [
      ["Web & Mobile Apps", "$100-500 / page"],
      ["IT Infrastructure", "from $80"],
      ["Scalable Web3 Integration", "Contact us"],
      ["Web3 Apps", "Contact us"],
    ],
  },
  {
    n: "02",
    title: "Growth Boost",
    lede: "Expand your reach across regions with confidence.",
    items: [
      ["Strategic Expansion Support", "EU / Swiss markets"],
      ["Public Good Advocacy & Fundraising", "Contact us"],
    ],
  },
  {
    n: "03",
    title: "Cybersecurity",
    lede: "Secure operations with state-of-the-art solutions.",
    items: [
      ["Cybersecurity & Privacy Audits", "$100 retail"],
      ["GenAI & Agent Development", "$50 / hour"],
      ["CryptoSec", "$50 / month or 10% profits"],
      ["Threat Monitoring", "$50-$5,000 / month"],
    ],
  },
  {
    n: "04",
    title: "Research Services",
    lede: "Uncover market trends with data-driven insights.",
    items: [
      ["Market Research Reports", "$2,000"],
      ["On-chain / OSINT Analysis", "10% funds or $80 / hr"],
      ["Training", "$80 / hour"],
    ],
  },
];

const pillars = [
  {
    n: "01",
    title: "Tech Natives",
    body: "Passionate professionals at the forefront of decentralization and digital upskilling. We do not just consult, we build, operate, and live the stack.",
  },
  {
    n: "02",
    title: "Self-Ownership Focused",
    body: "Every solution we deliver prioritizes user control. Decentralized tools that keep data, keys, and decisions where they belong: with you.",
  },
];

function DeltaLogo({ size = 24 }: { size?: number }) {
  return (
    <Image
      aria-hidden
      alt=""
      className="delta-logo"
      height={size}
      priority={size <= 24}
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

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand-mark" aria-label="Delta V home">
          <DeltaLogo />
          <span className="mono nav-brand-txt">DELTA V</span>
        </a>
        <div className="nav-links mono" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#why">Why us</a>
          <a href="#engage">Engage</a>
        </div>
        <a href="#engage" className="nav-cta mono">
          Get in touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bloom" aria-hidden>
        <iframe
          src="/amaranth/index.html"
          title="Delta V generative flower"
          loading="eager"
          referrerPolicy="no-referrer"
          className="hero-bloom-frame"
        />
      </div>
      <div className="container hero-inner">
        <h1 className="hero-h display">
          <span className="hero-line hero-line-small">Delta V</span>
          <span className="hero-line">Accelerates your</span>
          <span className="hero-line hero-line-indent-a">
            <em>Adoption</em>
          </span>
          <span className="hero-line hero-line-indent-b">of Decentralized</span>
          <span className="hero-line hero-line-indent-c">
            Technologies<span className="period">.</span>
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-lede">
            Tech foundations, strategic growth, cybersecurity, and research,
            built for a decentralized world.
          </p>
          <a href="#services" className="cta-primary">
            <span>Explore services</span>
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="sect-head">
          <span className="mono sect-num">§ 01</span>
          <span className="mono tag-paren">(Services)</span>
          <h2 className="sect-title display">Four disciplines.</h2>
        </Reveal>

        <div className="services-list">
          {services.map((service, index) => (
            <Reveal
              as="article"
              className="service-row"
              delay={index * 70}
              key={service.n}
            >
              <span className="service-num mono">{service.n}</span>
              <div>
                <h3 className="service-title display">{service.title}</h3>
                <p className="service-lede">{service.lede}</p>
                <div className="service-items">
                  {service.items.map(([name, price], index) => (
                    <div className="service-item" key={name}>
                      <span className="service-item-num mono">
                        {service.n}.{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="service-item-name">{name}</span>
                      <span className="service-item-price">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal className="sect-head">
          <span className="mono sect-num">§ 02</span>
          <span className="mono tag-paren">(Why Delta V)</span>
          <h2 className="sect-title display">
            We believe decentralization is a <em>fundamental shift</em>.
          </h2>
        </Reveal>

        <div className="why-grid">
          {pillars.map((pillar, index) => (
            <Reveal
              as="article"
              className="pillar"
              delay={index * 90}
              key={pillar.n}
            >
              <span className="pillar-num mono">{pillar.n}</span>
              <h3 className="pillar-title display">{pillar.title}</h3>
              <p className="pillar-body">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engage() {
  return (
    <section className="section" id="engage">
      <div className="container">
        <Reveal className="sect-head">
          <span className="mono sect-num">§ 03</span>
          <span className="mono tag-paren">(Get in touch)</span>
          <h2 className="sect-title display engage-title">
            Let&apos;s build the <em>decentralized</em> future together
            <span className="period">.</span>
          </h2>
        </Reveal>

        <div className="engage-grid">
          <Reveal
            as="a"
            href="mailto:contact@deltav.cc"
            className="channel channel-primary"
            delay={80}
          >
            <span className="channel-label mono">Email</span>
            <span className="channel-value display">contact@deltav.cc</span>
            <span className="channel-arrow mono">Compose</span>
          </Reveal>

          <Reveal className="channel" delay={160}>
            <span className="channel-label mono">Signal</span>
            <span className="channel-value display">@DeltaV.01</span>
            <span className="channel-meta">
              Prefer encrypted communications? Signal keeps sensitive inquiries
              end-to-end private.
            </span>
            <Image
              src="/assets/signal-username-qr.png"
              alt="Signal QR code for @DeltaV.01"
              width={440}
              height={438}
              className="channel-qr"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-mega display" aria-hidden>
          DELTA&nbsp;V
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <a href="#top" className="footer-brand">
              <DeltaLogo size={28} />
              <span className="mono nav-brand-txt">DELTA V</span>
            </a>
          </div>
          <div className="footer-col">
            <a href="https://deltav.cc/cgu.html">CGU</a>
            <a href="https://deltav.cc/privacy.html">Privacy Policy</a>
          </div>
          <div className="footer-col footer-col-meta">
            <span className="mono">© 2026 Delta V</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <div className="site-shell">
        <Nav />
        <Hero />
        <Services />
        <Why />
        <Engage />
        <Footer />
      </div>
    </>
  );
}
