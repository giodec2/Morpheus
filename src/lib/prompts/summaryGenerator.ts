export function buildSummaryPrompt(chapterText: string, targetWordCount: number): string {
  return `You are a literary editor. Summarize the following chapter for a writer's continuity reference.

Rules:
1. Reduce to approximately 5% of the original word count (target: ~${targetWordCount} words).
2. Schematize key character interactions (who did what to whom, and why it matters).
3. Preserve the FINAL SENTENCE verbatim — it bridges to the next chapter.
4. Note any major revelations, decisions, or status changes.
5. Flag anything that seems like setup for future plot points.
6. Use concise, reference-style language. This is a memory aid, not a review.

Chapter text:
---
${chapterText}
---

Output ONLY the summary. No preamble, no markdown formatting, no "Summary:" label. Just the raw summary text.`;
}
