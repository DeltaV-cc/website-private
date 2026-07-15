type AsciiMistProps = { compact?: boolean };

export default function AsciiMist({ compact = false }: AsciiMistProps) {
  return (
    <div className={`ascii-mist ${compact ? 'ascii-mist-compact' : ''}`} aria-hidden="true">
      <div className="ascii-mist-label">ΔV / ORGANIC SYSTEMS</div>
      <pre>{`        .        .        .
       /|\      /|\      /|\
      / | \    / | \    / | \
  .--'  |  '--'  |  '--'  |  '--.
 /      |       |       |       \
|   .---+---.---+---.---+---.   |
 \ /    |   \   |   \   |   \ /
  '     |    '  |    '  |    '
    \   |   /   |   /   |   /
     \__|__/____|__/____|__/
       Δ       V       Δ       V`}</pre>
      <span className="ascii-mist-orbit orbit-one" />
      <span className="ascii-mist-orbit orbit-two" />
    </div>
  );
}
