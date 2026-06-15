export interface ModelDef {
  value: string;
  label: string;
  tier: 'standard' | 'premium';
  badge?: string;
}

export const STANDARD_MODELS: ModelDef[] = [
  {
    value: 'google/gemma-4-26b-a4b-it',
    label: 'Gemma 4',
    tier: 'standard',
    badge: 'Consigliato',
  },
  {
    value: 'deepseek/deepseek-v4-flash',
    label: 'DeepSeek V4 Flash',
    tier: 'standard',
    badge: 'Consigliato',
  },
  {
    value: 'openai/gpt-5-nano',
    label: 'GPT-5 Nano',
    tier: 'standard',
  },
  {
    value: 'google/gemini-2.5-flash-lite',
    label: 'Gemini Flash',
    tier: 'standard',
  },
  {
    value: 'qwen/qwen3.5-flash-02-23',
    label: 'Qwen Flash',
    tier: 'standard',
  },
];

export const PREMIUM_MODELS: ModelDef[] = [
  {
    value: 'deepseek/deepseek-v4-pro',
    label: 'DeepSeek V4 Pro',
    tier: 'premium',
    badge: 'Consigliato',
  },
  {
    value: 'z-ai/glm-5.1',
    label: 'GLM',
    tier: 'premium',
    badge: 'Consigliato',
  },
  {
    value: 'openai/gpt-5.4-mini',
    label: 'GPT-5.4 Mini',
    tier: 'premium',
  },
  {
    value: 'x-ai/grok-4.3',
    label: 'Grok',
    tier: 'premium',
  },
  {
    value: 'moonshotai/kimi-k2.5',
    label: 'Kimi',
    tier: 'premium',
  },
];

export const ALL_MODELS = [...STANDARD_MODELS, ...PREMIUM_MODELS];

export const DEFAULT_STANDARD_MODEL = 'google/gemma-4-26b-a4b-it';
export const DEFAULT_PREMIUM_MODEL = 'deepseek/deepseek-v4-pro';

export const MODEL_DESCRIPTIONS: Record<string, string> = {
  // Standard
  'openai/gpt-5-nano':
    "Il modello più piccolo di OpenAI. Veloce e agile per passaggi rapidi di dialogo, scintille di brainstorming e stesura iterativa. Ideale quando vuoi feedback immediati senza sovrappensiero.",
  'google/gemma-4-26b-a4b-it':
    "Modello incredibilmente veloce e creativo. Forte coerenza narrativa e voci di personaggi naturali. Un solido co-writer quotidiano per qualsiasi genere.",
  'deepseek/deepseek-v4-flash':
    'Modello veloce con una finestra di contesto enorme. Perfetto per sessioni di stesura ad alto volume, feedback onesti e l\'elaborazione di manoscritti lunghi in un colpo solo.',
  'google/gemini-2.5-flash-lite':
    "Il modello di Google incentrato sulla velocità. Risposte fulminee ideali per brainstorming rapido; sa anche ragionare velocemente, da usare quando conta il momentum.",
  'qwen/qwen3.5-flash-02-23':
    "Generalista efficiente con un forte ragionamento. Equilibrato tra compiti creativi e analitici — un driver quotidiano affidabile.",

  // Premium
  'openai/gpt-5.4-mini':
    "Tuttofare di frontiera di OpenAI. Eccellente per feedback strutturati, controllo della continuità e rifinitura precisa della prosa. Quando la priorità è l'affidabilità.",
  'x-ai/grok-4.3':
    'Veloce e deciso, con una voce audace e distintiva. Meglio per dialoghi incisivi e personaggi irriverenti che per prosa delicata. Finestra di contesto enorme.',
  'moonshotai/kimi-k2.5':
    "Generalista sofisticato con una scintilla di profonda creatività. Ottimo per bilanciare trame complesse e analitiche con dialoghi di personaggi eleganti.",
  'z-ai/glm-5.1':
    "Una potenza letteraria versatile. Eccelle in prosa ricca, sviluppo intricato della trama e pianificazione narrativa a lungo raggio. Pensato per la scrittura di romanzi ambiziosi.",
  'deepseek/deepseek-v4-pro':
    "Modello di ragionamento di livello flagship. Eccelle in analisi complesse della trama, psicologia profonda dei personaggi e controllo della continuità su più livelli. Per quando la storia richiede sfumature.",
};
