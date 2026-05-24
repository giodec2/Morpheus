import { useState, useRef } from 'react';
import { X, Upload, FileText, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { toast } from '@/components/common/Toast';
import { createBook } from '@/db/books';
import { createChapter, getChaptersByBook, updateChapter } from '@/db/chapters';
import { createCharacter } from '@/db/characters';
import { createLoreBible } from '@/db/loreBibles';
import { FontSize } from '@/lib/tiptapFontSize';
import type { Chapter, Character } from '@/types';

interface ImportModalProps {
  onClose: () => void;
  onImport: () => void;
}

const IMPORT_EXTENSIONS = ['.json', '.html', '.md', '.docx', '.txt'];

const tiptapExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  TextStyle,
  FontFamily,
  Color,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight,
  Underline,
  FontSize,
];

export default function ImportModal({ onClose, onImport }: ImportModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = async (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!IMPORT_EXTENSIONS.includes(ext)) {
      setResult({ success: false, message: `Unsupported file type: ${ext}. Supported: ${IMPORT_EXTENSIONS.join(', ')}` });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const text = await file.text();
      const baseName = file.name.replace(/\.[^.]+$/, '');

      if (ext === '.json') {
        await importJSON(text);
      } else if (ext === '.html') {
        await importHTML(baseName, text);
      } else if (ext === '.md') {
        await importMarkdown(baseName, text);
      } else if (ext === '.docx') {
        await importDOCX(baseName, file);
      } else if (ext === '.txt') {
        await importText(baseName, text);
      }

      onImport();
    } catch (err) {
      setResult({ success: false, message: `Import failed: ${(err as Error).message}` });
    } finally {
      setIsProcessing(false);
    }
  };

  const importJSON = async (jsonText: string) => {
    const data = JSON.parse(jsonText);

    // Validate minimal structure
    if (!data.book || !data.chapters) {
      throw new Error('Invalid JSON backup: missing book or chapters');
    }

    const book = await createBook(data.book.title || 'Imported Book');
    await createLoreBible(book.id);

    // Import chapters
    for (const ch of data.chapters as Chapter[]) {
      await createChapter(book.id, ch.title || 'Untitled', ch.order || 0);
    }

    // Import characters if present
    if (data.characters) {
      for (const char of data.characters as Character[]) {
        await createCharacter(book.id, char.name || 'Unnamed');
      }
    }

    setResult({ success: true, message: `Imported "${book.title}" with ${data.chapters.length} chapters` });
    toast('Book imported successfully', 'success');
  };

  const htmlToTiptap = (html: string): Record<string, unknown> => {
    try {
      return generateJSON(html, tiptapExtensions);
    } catch {
      // Fallback: wrap in paragraphs
      const paragraphs = html
        .split(/\n\n+/)
        .map((p) => ({
          type: 'paragraph',
          content: p.trim() ? [{ type: 'text', text: p.replace(/<[^>]+>/g, '') }] : [],
        }));
      return { type: 'doc', content: paragraphs };
    }
  };

  const importHTML = async (title: string, html: string) => {
    const book = await createBook(title);
    await createLoreBible(book.id);
    const content = htmlToTiptap(html);
    await createChapter(book.id, 'Chapter 1', 0);
    // Update the chapter with imported content
    const chapters = await getChaptersByBook(book.id);
    if (chapters[0]) {
      await updateChapter(chapters[0].id, { content });
    }
    setResult({ success: true, message: `Imported "${title}" from HTML` });
    toast('HTML imported successfully', 'success');
  };

  const importMarkdown = async (title: string, md: string) => {
    const { marked } = await import('marked');
    const html = await marked.parse(md);
    await importHTML(title, html as string);
  };

  const importDOCX = async (title: string, file: File) => {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    await importHTML(title, result.value);
  };

  const importText = async (title: string, text: string) => {
    const paragraphs = text
      .split(/\n\n+/)
      .map((line) => ({
        type: 'paragraph',
        content: line.trim() ? [{ type: 'text', text: line.trim() }] : [],
      }));
    const content = { type: 'doc', content: paragraphs };
    const book = await createBook(title);
    await createLoreBible(book.id);
    await createChapter(book.id, 'Chapter 1', 0);
    const chapters = await getChaptersByBook(book.id);
    if (chapters[0]) {
      await updateChapter(chapters[0].id, { content });
    }
    setResult({ success: true, message: `Imported "${title}" from text` });
    toast('Text imported successfully', 'success');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Import Book</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.html,.md,.docx,.txt"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Drop a file here or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supports JSON, HTML, Markdown, DOCX, TXT
          </p>
        </div>

        {isProcessing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            Processing file...
          </div>
        )}

        {result && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
            result.success
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <p className={`text-sm ${result.success ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
              {result.message}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            What gets imported
          </h3>
          <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary-500" />
              <span><strong>JSON</strong> — Full backup: book, chapters, characters, lore bible</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-primary-500" />
              <span><strong>HTML / MD / DOCX / TXT</strong> — Single chapter with content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
