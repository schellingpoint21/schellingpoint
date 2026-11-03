// Case study content, English and Spanish.
// Pages: /case-studies (index) and /case-studies/[slug].
// To add a case study, append an entry to `caseStudies` and drop its PDF in public/downloads.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'quote'; text: string }
  | { type: 'flow' }

export interface Section {
  title: string
  blocks: Block[]
}

export interface CaseStudyCopy {
  eyebrow: string
  title: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  intro: string
  glance: { label: string; value: string }[]
  sections: Section[]
  flow: {
    reserve: string
    reserveNormal: string
    reserveLate: string
    ops: string
    opsNote: string
    revenue: string
    revenueNote: string
    float: string
    floatNote: string
    payees: string
    payeesNote: string
    sweep: string
    topUp: string
    monthly: string
    approved: string
    caption: string
  }
}

export interface CaseStudy {
  slug: string
  client: string
  date: string // ISO, for schema and sorting
  pdf: string
  en: CaseStudyCopy
  es: CaseStudyCopy
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'lightning-news',
    client: 'Lightning News',
    date: '2026-10-28',
    pdf: '/downloads/case-study-lightning-news.pdf',

    en: {
      eyebrow: 'Case study · Lightning News · October 2026',
      title: 'The Bitcoin start-up self-custody solution',
      subtitle:
        'How self-custody can be tailored to the exact needs of a Bitcoin start-up: a case study of a small Bitcoin publisher.',
      metaTitle: 'Case Study: Bitcoin Company Self-Custody for a Start-up',
      metaDescription:
        'How Lightning News will hold its company Bitcoin reserve in self-custody: a Liana multisig with a six-month recovery path, a separate operations wallet, and a payments agent with a hard monthly limit.',
      intro:
        'Lightning News is a popular news channel that has decided to hold its company Bitcoin in self-custody, structured so that neither the investor nor the operator can move the funds alone. The setup follows what we consider the gold standard for company self-custody: keys held on signing devices from different manufacturers, no single point of failure, and no one device, person or company that an attacker could compromise to reach the funds. If either key holder dies or becomes incapacitated, the funds remain accessible, and the monthly bills pay themselves within a fixed limit through an agent.',
      glance: [
        {
          label: 'Client',
          value:
            'Lightning News, a Bitcoin publisher run by its founder and backed by an investor'
        },
        {
          label: 'The problem',
          value:
            'One company reserve, two key holders, no plan for death, incapacity or disagreement'
        },
        {
          label: 'The reserve',
          value:
            "A wallet that the founder and the investor must both sign (2-of-2), with a lawyer's key that only becomes usable after six months of inactivity (any 2-of-3)"
        },
        {
          label: 'Day to day',
          value:
            'A separate operations wallet, plus a payments agent with a hard monthly limit'
        },
        {
          label: 'What changes',
          value:
            'No single person, including the lawyer, will be able to move the reserve alone. A death will be recoverable in months, not never.'
        }
      ],
      sections: [
        {
          title: 'The situation',
          blocks: [
            {
              type: 'p',
              text: 'Lightning News is a small Bitcoin publisher. The founder runs the business, and an investor backs it. Revenue arrives in Bitcoin, expenses go out in Bitcoin, and the company intends to keep a long-term reserve in Bitcoin.'
            },
            {
              type: 'p',
              text: 'Like many small Bitcoin start-ups, it wanted to build a reserve and hold it in self-custody, but fitting that to its governance structure was complex enough that the plan had been put on the back burner. The questions the founder and investor kept returning to were these:'
            },
            {
              type: 'list',
              items: [
                'If one of us dies tomorrow, can the company still reach its money?',
                'If we ever disagree, can either of us empty the reserve?',
                'Can the setup be simple and robust?',
                'Who pays the bills each month, and what stops a mistake from becoming a disaster?',
                'If a new investor joins, how do we change the setup without starting from scratch?'
              ]
            },
            {
              type: 'p',
              text: 'A custodian is the easy way out, but it gives up one of the main reasons for holding Bitcoin: control. Lightning News wants to keep the keys and answer these questions.'
            }
          ]
        },
        {
          title: 'What the structure has to do',
          blocks: [
            {
              type: 'p',
              text: 'We agreed five requirements before choosing any software or device:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'No one acts alone. Not the founder, not the investor, not an adviser, not us.',
                "A death or incapacity is recoverable. The surviving key holder can reach the reserve without the other's key.",
                'A disagreement cannot become a theft. Waiting out the other key holder gains nothing.',
                'Day-to-day spending stays simple. Paying a writer, or a dividend, should not need a signing ceremony.',
                'The structure can grow. A further investor can be added without anyone losing control in the process.'
              ]
            }
          ]
        },
        {
          title: 'The design: two wallets, two jobs',
          blocks: [
            {
              type: 'p',
              text: "The company's Bitcoin will be split by purpose. The reserve is for the long term and will be touched rarely, by both key holders together. The operations wallet runs the business and holds only what the coming months require. When the operations wallet holds more than six months of runway, 20% of it can be swept to the reserve."
            },
            { type: 'flow' }
          ]
        },
        {
          title: 'The reserve: who can sign, and when',
          blocks: [
            {
              type: 'p',
              text: 'The reserve will live in a Liana wallet with three keys: one for the founder, one for the investor and one for an independent lawyer. Liana lets a wallet change its signing rule depending on how long the coins have sat untouched.'
            },
            {
              type: 'table',
              head: ['Coins untouched for', 'Who can sign', 'What it is for'],
              rows: [
                [
                  'Less than 6 months',
                  'Founder and investor (2-of-2)',
                  "Normal use. The lawyer's key does nothing."
                ],
                [
                  '6 months or more',
                  'Any two of founder, investor, lawyer (2-of-3)',
                  'Death, incapacity, or a dispute decided by a court or arbitrator'
                ]
              ]
            },
            {
              type: 'p',
              text: "Every five months, the founder and the investor sign one transaction that moves the reserve back into the same wallet. This refresh resets the clock, so the lawyer's key never becomes usable while both are present and cooperating."
            },
            {
              type: 'quote',
              text: 'At every point in time, two people have to agree. The lawyer can never move funds alone, and neither can the founder or the investor.'
            }
          ]
        },
        {
          title: 'Three things that could go wrong, and what happens',
          blocks: [
            {
              type: 'h3',
              text: 'The founder dies, or is in hospital for months'
            },
            {
              type: 'p',
              text: "The investor stops receiving refresh requests. Once six months have passed since the last refresh, the investor and the lawyer sign together and move the reserve to a new wallet for the company. The lawyer signs only on proof (a death certificate, or medical evidence of incapacity) as set out in the shareholders' agreement. The founder's heirs inherit his stake in the company, not a key."
            },
            { type: 'h3', text: 'The founder and the investor fall out' },
            {
              type: 'p',
              text: 'One of them stops signing. Six months later, neither can act alone. The lawyer signs with one of them only to carry out a court order or an arbitration award. The lawyer does not judge the dispute, only enforces its outcome. Running out the clock gains nothing.'
            },
            { type: 'h3', text: 'A device is lost or a key is stolen' },
            {
              type: 'p',
              text: 'One key alone can never move the reserve. A key holder who loses a device restores it from one of their two backups and carries on. If a key may have been seen by someone else, the founder and the investor sign together, move the reserve to a fresh wallet, and retire the old keys. Only if a key holder loses the device and both backups does the six-month path come into play, and even then the reserve is recoverable.'
            },
            {
              type: 'p',
              text: 'The operations wallet carries the company through the wait. It holds enough to cover at least six months of expenses, so payroll and suppliers are paid while the reserve is being recovered.'
            }
          ]
        },
        {
          title: 'Keys, backups and custody maps',
          blocks: [
            {
              type: 'p',
              text: "Each key holder creates their own key, on their own signing device, in their own home or office. Nobody else sees it at any point: not the other key holders, and not Schelling Point. Only the public half of each key is shared to build the wallet. Each key holder uses a device from a different manufacturer, so a flaw in one brand's hardware or software cannot put the reserve at risk. Schelling Point keeps no copy of the wallet descriptor."
            },
            {
              type: 'p',
              text: "The lawyer is independent of the company's own counsel, so there is no conflict if the founder and the investor disagree. The lawyer's role is written into the shareholders' agreement and into a one-page instruction sheet: when to sign, what proof to require, and when to refuse."
            },
            {
              type: 'table',
              head: ['Key holder', 'Holds', 'Backups', 'Documents'],
              rows: [
                [
                  'Founder',
                  'Signing device',
                  'Two, in two separate places',
                  'Custody map, refresh instructions'
                ],
                [
                  'Investor',
                  'Signing device',
                  'Two, in two separate places',
                  'Custody map, refresh instructions'
                ],
                [
                  'Independent lawyer',
                  'Signing device',
                  'One, held by the firm',
                  'Key holder instructions'
                ]
              ]
            },
            {
              type: 'p',
              text: "Every key holder also keeps a copy of the wallet description file. It lists the three keys and the rules, and without it the wallet cannot be rebuilt. It cannot spend anything on its own, but it reveals the company's holdings, so it is kept private."
            },
            {
              type: 'p',
              text: 'Each custody map is one printed page, filled in by pen: where each backup is kept, who to call, and the rules in plain words. Locations are never typed into any file.'
            }
          ]
        },
        {
          title: 'Operations: the wallet that pays the bills',
          blocks: [
            {
              type: 'p',
              text: 'The reserve is for the long term. Running the business happens in a separate operations wallet, managed by a finance operator the company designates. That can be the founder, the investor or an independent bookkeeper; the structure works the same way.'
            },
            {
              type: 'list',
              items: [
                'Income arrives in the operations wallet, a self-custodial Spark wallet: the company holds its keys, and it receives both Lightning and on-chain payments.',
                "Top-ups from the reserve need both key holders' signatures, like any other spend from it.",
                'Surplus is swept into the reserve on a schedule the company sets, so the operations wallet never holds more than it needs.'
              ]
            },
            { type: 'h3', text: 'The payments agent' },
            {
              type: 'p',
              text: "Recurring costs (writers, hosting, subscriptions) are paid by a software agent. The limit on what it can spend is enforced by the wallet, not by the agent's instructions:"
            },
            {
              type: 'list',
              items: [
                'The agent controls a small float wallet, never the operations wallet itself.',
                "The finance operator tops the float up once a month with that month's payments, nothing more.",
                'The agent pays only payees on an approved list, and every payment is logged for the books.'
              ]
            },
            {
              type: 'p',
              text: "The worst case is that the agent loses one month's float. That is a limit a business can live with, and one anyone can explain in a sentence."
            }
          ]
        },
        {
          title: 'Rehearsal and the refresh routine',
          blocks: [
            {
              type: 'p',
              text: 'Before any real funds move, the key holders go through the structure together, more than once, so that they understand it in practice and not only on paper:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Receive. Each key holder generates an address and confirms it on their own device.',
                'Send. A small test amount goes out, with the founder and the investor signing remotely, each from their own location.',
                'Recover. On a separate practice wallet with a one-day timer instead of six months, they run the recovery path end to end: one of them and the lawyer signing together, as they would after a death.',
                'Refresh. They perform a refresh once, so the first real one is a repeat, not a first attempt.'
              ]
            },
            {
              type: 'p',
              text: 'The refresh is due every five months, leaving a month of margin before the six-month path opens. The key holders and Schelling Point all hold the date in their calendars.'
            }
          ]
        },
        {
          title: 'When a new investor joins',
          blocks: [
            {
              type: 'p',
              text: "A Bitcoin wallet's rules cannot be edited after it is created. Adding an investor means building a new wallet and moving the reserve into it, in one planned session:"
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'The new investor creates their key on their own device, the same way the existing key holders did.',
                "A new wallet is built: all three sign in normal use, and after six months any two of them, or one of them with the lawyer's key, can act. The exact rule follows the new shareholders' agreement (unanimity or majority).",
                'The current key holders sign one transaction moving the reserve from the old wallet to the new one.',
                'New backups and custody maps are made. The old wallet is emptied, and its descriptor and backups are retired.'
              ]
            },
            {
              type: 'p',
              text: "The wallet mirrors how decisions are made: its structure has to suit the company's governance."
            }
          ]
        },
        {
          title: 'The trade-offs',
          blocks: [
            {
              type: 'p',
              text: 'Every structure gives something up. These are the choices Lightning News has made, and why.'
            },
            {
              type: 'table',
              head: ['We chose', 'Over', 'Because'],
              rows: [
                [
                  'A lawyer holding a controlling key after 6 months',
                  'Letting either key holder act alone after 6 months',
                  'A timer alone means a disagreement can turn into a race to take the funds'
                ],
                [
                  'Six months',
                  'Twelve months',
                  'A shorter wait after a death, at the cost of refreshing more often'
                ],
                [
                  'A lawyer who enforces decisions',
                  'A lawyer who decides disputes',
                  'Courts and arbitrators judge; the key holder only carries out the result'
                ],
                [
                  'A Spark hot wallet for operations',
                  'Running the business from the reserve',
                  'Fast, cheap payments; because it is online, it holds only a few months of expenses'
                ],
                [
                  'A capped float for the agent',
                  'Giving the agent the operations wallet',
                  "A mistake costs one month's payments, not the business"
                ],
                [
                  'No further fallback after the lawyer',
                  'A third timer to a single key',
                  'It would only help if all three key holders were lost at once, and it would reopen the risk of one person acting alone'
                ]
              ]
            }
          ]
        },
        {
          title: 'What Lightning News will hold',
          blocks: [
            {
              type: 'list',
              items: [
                'A reserve that cannot be moved by one person, and that survives the death or incapacity of either key holder',
                'An operations wallet that runs the business without touching the reserve',
                'A payments agent with a limit enforced by the wallet itself',
                'A custody map and refresh instructions for the founder and the investor, and a key holder sheet for the lawyer'
              ]
            }
          ]
        }
      ],
      flow: {
        reserve: 'Long-term reserve (Liana)',
        reserveNormal: 'Normal use: founder + investor',
        reserveLate:
          'After 6 months unmoved: any 2 of founder, investor, lawyer',
        ops: 'Operations wallet (Spark)',
        opsNote: 'Run by the finance operator',
        revenue: 'Revenue',
        revenueNote: 'Lightning or on-chain',
        float: 'Agent float',
        floatNote: 'One month of payments, no more',
        payees: 'Approved payees',
        payeesNote: 'Writers, hosting, subscriptions',
        sweep: 'Surplus swept in',
        topUp: 'Top-up, both sign',
        monthly: 'Monthly top-up',
        approved: 'Approved list only',
        caption:
          'Money flows down the operations side every month. It crosses to the reserve in only two directions: surplus swept in, and top-ups that both key holders sign. The reserve is never touched for day-to-day spending.'
      }
    },

    es: {
      eyebrow: 'Caso de estudio · Lightning News · Octubre 2026',
      title: 'Autocustodia de Bitcoin para una start-up',
      subtitle:
        'Cómo adaptar la autocustodia a las necesidades exactas de una start-up de Bitcoin: el caso de un pequeño medio de comunicación.',
      metaTitle: 'Caso de estudio: autocustodia de Bitcoin para una empresa',
      metaDescription:
        'Cómo Lightning News custodiará la reserva de Bitcoin de su empresa: una billetera multifirma Liana con una vía de recuperación a seis meses, una billetera operativa separada y un agente de pagos con un límite mensual fijo.',
      intro:
        'Lightning News es un canal de noticias de Bitcoin que ha decidido mantener el Bitcoin de su empresa en autocustodia, con una estructura en la que ni el inversor ni el operador pueden mover los fondos por sí solos. El diseño sigue lo que consideramos el estándar de referencia para la autocustodia empresarial: llaves en dispositivos de firma de fabricantes distintos, ningún punto único de fallo y ningún dispositivo, persona o empresa que un atacante pueda comprometer para llegar a los fondos. Si cualquiera de los titulares de llave fallece o queda incapacitado, los fondos siguen siendo accesibles, y los pagos mensuales se realizan solos, dentro de un límite fijo, a través de un agente.',
      glance: [
        {
          label: 'Cliente',
          value:
            'Lightning News, un medio de Bitcoin dirigido por su fundador y respaldado por un inversor'
        },
        {
          label: 'El problema',
          value:
            'Una reserva de empresa, dos titulares de llave y ningún plan ante fallecimiento, incapacidad o desacuerdo'
        },
        {
          label: 'La reserva',
          value:
            'Una billetera que el fundador y el inversor deben firmar juntos (2 de 2), con una llave de un abogado que solo se activa tras seis meses de inactividad (2 de 3 cualesquiera)'
        },
        {
          label: 'El día a día',
          value:
            'Una billetera operativa separada y un agente de pagos con un límite mensual fijo'
        },
        {
          label: 'Qué cambia',
          value:
            'Ninguna persona, abogado incluido, podrá mover la reserva por sí sola. Un fallecimiento será recuperable en meses, no nunca.'
        }
      ],
      sections: [
        {
          title: 'La situación',
          blocks: [
            {
              type: 'p',
              text: 'Lightning News es un pequeño medio de comunicación sobre Bitcoin. El fundador dirige el negocio y un inversor lo respalda. Los ingresos llegan en Bitcoin, los gastos se pagan en Bitcoin y la empresa quiere mantener una reserva a largo plazo en Bitcoin.'
            },
            {
              type: 'p',
              text: 'Como muchas start-ups de Bitcoin, quería construir esa reserva y mantenerla en autocustodia, pero encajarla en su estructura de gobierno era lo bastante complejo como para que el plan quedara aparcado. Las preguntas a las que el fundador y el inversor volvían una y otra vez eran estas:'
            },
            {
              type: 'list',
              items: [
                'Si uno de nosotros fallece mañana, ¿puede la empresa seguir accediendo a su dinero?',
                'Si algún día no estamos de acuerdo, ¿puede cualquiera de los dos vaciar la reserva?',
                '¿Puede la estructura ser sencilla y robusta a la vez?',
                '¿Quién paga las facturas cada mes, y qué impide que un error se convierta en un desastre?',
                'Si entra un nuevo inversor, ¿cómo cambiamos la estructura sin empezar de cero?'
              ]
            },
            {
              type: 'p',
              text: 'Un custodio es la salida fácil, pero renuncia a una de las razones principales para tener Bitcoin: el control. Lightning News quiere conservar las llaves y responder a estas preguntas.'
            }
          ]
        },
        {
          title: 'Qué tiene que lograr la estructura',
          blocks: [
            {
              type: 'p',
              text: 'Acordamos cinco requisitos antes de elegir cualquier software o dispositivo:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Nadie actúa solo. Ni el fundador, ni el inversor, ni un asesor, ni nosotros.',
                'Un fallecimiento o una incapacidad son recuperables. El titular superviviente puede acceder a la reserva sin la llave del otro.',
                'Un desacuerdo no puede convertirse en un robo. Esperar a que el otro se rinda no aporta nada.',
                'El gasto diario sigue siendo sencillo. Pagar a un redactor, o un dividendo, no debe requerir una ceremonia de firma.',
                'La estructura puede crecer. Se puede incorporar otro inversor sin que nadie pierda el control durante el proceso.'
              ]
            }
          ]
        },
        {
          title: 'El diseño: dos billeteras, dos funciones',
          blocks: [
            {
              type: 'p',
              text: 'El Bitcoin de la empresa se divide según su función. La reserva es para el largo plazo y se toca en contadas ocasiones, siempre por los dos titulares juntos. La billetera operativa sostiene el negocio y solo guarda lo que requieren los próximos meses. Cuando la billetera operativa supera los seis meses de margen, el 20 % puede transferirse a la reserva.'
            },
            { type: 'flow' }
          ]
        },
        {
          title: 'La reserva: quién puede firmar y cuándo',
          blocks: [
            {
              type: 'p',
              text: 'La reserva estará en una billetera Liana con tres llaves: una del fundador, una del inversor y una de un abogado independiente. Liana permite que una billetera cambie su regla de firma según el tiempo que los fondos lleven sin moverse.'
            },
            {
              type: 'table',
              head: [
                'Fondos sin mover durante',
                'Quién puede firmar',
                'Para qué sirve'
              ],
              rows: [
                [
                  'Menos de 6 meses',
                  'Fundador e inversor (2 de 2)',
                  'Uso normal. La llave del abogado no tiene efecto.'
                ],
                [
                  '6 meses o más',
                  'Dos cualesquiera entre fundador, inversor y abogado (2 de 3)',
                  'Fallecimiento, incapacidad o una disputa resuelta por un tribunal o un árbitro'
                ]
              ]
            },
            {
              type: 'p',
              text: 'Cada cinco meses, el fundador y el inversor firman una transacción que devuelve la reserva a la misma billetera. Esta renovación reinicia el reloj, de modo que la llave del abogado nunca llega a activarse mientras ambos estén presentes y colaboren.'
            },
            {
              type: 'quote',
              text: 'En todo momento, dos personas tienen que estar de acuerdo. El abogado nunca puede mover los fondos solo, y tampoco el fundador ni el inversor.'
            }
          ]
        },
        {
          title: 'Tres cosas que podrían salir mal, y qué ocurre',
          blocks: [
            {
              type: 'h3',
              text: 'El fundador fallece, o pasa meses hospitalizado'
            },
            {
              type: 'p',
              text: 'El inversor deja de recibir solicitudes de renovación. Pasados seis meses desde la última, el inversor y el abogado firman juntos y trasladan la reserva a una nueva billetera de la empresa. El abogado solo firma con prueba (un certificado de defunción o evidencia médica de incapacidad), tal como establece el pacto de socios. Los herederos del fundador heredan su participación en la empresa, no una llave.'
            },
            { type: 'h3', text: 'El fundador y el inversor se enfrentan' },
            {
              type: 'p',
              text: 'Uno de los dos deja de firmar. Seis meses después, ninguno puede actuar solo. El abogado firma con uno de ellos únicamente para ejecutar una sentencia o un laudo arbitral. El abogado no juzga la disputa: solo ejecuta su resultado. Dejar correr el reloj no aporta nada.'
            },
            {
              type: 'h3',
              text: 'Se pierde un dispositivo o se roba una llave'
            },
            {
              type: 'p',
              text: 'Una sola llave nunca puede mover la reserva. Quien pierde un dispositivo lo restaura desde uno de sus dos respaldos y sigue adelante. Si existe la posibilidad de que alguien haya visto una llave, el fundador y el inversor firman juntos, trasladan la reserva a una billetera nueva y retiran las llaves antiguas. Solo si un titular pierde el dispositivo y sus dos respaldos entra en juego la vía de los seis meses, e incluso entonces la reserva es recuperable.'
            },
            {
              type: 'p',
              text: 'La billetera operativa sostiene a la empresa durante la espera. Guarda lo suficiente para cubrir al menos seis meses de gastos, de modo que nóminas y proveedores se pagan mientras se recupera la reserva.'
            }
          ]
        },
        {
          title: 'Llaves, respaldos y mapas de custodia',
          blocks: [
            {
              type: 'p',
              text: 'Cada titular crea su propia llave, en su propio dispositivo de firma, en su propia casa u oficina. Nadie más la ve en ningún momento: ni los otros titulares ni Schelling Point. Solo se comparte la parte pública de cada llave para construir la billetera. Cada titular usa un dispositivo de un fabricante distinto, de modo que un fallo en el hardware o el software de una marca no puede poner en riesgo la reserva. Schelling Point no guarda ninguna copia del descriptor de la billetera.'
            },
            {
              type: 'p',
              text: 'El abogado es independiente de los asesores legales habituales de la empresa, así que no hay conflicto si el fundador y el inversor discrepan. Su función queda recogida en el pacto de socios y en una hoja de instrucciones de una página: cuándo firmar, qué prueba exigir y cuándo negarse.'
            },
            {
              type: 'table',
              head: ['Titular', 'Tiene', 'Respaldos', 'Documentos'],
              rows: [
                [
                  'Fundador',
                  'Dispositivo de firma',
                  'Dos, en dos lugares distintos',
                  'Mapa de custodia, instrucciones de renovación'
                ],
                [
                  'Inversor',
                  'Dispositivo de firma',
                  'Dos, en dos lugares distintos',
                  'Mapa de custodia, instrucciones de renovación'
                ],
                [
                  'Abogado independiente',
                  'Dispositivo de firma',
                  'Uno, en poder del despacho',
                  'Instrucciones para el titular'
                ]
              ]
            },
            {
              type: 'p',
              text: 'Cada titular guarda también una copia del archivo de descripción de la billetera. Recoge las tres llaves y las reglas, y sin él no se puede reconstruir la billetera. Por sí solo no permite gastar nada, pero revela el patrimonio de la empresa, así que se mantiene en privado.'
            },
            {
              type: 'p',
              text: 'Cada mapa de custodia es una página impresa y rellenada a bolígrafo: dónde está cada respaldo, a quién llamar y las reglas en lenguaje claro. Las ubicaciones nunca se escriben en ningún archivo digital.'
            }
          ]
        },
        {
          title: 'Operaciones: la billetera que paga las facturas',
          blocks: [
            {
              type: 'p',
              text: 'La reserva es para el largo plazo. El negocio se gestiona desde una billetera operativa separada, a cargo de un responsable financiero que designa la empresa. Puede ser el fundador, el inversor o un contable independiente; la estructura funciona igual.'
            },
            {
              type: 'list',
              items: [
                'Los ingresos llegan a la billetera operativa, una billetera Spark en autocustodia: la empresa tiene sus llaves y recibe pagos tanto por Lightning como on-chain.',
                'Las recargas desde la reserva requieren la firma de ambos titulares, como cualquier otro gasto de ella.',
                'El excedente se transfiere a la reserva según un calendario que fija la empresa, de modo que la billetera operativa nunca guarda más de lo necesario.'
              ]
            },
            { type: 'h3', text: 'El agente de pagos' },
            {
              type: 'p',
              text: 'Los gastos recurrentes (redactores, hosting, suscripciones) los paga un agente de software. El límite de lo que puede gastar lo impone la billetera, no las instrucciones del agente:'
            },
            {
              type: 'list',
              items: [
                'El agente controla una pequeña billetera de fondo, nunca la billetera operativa.',
                'El responsable financiero recarga ese fondo una vez al mes con los pagos del mes, nada más.',
                'El agente solo paga a destinatarios de una lista aprobada, y cada pago queda registrado para la contabilidad.'
              ]
            },
            {
              type: 'p',
              text: 'En el peor de los casos, el agente pierde el fondo de un mes. Es un límite con el que una empresa puede vivir, y que cualquiera puede explicar en una frase.'
            }
          ]
        },
        {
          title: 'Ensayo y rutina de renovación',
          blocks: [
            {
              type: 'p',
              text: 'Antes de mover fondos reales, los titulares recorren la estructura juntos, más de una vez, para entenderla en la práctica y no solo sobre el papel:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Recibir. Cada titular genera una dirección y la confirma en su propio dispositivo.',
                'Enviar. Sale un pequeño importe de prueba, con el fundador y el inversor firmando a distancia, cada uno desde su ubicación.',
                'Recuperar. En una billetera de práctica con un temporizador de un día en lugar de seis meses, recorren la vía de recuperación de principio a fin: uno de ellos y el abogado firmando juntos, como harían tras un fallecimiento.',
                'Renovar. Realizan una renovación, para que la primera real sea una repetición y no un primer intento.'
              ]
            },
            {
              type: 'p',
              text: 'La renovación toca cada cinco meses, lo que deja un mes de margen antes de que se abra la vía de los seis meses. Los titulares y Schelling Point tienen la fecha en sus calendarios.'
            }
          ]
        },
        {
          title: 'Cuando entra un nuevo inversor',
          blocks: [
            {
              type: 'p',
              text: 'Las reglas de una billetera de Bitcoin no se pueden editar una vez creada. Incorporar un inversor significa construir una billetera nueva y trasladar a ella la reserva, en una sesión planificada:'
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'El nuevo inversor crea su llave en su propio dispositivo, igual que hicieron los titulares actuales.',
                'Se construye una billetera nueva: en uso normal firman los tres, y tras seis meses pueden actuar dos cualesquiera de ellos, o uno de ellos con la llave del abogado. La regla exacta sigue el nuevo pacto de socios (unanimidad o mayoría).',
                'Los titulares actuales firman una transacción que traslada la reserva de la billetera antigua a la nueva.',
                'Se crean nuevos respaldos y mapas de custodia. La billetera antigua se vacía, y su descriptor y respaldos se retiran.'
              ]
            },
            {
              type: 'p',
              text: 'La billetera refleja cómo se toman las decisiones: su estructura tiene que ajustarse al gobierno de la empresa.'
            }
          ]
        },
        {
          title: 'Las concesiones',
          blocks: [
            {
              type: 'p',
              text: 'Toda estructura renuncia a algo. Estas son las decisiones que ha tomado Lightning News, y por qué.'
            },
            {
              type: 'table',
              head: ['Elegimos', 'Frente a', 'Porque'],
              rows: [
                [
                  'Un abogado con una llave decisiva tras 6 meses',
                  'Que cualquiera de los titulares pueda actuar solo tras 6 meses',
                  'Un temporizador por sí solo convierte un desacuerdo en una carrera por llevarse los fondos'
                ],
                [
                  'Seis meses',
                  'Doce meses',
                  'Una espera más corta tras un fallecimiento, a cambio de renovar con más frecuencia'
                ],
                [
                  'Un abogado que ejecuta decisiones',
                  'Un abogado que resuelve disputas',
                  'Juzgan los tribunales y los árbitros; el titular de la llave solo ejecuta el resultado'
                ],
                [
                  'Una billetera caliente Spark para operaciones',
                  'Gestionar el negocio desde la reserva',
                  'Pagos rápidos y baratos; al estar en línea, solo guarda unos meses de gastos'
                ],
                [
                  'Un fondo limitado para el agente',
                  'Dar al agente la billetera operativa',
                  'Un error cuesta los pagos de un mes, no la empresa'
                ],
                [
                  'Ninguna alternativa adicional tras el abogado',
                  'Un tercer temporizador hacia una sola llave',
                  'Solo ayudaría si se perdieran a la vez los tres titulares, y reabriría el riesgo de que una persona actúe sola'
                ]
              ]
            }
          ]
        },
        {
          title: 'Con qué contará Lightning News',
          blocks: [
            {
              type: 'list',
              items: [
                'Una reserva que nadie puede mover por sí solo y que sobrevive al fallecimiento o la incapacidad de cualquiera de los titulares',
                'Una billetera operativa que sostiene el negocio sin tocar la reserva',
                'Un agente de pagos con un límite impuesto por la propia billetera',
                'Un mapa de custodia e instrucciones de renovación para el fundador y el inversor, y una hoja de instrucciones para el abogado'
              ]
            }
          ]
        }
      ],
      flow: {
        reserve: 'Reserva a largo plazo (Liana)',
        reserveNormal: 'Uso normal: fundador + inversor',
        reserveLate:
          'Tras 6 meses sin mover: 2 cualesquiera entre fundador, inversor y abogado',
        ops: 'Billetera operativa (Spark)',
        opsNote: 'A cargo del responsable financiero',
        revenue: 'Ingresos',
        revenueNote: 'Lightning u on-chain',
        float: 'Fondo del agente',
        floatNote: 'Los pagos de un mes, nada más',
        payees: 'Destinatarios aprobados',
        payeesNote: 'Redactores, hosting, suscripciones',
        sweep: 'Excedente a la reserva',
        topUp: 'Recarga, firman ambos',
        monthly: 'Recarga mensual',
        approved: 'Solo lista aprobada',
        caption:
          'El dinero fluye cada mes por el lado operativo. Solo cruza hacia o desde la reserva en dos sentidos: el excedente que entra y las recargas que firman ambos titulares. La reserva nunca se toca para el gasto diario.'
      }
    }
  }
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
