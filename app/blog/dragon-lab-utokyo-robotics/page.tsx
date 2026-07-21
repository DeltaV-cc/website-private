'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function DragonLabUTokyo() {
  return (
    <BlogPostLayout
      title="Shape-Shifting Robots: Inside UTokyo's DRAGON Lab"
      date="July 18, 2026"
      category="Hardware"
      type="Deep Dive"
      readingTime="5 min read"
      excerpt="UTokyo's DRAGON Lab builds articulated aerial robots that change shape mid-flight — DRAGON, SPIDAR, and SERPENT redefine what robots can do by merging flight, walking, and soft deformation into single platforms."
      sourceLabel="DRAGON Lab (UTokyo)"
      sourceUrl="https://www.dragon.t.u-tokyo.ac.jp/"
    >
      <p>
        The University of Tokyo's Department of Mechanical Engineering quietly houses one of the most ambitious robotics labs on the planet. 
        The <strong className="text-[#ededed]">DRAGON Lab</strong>, led by Dr. Moju Zhao, is redefining what robots can do — 
        not by building faster drones or stronger quadrupeds, but by asking: <em>what if the robot could change its shape mid-flight?</em>
      </p>

      <h2>Three Generations of Shape-Shifting</h2>

      <h3>DRAGON — The Serpent That Flies</h3>
      <p>
        The lab's namesake, <strong className="text-[#ededed]">DRAGON</strong> (Dual-rotor embedded multilink Robot with the Ability of multi-deGree-of-freedom aerial transformatiON), 
        is an articulated chain of links, each with a pair of vectorable rotors. Think of it as a flying snake that can:
      </p>
      <ul>
        <li><strong className="text-[#ededed]">Pass through small openings</strong> by contorting its body in 3D</li>
        <li><strong className="text-[#ededed]">Wrap around objects</strong> to grasp them mid-air</li>
        <li><strong className="text-[#ededed]">Reconfigure</strong> from a straight line to a U-shape to a ring — all while hovering</li>
        <li><strong className="text-[#ededed]">Turn industrial valves</strong> while airborne — a task that took specialized ground robots until DRAGON demonstrated it</li>
      </ul>
      <p>
        The key insight is <strong className="text-[#ededed]">vectorable thrust control</strong>: each link's rotor pair can tilt independently, 
        giving the entire articulated chain full 6-DoF per link. IEEE Spectrum called it "a flying manipulator" when it first appeared.
      </p>

      <h3>SPIDAR — The Quadruped That Flies</h3>
      <p>
        If DRAGON is a snake, <strong className="text-[#ededed]">SPIDAR</strong> (Spherically Vectorable and Distributed Rotors Assisted Robot) is a spider. 
        Four legs, each with a spherical rotor at the tip. It walks. It flies. It does both in the same mission.
      </p>
      <p>
        The breakthrough: <strong className="text-[#ededed]">spherically vectorable thrust</strong> on each limb. Unlike traditional quadrotors 
        where all rotors point up, SPIDAR's legs can angle any rotor in any direction — including backward and sideways during ground locomotion.
      </p>
      <ul>
        <li>Walk with rotors off for silent ground approach</li>
        <li>Fire rotors for aerial transition without dedicated flight hardware</li>
        <li>Use thrust vectoring to squeeze through gaps too narrow for its wingspan</li>
        <li>Grasp objects aerially — the 2025 ICRA paper demonstrated stable aerial manipulation</li>
      </ul>
      <blockquote>
        "This is not a drone with legs. This is a quadruped that learned to fly."
        <cite>— New Atlas, May 2025</cite>
      </blockquote>

      <h3>SERPENT — Soft Bodies in the Air</h3>
      <p>
        The most recent direction: <strong className="text-[#ededed]">soft aerial robotics</strong>. 
        SERPENT incorporates flexible passive joints that allow the airframe itself to deform during flight. 
        Presented at ICRA 2025, this isn't just about resilience — it's about absorbing collisions, 
        squeezing through deformable openings, and adapting to wind gusts through natural damping.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { value: '3', label: 'ICRA Best Paper nominations', color: 'text-[#00f0ff]' },
          { value: '3', label: 'Robot generations', color: 'text-[#a855f7]' },
          { value: '6-DoF', label: 'Per link (DRAGON)', color: 'text-[#f59e0b]' },
          { value: '4 labs', label: 'Joint UTokyo efforts', color: 'text-[#C2410C]' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-[#777]">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2>Beyond the Air: Key Research Threads</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2a2a2a] text-[#777] text-xs uppercase">
              <th className="py-3 pr-4">Thread</th>
              <th className="py-3">What It Means</th>
            </tr>
          </thead>
          <tbody className="text-[#aaa]">
            <tr className="border-b border-[#1a1a1a]">
              <td className="py-2.5 pr-4 font-medium text-[#ededed]">Hierarchical trajectory planning</td>
              <td className="py-2.5">Floating-base multi-link robots navigating confined spaces — 2026 IEEE TASE</td>
            </tr>
            <tr className="border-b border-[#1a1a1a]">
              <td className="py-2.5 pr-4 font-medium text-[#ededed]">Teleoperation with full DoF mapping</td>
              <td className="py-2.5">Operator controls base pose + all joint angles simultaneously — 2026 SII</td>
            </tr>
            <tr className="border-b border-[#1a1a1a]">
              <td className="py-2.5 pr-4 font-medium text-[#ededed]">McKibben pneumatic actuators</td>
              <td className="py-2.5">Deformable quadrotor that physically changes shape using air pressure — 2026 SII</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-[#ededed]">Multimodal locomotion</td>
              <td className="py-2.5">Single robot walks, crawls, flies, and climbs using the same actuators</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The Hardware Stack</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2a2a2a] text-[#777] text-xs uppercase">
              <th className="py-3 pr-4">Component</th>
              <th className="py-3">Approach</th>
            </tr>
          </thead>
          <tbody className="text-[#aaa]">
            <tr className="border-b border-[#1a1a1a]"><td className="py-2.5 pr-4 font-medium text-[#ededed]">Actuation</td><td className="py-2.5">Brushless DC rotors with custom gimbal mounts for vectorable thrust</td></tr>
            <tr className="border-b border-[#1a1a1a]"><td className="py-2.5 pr-4 font-medium text-[#ededed]">Structure</td><td className="py-2.5">3D-printed carbon fiber links with integrated motor housings</td></tr>
            <tr className="border-b border-[#1a1a1a]"><td className="py-2.5 pr-4 font-medium text-[#ededed]">Sensing</td><td className="py-2.5">Onboard IMU + joint encoders + external motion capture for research</td></tr>
            <tr className="border-b border-[#1a1a1a]"><td className="py-2.5 pr-4 font-medium text-[#ededed]">Control</td><td className="py-2.5">Real-time model-predictive control (MPC) running on onboard Jetson/STM32</td></tr>
            <tr className="border-b border-[#1a1a1a]"><td className="py-2.5 pr-4 font-medium text-[#ededed]">Power</td><td className="py-2.5">Tethered in early prototypes; moving toward onboard LiPo for untethered</td></tr>
            <tr><td className="py-2.5 pr-4 font-medium text-[#ededed]">Simulation</td><td className="py-2.5">Custom MuJoCo + ROS 2 stacks for hardware-in-the-loop testing</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why This Matters</h2>
      <p>The DRAGON Lab is systematically dismantling the boundary between aerial and ground robotics. Their design philosophy — <em>"the airframe is the manipulator"</em> — eliminates the need for dedicated arms, grippers, or separate flight/ground systems.</p>

      <ul>
        <li><strong className="text-[#ededed]">Industrial inspection:</strong> A snake robot that flies into a pipe, crawls along the interior, and uses its body to seal leaks</li>
        <li><strong className="text-[#ededed]">Disaster response:</strong> SPIDAR walks through rubble on silent legs, then takes off vertically to survey from above</li>
        <li><strong className="text-[#ededed]">Space robotics:</strong> Articulated aerial robots for ISS interior navigation, passing through hatches of varying sizes</li>
        <li><strong className="text-[#ededed]">Manufacturing:</strong> SERPENT-class soft aerial manipulators that reach into irregular cavities without damaging surroundings</li>
      </ul>

      <h2>What's Next</h2>
      <p>The lab's publication trajectory suggests three imminent directions:</p>
      <ol>
        <li><strong className="text-[#ededed]">Untethered autonomy</strong> — moving from motion capture to onboard SLAM for field deployment</li>
        <li><strong className="text-[#ededed]">Multi-robot coordination</strong> — swarms of articulated fliers that physically connect mid-air</li>
        <li><strong className="text-[#ededed]">Learning-based control</strong> — reinforcement learning for deformable body navigation through unknown environments</li>
      </ol>
      <p>
        Dr. Zhao's group publishes aggressively (ICRA, IROS, RAL, TASE, SII) and releases open-access preprints. 
        The hardware designs are documented in sufficient detail for reproduction — this is one of the few places 
        where mechanical engineering, control theory, and aerial robotics converge into machines that genuinely shouldn't exist.
      </p>
    </BlogPostLayout>
  );
}
