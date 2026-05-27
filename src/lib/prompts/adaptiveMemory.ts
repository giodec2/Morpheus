export function buildAdaptiveSummaryPrompt(
  chapterText: string,
  targetWordCount: number,
  existingProfile?: string
): string {
  const profileSection = existingProfile
    ? `CURRENT AUTHOR STYLE PROFILE:\n---\n${existingProfile}\n---\n\nYour task is to UPDATE this profile based on the new chapter. Preserve accurate observations, refine or correct based on new evidence, add new insights, and remove observations that no longer seem representative.`
    : `Your task is to CREATE an initial author style profile based on this chapter.`;

  return `You are a literary analyst and editor. You have two jobs:
1. Summarize the chapter for continuity reference.
2. ${existingProfile ? 'Update' : 'Create'} the author's style profile.

${profileSection}

The style profile should be 200-400 words and analyze:
- Sentence rhythm (short/punchy vs long/flowing, fragment usage)
- Vocabulary register (formal, colloquial, poetic, archaic, technical)
- Dialogue style (realistic, stylized, terse, lyrical, tagged vs beat-heavy)
- Tone and atmosphere (dark, whimsical, gritty, romantic, detached)
- Pacing habits (slow burn, rapid cuts, introspective pauses)
- Thematic preoccupations (what subjects recur)
- Perspective quirks (deep interiority, distant, unreliable, sensory-heavy)

CHAPTER TEXT:
---
${chapterText}
---

OUTPUT FORMAT: Return ONLY a valid JSON object with no markdown formatting, no code fences, and no extra text. The JSON must have exactly these two fields:
- "summary": A concise continuity summary (~${targetWordCount} words), reference-style, schematizing key interactions, preserving the final sentence, noting revelations and setup.
- "style_profile": The ${existingProfile ? 'updated' : 'new'} 200-400 word author style profile.

Example:
{"summary":"The protagonist...","style_profile":"The author favors..."}`;
}

export function buildStyleProfileInjection(profileContent: string): string {
  return `AUTHOR STYLE PROFILE (Echo Memory):\n---\n${profileContent}\n---\n\nWhen responding, align your suggestions with this author's distinctive voice, tone, and stylistic habits. Do not imitate the profile text directly — instead, internalize the patterns and apply them naturally.`;
}

/**
 * Robustly parse the JSON response from the adaptive summary call.
 * Handles markdown code fences, extra whitespace, and malformed JSON gracefully.
 */
export function parseAdaptiveResponse(raw: string): { summary: string; styleProfile: string } | null {
  if (!raw || !raw.trim()) return null;

  // Strip markdown code fences
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  // Try direct JSON parse
  try {
    const parsed = JSON.parse(cleaned);
    if (typeof parsed.summary === 'string' && typeof parsed.style_profile === 'string') {
      return { summary: parsed.summary.trim(), styleProfile: parsed.style_profile.trim() };
    }
  } catch {
    // fall through
  }

  // Try to extract the first JSON object
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (typeof parsed.summary === 'string' && typeof parsed.style_profile === 'string') {
        return { summary: parsed.summary.trim(), styleProfile: parsed.style_profile.trim() };
      }
    } catch {
      // fall through
    }
  }

  return null;
}
