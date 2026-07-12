export const chat = {
  en: {
    chat: {
      newChat: 'New Chat',
      openBookToChat: 'Open a book to chat with Morpheus',
      askMorpheus: 'Ask Morpheus...',
      askAnything: 'Ask Morpheus anything about your story...',
      characterCount: '{{current}}/{{max}}',
      retry: 'Retry',
      deleteSession: 'Delete session',
      deleteSessionTitle: 'Delete "{{title}}"?',
      genreTuningLocked: 'Genre tuning locked. Upgrade to Novelist to unlock.',
      standard: 'Standard',
      premium: 'Premium',
      premiumLocked: 'Premium locked. Upgrade to Novelist to unlock.',
      premiumReserved: 'Premium models reserved for Novelist+',
      premiumModelsReserved: 'Premium models are reserved for Novelist tier and above.',
      maxTokens: 'Max Tokens',
      aiSettings: 'AI Settings',
      toggleModelTier: 'Toggle model tier',
      models: {
        recommended: 'Recommended',
        gemma4: 'Gemma 4',
        deepseekV4Flash: 'DeepSeek V4 Flash',
        gpt5Nano: 'GPT-5 Nano',
        geminiFlash: 'Gemini Flash',
        qwenFlash: 'Qwen Flash',
        deepseekV4Pro: 'DeepSeek V4 Pro',
        glm: 'GLM',
        gpt54Mini: 'GPT-5.4 Mini',
        gptLuna: 'GPT-5.6 Luna',
        grok: 'Grok',
        kimi: 'Kimi',
      },
      modelDescriptions: {
        'openai/gpt-5-nano':
          "OpenAI's smallest model. Fast and agile for quick dialogue passes, brainstorming sparks, and iterative drafting. Ideal when you want immediate feedback without overthinking.",
        'google/gemma-4-26b-a4b-it':
          'An incredibly fast and creative model. Strong narrative coherence and natural character voices. A solid daily co-writer for any genre.',
        'deepseek/deepseek-v4-flash':
          'A fast model with a huge context window. Perfect for high-volume drafting sessions, honest feedback, and processing long manuscripts in one go.',
        'google/gemini-2.5-flash-lite':
          "Google's speed-focused model. Lightning-fast responses ideal for rapid brainstorming; it can also reason quickly, great for when momentum matters.",
        'qwen/qwen3.5-flash-02-23':
          'An efficient generalist with strong reasoning. Balanced between creative and analytical tasks — a reliable daily driver.',
        'openai/gpt-5.4-mini':
          "OpenAI's compact reasoning model. Excellent for structured feedback, continuity checking, and precise prose refinement. When reliability is the priority.",
        'openai/gpt-5.6-luna':
          "OpenAI's Luna model. Balanced creativity and reasoning for long-form drafting, rich dialogue, and detailed scene refinement.",
        'x-ai/grok-4.3':
          'Fast and decisive, with a bold, distinctive voice. Best for incisive dialogue and irreverent characters rather than delicate prose. Huge context window.',
        'moonshotai/kimi-k2.5':
          'A sophisticated generalist with a spark of deep creativity. Great for balancing complex, analytical plots with elegant character dialogue.',
        'z-ai/glm-5.1':
          'A versatile literary powerhouse. Excels at rich prose, intricate plot development, and long-range narrative planning. Built for ambitious novel writing.',
        'deepseek/deepseek-v4-pro':
          'Flagship-level reasoning model. Excels at complex plot analysis, deep character psychology, and multi-level continuity control. For when the story demands nuance.',
      },
      modes: {
        companion: 'Writer Companion',
        continuity: 'Continuity Keeper',
        plotWeaver: 'Plot Weaver',
        twistForge: 'Twist Forge',
      },
      modeDescriptions: {
        companion: 'Your daily writing companion. Ideal for refining prose, polishing dialogue, expanding scenes, and receiving general creative feedback.',
        continuity: 'The lore guardian. Checks your story against the lore bible, flags contradictions, and hunts forgotten narrative threads.',
        plotWeaver: 'The narrative architect. Helps weave new ideas into the existing structure, suggests connections, and explores ripple effects.',
        twistForge: 'The creative provocateur. Generates bold, unexpected plot twists rooted in your characters and existing world.',
      },
    },
  },
  it: {
    chat: {
      newChat: 'Nuova chat',
      openBookToChat: 'Apri un libro per chattare con Morpheus',
      askMorpheus: 'Chiedi a Morpheus...',
      askAnything: 'Chiedi a Morpheus qualsiasi cosa sulla tua storia...',
      characterCount: '{{current}}/{{max}}',
      retry: 'Riprova',
      deleteSession: 'Elimina la sessione',
      deleteSessionTitle: 'Eliminare "{{title}}"?',
      genreTuningLocked: 'Regolazione del genere bloccata. Passa al piano Novelist per sbloccarla.',
      standard: 'Standard',
      premium: 'Premium',
      premiumLocked: 'Accesso Premium bloccato. Passa al piano Novelist per sbloccarlo.',
      premiumReserved: 'Modelli Premium riservati a Novelist+',
      premiumModelsReserved: 'I modelli Premium sono riservati al piano Novelist e superiori.',
      maxTokens: 'Token massimi',
      aiSettings: 'Impostazioni IA',
      toggleModelTier: 'Attiva/disattiva il livello del modello',
      models: {
        recommended: 'Consigliato',
        gemma4: 'Gemma 4',
        deepseekV4Flash: 'DeepSeek V4 Flash',
        gpt5Nano: 'GPT-5 Nano',
        geminiFlash: 'Gemini Flash',
        qwenFlash: 'Qwen Flash',
        deepseekV4Pro: 'DeepSeek V4 Pro',
        glm: 'GLM',
        gpt54Mini: 'GPT-5.4 Mini',
        gptLuna: 'GPT-5.6 Luna',
        grok: 'Grok',
        kimi: 'Kimi',
      },
      modelDescriptions: {
        'openai/gpt-5-nano':
          "Il modello più piccolo di OpenAI. Veloce e agile per passaggi rapidi di dialogo, spunti creativi e stesura iterativa. Ideale quando vuoi feedback immediato senza pensarci troppo.",
        'google/gemma-4-26b-a4b-it':
          'Modello incredibilmente veloce e creativo. Forte coerenza narrativa e voci di personaggi naturali. Un solido coautore quotidiano per qualsiasi genere.',
        'deepseek/deepseek-v4-flash':
          'Modello veloce con una finestra di contesto enorme. Perfetto per sessioni di stesura molto intensive, feedback onesto ed elaborazione di manoscritti lunghi in una sola passata.',
        'google/gemini-2.5-flash-lite':
          "Il modello di Google incentrato sulla velocità. Risposte fulminee ideali per brainstorming rapido; sa anche ragionare velocemente, da usare quando conta lo slancio.",
        'qwen/qwen3.5-flash-02-23':
          'Un generalista efficiente con un ragionamento solido. Equilibrato tra compiti creativi e analitici — uno strumento quotidiano affidabile.',
        'openai/gpt-5.4-mini':
          "Modello compatto di ragionamento di OpenAI. Eccellente per feedback strutturato, controllo della continuità e rifinitura precisa della prosa. Quando la priorità è l'affidabilità.",
        'openai/gpt-5.6-luna':
          "Il modello Luna di OpenAI. Equilibrato tra creatività e ragionamento per stesura lunga, dialoghi ricchi e rifinitura dettagliata delle scene.",
        'x-ai/grok-4.3':
          'Veloce e deciso, con una voce audace e distintiva. Meglio per dialoghi incisivi e personaggi irriverenti che per prosa delicata. Finestra di contesto enorme.',
        'moonshotai/kimi-k2.5':
          'Generalista sofisticato con una scintilla di profonda creatività. Ottimo per bilanciare trame complesse e analitiche con dialoghi eleganti tra i personaggi.',
        'z-ai/glm-5.1':
          'Una potenza letteraria versatile. Eccelle in prosa ricca, sviluppo intricato della trama e pianificazione narrativa a lungo termine. Pensato per la scrittura di romanzi ambiziosi.',
        'deepseek/deepseek-v4-pro':
          'Modello di ragionamento di punta. Eccelle in analisi complesse della trama, psicologia profonda dei personaggi e controllo della continuità su più livelli. Per quando la storia richiede sfumature.',
      },
      modes: {
        companion: 'Compagno dello scrittore',
        continuity: 'Custode della continuità',
        plotWeaver: 'Tessitore della trama',
        twistForge: 'Forgia dei colpi di scena',
      },
      modeDescriptions: {
        companion: 'Il tuo compagno di scrittura quotidiano. Ideale per affinare la prosa, perfezionare i dialoghi, espandere le scene e ricevere feedback creativo generale.',
        continuity: 'Il guardiano del background. Confronta la tua storia con il Diario, segnala contraddizioni e rintraccia fili narrativi dimenticati.',
        plotWeaver: "L'architetto narrativo. Aiuta a intrecciare nuove idee nella struttura esistente, suggerisce collegamenti e esplora le ripercussioni.",
        twistForge: 'Il provocatore creativo. Genera colpi di scena audaci e inaspettati, radicati nei tuoi personaggi e nel mondo esistente.',
      },
    },
  },
} as const;
