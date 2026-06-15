import { Compass, Search, Network, Sparkles } from 'lucide-react';
import type { AIMode } from '@/types';

export const MODES: {
  id: AIMode;
  label: string;
  icon: typeof Compass;
  color: string;
  baseTemp: number;
  adj: number;
}[] = [
  { id: 'companion', label: "Compagno dello scrittore", icon: Compass, color: 'text-primary-600 dark:text-primary-400', baseTemp: 0.7, adj: 0 },
  { id: 'continuity', label: 'Custode della continuità', icon: Search, color: 'text-amber-600 dark:text-amber-400', baseTemp: 0.5, adj: -0.2 },
  { id: 'plotWeaver', label: 'Tessitore della trama', icon: Network, color: 'text-violet-600 dark:text-violet-400', baseTemp: 0.75, adj: 0.05 },
  { id: 'twistForge', label: 'Forgia dei colpi di scena', icon: Sparkles, color: 'text-rose-600 dark:text-rose-400', baseTemp: 0.85, adj: 0.15 },
];

export const MODE_DESCRIPTIONS: Record<string, string> = {
  companion: 'Il tuo compagno di scrittura quotidiano. Ideale per affinare la prosa, lucidare i dialoghi, espandere le scene e ricevere feedback creativo generale.',
  continuity: 'Il guardiano del lore. Controlla la tua storia rispetto alla lore bible, segnala contraddizioni e cerca fili narrativi dimenticati.',
  plotWeaver: 'L\'architetto narrativo. Aiuta a intrecciare nuove idee nella struttura esistente, suggerisce collegamenti e esplora gli effetti a catena.',
  twistForge: 'Il provocatore creativo. Genera colpi di scena audaci e inaspettati, radicati nei tuoi personaggi e nel mondo esistente.',
};
