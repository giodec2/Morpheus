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
  { id: 'companion', label: "Scribe's Companion", icon: Compass, color: 'text-primary-600 dark:text-primary-400', baseTemp: 0.7, adj: 0 },
  { id: 'continuity', label: 'Continuity Keeper', icon: Search, color: 'text-amber-600 dark:text-amber-400', baseTemp: 0.5, adj: -0.2 },
  { id: 'plotWeaver', label: 'Plot Weaver', icon: Network, color: 'text-violet-600 dark:text-violet-400', baseTemp: 0.75, adj: 0.05 },
  { id: 'twistForge', label: 'Twist Forge', icon: Sparkles, color: 'text-rose-600 dark:text-rose-400', baseTemp: 0.85, adj: 0.15 },
];

export const MODE_DESCRIPTIONS: Record<string, string> = {
  companion: 'Your everyday writing partner. Great for prose refinement, dialogue polishing, scene expansion, and general creative feedback.',
  continuity: 'The lore guardian. Cross-checks your story against the lore bible, flags contradictions, and hunts for forgotten plot threads.',
  plotWeaver: 'The narrative architect. Helps weave new ideas into your existing structure, suggests connections, and explores ripple effects.',
  twistForge: 'The creative provocateur. Generates bold, unexpected plot twists grounded in your existing characters and world.',
};
