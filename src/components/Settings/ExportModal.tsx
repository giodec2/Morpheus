import { useState } from 'react';
import { X, FileText, BookOpen } from 'lucide-react';
import Modal from '@/components/common/Modal';
import { toast } from '@/components/common/Toast';
import { useBookStore } from '@/stores/bookStore';
import { getChaptersByBook } from '@/db/chapters';
import { getCharactersByBook } from '@/db/characters';
import { getLoreBibleByBook } from '@/db/loreBibles';
import { getChatSessionsByBook, getAllChatMessagesByBook } from '@/db/chatHistory';
import { getStyleProfile } from '@/db/styleProfiles';


interface ExportModalProps {
  onClose: () => void;
}

export default function ExportModal({ onClose }: ExportModalProps) {
  const { activeBook } = useBookStore();
  const [exporting, setExporting] = useState(false);

  if (!activeBook) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">
          <p className="text-gray-600 dark:text-gray-400">No book selected.</p>
          <button onClick={onClose} className="btn-primary mt-4">Close</button>
        </div>
      </div>
    );
  }

  const exportHTML = async () => {
    setExporting(true);
    try {
      const chapters = await getChaptersByBook(activeBook.id);

      let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${escapeHtml(activeBook.title)}</title>
<style>
body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
h1 { text-align: center; margin-bottom: 40px; }
h2 { margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
.chapter { margin-bottom: 40px; }
p { margin: 1em 0; }
</style>
</head>
<body>
<h1>${escapeHtml(activeBook.title)}</h1>
`;

      for (const chapter of chapters.sort((a, b) => a.order - b.order)) {
        html += `<div class="chapter"><h2>${escapeHtml(chapter.title)}</h2>\n`;
        html += tiptapToHtml(chapter.content);
        html += `</div>\n`;
      }

      html += `</body></html>`;

      downloadFile(html, `${sanitizeFilename(activeBook.title)}.html`, 'text/html');
      toast('HTML exported successfully', 'success');
    } catch (err) {
      console.error(err);
      toast('Failed to export HTML', 'error');
    } finally {
      setExporting(false);
    }
  };

  const exportJSON = async () => {
    setExporting(true);
    try {
      const [chapters, characters, lore, sessions, messages, styleProfile] = await Promise.all([
        getChaptersByBook(activeBook.id),
        getCharactersByBook(activeBook.id),
        getLoreBibleByBook(activeBook.id),
        getChatSessionsByBook(activeBook.id),
        getAllChatMessagesByBook(activeBook.id),
        getStyleProfile(activeBook.id),
      ]);

      const data = {
        version: 1,
        book: activeBook,
        chapters: chapters.sort((a, b) => a.order - b.order),
        characters,
        loreBible: lore,
        chatSessions: sessions,
        chatHistory: messages,
        styleProfile: styleProfile || null,
        exportedAt: Date.now(),
      };

      downloadFile(JSON.stringify(data, null, 2), `${sanitizeFilename(activeBook.title)}.json`, 'application/json');
      toast('JSON backup exported', 'success');
    } catch (err) {
      console.error(err);
      toast('Failed to export JSON', 'error');
    } finally {
      setExporting(false);
    }
  };

  const exportDOCX = async () => {
    setExporting(true);
    try {
      const chapters = await getChaptersByBook(activeBook.id);
      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        HeadingLevel,
        AlignmentType,
        UnderlineType,
        LevelFormat,
        convertInchesToTwip,
      } = await import('docx');

      const children: InstanceType<typeof Paragraph>[] = [];

      children.push(
        new Paragraph({
          text: activeBook.title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );

      for (const chapter of chapters.sort((a, b) => a.order - b.order)) {
        children.push(
          new Paragraph({
            text: chapter.title,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        children.push(...buildDocxParagraphs(chapter.content, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType));
      }

      const doc = new Document({
        numbering: {
          config: [
            {
              reference: 'ordered',
              levels: [
                {
                  level: 0,
                  format: LevelFormat.DECIMAL,
                  text: '%1.',
                  alignment: AlignmentType.LEFT,
                  style: {
                    paragraph: {
                      indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
                    },
                  },
                },
              ],
            },
            {
              reference: 'bullet',
              levels: [
                {
                  level: 0,
                  format: LevelFormat.BULLET,
                  text: '\u2022',
                  alignment: AlignmentType.LEFT,
                  style: {
                    paragraph: {
                      indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
                    },
                  },
                },
              ],
            },
          ],
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: convertInchesToTwip(1),
                  right: convertInchesToTwip(1),
                  bottom: convertInchesToTwip(1),
                  left: convertInchesToTwip(1),
                },
              },
            },
            children: children as any,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      downloadBlob(blob, `${sanitizeFilename(activeBook.title)}.docx`);
      toast('DOCX exported successfully', 'success');
    } catch (err) {
      console.error(err);
      toast('Failed to export DOCX', 'error');
    } finally {
      setExporting(false);
    }
  };

  const exportPDF = async () => {
    setExporting(true);
    let container: HTMLDivElement | null = null;
    try {
      const chapters = await getChaptersByBook(activeBook.id);
      const { toCanvas } = await import('html-to-image');

      let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: Georgia, serif; width: 794px; padding: 60px; line-height: 1.6; color: #000; background: #fff; box-sizing: border-box; }
h1 { text-align: center; font-size: 32px; margin-bottom: 60px; font-weight: bold; }
h2 { font-size: 22px; margin-top: 40px; margin-bottom: 20px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 8px; }
p { margin: 1em 0; font-size: 14px; }
ul, ol { margin: 1em 0; padding-left: 30px; }
li { font-size: 14px; margin: 0.3em 0; }
strong { font-weight: bold; }
em { font-style: italic; }
u { text-decoration: underline; }
mark { background: #ff0; }
</style>
</head>
<body>
<h1>${escapeHtml(activeBook.title)}</h1>
`;

      for (const chapter of chapters.sort((a, b) => a.order - b.order)) {
        html += `<h2>${escapeHtml(chapter.title)}</h2>\n`;
        html += tiptapToHtml(chapter.content);
      }
      html += '</body></html>';

      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px';
      container.innerHTML = html;
      document.body.appendChild(container);

      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 300));

      const fullCanvas = await toCanvas(container, { pixelRatio: 2 });
      if (container.parentNode) document.body.removeChild(container);
      container = null;

      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      const scale = contentWidth / fullCanvas.width;
      const scaledHeight = fullCanvas.height * scale;
      const totalPages = Math.max(1, Math.ceil(scaledHeight / contentHeight));

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        const sliceCanvas = document.createElement('canvas');
        const sourceY = (i * contentHeight) / scale;
        const sourceH = Math.min(fullCanvas.height - sourceY, contentHeight / scale);

        sliceCanvas.width = fullCanvas.width;
        sliceCanvas.height = sourceH;

        const ctx = sliceCanvas.getContext('2d');
        if (!ctx) continue;

        ctx.drawImage(
          fullCanvas,
          0,
          sourceY,
          fullCanvas.width,
          sourceH,
          0,
          0,
          fullCanvas.width,
          sourceH
        );

        const dataUrl = sliceCanvas.toDataURL('image/png');
        pdf.addImage(dataUrl, 'PNG', margin, margin, contentWidth, sourceH * scale);
      }

      pdf.save(`${sanitizeFilename(activeBook.title)}.pdf`);
      toast('PDF exported successfully', 'success');
    } catch (err) {
      console.error(err);
      toast('Failed to export PDF', 'error');
    } finally {
      setExporting(false);
      if (container && container.parentNode) {
        document.body.removeChild(container);
      }
    }
  };

  return (
    <Modal onClose={onClose} className="max-w-md p-6" ariaLabel="Export book">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Book</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={exportHTML}
            disabled={exporting}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <FileText className="w-6 h-6 text-primary-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">HTML</div>
              <div className="text-xs text-gray-500">Single file with all chapters</div>
            </div>
          </button>

          <button
            onClick={exportDOCX}
            disabled={exporting}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">DOCX</div>
              <div className="text-xs text-gray-500">Microsoft Word document</div>
            </div>
          </button>

          <button
            onClick={exportPDF}
            disabled={exporting}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <FileText className="w-6 h-6 text-red-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">PDF</div>
              <div className="text-xs text-gray-500">Print-ready document</div>
            </div>
          </button>

          <button
            onClick={exportJSON}
            disabled={exporting}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">JSON Backup</div>
              <div className="text-xs text-gray-500">Full book data for backup/restore</div>
            </div>
          </button>
        </div>

        {exporting && (
          <p className="text-sm text-gray-500 text-center mt-4">Preparing export...</p>
        )}
      </div>
    </Modal>
  );
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function tiptapToHtml(content: Record<string, unknown>): string {
  let html = '';

  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;

    if (n.type === 'doc') {
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      return;
    }

    if (n.type === 'paragraph') {
      const align = (n.attrs as Record<string, string>)?.textAlign;
      const style = align ? ` style="text-align: ${align};"` : '';
      html += `<p${style}>`;
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      html += '</p>\n';
      return;
    }

    if (n.type === 'heading') {
      const level = (n.attrs as Record<string, number>)?.level || 1;
      html += `<h${level}>`;
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      html += `</h${level}>\n`;
      return;
    }

    if (n.type === 'text') {
      let text = escapeHtml(String(n.text));
      const marks = n.marks as Array<Record<string, unknown>> | undefined;
      if (marks) {
        marks.forEach((mark) => {
          if (mark.type === 'bold') text = `<strong>${text}</strong>`;
          if (mark.type === 'italic') text = `<em>${text}</em>`;
          if (mark.type === 'underline') text = `<u>${text}</u>`;
          if (mark.type === 'highlight') text = `<mark>${text}</mark>`;
          if (mark.type === 'strike') text = `<s>${text}</s>`;
          if (mark.type === 'textStyle') {
            const attrs = mark.attrs as Record<string, string> | undefined;
            const styles: string[] = [];
            if (attrs?.color) styles.push(`color: ${attrs.color}`);
            if (attrs?.fontFamily) styles.push(`font-family: ${attrs.fontFamily}`);
            if (attrs?.fontSize) styles.push(`font-size: ${attrs.fontSize}`);
            if (styles.length) text = `<span style="${styles.join('; ')};">${text}</span>`;
          }
        });
      }
      html += text;
      return;
    }

    if (n.type === 'hardBreak') {
      html += '<br>';
      return;
    }

    if (n.type === 'bulletList') {
      html += '<ul>';
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      html += '</ul>\n';
      return;
    }

    if (n.type === 'orderedList') {
      html += '<ol>';
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      html += '</ol>\n';
      return;
    }

    if (n.type === 'listItem') {
      html += '<li>';
      if (Array.isArray(n.content)) n.content.forEach(traverse);
      html += '</li>\n';
      return;
    }

    if (Array.isArray(n.content)) {
      n.content.forEach(traverse);
    }
  }

  traverse(content);
  return html;
}

function buildDocxParagraphs(
  content: Record<string, unknown>,
  Paragraph: any,
  TextRun: any,
  HeadingLevel: any,
  AlignmentType: any,
  UnderlineType: any
): any[] {
  const paragraphs: any[] = [];

  function traverse(node: unknown, listType?: 'bullet' | 'ordered') {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;

    if (n.type === 'doc') {
      if (Array.isArray(n.content)) n.content.forEach((child) => traverse(child));
      return;
    }

    if (n.type === 'paragraph') {
      const align = (n.attrs as Record<string, string>)?.textAlign;
      const alignment =
        align === 'center'
          ? AlignmentType.CENTER
          : align === 'right'
          ? AlignmentType.RIGHT
          : align === 'justify'
          ? AlignmentType.JUSTIFIED
          : AlignmentType.LEFT;

      const runs = extractTextRuns(n.content, TextRun, UnderlineType);
      paragraphs.push(
        new Paragraph({
          children: runs,
          alignment,
          spacing: { after: 200 },
          bullet: listType === 'bullet' ? { level: 0 } : undefined,
          numbering: listType === 'ordered' ? { reference: 'ordered', level: 0 } : undefined,
        })
      );
      return;
    }

    if (n.type === 'heading') {
      const level = (n.attrs as Record<string, number>)?.level || 1;
      const runs = extractTextRuns(n.content, TextRun, UnderlineType);
      const heading =
        level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3;
      paragraphs.push(
        new Paragraph({
          children: runs,
          heading,
          spacing: { before: 300, after: 150 },
        })
      );
      return;
    }

    if (n.type === 'bulletList') {
      if (Array.isArray(n.content)) n.content.forEach((child) => traverse(child, 'bullet'));
      return;
    }

    if (n.type === 'orderedList') {
      if (Array.isArray(n.content)) n.content.forEach((child) => traverse(child, 'ordered'));
      return;
    }

    if (n.type === 'listItem') {
      if (Array.isArray(n.content)) n.content.forEach((child) => traverse(child, listType));
      return;
    }

    if (Array.isArray(n.content)) {
      n.content.forEach((child) => traverse(child, listType));
    }
  }

  traverse(content);
  return paragraphs;
}

function extractTextRuns(content: unknown, TextRun: any, UnderlineType: any): any[] {
  if (!Array.isArray(content)) return [];
  const runs: any[] = [];

  for (const item of content) {
    if (typeof item !== 'object' || item === null) continue;
    const node = item as Record<string, unknown>;

    if (node.type === 'text') {
      const text = String(node.text || '');
      const marks = (node.marks || []) as Array<Record<string, unknown>>;
      const props: Record<string, unknown> = { text };

      for (const mark of marks) {
        if (mark.type === 'bold') props.bold = true;
        if (mark.type === 'italic') props.italics = true;
        if (mark.type === 'underline') props.underline = { type: UnderlineType.SINGLE };
        if (mark.type === 'highlight') props.highlight = 'yellow';
        if (mark.type === 'strike') props.strike = true;
        if (mark.type === 'textStyle') {
          const attrs = (mark.attrs as Record<string, string>) || {};
          if (attrs.color) props.color = attrs.color;
          if (attrs.fontFamily) props.font = attrs.fontFamily;
        }
      }

      runs.push(new TextRun(props));
    } else if (node.type === 'hardBreak') {
      runs.push(new TextRun({ break: 1 }));
    }
  }

  return runs;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  downloadBlob(new Blob([content], { type: mimeType }), filename);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
