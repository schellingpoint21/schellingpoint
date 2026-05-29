<script setup lang="ts">
  const { locale } = useI18n()

  const isEs = computed(() => locale.value === 'es')

  const title = computed(() =>
    isEs.value
      ? '¿Qué es la planificación patrimonial con Bitcoin?'
      : 'What Is Bitcoin Estate Planning?'
  )

  const subtitle = computed(() =>
    isEs.value
      ? 'Una guía para familias y family offices que preparan Bitcoin como capital multigeneracional.'
      : 'A guide for families and family offices preparing Bitcoin as multi-generational capital.'
  )

  const eyebrow = computed(() =>
    isEs.value
      ? 'DOCUMENTO FUNDACIONAL  ·  LECTURA DE 10 MIN  ·  MAYO 2026'
      : 'CORNERSTONE  ·  10 MIN READ  ·  MAY 2026'
  )

  const description = computed(() =>
    isEs.value
      ? 'Una guía para familias y family offices que preparan Bitcoin como capital multigeneracional. Seguro, usable y heredable a través de las generaciones.'
      : 'A guide for families and family offices preparing Bitcoin as multi-generational capital. Secure, usable, survivable across generations.'
  )

  const backLink = computed(() => (isEs.value ? '/es' : '/'))
  const backLabel = computed(() =>
    isEs.value ? '← Volver al inicio' : '← Back home'
  )

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: 'article'
  })
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <article class="container mx-auto px-6 py-12 max-w-3xl">
      <NuxtLink
        :to="backLink"
        class="text-muted-foreground hover:text-primary transition-colors mb-8 inline-block text-base"
      >
        {{ backLabel }}
      </NuxtLink>

      <header class="mb-10">
        <p
          class="text-xs tracking-widest text-muted-foreground uppercase mb-6 font-medium"
        >
          {{ eyebrow }}
        </p>
        <h1
          class="font-bold text-4xl md:text-5xl mb-6 leading-tight tracking-tight"
        >
          {{ title }}
        </h1>
        <p class="text-xl text-muted-foreground leading-relaxed">
          {{ subtitle }}
        </p>
      </header>

      <!-- ENGLISH CONTENT -->
      <div
        v-if="!isEs"
        class="prose prose-lg prose-invert max-w-none
               prose-headings:text-foreground prose-headings:font-bold
               prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-3
               prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
               prose-p:text-foreground prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
               prose-blockquote:border-l-primary prose-blockquote:text-foreground
               prose-blockquote:italic prose-blockquote:font-medium"
      >
        <p class="italic text-lg">
          Bitcoin estate planning is the practice of preparing an estate that holds Bitcoin as the foundational savings vehicle. It should be structured so the capital is secure under self-custody, usable by the family it serves, and lasts across generations. It sits at the intersection of three things wealth has traditionally kept separate: the asset, the operational technicalities that keep it from being in the wrong hands, and the human protocol that allows it to pass from one generation to the next. Done well, it is discreet, structured, and reassuring. Done poorly, it is the most expensive mistake a family will ever make.
        </p>

        <h2>Global conditions and what we are planning for</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">The fiscal backdrop driving capital toward bearer assets.</p>
        <p>Step back from Bitcoin for a moment and look at the financial landscape families with significant capital are operating in today. Sovereign debt across the developed world has expanded to levels that, by any historical measure, are without precedent during times of peace. The United States, the United Kingdom, France, Japan, and much of the eurozone now carry debt loads that exceed the size of their annual economies. Servicing that debt now consumes a meaningful share of government revenue in several major economies, and liabilities for social services, that are political suicide to cut, are growing rapidly. They have few options on how to respond to these ballooning liabilities.</p>
        <p>Governments respond to fiscal pressure in predictable ways across the world. As the pressure ramps up they look for new sources of revenue. They are forced to track what their citizens earn and hold as wealth, and through various tactics implement laws and policies that increase costs for citizens in multiple ways. They lean heavily on the institutions they can influence directly. This includes the banking system, insurance industry, and the major asset custodians that hold most of family wealth. The line that once separated private finance from state policy has thinned. Any financial institution is under strict supervision and becomes a way for the state to monetise its citizens further, whether through random levies or exit taxes for pensioners as examples. In many jurisdictions, accounts have been frozen, payments have been blocked, and access has been revoked to their money because government policy did not agree with the citizen in question. This is what fiscally strained states tend to do, and have always done, when debts increase and conditions tighten.</p>
        <p>Families that have built productive value over decades (whether through businesses, through professional careers, or through patient investment) find themselves holding capital that lives almost entirely inside what most people consider the traditional financial system. Their banking relationships, their brokerage accounts, their trust structures, their cross-border arrangements all depend on intermediaries operating under increasing constraint, and ultimately beholden to a small group of people who have a say on whether they can be part of that system or not. For most generations, that was an acceptable trade, because the system was stable enough that the dependency was not apparent. Today, that dependency is becoming increasingly obvious.</p>
        <p>It is in this context that an under-the-radar, deliberate movement of liquid capital toward Bitcoin is underway. This movement of capital is not chasing quick returns or speculation, but moving because Bitcoin is the only meaningful financial asset in the world that a family can own outright, move easily, and protect cheaply without the consent or cooperation of any third party. The shift is happening among first-generation entrepreneurs, established family offices, and traditional investment corporations who would not have looked at Bitcoin five years ago. As Bitcoin compounds into a multi-trillion-dollar asset class, the question is not whether families will hold it but how they will hold it, and whether the structure they choose will still serve them in twenty or fifty years.</p>

        <h2>Why Bitcoin, specifically</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Four properties that matter for multi-generational planning.</p>
        <p>Bitcoin is unusual among financial assets in four ways that matter for multi-generational planning, and all four flow from the same source: it is the only digital bearer instrument in widespread existence.</p>

        <h3>Held outright</h3>
        <p>It can be held with no third-party custodian, in a form the holder personally controls. When you have control, there is no bank to call, no broker to instruct, no fund administrator to clear an action in order to use your wealth. There is no way anyone can block you from using it. This is the property that makes Bitcoin viable as long-term family capital under the conditions described above.</p>

        <h3>Neutral</h3>
        <p>There is no one who can hack into the system, command control over how it flows, or who uses it; the network remains functioning under all conditions. That neutrality is what makes Bitcoin durable across political cycles, and across the jurisdictional changes that most multi-generational wealth eventually requires.</p>

        <h3>Fixed in supply</h3>
        <p>There will never be more than 21 million Bitcoin. This is what makes it a credible store of value across time horizons measured in decades rather than quarters, and what incentivises any holder to think generationally.</p>

        <h3>Verifiable</h3>
        <p>Every unit, every transaction, every reserve held can be checked by the family or its advisers without relying on a third party's assurance. For an estate that may need to demonstrate provenance and custody to executors, trustees and heirs across many decades, this matters more than it first appears.</p>

        <blockquote>"The shift is happening among first-generation entrepreneurs, established family offices, and traditional investment corporations who would not have looked at Bitcoin five years ago."</blockquote>

        <h2>What Bitcoin estate planning is</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Structure for the asset, the family, and the time horizon.</p>
        <p>Bitcoin estate planning is the practice of preparing the family estate that has Bitcoin as the backbone of the family patrimony, in a way that supports the family with respect to their existing assets, their human capital, and their intellectual capital. Let us unpack this:</p>

        <h3>The structure that holds the asset</h3>
        <p>What we want is to prepare the structure that holds and governs the asset (i.e. the wallets, the keys, the supporting documents, the people, the protocols, the contingencies) so that the asset performs its function as long-term capital and serves the family's long-term objectives. The family must be intimately aware of what they are holding if they wish to take custody over their Bitcoin. Not just the head of the family, but the family as a whole.</p>

        <h3>Bitcoin as the main savings vehicle</h3>
        <p>For many of the families now reaching for it, Bitcoin is not a fraction of a diversified portfolio. It is their main savings vehicle, and they expect it to do the heaviest lifting over the longest time horizon. That changes the planning question fundamentally. It is instrumental to truly take care of the internal policies that a family decides to put in place around their main savings vehicle. This is fundamentally different from a savings account at a bank. This is a reserve set to grow and to serve as the capital the family structures their operations and education around, much as land and property have been treated by many families throughout the ages.</p>

        <h3>It complements existing advisers</h3>
        <p>A real Bitcoin estate plan does not require the family to abandon their wealth manager, their attorney, their family office, or their accountant. It complements them. It is built to fit alongside trust structures, business holdings, real estate, and traditional portfolios. Even though over time Bitcoin will absorb a substantial part of the wealth currently held in these assets, it is not there to compete with them. Schelling Point's role is precisely to be the discreet partner that handles the Bitcoin layer of a family's affairs while everyone else continues their established work.</p>

        <h3>It accounts for human and intellectual capital</h3>
        <p>The Bitcoin estate plan accounts for human capital and intellectual capital. Handling the asset can be easy once understood, as it's just logic. The hard part is the people: the spouse who must be able to operate the system in an emergency; the adult children who will inherit it; the executor who has never held Bitcoin; the trusted family member who holds a key. A Bitcoin estate plan is, at its core, a plan for how trusted human beings interact with a technical, unchanging system over decades. If you get the human design wrong, the technical design will fail, regardless of how well it is built.</p>

        <h2>The dimensions a real Bitcoin estate plan addresses</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Seven areas every meaningful position will encounter.</p>
        <p>Below are the dimensions a well-prepared Bitcoin estate plan covers. Not all of them apply to every family on day one. But each becomes relevant as the position grows and the time horizon lengthens, and skipping any of them tends to create the failure modes described in the next section.</p>

        <h3>Custody architecture and key policy</h3>
        <p>The most fundamental decision: how is the Bitcoin held, and by whom. For meaningful positions with multiple stakeholders, this might mean a multi-signature setup: a structure where several keys, held by different parties in different locations, are required to authorise any movement of funds. Multi-signature is a design within the protocol, and it requires intelligent structure. The right design involves choices about how many keys are required, where each lives, who has access to them, how they are rotated if and when a key holder changes, and how the system continues to function when one or two keys are unavailable or have gone missing. The right design for a single holder living in one jurisdiction is very different from the right design for a family with members on three continents and assets that must remain accessible to all of them.</p>

        <h3>Drawdown and treasury policy</h3>
        <p>Once the family holds meaningful Bitcoin, the question of how much to spend, when, and from which security layer becomes a real treasury question. A working framework separates Bitcoin into operational tranches: funds that may be used in the near term, funds that are held as longer-term savings, and funds that constitute the long-term vault. Each tranche has its own security posture, its own access protocol, and its own rules about when it is drawn down. Most families find that the discipline of writing this policy down, even informally, clarifies decisions they had been making implicitly and inconsistently.</p>

        <h3>Bitcoin as collateral</h3>
        <p>For families that prefer not to sell, Bitcoin can be used as collateral against loans for liquidity, for tax efficiency, or for specific deployments such as real estate acquisitions or business investments. The collateral landscape is evolving, with regulated providers now offering structured products that were not available even three years ago. The planning question is which providers, at which loan-to-value ratios, at what interest rates, under which jurisdictions, and with what tail-risk protections in place. Used carefully, Bitcoin-backed credit allows the family to access spending power without triggering a taxable event or surrendering the long-term Bitcoin position. Used carelessly, it creates exactly the third-party dependency the family was trying to avoid, or a liquidity event that wipes their position out.</p>

        <h3>Exit liquidity and conversion</h3>
        <p>When Bitcoin must be converted to local currency (whether for a purchase, a tax payment, or a distribution to a family member) the question of how matters more than most families realise. Commissions on exchanges can vary widely while OTC desks offer better pricing depending on transaction size and ongoing relationships. Jurisdictional structure affects taxation, reporting, and the speed of settlement. A plan that anticipates these conversions in advance, with relationships already in place, can save the family meaningful sums of money and time, and avoid the operational risk of arranging a large transaction under time pressure.</p>

        <h3>Privacy of holdings</h3>
        <p>Bitcoin is fully transparent on its public ledger. If the family want to take their financial privacy seriously, they must use the right tools and understand how the protocol works. A well-structured estate uses Bitcoin's properties to maintain discretion appropriate to the family's needs: who at the wealth manager knows the size of the position; who at the family office; what the children know at what age; what an executor or trustee learns when, and only when, required. Most importantly, the identity of the family is not tied to the holdings for particular people to see. Privacy is the deliberate choice of what is disclosed to whom, and when.</p>

        <h3>Inheritance protocol</h3>
        <p>The actual transfer of Bitcoin from one generation to the next is the moment most Bitcoin self-custody fails. When interviewing a large proportion of Bitcoiners and future clients, the setup for inheritance has almost always been sub-par. A real inheritance protocol is not just a sealed envelope in a safe that was mentioned once. It is a written, rehearsed, jurisdictionally aware procedure that addresses: who is notified when the main holder becomes incapacitated or passes away; who holds which keys; how those parties verify each other and coordinate; how trustees and executors who are not Bitcoin-fluent participate; how the transfer is structured to satisfy probate or trust requirements; and how the heirs can operate the system after they have inherited it. A plan that the family has not rehearsed is, in practice, not a plan.</p>

        <h3>Expenditure policy</h3>
        <p>Finally, the family's own rules about how Bitcoin is used. Many principal holders find that a written expenditure policy e.g. what the Bitcoin is for, what it is not for, who may authorise a draw and under what conditions, does substantial work to align children, spouses, and trustees over decades. The policy must be derived from the conversation that produces it. Those conversations can be uncomfortable and may even seem unnecessary or painful, but families that hold this conversation early tend to make better decisions down the line. Families that postpone it tend to discover, often painfully, that they did not share the assumptions they thought they shared.</p>

        <h2>What goes wrong when this is mismanaged</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Failure modes we have personally encountered.</p>
        <p>Bitcoin self-custody is rigorous work. The asset rewards careful operators and punishes those who take the work casually, often in ways that are irreversible. That is Bitcoin's nature: irreversible. The failure modes described below are not theoretical. Each of them has played out, often more than once, in families and institutions that thought they had the system handled well. We have personally encountered multiple scenarios similar to these.</p>

        <h3>Funds locked because heirs cannot access them</h3>
        <p>This is the most common failure mode. The principal had a well-designed wallet and all of the tools they would have needed, but the next of kin was not informed correctly; the importance of passing on the funds did not seem to be at the top of anyone's mind; and the work of an individual's lifetime was effectively donated to the Bitcoin network instead of the designated individual or group of people.</p>

        <h3>Funds lost through a single point of failure</h3>
        <p>A single hardware wallet, a single seed phrase, a single location, a single trusted person. Bitcoin self-custody concentrates risk in whichever element was not made redundant. Events such as a house fire, theft, sudden death, or a contested divorce can be a threat to your Bitcoin. Any one of these can be detrimental to a position that depended on a single point that was never made redundant. Multi-signature is the most popular structural answer to this problem but only if it is implemented with genuine geographic and personal separation, and with enough redundancy in place to survive the loss of one or more individual keys.</p>

        <h3>Funds exposed because privacy was poorly handled</h3>
        <p>Holdings disclosed to too many people or at the wrong time. Wallet labels that revealed structure to anyone who saw a transaction. The family that lives in a discreet manner with a serious Bitcoin position is the family that planned its disclosure deliberately. The family that does not plan disclosure is the family whose holdings become a topic of conversation in circles where they should never have been a topic at all. If you are planning on amassing a large Bitcoin holding, our serious suggestion is to take your privacy seriously. The purchase and storage should have as little identification leakage as possible.</p>

        <h3>Funds taxed catastrophically because conversions were naive</h3>
        <p>Large transactions executed without prior structuring; jurisdictions chosen without considering the treatment of capital gains on Bitcoin; trust structures that were appropriate for traditional assets but generated unintended consequences when Bitcoin was held inside them. The marginal cost of getting the structure right beforehand is much smaller than the cost of getting it wrong down the line, on a position that has compounded for a decade or more.</p>

        <blockquote>"The marginal cost of getting the structure right beforehand is much smaller than the cost of getting it wrong down the line, on a position that has compounded for a decade or more."</blockquote>

        <h2>The Schelling Point approach</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Advisory, not custody. Discreet, structured, long-term.</p>
        <p>Schelling Point exists to be the partner a family or family office calls when they want their Bitcoin handled with total seriousness and professionalism, while remaining in self-custody, in control, and as discreet as they want to be.</p>
        <p>We do not take custody of client funds. We never have. The principal and their family retain full control of their keys, their hardware, and their assets at every stage. Our role is to design the structure, build it alongside the family, document the protocols, train the people involved, and remain available as the long-term advisory presence that ensures the system continues to function as the family and the asset both evolve over decades, and as generations succeed one another.</p>
        <p>We work alongside the family's existing advisers. Each adviser is part of the body that makes the estate work. Schelling Point handles the Bitcoin layer. We handle the custody architecture, the key policy, the inheritance protocol, the operational discipline to keep this in shape, and Bitcoin's role within the broader financial asset category. We integrate this with the structures that are already in place. For family offices that have begun to receive client questions about Bitcoin and do not yet have an internal answer, we operate as the trusted Bitcoin counterpart that the family office can reach for without compromising its own position.</p>
        <p>We are headquartered in El Salvador, which today maintains the clearest legal and regulatory framework in the world for holding Bitcoin as long-term capital. We serve clients globally and remotely, and we work in English and Spanish.</p>

        <h2>Where to start</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">A private strategy session, with no obligation.</p>
        <p>Most families do not need a complete system on day one. What they need is a clear and comprehensive conversation with someone who has worked through these questions with other families holding meaningful Bitcoin, and who can map the right next step for their specific situation. That conversation typically covers the size of the position, the family structure, the existing advisers and their roles, the jurisdictional considerations, and the time horizon for the different portions of Bitcoin within the estate.</p>
        <p>If you would like to have that conversation, the right place to begin is a private strategy session. There is no obligation, no cost, and no expectation of moving forward beyond it. We will listen carefully, ask the questions that matter for your specific situation, and tell you honestly what we believe the right next step is, whether that involves us or not.</p>

        <blockquote>Done well, Bitcoin estate planning is discreet, structured, and reassuring. Done poorly, it is the most expensive mistake a family will ever make. The difference is almost always in the preparation.</blockquote>
        <p class="text-right text-muted-foreground italic mt-8">— Schelling Point</p>
      </div>

      <!-- SPANISH CONTENT -->
      <div
        v-else
        class="prose prose-lg prose-invert max-w-none
               prose-headings:text-foreground prose-headings:font-bold
               prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-3
               prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
               prose-p:text-foreground prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
               prose-blockquote:border-l-primary prose-blockquote:text-foreground
               prose-blockquote:italic prose-blockquote:font-medium"
      >
        <p class="italic text-lg">
          La planificación patrimonial con Bitcoin es la práctica de preparar un patrimonio que tiene a Bitcoin como vehículo de ahorro fundacional. Debe estructurarse de modo que el capital esté seguro bajo autocustodia, sea utilizable por la familia a la que sirve y perdure a través de las generaciones. Se sitúa en la intersección de tres cosas que la riqueza tradicionalmente ha mantenido separadas: el activo, las tecnicidades operativas que evitan que caiga en las manos equivocadas y el protocolo humano que permite que pase de una generación a la siguiente. Bien hecha, es discreta, estructurada y tranquilizadora. Mal hecha, es el error más costoso que una familia cometerá en su historia.
        </p>

        <h2>Condiciones globales y para qué estamos planificando</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">El contexto fiscal que empuja al capital hacia los activos al portador.</p>
        <p>Apartémonos por un momento de Bitcoin y miremos el panorama financiero en el que operan hoy las familias con capital significativo. La deuda soberana en el mundo desarrollado se ha expandido a niveles que, por cualquier medida histórica, no tienen precedente en tiempos de paz. Estados Unidos, el Reino Unido, Francia, Japón y gran parte de la eurozona cargan ahora con niveles de deuda que superan el tamaño de sus economías anuales. El servicio de esa deuda consume ya una porción considerable de los ingresos públicos en varias de las economías principales, y las obligaciones por servicios sociales —cuyo recorte sería un suicidio político— crecen aceleradamente. Tienen pocas opciones sobre cómo responder a esas obligaciones en expansión.</p>
        <p>Los gobiernos responden a la presión fiscal de maneras predecibles en todo el mundo. A medida que la presión aumenta, buscan nuevas fuentes de ingreso. Se ven forzados a rastrear lo que sus ciudadanos ganan y mantienen como riqueza, y mediante distintas tácticas implementan leyes y políticas que elevan los costos para los ciudadanos por múltiples vías. Se apoyan con fuerza en las instituciones que pueden influenciar directamente. Esto incluye el sistema bancario, la industria aseguradora y los grandes custodios de activos que resguardan la mayor parte de la riqueza familiar. La línea que antes separaba a las finanzas privadas de la política estatal se ha vuelto fina. Cualquier institución financiera está bajo supervisión estricta y se convierte en una vía para que el Estado monetice aún más a sus ciudadanos, ya sea mediante gravámenes inesperados o impuestos de salida para los pensionados, por ejemplo. En muchas jurisdicciones, se han congelado cuentas, se han bloqueado pagos y se ha revocado el acceso al dinero porque la política gubernamental no concordaba con el ciudadano en cuestión. Esto es lo que los Estados fiscalmente presionados tienden a hacer, y siempre han hecho, cuando las deudas aumentan y las condiciones se endurecen.</p>
        <p>Las familias que han construido valor productivo a lo largo de décadas (ya sea a través de empresas, de carreras profesionales o de inversión paciente) se encuentran con capital que vive casi por completo dentro de lo que la mayoría considera el sistema financiero tradicional. Sus relaciones bancarias, sus cuentas de corretaje, sus estructuras fiduciarias y sus arreglos transfronterizos dependen todos de intermediarios que operan bajo restricciones crecientes, y que en última instancia están sujetos a un grupo reducido de personas que decide si pueden o no formar parte de ese sistema. Para la mayoría de las generaciones, ese era un canje aceptable porque el sistema era lo bastante estable como para que la dependencia no fuera evidente. Hoy, esa dependencia se hace cada vez más obvia.</p>
        <p>Es en este contexto donde se está desarrollando un movimiento deliberado, y en gran medida bajo el radar, de capital líquido hacia Bitcoin. Este movimiento de capital no persigue rendimientos rápidos ni especulación; se mueve porque Bitcoin es el único activo financiero significativo en el mundo que una familia puede poseer plenamente, mover con facilidad y proteger a bajo costo sin el consentimiento ni la cooperación de ningún tercero. El cambio está ocurriendo entre emprendedores de primera generación, family offices consolidadas y corporaciones de inversión tradicionales que hace cinco años no habrían mirado a Bitcoin. A medida que Bitcoin se compone hasta convertirse en una clase de activo de varios billones de dólares, la pregunta ya no es si las familias lo tendrán, sino cómo lo tendrán, y si la estructura que elijan seguirá sirviéndoles en veinte o cincuenta años.</p>

        <h2>Por qué Bitcoin, específicamente</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Cuatro propiedades que importan para la planificación multigeneracional.</p>
        <p>Bitcoin es inusual entre los activos financieros en cuatro aspectos que importan para la planificación multigeneracional, y los cuatro provienen de la misma fuente: es el único instrumento digital al portador de existencia generalizada.</p>

        <h3>Propiedad directa</h3>
        <p>Puede mantenerse sin custodio externo, en una forma que el tenedor controla personalmente. Cuando usted tiene el control, no hay un banco al que llamar, ni un corredor al que instruir, ni un administrador de fondo que tenga que autorizar una operación para que usted pueda usar su patrimonio. No hay manera de que alguien pueda impedirle usarlo. Esta es la propiedad que hace de Bitcoin un capital familiar viable a largo plazo bajo las condiciones descritas arriba.</p>

        <h3>Neutral</h3>
        <p>No hay nadie que pueda intervenir el sistema, controlar cómo fluye, ni decidir quién lo usa; la red sigue funcionando bajo cualquier condición. Esa neutralidad es lo que hace a Bitcoin duradero a lo largo de los ciclos políticos, y a través de los cambios de jurisdicción que la mayoría de la riqueza multigeneracional termina requiriendo.</p>

        <h3>Suministro fijo</h3>
        <p>Nunca habrá más de 21 millones de bitcoins. Esto es lo que lo convierte en una reserva de valor creíble en horizontes de tiempo medidos en décadas y no en trimestres, y lo que incentiva a cualquier tenedor a pensar en términos generacionales.</p>

        <h3>Verificable</h3>
        <p>Cada unidad, cada transacción, cada reserva mantenida puede ser comprobada por la familia o por sus asesores sin depender de la palabra de un tercero. Para un patrimonio que pueda necesitar demostrar procedencia y custodia a albaceas, fideicomisarios y herederos a lo largo de muchas décadas, esto importa más de lo que parece a primera vista.</p>

        <blockquote>"El cambio está ocurriendo entre emprendedores de primera generación, family offices consolidadas y corporaciones de inversión tradicionales que hace cinco años no habrían mirado a Bitcoin."</blockquote>

        <h2>Qué es la planificación patrimonial con Bitcoin</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Estructura para el activo, la familia y el horizonte de tiempo.</p>
        <p>La planificación patrimonial con Bitcoin es la práctica de preparar el patrimonio familiar que tiene a Bitcoin como columna vertebral, de modo que apoye a la familia respecto de sus activos existentes, su capital humano y su capital intelectual. Desglosémoslo:</p>

        <h3>La estructura que resguarda el activo</h3>
        <p>Lo que buscamos es preparar la estructura que resguarda y gobierna al activo (es decir, las billeteras, las llaves, los documentos de soporte, las personas, los protocolos, las contingencias) para que el activo cumpla su función de capital a largo plazo y sirva a los objetivos de largo plazo de la familia. La familia debe estar íntimamente al tanto de lo que mantiene si desea tomar la custodia de su Bitcoin. No solo el cabeza de familia, sino la familia en su conjunto.</p>

        <h3>Bitcoin como principal vehículo de ahorro</h3>
        <p>Para muchas de las familias que hoy se acercan a él, Bitcoin no es una fracción de una cartera diversificada. Es su principal vehículo de ahorro, y esperan que haga el trabajo más pesado en el horizonte más largo. Eso cambia radicalmente la pregunta de planificación. Resulta esencial cuidar de verdad las políticas internas que la familia decida establecer en torno a su principal vehículo de ahorro. Esto es fundamentalmente distinto a una cuenta de ahorros en un banco. Es una reserva destinada a crecer y a servir como el capital alrededor del cual la familia estructura sus operaciones y la educación de sus miembros, tal como muchas familias han tratado la tierra y los bienes raíces a lo largo del tiempo.</p>

        <h3>Complementa a los asesores existentes</h3>
        <p>Un verdadero plan patrimonial con Bitcoin no requiere que la familia abandone a su gestor patrimonial, a su abogado, a su family office ni a su contador. Los complementa. Está construido para encajar junto a las estructuras fiduciarias, los activos empresariales, los bienes raíces y las carteras tradicionales. Aun cuando con el tiempo Bitcoin absorberá una parte sustancial de la riqueza que hoy reside en esos activos, no está allí para competir con ellos. El papel de Schelling Point es precisamente ser el socio discreto que se ocupa de la capa Bitcoin de los asuntos de una familia mientras todos los demás continúan con su trabajo habitual.</p>

        <h3>Tiene en cuenta el capital humano e intelectual</h3>
        <p>El plan patrimonial con Bitcoin tiene en cuenta el capital humano y el capital intelectual. Manejar el activo puede ser fácil una vez comprendido, porque es solo lógica. La parte difícil son las personas: el cónyuge que debe poder operar el sistema en una emergencia; los hijos adultos que lo heredarán; el albacea que nunca ha tenido Bitcoin; el familiar de confianza que custodia una llave. Un plan patrimonial con Bitcoin es, en su esencia, un plan sobre cómo seres humanos de confianza interactúan con un sistema técnico e inmutable durante décadas. Si el diseño humano es incorrecto, el diseño técnico fallará, por bien construido que esté.</p>

        <h2>Las dimensiones que un verdadero plan patrimonial con Bitcoin debe atender</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Siete áreas que toda posición significativa encontrará.</p>
        <p>A continuación se presentan las dimensiones que cubre un plan patrimonial con Bitcoin bien preparado. No todas se aplican a cada familia desde el primer día. Pero cada una se vuelve relevante a medida que la posición crece y el horizonte de tiempo se alarga, y omitir cualquiera de ellas tiende a generar los modos de falla descritos en la siguiente sección.</p>

        <h3>Arquitectura de custodia y política de llaves</h3>
        <p>La decisión más fundamental: cómo se mantiene el Bitcoin, y quién lo mantiene. Para posiciones significativas con múltiples partes interesadas, esto podría significar una configuración multifirma: una estructura en la cual varias llaves, custodiadas por partes distintas en ubicaciones distintas, se requieren para autorizar cualquier movimiento de fondos. La multifirma es un diseño dentro del protocolo y exige una estructura inteligente. El diseño correcto implica decisiones sobre cuántas llaves se requieren, dónde vive cada una, quién tiene acceso a ellas, cómo se rotan si y cuando un titular de llave cambia, y cómo el sistema continúa funcionando cuando una o dos llaves no están disponibles o se han extraviado. El diseño adecuado para un único tenedor en una sola jurisdicción es muy distinto del diseño adecuado para una familia con miembros en tres continentes y con activos que deben permanecer accesibles para todos ellos.</p>

        <h3>Política de disposición y tesorería</h3>
        <p>Una vez que la familia mantiene una cantidad significativa de Bitcoin, la pregunta de cuánto gastar, cuándo, y desde qué capa de seguridad se convierte en una verdadera pregunta de tesorería. Un marco operativo separa el Bitcoin en tramos operativos: fondos que pueden usarse en el corto plazo, fondos que se mantienen como ahorro de mayor plazo y fondos que constituyen la bóveda de largo plazo. Cada tramo tiene su propia postura de seguridad, su propio protocolo de acceso y sus propias reglas sobre cuándo se dispone de él. La mayoría de las familias descubre que la disciplina de escribir esta política, aunque sea de manera informal, aclara decisiones que venían tomando de forma implícita e inconsistente.</p>

        <h3>Bitcoin como colateral</h3>
        <p>Para las familias que prefieren no vender, el Bitcoin puede usarse como colateral contra préstamos: para obtener liquidez, para eficiencia fiscal o para despliegues específicos como la adquisición de inmuebles o inversiones en negocios. El panorama del crédito colateralizado está evolucionando, y proveedores regulados ofrecen hoy productos estructurados que no existían hace tres años. La pregunta de planificación es cuáles proveedores, a qué relaciones préstamo-valor, a qué tasas de interés, bajo qué jurisdicciones y con qué protecciones contra riesgo de cola. Usado con cuidado, el crédito respaldado por Bitcoin permite que la familia acceda a poder de gasto sin desencadenar un evento gravable ni renunciar a la posición de largo plazo en Bitcoin. Usado sin cuidado, crea exactamente la dependencia de terceros que la familia intentaba evitar, o un evento de liquidez que liquida su posición.</p>

        <h3>Liquidez de salida y conversión</h3>
        <p>Cuando el Bitcoin debe convertirse a moneda local (ya sea para una compra, un pago de impuestos o una distribución a un miembro de la familia), la pregunta del cómo importa más de lo que la mayoría de las familias percibe. Las comisiones en los exchanges pueden variar ampliamente, mientras que las mesas OTC ofrecen mejor precio dependiendo del tamaño de la transacción y de las relaciones establecidas. La estructura jurisdiccional afecta la tributación, el reporte y la velocidad de liquidación. Un plan que anticipa estas conversiones con antelación, con relaciones ya establecidas, puede ahorrar a la familia sumas significativas de dinero y tiempo, y evitar el riesgo operativo de organizar una transacción grande bajo presión.</p>

        <h3>Privacidad de las tenencias</h3>
        <p>Bitcoin es totalmente transparente en su libro mayor público. Si la familia desea tomar su privacidad financiera en serio, debe usar las herramientas correctas y comprender cómo funciona el protocolo. Un patrimonio bien estructurado utiliza las propiedades de Bitcoin para mantener la discreción adecuada a las necesidades de la familia: quién en el gestor patrimonial conoce el tamaño de la posición; quién en el family office; qué saben los hijos a qué edad; qué aprende un albacea o fideicomisario, y cuándo, y solo cuando sea necesario. Más importante aún, que la identidad de la familia no quede atada a las tenencias para que personas determinadas las vean. La privacidad es la elección deliberada de qué se revela, a quién y cuándo.</p>

        <h3>Protocolo de herencia</h3>
        <p>La transferencia efectiva de Bitcoin de una generación a la siguiente es el momento en que la mayoría de la autocustodia falla. Al entrevistar a una gran proporción de bitcoiners y futuros clientes, la configuración para la herencia casi siempre ha sido deficiente. Un verdadero protocolo de herencia no es solo un sobre sellado en una caja fuerte que se mencionó una vez. Es un procedimiento escrito, ensayado y consciente de la jurisdicción que aborda: a quién se notifica cuando el tenedor principal queda incapacitado o fallece; quién custodia qué llaves; cómo esas partes se verifican entre sí y se coordinan; cómo participan los fideicomisarios y albaceas que no manejan Bitcoin; cómo se estructura la transferencia para satisfacer los requisitos de la sucesión o del fideicomiso; y cómo los herederos pueden operar el sistema una vez que lo hayan recibido. Un plan que la familia no ha ensayado es, en la práctica, no un plan.</p>

        <h3>Política de gasto</h3>
        <p>Por último, las reglas propias de la familia sobre cómo se utiliza el Bitcoin. Muchos tenedores principales descubren que una política de gasto escrita —por ejemplo, para qué es el Bitcoin, para qué no es, quién puede autorizar una disposición y bajo qué condiciones— hace un trabajo sustancial para alinear a hijos, cónyuges y fideicomisarios a lo largo de décadas. La política debe derivarse de la conversación que la produce. Esas conversaciones pueden ser incómodas y a veces parecer innecesarias o dolorosas, pero las familias que las sostienen temprano tienden a tomar mejores decisiones más adelante. Las familias que las posponen tienden a descubrir, a menudo de manera dolorosa, que no compartían las premisas que creían compartir.</p>

        <h2>Qué sale mal cuando esto se gestiona deficientemente</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Modos de falla que hemos encontrado personalmente.</p>
        <p>La autocustodia de Bitcoin es un trabajo riguroso. El activo recompensa a los operadores cuidadosos y castiga a los que toman el trabajo con ligereza, a menudo de maneras irreversibles. Esa es la naturaleza de Bitcoin: irreversible. Los modos de falla descritos a continuación no son teóricos. Cada uno de ellos se ha materializado, a menudo más de una vez, en familias e instituciones que creían tener el sistema bien manejado. Hemos encontrado personalmente múltiples escenarios similares a estos.</p>

        <h3>Fondos bloqueados porque los herederos no pueden acceder a ellos</h3>
        <p>Este es el modo de falla más común. El tenedor principal tenía una billetera bien diseñada y todas las herramientas que habría necesitado, pero los siguientes en la línea no fueron informados correctamente; la importancia de transmitir los fondos no parecía estar entre las prioridades de nadie; y el trabajo de toda la vida de una persona quedó efectivamente donado a la red Bitcoin en lugar de pasar al individuo o al grupo designado.</p>

        <h3>Fondos perdidos por un único punto de falla</h3>
        <p>Una sola billetera de hardware, una sola frase semilla, una sola ubicación, una sola persona de confianza. La autocustodia de Bitcoin concentra el riesgo en cualquier elemento que no se haya hecho redundante. Eventos como un incendio en la casa, un robo, una muerte súbita o un divorcio contencioso pueden ser una amenaza para su Bitcoin. Cualquiera de ellos puede ser devastador para una posición que dependía de un único punto que nunca se hizo redundante. La multifirma es la respuesta estructural más popular a este problema, pero solo si se implementa con una separación geográfica y personal genuina, y con suficiente redundancia como para sobrevivir a la pérdida de una o más llaves individuales.</p>

        <h3>Fondos expuestos porque la privacidad se manejó mal</h3>
        <p>Tenencias reveladas a demasiadas personas o en el momento equivocado. Etiquetas de billetera que dejaban ver la estructura a cualquiera que viera una transacción. La familia que vive de manera discreta con una posición seria en Bitcoin es la familia que planificó su revelación deliberadamente. La familia que no planifica esa revelación es la familia cuyas tenencias se convierten en tema de conversación en círculos donde nunca debieron serlo. Si planea acumular una tenencia importante de Bitcoin, nuestra recomendación seria es tomar la privacidad en serio. La compra y el almacenamiento deben tener la menor fuga de identificación posible.</p>

        <h3>Fondos gravados catastróficamente porque las conversiones fueron ingenuas</h3>
        <p>Transacciones grandes ejecutadas sin una estructuración previa; jurisdicciones elegidas sin considerar el tratamiento de las ganancias de capital sobre Bitcoin; estructuras fiduciarias apropiadas para activos tradicionales pero que generan consecuencias no deseadas cuando el Bitcoin se mantiene dentro de ellas. El costo marginal de obtener la estructura correcta de antemano es mucho menor que el costo de equivocarse más adelante, sobre una posición que ha compuesto su valor durante una década o más.</p>

        <blockquote>"El costo marginal de obtener la estructura correcta de antemano es mucho menor que el costo de equivocarse más adelante, sobre una posición que ha compuesto su valor durante una década o más."</blockquote>

        <h2>El enfoque de Schelling Point</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Asesoría, no custodia. Discreta, estructurada, de largo plazo.</p>
        <p>Schelling Point existe para ser el socio al que una familia o family office llama cuando quiere que su Bitcoin sea manejado con total seriedad y profesionalismo, mientras permanece en autocustodia, en control y tan discreta como desee ser.</p>
        <p>No tomamos custodia de los fondos del cliente. Nunca lo hemos hecho. El tenedor principal y su familia conservan el control total de sus llaves, su hardware y sus activos en todas las etapas. Nuestro rol es diseñar la estructura, construirla junto con la familia, documentar los protocolos, capacitar a las personas involucradas y permanecer disponibles como la presencia asesora de largo plazo que garantiza que el sistema siga funcionando a medida que la familia y el activo evolucionan a lo largo de las décadas, y a medida que las generaciones se suceden entre sí.</p>
        <p>Trabajamos junto a los asesores existentes de la familia. Cada asesor es parte del cuerpo que hace funcionar al patrimonio. Schelling Point se hace cargo de la capa Bitcoin. Manejamos la arquitectura de custodia, la política de llaves, el protocolo de herencia, la disciplina operativa que mantiene todo esto en forma, y el papel de Bitcoin dentro de la categoría más amplia de activos financieros. Integramos esto con las estructuras que ya existen. Para las family offices que han comenzado a recibir preguntas de clientes sobre Bitcoin y aún no tienen una respuesta interna, operamos como la contraparte Bitcoin de confianza a la que la family office puede acudir sin comprometer su propia posición.</p>
        <p>Tenemos nuestra sede en El Salvador, que hoy mantiene el marco legal y regulatorio más claro del mundo para mantener Bitcoin como capital de largo plazo. Atendemos a clientes a nivel global y de forma remota, y trabajamos en inglés y en español.</p>

        <h2>Por dónde empezar</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">Una sesión estratégica privada, sin obligación.</p>
        <p>La mayoría de las familias no necesita un sistema completo desde el primer día. Lo que necesita es una conversación clara y comprehensiva con alguien que haya trabajado estas preguntas con otras familias que mantienen Bitcoin de manera significativa, y que pueda trazar el siguiente paso correcto para su situación específica. Esa conversación suele abarcar el tamaño de la posición, la estructura familiar, los asesores existentes y sus roles, las consideraciones jurisdiccionales y el horizonte de tiempo para los distintos tramos de Bitcoin dentro del patrimonio.</p>
        <p>Si desea sostener esa conversación, el lugar adecuado para comenzar es una sesión estratégica privada. No hay obligación, no hay costo y no hay expectativa de avanzar más allá de ella. Escucharemos con atención, formularemos las preguntas que importan para su situación específica y le diremos honestamente cuál creemos que es el siguiente paso correcto, nos involucre o no.</p>

        <blockquote>Bien hecha, la planificación patrimonial con Bitcoin es discreta, estructurada y tranquilizadora. Mal hecha, es el error más costoso que una familia cometerá. La diferencia está, casi siempre, en la preparación.</blockquote>
        <p class="text-right text-muted-foreground italic mt-8">— Schelling Point</p>
      </div>
    </article>
  </div>
</template>
