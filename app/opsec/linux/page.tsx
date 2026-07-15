import BlogPostLayout from '@/components/BlogPostLayout';
import { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

export default function LinuxHardeningPage() {
  return (
    <BlogPostLayout
      title="Linux Hardening Guide"
      date="Updated 2026"
      category="OpSec"
      type="Guide"
      backHref="/opsec/"
      backLabel="All OpSec guides"
      excerpt="Factory reset and hardening for sovereignty-focused Linux setups — full-disk encryption, firewall lockdown, and layered defense modules."
    >
      <ArchitectureFlow
        title="Linux baseline path"
        accent="amber"
        steps={[
          { label: 'Clean install', detail: 'LUKS / FDE' },
          { label: 'Core harden', detail: 'UFW · updates' },
          { label: 'Modules', detail: 'SSH · AppArmor' },
          { label: 'OpSec ops', detail: 'Sandbox · audit' },
        ]}
      />

      <h2>1. Factory Reset / Clean Install</h2>
      <ul>
        <li>Perform a fresh install of your distribution (Ubuntu, Debian, Fedora, or Arch recommended).</li>
        <li>Enable full disk encryption (LUKS) during installation.</li>
        <li>Use a strong, unique passphrase.</li>
      </ul>

      <h2>2. Core Hardening</h2>
      <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>
      <p>Install and configure UFW:</p>
      <pre><code>{`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable`}</code></pre>

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
    </BlogPostLayout>
  );
}
