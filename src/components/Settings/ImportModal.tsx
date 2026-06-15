import { useState, useRef } from 'react';
import Modal from '@/components/common/Modal';
import { X, Upload, FileText, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { toast } from '@/components/common/Toast';
import { putBook } from '@/db/books';
import { putChapter } from '@/db/chapters';
import { putCharacter } from '@/db/characters';
import { putLoreBible, createLoreBible } from '@/db/loreBibles';
import { putChatSession, putChatMessage } from '@/db/chatHistory';
import { putStyleProfile } from '@/db/styleProfiles';
import { generateId } from '@/lib/utils';
import { FontSize } from '@/lib/tiptapFontSize';
import type { Chapter, Character, ChatMessage, ChatSession, LoreBible, StyleProfile } from '@/types';

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
  const { t } = useI18n();
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
      setResult({ success: false, message: t('import.unsupportedFileType', { ext, extensions: IMPORT_EXTENSIONS.join(', ') }) });
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
      setResult({ success: false, message: t('import.importFailed', { message: (err as Error).message }) });
    } finally {
      setIsProcessing(false);
    }
  };

  const importJSON = async (jsonText: string) => {
    const data = JSON.parse(jsonText);

    // Validate minimal structure
    if (!data.book || !Array.isArray(data.chapters)) {
      throw new Error(t('import.invalidJsonBackup'));
    }

    // Generate new book ID to avoid collisions
    const newBookId = generateId();

    // Build ID remapping for characters (so relations stay valid)
    const charIdMap = new Map<string, string>();
    const characters: Character[] = (data.characters || []).map((char: Character) => {
      const newId = generateId();
      charIdMap.set(char.id, newId);
      return {
        ...char,
        id: newId,
        bookId: newBookId,
      };
    });

    // Remap character relations to new IDs
    for (const char of characters) {
      char.relations = char.relations.map((rel) => ({
        ...rel,
        targetId: charIdMap.get(rel.targetId) || rel.targetId,
      }));
    }

    // Remap chapter taggedCharacterIds
    const chapters: Chapter[] = data.chapters.map((ch: Chapter) => ({
      ...ch,
      id: generateId(),
      bookId: newBookId,
      taggedCharacterIds: (ch.taggedCharacterIds || []).map(
        (id: string) => charIdMap.get(id) || id
      ),
    }));

    // Lore bible
    let loreBible: LoreBible | undefined;
    if (data.loreBible) {
      loreBible = {
        ...data.loreBible,
        id: generateId(),
        bookId: newBookId,
      };
    }

    // Book
    const book = {
      ...data.book,
      id: newBookId,
      createdAt: data.book.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    // Restore everything in a single transaction-like batch
    await putBook(book);
    for (const ch of chapters) await putChapter(ch);
    for (const char of characters) await putCharacter(char);
    if (loreBible) {
      await putLoreBible(loreBible);
    } else {
      await createLoreBible(newBookId);
    }

    // Chat sessions & messages
    if (Array.isArray(data.chatSessions) && Array.isArray(data.chatHistory)) {
      const sessionIdMap = new Map<string, string>();
      const sessions: ChatSession[] = data.chatSessions.map((sess: ChatSession) => {
        const newId = generateId();
        sessionIdMap.set(sess.id, newId);
        return {
          ...sess,
          id: newId,
          bookId: newBookId,
        };
      });

      const messages: ChatMessage[] = data.chatHistory.map((msg: ChatMessage) => ({
        ...msg,
        id: generateId(),
        bookId: newBookId,
        sessionId: sessionIdMap.get(msg.sessionId) || msg.sessionId,
      }));

      for (const sess of sessions) await putChatSession(sess);
      for (const msg of messages) await putChatMessage(msg);
    }

    // Style profile
    if (data.styleProfile) {
      const profile: StyleProfile = {
        ...data.styleProfile,
        bookId: newBookId,
        updatedAt: Date.now(),
      };
      await putStyleProfile(profile);
    }

    setResult({
      success: true,
      message: t('import.importedBook', { title: book.title, chapters: chapters.length, characters: characters.length }),
    });
    toast(t('import.bookImported'), 'success');
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
    const book = await putBookImport(title);
    await createLoreBible(book.id);
    const content = htmlToTiptap(html);
    await putChapterImport(book.id, title || t('import.importedChapter'), content);
    setResult({ success: true, message: t('import.importedFromHtml', { title }) });
    toast(t('import.htmlImported'), 'success');
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
    const book = await putBookImport(title);
    await createLoreBible(book.id);
    await putChapterImport(book.id, title || t('import.importedChapter'), content);
    setResult({ success: true, message: t('import.importedFromText', { title }) });
    toast(t('import.textImported'), 'success');
  };

  // Helper: create a book via put (no cloud sync during import)
  async function putBookImport(title: string) {
    const now = Date.now();
    const book = {
      id: generateId(),
      title: title || t('import.importedBookFallback'),
      createdAt: now,
      updatedAt: now,
    };
    await putBook(book);
    return book;
  }

  // Helper: create a chapter via put (no cloud sync during import)
  async function putChapterImport(bookId: string, title: string, content: Record<string, unknown>) {
    const now = Date.now();
    const chapter: Chapter = {
      id: generateId(),
      bookId,
      title,
      order: 0,
      content,
      summary: '',
      summaryPreparedAt: null,
      taggedCharacterIds: [],
      createdAt: now,
      updatedAt: now,
    };
    await putChapter(chapter);
    return chapter;
  }

  return (
    <Modal onClose={onClose} className="max-w-lg p-6" ariaLabel={t('import.ariaLabel')}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('import.title')}</h2>
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
            {t('import.dropZone')}
          </p>
          <p className="text-xs text-gray-400">
            {t('import.supports')}
          </p>
        </div>

        {isProcessing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            {t('import.processing')}
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
            {t('import.whatGetsImported')}
          </h3>
          <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary-500" />
              <span><strong>JSON</strong> — {t('import.jsonDescOnly')}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-primary-500" />
              <span><strong>HTML / MD / DOCX / TXT</strong> — {t('import.docDescOnly')}</span>
            </div>
          </div>
        </div>
    </Modal>
  );
}
