import BlogPostLayout from '@/components/BlogPostLayout';

export default function GithubSecurityAuditPost() {
  return (
    <BlogPostLayout
      title="GitHub Security Audit: Find Leaked Secrets, Overprivileged CI/CD, and Fake Contributors in 30 Minutes"
      date="2026-07-01"
      category="OpSec"
      type="Tutorial"
      excerpt="Your GitHub org is the front door to your codebase. In this hands-on tutorial, we walk through a complete GitHub security audit using Octoscan, Trufflehog, GitXRay, and Legitify — the same tools the Red Guild bundles in their DevSecOps toolkit."
      readingTime="12 min"
      sourceUrl="https://devsecoops.theredguild.org/"
      sourceLabel="The Red Guild · DevSecOops Handbook"
    >
      <p>
        Every Web3 team — from solo devs shipping a DeFi protocol to DAOs managing multi-sig governance — shares one attack surface: <strong>GitHub</strong>. Leaked private keys, overprivileged CI/CD workflows, rogue collaborators, and hardcoded RPC URLs are all sitting in repos right now. This tutorial shows you how to find them before an attacker does.
      </p>

      <p className="text-sm text-[#888] italic">
        Note: All tools in this tutorial are open-source and available in The Red Guild's <a href="https://github.com/theredguild/DevSecOps-toolkit" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:underline">DevSecOps-toolkit</a> container. If you want a zero-install experience, run <code className="text-xs bg-[#222] px-1.5 py-0.5 rounded">make exec</code> and follow along.
      </p>

      <h2>Phase 1: Secrets Scanning with Trufflehog</h2>
      <p>
        The most common GitHub vulnerability: secrets committed to version control. Private keys, API tokens, Infura/Alchemy URLs, wallet mnemonics — they all end up in git history eventually. Trufflehog scans every commit, every branch, and every file for high-entropy strings and known secret patterns.
      </p>

      <h3>Basic scan against a public repo</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Scan a remote GitHub repo for secrets
trufflehog github --repo=https://github.com/your-org/your-repo --only-verified

# Scan your entire GitHub org (requires PAT with repo scope)
trufflehog github --org=your-org --only-verified

# Scan a local clone (faster, works offline)
git clone https://github.com/your-org/your-repo
trufflehog filesystem ./your-repo --only-verified`}</code></pre>

      <h3>What to look for</h3>
      <ul>
        <li><strong>Private keys (0x... / ed25519 / secp256k1)</strong> — immediate rotation required if found. Even if the repo is private, assume compromise.</li>
        <li><strong>RPC URLs with embedded API keys</strong> — your Infura/Alchemy key exposed means an attacker can drain your request quota, enumerate your addresses, or front-run your transactions.</li>
        <li><strong>CI/CD secrets echoed in logs</strong> — Trufflehog scans GitHub Actions logs too. A <code>printenv</code> in a workflow file is a gold mine for attackers.</li>
        <li><strong>SSH private keys and .pem files</strong> — often committed by accident during infra-as-code setup.</li>
      </ul>

      <h3>Integrate into CI/CD</h3>
      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# .github/workflows/secrets-scan.yml
name: Secrets Scan
on: [push, pull_request]
jobs:
  trufflehog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # scan full git history
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: \${{ github.event.before }}
          head: \${{ github.event.after }}
          extra_args: --only-verified`}</code></pre>

      <h2>Phase 2: GitHub Permissions Audit with Legitify</h2>
      <p>
        Overprivileged GitHub orgs are the norm, not the exception. Legitify checks your org, repos, and members against security best practices — no write access to default branches, no stale admins, branch protection enabled, signed commits required.
      </p>

      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Scan an entire organization
legitify analyze --org your-org --token \$GITHUB_TOKEN

# Scan a single repository
legitify analyze --repo your-org/your-repo --token \$GITHUB_TOKEN

# Common findings you'll see:
# - "Default branch is not protected"
# - "Organization does not enforce two-factor authentication"
# - "Repository allows force pushes to default branch"
# - "Admin permissions are granted to too many members"`}</code></pre>

      <h3>Prioritize these fixes</h3>
      <ol>
        <li><strong>Enable 2FA org-wide</strong> — if Legitify reports this, fix it immediately. No exceptions for bot accounts (use fine-grained PATs instead).</li>
        <li><strong>Branch protection on main/master</strong> — require PR reviews, dismiss stale reviews on new commits, block force pushes.</li>
        <li><strong>Audit admin access</strong> — anyone with admin on a repo can bypass branch protection. Keep it to 2–3 people max.</li>
        <li><strong>Require signed commits</strong> — prevents commit spoofing and makes attribution verifiable.</li>
      </ol>

      <h2>Phase 3: Contributor OSINT with GitXRay</h2>
      <p>
        Not every contributor is who they claim to be. GitXRay analyzes contributor patterns — commit frequency, account age, repo associations, and behavioral anomalies. Useful for spotting fake contributors (a known attack vector in Web3 where malicious PRs get merged by compromised or planted accounts).
      </p>

      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Analyze a repo's contributors
gitxray repo --url https://github.com/your-org/your-repo

# Check a specific user's activity across GitHub
gitxray user --username suspicious-dev

# Look for:
# - Accounts created in the last 30 days pushing to critical repos
# - Users with no other public activity suddenly submitting complex PRs
# - Multiple accounts with overlapping commit patterns (sock puppets)`}</code></pre>

      <h2>Phase 4: Sensitive File Exposure with Octoscan</h2>
      <p>
        Octoscan searches repos for accidentally committed sensitive files — <code>.env</code> files, database dumps, wallet files, SSH configs, kubeconfigs, and anything else that shouldn't be in version control.
      </p>

      <pre><code className="block bg-[#111] border border-[#222] rounded-lg p-4 text-sm text-[#ccc] overflow-x-auto">{`# Scan a remote GitHub repository
octoscan --repo https://github.com/your-org/your-repo

# Scan a GitHub organization (requires PAT)
octoscan --org your-org --token \$GITHUB_TOKEN

# What Octoscan catches that Trufflehog might miss:
# - .env files (even without secrets, reveals architecture)
# - terraform.tfstate (infrastructure map)
# - .git/config with embedded credentials
# - kubeconfig files with cluster access
# - Hardhat/Foundry config with deployer keys`}</code></pre>

      <h2>Putting It All Together: The 30-Minute Audit</h2>
      <p>
        Here's a battle-tested workflow for rapid GitHub security audits. Run these in order:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-[#222] rounded-lg">
          <thead>
            <tr className="bg-[#111] text-[#aaa] text-left">
              <th className="p-3 border-b border-[#222]">Step</th>
              <th className="p-3 border-b border-[#222]">Tool</th>
              <th className="p-3 border-b border-[#222]">Time</th>
              <th className="p-3 border-b border-[#222]">What It Finds</th>
            </tr>
          </thead>
          <tbody className="text-[#ccc]">
            <tr className="border-b border-[#222]">
              <td className="p-3">1</td>
              <td className="p-3"><code className="text-xs bg-[#111] px-1.5 py-0.5 rounded">trufflehog</code></td>
              <td className="p-3">5 min</td>
              <td className="p-3">Live secrets (keys, tokens, RPC URLs)</td>
            </tr>
            <tr className="border-b border-[#222]">
              <td className="p-3">2</td>
              <td className="p-3"><code className="text-xs bg-[#111] px-1.5 py-0.5 rounded">octoscan</code></td>
              <td className="p-3">3 min</td>
              <td className="p-3">Sensitive files (.env, kubeconfig, tfstate)</td>
            </tr>
            <tr className="border-b border-[#222]">
              <td className="p-3">3</td>
              <td className="p-3"><code className="text-xs bg-[#111] px-1.5 py-0.5 rounded">legitify</code></td>
              <td className="p-3">5 min</td>
              <td className="p-3">Permission misconfigurations</td>
            </tr>
            <tr className="border-b border-[#222]">
              <td className="p-3">4</td>
              <td className="p-3"><code className="text-xs bg-[#111] px-1.5 py-0.5 rounded">gitxray</code></td>
              <td className="p-3">10 min</td>
              <td className="p-3">Suspicious contributors, sock puppets</td>
            </tr>
            <tr>
              <td className="p-3">5</td>
              <td className="p-3"><code className="text-xs bg-[#111] px-1.5 py-0.5 rounded">manual</code></td>
              <td className="p-3">7 min</td>
              <td className="p-3">Review findings, prioritize, write report</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Delta V Hardening Addendum</h2>
      <p>
        Beyond the open-source toolkit, Delta V recommends these additional checks for Web3 teams:
      </p>
      <ul>
        <li><strong>Deployer key isolation.</strong> The key that deploys contracts should never touch a GitHub Actions secret. Use hardware wallets for mainnet deployments.</li>
        <li><strong>Multi-sig for admin actions.</strong> Even if your GitHub org is compromised, contract upgrades should require multi-sig — not a single EOA whose key was in an env file.</li>
        <li><strong>CI/CD sandboxing.</strong> Build and test in ephemeral environments. Never let a CI runner have access to production RPC endpoints or deployer keys.</li>
        <li><strong>Commit signing audit trail.</strong> Every merge to main should be a signed commit from a verified identity. No unsigned merges, period.</li>
      </ul>

      <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 rounded">
        <p className="text-sm text-neutral-400">
          Sources: <a href="https://devsecoops.theredguild.org/" target="_blank" rel="noopener noreferrer" className="underline">The Red Guild · DevSecOops Handbook</a> • <a href="https://github.com/theredguild/DevSecOps-toolkit" target="_blank" rel="noopener noreferrer" className="underline">DevSecOps-toolkit on GitHub</a> • Built on open-source tools maintained by the Web3 security community.
        </p>
      </div>
    </BlogPostLayout>
  );
}
