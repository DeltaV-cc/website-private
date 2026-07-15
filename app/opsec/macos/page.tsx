import BlogPostLayout from '@/components/BlogPostLayout';
import { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

export default function MacosHardeningPage() {
  return (
    <BlogPostLayout
      title="macOS Hardening Guide"
      date="Updated 2026"
      category="OpSec"
      type="Guide"
      backHref="/opsec/"
      backLabel="All OpSec guides"
      excerpt="Privacy-first macOS hardening with MDM profiles — FileVault, telemetry control, and outbound firewalling for sovereignty-focused setups."
    >
      <ArchitectureFlow
        title="macOS baseline path"
        accent="amber"
        steps={[
          { label: 'Erase + reinstall', detail: 'Recovery Mode' },
          { label: 'FileVault', detail: 'Full-disk encrypt' },
          { label: 'MDM / privacy', detail: 'Telemetry down' },
          { label: 'Outbound FW', detail: 'Little Snitch-class' },
        ]}
      />

      <h2>1. Factory Reset</h2>
      <ul>
        <li>Erase the Mac and reinstall macOS via Recovery Mode.</li>
        <li>Enable FileVault during setup.</li>
        <li>Create a new admin account with a strong passphrase.</li>
      </ul>

      <h2>2. Core Hardening</h2>
      <p>Run the recommended scripts and apply MDM profiles for:</p>
      <ul>
        <li>Disabling unnecessary services</li>
        <li>Enforcing strong passwords</li>
        <li>Controlling iCloud and telemetry</li>
      </ul>

      <h2>3. Key Privacy Steps</h2>
      <ul>
        <li>Disable Siri, Spotlight suggestions, and analytics</li>
        <li>Use Little Snitch or Lulu for outbound control</li>
        <li>Enable Gatekeeper + XProtect</li>
        <li>Require password after sleep</li>
      </ul>
    </BlogPostLayout>
  );
}
