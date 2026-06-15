import type { WritingGenre } from '@/types';
import {
  BookOpen,
  Search,
  Heart,
  Flame,
  Rocket,
  Wand2,
  Glasses,
  Landmark,
  Sunrise,
} from 'lucide-react';

export interface GenreConfig {
  id: WritingGenre;
  label: string;
  icon: typeof BookOpen;
  color: string;
  description: string;
}

export const GENRES: GenreConfig[] = [
  {
    id: 'general',
    label: 'Generale',
    icon: BookOpen,
    color: 'text-gray-600 dark:text-gray-400',
    description: 'Nessuna specializzazione di genere. Morpheus agisce come un assistente versatile per la scrittura creativa.',
  },
  {
    id: 'crime',
    label: 'Giallo e mystery',
    icon: Search,
    color: 'text-slate-700 dark:text-slate-300',
    description: 'Ragionamento forense, pista di indizi, falsi indizi, accuratezza procedurale e ritmo investigativo sospeso.',
  },
  {
    id: 'romance',
    label: 'Romanzo rosa',
    icon: Heart,
    color: 'text-rose-500 dark:text-rose-400',
    description: 'Archi emotivi, tensione romantica, dinamiche relazionali, costruzione della chimica e narrazione guidata dal cuore.',
  },
  {
    id: 'thriller',
    label: 'Thriller e horror',
    icon: Flame,
    color: 'text-orange-600 dark:text-orange-400',
    description: 'Ritmo per inquietudine e suspense, tensione crescente, disagio psicologico e atmosfera viscerale.',
  },
  {
    id: 'scifi',
    label: 'Fantascienza',
    icon: Rocket,
    color: 'text-cyan-600 dark:text-cyan-400',
    description: 'Coerenza del world-building, logica speculativa, equilibrio tra tecnologia e narrazione, e immaginazione futurista.',
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    icon: Wand2,
    color: 'text-violet-600 dark:text-violet-400',
    description: 'Coerenza del sistema magico, integrazione del lore, voce mitica e world-building epico.',
  },
  {
    id: 'literary',
    label: 'Narrativa letteraria',
    icon: Glasses,
    color: 'text-emerald-600 dark:text-emerald-400',
    description: 'Simbolismo, sottotesto, profonda interiorità dei personaggi, risonanza tematica e cura della prosa.',
  },
  {
    id: 'historical',
    label: 'Romanzo storico',
    icon: Landmark,
    color: 'text-amber-700 dark:text-amber-400',
    description: 'Voce fedele all\'epoca, attenzione agli anacronismi, dettagli documentati e prosa appropriata al periodo.',
  },
  {
    id: 'youngAdult',
    label: 'Young Adult',
    icon: Sunrise,
    color: 'text-sky-500 dark:text-sky-400',
    description: 'Voce adatta all\'età, tematiche di formazione, prosa accessibile e ritmo emotivamente coinvolgente per lettori più giovani.',
  },
];

export const GENRE_DESCRIPTIONS: Record<WritingGenre, string> = {
  general: 'Nessuna specializzazione di genere. Morpheus agisce come un assistente versatile per la scrittura creativa.',
  crime: 'Ragionamento forense, pista di indizi, falsi indizi, accuratezza procedurale e ritmo investigativo sospeso.',
  romance: 'Archi emotivi, tensione romantica, dinamiche relazionali, costruzione della chimica e narrazione guidata dal cuore.',
  thriller: 'Ritmo per inquietudine e suspense, tensione crescente, disagio psicologico e atmosfera viscerale.',
  scifi: 'Coerenza del world-building, logica speculativa, equilibrio tra tecnologia e narrazione, e immaginazione futurista.',
  fantasy: 'Coerenza del sistema magico, integrazione del lore, voce mitica e world-building epico.',
  literary: 'Simbolismo, sottotesto, profonda interiorità dei personaggi, risonanza tematica e cura della prosa.',
  historical: 'Voce fedele all\'epoca, attenzione agli anacronismi, dettagli documentati e prosa appropriata al periodo.',
  youngAdult: 'Voce adatta all\'età, tematiche di formazione, prosa accessibile e ritmo emotivamente coinvolgente per lettori più giovani.',
};

export const GENRE_PROMPTS: Record<WritingGenre, string> = {
  general: '',
  crime: `GENRE CONTEXT: Crime & Mystery
You are writing within the crime and mystery genre. Prioritize:
- Clue logic: ensure clues are fair, discoverable, and logically connected to the solution.
- Red herrings: mislead the reader deliberately but fairly.
- Procedural accuracy: respect investigation workflows (police, private eye, amateur sleuth) unless deliberately subverted.
- Pacing: alternate investigation beats with personal stakes to sustain suspense.
- Dialogue: interrogations and witness interviews should reveal character as much as information.
When suggesting ideas, think like a mystery architect — every element should either point toward or away from the truth.`,
  romance: `GENRE CONTEXT: Romance
You are writing within the romance genre. Prioritize:
- Emotional authenticity: characters' feelings should evolve naturally, not feel manufactured.
- Chemistry: build attraction through small moments, dialogue subtext, and physical awareness.
- Obstacles: the central relationship must face meaningful internal or external conflict.
- Pacing: balance intimate moments with tension — don't resolve conflict too quickly.
- Tropes: use romance tropes (enemies-to-lovers, second chance, fake relationship) knowingly and with fresh twists.
When suggesting ideas, focus on emotional beats, turning points in the relationship, and scenes that deepen connection.`,
  thriller: `GENRE CONTEXT: Thriller & Horror
You are writing within the thriller and horror genre. Prioritize:
- Dread escalation: build unease gradually before shocks or reveals.
- Pacing: short, punchy scenes; cliffhangers at chapter ends; relentless forward momentum.
- Atmosphere: sensory details that create discomfort, claustrophobia, or paranoia.
- Stakes: make the threat personal, immediate, and inescapable.
- Psychological depth: explore how fear changes behavior, relationships, and decision-making.
When suggesting ideas, think in terms of set pieces, reveals, and moments that make the reader's heart race.`,
  scifi: `GENRE CONTEXT: Science Fiction
You are writing within the science fiction genre. Prioritize:
- Consistent rules: establish how technology, physics, or biology work in this world — then respect those rules.
- Exposition balance: reveal world-building through action and dialogue, not info-dumps.
- Speculative logic: extrapolate from real science or coherent alternate science.
- Human impact: technology should affect characters emotionally, socially, and ethically.
- Sense of wonder: include moments that expand the reader's imagination.
When suggesting ideas, consider ripple effects of technology, societal shifts, and how the future changes human nature.`,
  fantasy: `GENRE CONTEXT: Fantasy
You are writing within the fantasy genre. Prioritize:
- Magic system consistency: define costs, limits, and rules — then adhere to them.
- Lore integration: mythology, history, and prophecy should feel lived-in, not tacked on.
- World-building depth: cultures, politics, geography, and economies should interconnect.
- Mythic voice: consider elevated or poetic prose where appropriate to the subgenre.
- Epic stakes: personal quests should echo larger world-shaping conflicts.
When suggesting ideas, draw on mythic structures, archetypes, and the tension between wonder and consequence.`,
  literary: `GENRE CONTEXT: Literary Fiction
You are writing within the literary fiction genre. Prioritize:
- Subtext: what remains unsaid should carry as much weight as the dialogue.
- Symbolism: objects, settings, and recurring motifs should resonate thematically.
- Interiority: deep access to characters' inner lives, contradictions, and psychological nuance.
- Prose craft: rhythm, diction, and sentence structure are tools of meaning, not just clarity.
- Thematic coherence: every scene should echo the central questions or conflicts of the work.
When suggesting ideas, focus on emotional truth, metaphor, and the layers beneath surface narrative.`,
  historical: `GENRE CONTEXT: Historical Fiction
You are writing within the historical fiction genre. Prioritize:
- Period voice: dialogue and prose should reflect the era without becoming inaccessible.
- Anachronism vigilance: flag modern concepts, language, or technology that would not belong.
- Research-informed detail: use specific, accurate details to ground the reader in the time period.
- Personal vs. historical: characters should feel like agents within history, not mere observers.
- Atmosphere: evoke the smells, sounds, textures, and social rhythms of the era.
When suggesting ideas, consider how historical events create personal dilemmas and how individual choices ripple through recorded history.`,
  youngAdult: `GENRE CONTEXT: Young Adult
You are writing within the young adult genre. Prioritize:
- Authentic voice: protagonists should sound like real teenagers — passionate, uncertain, and self-discovering.
- Firsts: focus on formative experiences, first loves, first betrayals, first realizations about the world.
- Pacing: snappy, propulsive chapters that respect a YA reader's appetite for momentum.
- Emotional intensity: feelings run high; embrace drama without trivializing it.
- Agency: young protagonists must drive the plot, even within constraints.
When suggesting ideas, think about identity, belonging, rebellion, and the transition from childhood to adult awareness.`,
};
