import BlogPostLayout from '@/components/BlogPostLayout';
import { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

export default function WindowsHardeningPage() {
  return (
    <BlogPostLayout
      title="Windows Hardening Guide"
      date="Updated 2026"
      category="OpSec"
      type="Guide"
      backHref="/opsec/"
      backLabel="All OpSec guides"
      excerpt="Telemetry reduction and endpoint security for Windows — BitLocker, local accounts, Defender hardening, and firewall lockdown for sovereignty-focused setups."
    >
      <ArchitectureFlow
        title="Windows baseline path"
        accent="amber"
        steps={[
          { label: 'Clean ISO', detail: 'Local account' },
          { label: 'BitLocker', detail: 'Full-disk encrypt' },
          { label: 'Telemetry cut', detail: 'Defender harden' },
          { label: 'Firewall', detail: 'Endpoint rules' },
        ]}
      />

      <h2>1. Factory Reset</h2>
      <ul>
        <li>Clean Windows installation from an official ISO.</li>
        <li>Enable BitLocker.</li>
        <li>Prefer a local account over a Microsoft account.</li>
      </ul>

      <h2>2. Core Hardening</h2>
      <p>Run the PowerShell hardening script and apply:</p>
      <ul>
        <li>Telemetry and diagnostic data reduction</li>
        <li>PowerShell and Defender hardening</li>
        <li>Disable unnecessary services</li>
      </ul>

      <h2>3. Key Privacy Steps</h2>
      <ul>
        <li>Disable Cortana, OneDrive sync, and advertising ID</li>
        <li>Use SimpleWall or advanced Windows Firewall rules</li>
        <li>Enable Controlled Folder Access</li>
        <li>Consider running Windows in a VM for high-risk tasks</li>
      </ul>
    </BlogPostLayout>
  );
}
