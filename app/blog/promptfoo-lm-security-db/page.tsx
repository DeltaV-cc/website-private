import BlogPostLayout from '@/components/BlogPostLayout';

export default function LMSecurityDBArticle() {
  return (
    <BlogPostLayout
      title="A Database of LLM Bugs Worth Bookmarking — Promptfoo's LM Security DB"
      date="July 18, 2026"
      category="OpSec"
      type="Tool"
      readingTime="4 min read"
      excerpt="Promptfoo's LM Security DB is the Solodit equivalent for AI security bugs — a community-built catalog of real-world LLM vulnerabilities that every AI builder should bookmark."
    >
      <p>
        If you work in Web3 security, you know <strong>Solodit</strong> — the database of smart contract
        vulnerabilities that every auditor lives in. It aggregates real bugs, findings, and exploits from
        top security firms so you can study attack patterns before they hit your code.
      </p>
      <p>
        There is now an equivalent for AI. <strong>Promptfoo's LM Security DB</strong> is a community-built,
        openly accessible database of large language model vulnerabilities — prompt injections, jailbreaks,
        data poisoning, credential leaks, and agent-level exploits. If you build with or on top of LLMs,
        you should bookmark it.
      </p>

      <h2>What It Is</h2>
      <p>
        Promptfoo is already one of the most widely used tools for LLM testing, evaluation, and red-teaming.
        Their <a href="https://www.promptfoo.dev/lm-security-db" target="_blank" rel="noopener noreferrer">LM Security DB</a> takes
        that expertise and makes it explorable — a categorized, searchable catalog of real vulnerabilities
        collected from production deployments, security research, and community submissions.
      </p>
      <p>
        Each entry documents the vulnerability type, affected model or framework, exploit technique,
        and — critically — mitigation steps. It is built for practitioners, not academics. The taxonomy
        spans the attack surface AI builders actually face:
      </p>
      <ul>
        <li><strong>Prompt injection</strong> — indirect and direct attacks that override system instructions</li>
        <li><strong>Jailbreaks</strong> — techniques that bypass safety filters and content restrictions</li>
        <li><strong>Data poisoning</strong> — training-time attacks where malicious documents create persistent model vulnerabilities</li>
        <li><strong>Credential leaks</strong> — API keys, tokens, and passwords exposed through agent debug output and stdout capture</li>
        <li><strong>Insecure code generation</strong> — XSS, command injection, SSRF, and path traversal introduced by AI coding tools</li>
        <li><strong>Agent skill exploits</strong> — vulnerabilities in agent tool-use that survive across forks and deployments</li>
      </ul>

      <h2>Why It Matters Now</h2>
      <p>
        AI is being embedded in every stack. Claude Code, Copilot, and Cursor are generating production code.
        Autonomous agents are holding private keys and moving assets. LLMs are being deployed in healthcare,
        defense, finance, and critical infrastructure — often with the same security assumptions we abandoned
        for web applications 15 years ago.
      </p>
      <p>
        The Georgia Tech SSLab recently released a dashboard tracking over 50,000 advisories for CVEs
        introduced by AI-generated code. Anthropic published <a href="https://www.anthropic.com/research/sleeper-agents-training-deceptive-llms-that-persist-through-safety-training" target="_blank" rel="noopener noreferrer">research</a> showing that
        a small number of poisoned training examples can create persistent backdoors that survive safety
        fine-tuning. Security researchers have found credential leaks in popular AI agent frameworks
        that remain exploitable in forked codebases months after disclosure.
      </p>
      <p>
        The lesson from Web3 security applies here too: you study the bug database before you write
        the contract. The LM Security DB is that database for AI.
      </p>

      <h2>How We Use It</h2>
      <p>
        At Delta V, we run sovereign AI agents — local-first, self-custodied, with minimal attack surface.
        The LM Security DB feeds directly into our threat model. Before deploying any agent that touches
        keys, wallets, or external APIs, we check:
      </p>
      <ol>
        <li>What injection vectors exist for the model and framework we are using?</li>
        <li>Are there known jailbreaks that bypass the guardrails we have configured?</li>
        <li>Does our agent framework leak credentials through debug output or error handling?</li>
        <li>Have similar agent architectures been exploited in the wild?</li>
      </ol>
      <p>
        The database turns these from open research questions into checkable, actionable items. Each
        entry links to proof-of-concept code, affected versions, and patches. It makes AI security
        audit work feel closer to smart contract audit work — structured, repeatable, and grounded
        in real data rather than speculation.
      </p>

      <h2>The Broader Landscape</h2>
      <p>
        Promptfoo's DB is the most polished entry, but the AI security ecosystem is growing fast:
      </p>
      <ul>
        <li><strong>@llm_sec</strong> — aggregator account on X tracking LLM security research, papers, and jobs</li>
        <li><strong>Georgia Tech SSLab</strong> — open-source dashboard scanning 50K+ advisories for AI-introduced CVEs</li>
        <li><strong>Anthropic alignment research</strong> — data poisoning, sleeper agents, and safety training robustness</li>
        <li><strong>AI agent skill audits</strong> — multiple independent researchers finding credential leaks in agent stdout and memory buffers</li>
      </ul>
      <p>
        The pattern is familiar to anyone who has watched Web3 security mature. First comes the tooling
        fragmentation. Then the community database. Then the audit firms. Then the standards. We are
        somewhere between phase two and three — and the databases being built now will underpin the
        security practices of the next decade.
      </p>

      <h2>Bookmark It</h2>
      <p>
        The LM Security DB is free, open, and actively maintained:
      </p>
      <p>
        <strong>→ <a href="https://www.promptfoo.dev/lm-security-db" target="_blank" rel="noopener noreferrer">promptfoo.dev/lm-security-db</a></strong>
      </p>
      <p>
        If you build AI agents, audit AI systems, or just want to understand how LLMs actually get
        compromised — this belongs in your bookmarks next to Solodit, CVE, and the OWASP Top 10.
      </p>
    </BlogPostLayout>
  );
}
