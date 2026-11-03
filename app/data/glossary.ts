// Glossary for /glossary — plain-language definitions, kept here so they are easy to edit.
// Source: Charlie's "Bitcoin Glossary" (Drive) and SP_Glossary_ESP.pdf, simplified per the
// 1 Oct 2026 review, plus the terms used on the homepage.

export interface GlossaryTerm {
  id: string
  term: string
  def: string
}

const en: GlossaryTerm[] = [
  { id: 'address', term: 'Address', def: 'A string of letters and numbers that works like an account number for receiving Bitcoin. It is safe to share.' },
  { id: 'alternative-backups', term: 'Alternative backups', def: 'Extra copies of what is needed to recover your money, kept in separate places, so you always have a plan B to move or access it.' },
  { id: 'bitcoin', term: 'Bitcoin', def: 'Digital money that runs on a worldwide network rather than through a bank. There will only ever be 21 million, it can be split into tiny amounts, and no government or bank can print more of it.' },
  { id: 'framework', term: 'Bitcoin Financial Framework', def: 'Our written structure for your Bitcoin. It separates what you hold into spending, savings and long-term vault, with clear instructions for each.' },
  { id: 'blockchain', term: 'Blockchain', def: 'The public record of every Bitcoin transaction, kept by thousands of computers around the world.' },
  { id: 'cold-storage', term: 'Cold storage', def: 'Keeping your keys completely offline, on a hardware wallet or on paper or metal backups. Best for long-term savings.' },
  { id: 'continuity-plan', term: 'Continuity Plan', def: 'Our ongoing support, renewed each year: periodic reviews, updates when life changes, and a known contact for your family in an emergency.' },
  { id: 'custody', term: 'Custody', def: 'In Bitcoin, custody simply means who holds the keys, and so who controls the money. It has nothing to do with children.' },
  { id: 'exchange', term: 'Exchange', def: 'A company where you can buy or sell Bitcoin with ordinary money. Useful for buying, but not the place to keep your savings, because the exchange holds the keys.' },
  { id: 'hardware-wallet', term: 'Hardware wallet (signing device)', def: 'A small device that keeps your keys offline, away from the internet. Used for Bitcoin you are keeping for the long term.' },
  { id: 'heir-executor', term: 'Heir and executor', def: 'An heir is someone who inherits. An executor is the person named in a will to carry out its wishes.' },
  { id: 'hot-wallet', term: 'Hot wallet', def: 'An app on your phone or computer that is connected to the internet. Handy for small, everyday amounts, less suited to savings.' },
  { id: 'inheritance-planning', term: 'Inheritance planning', def: 'Arranging things so your Bitcoin reaches the people you choose, with backups, written instructions and trusted contacts in place.' },
  { id: 'key-ceremony', term: 'Key ceremony', def: 'The guided session where your keys are created and checked, and your backups are made and verified. We guide; you hold the keys.' },
  { id: 'keys', term: 'Keys (private keys)', def: 'The secret codes that give control of Bitcoin. Whoever holds the keys can move the money. That is why we never hold yours.' },
  { id: 'lightning', term: 'Lightning', def: 'A faster layer built on top of Bitcoin for small, instant payments, such as buying a coffee.' },
  { id: 'map-of-keyholders', term: 'Map of keyholders (quorum)', def: 'Who holds which key, where each one is kept, and how many are needed to move the money. We design it around your family.' },
  { id: 'mining', term: 'Mining', def: 'How new transactions are checked and added to the blockchain. Miners use computing power and are paid in Bitcoin for doing so.' },
  { id: 'multisig', term: 'Multisig', def: 'A setup where more than one key is needed to move the money, for example any 2 of 3. No single key, person or place can move it alone.' },
  { id: 'multi-vendor-multisig', term: 'Multi-vendor multisig', def: 'Multisig where the keys sit on devices from different makers, so a fault with one company’s product cannot put your money out of reach.' },
  { id: 'passphrase', term: 'Passphrase', def: 'An extra word or phrase added to your recovery words, like a second lock. It adds protection, but it must be recorded or remembered exactly.' },
  { id: 'proof-of-life', term: 'Proof-of-life protocol', def: 'How time-delayed recovery works in practice. As long as you refresh your wallet within the time you set, your heirs’ key stays inactive. If you stop, it becomes usable.' },
  { id: 'recovery-plan', term: 'Recovery plan', def: 'Clear written instructions, and the people involved, so your family can recover the Bitcoin safely.' },
  { id: 'recovery-words', term: 'Recovery words (seed phrase)', def: 'A list of 12 or 24 words that can rebuild your keys if a device is lost. Anyone who has these words can move your Bitcoin, so they are kept private and backed up carefully.' },
  { id: 'sats', term: 'Sats (satoshis)', def: 'The smallest unit of Bitcoin. One Bitcoin is 100,000,000 sats.' },
  { id: 'self-custody', term: 'Self-custody', def: 'Holding your own keys yourself, rather than leaving your Bitcoin with an exchange or another company. It is the only way to fully own it.' },
  { id: 'single-point-of-failure', term: 'Single point of failure', def: 'Any one thing that, if lost, would cut off access to the money, such as one set of recovery words in one drawer, or one person who knows everything.' },
  { id: 'stewardship', term: 'Stewardship', def: 'Looking after wealth carefully over a long time so it can be passed on in good order. It is what we do alongside you after setup.' },
  { id: 'time-delayed-recovery', term: 'Time-delayed recovery', def: 'A way for your heirs to gain access only after a period you choose has passed. Until then, nothing changes hands.' },
  { id: 'transaction', term: 'Transaction', def: 'Sending Bitcoin from one address to another. Once confirmed, it cannot be reversed.' },
  { id: 'trusted-contact', term: 'Trusted contact', def: 'A person or firm, such as Schelling Point, who guides your family through recovery without ever having access to the money.' }
]

const es: GlossaryTerm[] = [
  { id: 'address', term: 'Dirección', def: 'Una cadena de letras y números que funciona como un número de cuenta para recibir Bitcoin. Se puede compartir sin problema.' },
  { id: 'alternative-backups', term: 'Respaldos alternativos', def: 'Copias adicionales de lo necesario para recuperar tu dinero, guardadas en lugares distintos, para que siempre tengas un plan B para moverlo o acceder a él.' },
  { id: 'bitcoin', term: 'Bitcoin', def: 'Dinero digital que funciona en una red mundial y no a través de un banco. Nunca habrá más de 21 millones, se puede dividir en cantidades muy pequeñas y ningún gobierno ni banco puede imprimir más.' },
  { id: 'framework', term: 'Marco Financiero Bitcoin', def: 'Nuestra estructura por escrito para tu Bitcoin. Separa lo que tienes en gasto, ahorro y bóveda a largo plazo, con instrucciones claras para cada parte.' },
  { id: 'blockchain', term: 'Blockchain', def: 'El registro público de todas las transacciones de Bitcoin, mantenido por miles de computadoras en todo el mundo.' },
  { id: 'cold-storage', term: 'Almacenamiento en frío', def: 'Mantener tus llaves completamente fuera de internet, en una billetera de hardware o en respaldos de papel o metal. Lo más adecuado para el ahorro a largo plazo.' },
  { id: 'continuity-plan', term: 'Plan de continuidad', def: 'Nuestro apoyo continuo, renovado cada año: revisiones periódicas, ajustes cuando cambia tu vida y un contacto conocido para tu familia en caso de emergencia.' },
  { id: 'custody', term: 'Custodia', def: 'En Bitcoin, custodia significa simplemente quién tiene las llaves y, por tanto, quién controla el dinero. No tiene nada que ver con los hijos.' },
  { id: 'exchange', term: 'Exchange', def: 'Una empresa donde puedes comprar o vender Bitcoin con dinero normal. Útil para comprar, pero no para guardar tus ahorros, porque el exchange tiene las llaves.' },
  { id: 'hardware-wallet', term: 'Billetera de hardware (dispositivo de firma)', def: 'Un pequeño dispositivo que guarda tus llaves fuera de internet. Se usa para el Bitcoin que conservas a largo plazo.' },
  { id: 'heir-executor', term: 'Heredero y albacea', def: 'Un heredero es quien hereda. Un albacea es la persona designada en un testamento para cumplir su voluntad.' },
  { id: 'hot-wallet', term: 'Billetera caliente', def: 'Una aplicación en tu teléfono o computadora conectada a internet. Práctica para cantidades pequeñas del día a día, menos adecuada para ahorrar.' },
  { id: 'inheritance-planning', term: 'Planificación de herencia', def: 'Organizar todo para que tu Bitcoin llegue a las personas que eliges, con respaldos, instrucciones por escrito y contactos de confianza.' },
  { id: 'key-ceremony', term: 'Ceremonia de llaves', def: 'La sesión guiada en la que se crean y comprueban tus llaves, y se hacen y verifican tus respaldos. Nosotros guiamos; tú tienes las llaves.' },
  { id: 'keys', term: 'Llaves (llaves privadas)', def: 'Los códigos secretos que dan el control del Bitcoin. Quien tiene las llaves puede mover el dinero. Por eso nunca tenemos las tuyas.' },
  { id: 'lightning', term: 'Lightning', def: 'Una capa más rápida construida sobre Bitcoin para pagos pequeños e instantáneos, como comprar un café.' },
  { id: 'map-of-keyholders', term: 'Mapa de llaves (quórum)', def: 'Quién guarda cada llave, dónde se guarda y cuántas hacen falta para mover el dinero. Lo diseñamos en torno a tu familia.' },
  { id: 'mining', term: 'Minería', def: 'El proceso por el que se comprueban las nuevas transacciones y se añaden a la blockchain. Los mineros usan potencia de cálculo y reciben Bitcoin a cambio.' },
  { id: 'multisig', term: 'Multifirma', def: 'Una configuración en la que se necesita más de una llave para mover el dinero, por ejemplo 2 de 3. Ninguna llave, persona o lugar puede moverlo por sí solo.' },
  { id: 'multi-vendor-multisig', term: 'Multifirma de varios fabricantes', def: 'Multifirma en la que las llaves están en dispositivos de distintos fabricantes, para que un fallo en el producto de una empresa no deje tu dinero fuera de tu alcance.' },
  { id: 'passphrase', term: 'Passphrase', def: 'Una palabra o frase adicional que se añade a tus palabras de recuperación, como un segundo candado. Añade protección, pero debe anotarse o recordarse exactamente.' },
  { id: 'proof-of-life', term: 'Protocolo de prueba de vida', def: 'Cómo funciona en la práctica la recuperación con demora. Mientras actualices tu billetera dentro del plazo que fijaste, la llave de tus herederos sigue inactiva. Si dejas de hacerlo, se activa.' },
  { id: 'recovery-plan', term: 'Plan de recuperación', def: 'Instrucciones claras por escrito, y las personas involucradas, para que tu familia pueda recuperar el Bitcoin de forma segura.' },
  { id: 'recovery-words', term: 'Palabras de recuperación (frase semilla)', def: 'Una lista de 12 o 24 palabras que permite reconstruir tus llaves si se pierde un dispositivo. Cualquiera que tenga estas palabras puede mover tu Bitcoin, así que se guardan en privado y con buenos respaldos.' },
  { id: 'sats', term: 'Sats (satoshis)', def: 'La unidad más pequeña de Bitcoin. Un bitcoin equivale a 100.000.000 sats.' },
  { id: 'self-custody', term: 'Autocustodia', def: 'Tener tus propias llaves tú mismo, en lugar de dejar tu Bitcoin en un exchange o en otra empresa. Es la única forma de ser plenamente dueño de él.' },
  { id: 'single-point-of-failure', term: 'Punto único de fallo', def: 'Cualquier elemento que, si se pierde, impediría acceder al dinero, como un único juego de palabras de recuperación en un cajón, o una sola persona que lo sabe todo.' },
  { id: 'stewardship', term: 'Acompañamiento (stewardship)', def: 'Cuidar el patrimonio con atención durante mucho tiempo para que pueda transmitirse en orden. Es lo que hacemos contigo después de la configuración.' },
  { id: 'time-delayed-recovery', term: 'Recuperación con demora', def: 'Una forma de que tus herederos solo puedan acceder después de que pase el plazo que tú elijas. Hasta entonces, nada cambia de manos.' },
  { id: 'transaction', term: 'Transacción', def: 'Enviar Bitcoin de una dirección a otra. Una vez confirmada, no se puede revertir.' },
  { id: 'trusted-contact', term: 'Contacto de confianza', def: 'Una persona o firma, como Schelling Point, que guía a tu familia en la recuperación sin tener nunca acceso al dinero.' }
]

const collator = (locale: string) => new Intl.Collator(locale, { sensitivity: 'base' })

export const glossaryFor = (locale: string): GlossaryTerm[] => {
  const list = locale === 'es' ? es : en
  const c = collator(locale)
  return [...list].sort((a, b) => c.compare(a.term, b.term))
}
