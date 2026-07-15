import BlogPostLayout from '@/components/BlogPostLayout';

export default function FirstPrinciplesArticle() {
  return (
    <BlogPostLayout
      title="First Principles for Sovereign AI Agents"
      date="June 10, 2026"
      category="AI"
      type="Thought"
      readingTime="3 min read"
      excerpt="We build agents the same way we build everything else at Delta V: from first principles, with OpSec as the foundation."
    >
      <h2>Core Rules</h2>

      <h3>1. Local-first by default</h3>
      <p>No agent should require cloud connectivity to function.</p>

      <h3>2. Keys never leave the machine</h3>
      <p>Private keys, API tokens, and memory stay on the user&apos;s hardware.</p>

      <h3>3. Minimal attack surface</h3>
      <p>Every dependency is a liability. We ruthlessly prune.</p>

      <h3>4. Human in the loop for high-stakes actions</h3>
      <p>Agents propose. Humans decide.</p>

      <hr />

      <p><strong>This is not negotiable.</strong></p>
    </BlogPostLayout>
  );
}
