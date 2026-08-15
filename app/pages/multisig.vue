<script setup lang="ts">
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const isEs = computed(() => locale.value === 'es')

  const title = computed(() =>
    isEs.value
      ? 'Bóvedas multisig multi-fabricante para familias con Bitcoin'
      : 'Multi-Vendor Bitcoin Multisig Vaults for Families'
  )

  const subtitle = computed(() =>
    isEs.value
      ? 'Una bóveda para el Bitcoin de tu familia donde ningún dispositivo, ninguna empresa y ninguna llave perdida puede costarte la posición.'
      : "A vault for your family's Bitcoin where no single device, no single company, and no single lost key can cost you the position."
  )

  const eyebrow = computed(() =>
    isEs.value
      ? 'NUESTRA ESPECIALIDAD  ·  CUSTODIA DE BÓVEDA'
      : 'OUR SPECIALTY  ·  VAULT-GRADE CUSTODY'
  )

  const description = computed(() =>
    isEs.value
      ? 'Diseñamos y construimos bóvedas multisig multi-fabricante para familias: llaves en hardware de fabricantes independientes, respaldos verificados y un protocolo de herencia ensayado. Nunca tenemos tus llaves.'
      : 'We design and build multi-vendor multisig vaults for families: keys on hardware from independent manufacturers, verified backups, and a rehearsed inheritance protocol. We never hold your keys.'
  )

  const backLink = computed(() => (isEs.value ? '/es' : '/'))
  const backLabel = computed(() =>
    isEs.value ? '← Volver al inicio' : '← Back home'
  )

  const ctaHeading = computed(() =>
    isEs.value
      ? 'Empieza con una conversación privada'
      : 'Start with a private conversation'
  )
  const ctaBody = computed(() =>
    isEs.value
      ? 'Sin coste y sin compromiso. Escucharemos tu situación y te diremos con honestidad si una bóveda multisig es el paso correcto para tu familia — o si todavía no lo es.'
      : "No cost, no obligation. We'll listen to your situation and tell you honestly whether a multisig vault is the right step for your family — or whether it isn't yet."
  )
  const ctaButton = computed(() =>
    isEs.value
      ? 'Solicita una consulta privada'
      : 'Request a private consultation'
  )
  const ctaSecondary = computed(() =>
    isEs.value ? 'Ver el paquete Legado' : 'See the Legacy package'
  )

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: 'article'
  })

  // FAQ emitted server-side so search engines and AI answer engines can
  // read the Q&A directly from raw HTML — same pattern as the homepage.
  const faqEn = [
    {
      q: 'Do you hold any of our keys?',
      a: 'No. We never take custody of client funds or keys. We design the vault, guide the setup, and train your family — every key stays in your hands at every stage.'
    },
    {
      q: 'What does "multi-vendor" mean in a multisig vault?',
      a: 'Each key in the quorum lives on a hardware signing device from a different, independent manufacturer. A firmware bug, a bad update, or a supply-chain compromise at any one company can then never affect enough keys to put your Bitcoin at risk.'
    },
    {
      q: 'What happens if one device fails or a manufacturer disappears?',
      a: 'Nothing happens to your Bitcoin. The quorum is designed to survive the loss of any single key. We then guide a calm, planned replacement of the affected key — a routine that is documented and rehearsed in advance.'
    },
    {
      q: 'Can non-technical family members manage this?',
      a: 'Yes. The vault comes with written, plain-language protocols, hands-on training for your spouse or heirs, and a rehearsed recovery drill — so the people who matter can operate the system without us and without technical background.'
    },
    {
      q: 'What if something happens to Schelling Point?',
      a: 'Your vault keeps working. We build exclusively on open Bitcoin standards, and your family holds every key and every recovery document. Nothing about your setup depends on our existence.'
    },
    {
      q: 'Is a multisig vault overkill for our holdings?',
      a: "Sometimes, yes — and we'll tell you. Multisig is for the Vault layer of a serious position. For smaller amounts, a well-executed single-signature setup with proper backups is often the right answer, and it costs less."
    }
  ]

  const faqEs = [
    {
      q: '¿Tienen alguna de nuestras llaves?',
      a: 'No. Nunca tomamos custodia de fondos ni de llaves de clientes. Diseñamos la bóveda, guiamos la configuración y formamos a tu familia — cada llave permanece en tus manos en todo momento.'
    },
    {
      q: '¿Qué significa "multi-fabricante" en una bóveda multisig?',
      a: 'Cada llave del quórum vive en un dispositivo firmante de un fabricante distinto e independiente. Así, un error de firmware, una mala actualización o un compromiso en la cadena de suministro de una empresa nunca puede afectar a suficientes llaves como para poner en riesgo tu Bitcoin.'
    },
    {
      q: '¿Qué pasa si un dispositivo falla o un fabricante desaparece?',
      a: 'A tu Bitcoin no le pasa nada. El quórum está diseñado para sobrevivir a la pérdida de cualquier llave individual. Después guiamos una sustitución tranquila y planificada de la llave afectada — una rutina documentada y ensayada de antemano.'
    },
    {
      q: '¿Pueden gestionarlo familiares sin perfil técnico?',
      a: 'Sí. La bóveda incluye protocolos escritos en lenguaje claro, formación práctica para tu cónyuge o herederos y un ensayo de recuperación — para que las personas que importan puedan operar el sistema sin nosotros y sin conocimientos técnicos.'
    },
    {
      q: '¿Y si algo le pasa a Schelling Point?',
      a: 'Tu bóveda sigue funcionando. Construimos exclusivamente sobre estándares abiertos de Bitcoin, y tu familia tiene cada llave y cada documento de recuperación. Nada de tu configuración depende de nuestra existencia.'
    },
    {
      q: '¿Es una bóveda multisig excesiva para nuestro patrimonio?',
      a: 'A veces, sí — y te lo diremos. El multisig es para la capa de Bóveda de una posición seria. Para cantidades menores, una configuración de firma única bien ejecutada, con respaldos correctos, suele ser la respuesta adecuada, y cuesta menos.'
    }
  ]

  const faqSchemas = faqEn.map((_, i) =>
    defineQuestion({
      name: () => (isEs.value ? (faqEs[i]?.q ?? '') : (faqEn[i]?.q ?? '')),
      acceptedAnswer: () =>
        isEs.value ? (faqEs[i]?.a ?? '') : (faqEn[i]?.a ?? '')
    })
  )

  useSchemaOrg([
    defineWebPage({
      '@type': 'FAQPage',
      name: () => title.value,
      description: () => description.value
    }),
    ...faqSchemas
  ])

  const faqItems = computed(() => (isEs.value ? faqEs : faqEn))
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
          A multi-vendor multisig vault is the most robust way a family can hold
          Bitcoin: several keys, on hardware from independent manufacturers,
          kept in separate locations, with a written protocol for how they are
          used and inherited. It is what we build in our Legacy engagement, and
          it is the part of this work we have chosen to specialise in. This page
          explains what it is, why the multi-vendor detail matters more than
          most people realise, and why the setup is worth doing properly or not
          at all.
        </p>

        <h2>What is a multisig vault?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Several keys, one quorum, no single point of failure.
        </p>
        <p>
          A standard Bitcoin wallet is controlled by one key. Whoever holds that
          key holds the Bitcoin — and whoever loses it, loses the Bitcoin. Every
          classic self-custody disaster, from the house fire to the forgotten
          seed phrase to the coerced transfer, traces back to that single point
          of failure.
        </p>
        <p>
          A multisig vault replaces the single key with a quorum. In a 2-of-3
          vault, three keys exist and any two must sign together before Bitcoin
          can move. In a 3-of-5, five exist and three must agree. The
          consequences are profound: a thief who finds one key gets nothing. A
          fire that destroys one key costs nothing. A single compromised
          computer can no longer authorise anything on its own. The vault
          tolerates failure — which is exactly what long-term family capital
          requires, because over decades, something always fails.
        </p>

        <h2>Why does multi-vendor matter?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Companies fail more often than mathematics does.
        </p>
        <p>
          Here is the detail most multisig setups get wrong: if all of your keys
          live on devices from the same manufacturer, you have not eliminated
          your single point of failure — you have moved it. You are now trusting
          one company's firmware, one company's supply chain, one company's
          update process, and one company's continued existence, with every key
          at once. A critical firmware bug, a malicious update, a compromised
          batch of devices, or a manufacturer simply going out of business now
          touches your entire quorum simultaneously.
        </p>
        <p>
          These are not theoretical concerns. Hardware wallet vendors have
          shipped critical vulnerabilities, suffered data breaches, and made
          design decisions that alarmed their own users. No manufacturer —
          however reputable — deserves to be a single point of failure for a
          family's patrimony.
        </p>
        <p>
          A multi-vendor vault applies the logic of multisig to the companies
          themselves. Each key lives on a signing device from a different,
          independent manufacturer, running independent firmware. For any
          vendor-level failure to threaten your Bitcoin, two or more unrelated
          companies would have to fail in compatible ways at the same time. That
          is the standard serious holders are converging on, and it is the
          standard we build to.
        </p>

        <blockquote>
          "No manufacturer — however reputable — deserves to be a single point
          of failure for a family's patrimony."
        </blockquote>

        <h2>What does "no single point of failure" really mean?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          The list of events your vault simply survives.
        </p>
        <p>
          Designed and executed properly, a multi-vendor multisig vault
          survives, without loss and without drama: a house fire or flood at any
          one location. The theft or loss of any one device or backup. A
          critical firmware flaw or supply-chain compromise at any one
          manufacturer. Malware on the family computer. The death or incapacity
          of the principal holder. And — because your family holds every key —
          it survives anything that happens to Schelling Point. We design the
          system so that it does not need us.
        </p>
        <p>
          The corollary is a discipline: keys in separate physical locations,
          backups that are tamper-evident and geographically distributed, and a
          written record of what exists and where. Redundancy that exists only
          in someone's head is not redundancy.
        </p>

        <h2>Why shouldn't families do this alone?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Done wrong, multisig is less safe than a single key done well.
        </p>
        <p>
          Multisig is unforgiving of casual execution, and the failure modes are
          quiet ones — invisible on the day of setup, catastrophic years later.
          The well-documented pitfalls: cosigner keys that were never verified
          on the devices themselves, leaving room for a compromised computer to
          substitute an attacker's key during setup. Receiving addresses trusted
          from a screen that malware can repaint. And the one that catches
          nearly everyone — families who carefully back up every seed phrase but
          not the wallet configuration itself, not realising that in multisig,
          the seeds alone may not be enough to recover the funds.
        </p>
        <p>
          A vault with any of these flaws feels secure and isn't. The honest
          summary of the security literature is that a poorly executed multisig
          is worse than a well-executed single key. This is precisely why we
          treat the setup as a formal, verified ceremony rather than an
          afternoon of plugging in devices — and why every vault we build ends
          with a rehearsed recovery, not a hopeful assumption.
        </p>

        <h2>How we build your vault</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          A formal process, from threat model to rehearsed recovery.
        </p>

        <h3>Design around your family, not a template</h3>
        <p>
          We begin with your actual situation: the size of the position, who is
          in the family, where everyone lives, what must survive what. From that
          threat model we design the quorum — how many keys, held by whom, in
          which locations and jurisdictions — and select signing devices from
          independent manufacturers to fit it.
        </p>

        <h3>A guided key ceremony — your hands, not ours</h3>
        <p>
          Every key is generated and verified by you, on your devices, with us
          guiding each step and independently verifying the result. We never
          see, touch, or hold a key at any point. Cosigner keys are
          cross-checked on the devices themselves, and the first receiving
          addresses are verified the same way — closing the exact gaps that
          quiet DIY failures slip through.
        </p>

        <h3>Backups and documentation built for decades</h3>
        <p>
          Each key is backed up on durable media, sealed tamper-evident, and
          placed in separate locations. The wallet configuration — the piece
          almost everyone forgets — is documented and stored redundantly,
          alongside plain-language recovery instructions written for the people
          who will actually need them, not for engineers.
        </p>

        <h3>Heirs trained, recovery rehearsed</h3>
        <p>
          Your spouse or heirs learn the system with their own hands: signing,
          verifying, recovering. Then we rehearse the scenario that matters —
          recovering access without you in the room. A recovery that has never
          been rehearsed is a hope, not a plan. From there, the annual review
          under Premium Continuity keeps the vault current as devices, family,
          and circumstances change.
        </p>

        <h2>Who is this for?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          The Vault layer of a serious position.
        </p>
        <p>
          In our framework, Bitcoin is structured into Spending, Savings, and
          Vault. The multi-vendor multisig vault is how the Vault layer — the
          long-term patrimony, the portion measured in generations — should be
          held once a family's position is meaningful enough that its loss would
          be unrecoverable. It is the centrepiece of our
          <NuxtLink :to="localePath('/') + '#packages'">
            Legacy engagement
          </NuxtLink>
          , and it is maintained through an annual in-person review and recovery
          rehearsal.
        </p>
        <p>
          If your position is earlier in its journey, the Foundation and Family
          engagements build the same discipline at the right scale — and the
          free assessment will tell you honestly which is appropriate.
        </p>

        <h2>Frequently asked questions</h2>
        <div class="not-prose mt-8 space-y-6">
          <div
            v-for="item in faqItems"
            :key="item.q"
            class="rounded-2xl border border-border bg-card p-6"
          >
            <h3 class="text-base font-semibold text-white">{{ item.q }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ item.a }}
            </p>
          </div>
        </div>
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
          Una bóveda multisig multi-fabricante es la forma más robusta en que
          una familia puede custodiar Bitcoin: varias llaves, en hardware de
          fabricantes independientes, guardadas en ubicaciones separadas, con un
          protocolo escrito sobre cómo se usan y cómo se heredan. Es lo que
          construimos en nuestro paquete Legado, y es la parte de este trabajo
          en la que hemos decidido especializarnos. Esta página explica qué es,
          por qué el detalle multi-fabricante importa más de lo que la mayoría
          cree, y por qué esta configuración merece hacerse correctamente o no
          hacerse.
        </p>

        <h2>¿Qué es una bóveda multisig?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Varias llaves, un quórum, ningún punto único de fallo.
        </p>
        <p>
          Una billetera Bitcoin estándar está controlada por una sola llave.
          Quien tiene esa llave, tiene el Bitcoin — y quien la pierde, pierde el
          Bitcoin. Todos los desastres clásicos de la autocustodia, desde el
          incendio doméstico hasta la frase semilla olvidada, se remontan a ese
          punto único de fallo.
        </p>
        <p>
          Una bóveda multisig sustituye la llave única por un quórum. En una
          bóveda 2-de-3 existen tres llaves y dos deben firmar juntas para que
          el Bitcoin se mueva. En una 3-de-5, existen cinco y tres deben
          coincidir. Las consecuencias son profundas: un ladrón que encuentra
          una llave no obtiene nada. Un incendio que destruye una llave no
          cuesta nada. Un ordenador comprometido ya no puede autorizar nada por
          sí solo. La bóveda tolera fallos — que es exactamente lo que el
          capital familiar de largo plazo necesita, porque a lo largo de
          décadas, algo siempre falla.
        </p>

        <h2>¿Por qué importa lo multi-fabricante?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Las empresas fallan más a menudo que las matemáticas.
        </p>
        <p>
          Este es el detalle que la mayoría de configuraciones multisig hace
          mal: si todas tus llaves viven en dispositivos del mismo fabricante,
          no has eliminado tu punto único de fallo — lo has movido. Ahora
          confías en el firmware de una empresa, la cadena de suministro de una
          empresa, el proceso de actualización de una empresa y la existencia
          continuada de una empresa, con todas tus llaves a la vez. Un error
          crítico de firmware, una actualización maliciosa, un lote de
          dispositivos comprometido o un fabricante que simplemente cierra, toca
          todo tu quórum simultáneamente.
        </p>
        <p>
          No son preocupaciones teóricas. Fabricantes de billeteras hardware han
          distribuido vulnerabilidades críticas, sufrido filtraciones de datos y
          tomado decisiones de diseño que alarmaron a sus propios usuarios.
          Ningún fabricante — por reputado que sea — merece ser un punto único
          de fallo para el patrimonio de una familia.
        </p>
        <p>
          Una bóveda multi-fabricante aplica la lógica del multisig a las
          propias empresas. Cada llave vive en un dispositivo firmante de un
          fabricante distinto e independiente, con firmware independiente. Para
          que un fallo a nivel de fabricante amenace tu Bitcoin, dos o más
          empresas sin relación entre sí tendrían que fallar de formas
          compatibles al mismo tiempo. Ese es el estándar hacia el que convergen
          los holders serios, y es el estándar con el que construimos.
        </p>

        <blockquote>
          "Ningún fabricante — por reputado que sea — merece ser un punto único
          de fallo para el patrimonio de una familia."
        </blockquote>

        <h2>Qué significa realmente "ningún punto único de fallo"</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          La lista de eventos que tu bóveda simplemente sobrevive.
        </p>
        <p>
          Diseñada y ejecutada correctamente, una bóveda multisig
          multi-fabricante sobrevive, sin pérdidas y sin drama: un incendio o
          inundación en cualquier ubicación. El robo o pérdida de cualquier
          dispositivo o respaldo. Un fallo crítico de firmware o un compromiso
          de cadena de suministro en cualquier fabricante. Malware en el
          ordenador familiar. El fallecimiento o la incapacidad del titular
          principal. Y — porque tu familia tiene todas las llaves — sobrevive a
          cualquier cosa que le ocurra a Schelling Point. Diseñamos el sistema
          para que no nos necesite.
        </p>
        <p>
          El corolario es una disciplina: llaves en ubicaciones físicas
          separadas, respaldos a prueba de manipulación y distribuidos
          geográficamente, y un registro escrito de qué existe y dónde. La
          redundancia que solo existe en la cabeza de alguien no es redundancia.
        </p>

        <h2>¿Por qué las familias no deberían hacerlo solas?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Mal hecho, el multisig es menos seguro que una llave única bien hecha.
        </p>
        <p>
          El multisig no perdona la ejecución casual, y sus modos de fallo son
          silenciosos — invisibles el día de la configuración, catastróficos
          años después. Los errores bien documentados: llaves de cofirmantes que
          nunca se verificaron en los propios dispositivos, dejando espacio para
          que un ordenador comprometido sustituya una llave del atacante durante
          la configuración. Direcciones de recepción confiadas desde una
          pantalla que el malware puede repintar. Y el que atrapa a casi todos —
          familias que respaldan cuidadosamente cada frase semilla pero no la
          configuración de la billetera, sin saber que en multisig las semillas
          por sí solas pueden no ser suficientes para recuperar los fondos.
        </p>
        <p>
          Una bóveda con cualquiera de estos defectos se siente segura y no lo
          es. El resumen honesto de la literatura de seguridad es que un
          multisig mal ejecutado es peor que una llave única bien ejecutada.
          Precisamente por eso tratamos la configuración como una ceremonia
          formal y verificada, y no como una tarde conectando dispositivos — y
          por eso cada bóveda que construimos termina con una recuperación
          ensayada, no con una suposición esperanzada.
        </p>

        <h2>Cómo construimos tu bóveda</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          Un proceso formal, del modelo de amenazas al ensayo de recuperación.
        </p>

        <h3>Diseño alrededor de tu familia, no de una plantilla</h3>
        <p>
          Empezamos con tu situación real: el tamaño de la posición, quiénes
          forman la familia, dónde vive cada uno, qué debe sobrevivir a qué. A
          partir de ese modelo de amenazas diseñamos el quórum — cuántas llaves,
          en manos de quién, en qué ubicaciones y jurisdicciones — y
          seleccionamos dispositivos firmantes de fabricantes independientes a
          su medida.
        </p>

        <h3>Una ceremonia de llaves guiada — tus manos, no las nuestras</h3>
        <p>
          Cada llave la generas y verificas tú, en tus dispositivos, con
          nosotros guiando cada paso y verificando el resultado de forma
          independiente. Nunca vemos, tocamos ni tenemos una llave en ningún
          momento. Las llaves de los cofirmantes se cotejan en los propios
          dispositivos, y las primeras direcciones de recepción se verifican de
          la misma manera — cerrando exactamente las brechas por las que se
          cuelan los fallos silenciosos del hazlo-tú-mismo.
        </p>

        <h3>Respaldos y documentación construidos para décadas</h3>
        <p>
          Cada llave se respalda en soportes duraderos, sellados a prueba de
          manipulación, en ubicaciones separadas. La configuración de la
          billetera — la pieza que casi todos olvidan — se documenta y almacena
          con redundancia, junto a instrucciones de recuperación en lenguaje
          claro, escritas para las personas que realmente las necesitarán, no
          para ingenieros.
        </p>

        <h3>Herederos formados, recuperación ensayada</h3>
        <p>
          Tu cónyuge o herederos aprenden el sistema con sus propias manos:
          firmar, verificar, recuperar. Después ensayamos el escenario que
          importa — recuperar el acceso sin ti en la sala. Una recuperación que
          nunca se ha ensayado es una esperanza, no un plan. A partir de ahí, la
          revisión anual bajo Continuidad Premium mantiene la bóveda al día
          conforme cambian los dispositivos, la familia y las circunstancias.
        </p>

        <h2>¿Para quién es esto?</h2>
        <p class="text-muted-foreground italic !mt-2 !mb-8">
          La capa de Bóveda de una posición seria.
        </p>
        <p>
          En nuestro marco, el Bitcoin se estructura en Gasto, Ahorro y Bóveda.
          La bóveda multisig multi-fabricante es como debería custodiarse la
          capa de Bóveda — el patrimonio de largo plazo, la porción que se mide
          en generaciones — una vez que la posición de una familia es lo
          bastante significativa como para que su pérdida sea irrecuperable. Es
          la pieza central de nuestro
          <NuxtLink :to="localePath('/') + '#packages'">
            paquete Legado
          </NuxtLink>
          , y se mantiene mediante una revisión anual presencial con ensayo de
          recuperación.
        </p>
        <p>
          Si tu posición está más temprano en su camino, los paquetes Fundación
          y Familia construyen la misma disciplina a la escala adecuada — y la
          evaluación gratuita te dirá con honestidad cuál corresponde.
        </p>

        <h2>Preguntas frecuentes</h2>
        <div class="not-prose mt-8 space-y-6">
          <div
            v-for="item in faqItems"
            :key="item.q"
            class="rounded-2xl border border-border bg-card p-6"
          >
            <h3 class="text-base font-semibold text-white">{{ item.q }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ item.a }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="mt-16 rounded-2xl border border-primary/50 bg-card p-8 text-center shadow-[0_0_0_1px_rgba(123,168,92,0.18)]"
      >
        <h2 class="text-2xl font-bold text-white">{{ ctaHeading }}</h2>
        <p
          class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground"
        >
          {{ ctaBody }}
        </p>
        <div
          class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiButton
            as="a"
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="h-auto rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            {{ ctaButton }}
          </UiButton>
          <NuxtLink
            :to="localePath('/') + '#packages'"
            class="text-sm text-muted-foreground transition-colors hover:text-white"
          >
            {{ ctaSecondary }} →
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>
