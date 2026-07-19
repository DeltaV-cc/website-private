import BlogPostLayout from '@/components/BlogPostLayout';

export default function KPKWarRoomArticle() {
  return (
    <BlogPostLayout
      title="Inside a $292M DeFi Crisis: Lessons from KPK's rsETH War Room"
      date="June 18, 2026"
      category="OpSec"
      type="Deep Dive"
      readingTime="8 min read"
      excerpt="On April 18, 2026, Kelp DAO's rsETH token was exploited through a LayerZero V2 bridge vulnerability. KPK had 20 minutes to decide whether their entire portfolio was at risk — a rare inside account of institutional incident response during a live DeFi crisis."
    >
      <p>
        On April 18, 2026, Kelp DAO&apos;s rsETH token was exploited through a LayerZero V2 bridge
        vulnerability. A single compromised attestation point made a $292M malicious funds release look
        legitimate to the protocol. Within hours, Aave, SparkLend, Compound, and Fluid had paused rsETH
        markets. Lido and Upshift froze deposits.
      </p>
      <p>
        KPK — an institutional onchain asset manager running capital across six DAO treasuries and curated
        Morpho vaults — had 20 minutes to decide whether their entire portfolio was at risk. Their
        post-mortem, published June 10, offers a rare inside account of what institutional incident response
        actually looks like during a live DeFi crisis.
      </p>

      <h2>The Timeline</h2>

      <div style={{background:'#111',border:'1px solid #222',borderRadius:'12px',padding:'1.5rem',margin:'1rem 0'}}>
        <div style={{fontSize:'0.85rem',color:'#888',marginBottom:'1rem'}}>rsETH Incident Response Timeline</div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
          {[
            {label:'Signal received (X/Telegram)',time:'00:00'},
            {label:'War room activated',time:'00:00 – 00:20'},
            {label:'Manual exit agent',time:'00:20 – 00:33'},
            {label:'Blast-radius assessment',time:'00:20 – 12:20'},
            {label:'Post-mortem + 97 ships',time:'00:20 – Day +14'},
          ].map((e,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem'}}>
              <span style={{fontFamily:'monospace',fontSize:'0.75rem',color:'#00f0ff',minWidth:'120px'}}>{e.time}</span>
              <span style={{fontSize:'0.8rem',color:'#ccc'}}>{e.label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>The Five Systems That Mattered</h2>

      <h3>1. Pre-Deployed Permissions Layer</h3>
      <p>
        KPK&apos;s non-custodial smart-contract framework defines exactly what the asset manager can and
        cannot do — without ever taking custody of client funds. During the crisis, no new approvals or keys
        were needed. The permissions were already in place from mandate deployment. The team could move funds
        in seconds, but only inside pre-drawn lines.
      </p>

      <h3>2. Automated Agents + Human Escalation</h3>
      <p>
        KPK runs automated agents that continuously manage allocations across approved markets — maintaining
        withdrawal liquidity, monitoring risk parameters, executing rebalances. When a high-confidence risk
        alert fires on a preconfigured incident trigger, exit agents pull liquidity before a human is even in
        the loop. But the rsETH vector was novel, requiring manual escalation within 13 minutes of activation.
        The architecture compresses the vulnerability window without eliminating human judgment.
      </p>

      <h3>3. Parallel Blast-Radius Mapping</h3>
      <p>
        Six DAOs (ENS, CoW DAO, Arbitrum, Balancer, Nexus Mutual, dYdX), each with independent mandates and
        risk parameters. KPK ran a cross-reference matrix in parallel: direct exposure, indirect
        lending-protocol contagion, shared oracles, shared bridge infrastructure, liquidation health under
        stress. Tailored impact summaries were published to each DAO&apos;s governance channel. All logged and
        timestamped.
      </p>

      <h3>4. Three-Stage Communication Protocol</h3>
      <p>
        Stage one: acknowledge immediately. Aware and responding. No detail, no speculation. Stage two: update
        with actions taken — deposits halted, positions exited, scope confirmed. Stage three: resolve with full
        account of what happened and what changed. Each stage requires legal sign-off. It prevents premature
        disclosure that creates panic or legal exposure, and it handles the challenge of communicating with
        multiple audiences simultaneously: DAO committees, public vault depositors, and the wider market.
      </p>

      <h3>5. Drills That Build Muscle Memory</h3>
      <p>
        KPK runs quarterly company-wide drills plus monthly curation drills with extra reps on high-probability
        scenarios. Attack classes include multisig compromises, flash loan exploits, oracle failures,
        liquidation cascades, and stablecoin depegs. In March 2026 — one month before the real incident — the
        team ran a drill simulating a RedStone oracle malfunction. They built actual transaction payloads to
        hot-swap affected oracles in production. Those payloads are now wired into the threat-detection platform
        for fully automated emergency response.
      </p>

      <div style={{background:'#111',border:'1px solid #222',borderRadius:'12px',padding:'1.5rem',margin:'1rem 0'}}>
        <div style={{fontSize:'0.85rem',color:'#888',marginBottom:'1rem'}}>Incident Response Architecture</div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
          {[
            {step:'1','label':'Signal received','color':'#00f0ff'},
            {step:'2','label':'Automated trigger? → Yes: Auto exit agent pulls liquidity','color':'#4ade80'},
            {step:'3','label':'No → War room activated (6 assigned roles)','color':'#ff6b6b'},
            {step:'4','label':'Permissions Layer — pre-deployed authority','color':'#a78bfa'},
            {step:'5','label':'Manual exit agent (13 min)','color':'#ff6b6b'},
            {step:'6','label':'Blast-radius mapping — 6 DAOs in parallel','color':'#fbbf24'},
            {step:'7','label':'Stage 1: Acknowledge → Stage 2: Update → Stage 3: Resolve + ship','color':'#00f0ff'},
            {step:'8','label':'Post-mortem + quarterly drills','color':'#a78bfa'},
          ].map((e,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem'}}>
              <span style={{fontFamily:'monospace',fontSize:'0.75rem',color:e.color,minWidth:'1.5rem',textAlign:'center',background:'#1a1a2e',borderRadius:'4px',padding:'2px 6px'}}>{e.step}</span>
              <span style={{fontSize:'0.8rem',color:'#ccc'}}>{e.label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>What Shipped After: 97 New Monitors</h2>

      <table>
        <thead>
          <tr>
            <th>Area</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Detection</td>
            <td>97 new monitors covering oracle attacks, governance attacks, and bridge exploits</td>
          </tr>
          <tr>
            <td>Automation</td>
            <td>Extended scope of conditions triggering automatic fund movements; upstream protocol deps wired into alerting</td>
          </tr>
          <tr>
            <td>Signal intake</td>
            <td>Automated X screening for trusted security accounts — not all emergencies give you 10 minutes</td>
          </tr>
          <tr>
            <td>On-call</td>
            <td>Formal PagerDuty rotation with phone-based escalation for after-hours</td>
          </tr>
          <tr>
            <td>Depeg monitoring</td>
            <td>Layered detection with secondary-source price comparison and per-asset historical thresholds</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>Forced rebalances on user withdrawals — alert to onchain execution in 17 seconds</td>
          </tr>
          <tr>
            <td>Tooling</td>
            <td>Internal Safe transaction scoping tool to prevent multisig attack vectors</td>
          </tr>
        </tbody>
      </table>

      <h2>The Core Discipline</h2>
      <p>
        KPK runs post-mortems after every incident and after every false alarm. A dismissed threat that
        wasn&apos;t communicated fast enough reveals a process gap. A real alert that took too long to reach the
        right person reveals a detection gap. Both get fixed. Hot washes within hours capture the picture while
        memory is fresh. Full post-mortems within 48 hours produce structural changes.
      </p>
      <blockquote>Every incident closes with a list of changes that ship.</blockquote>

      <h2>Actionable Steps for Web3 Teams</h2>
      <ol>
        <li><strong>Pre-deploy your permissions layer.</strong> Your emergency authority should exist before the emergency. If your team needs a multisig vote to start responding, you&apos;ve already lost.</li>
        <li><strong>Assign six war room roles today.</strong> On-call lead, analysts, strategy, engineering, comms, legal. Write names into each role. Rotate quarterly.</li>
        <li><strong>Run drills that produce transaction payloads.</strong> Quarterly company-wide, monthly for risk. Simulate real attack classes and build executable exits — not table reads.</li>
        <li><strong>Audit your key personnel, not just your code.</strong> Every team member with key access should be independently opsec-audited for phishing resistance, key storage, and comms hygiene.</li>
        <li><strong>Dual-layer detection.</strong> Automated onchain monitoring for deterministic triggers + human signal channels (X, Telegram, partner protocols) for novel vectors.</li>
        <li><strong>Adopt three-stage comms with legal gates.</strong> Acknowledge within minutes. Update within hours. Resolve within 48 hours. Silence is read as weakness.</li>
        <li><strong>Template your blast-radius matrix now.</strong> Build it before you need it: direct exposure, contagion risk, shared oracles, shared bridge infra, shared collateral types.</li>
        <li><strong>Measure and compress your alert-to-execution pipeline.</strong> KPK ships forced rebalances in 17 seconds. Know your number.</li>
      </ol>

      <hr />

      <p>
        <em>
          Source:{' '}
          <a href="https://kpk.io/blog/inside-the-war-room" target="_blank" rel="noopener noreferrer">
            KPK — Inside the War Room: How KPK Responds
          </a>{' '}
          (June 10, 2026).
        </em>
      </p>
    </BlogPostLayout>
  );
}
