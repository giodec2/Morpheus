import { useState, useEffect } from 'react';
import {
  BookOpen, ChevronDown, ChevronUp, Plus, FileText,
  Users, ScrollText, Settings, Trash2,
  Pin, PinOff, ChevronRight, ArrowUp, ArrowDown
} from 'lucide-react';
import CustomSelect from '@/components/common/CustomSelect';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { createChapter, deleteChapter, updateChapter, reorderChapters } from '@/db/chapters';
import { createCharacter, deleteCharacter, updateCharacter } from '@/db/characters';
import { updateLoreBible } from '@/db/loreBibles';
import { toast } from '@/components/common/Toast';
import type { Chapter, Character } from '@/types';

interface LeftSidebarProps {
  onOpenSettings?: () => void;
}

export default function LeftSidebar({ onOpenSettings }: LeftSidebarProps) {
  const {
    activeBook, chapters, characters, loreBible,
    sidebarView, setSidebarView, activeCharacterId, setActiveCharacterId,
    addChapter, removeChapter, updateChapter: updateChapterInStore,
    addCharacter, removeCharacter, updateCharacter: updateCharacterInStore,
    updateLoreBible: updateLoreInStore,
    reorderChapters: reorderChaptersInStore,
  } = useBookStore();

  const { activeChapter, setActiveChapter } = useEditorStore();
  const [expandedChapters, setExpandedChapters] = useState(true);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  if (!activeBook) {
    return (
      <aside className="w-64 panel flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
        <BookOpen className="w-12 h-12 mb-3" />
        <p className="text-sm">Open a book to start</p>
      </aside>
    );
  }

  const handleCreateChapter = async () => {
    const newOrder = chapters.length;
    const chapter = await createChapter(activeBook.id, `Chapter ${newOrder + 1}`, newOrder);
    addChapter(chapter);
    setActiveChapter(chapter);
    setSidebarView('chapters');
    toast('Chapter created', 'success');
  };

  const handleDeleteChapter = async (id: string) => {
    if (!confirm('Delete this chapter? This cannot be undone.')) return;
    await deleteChapter(id);
    removeChapter(id);
    toast('Chapter deleted', 'info');
    if (activeChapter?.id === id) {
      const remaining = chapters.filter(c => c.id !== id);
      setActiveChapter(remaining[0] || null);
    }
  };

  const handleRenameChapter = async (chapter: Chapter) => {
    if (!editingTitle.trim()) {
      setEditingChapterId(null);
      return;
    }
    await updateChapter(chapter.id, { title: editingTitle.trim() });
    updateChapterInStore({ ...chapter, title: editingTitle.trim() });
    setEditingChapterId(null);
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setSidebarView('chapters');
  };

  const handleMoveChapter = async (index: number, direction: 'up' | 'down') => {
    if (!activeBook) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= chapters.length) return;
    const reordered = [...chapters];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);
    const ids = reordered.map((c) => c.id);
    await reorderChapters(activeBook.id, ids);
    reorderChaptersInStore(ids);
  };

  return (
    <aside className="w-64 panel flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-slate-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          My Books
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* Chapters Section */}
        <div>
          <button
            onClick={() => setExpandedChapters(!expandedChapters)}
            className="sidebar-item w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Chapters</span>
            </span>
            {expandedChapters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {expandedChapters && (
            <div className="ml-2 mt-1 space-y-0.5">
              {chapters.map((chapter, idx) => (
                <div
                  key={chapter.id}
                  className={`sidebar-item group ${activeChapter?.id === chapter.id ? 'active' : ''}`}
                  onClick={() => handleSelectChapter(chapter)}
                >
                  <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveChapter(idx, 'up'); }}
                      disabled={idx === 0}
                      className="p-0.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded disabled:opacity-0"
                      title="Move up"
                    >
                      <ArrowUp className="w-2.5 h-2.5 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleMoveChapter(idx, 'down'); }}
                      disabled={idx === chapters.length - 1}
                      className="p-0.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded disabled:opacity-0"
                      title="Move down"
                    >
                      <ArrowDown className="w-2.5 h-2.5 text-gray-500" />
                    </button>
                  </div>
                  {editingChapterId === chapter.id ? (
                    <input
                      autoFocus
                      className="flex-1 input py-0.5 text-xs"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleRenameChapter(chapter)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameChapter(chapter);
                        if (e.key === 'Escape') setEditingChapterId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      className="flex-1 truncate"
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingChapterId(chapter.id);
                        setEditingTitle(chapter.title);
                      }}
                    >
                      {chapter.title}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteChapter(chapter.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleCreateChapter}
                className="sidebar-item text-primary-600 dark:text-primary-400"
              >
                <Plus className="w-4 h-4" />
                <span>New Chapter</span>
              </button>
            </div>
          )}
        </div>

        {/* Characters */}
        <button
          onClick={() => { setSidebarView('characters'); setActiveCharacterId(null); }}
          className={`sidebar-item w-full ${sidebarView === 'characters' ? 'active' : ''}`}
        >
          <Users className="w-4 h-4" />
          <span>Characters</span>
          <span className="ml-auto text-xs text-gray-400">{characters.length}</span>
        </button>

        {/* Lore Bible */}
        <button
          onClick={() => setSidebarView('loreBible')}
          className={`sidebar-item w-full ${sidebarView === 'loreBible' ? 'active' : ''}`}
        >
          <ScrollText className="w-4 h-4" />
          <span>Lore Bible</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => {
            if (onOpenSettings) {
              onOpenSettings();
            } else {
              setSidebarView('settings');
            }
          }}
          className={`sidebar-item w-full ${sidebarView === 'settings' ? 'active' : ''}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Character Panel (when viewing characters) */}
      {sidebarView === 'characters' && (
        <CharacterPanel
          characters={characters}
          activeCharacterId={activeCharacterId}
          setActiveCharacterId={setActiveCharacterId}
          onCreate={async (name) => {
            const char = await createCharacter(activeBook.id, name);
            addCharacter(char);
            setActiveCharacterId(char.id);
            toast('Character created', 'success');
          }}
          onUpdate={async (id, updates) => {
            await updateCharacter(id, updates);
            const char = characters.find(c => c.id === id);
            if (char) updateCharacterInStore({ ...char, ...updates });
          }}
          onDelete={async (id) => {
            if (!confirm('Delete this character?')) return;
            await deleteCharacter(id);
            removeCharacter(id);
            toast('Character deleted', 'info');
            if (activeCharacterId === id) setActiveCharacterId(null);
          }}
          allCharacters={characters}
        />
      )}

      {sidebarView === 'loreBible' && loreBible && (
        <LorePanel loreBible={loreBible} onUpdate={async (content) => {
          await updateLoreBible(loreBible.id, { content });
          updateLoreInStore({ ...loreBible, content });
        }} />
      )}
    </aside>
  );
}

/* ---------- Character Panel ---------- */
function CharacterPanel({
  characters, activeCharacterId, setActiveCharacterId,
  onCreate, onUpdate, onDelete, allCharacters,
}: {
  characters: Character[];
  activeCharacterId: string | null;
  setActiveCharacterId: (id: string | null) => void;
  onCreate: (name: string) => void;
  onUpdate: (id: string, updates: Partial<Character>) => void;
  onDelete: (id: string) => void;
  allCharacters: Character[];
}) {
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const activeChar = characters.find(c => c.id === activeCharacterId);

  if (activeChar) {
    return (
      <div className="border-t border-gray-200 dark:border-slate-800 p-3 space-y-3">
        <button
          onClick={() => setActiveCharacterId(null)}
          className="text-xs text-primary-600 dark:text-primary-400 flex items-center gap-1"
        >
          <ChevronRight className="w-3 h-3 rotate-180" /> Back to list
        </button>
        <CharacterDetail
          character={activeChar}
          onUpdate={onUpdate}
          onDelete={onDelete}
          allCharacters={allCharacters}
        />
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 dark:border-slate-800 p-3 space-y-2">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Character
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Character name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newName.trim()) {
                onCreate(newName.trim());
                setNewName('');
                setShowForm(false);
              }
            }}
            autoFocus
          />
          <button
            onClick={() => { if (newName.trim()) { onCreate(newName.trim()); setNewName(''); setShowForm(false); }}}
            className="btn-primary"
          >
            Add
          </button>
        </div>
      )}

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {characters.map(char => (
          <div
            key={char.id}
            onClick={() => setActiveCharacterId(char.id)}
            className="sidebar-item group cursor-pointer"
          >
            {char.isPinned ? <Pin className="w-3 h-3 text-primary-500" /> : <span className="w-3" />}
            <span className="flex-1 truncate">{char.name}</span>
            <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
          </div>
        ))}
        {characters.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No characters yet</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Character Detail ---------- */
function CharacterDetail({
  character, onUpdate, onDelete, allCharacters,
}: {
  character: Character;
  onUpdate: (id: string, updates: Partial<Character>) => void;
  onDelete: (id: string) => void;
  allCharacters: Character[];
}) {
  const [relTargetId, setRelTargetId] = useState('');
  const [relDesc, setRelDesc] = useState('');
  const [showRelForm, setShowRelForm] = useState(false);

  const availableTargets = allCharacters.filter(c => c.id !== character.id);

  const addRelation = () => {
    if (!relTargetId || !relDesc.trim()) return;
    const target = allCharacters.find(c => c.id === relTargetId);
    if (!target) return;
    onUpdate(character.id, {
      relations: [...character.relations, { targetId: target.id, targetName: target.name, description: relDesc.trim() }],
    });
    setRelTargetId('');
    setRelDesc('');
    setShowRelForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <input
          className="font-semibold text-sm bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary-500 focus:outline-none w-full"
          value={character.name}
          onChange={(e) => onUpdate(character.id, { name: e.target.value })}
        />
        <button
          onClick={() => onUpdate(character.id, { isPinned: !character.isPinned })}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          title={character.isPinned ? 'Unpin' : 'Pin to context'}
        >
          {character.isPinned ? <Pin className="w-4 h-4 text-primary-500" /> : <PinOff className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-500">Appearance</label>
        <textarea
          className="textarea h-16"
          value={character.appearance}
          onChange={(e) => onUpdate(character.id, { appearance: e.target.value })}
          placeholder="Physical description..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-500">Personality</label>
        <textarea
          className="textarea h-16"
          value={character.personality}
          onChange={(e) => onUpdate(character.id, { personality: e.target.value })}
          placeholder="Traits, quirks, demeanor..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-500">Notes</label>
        <textarea
          className="textarea h-16"
          value={character.notes}
          onChange={(e) => onUpdate(character.id, { notes: e.target.value })}
          placeholder="Backstory, secrets, arcs..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-500">Relations</label>
          <button
            onClick={() => setShowRelForm(!showRelForm)}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
          >
            {showRelForm ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {showRelForm && (
          <div className="space-y-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <CustomSelect
              value={relTargetId}
              options={[
                { value: '', label: 'Select character...' },
                ...availableTargets.map(c => ({ value: c.id, label: c.name })),
              ]}
              onChange={(val) => setRelTargetId(val)}
              placeholder="Select character..."
            />
            <textarea
              className="textarea h-12"
              placeholder="Describe the relationship..."
              value={relDesc}
              onChange={(e) => setRelDesc(e.target.value)}
            />
            <button onClick={addRelation} className="btn-primary w-full text-xs">Add Relation</button>
          </div>
        )}

        <div className="space-y-1">
          {character.relations.map((rel, idx) => (
            <div key={idx} className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-gray-200">{rel.targetName}</span>
                <button
                  onClick={() => onUpdate(character.id, {
                    relations: character.relations.filter((_, i) => i !== idx),
                  })}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{rel.description}</p>
            </div>
          ))}
          {character.relations.length === 0 && (
            <p className="text-xs text-gray-400 italic">No relations defined</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(character.id)}
        className="w-full btn-secondary text-red-600 dark:text-red-400 text-xs flex items-center justify-center gap-2"
      >
        <Trash2 className="w-3 h-3" /> Delete Character
      </button>
    </div>
  );
}

/* ---------- Lore Panel ---------- */
function extractTextFromContent(content: Record<string, unknown>): string {
  let text = '';
  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;
    if (n.type === 'text' && typeof n.text === 'string') text += n.text;
    if (Array.isArray(n.content)) n.content.forEach(traverse);
  }
  traverse(content);
  return text;
}

function buildTiptapFromText(text: string): Record<string, unknown> {
  const paragraphs = text.split('\n').map(line => ({
    type: 'paragraph',
    content: line.trim() ? [{ type: 'text', text: line }] : [],
  }));
  return { type: 'doc', content: paragraphs };
}

function LorePanel({ loreBible, onUpdate }: { loreBible: { content: Record<string, unknown> }; onUpdate: (content: Record<string, unknown>) => void }) {
  const [text, setText] = useState(extractTextFromContent(loreBible.content));

  useEffect(() => {
    setText(extractTextFromContent(loreBible.content));
  }, [loreBible.content]);

  const handleChange = (value: string) => {
    setText(value);
    onUpdate(buildTiptapFromText(value));
  };

  return (
    <div className="border-t border-gray-200 dark:border-slate-800 p-3 flex-1 overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
        Lore Bible
      </h3>
      <p className="text-xs text-gray-400 mb-3">Style guide, worldbuilding, themes, and notes.</p>
      <textarea
        className="textarea h-full min-h-[200px] text-sm"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your lore, style guide, world rules, themes..."
      />
    </div>
  );
}
