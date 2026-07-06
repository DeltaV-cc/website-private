import BlogPostLayout from '../../../components/BlogPostLayout';

export default function CICDPipelineHardeningPost() {
  return (
    <BlogPostLayout
      title="CI/CD Pipeline Hardening for Web3: Stop Deploying Malicious Contracts Through Your Own Workflows"
      date="2026-07-01"
      category="OpSec"
      type="Tutorial"
      excerpt="Your CI/CD pipeline is a privileged execution environment with access to deployer keys, RPC endpoints, and production infrastructure. An attacker who compromises a workflow doesn't need to hack your wallet — they just need to submit a PR. Here's how to lock it down."
      readingTime="14 min"
      sourceUrl="https://devsecoops.theredguild.org/cicd/intro.html"
      sourceLabel="The Red Guild · DevSecOops Handbook"
    >
      <p>
        Web3 teams run CI/CD pipelines that can deploy smart contracts, push to package registries, update frontends, and execute database migrations — all unattended, all with elevated privileges. A single compromised <code>.github/workflows/deploy.yml</code> is a signed blank cheque. This tutorial walks through hardening your CI/CD pipeline using Checkov, workflow auditing, and opsec patterns that actually work.
      </p>

      <h2>The Threat Model</h2>
      <p>Before we touch tools, understand what you're defending against:</p>
      <ul>
        <li><strong>Malicious PR injection.</strong> An attacker opens a PR that modifies a workflow file to echo secrets or execute arbitrary code. If your pipeline runs on <code>pull_request_target</code> with secrets access, it's game over.</li>
        <li><strong>Dependency poisoning.</strong> A compromised npm/pip/cargo dependency runs code during <code>npm install</code> or <code>pip install</code> inside your CI environment, exfiltrating environment variables.</li>
        <li><strong>Workflow hijacking.</strong> An attacker with write access to any repo in your org modifies a shared workflow or action that downstream repos consume.</li>
        <li><strong>Secret exfiltration via logs.</strong> A <code>printenv</code> or <code>echo \$SECRET | base64</code> in a workflow dumps your deployer key into publicly visible CI logs.</li>
        <li><strong>Runner compromise.</strong> Self-hosted GitHub Actions runners persist state between jobs. An attacker who compromises one job can carry access to the next.</li>
      </ul>

      <h2>Phase 1: Infrastructure-as-Code Scanning with Checkov</h2>
      <p>
        Checkov scans your IaC files — Terraform, CloudFormation, Kubernetes manifests, Dockerfiles, and GitHub Actions workflows — for misconfigurations. For Web3 teams, the immediate priority is GitHub Actions workflow scanning.
      </p>

      <h3>Install and run against your workflows</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Install via pip
pip install checkov

# Scan all GitHub Actions workflows in a repo
checkov --directory . --framework github_actions

# Scan and output as SARIF for CI integration
checkov --directory . --framework github_actions --output sarif

# Scan specific workflow files only
checkov --file .github/workflows/deploy.yml --framework github_actions`}</code></pre>

      <h3>Top 5 Checkov findings in Web3 repos</h3>
      <ol>
        <li><strong>CKV_GHA_1: Suspicious use of pull_request_target with secrets.</strong> This is the most dangerous pattern. <code>pull_request_target</code> runs in the context of the base repository — meaning it has access to all secrets. Never use it with untrusted PR code checkout.</li>
        <li><strong>CKV_GHA_2: Workflow does not pin action versions to a SHA.</strong> Using <code>@v3</code> or <code>@main</code> means an attacker who compromises the action repo can inject code into your pipeline. Pin everything to commit SHAs.</li>
        <li><strong>CKV_GHA_3: GitHub Actions runner uses excessive permissions.</strong> Default <code>GITHUB_TOKEN</code> has write access. Set <code>permissions: read-all</code> as default and escalate only where needed.</li>
        <li><strong>CKV_GHA_4: Secret is passed as an environment variable globally.</strong> Every step in the job can read it. Scoping secrets to specific steps reduces blast radius.</li>
        <li><strong>CKV_GHA_7: Build does not use SLSA provenance.</strong> Without build provenance, you can't verify that the deployed artifact matches the source code. Critical for Web3 where frontend integrity is user-facing security.</li>
      </ol>

      <h2>Phase 2: Workflow Hardening Patterns</h2>

      <h3>Pattern 1: Lock down GITHUB_TOKEN</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# ALWAYS start with minimal permissions
# Then escalate per-job only where needed

permissions: read-all  # top-level default

jobs:
  test:
    runs-on: ubuntu-latest
    # inherits read-all — good
    
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # only this job gets write
      id-token: write  # for OIDC-based cloud auth
    # now deploy has the access it needs, nothing more`}</code></pre>

      <h3>Pattern 2: Never run untrusted code with secrets</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# ❌ DANGEROUS: pull_request_target runs PR code in base context
on:
  pull_request_target:
    types: [opened, synchronize]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4  # checks out PR code!
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - run: npm install && npm test  # running untrusted code with secrets

# ✅ SAFE: use pull_request instead — runs in fork context, no secrets
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4  # checks out PR code in isolated context
      - run: npm install && npm test  # no secrets available`}</code></pre>

      <h3>Pattern 3: Pin all actions to commit SHAs</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# ❌ Vulnerable to tag/branch hijacking
- uses: actions/checkout@v4
- uses: foundry-rs/foundry-toolchain@v1

# ✅ Pinned to immutable commit SHA
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
- uses: foundry-rs/foundry-toolchain@8f1998e8558b88ef01ada84a3bd786e85e27ca15  # v1`}</code></pre>

      <h3>Pattern 4: Environment-based secret scoping</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Deployer keys should require explicit environment approval
# and NEVER be available to PR-triggered workflows

jobs:
  deploy-mainnet:
    runs-on: ubuntu-latest
    environment: mainnet  # requires approval + protection rules
    environment:
      name: mainnet
      url: https://app.yourprotocol.xyz
    steps:
      - run: forge script Deploy.s.sol --rpc-url \${{ secrets.MAINNET_RPC }}
        # MAINNET_RPC is ONLY available in the 'mainnet' environment`}</code></pre>

      <h2>Phase 3: CI/CD Secret Scanning with Semgrep</h2>
      <p>
        Your CI/CD configuration files themselves can leak secrets — hardcoded RPC URLs in workflow files, base64-encoded deployer keys in shell scripts, Terraform backends with embedded credentials. Semgrep catches these at the source code level.
      </p>

      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Scan for Web3-specific secret patterns
# Create a custom Semgrep rule for your project:

# rules/web3-secrets.yaml
rules:
  - id: hardcoded-rpc-url-with-key
    pattern-regex: "https://.*\\.alchemy\\.com/v2/[a-zA-Z0-9_-]+"
    message: "Hardcoded Alchemy API key detected"
    severity: ERROR
    languages: [generic]
    
  - id: hardcoded-private-key
    pattern-regex: "0x[a-fA-F0-9]{64}"
    message: "Hardcoded Ethereum private key detected"
    severity: ERROR
    languages: [generic]
    
  - id: hardcoded-mnemonic
    pattern-regex: "(?:[a-z]+ ){11,23}[a-z]+"
    message: "Potential BIP39 mnemonic detected"
    severity: ERROR
    languages: [generic]

# Run Semgrep with your custom rules
semgrep --config rules/web3-secrets.yaml .github/ scripts/`}</code></pre>

      <h2>Phase 4: Workflow Auditing with Octoscan (CI/CD Focus)</h2>
      <p>
        Octoscan's GitHub Actions analysis module examines your workflow files for insecure patterns that Checkov might miss — overly permissive <code>{'if:'}</code> conditions, script injection via <code>{'${{ }}'}</code> expressions, and dangerous third-party action usage.
      </p>

      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Audit workflow security across your org
octoscan --org your-org --token \$GITHUB_TOKEN --focus workflows

# Specific checks Octoscan performs:
# - Expression injection: github.event.issue.title in shell commands
# - Unpinned actions: docker:// and non-SHA action refs
# - Secrets in artifacts: workflow artifacts containing env files
# - Write access analysis: which jobs can modify the repo
# - Self-hosted runner usage: labels and persistence`}</code></pre>

      <h2>The Web3 CI/CD Security Checklist</h2>
      <p>Every CI/CD pipeline handling smart contract deployments should pass these checks:</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-[#222] rounded-lg">
          <thead>
            <tr className="bg-[#111] text-[#aaa] text-left">
              <th className="p-3 border-b border-[#222]">#</th>
              <th className="p-3 border-b border-[#222]">Check</th>
              <th className="p-3 border-b border-[#222]">Tool</th>
              <th className="p-3 border-b border-[#222]">Severity</th>
            </tr>
          </thead>
          <tbody className="text-[#ccc]">
            <tr className="border-b border-[#222]"><td className="p-3">1</td><td className="p-3">No <code>pull_request_target</code> with checkout of PR code</td><td className="p-3">Checkov, Octoscan</td><td className="p-3 text-red-400">Critical</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">2</td><td className="p-3">Deployer keys scoped to environment with approval</td><td className="p-3">Manual</td><td className="p-3 text-red-400">Critical</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">3</td><td className="p-3">All actions pinned to SHA, not tags</td><td className="p-3">Checkov</td><td className="p-3 text-red-400">Critical</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">4</td><td className="p-3"><code>GITHUB_TOKEN</code> set to <code>read-all</code> by default</td><td className="p-3">Checkov, Octoscan</td><td className="p-3 text-amber-400">High</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">5</td><td className="p-3">No script injection via <code>{'${{ github.event.* }}'}</code> in shell</td><td className="p-3">Semgrep, Octoscan</td><td className="p-3 text-amber-400">High</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">6</td><td className="p-3">Secrets scoped to specific steps, not entire job</td><td className="p-3">Manual</td><td className="p-3 text-amber-400">High</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">7</td><td className="p-3">No self-hosted runners for public repos</td><td className="p-3">Checkov</td><td className="p-3 text-amber-400">High</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">8</td><td className="p-3">Build provenance (SLSA) enabled for releases</td><td className="p-3">Checkov</td><td className="p-3">Medium</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">9</td><td className="p-3"><code>semgrep</code> secrets scan in CI for Web3 key patterns</td><td className="p-3">Semgrep</td><td className="p-3">Medium</td></tr>
            <tr><td className="p-3">10</td><td className="p-3">Dependency review enabled for PRs</td><td className="p-3">GitHub native</td><td className="p-3">Medium</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Delta V Hardening Addendum</h2>
      <p>Beyond the checklist, these are patterns we enforce for high-stakes Web3 deployments:</p>
      <ul>
        <li><strong>No deployer key in CI/CD, period.</strong> Use a hardware wallet with a human in the loop for mainnet deployments. CI/CD can prepare the calldata, run tests, and generate the deployment artifact — but the final signature happens off-CI.</li>
        <li><strong>Ephemeral build environments.</strong> Every CI run gets a fresh container. No build cache persistence that an attacker can poison across runs.</li>
        <li><strong>Dual approval for mainnet deploys.</strong> GitHub Environment protection rules require two reviewers to approve before the deploy job runs. This makes a single compromised account insufficient.</li>
        <li><strong>Audit the auditors.</strong> The tools in this tutorial (Checkov, Semgrep, Trufflehog) should themselves run in CI on every PR — so a PR that disables the security scanner gets flagged before merge.</li>
      </ul>

      <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 rounded">
        <p className="text-sm text-neutral-400">
          Sources: <a href="https://devsecoops.theredguild.org/cicd/intro.html" target="_blank" rel="noopener noreferrer" className="underline">The Red Guild · CI/CD Security</a> • <a href="https://github.com/theredguild/DevSecOps-toolkit" target="_blank" rel="noopener noreferrer" className="underline">DevSecOps-toolkit on GitHub</a> • <a href="https://www.checkov.io/" target="_blank" rel="noopener noreferrer" className="underline">Checkov</a> • <a href="https://semgrep.dev/" target="_blank" rel="noopener noreferrer" className="underline">Semgrep</a>
        </p>
      </div>
    </BlogPostLayout>
  );
}
