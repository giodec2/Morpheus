/**
 * Extract plain text from a TipTap JSON content object.
 * @param content - TipTap JSON document
 * @param options - { addSpaces: boolean } — whether to add spaces between text nodes
 * @returns Extracted plain text
 */
export function extractTextFromContent(
  content: Record<string, unknown>,
  options: { addSpaces?: boolean } = {}
): string {
  const { addSpaces = false } = options;
  let text = '';

  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;
    if (n.type === 'text' && typeof n.text === 'string') {
      text += n.text;
      if (addSpaces) text += ' ';
    }
    if (Array.isArray(n.content)) n.content.forEach(traverse);
  }

  traverse(content);
  return addSpaces ? text.trim() : text;
}

/**
 * Build a minimal TipTap JSON document from plain text.
 * Splits on newlines to create paragraphs.
 */
export function buildTiptapFromText(text: string): Record<string, unknown> {
  const paragraphs = text.split('\n').map((line) => ({
    type: 'paragraph',
    content: line.trim() ? [{ type: 'text', text: line }] : [],
  }));
  return { type: 'doc', content: paragraphs };
}
