import Link from 'next/link';
export default function MacosHardeningPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 pt-12 pb-20">
      <Link href="/opsec/" className="text-sm text-[#666] hover:text-[#00f0ff] inline-block mb-8">← Back to OpSec</Link>

      <div className="text-[#00f0ff] text-xs tracking-[3px] mb-2">OPSEC • MACOS</div>
        <h1 className="text-4xl font-semibold tracking-[-2px] mb-8">macOS Hardening Guide</h1>

        <div className="prose prose-invert max-w-none text-[#ededed]">
          <p className="text-lg text-[#aaa]">Based on Opsek/OSs-security • Privacy-first hardening with MDM profiles.</p>

          <h2>1. Factory Reset</h2>
          <ul>
            <li>Erase the Mac and reinstall macOS via Recovery Mode</li>
            <li>Enable FileVault during setup</li>
            <li>Create a new admin account with strong passphrase</li>
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

          <p className="text-sm text-[#666] mt-12">Source: https://github.com/Opsek/OSs-security</p>
        </div>
    </div>
  );
}
