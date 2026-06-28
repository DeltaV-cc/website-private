'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function IBMSubNm() {
  return (
    <BlogPostLayout
      title="0.7 Nanometers: IBM Breaks the Physical Limits of Chip Scaling"
      date="June 25, 2026"
      category="Hardware"
      type="Deep Dive"
      readingTime="3 min read"
      excerpt="IBM just unveiled the world's first sub-1nm chip — 0.7nm with a revolutionary 3D nanostack architecture. ~100 billion transistors on a fingernail. 50% faster or 70% more efficient. Production within 5 years."
      sourceLabel="IBM News (@IBMNews)"
      sourceUrl="https://x.com/IBMNews/status/2070100944017092734"
    >
      <p>
        The nanometer era is over. On June 25, IBM announced the <strong className="text-[#ededed]">world&apos;s first sub-1 nanometer chip</strong> — 
        a 0.7nm (7 angstrom) node with a completely new transistor architecture called nanostack. 
        The chip packs <strong className="text-[#ededed]">nearly 100 billion transistors</strong> onto a die the size of a fingernail, 
        nearly double the density of IBM&apos;s 2nm chip from 2021.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { value: '0.7nm', label: 'Node Size', color: 'text-[#00f0ff]' },
          { value: '~100B', label: 'Transistors', color: 'text-[#a855f7]' },
          { value: '+50%', label: 'Performance vs 2nm', color: 'text-[#f59e0b]' },
          { value: '-70%', label: 'Energy vs 2nm', color: 'text-[#C2410C]' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111] border border-[#222] rounded-2xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-[#666] mt-1 uppercase tracking-[1px]">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Nanostack — Building Chips in Three Dimensions</h2>

      <p>
        The key innovation is <strong className="text-[#ededed]">nanostack</strong> — IBM&apos;s first 3D nanosheet-based transistor 
        architecture. Instead of laying transistors flat on the silicon surface (the method used since the 
        1960s), nanostack <strong className="text-[#ededed]">vertically stacks and staggers transistors layer by layer</strong> 
        using wafer-to-wafer bonding. Each layer can use different materials optimized for its 
        specific function — switching, power delivery, signal — rather than compromising on a single 
        material stack for everything.
      </p>

      <p>
        Researchers at IBM&apos;s Albany, NY facility validated the design through CMOS integration 
        with ultra-thin dielectric bonding, functional inverter operation, and dual-channel engineering. 
        A companion paper at VLSI 2026 showed <strong className="text-[#ededed]">40% SRAM scaling</strong> using the same 
        architecture — important for AI workloads that depend on high-bandwidth memory access.
      </p>

      <div className="bg-[#0d0d0d] border-l-2 border-[#00f0ff] rounded-r-xl p-5 my-6 text-sm">
        <p className="text-[#aaa]">
          <strong className="text-[#00f0ff]">Why this matters:</strong> The industry has been predicting the end of Moore&apos;s Law for 
          decades. At sub-1nm, features approach the size of individual atoms — silicon atoms are 
          about 0.2nm apart. IBM&apos;s roadmap projects <strong className="text-[#ededed]">at least another decade of scaling</strong> 
          beyond this node using nanostack.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">The Production Path — 5 Years Out</h2>

      <p>
        IBM expects the earliest adoption of nanostack at the sub-1nm node with a 
        <strong className="text-[#ededed]"> path to production in as early as 5 years</strong>. Partners include ASML 
        (High NA EUV lithography — the only tool capable of printing features this small), 
        Lam Research, Tokyo Electron, and SCREEN Semiconductor Solutions. The Albany facility 
        will soon house a High NA EUV tool from ASML, essential for continued logic scaling.
      </p>

      <p>
        IBM also announced <strong className="text-[#ededed]">Anderon</strong> — the world&apos;s first pure-play quantum foundry, 
        a standalone company drawing on IBM&apos;s quantum computing and semiconductor expertise. 
        The message is clear: IBM is positioning for the post-silicon era on two fronts — 
        angstrom-scale classical chips and quantum wafers.
      </p>

      <p className="text-[#666] text-sm pt-8 border-t border-[#222]">
        Sources: IBM Research, VLSI 2026 conference proceedings. Image: IBM chip under 
        scanning electron microscope.
      </p>
    </BlogPostLayout>
  );
}
