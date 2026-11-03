<script setup lang="ts">
  // Homepage — dark "brand film" redesign (Sep 2026).
  // Copy lives in i18n/locales/{en,es}.json under `home.*`; package names, prices,
  // features, testimonials and the playbook reuse their existing keys so they stay
  // in sync with the rest of the site. The page renders its own header and footer.
  definePageMeta({ layout: false })

  const { t, locale } = useI18n()
  const localePath = useLocalePath()

  const { BOOKING_URL, EMAIL, whatsappUrl } = useSpContact()

  // Split a headline into words for the blur-to-sharp reveal (80ms per word).
  // `start` offsets the second, italic line so it follows the first.
  const words = (text: string, start = 0) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((w, i) => ({ w, d: `${((start + i) * 0.08).toFixed(2)}s` }))
  const count = (text: string) => text.split(' ').filter(Boolean).length

  const heldItems = computed(() =>
    [1, 2, 3, 4].map((i) => ({
      name: t(`home.held.i${i}`),
      desc: t(`home.held.d${i}`),
      optional: i === 2,
      d: `${(0.24 + (i - 1) * 0.2).toFixed(2)}s`
    }))
  )

  const services = computed(() => [
    { name: t('home.do.setupName'), desc: t('home.do.setupDesc'), fee: t('packages.svcSetupUsd'), unit: t('home.do.oneTime') },
    { name: t('home.do.reviewName'), desc: t('home.do.reviewDesc'), fee: t('packages.svcReviewUsd'), unit: t('home.do.oneTime') },
    { name: t('home.do.inheritName'), desc: t('home.do.inheritDesc'), fee: t('packages.svcInheritUsd'), unit: t('home.do.oneTime') },
    { name: t('home.do.contName'), desc: t('home.do.contDesc'), fee: t('home.do.contFee'), unit: t('home.do.perYear') }
  ])

  const steps = computed(() =>
    [1, 2, 3, 4, 5].map((i) => ({
      when: t(`home.run.w${i}`),
      name: t(`home.run.s${i}`),
      desc: t(`home.run.d${i}`),
      d: `${(0.12 * i).toFixed(2)}s`
    }))
  )

  // Engagement tiers — copy and prices from the existing `packages.*` keys.
  const tiers = computed(() => [
    {
      key: 'foundation',
      title: t('packages.foundationTitle'),
      who: t('packages.foundationWho'),
      price: t('packages.foundationPrice'),
      features: [1, 2, 3, 4].map((i) => t(`packages.foundationFeature${i}`)),
      included: [t('packages.foundationFeature5')],
      cta: t('home.fees.cta')
    },
    {
      key: 'family',
      title: t('packages.familyTitle'),
      who: t('packages.familyWho'),
      badge: t('packages.familyBadge'),
      pick: true,
      price: t('packages.familyPrice'),
      features: [1, 2, 3, 4].map((i) => t(`packages.familyFeature${i}`)),
      included: [t('packages.familyFeature5'), t('packages.familyFeature6')],
      cta: t('home.fees.cta')
    },
    {
      key: 'legacy',
      title: t('packages.legacyTitle'),
      who: t('packages.legacyWho'),
      price: t('packages.legacyPrice'),
      features: [1, 2, 3, 4, 5, 6].map((i) => t(`packages.legacyFeature${i}`)),
      included: [t('packages.legacyFeature7')],
      cta: t('packages.legacyCta')
    }
  ])

  const continuity = computed(() =>
    ['essential', 'advanced', 'premium'].map((k) => ({
      name: t(`home.fees.${k}`),
      desc: t(`home.fees.${k}Desc`),
      fee: t(`home.fees.${k}Fee`)
    }))
  )

  const testimonials = computed(() =>
    [1, 2, 3].map((i) => ({
      quote: t(`whoWeAre.testimonial${i}`),
      author: t(`whoWeAre.testimonial${i}Author`)
    }))
  )

  const tools = computed(() => [
    { img: '/images/tools/sparrow.png', name: 'Sparrow', role: t('home.tools.walletSoftware') },
    { img: '/images/tools/seddsigner.png', name: 'SeedSigner', role: t('home.tools.signingDevice') },
    { img: '/images/tools/krux.png', name: 'Krux', role: t('home.tools.signingDevice') },
    { img: '/images/tools/passport.png', name: 'Passport', role: t('home.tools.signingDevice') },
    { img: '/images/tools/jade.png', name: 'Jade', role: t('home.tools.signingDevice') },
    { img: '/images/tools/nunchuk.png', name: 'Nunchuk', role: t('home.tools.multisigWallet') },
    { img: '/images/tools/liana.png', name: 'Liana', role: t('home.tools.timeDelayed') },
    { img: '/images/tools/signal.svg', name: 'Signal', role: t('home.tools.privateComms') }
  ])

  const faqs = computed(() =>
    [1, 2, 3, 4, 5, 6].map((i) => ({ q: t(`home.faq.q${i}`), a: t(`home.faq.a${i}`), multisig: i === 5 }))
  )

  useSeoMeta({
    title: () => t('seo.title'),
    description: () => t('seo.description')
  })

  // Fillout popup for the Bitcoin Estate Playbook sign-up.
  useHead({
    script: [{ src: 'https://server.fillout.com/embed/v1/', defer: true }]
  })

  // FAQPage structured data from the questions shown on the page.
  useSchemaOrg([
    defineWebPage({
      '@type': 'FAQPage',
      name: () => t('seo.title'),
      description: () => t('seo.description')
    }),
    ...[1, 2, 3, 4, 5, 6].map((i) =>
      defineQuestion({
        name: () => t(`home.faq.q${i}`),
        acceptedAnswer: () => t(`home.faq.a${i}`)
      })
    )
  ])

  // Motion: sections reveal once as they enter view; the header settles into a bar on scroll.
  // Everything is visible without JavaScript; the `js` class only opts in to the entrance.
  const root = ref<HTMLElement | null>(null)
  let io: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el || !('IntersectionObserver' in window)) return
    el.classList.add('js')
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io?.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    el.querySelectorAll('[data-reveal]').forEach((s) => io?.observe(s))
    requestAnimationFrame(() => el.querySelector('.sp-hero')?.classList.add('is-in'))
  })

  onBeforeUnmount(() => {
    io?.disconnect()
  })
</script>

<template>
  <div ref="root" class="sp-home">
    <div class="sp-light" aria-hidden="true" />
    <div class="sp-grain" aria-hidden="true" />
    <div class="sp-vignette" aria-hidden="true" />

    <HomeHeader />

    <main>
      <!-- 1 · Hero -->
      <section class="sp-hero" aria-labelledby="h-hero" data-reveal>
        <div class="txt">
          <p class="sp-label eyebrow sp-fade"><i aria-hidden="true" />{{ t('home.hero.eyebrow') }}</p>
          <h1 id="h-hero">
            <template v-for="(x, i) in words(t('home.hero.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
            <em><template v-for="(x, i) in words(t('home.hero.titleEm'), count(t('home.hero.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
          </h1>
          <div class="rule sp-draw" style="--d: 0.56s" aria-hidden="true" />
          <p class="tag sp-fade" style="--d: 0.72s">{{ t('home.hero.tagline') }}</p>
          <p class="lede sp-fade" style="--d: 0.88s">{{ t('home.hero.lede') }}</p>
          <p class="vow sp-fade" style="--d: 1.08s">{{ t('home.hero.vow') }}</p>
          <div class="row sp-fade" style="--d: 1.2s">
            <a class="sp-btn" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.hero.cta') }}</a>
            <span class="sp-label">{{ t('home.hero.places') }}</span>
          </div>
        </div>
        <div class="sp-dial" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle class="glow" cx="100" cy="100" r="5" />
            <circle class="pt" cx="100" cy="100" r="1.8" />
            <circle class="ring r1" cx="100" cy="100" r="34" />
            <circle class="ring r2" cx="100" cy="100" r="62" />
            <circle class="ring r3" cx="100" cy="100" r="92" />
            <g class="ticks">
              <line x1="100" y1="2" x2="100" y2="10" /><line x1="100" y1="190" x2="100" y2="198" />
              <line x1="2" y1="100" x2="10" y2="100" /><line x1="190" y1="100" x2="198" y2="100" />
              <line x1="30.7" y1="30.7" x2="36.4" y2="36.4" /><line x1="163.6" y1="163.6" x2="169.3" y2="169.3" />
              <line x1="30.7" y1="169.3" x2="36.4" y2="163.6" /><line x1="163.6" y1="36.4" x2="169.3" y2="30.7" />
            </g>
          </svg>
        </div>
      </section>

      <!-- 2 · How it is held -->
      <section class="sp-sec sp-held" aria-labelledby="h-held" data-reveal>
        <p class="sp-label">{{ t('home.held.label') }}</p>
        <h2 id="h-held" class="sp-h2">
          <template v-for="(x, i) in words(t('home.held.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
          <em><template v-for="(x, i) in words(t('home.held.titleEm'), count(t('home.held.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
        </h2>
        <div class="fig">
          <p class="sp-label" aria-hidden="true">{{ t('home.held.family') }}</p>
          <svg viewBox="0 0 1000 150" aria-hidden="true">
            <path d="M4 60 L 280 60 C 360 60, 380 30, 460 30 L 1000 30" />
            <path d="M280 60 C 360 60, 380 92, 460 92 L 660 92 C 720 92, 740 124, 800 124 L 1000 124" />
            <circle class="node" cx="4" cy="60" r="2.4" />
            <circle class="node" cx="460" cy="30" r="2" />
            <circle class="node" cx="460" cy="92" r="2" />
            <circle class="node" cx="800" cy="124" r="1.8" />
          </svg>
          <div class="under">
            <p class="sp-label">{{ t('home.held.alongside') }}</p>
            <ol>
              <li v-for="item in heldItems" :key="item.name" class="sp-fade" :style="{ '--d': item.d }">
                <h3>{{ item.name }}<span v-if="item.optional" class="opt">{{ t('home.held.optional') }}</span></h3>
                <p>{{ item.desc }}</p>
              </li>
            </ol>
          </div>
        </div>
        <p class="fine">
          {{ t('home.held.fine') }}
          <NuxtLink class="sp-link" :to="localePath('/multisig')">{{ t('home.held.fineLink') }}</NuxtLink>
        </p>
      </section>

      <!-- Interlude · over generations -->
      <section class="sp-inter" aria-labelledby="h-inter" data-reveal>
        <div class="wrap">
          <figure class="sp-photo">
            <img src="/images/home/generations.jpg" :alt="t('home.inter.alt')" width="1100" height="963" loading="lazy" decoding="async">
          </figure>
          <div class="txt">
            <p class="sp-label">{{ t('home.inter.label') }}</p>
            <h2 id="h-inter" class="sp-h2">
              <template v-for="(x, i) in words(t('home.inter.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.inter.titleEm'), count(t('home.inter.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            </h2>
            <p class="body sp-fade" style="--d: 0.64s">{{ t('home.inter.body') }}</p>
            <p class="solve sp-fade" style="--d: 0.8s">{{ t('home.inter.solve') }}</p>
            <NuxtLink class="sp-link cases-link sp-fade" style="--d: 0.9s" :to="localePath('/use-cases')">{{ t('home.inter.casesLink') }}</NuxtLink>
          </div>
        </div>
      </section>




      <!-- 3 · Engagements (packages first) -->
      <section id="engagements" class="sp-sec sp-fees" aria-labelledby="h-fees" data-reveal>
        <div class="top">
          <div>
            <p class="sp-label">{{ t('home.fees.label') }}</p>
            <h2 id="h-fees" class="sp-h2">
              <template v-for="(x, i) in words(t('home.fees.engTitle'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.fees.engTitleEm'), count(t('home.fees.engTitle')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            </h2>
          </div>
          <p class="sp-fade" style="--d: 0.32s">{{ t('home.fees.side') }}</p>
        </div>

        <div class="pk">
          <article
            v-for="(tier, i) in tiers"
            :key="tier.key"
            class="sp-fade"
            :class="{ pick: tier.pick }"
            :style="{ '--d': `${(0.08 + i * 0.08).toFixed(2)}s` }"
            :aria-labelledby="`pk-${tier.key}`"
          >
            <p class="sp-label tag">{{ tier.badge || ' ' }}</p>
            <h3 :id="`pk-${tier.key}`">{{ tier.title }}</h3>
            <p class="who">{{ tier.who }}</p>
            <p class="price"><b>{{ tier.price }}</b><span>{{ t('packages.oneTime') }}</span></p>
            <ul>
              <li v-for="f in tier.features" :key="f">{{ f }}</li>
              <li v-for="f in tier.included" :key="f" class="inc">{{ f }}</li>
            </ul>
            <a class="go sp-btn" :class="{ ghost: !tier.pick }" :href="BOOKING_URL" target="_blank" rel="noopener">{{ tier.cta }}</a>
          </article>
        </div>

      </section>

      <!-- 4 · Individual services, fees fixed in writing -->
      <section id="what-we-do" class="sp-sec sp-do" aria-labelledby="h-do" data-reveal>
        <div class="head">
          <div>
            <p class="sp-label">{{ t('home.do.label') }}</p>
            <h2 id="h-do" class="sp-h2">
              <template v-for="(x, i) in words(t('home.do.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.do.titleEm'), count(t('home.do.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            </h2>
          </div>
          <p class="sp-fade" style="--d: 0.32s">{{ t('home.do.side') }}</p>
        </div>
        <ul>
          <li v-for="(s, i) in services" :key="s.name" class="sp-fade" :style="{ '--d': `${(0.08 + i * 0.08).toFixed(2)}s` }">
            <span class="mk" aria-hidden="true" />
            <h3>{{ s.name }}</h3>
            <p>{{ s.desc }}</p>
            <div class="fee">{{ s.fee }}<small>{{ s.unit }}</small></div>
          </li>
        </ul>
        <div class="start sp-fade" style="--d: 0.4s">
          <span>{{ t('home.do.start') }} <strong>{{ t('home.do.startStrong') }}</strong></span>
          <span>{{ t('home.do.advisory') }}</span>
        </div>
        <div class="sp-contwrap">
        <div class="cont">
          <div class="intro sp-fade">
            <p class="sp-label">{{ t('home.fees.contLabel') }}</p>
            <h3>{{ t('home.fees.contTitle') }}</h3>
            <p>{{ t('home.fees.contBody') }}</p>
          </div>
          <div class="sp-fade" style="--d: 0.12s">
            <table>
              <caption class="sp-sr">{{ t('home.fees.contCaption') }}</caption>
              <tbody>
                <tr v-for="c in continuity" :key="c.name">
                  <td class="n">{{ c.name }}</td>
                  <td class="d">{{ c.desc }}</td>
                  <td class="v">{{ c.fee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="terms sp-fade" style="--d: 0.16s">
          <p>{{ t('home.fees.term1') }}</p>
          <p>{{ t('home.fees.term2') }}</p>
          <p>{{ t('home.fees.term3') }}</p>
        </div>
        </div>
        <p class="gloss sp-fade" style="--d: 0.48s">
          {{ t('home.do.glossaryNote') }}
          <NuxtLink class="sp-link" :to="localePath('/glossary')">{{ t('home.do.glossaryLink') }}</NuxtLink>
        </p>
      </section>

      <!-- 5 · How an engagement runs -->
      <section id="stewardship" class="sp-sec sp-run" aria-labelledby="h-run" data-reveal>
        <p class="sp-label">{{ t('home.run.label') }}</p>
        <h2 id="h-run" class="sp-h2">
          <template v-for="(x, i) in words(t('home.run.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
          <em><template v-for="(x, i) in words(t('home.run.titleEm'), count(t('home.run.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
        </h2>
        <p class="runsub sp-fade" style="--d: 0.48s">{{ t('home.run.sub') }}</p>
        <div class="track">
          <ol>
            <li v-for="s in steps" :key="s.name" class="sp-fade" :style="{ '--d': s.d }">
              <span class="sp-label when">{{ s.when }}</span>
              <h3>{{ s.name }}</h3>
              <p>{{ s.desc }}</p>
            </li>
          </ol>
          <div class="green sp-draw" style="--d: 0.16s" aria-hidden="true" />
          <p class="sp-label alongside sp-fade" style="--d: 0.72s"><i aria-hidden="true" />{{ t('home.run.alongside') }}</p>
        </div>
        <p class="leave sp-fade" style="--d: 0.8s">{{ t('home.run.leave') }} <em>{{ t('home.run.leaveEm') }}</em></p>
      </section>

      <!-- 6 · In their words -->
      <section class="sp-sec sp-words" aria-labelledby="h-words" data-reveal>
        <p id="h-words" class="sp-label">{{ t('home.words.label') }}</p>
        <div class="grid">
          <figure v-for="(q, i) in testimonials" :key="q.author" class="sp-fade" :style="{ '--d': `${(0.08 + i * 0.12).toFixed(2)}s` }">
            <blockquote>{{ q.quote }}</blockquote>
            <figcaption class="sp-label">{{ q.author }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- 7 · Tools we commonly work with -->
      <section class="sp-sec sp-partners" aria-labelledby="h-tools" data-reveal>
        <div class="top">
          <p id="h-tools" class="sp-label">{{ t('tools.heading') }}</p>
          <p class="note sp-fade" style="--d: 0.12s">{{ t('tools.note') }}</p>
        </div>
        <ul class="row sp-fade" style="--d: 0.08s">
          <li v-for="tool in tools" :key="tool.name">
            <img :src="tool.img" alt="" width="28" height="28" loading="lazy">
            <span><b>{{ tool.name }}</b><small>{{ tool.role }}</small></span>
          </li>
        </ul>
      </section>

      <!-- 8 · The founder -->
      <section id="about" class="sp-sec sp-founder" aria-labelledby="h-founder" data-reveal>
        <div class="wrap">
          <figure class="photo sp-fade">
            <img src="/images/home/charlie-portrait.jpg" :alt="t('home.founder.alt')" width="1021" height="1276" loading="lazy" decoding="async">
          </figure>
          <div>
            <p class="sp-label">{{ t('home.founder.label') }}</p>
            <h2 id="h-founder" class="sp-sr">{{ t('home.founder.heading') }}</h2>
            <blockquote class="sp-fade" style="--d: 0.12s">{{ t('home.founder.quote') }} <em>{{ t('home.founder.quoteEm') }}</em></blockquote>
            <p class="body sp-fade" style="--d: 0.24s">{{ t('home.founder.body') }}</p>
            <div class="sig sp-fade" style="--d: 0.36s">
              <b>Charlie Stevens</b>
              <span class="sp-label">{{ t('home.founder.role') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Playbook -->
      <section id="playbook" class="sp-sec sp-book" aria-labelledby="h-book" data-reveal>
        <div class="wrap sp-fade">
          <img src="/images/playbook-cover.png" alt="The Bitcoin Estate Playbook cover" width="208" height="294" loading="lazy">
          <div>
            <p class="sp-label">{{ t('home.playbook.label') }}</p>
            <h2 id="h-book">{{ t('playbook.heading') }}</h2>
            <p class="body">{{ t('playbook.body') }}</p>
            <button
              type="button"
              class="sp-btn ghost"
              data-fillout-id="wjPHP61hErus"
              data-fillout-embed-type="popup"
              data-fillout-dynamic-resize
              data-fillout-inherit-parameters
              data-fillout-popup-size="medium"
              :data-fillout-parameters="`lang=${locale}`"
            >
              {{ t('playbook.cta') }}
            </button>
          </div>
        </div>
      </section>

      <!-- 9 · Questions -->
      <section id="faq" class="sp-sec sp-faq" aria-labelledby="h-faq" data-reveal>
        <div class="wrap">
          <div>
            <p class="sp-label">{{ t('home.faq.label') }}</p>
            <h2 id="h-faq" class="sp-h2">
              <template v-for="(x, i) in words(t('home.faq.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.faq.titleEm'), count(t('home.faq.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            </h2>
          </div>
          <div class="list sp-fade" style="--d: 0.12s">
            <details v-for="f in faqs" :key="f.q">
              <summary>{{ f.q }}</summary>
              <p>
                {{ f.a }}
                <NuxtLink v-if="f.multisig" class="sp-link" :to="localePath('/multisig')">{{ t('home.faq.multisigLink') }}</NuxtLink>
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- Three family scenarios -->
      <section class="sp-sec sp-cases" aria-labelledby="h-cases" data-reveal>
        <div class="wrap">
          <div>
            <p class="sp-label">{{ t('home.cases.label') }}</p>
            <h2 id="h-cases" class="sp-h2">
              <template v-for="(x, i) in words(t('home.cases.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.cases.titleEm'), count(t('home.cases.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            </h2>
          </div>
          <div class="sp-fade" style="--d: 0.24s">
            <p class="body">{{ t('home.cases.body') }}</p>
            <NuxtLink class="sp-btn ghost" :to="localePath('/use-cases')">{{ t('home.cases.link') }}</NuxtLink>
          </div>
        </div>
      </section>

      <!-- 10 · By appointment -->
      <section class="sp-close" aria-labelledby="h-close" data-reveal>
        <div class="sp-dial" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle class="ring r1" cx="100" cy="100" r="34" />
            <circle class="ring r2" cx="100" cy="100" r="62" />
            <circle class="ring r3" cx="100" cy="100" r="92" />
          </svg>
        </div>
        <div class="in">
          <HomeSpLogo variant="mark" />
          <p class="sp-label">{{ t('home.close.label') }}</p>
          <h2 id="h-close" class="big" style="margin-top: 1.8rem">
            <em><template v-for="(x, i) in words(t('home.close.titleEm'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
            <template v-for="(x, i) in words(t('home.close.title'), count(t('home.close.titleEm')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
          </h2>
          <p class="sub sp-fade" style="--d: 0.8s">{{ t('home.close.sub') }}</p>
          <div class="act sp-fade" style="--d: 0.96s">
            <a class="main sp-btn" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.hero.cta') }}</a>
            <a class="mail" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
            <a class="wa" :href="whatsappUrl" target="_blank" rel="noopener">{{ t('home.close.whatsapp') }}</a>
          </div>
        </div>
      </section>
    </main>

    <HomeFooter />
  </div>
</template>

<style src="~/assets/css/sp-home.css"></style>
