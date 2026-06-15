import { useState } from 'react';
import { Plus, X, User } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { updateChapter } from '@/db/chapters';
import type { Chapter, Character } from '@/types';

interface CharacterTagsProps {
  chapter: Chapter;
  allCharacters: Character[];
}

export default function CharacterTags({ chapter, allCharacters }: CharacterTagsProps) {
  const { t } = useI18n();
  const [showDropdown, setShowDropdown] = useState(false);
  const { updateActiveChapter } = useEditorStore();
  const { updateChapter: updateChapterInStore } = useBookStore();

  const taggedCharacters = allCharacters.filter(c => chapter.taggedCharacterIds.includes(c.id));
  const availableCharacters = allCharacters.filter(c => !chapter.taggedCharacterIds.includes(c.id));

  const addTag = async (charId: string) => {
    const newIds = [...chapter.taggedCharacterIds, charId];
    await updateChapter(chapter.id, { taggedCharacterIds: newIds });
    updateChapterInStore({ ...chapter, taggedCharacterIds: newIds });
    updateActiveChapter({ taggedCharacterIds: newIds });
    setShowDropdown(false);
  };

  const removeTag = async (charId: string) => {
    const newIds = chapter.taggedCharacterIds.filter(id => id !== charId);
    await updateChapter(chapter.id, { taggedCharacterIds: newIds });
    updateChapterInStore({ ...chapter, taggedCharacterIds: newIds });
    updateActiveChapter({ taggedCharacterIds: newIds });
  };

  return (
    <div className="px-8 pb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 dark:text-gray-500">{t('app.charactersLabel')}</span>

        {taggedCharacters.map(char => (
          <span
            key={char.id}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
          >
            <User className="w-3 h-3" />
            {char.name}
            <button
              onClick={() => removeTag(char.id)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-dashed border-gray-300 dark:border-slate-700 text-gray-500 dark:text-gray-500 rounded-full hover:border-primary-400 hover:text-primary-600 transition-colors"
          >
            <Plus className="w-3 h-3" />
            {t('app.tag')}
          </button>

          {showDropdown && availableCharacters.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {availableCharacters.map(char => (
                <button
                  key={char.id}
                  onClick={() => addTag(char.id)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {char.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
