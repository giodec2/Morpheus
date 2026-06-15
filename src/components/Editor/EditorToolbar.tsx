import { useState, useEffect } from 'react';
import type { Editor } from '@tiptap/react';
import {
  Bold, Italic, Underline, Heading1, Type,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter
} from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import CustomSelect from '@/components/common/CustomSelect';

const FONTS = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: "'Open Sans'" },
  { label: 'Arimo', value: 'Arimo' },
  { label: 'Merriweather', value: 'Merriweather' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Lora', value: 'Lora' },
  { label: 'Crimson Pro', value: "'Crimson Pro'" },
  { label: 'Literata', value: 'Literata' },
  { label: 'Monospace', value: 'monospace' },
];

const SIZES = [
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '32px', value: '32px' },
];

const COLORS = [
  '#000000', '#333333', '#666666', '#999999', '#cccccc',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
  '#6366f1', '#a855f7', '#ec4899',
];

interface ToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: ToolbarProps) {
  const { t } = useI18n();
  const SPACINGS = [
    { label: t('editor.spacingSingle'), value: '1' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: '1.75', value: '1.75' },
    { label: t('editor.spacingDouble'), value: '2' },
  ];
  const [activeFont, setActiveFont] = useState(
    editor?.getAttributes('textStyle').fontFamily || 'Inter'
  );
  const [activeSize, setActiveSize] = useState(
    editor?.getAttributes('textStyle').fontSize || '16px'
  );
  const [activeLineHeight, setActiveLineHeight] = useState(
    editor?.state.selection.$from.parent.attrs.lineHeight || '1.5'
  );

  useEffect(() => {
    if (!editor) return;
    const updateAttrs = () => {
      setActiveFont(editor.getAttributes('textStyle').fontFamily || 'Inter');
      setActiveSize(editor.getAttributes('textStyle').fontSize || '16px');
      setActiveLineHeight(
        editor.state.selection.$from.parent.attrs.lineHeight || '1.5'
      );
    };
    editor.on('selectionUpdate', updateAttrs);
    editor.on('update', updateAttrs);
    return () => {
      editor.off('selectionUpdate', updateAttrs);
      editor.off('update', updateAttrs);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="px-2 md:px-4 py-2 flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {/* Formatting */}
      <ToolbarGroup>
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title={t('editor.bold')}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title={t('editor.italic')}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title={t('editor.underline')}
        >
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('highlight')}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          title={t('editor.highlight')}
        >
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarGroup>
        <ToolbarButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title={t('editor.heading1')}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title={t('editor.heading2')}
        >
          <Type className="w-4 h-4" />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Font */}
      <ToolbarGroup>
        <CustomSelect
          className="w-28"
          value={activeFont}
          options={FONTS}
          onChange={(val) => {
            setActiveFont(val);
            editor.chain().focus().setFontFamily(val).run();
          }}
        />

        <CustomSelect
          className="w-[88px]"
          value={activeSize}
          options={SIZES}
          onChange={(val) => {
            setActiveSize(val);
            editor.chain().focus().setFontSize(val).run();
          }}
        />

        <CustomSelect
          className="w-[88px]"
          value={activeLineHeight}
          options={SPACINGS}
          onChange={(val) => {
            setActiveLineHeight(val);
            editor.chain().focus().setLineHeight(val).run();
          }}
        />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Color */}
      <ToolbarGroup>
        <div className="flex items-center gap-0.5">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => editor.chain().focus().setColor(color).run()}
              className={`w-4 h-4 rounded-sm border border-gray-200 dark:border-slate-700 ${
                editor.isActive('textStyle', { color }) ? 'ring-2 ring-primary-500' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarGroup>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title={t('editor.alignLeft')}
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title={t('editor.alignCenter')}
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title={t('editor.alignRight')}
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title={t('editor.justify')}
        >
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-gray-200 dark:bg-slate-700 mx-1" />;
}

function ToolbarButton({
  active, onClick, title, children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  );
}
