import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

let markedInstance: InstanceType<typeof import('marked').Marked> | null = null;

async function getMarked() {
  if (!markedInstance) {
    const { Marked } = await import('marked');
    markedInstance = new Marked({ breaks: true, gfm: true });
  }
  return markedInstance;
}

function fallbackHtml(text: string): string {
  if (!text) return '';
  return DOMPurify.sanitize(text.replace(/\n/g, '<br>'));
}

export default function MarkdownContent({ text }: { text: string }) {
  const [html, setHtml] = useState<string>(() => fallbackHtml(text));

  useEffect(() => {
    let cancelled = false;
    getMarked().then((marked) => {
      if (cancelled) return;
      const raw = marked.parse(text) as string;
      setHtml(DOMPurify.sanitize(raw));
    });
    return () => { cancelled = true; };
  }, [text]);

  return <div className="chat-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}
