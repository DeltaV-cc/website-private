import Link from 'next/link';
export default function LinuxHardeningPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 pt-12 pb-20">
      <Link href="/opsec/" className="text-sm text-[#666] hover:text-[#00f0ff] inline-block mb-8">← Back to OpSec</Link>

      <div className="text-[#00f0ff] text-xs tracking-[3px] mb-2">OPSEC • LINUX</div>
        <h1 className="text-4xl font-semibold tracking-[-2px] mb-8">Linux Hardening Guide</h1>

        <div className="prose prose-invert max-w-none text-[#ededed]">
          <p className="text-lg text-[#aaa]">Based on Opsek/OSs-security • Factory reset &amp; hardening for sovereignty-focused setups.</p>

          <h2>1. Factory Reset / Clean Install</h2>
          <ul>
            <li>Perform a fresh install of your distribution (Ubuntu, Debian, Fedora, Arch recommended).</li>
            <li>Enable full disk encryption (LUKS) during installation.</li>
            <li>Use a strong, unique passphrase.</li>
          </ul>

          <h2>2. Core Hardening</h2>
          <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>
          <p>Install and configure UFW:</p>
          <pre><code>sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable</code></pre>

          <h2>3. Recommended Hardening Modules</h2>
          <ul>
            <li>SSH hardening</li>
            <li>Kernel parameter tuning (sysctl)</li>
            <li>Auditd + logging improvements</li>
            <li>AppArmor enforcement</li>
            <li>Automatic security updates</li>
          </ul>

          <h2>4. Additional OpSec Recommendations</h2>
          <ul>
            <li>Use Firejail or Bubblewrap for application sandboxing</li>
            <li>Run high-risk tools in a dedicated hardened VM</li>
            <li>Regularly audit with Lynis</li>
          </ul>

          <p className="text-sm text-[#666] mt-12">Source: https://github.com/Opsek/OSs-security</p>
        </div>
    </div>
  );
}
