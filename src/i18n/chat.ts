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
        gpt5Nano:
          "OpenAI's smallest model. Fast and agile for quick dialogue passes, brainstorming sparks, and iterative drafting. Ideal when you want immediate feedback without overthinking.",
        gemma4:
          'An incredibly fast and creative model. Strong narrative coherence and natural character voices. A solid daily co-writer for any genre.',
        deepseekV4Flash:
          'A fast model with a huge context window. Perfect for high-volume drafting sessions, honest feedback, and processing long manuscripts in one go.',
        geminiFlash:
          "Google's speed-focused model. Lightning-fast responses ideal for rapid brainstorming; it can also reason quickly, great for when momentum matters.",
        qwenFlash:
          'An efficient generalist with strong reasoning. Balanced between creative and analytical tasks — a reliable daily driver.',
        gpt54Mini:
          "OpenAI's compact reasoning model. Excellent for structured feedback, continuity checking, and precise prose refinement. When reliability is the priority.",
        gptLuna:
          "OpenAI's Luna model. Balanced creativity and reasoning for long-form drafting, rich dialogue, and detailed scene refinement.",
        grok:
          'Fast and decisive, with a bold, distinctive voice. Best for incisive dialogue and irreverent characters rather than delicate prose. Huge context window.',
        kimi:
          'A sophisticated generalist with a spark of deep creativity. Great for balancing complex, analytical plots with elegant character dialogue.',
        glm:
          'A versatile literary powerhouse. Excels at rich prose, intricate plot development, and long-range narrative planning. Built for ambitious novel writing.',
        deepseekV4Pro:
          'Flagship-level reasoning model. Excels at complex plot analysis, deep character psychology, and multi-level continuity control. For when the story demands nuance.',
      },
      genres: {
        labels: {
          general: 'General',
          crime: 'Crime & Mystery',
          romance: 'Romance',
          thriller: 'Thriller & Horror',
          scifi: 'Science Fiction',
          fantasy: 'Fantasy',
          literary: 'Literary Fiction',
          historical: 'Historical Fiction',
          youngAdult: 'Young Adult',
        },
        descriptions: {
          general:
            'No genre specialization. Morpheus acts as a versatile creative writing assistant.',
          crime:
            'Forensic reasoning, clue trails, red herrings, procedural accuracy, and suspenseful investigative pacing.',
          romance:
            'Emotional arcs, romantic tension, relationship dynamics, chemistry building, and heart-driven storytelling.',
          thriller:
            'Pacing built on unease and suspense, rising tension, psychological discomfort, and visceral atmosphere.',
          scifi:
            'Consistent world-building, speculative logic, balance between technology and narrative, and futuristic imagination.',
          fantasy:
            'Consistent magic system, lore integration, mythic voice, and epic world-building.',
          literary:
            'Symbolism, subtext, deep character interiority, thematic resonance, and careful prose craft.',
          historical:
            'Period-accurate voice, anachronism awareness, documented details, and prose appropriate to the era.',
          youngAdult:
            'Age-appropriate voice, coming-of-age themes, accessible prose, and emotionally engaging pacing for younger readers.',
        },
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
        gpt5Nano:
          "Il modello più piccolo di OpenAI. Veloce e agile per passaggi rapidi di dialogo, spunti creativi e stesura iterativa. Ideale quando vuoi feedback immediato senza pensarci troppo.",
        gemma4:
          'Modello incredibilmente veloce e creativo. Forte coerenza narrativa e voci di personaggi naturali. Un solido coautore quotidiano per qualsiasi genere.',
        deepseekV4Flash:
          'Modello veloce con una finestra di contesto enorme. Perfetto per sessioni di stesura molto intensive, feedback onesto ed elaborazione di manoscritti lunghi in una sola passata.',
        geminiFlash:
          "Il modello di Google incentrato sulla velocità. Risposte fulminee ideali per brainstorming rapido; sa anche ragionare velocemente, da usare quando conta lo slancio.",
        qwenFlash:
          'Un generalista efficiente con un ragionamento solido. Equilibrato tra compiti creativi e analitici — uno strumento quotidiano affidabile.',
        gpt54Mini:
          "Modello compatto di ragionamento di OpenAI. Eccellente per feedback strutturato, controllo della continuità e rifinitura precisa della prosa. Quando la priorità è l'affidabilità.",
        gptLuna:
          "Il modello Luna di OpenAI. Equilibrato tra creatività e ragionamento per stesura lunga, dialoghi ricchi e rifinitura dettagliata delle scene.",
        grok:
          'Veloce e deciso, con una voce audace e distintiva. Meglio per dialoghi incisivi e personaggi irriverenti che per prosa delicata. Finestra di contesto enorme.',
        kimi:
          'Generalista sofisticato con una scintilla di profonda creatività. Ottimo per bilanciare trame complesse e analitiche con dialoghi eleganti tra i personaggi.',
        glm:
          'Una potenza letteraria versatile. Eccelle in prosa ricca, sviluppo intricato della trama e pianificazione narrativa a lungo termine. Pensato per la scrittura di romanzi ambiziosi.',
        deepseekV4Pro:
          'Modello di ragionamento di punta. Eccelle in analisi complesse della trama, psicologia profonda dei personaggi e controllo della continuità su più livelli. Per quando la storia richiede sfumature.',
      },
      genres: {
        labels: {
          general: 'Generale',
          crime: 'Giallo e mystery',
          romance: 'Romanzo rosa',
          thriller: 'Thriller e horror',
          scifi: 'Fantascienza',
          fantasy: 'Fantasy',
          literary: 'Narrativa letteraria',
          historical: 'Romanzo storico',
          youngAdult: 'Young Adult',
        },
        descriptions: {
          general:
            'Nessuna specializzazione di genere. Morpheus agisce come un assistente versatile per la scrittura creativa.',
          crime:
            'Ragionamento forense, pista di indizi, falsi indizi, accuratezza procedurale e ritmo investigativo sospeso.',
          romance:
            'Archi emotivi, tensione romantica, dinamiche relazionali, costruzione della chimica e narrazione guidata dal cuore.',
          thriller:
            'Ritmo per inquietudine e suspense, tensione crescente, disagio psicologico e atmosfera viscerale.',
          scifi:
            'Coerenza del world-building, logica speculativa, equilibrio tra tecnologia e narrazione, e immaginazione futurista.',
          fantasy:
            'Coerenza del sistema magico, integrazione del lore, voce mitica e world-building epico.',
          literary:
            'Simbolismo, sottotesto, profonda interiorità dei personaggi, risonanza tematica e cura della prosa.',
          historical:
            "Voce fedele all'epoca, attenzione agli anacronismi, dettagli documentati e prosa appropriata al periodo.",
          youngAdult:
            "Voce adatta all'età, tematiche di formazione, prosa accessibile e ritmo emotivamente coinvolgente per lettori più giovani.",
        },
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
