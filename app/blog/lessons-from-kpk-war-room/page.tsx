import Link from 'next/link';
import DynamicMermaid from '@/app/components/DynamicMermaid';

export default function KPKWarRoomArticle() {
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/blog/" className="text-[#00f0ff] text-sm hover:underline">← Back to blog</Link>
        
        <div className="mt-8">
          <div className="flex items-center gap-3 text-sm text-[#666] mb-4">
            <span>June 18, 2026</span>
            <span>•</span>
            <span className="text-[#00f0ff]">OpSec</span>
          </div>

          <h1 className="text-5xl font-semibold tracking-[-2px] mb-8 leading-tight">
            Inside a $292M DeFi Crisis: Lessons from KPK&apos;s rsETH War Room
          </h1>

          <div className="prose prose-invert max-w-none text-[#ccc] leading-relaxed space-y-6">
            <p className="text-lg">
              On April 18, 2026, Kelp DAO&apos;s rsETH token was exploited through a LayerZero V2 bridge vulnerability. A single compromised attestation point made a $292M malicious funds release look legitimate to the protocol. Within hours, Aave, SparkLend, Compound, and Fluid had paused rsETH markets. Lido and Upshift froze deposits.
            </p>

            <p className="text-lg">
              KPK — an institutional onchain asset manager running capital across six DAO treasuries and curated Morpho vaults — had 20 minutes to decide whether their entire portfolio was at risk. Their post-mortem, published June 10, offers a rare inside account of what institutional incident response actually looks like during a live DeFi crisis.
            </p>

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">The Timeline</h2>

            <DynamicMermaid
              chart={`
                gantt
                  title rsETH Incident Response Timeline
                  dateFormat HH:mm
                  axisFormat %H:%M

                  section Signal
                  Signal received (X/Telegram) : 00:00, 00:00

                  section Response
                  War room activated           : 00:00, 00:20
                  Manual exit agent            : 00:20, 00:33
                  Blast-radius assessment      : 00:20, 12:20
                  Post-mortem + 97 ships       : 00:20, 336:20
              `}
              caption="From signal to resolution: KPK's response timeline — each bar shows duration"
            />

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">The Five Systems That Mattered</h2>

            <h3 className="text-xl font-semibold text-[#ededed] mt-8 mb-3">1. Pre-Deployed Permissions Layer</h3>
            <p>
              KPK&apos;s non-custodial smart-contract framework defines exactly what the asset manager can and cannot do — without ever taking custody of client funds. During the crisis, no new approvals or keys were needed. The permissions were already in place from mandate deployment. The team could move funds in seconds, but only inside pre-drawn lines.
            </p>

            <h3 className="text-xl font-semibold text-[#ededed] mt-8 mb-3">2. Automated Agents + Human Escalation</h3>
            <p>
              KPK runs automated agents that continuously manage allocations across approved markets — maintaining withdrawal liquidity, monitoring risk parameters, executing rebalances. When a high-confidence risk alert fires on a preconfigured incident trigger, exit agents pull liquidity before a human is even in the loop. But the rsETH vector was novel, requiring manual escalation within 13 minutes of activation. The architecture compresses the vulnerability window without eliminating human judgment.
            </p>

            <h3 className="text-xl font-semibold text-[#ededed] mt-8 mb-3">3. Parallel Blast-Radius Mapping</h3>
            <p>
              Six DAOs (ENS, CoW DAO, Arbitrum, Balancer, Nexus Mutual, dYdX), each with independent mandates and risk parameters. KPK ran a cross-reference matrix in parallel: direct exposure, indirect lending-protocol contagion, shared oracles, shared bridge infrastructure, liquidation health under stress. Tailored impact summaries were published to each DAO&apos;s governance channel. All logged and timestamped.
            </p>

            <h3 className="text-xl font-semibold text-[#ededed] mt-8 mb-3">4. Three-Stage Communication Protocol</h3>
            <p>
              Stage one: acknowledge immediately. Aware and responding. No detail, no speculation. Stage two: update with actions taken — deposits halted, positions exited, scope confirmed. Stage three: resolve with full account of what happened and what changed. Each stage requires legal sign-off. It prevents premature disclosure that creates panic or legal exposure, and it handles the challenge of communicating with multiple audiences simultaneously: DAO committees, public vault depositors, and the wider market.
            </p>

            <h3 className="text-xl font-semibold text-[#ededed] mt-8 mb-3">5. Drills That Build Muscle Memory</h3>
            <p>
              KPK runs quarterly company-wide drills plus monthly curation drills with extra reps on high-probability scenarios. Attack classes include multisig compromises, flash loan exploits, oracle failures, liquidation cascades, and stablecoin depegs. In March 2026 — one month before the real incident — the team ran a drill simulating a RedStone oracle malfunction. They built actual transaction payloads to hot-swap affected oracles in production. Those payloads are now wired into the threat-detection platform for fully automated emergency response.
            </p>

            <DynamicMermaid
              chart={`
                flowchart TD
                  S[Signal] --> D{Automated<br/>trigger?}
                  D -->|Yes| AE[Auto exit agent<br/>pulls liquidity]
                  D -->|No| WR[War room<br/>6 assigned roles]
                  
                  WR --> PL[Permissions Layer<br/>pre-deployed authority]
                  PL --> ME[Manual exit<br/>agent · 13 min]
                  
                  ME --> BR[Blast-radius mapping<br/>6 DAOs in parallel]
                  BR --> C1[Stage 1: Acknowledge]
                  C1 --> C2[Stage 2: Update actions]
                  C2 --> C3[Stage 3: Resolve + ship]

                  BR --> PM[Post-mortem<br/>+ quarterly drills]

                  style S fill:#1a1a2e,stroke:#00f0ff,color:#ededed
                  style D fill:#222,stroke:#ff6b6b,color:#ededed
                  style AE fill:#1a2e1a,stroke:#4ade80,color:#ededed
                  style WR fill:#2e1a1a,stroke:#ff6b6b,color:#ededed
                  style PM fill:#1a1a2e,stroke:#a78bfa,color:#ededed
              `}
              caption="KPK's incident response architecture: automated first response, human escalation, and the systems that connect them"
            />

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">What Shipped After: 97 New Monitors</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="text-left py-2 pr-4 text-[#00f0ff]">Area</th>
                    <th className="text-left py-2 text-[#00f0ff]">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Detection</td>
                    <td className="py-2">97 new monitors covering oracle attacks, governance attacks, and bridge exploits</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Automation</td>
                    <td className="py-2">Extended scope of conditions triggering automatic fund movements; upstream protocol deps wired into alerting</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Signal intake</td>
                    <td className="py-2">Automated X screening for trusted security accounts — not all emergencies give you 10 minutes</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">On-call</td>
                    <td className="py-2">Formal PagerDuty rotation with phone-based escalation for after-hours</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Depeg monitoring</td>
                    <td className="py-2">Layered detection with secondary-source price comparison and per-asset historical thresholds</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Speed</td>
                    <td className="py-2">Forced rebalances on user withdrawals — alert to onchain execution in 17 seconds</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-2 pr-4 font-medium">Tooling</td>
                    <td className="py-2">Internal Safe transaction scoping tool to prevent multisig attack vectors</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">The Core Discipline</h2>
            <p>
              KPK runs post-mortems after every incident and after every false alarm. A dismissed threat that wasn&apos;t communicated fast enough reveals a process gap. A real alert that took too long to reach the right person reveals a detection gap. Both get fixed. Hot washes within hours capture the picture while memory is fresh. Full post-mortems within 48 hours produce structural changes.
            </p>
            <blockquote className="border-l-4 border-[#00f0ff] pl-4 italic text-[#aaa] my-6">
              Every incident closes with a list of changes that ship.
            </blockquote>

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">Actionable Steps for Web3 Teams</h2>

            <ol className="list-decimal pl-6 space-y-4">
              <li><strong>Pre-deploy your permissions layer.</strong> Your emergency authority should exist before the emergency. If your team needs a multisig vote to start responding, you&apos;ve already lost.</li>
              <li><strong>Assign six war room roles today.</strong> On-call lead, analysts, strategy, engineering, comms, legal. Write names into each role. Rotate quarterly.</li>
              <li><strong>Run drills that produce transaction payloads.</strong> Quarterly company-wide, monthly for risk. Simulate real attack classes and build executable exits — not table reads.</li>
              <li><strong>Audit your key personnel, not just your code.</strong> Every team member with key access should be independently opsec-audited for phishing resistance, key storage, and comms hygiene.</li>
              <li><strong>Dual-layer detection.</strong> Automated onchain monitoring for deterministic triggers + human signal channels (X, Telegram, partner protocols) for novel vectors.</li>
              <li><strong>Adopt three-stage comms with legal gates.</strong> Acknowledge within minutes. Update within hours. Resolve within 48 hours. Silence is read as weakness.</li>
              <li><strong>Template your blast-radius matrix now.</strong> Build it before you need it: direct exposure, contagion risk, shared oracles, shared bridge infra, shared collateral types.</li>
              <li><strong>Measure and compress your alert-to-execution pipeline.</strong> KPK ships forced rebalances in 17 seconds. Know your number.</li>
            </ol>

            <hr className="border-[#222] my-12" />

            <p className="text-[#666] italic">
              Source: <a href="https://kpk.io/blog/inside-the-war-room" className="text-[#00f0ff] underline">KPK — Inside the War Room: How KPK Responds</a> (June 10, 2026).
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
