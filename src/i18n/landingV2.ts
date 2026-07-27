// Landing page strings unique to the manuscript redesign. Everything reusable (pricing,
// FAQ, trust pillars, CTAs, genre names) stays in landing.ts.
export const landingV2 = {
  en: {
    landingV2: {
      chapters: {
        hero: 'Prologue',
        lore: 'Chapter I',
        genres: 'Chapter II',
        manifesto: 'Chapter III',
        pricing: 'Chapter IV',
        faq: 'Chapter V',
      },
      progress: {
        ariaLabel: 'Page chapters',
      },
      hero: {
        headlineA: 'A co-writer who',
        headlineEm: 'remembers',
        headlineB: 'your whole world.',
        sub: 'Morpheus reads your lore bible as you write — every character, every place, every rule. Don\u2019t take our word for it. Watch.',
        lorePanelTitle: 'Lore Bible',
        statusWriting: 'Morpheus is co-writing…',
        statusDone: 'Draft saved locally · nothing left your device',
        scrollHint: 'Scroll to turn the page',
      },
      lore: {
        title: 'Touch a name. The lore answers.',
        intro:
          'Characters, locations and world rules aren\u2019t notes you lose — they\u2019re structured profiles the AI reads before every suggestion. Try it.',
        hint: 'Hover or tap the underlined names',
      },
      genres: {
        title: 'Nine genres. Nine voices.',
        intro: 'Same lighthouse, same Elara — rewritten in the conventions of each genre. Pick one.',
        quoteLabel: 'Morpheus, {{genre}} mode',
        modelNote: 'Model used for the examples: Kimi',
      },
      manifesto: {
        title: 'We sign this in public.',
        intro:
          'Closed-source tools ask for trust. We publish proof — every promise below is verifiable in the code itself.',
      },
      pricing: {
        title: 'Pay for ink, not for anxiety.',
        maestroSub: 'All our features, your own key',
        maestroStrip: 'One key, all features unlocked',
      },
      faq: {
        title: 'Marginalia',
        intro: 'The questions scribbled in the margins, answered.',
      },
      finalCta: {
        title: 'The blank page is waiting.',
        titleEm: 'Bring your world.',
      },
    },
  },
  it: {
    landingV2: {
      chapters: {
        hero: 'Prologo',
        lore: 'Capitolo I',
        genres: 'Capitolo II',
        manifesto: 'Capitolo III',
        pricing: 'Capitolo IV',
        faq: 'Capitolo V',
      },
      progress: {
        ariaLabel: 'Capitoli della pagina',
      },
      hero: {
        headlineA: 'Un co-autore che',
        headlineEm: 'ricorda',
        headlineB: 'ogni angolo del tuo mondo.',
        sub: 'Morpheus legge la tua lore bible mentre scrivi — ogni personaggio, ogni luogo, ogni regola. Non fidarti della nostra parola: guardalo in azione.',
        lorePanelTitle: 'Lore Bible',
        statusWriting: 'Morpheus sta scrivendo con te…',
        statusDone: 'Bozza salvata in locale · tutto è rimasto sul tuo dispositivo',
        scrollHint: 'Scorri per voltare pagina',
      },
      lore: {
        title: 'Sfiora un nome. La lore risponde.',
        intro:
          'Personaggi, luoghi e regole del tuo mondo non sono appunti destinati a perdersi: sono profili strutturati che l\u2019AI consulta prima di ogni suggerimento. Prova.',
        hint: 'Passa sopra i nomi sottolineati, o toccali',
      },
      genres: {
        title: 'Nove generi. Nove voci.',
        intro: 'Stesso faro, stessa Elara: la stessa scena riscritta secondo le convenzioni di ogni genere. Scegline uno.',
        quoteLabel: 'Morpheus, modalità {{genre}}',
        modelNote: 'Modello usato per gli esempi: Kimi',
      },
      manifesto: {
        title: 'Promesse firmate in pubblico.',
        intro:
          'Gli strumenti closed source ti chiedono fiducia. Noi preferiamo darti delle prove: ogni promessa qui sotto è verificabile nel codice.',
      },
      pricing: {
        title: 'Paghi l\u2019inchiostro, non l\u2019ansia.',
        maestroSub: 'Tutte le nostre funzionalità, la tua chiave',
        maestroStrip: 'Una chiave, tutte le funzionalità sbloccate',
      },
      faq: {
        title: 'Note a margine',
        intro: 'Le domande annotate ai margini — e le nostre risposte.',
      },
      finalCta: {
        title: 'La pagina bianca ti aspetta.',
        titleEm: 'Porta il tuo mondo.',
      },
    },
  },
} as const;
