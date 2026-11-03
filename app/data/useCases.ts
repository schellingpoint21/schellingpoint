// Three family scenarios for /use-cases. Illustrative composites, not client stories.
// Agreed in the 1 Oct 2026 review: one general family-wealth case, two Bitcoin cases,
// each showing the mistake and what Schelling Point would do differently.

export interface UseCase {
  id: string
  label: string
  title: string
  story: string[]
  mistakeLabel: string
  mistake: string
  helpLabel: string
  help: string[]
}

const en: UseCase[] = [
  {
    id: 'family-home',
    label: 'A family home',
    title: 'The house that divided three children',
    story: [
      'A widowed mother leaves the family home to her three children in equal shares. One wants to sell. One wants to live there. The third cannot afford to buy the others out.',
      'A house cannot be split three ways without selling it. Years pass in disagreement. There are legal costs, upkeep on a property nobody lives in, and siblings who stop speaking. The wealth survives on paper; the family does not.'
    ],
    mistakeLabel: 'What went wrong',
    mistake: 'The wealth was held in something that could not be divided, and the wishes behind it were never written down or talked through while the mother was there to explain them.',
    helpLabel: 'What we would do',
    help: [
      'Bitcoin can be divided exactly, so it can be passed on in the shares you choose without forcing anyone to sell.',
      'We help you write down who receives what, set it up so each heir can receive their share, and walk them through it while you are here to explain your wishes.',
      'Where property or other assets are involved, we work alongside your lawyer so the whole plan fits together.'
    ]
  },
  {
    id: 'keys-with-him',
    label: 'Bitcoin',
    title: 'The keys that went with him',
    story: [
      'A father keeps his Bitcoin carefully: one hardware wallet, and the recovery words written down and hidden somewhere only he knows. His wife knows the Bitcoin exists, but not where anything is.',
      'After a sudden illness, the family finds the device but not the words, and nobody knows the PIN. The money is still there and can never be reached.'
    ],
    mistakeLabel: 'What went wrong',
    mistake: 'A single point of failure. One person, one set of recovery words, one hiding place, and no written plan for anyone else to follow.',
    helpLabel: 'What we would do',
    help: [
      'Alternative backups kept in separate places, so there is always a plan B.',
      'A map of keyholders chosen by you, so no single person or place is critical, and, if you want it, time-delayed recovery that opens a path for your heirs after a period you set.',
      'A written recovery plan, rehearsed with your spouse, and one line on your documents: "If you can’t reach me, call Schelling Point."'
    ]
  },
  {
    id: 'heir-not-ready',
    label: 'Bitcoin',
    title: 'The heir who was not ready',
    story: [
      'A grandmother leaves her grandson an envelope with her recovery words inside. He has never used Bitcoin. Unsure what to do, he searches online and contacts what looks like a wallet support service.',
      'They ask him to type in the words to “verify” the wallet. Within an hour, it is empty.'
    ],
    mistakeLabel: 'What went wrong',
    mistake: 'The heir received the keys but not the knowledge. Nobody had shown him what he was holding, or told him who he could safely call.',
    helpLabel: 'What we would do',
    help: [
      'A handover while you are here: we go through the whole framework with your heir, with a full walkthrough, so they understand what they will receive.',
      'Plain-language instructions, including the one rule that matters most: recovery words are never typed into a website or shared with anyone.',
      'A known contact. Your family calls us, we confirm who they are and guide them step by step. We never ask for recovery words, and we never hold your keys.'
    ]
  }
]

const es: UseCase[] = [
  {
    id: 'family-home',
    label: 'Una casa familiar',
    title: 'La casa que dividió a tres hermanos',
    story: [
      'Una madre viuda deja la casa familiar a sus tres hijos a partes iguales. Uno quiere venderla. Otro quiere vivir en ella. El tercero no puede pagar la parte de los demás.',
      'Una casa no se puede dividir en tres sin venderla. Pasan los años entre desacuerdos. Hay gastos legales, mantenimiento de una casa en la que nadie vive y hermanos que dejan de hablarse. El patrimonio sobrevive en el papel; la familia, no.'
    ],
    mistakeLabel: 'Qué salió mal',
    mistake: 'El patrimonio estaba en algo que no se podía dividir, y los deseos detrás de él nunca se pusieron por escrito ni se hablaron mientras la madre podía explicarlos.',
    helpLabel: 'Qué haríamos',
    help: [
      'El Bitcoin se puede dividir con exactitud, así que puede transmitirse en las partes que elijas sin obligar a nadie a vender.',
      'Te ayudamos a dejar por escrito quién recibe qué, a organizarlo para que cada heredero pueda recibir su parte, y a explicárselo mientras tú puedes contar tus deseos.',
      'Cuando hay inmuebles u otros bienes, trabajamos junto a tu abogado para que todo el plan encaje.'
    ]
  },
  {
    id: 'keys-with-him',
    label: 'Bitcoin',
    title: 'Las llaves que se fueron con él',
    story: [
      'Un padre cuida su Bitcoin con esmero: una billetera de hardware y las palabras de recuperación escritas y escondidas en un lugar que solo él conoce. Su esposa sabe que el Bitcoin existe, pero no dónde está nada.',
      'Tras una enfermedad repentina, la familia encuentra el dispositivo, pero no las palabras, y nadie conoce el PIN. El dinero sigue ahí y nunca se podrá recuperar.'
    ],
    mistakeLabel: 'Qué salió mal',
    mistake: 'Un punto único de fallo. Una persona, un juego de palabras de recuperación, un escondite y ningún plan escrito que otra persona pudiera seguir.',
    helpLabel: 'Qué haríamos',
    help: [
      'Respaldos alternativos guardados en lugares distintos, para que siempre haya un plan B.',
      'Un mapa de llaves elegido por ti, para que ninguna persona ni lugar sea imprescindible y, si lo deseas, una recuperación con demora que abre un camino a tus herederos tras el plazo que fijes.',
      'Un plan de recuperación por escrito, ensayado con tu esposa, y una frase en tus documentos: “Si no puedes localizarme, llama a Schelling Point.”'
    ]
  },
  {
    id: 'heir-not-ready',
    label: 'Bitcoin',
    title: 'El heredero que no estaba preparado',
    story: [
      'Una abuela deja a su nieto un sobre con sus palabras de recuperación. Él nunca ha usado Bitcoin. Sin saber qué hacer, busca en internet y contacta con lo que parece un servicio de soporte de billeteras.',
      'Le piden que escriba las palabras para “verificar” la billetera. En menos de una hora, está vacía.'
    ],
    mistakeLabel: 'Qué salió mal',
    mistake: 'El heredero recibió las llaves, pero no el conocimiento. Nadie le había explicado qué tenía en sus manos ni a quién podía llamar con seguridad.',
    helpLabel: 'Qué haríamos',
    help: [
      'Un traspaso mientras tú estás: recorremos todo el marco con tu heredero, paso a paso, para que entienda lo que va a recibir.',
      'Instrucciones en lenguaje sencillo, incluida la regla más importante: las palabras de recuperación nunca se escriben en una página web ni se comparten con nadie.',
      'Un contacto conocido. Tu familia nos llama, confirmamos quiénes son y les guiamos paso a paso. Nunca pedimos las palabras de recuperación y nunca tenemos tus llaves.'
    ]
  }
]

export const useCasesFor = (locale: string): UseCase[] => (locale === 'es' ? es : en)
