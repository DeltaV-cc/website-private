export default function WindowsHardeningPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-[-1px]">Delta V</a>
          <a href="/opsec" className="text-sm hover:text-[#00f0ff]">← Back to OpSec</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 pt-12 pb-20">
        <div className="text-[#00f0ff] text-xs tracking-[3px] mb-2">OPSEC • WINDOWS</div>
        <h1 className="text-4xl font-semibold tracking-[-2px] mb-8">Windows Hardening Guide</h1>

        <div className="prose prose-invert max-w-none text-[#ddd]">
          <p className="text-lg text-[#aaa]">Based on Opsek/OSs-security • Telemetry reduction + endpoint security.</p>

          <h2>1. Factory Reset</h2>
          <ul>
            <li>Clean Windows installation from official ISO</li>
            <li>Enable BitLocker</li>
            <li>Prefer local account over Microsoft account</li>
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

          <p className="text-sm text-[#666] mt-12">Source: https://github.com/Opsek/OSs-security</p>
        </div>
      </div>
    </div>
  );
}
