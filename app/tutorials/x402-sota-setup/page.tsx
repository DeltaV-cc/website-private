import BlogPostLayout from '@/components/BlogPostLayout';
import ArchitectureDiagram, { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

export default function X402SotaTutorial() {
  return (
    <BlogPostLayout
      title="x402 SOTA Setup: HTTP-Native Stablecoin Payments for APIs & Agents"
      date="July 2026"
      category="Web3"
      type="Tutorial"
      backHref="/tutorials/"
      backLabel="All tutorials"
      readingTime="12 min read"
      excerpt="Ship a payment-gated API with the open x402 protocol (HTTP 402 + USDC): seller middleware, buyer/agent client, facilitator choice, and OpSec for machine-payable services - Base-first, production-minded."
    >
      <ArchitectureDiagram
        title="x402 payment flow"
        subtitle="HTTP-native · stablecoin · human or agent client · no account-for-access required"
        layers={[
          {
            id: 'client',
            label: 'Client layer',
            accent: 'cyan',
            nodes: [
              { title: 'App or AI agent', subtitle: 'Requests a paid resource', accent: 'cyan' },
              { title: 'Payment wallet', subtitle: 'USDC on supported network (e.g. Base)' },
              { title: 'Retry with proof', subtitle: 'Attaches payment credentials after 402' },
            ],
          },
          {
            id: 'http',
            label: 'HTTP + x402 protocol',
            accent: 'orange',
            nodes: [
              { title: 'GET /resource', subtitle: 'First request unpaid', accent: 'orange' },
              { title: '402 Payment Required', subtitle: 'PAYMENT-REQUIRED instructions in headers' },
              { title: 'Paid retry', subtitle: 'Server verifies, then serves payload' },
            ],
          },
          {
            id: 'infra',
            label: 'Settlement infrastructure',
            accent: 'amber',
            nodes: [
              { title: 'Seller API / middleware', subtitle: 'Declares price, network, asset', accent: 'amber' },
              { title: 'Facilitator', subtitle: 'Verify + settle (CDP or self-hosted / alt)' },
              { title: 'L2 settlement', subtitle: 'Low fees make micropayments viable' },
            ],
          },
        ]}
      />

      <h2>What x402 is</h2>
      <p>
        <strong>x402</strong> is an open payment standard that revives the HTTP <code>402 Payment Required</code> status
        code for internet-native payments. Instead of accounts, API keys, and card rails for every call, a server can
        say &quot;pay this amount in stablecoin on this network,&quot; a client (human app or agent) pays, retries, and
        receives the resource. Coinbase and the broader ecosystem publish the protocol and facilitator patterns; the
        interesting part for operators is <em>SOTA setup</em> - reliable, observable, and OpSec-clean.
      </p>
      <ul>
        <li><strong>Seller:</strong> monetize an API or content without inventing a billing stack.</li>
        <li><strong>Buyer / agent:</strong> pay-per-call for data, inference, or automation with a hot wallet policy.</li>
        <li><strong>Network:</strong> L2s (commonly Base + USDC) keep fees low enough for true micropayments.</li>
      </ul>

      <h2>SOTA architecture (what &quot;good&quot; looks like)</h2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>SOTA choice</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Protocol</td>
            <td>x402 open standard</td>
            <td>HTTP-native; works for agents and scripts</td>
          </tr>
          <tr>
            <td>Asset / chain</td>
            <td>USDC on a low-fee L2 (e.g. Base)</td>
            <td>Predictable unit of account; cheap retries</td>
          </tr>
          <tr>
            <td>Facilitator</td>
            <td>Managed (e.g. CDP) for prod; public testnet for labs</td>
            <td>Verification + settlement without DIY consensus edge cases</td>
          </tr>
          <tr>
            <td>Seller keys</td>
            <td>Dedicated receive address; no shared treasury hot wallet</td>
            <td>Blast-radius control</td>
          </tr>
          <tr>
            <td>Buyer / agent keys</td>
            <td>Spend-capped wallet; daily limits; separate from custody</td>
            <td>Compromise does not drain main capital</td>
          </tr>
          <tr>
            <td>Identity of operators</td>
            <td>YubiKey on admin SSH / deploy / cloud console</td>
            <td>Humans stay phishing-resistant while machines pay</td>
          </tr>
          <tr>
            <td>Observability</td>
            <td>Structured logs for 402 / pay / 200; on-chain receipts</td>
            <td>Dispute, debug, and incident response</td>
          </tr>
        </tbody>
      </table>

      <ArchitectureFlow
        title="Build path"
        accent="orange"
        steps={[
          { label: 'Lab', detail: 'Testnet facilitator' },
          { label: 'Seller', detail: '402 middleware' },
          { label: 'Buyer', detail: 'Pay + retry client' },
          { label: 'Prod', detail: 'Limits + OpSec' },
        ]}
      />

      <h2>Setup Tutorial</h2>

      <h3>01 - Clarify roles</h3>
      <ul>
        <li><strong>Resource server (seller):</strong> owns the endpoint and pricing.</li>
        <li><strong>Client (buyer):</strong> browser, backend job, or AI agent that can sign payments.</li>
        <li><strong>Facilitator:</strong> verifies payment payloads and helps settle (or you use a documented alternative).</li>
      </ul>
      <p>
        Do not mix the seller treasury, the agent spend wallet, and personal custody on one seed. Treat x402 balances
        as operational float.
      </p>

      <h3>02 - Lab environment</h3>
      <ul>
        <li>Use the public / test facilitator only for experiments (confirm current network support in official docs).</li>
        <li>Fund a disposable test wallet with test USDC on the documented test network.</li>
        <li>Run seller and client on localhost first; bind to loopback until you intentionally expose the API.</li>
      </ul>
      <pre><code>{`# Example shape only - check current x402 / CDP docs for exact packages
# Seller: Node or Python HTTP service with x402 payment middleware
# Client: HTTP client that handles 402 + payment header retry`}</code></pre>

      <h3>03 - Seller: payment-gated endpoint</h3>
      <ul>
        <li>Declare path, price, asset, and network in middleware config.</li>
        <li>Return <code>402</code> with machine-readable payment requirements when unpaid.</li>
        <li>On valid payment, serve the payload (JSON, binary, stream).</li>
        <li>Keep pricing idempotent per resource where possible; log correlation IDs.</li>
      </ul>
      <pre><code>{`// Conceptual middleware config (pseudo)
// GET /v1/signal  ->  requires USDC amount N on chosen network
// unpaid -> 402 + PAYMENT-REQUIRED
// paid   -> 200 + body`}</code></pre>

      <h3>04 - Buyer: pay-and-retry client</h3>
      <ul>
        <li>On <code>402</code>, parse payment requirements.</li>
        <li>Construct and authorize the stablecoin payment via the scheme the server accepts.</li>
        <li>Retry the original request with the payment proof / headers the protocol expects.</li>
        <li>Agents: enforce max spend per call and per day in code - not only in your head.</li>
      </ul>
      <pre><code>{`# Conceptual client loop
# 1) GET resource
# 2) if status == 402: pay(requirements) -> retry with proof
# 3) else: handle body / error`}</code></pre>

      <h3>05 - Production facilitator &amp; network choice</h3>
      <ul>
        <li>Production typically uses a managed facilitator (e.g. Coinbase Developer Platform x402) with credentials and supported networks.</li>
        <li>Confirm gas / fee sponsorship assumptions in current docs - do not market &quot;free forever&quot; without reading the fine print.</li>
        <li>Pin versions of SDKs; record which chain and USDC contract you accept.</li>
      </ul>

      <h3>06 - OpSec hardening (SOTA)</h3>
      <ul>
        <li><strong>YubiKey:</strong> protect human admin paths (SSH, cloud IAM, GitHub, deploy CI) with hardware 2FA / FIDO2.</li>
        <li><strong>Agent wallet:</strong> dedicated key; hard spend caps; no seed on the same disk as long-term cold storage.</li>
        <li><strong>Seller receive:</strong> dedicated address or smart-account policy; sweep to cold / multisig on a schedule.</li>
        <li><strong>Facilitator trust:</strong> treat facilitator outages and policy changes as production dependencies; have a kill switch.</li>
        <li><strong>Network:</strong> TLS everywhere; no mixed-content clients; verify you are not logging payment secrets.</li>
        <li><strong>Institutional ceiling:</strong> if you custody customer funds at scale under regulation, evaluate banking-grade stacks (e.g. Taurus) rather than hot-wallet DIY - that is a different product class.</li>
      </ul>

      <h3>07 - Observability &amp; verification</h3>
      <ul>
        <li>Metrics: 402 rate, paid success rate, average settlement latency, failed payments by reason.</li>
        <li>Store tx hashes / facilitator receipts for reconciling revenue.</li>
        <li>Alert on spend spikes from agent wallets.</li>
      </ul>

      <h2>Verification checklist</h2>
      <ul>
        <li>Unpaid request always returns 402 with parseable requirements</li>
        <li>Paid retry returns 200 and the correct body</li>
        <li>Replay of an old payment proof does not double-serve incorrectly (per your scheme rules)</li>
        <li>Agent wallet cannot exceed configured daily cap</li>
        <li>Admin access requires YubiKey (or equivalent hardware-backed factor)</li>
        <li>No production secrets in client-side bundles</li>
        <li>Runbook exists for facilitator downtime and chain congestion</li>
      </ul>

      <p>
        Official references to keep open while building:{' '}
        <a href="https://x402.org/" target="_blank" rel="noopener noreferrer">x402.org</a>
        {' · '}
        <a href="https://docs.cdp.coinbase.com/x402/welcome" target="_blank" rel="noopener noreferrer">CDP x402 docs</a>
        . Always re-check network support and facilitator endpoints before mainnet.
      </p>
    </BlogPostLayout>
  );
}
