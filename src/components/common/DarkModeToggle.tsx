import { Moon, Sun } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { useSettingsStore } from '@/stores/settingsStore';

export default function DarkModeToggle() {
  const { t } = useI18n();
  const { theme, setTheme } = useSettingsStore();

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      title={theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gray-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
