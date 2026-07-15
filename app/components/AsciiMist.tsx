type AsciiMistProps = { compact?: boolean };

export default function AsciiMist({ compact = false }: AsciiMistProps) {
  return (
    <div className={`ascii-mist ${compact ? 'ascii-mist-compact' : ''}`} aria-hidden="true">
      <div className="ascii-mist-label">SIGNAL CANOPY / DV-01</div>
      <pre>{`        ·        ╱╲       ·        ╱╲
   ╲    ╱╲   ╱╲  ╲   ╱╲   ╲    ╱╲
    ╲  ╱  ╲ ╱  ╲  ╲ ╱  ╲   ╲  ╱  ╲
 ····╲╱····╲╱····╲╱····╲····╲╱····
       ┆      ┆      ┆      ┆
  ─────┼──────┼──────┼──────┼─────
       ┆  ·   ┆  ·   ┆   ·  ┆
     ╱─┴─╲  ╱─┴─╲  ╱─┴─╲  ╱─┴─╲
   ╱      ╲╱      ╲╱      ╲╱      ╲
 ···  ΔV / LOCAL-FIRST / ACCELERATION  ···`}</pre>
      <span className="ascii-mist-orbit orbit-one" />
      <span className="ascii-mist-orbit orbit-two" />
    </div>
  );
}
