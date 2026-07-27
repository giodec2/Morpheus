// Demo content for the landing page interactive sections.
// One coherent fictional world ("The Cartographer of Lost Things") is used
// across the whole page, in both locales. Not part of the t() dictionary
// because segments are structured data, not flat strings.
import type { UILocale } from '@/i18n/types';

export interface DemoEntity {
  id: string;
  name: string;
  kind: string;
  detail: string;
}

export interface DemoSegment {
  text: string;
  entity?: string;
}

export interface DemoScript {
  bookTitle: string;
  chapterLabel: string;
  segments: DemoSegment[];
  loreParagraph: DemoSegment[];
  entities: DemoEntity[];
  // Keyed by the genre keys used in landing.genres.*
  genreVoices: Record<string, string>;
}

const en: DemoScript = {
  bookTitle: 'The Cartographer of Lost Things',
  chapterLabel: 'Chapter 3 — The Lighthouse',
  segments: [
    { text: 'Elara', entity: 'elara' },
    { text: ' climbed the lighthouse steps above the ' },
    { text: 'Ashen Coast', entity: 'ashenCoast' },
    { text: ', the tide-map folded in her coat. Below, the sea was keeping its side of the ' },
    { text: 'Tide Pact', entity: 'tidePact' },
    { text: ' — and tonight, it had brought something back.' },
  ],
  loreParagraph: [
    { text: 'Elara', entity: 'elara' },
    { text: ' had mapped the ' },
    { text: 'Ashen Coast', entity: 'ashenCoast' },
    { text: ' a hundred times, but the tide never kept the same shape twice. The ' },
    { text: 'Tide Pact', entity: 'tidePact' },
    { text: ' was older than the lighthouse, older than the town — every year the sea returned one lost thing, and every year someone paid with a memory. ' },
    { text: 'Elara', entity: 'elara' },
    { text: ' had already chosen what she would forget.' },
  ],
  entities: [
    {
      id: 'elara',
      name: 'Elara Vance',
      kind: 'Character',
      detail: 'Cartographer of places that no longer exist. Afraid of deep water since the flood of \u201911.',
    },
    {
      id: 'ashenCoast',
      name: 'The Ashen Coast',
      kind: 'Location',
      detail: 'A shoreline of grey sand where the tide returns things it stole — wreckage, letters, names.',
    },
    {
      id: 'tidePact',
      name: 'The Tide Pact',
      kind: 'World rule',
      detail: 'The old bargain: the sea gives back one lost thing each year, and takes a memory in payment.',
    },
  ],
  genreVoices: {
    generalFiction:
      'The lighthouse stairs smelled of salt and old paint, and Elara climbed them the way she did everything — carefully, as if the world might notice her.',
    crimeMystery:
      'Someone had left the lighthouse door open, and Elara meant to find out who — before the tide erased the footprints.',
    romance:
      'He was waiting at the top of the lighthouse, and Elara hated that her heart climbed faster than her feet.',
    thrillerHorror:
      'The light at the top of the lighthouse was still on. Elara had switched it off three hours ago.',
    scienceFiction:
      'The tide-map showed coastlines that wouldn\u2019t exist for another century. Elara climbed toward the signal anyway.',
    fantasy:
      'The stairs hummed with old ward-magic, and below them the sea kept its ancient bargain, patient as only the sea can be.',
    literaryFiction:
      'Grief, Elara had learned, was a staircase: you climbed it daily, the view never changed, and still you climbed.',
    historicalFiction:
      'In the winter of 1911, with the war still a rumor, Elara kept the lighthouse the way her mother had — one lamp, one logbook, one promise.',
    youngAdult:
      'Okay, so technically breaking into a lighthouse at midnight was a bad idea. Elara had stopped counting her bad ideas around chapter two.',
  },
};

const it: DemoScript = {
  bookTitle: 'La Cartografa delle Cose Perdute',
  chapterLabel: 'Capitolo 3 — Il Faro',
  segments: [
    { text: 'Elara', entity: 'elara' },
    { text: ' salì i gradini del faro che dominava la ' },
    { text: 'Costa di Cenere', entity: 'ashenCoast' },
    { text: ', la mappa delle maree piegata nel cappotto. Sotto, il mare onorava la sua parte del ' },
    { text: 'Patto della Marea', entity: 'tidePact' },
    { text: ' — e quella notte aveva restituito qualcosa.' },
  ],
  loreParagraph: [
    { text: 'Elara', entity: 'elara' },
    { text: ' aveva mappato la ' },
    { text: 'Costa di Cenere', entity: 'ashenCoast' },
    { text: ' un centinaio di volte, ma la marea non le dava mai la stessa forma due volte. Il ' },
    { text: 'Patto della Marea', entity: 'tidePact' },
    { text: ' era più antico del faro, più antico del paese: ogni anno il mare restituiva una cosa perduta, e ogni anno qualcuno pagava con un ricordo. ' },
    { text: 'Elara', entity: 'elara' },
    { text: ' aveva già scelto cosa avrebbe dimenticato.' },
  ],
  entities: [
    {
      id: 'elara',
      name: 'Elara Vance',
      kind: 'Personaggio',
      detail: 'Cartografa di luoghi che non esistono più. Ha paura dell\u2019acqua profonda dall\u2019alluvione dell\u201911.',
    },
    {
      id: 'ashenCoast',
      name: 'La Costa di Cenere',
      kind: 'Luogo',
      detail: 'Una riva di sabbia grigia dove la marea restituisce ciò che ha rubato — relitti, lettere, nomi.',
    },
    {
      id: 'tidePact',
      name: 'Il Patto della Marea',
      kind: 'Regola del mondo',
      detail: 'L\u2019antico patto: ogni anno il mare restituisce una cosa perduta, e in cambio pretende un ricordo.',
    },
  ],
  genreVoices: {
    generalFiction:
      'I gradini del faro odoravano di sale e vernice vecchia, ed Elara li salì come faceva con ogni cosa — piano, come se il mondo potesse accorgersi di lei.',
    crimeMystery:
      'Qualcuno aveva lasciato aperta la porta del faro, ed Elara aveva intenzione di scoprire chi — prima che la marea cancellasse le impronte.',
    romance:
      'Lui la stava aspettando in cima al faro, ed Elara odiava che il suo cuore salisse più in fretta dei suoi piedi.',
    thrillerHorror:
      'La luce in cima al faro era ancora accesa. Elara l\u2019aveva spenta tre ore prima.',
    scienceFiction:
      'La mappa delle maree mostrava coste che non sarebbero esistite per un altro secolo. Elara salì comunque, verso il segnale.',
    fantasy:
      'I gradini vibravano di antichi sortilegi di guardia, e sotto di essi il mare onorava il suo patto antico, paziente come solo il mare sa essere.',
    literaryFiction:
      'Il dolore, aveva imparato Elara, era una scala: la salivi ogni giorno, il panorama non cambiava, e tu salivi lo stesso.',
    historicalFiction:
      'Nell\u2019inverno del 1911, con la guerra ancora solo una voce, Elara custodiva il faro come sua madre prima di lei — una lampada, un registro, una promessa.',
    youngAdult:
      'Ok, tecnicamente intrufolarsi in un faro a mezzanotte era una pessima idea. Elara aveva smesso di contare le sue pessime idee verso il capitolo due.',
  },
};

const scripts: Record<UILocale, DemoScript> = { en, it };

export function getDemoScript(locale: UILocale): DemoScript {
  return scripts[locale] ?? scripts.en;
}

export const GENRE_KEYS = [
  'generalFiction',
  'crimeMystery',
  'romance',
  'thrillerHorror',
  'scienceFiction',
  'fantasy',
  'literaryFiction',
  'historicalFiction',
  'youngAdult',
] as const;
