<script setup lang="ts">
  // Homepage — dark "brand film" redesign (Sep 2026).
  // Copy lives in i18n/locales/{en,es}.json under `home.*`; package names, prices,
  // features, testimonials and the playbook reuse their existing keys so they stay
  // in sync with the rest of the site. The page renders its own header and footer.
  definePageMeta({ layout: false })

  const { t, locale } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()

  const BOOKING_URL = 'https://calendly.com/charlie-schellingpoint-jwgf/30min'
  const EMAIL = 'charlie@schellingpoint.xyz'

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
  const scrolled = ref(false)
  const menu = ref<HTMLDetailsElement | null>(null)
  let io: IntersectionObserver | null = null
  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  const closeMenu = () => {
    if (menu.value) menu.value.open = false
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
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
    window.removeEventListener('scroll', onScroll)
    io?.disconnect()
  })
</script>

<template>
  <div ref="root" class="sp-home">
    <div class="sp-light" aria-hidden="true" />
    <div class="sp-grain" aria-hidden="true" />
    <div class="sp-vignette" aria-hidden="true" />

    <!-- Header -->
    <header id="top" class="sp-head" :class="{ 'is-scrolled': scrolled }">
      <NuxtLink class="sp-mark" :to="localePath('/')" aria-label="Schelling Point">
        <HomeSpLogo />
      </NuxtLink>
      <div class="right">
        <nav class="sp-nav" :aria-label="t('home.nav.menu')">
          <a href="#what-we-do">{{ t('home.nav.whatWeDo') }}</a>
          <a href="#engagements">{{ t('home.nav.engagements') }}</a>
          <a href="#stewardship">{{ t('home.nav.stewardship') }}</a>
          <a href="#about">{{ t('home.nav.about') }}</a>
        </nav>
        <span class="sp-lang">
          <NuxtLink :to="switchLocalePath('en')" :aria-current="locale === 'en' ? 'true' : undefined">EN</NuxtLink>
          <NuxtLink :to="switchLocalePath('es')" :aria-current="locale === 'es' ? 'true' : undefined">ES</NuxtLink>
        </span>
        <a class="appt sp-btn ghost sm" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.nav.appointment') }}</a>
        <details ref="menu" class="sp-menu">
          <summary>{{ t('home.nav.menu') }}</summary>
          <nav :aria-label="t('home.nav.menu')">
            <a href="#what-we-do" @click="closeMenu">{{ t('home.nav.whatWeDo') }}</a>
            <a href="#engagements" @click="closeMenu">{{ t('home.nav.engagements') }}</a>
            <a href="#stewardship" @click="closeMenu">{{ t('home.nav.stewardship') }}</a>
            <a href="#about" @click="closeMenu">{{ t('home.nav.about') }}</a>
            <a :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.nav.appointment') }}</a>
          </nav>
        </details>
      </div>
    </header>

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
          </div>
        </div>
      </section>

      <!-- 3 · What we do -->
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
      </section>

      <!-- 4 · How an engagement runs -->
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

      <!-- 5 · Engagements and fees -->
      <section id="engagements" class="sp-sec sp-fees" aria-labelledby="h-fees" data-reveal>
        <div class="top">
          <div>
            <p class="sp-label">{{ t('home.fees.label') }}</p>
            <h2 id="h-fees" class="sp-h2">
              <template v-for="(x, i) in words(t('home.fees.title'))" :key="'a' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template>
              <em><template v-for="(x, i) in words(t('home.fees.titleEm'), count(t('home.fees.title')) + 1)" :key="'b' + i"><span class="sp-w" :style="{ '--d': x.d }">{{ x.w }}</span>{{ ' ' }}</template></em>
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
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="sp-foot">
      <div>
        <NuxtLink class="sp-mark" :to="localePath('/')" aria-label="Schelling Point"><HomeSpLogo /></NuxtLink>
        <p class="conf">{{ t('home.footer.conf') }}</p>
        <p class="social">
          <a href="https://www.linkedin.com/company/schelling-point/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/schellingp21" target="_blank" rel="noopener">X</a>
          <a href="https://instagram.com/schellingpoint21" target="_blank" rel="noopener">Instagram</a>
        </p>
      </div>
      <div>
        <h4 class="sp-label">{{ t('home.footer.firm') }}</h4>
        <ul>
          <li><a href="#what-we-do">{{ t('home.nav.whatWeDo') }}</a></li>
          <li><a href="#engagements">{{ t('home.nav.engagements') }}</a></li>
          <li><a href="#stewardship">{{ t('home.nav.stewardship') }}</a></li>
          <li><a href="#about">{{ t('home.nav.about') }}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="sp-label">{{ t('home.footer.reading') }}</h4>
        <ul>
          <li><NuxtLink :to="localePath('/resources/bitcoin-estate-planning')">{{ t('home.footer.estatePlanning') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/multisig')">{{ t('home.footer.multisig') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/blog')">{{ t('home.footer.blog') }}</NuxtLink></li>
          <li><a href="#playbook">{{ t('home.footer.playbook') }}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="sp-label">{{ t('home.footer.appointment') }}</h4>
        <ul>
          <li><a :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.footer.conversation') }}</a></li>
          <li><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></li>
          <li><span class="plain">schellingpoint.xyz</span></li>
        </ul>
      </div>
      <div class="base">
        <span>{{ t('footer.rights') }}</span>
        <span class="lang">
          <NuxtLink :to="switchLocalePath('en')" :aria-current="locale === 'en' ? 'true' : undefined">English</NuxtLink>
          <NuxtLink :to="switchLocalePath('es')" :aria-current="locale === 'es' ? 'true' : undefined">Español</NuxtLink>
        </span>
      </div>
    </footer>
  </div>
</template>

<style>
/* Named directly so @nuxt/fonts detects and self-hosts both families (the rules below use the tokens). */
.sp-home{font-family:"Carlito",Calibri,"Segoe UI",Arial,sans-serif}
.sp-home .sp-serif-face{font-family:"Gelasio",Georgia,"Times New Roman",serif}

/* ============================================================
   SHARED TOKENS
   ============================================================ */
 .sp-home{
  color-scheme:dark;
  --sp-ink:#0F0E0E;
  --sp-ink-2:#161514;
  --sp-paper:#F4F3EF;
  --sp-mute:#8E8B85;
  --sp-mute-2:#6E6B66;
  --sp-sage:#A6C17C;
  --sp-green:#96CB72;
  --sp-rule:rgba(244,243,239,.13);
  --sp-rule-2:rgba(244,243,239,.24);
  --sp-serif:"Gelasio",Georgia,"Times New Roman",serif;
  --sp-sans:"Carlito",Calibri,"Segoe UI",Arial,sans-serif;
  --sp-mark:"Poppins",ui-sans-serif,system-ui,sans-serif; /* logo wordmark only */
  --sp-ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(0.23,1,0.32,1);
  --ease-in-out:cubic-bezier(0.77,0,0.175,1);
  --ease-state:cubic-bezier(0.2,0,0,1);
  --ring:0 0 0 1px oklch(1 0 0 / 0.08);
  --ring-hover:0 0 0 1px oklch(1 0 0 / 0.13);
  --img-outline:1px solid oklch(1 0 0 / 0.1);
  --sp-gutter:clamp(16px,6vw,96px);
  --sp-section:clamp(88px,14vw,184px);
  --sp-measure:32rem;
  --sp-display:clamp(2.1rem,5.4vw,4.3rem);
  --sp-h2:clamp(1.75rem,3.7vw,2.9rem);
  --sp-label:11px;
}
.sp-home{position:relative;min-height:100vh;background:var(--sp-ink);color:var(--sp-paper);font-family:var(--sp-sans);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip}
.sp-home *{box-sizing:border-box}
:where(.sp-home a){color:inherit}
.sp-home :focus-visible{outline:1px solid var(--sp-sage);outline-offset:5px}
.sp-home em{font-style:italic}
.sp-label{font-family:var(--sp-sans);font-size:var(--sp-label);letter-spacing:.32em;text-transform:uppercase;color:var(--sp-mute);margin:0;font-weight:400}
.sp-h2{font-family:var(--sp-serif);font-weight:400;font-size:var(--sp-h2);line-height:1.16;letter-spacing:-.005em;margin:1.5rem 0 0;text-wrap:balance}
.sp-h2 em{color:var(--sp-mute)}
.sp-link{text-decoration:none;border-bottom:1px solid var(--sp-rule-2);padding-bottom:.2em;transition-property:border-color,color;transition-duration:150ms;transition-timing-function:ease-out}
@media (hover:hover) and (pointer:fine){.sp-link:hover{border-color:var(--sp-sage)}}

/* call-to-action buttons */
.sp-btn{display:inline-flex;align-items:center;gap:.85rem;font-family:var(--sp-serif);font-style:italic;font-size:1.08rem;line-height:1;text-decoration:none;padding:1.05rem 1.6rem 1.05rem 1.35rem;border:0;color:var(--sp-ink);background:var(--sp-paper);box-shadow:none;transition-property:scale,background-color,color,box-shadow;transition-duration:150ms;transition-timing-function:ease-out}
.sp-btn::before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 10px rgba(150,203,114,.8)}
.sp-btn:active{scale:0.96}
.sp-btn.ghost{background:transparent;color:var(--sp-paper);box-shadow:var(--ring)}
@media (hover:hover) and (pointer:fine){
  .sp-btn:hover{background:transparent;color:var(--sp-paper);box-shadow:var(--ring-hover)}
  .sp-btn.ghost:hover{background:rgba(244,243,239,.05);box-shadow:var(--ring-hover)}
}
.sp-btn.sm{font-size:.95rem;padding:.72rem 1.1rem .72rem .95rem;gap:.65rem}
.sp-btn.sm::before{width:5px;height:5px}
.sp-sec{padding:var(--sp-section) var(--sp-gutter) 0;position:relative}
.sp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* atmosphere */
.sp-grain{position:fixed;inset:0;pointer-events:none;z-index:90;opacity:.07;mix-blend-mode:screen;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size:220px 220px}
.sp-vignette{position:fixed;inset:0;pointer-events:none;z-index:89;background:radial-gradient(ellipse at 50% 40%,transparent 45%,rgba(0,0,0,.55) 100%)}
.sp-light{position:fixed;inset:-20%;pointer-events:none;z-index:0;background:radial-gradient(40% 35% at 30% 30%,rgba(244,243,239,.045),transparent 70%)}
.sp-home main,.sp-home footer{position:relative;z-index:1}
@media (prefers-reduced-motion:no-preference){
  .sp-grain{animation:sp-grain 1.2s steps(4) infinite}
  .sp-light{animation:sp-drift 40s ease-in-out infinite alternate}
  @keyframes sp-grain{0%{background-position:0 0}25%{background-position:-40px 30px}50%{background-position:30px -50px}75%{background-position:-20px -20px}100%{background-position:0 0}}
  @keyframes sp-drift{to{transform:translate(18%,12%)}}
}

/* reveal helpers: visible by default, animated only when JS + motion allowed */
.sp-w{display:inline-block}
.sp-home.js .sp-w{opacity:.001;filter:blur(4px);transform:translateY(12px);transition-property:opacity,filter,transform;transition-duration:600ms;transition-timing-function:var(--ease-out);transition-delay:var(--d,0s)}
.sp-home.js .is-in .sp-w{opacity:1;filter:blur(0);transform:none}
.sp-home.js .sp-fade{opacity:0;transform:translateY(12px);filter:blur(4px);transition-property:opacity,transform,filter;transition-duration:600ms;transition-timing-function:var(--ease-out);transition-delay:var(--d,0s)}
.sp-home.js .is-in .sp-fade{filter:blur(0)}
.sp-home.js .is-in .sp-fade{opacity:1;transform:none}
.sp-home.js .sp-draw{transform:scaleX(0);transform-origin:left;transition-property:transform;transition-duration:1s;transition-timing-function:var(--ease-in-out);transition-delay:var(--d,0s)}
.sp-home.js .is-in .sp-draw{transform:scaleX(1)}
@media (prefers-reduced-motion:reduce){
  .sp-home.js .sp-w,.sp-home.js .sp-fade{filter:none;transform:none;transition-property:opacity;transition-duration:200ms;transition-timing-function:ease-out}
  .sp-home.js .sp-draw{transform:none;transition:none}
}

/* ============================================================
   HEADER
   ============================================================ */
.sp-head{position:fixed;top:0;left:0;right:0;z-index:95;padding:calc(env(safe-area-inset-top,0px) + 22px) var(--sp-gutter) 22px;display:flex;align-items:center;justify-content:space-between;gap:24px;transition-property:background-color,border-color;transition-duration:300ms;transition-timing-function:ease-out;border-bottom:1px solid transparent}
.sp-head.is-scrolled{background-color:rgba(15,14,14,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-color:var(--sp-rule)}
.sp-mark{display:flex;align-items:center;gap:12px;text-decoration:none}
.sp-mark .dot{width:8px;height:8px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 12px rgba(150,203,114,.7)}
.sp-mark .word{font-family:var(--sp-mark);font-weight:500;font-size:12.5px;letter-spacing:.2em;line-height:1}
.sp-logo{display:block;height:34px;width:auto}
.sp-logo .w{fill:var(--sp-paper)}.sp-logo .g,.sp-logomark .g{fill:var(--sp-green)}
.sp-logomark{display:block;height:64px;width:auto;margin:0 auto 2.2rem}
.sp-logomark .w{fill:var(--sp-paper)}
.sp-nav{display:none;gap:34px;align-items:center}
.sp-nav a{font-size:13px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:var(--sp-mute);transition-property:color;transition-duration:150ms;transition-timing-function:ease-out}
@media (hover:hover) and (pointer:fine){.sp-nav a:hover{color:var(--sp-paper)}}
.sp-head .appt{white-space:nowrap}

.sp-menu{position:relative}
.sp-menu summary{list-style:none;cursor:pointer;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--sp-mute);padding:6px 0}
.sp-menu summary::-webkit-details-marker{display:none}
.sp-menu[open] summary{color:var(--sp-paper)}
.sp-menu nav{position:absolute;right:0;top:calc(100% + 14px);background:var(--sp-ink-2);box-shadow:var(--ring);transform-origin:top right;padding:18px 22px;display:grid;gap:14px;min-width:200px}
.sp-menu nav a{text-decoration:none;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:var(--sp-mute)}
.sp-head .right{display:flex;align-items:center;gap:26px}
@media (min-width:960px){.sp-nav{display:flex}.sp-menu{display:none}}
@media (max-width:520px){.sp-head .appt{display:none}}

/* ============================================================
   1 · HERO
   ============================================================ */
.sp-hero{position:relative;min-height:100svh;padding:calc(var(--sp-gutter)*1.2 + 70px) var(--sp-gutter) var(--sp-gutter);display:grid;grid-template-columns:minmax(0,1fr);align-content:end;overflow:hidden}
@media (min-width:900px){.sp-hero{grid-template-columns:minmax(0,7fr) minmax(0,5fr);align-content:center;gap:var(--sp-gutter)}}
.sp-hero .txt{max-width:42rem;position:relative}
.sp-hero .eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:3rem}
.sp-hero .eyebrow i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 12px rgba(150,203,114,.7)}
.sp-hero h1{font-family:var(--sp-serif);font-weight:400;font-size:var(--sp-display);line-height:1.1;letter-spacing:-.01em;margin:0;text-wrap:balance}
.sp-hero h1 em{color:var(--sp-mute)}
.sp-hero .rule{height:1px;background:var(--sp-paper);opacity:.22;margin:2.6rem 0 2.2rem}
.sp-hero .tag{font-family:var(--sp-serif);font-size:clamp(1.2rem,1.9vw,1.45rem);line-height:1.4;margin:0 0 1.2rem;max-width:30ch;text-wrap:balance}
.sp-hero .lede{font-size:1.08rem;line-height:1.7;color:var(--sp-mute);max-width:var(--sp-measure);margin:0}
.sp-hero .vow{display:flex;align-items:center;gap:.9rem;margin:1.4rem 0 0;font-family:var(--sp-serif);font-size:1.1rem}
.sp-hero .vow i{flex:none;width:5px;height:5px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 10px rgba(150,203,114,.8)}
.sp-hero .row{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.2rem 2.6rem;margin-top:2.8rem}
.sp-hero .cta{font-family:var(--sp-serif);font-style:italic;font-size:1.08rem}
.sp-dial{position:relative;aspect-ratio:1;width:min(70vw,520px);max-width:100%;justify-self:end;margin-top:3rem}
@media (min-width:900px){.sp-hero .sp-dial{width:min(38vw,640px);margin-top:0;margin-right:calc(var(--sp-gutter)*-.9)}}
.sp-dial svg{width:100%;height:100%;overflow:visible}
.sp-dial circle,.sp-dial line{stroke:var(--sp-paper);fill:none;vector-effect:non-scaling-stroke}
.sp-dial .ring{transform-origin:50% 50%;opacity:.45;stroke-width:.55}
.sp-dial .r1{stroke-dasharray:.8 4.2}.sp-dial .r2{stroke-dasharray:.5 3}.sp-dial .r3{stroke-width:.4;opacity:.3}
.sp-dial .ticks line{stroke-width:.5;opacity:.45}
.sp-dial .pt{fill:var(--sp-green);stroke:none}.sp-dial .glow{fill:var(--sp-green);stroke:none;opacity:.2;filter:blur(6px)}
@media (prefers-reduced-motion:no-preference){
  .sp-dial .r1{animation:sp-rot 120s linear infinite}
  .sp-dial .r2{animation:sp-rot 180s linear infinite reverse}
  .sp-dial .ticks{transform-origin:50% 50%;animation:sp-rot 400s linear infinite}
  .sp-dial .glow{animation:sp-glow 7s ease-in-out infinite}
  @keyframes sp-rot{to{transform:rotate(360deg)}}
  @keyframes sp-glow{50%{opacity:.38}}
}

/* ============================================================
   2 · HOW IT IS HELD
   ============================================================ */
.sp-held .sp-h2{max-width:22ch}
.sp-held .fig{margin:3.6rem 0 0}
.sp-held .fig > .sp-label{margin-bottom:1rem}
.sp-held svg{width:100%;height:auto;display:block;overflow:visible}
.sp-held path{fill:none;stroke:var(--sp-paper);stroke-width:.8;opacity:.7;vector-effect:non-scaling-stroke}
.sp-home.js .sp-held path{stroke-dasharray:1400;stroke-dashoffset:1400;transition-property:stroke-dashoffset;transition-duration:2.4s;transition-timing-function:var(--ease-in-out)}
.sp-home.js .sp-held.is-in path{stroke-dashoffset:0}
.sp-held .node{fill:var(--sp-paper);opacity:.9}
.sp-held .under{margin-top:2.2rem}
.sp-held .under > .sp-label{color:var(--sp-sage);margin-bottom:1.4rem}
.sp-held ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr)}
.sp-held li{position:relative;padding:0 0 2rem 1.8rem}
.sp-held li:last-child{padding-bottom:0}
.sp-held li::before{content:"";position:absolute;left:2px;top:.55em;bottom:-.55em;width:1px;background:var(--sp-green);opacity:.8}
.sp-held li:last-child::before{display:none}
.sp-held li::after{content:"";position:absolute;left:0;top:.55em;width:5px;height:5px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 10px rgba(150,203,114,.75)}
.sp-held h3{font-family:var(--sp-serif);font-weight:400;font-size:1.15rem;margin:0 0 .45rem;line-height:1.35}
.sp-held .opt{font-family:var(--sp-sans);font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--sp-mute);margin-left:.6rem;vertical-align:.2em;white-space:nowrap}
.sp-held li p{margin:0;color:var(--sp-mute);font-size:1rem;line-height:1.65;max-width:26rem}
@media (min-width:900px){
  .sp-held ol{grid-template-columns:repeat(4,minmax(0,1fr))}
  .sp-held li{padding:2rem 2.4rem 0 0}
  .sp-held li::before{left:0;right:0;top:2px;bottom:auto;width:auto;height:1px}
  .sp-held li:last-child::before{display:block}
  .sp-held li::after{top:0;left:0}
}
.sp-held .fine{margin:3rem 0 0;color:var(--sp-mute);font-size:.95rem;max-width:40rem}


/* ============================================================
   INTERLUDE · human imagery, graded into the film
   ============================================================ */
.sp-inter{padding:var(--sp-section) 0 0;position:relative}
.sp-inter .wrap{display:grid;grid-template-columns:minmax(0,1fr);gap:2.6rem;align-items:center}
@media (min-width:900px){.sp-inter .wrap{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:var(--sp-gutter);padding-right:var(--sp-gutter)}}
.sp-photo{position:relative;margin:0;overflow:hidden;aspect-ratio:8 / 7;max-width:100%;background:var(--sp-ink-2)}
@media (max-width:899px){.sp-photo{aspect-ratio:4 / 3}}
.sp-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:30% 40%;
  filter:saturate(.62) brightness(.66) contrast(1.08) sepia(.1);outline:var(--img-outline);outline-offset:-1px;transform:scale(1.06);transition-property:transform;transition-duration:6s;transition-timing-function:var(--ease-out)}
.is-in .sp-photo img{transform:scale(1)}
.sp-photo::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(90deg,transparent 55%,var(--sp-ink) 100%),linear-gradient(0deg,var(--sp-ink) 0%,transparent 28%),linear-gradient(180deg,var(--sp-ink) 0%,transparent 18%),radial-gradient(ellipse at 40% 45%,transparent 50%,rgba(15,14,14,.5) 100%)}
@media (max-width:899px){.sp-photo::after{background:linear-gradient(0deg,var(--sp-ink) 0%,transparent 35%),linear-gradient(180deg,var(--sp-ink) 0%,transparent 20%)}}
.sp-inter .txt{padding:0 var(--sp-gutter)}
@media (min-width:900px){.sp-inter .txt{padding:0}}
.sp-inter .sp-h2{max-width:20ch}
.sp-inter p.body{color:var(--sp-mute);margin:1.8rem 0 0;max-width:28rem}
@media (prefers-reduced-motion:reduce){.sp-photo img{transform:none;transition:none}}

/* ============================================================
   3 · WHAT WE DO  (services, each with its fee)
   ============================================================ */
.sp-do .head{display:grid;gap:1.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-do .head{grid-template-columns:minmax(0,7fr) minmax(0,5fr);align-items:end;gap:var(--sp-gutter)}}
.sp-do .head p{color:var(--sp-mute);margin:0;max-width:26rem}
.sp-do ul{list-style:none;margin:4rem 0 0;padding:0;border-top:1px solid var(--sp-rule)}
.sp-do li{display:grid;grid-template-columns:minmax(0,1fr);gap:.5rem 2.4rem;padding:2rem 0;border-bottom:1px solid var(--sp-rule);position:relative}
@media (min-width:760px){.sp-do li{grid-template-columns:minmax(0,5fr) minmax(0,6fr) minmax(0,3fr);align-items:baseline}}
.sp-do h3{font-family:var(--sp-serif);font-weight:400;font-size:clamp(1.35rem,2.4vw,1.8rem);line-height:1.2;margin:0}
.sp-do li p{margin:0;color:var(--sp-mute);max-width:30rem}
.sp-do .fee{font-family:var(--sp-serif);font-size:1.15rem;font-variant-numeric:tabular-nums lining-nums;white-space:nowrap}
@media (min-width:760px){.sp-do .fee{text-align:right}}
.sp-do .fee small{display:block;font-family:var(--sp-sans);font-size:var(--sp-label);letter-spacing:.24em;text-transform:uppercase;color:var(--sp-mute);margin-top:.35rem}
.sp-do li .mk{position:absolute;left:0;top:-1px;height:1px;width:3.5rem;background:var(--sp-green);transform:scaleX(0);transform-origin:left;transition-property:transform;transition-duration:200ms;transition-timing-function:ease-out}
@media (hover:hover) and (pointer:fine){.sp-do li:hover .mk{transform:scaleX(1)}}
.sp-do .start{display:flex;flex-wrap:wrap;gap:.8rem 2rem;align-items:baseline;justify-content:space-between;margin-top:2rem;color:var(--sp-mute)}
.sp-do .start strong{font-weight:400;color:var(--sp-paper)}

/* ============================================================
   4 · HOW AN ENGAGEMENT RUNS  (timeline)
   ============================================================ */
.sp-run .sp-h2{max-width:20ch}
.sp-run .runsub{color:var(--sp-mute);margin:1.4rem 0 0;max-width:30rem}
.sp-run .track{margin-top:4.4rem;position:relative}
.sp-run ol{list-style:none;margin:0;padding:0 0 0 2.2rem;display:grid;grid-template-columns:minmax(0,1fr);gap:2.4rem;position:relative}
/* family line (off-white) and our line (green), parallel, never crossing */
.sp-run ol::before{content:"";position:absolute;left:12px;top:.6em;bottom:0;width:1px;background:var(--sp-paper);opacity:.35}
.sp-run ol::after{content:"";position:absolute;left:2px;top:.6em;bottom:-3rem;width:1px;background:linear-gradient(var(--sp-green),var(--sp-green) 85%,transparent)}
.sp-run li{position:relative}
.sp-run li::before{content:"";position:absolute;left:calc(-2.2rem + 10px);top:.5em;width:5px;height:5px;border-radius:50%;background:var(--sp-paper)}
.sp-run .when{display:block;margin-bottom:.6rem}
.sp-run h3{font-family:var(--sp-serif);font-weight:400;font-size:1.3rem;margin:0 0 .5rem;line-height:1.3}
.sp-run li p{margin:0;color:var(--sp-mute);max-width:24rem}
.sp-run .alongside{display:flex;align-items:center;gap:12px;margin:3.6rem 0 0 0;color:var(--sp-sage)}
.sp-run .alongside i{width:6px;height:6px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 12px rgba(150,203,114,.8)}
@media (min-width:980px){
  .sp-run ol{grid-template-columns:repeat(5,minmax(0,1fr));padding:0;gap:0}
  .sp-run ol::before{left:0;right:0;top:0;bottom:auto;width:auto;height:1px}
  .sp-run ol::after{display:none}
  .sp-run li{padding:2.2rem 2rem 0 0}
  .sp-run li::before{left:0;top:-2px}
  .sp-run .green{position:relative;height:1px;margin-top:3rem;margin-right:calc(var(--sp-gutter)*-1);background:linear-gradient(90deg,var(--sp-green),var(--sp-green) 80%,transparent)}
  .sp-run .green::before{content:"";position:absolute;left:-3px;top:-3px;width:7px;height:7px;border-radius:50%;background:var(--sp-green);box-shadow:0 0 12px rgba(150,203,114,.8)}
  .sp-run .alongside{margin-top:1.2rem}
  .sp-run .alongside i{display:none}
}
@media (max-width:979px){.sp-run .green{display:none}}
.sp-run .leave{margin:3.4rem 0 0;font-family:var(--sp-serif);font-size:1.2rem;max-width:34rem}
.sp-run .leave em{color:var(--sp-mute)}

/* ============================================================
   5 · ENGAGEMENTS AND FEES
   ============================================================ */
.sp-fees .top{display:grid;gap:1.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-fees .top{grid-template-columns:minmax(0,7fr) minmax(0,5fr);align-items:end;gap:var(--sp-gutter)}}
.sp-fees .top p{color:var(--sp-mute);margin:0;max-width:26rem}
.sp-fees .pk{margin-top:4rem;display:grid;grid-template-columns:minmax(0,1fr);border-top:1px solid var(--sp-rule)}
@media (min-width:900px){.sp-fees .pk{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sp-fees article{padding:2.4rem 0 2.6rem;border-bottom:1px solid var(--sp-rule);display:flex;flex-direction:column;position:relative}
@media (min-width:900px){
  .sp-fees article{padding:2.6rem 2.4rem 2.8rem;border-bottom:0;border-left:1px solid var(--sp-rule)}
  .sp-fees article:first-child{border-left:0;padding-left:0}
  .sp-fees article:last-child{padding-right:0}
}
.sp-fees article.pick::before{content:"";position:absolute;top:-1px;left:0;right:0;height:1px;background:var(--sp-paper);opacity:.6}
@media (min-width:900px){.sp-fees article.pick::before{left:0;right:0}}
.sp-fees .tag{min-height:1.2em;color:var(--sp-sage)}
.sp-fees h3{font-family:var(--sp-serif);font-weight:400;font-size:1.7rem;margin:.9rem 0 0;line-height:1.2}
.sp-fees .who{color:var(--sp-mute);margin:.6rem 0 0;font-size:.98rem;min-height:4.8em}
.sp-fees .price{margin:1.6rem 0 0;display:flex;align-items:baseline;gap:.8rem;font-variant-numeric:tabular-nums lining-nums}
.sp-fees .price b{font-family:var(--sp-serif);font-weight:400;font-size:clamp(2rem,3.4vw,2.6rem);letter-spacing:-.01em}
.sp-fees .price span{color:var(--sp-mute);font-size:.9rem}
.sp-fees ul{list-style:none;margin:1.8rem 0 0;padding:0;display:grid;gap:.75rem;align-content:start;flex:1}
.sp-fees li{position:relative;padding-left:1.3rem;color:var(--sp-paper);font-size:.98rem;line-height:1.5}
.sp-fees li::before{content:"";position:absolute;left:0;top:.62em;width:.6rem;height:1px;background:var(--sp-mute)}
.sp-fees li.inc{color:var(--sp-mute)}
.sp-fees .go{margin-top:2.2rem;align-self:flex-start}
.sp-fees .cont{margin-top:4.4rem;display:grid;gap:2rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-fees .cont{grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:var(--sp-gutter)}}
.sp-fees .cont h3{font-size:1.4rem;margin:.9rem 0 0}
.sp-fees .cont .intro p{color:var(--sp-mute);margin:.7rem 0 0;max-width:22rem}
.sp-fees table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums lining-nums}
.sp-fees th,.sp-fees td{text-align:left;padding:1.15rem 0;border-bottom:1px solid var(--sp-rule);vertical-align:baseline}
.sp-fees thead th{padding-top:0}
.sp-fees tr:first-child td{border-top:1px solid var(--sp-rule)}
.sp-fees td.n{font-family:var(--sp-serif);font-size:1.1rem;padding-right:1rem}
.sp-fees td.d{color:var(--sp-mute);padding-right:1rem}
.sp-fees td.v{font-family:var(--sp-serif);font-size:1.1rem;text-align:right;white-space:nowrap}
@media (max-width:620px){
  .sp-fees tr{display:grid;grid-template-columns:1fr auto;border-bottom:1px solid var(--sp-rule);padding:1rem 0}
  .sp-fees tr:first-child{border-top:1px solid var(--sp-rule)}
  .sp-fees tr td{border:0!important;padding:0}
  .sp-fees td.d{grid-column:1 / -1;grid-row:2;margin-top:.3rem}
}
.sp-fees .terms{margin-top:2.6rem;display:grid;gap:.8rem 2.4rem;grid-template-columns:minmax(0,1fr);color:var(--sp-mute);font-size:.95rem}
@media (min-width:760px){.sp-fees .terms{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sp-fees .terms p{margin:0;padding-top:1rem;border-top:1px solid var(--sp-rule)}

/* ============================================================
   6 · IN THEIR WORDS
   ============================================================ */
.sp-words .grid{margin-top:3.6rem;display:grid;gap:3.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-words .grid{grid-template-columns:repeat(12,minmax(0,1fr));gap:3rem 2rem}}
.sp-words figure{margin:0}
@media (min-width:900px){
  .sp-words figure:nth-child(1){grid-column:1 / span 7}
  .sp-words figure:nth-child(2){grid-column:6 / span 6;margin-top:1rem}
  .sp-words figure:nth-child(3){grid-column:2 / span 6}
}
.sp-words blockquote{margin:0;font-family:var(--sp-serif);font-size:clamp(1.3rem,2.3vw,1.75rem);line-height:1.38;text-wrap:pretty}
.sp-words figure:nth-child(1) blockquote{font-size:clamp(1.5rem,2.9vw,2.2rem)}
.sp-words blockquote::before{content:"\201C";color:var(--sp-mute);margin-right:.05em}
.sp-words blockquote::after{content:"\201D";color:var(--sp-mute)}
.sp-words figcaption{margin-top:1.2rem;display:flex;align-items:center;gap:12px}
.sp-words figcaption::before{content:"";width:1.8rem;height:1px;background:var(--sp-rule-2)}

/* ============================================================
   7 · WORKING ALONGSIDE (partner logos)
   ============================================================ */
.sp-partners .top{display:grid;gap:1rem 2.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-partners .top{grid-template-columns:minmax(0,4fr) minmax(0,8fr);align-items:baseline}}
.sp-partners .note{color:var(--sp-mute);font-size:.98rem;margin:0;max-width:36rem}
.sp-partners .row{list-style:none;margin:2.4rem 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--sp-rule)}
@media (min-width:760px){.sp-partners .row{grid-template-columns:repeat(4,minmax(0,1fr))}}
.sp-partners li{display:flex;align-items:center;gap:14px;padding:1.4rem 1rem 1.4rem 0;border-bottom:1px solid var(--sp-rule)}
.sp-partners img{flex:none;width:28px;height:28px;border-radius:50%;object-fit:cover;filter:grayscale(1) brightness(1.1) contrast(.9);opacity:.75;outline:var(--img-outline);outline-offset:-1px;transition-property:filter,opacity;transition-duration:150ms;transition-timing-function:ease-out}
@media (hover:hover) and (pointer:fine){.sp-partners li:hover img{filter:none;opacity:1}}
.sp-partners li span{display:grid;line-height:1.3}
.sp-partners b{font-family:var(--sp-serif);font-weight:400;font-size:1.05rem}
.sp-partners small{color:var(--sp-mute);font-size:.82rem;margin-top:.15rem}

/* ============================================================
   8 · THE FOUNDER
   ============================================================ */
.sp-founder .wrap{display:grid;gap:3rem;grid-template-columns:minmax(0,1fr);align-items:center}
@media (min-width:900px){.sp-founder .wrap{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:var(--sp-gutter)}}
.sp-founder .photo{margin:0;aspect-ratio:4 / 5;max-width:100%;position:relative;overflow:hidden;background:var(--sp-ink-2)}
@media (max-width:899px){.sp-founder .photo{max-width:420px}}
.sp-founder .photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 20%;filter:saturate(.9) contrast(1.03);outline:var(--img-outline);outline-offset:-1px}
.sp-founder .photo::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,var(--sp-ink) 0%,transparent 22%),radial-gradient(ellipse at 50% 40%,transparent 60%,rgba(15,14,14,.35) 100%)}
.sp-founder blockquote{margin:1.8rem 0 0;font-family:var(--sp-serif);font-size:clamp(1.35rem,2.5vw,1.9rem);line-height:1.35;max-width:30ch}
.sp-founder blockquote em{color:var(--sp-mute)}
.sp-founder p.body{color:var(--sp-mute);margin:1.8rem 0 0;max-width:var(--sp-measure)}
.sp-founder .sig{margin-top:2rem;display:flex;flex-wrap:wrap;gap:.6rem 2.4rem;align-items:baseline}
.sp-founder .sig b{font-family:var(--sp-serif);font-weight:400;font-size:1.1rem}

/* ============================================================
   9 · QUESTIONS
   ============================================================ */
.sp-faq .wrap{display:grid;gap:2.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-faq .wrap{grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:var(--sp-gutter)}}
.sp-faq .list{border-top:1px solid var(--sp-rule)}
.sp-faq details{border-bottom:1px solid var(--sp-rule)}
.sp-faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:baseline;gap:1.6rem;padding:1.5rem 0;font-family:var(--sp-serif);font-size:1.18rem;line-height:1.35}
.sp-faq summary::-webkit-details-marker{display:none}
.sp-faq summary::after{content:"";flex:none;width:9px;height:9px;border-right:1px solid var(--sp-mute);border-bottom:1px solid var(--sp-mute);transform:rotate(45deg) translateY(-3px);transition-property:transform;transition-duration:200ms;transition-timing-function:var(--ease-in-out)}
.sp-faq details[open] summary::after{transform:rotate(225deg) translateY(-3px)}
.sp-faq details p{margin:0;padding:0 2.4rem 1.7rem 0;color:var(--sp-mute);max-width:36rem}

/* ============================================================
   10 · BY APPOINTMENT (closing)
   ============================================================ */
.sp-close{padding:var(--sp-section) var(--sp-gutter);text-align:center;position:relative;overflow:hidden}
.sp-close .sp-dial{position:absolute;inset:0;margin:auto;width:min(110vw,860px);height:auto;opacity:.5;justify-self:auto}
.sp-close .in{position:relative;max-width:40rem;margin:0 auto}
.sp-close .big{font-family:var(--sp-serif);font-weight:400;font-size:clamp(1.9rem,4.6vw,3.5rem);line-height:1.15;margin:0;text-wrap:balance}
.sp-close .big em{color:var(--sp-mute)}
.sp-close .sub{color:var(--sp-mute);margin:1.8rem auto 0;max-width:28rem}
.sp-close .act{margin-top:3rem;display:flex;flex-direction:column;align-items:center;gap:1.2rem}
.sp-close .act .main{font-size:1.15rem}
.sp-close .act .mail{font-size:.98rem;color:var(--sp-mute);user-select:all}

/* ============================================================
   FOOTER
   ============================================================ */
.sp-foot{padding:3.6rem var(--sp-gutter) calc(2.4rem + env(safe-area-inset-bottom,0px));border-top:1px solid var(--sp-rule);display:grid;gap:2.4rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:900px){.sp-foot{grid-template-columns:minmax(0,4fr) repeat(3,minmax(0,2fr))}}
.sp-foot h4{margin:0 0 1rem}
.sp-foot ul{list-style:none;margin:0;padding:0;display:grid;gap:.55rem}
.sp-foot a{text-decoration:none;color:var(--sp-mute);font-size:.95rem;transition-property:color;transition-duration:150ms;transition-timing-function:ease-out}
@media (hover:hover) and (pointer:fine){.sp-foot a:hover{color:var(--sp-paper)}}
.sp-foot .conf{color:var(--sp-mute);font-size:.95rem;max-width:22rem;margin:1.2rem 0 0}
.sp-foot .base{grid-column:1 / -1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;padding-top:1.6rem;border-top:1px solid var(--sp-rule);color:var(--sp-mute-2);font-size:.85rem}
.sp-foot .lang a{margin-left:1rem}
.sp-foot .lang a[aria-current]{color:var(--sp-paper)}



/* header language switch */
.sp-lang{display:none;gap:10px;font-size:12px;letter-spacing:.18em}
.sp-lang a{text-decoration:none;color:var(--sp-mute);transition-property:color;transition-duration:150ms;transition-timing-function:ease-out}
.sp-lang a[aria-current]{color:var(--sp-paper)}
@media (min-width:960px){.sp-lang{display:inline-flex}}
@media (hover:hover) and (pointer:fine){.sp-lang a:hover{color:var(--sp-paper)}}

/* playbook */
.sp-book .wrap{display:grid;gap:2rem;grid-template-columns:minmax(0,1fr);align-items:center;padding-top:2.4rem;border-top:1px solid var(--sp-rule)}
@media (min-width:760px){.sp-book .wrap{grid-template-columns:auto minmax(0,1fr);gap:3.2rem}}
.sp-book img{width:150px;height:auto;outline:var(--img-outline);outline-offset:-1px;box-shadow:0 20px 40px rgba(0,0,0,.45)}
.sp-book h2{font-family:var(--sp-serif);font-weight:400;font-size:clamp(1.5rem,2.6vw,2rem);line-height:1.2;margin:1rem 0 0}
.sp-book .body{color:var(--sp-mute);margin:.9rem 0 1.8rem;max-width:34rem}

/* footer extras */
.sp-foot .social{display:flex;gap:1.4rem;margin:1.4rem 0 0}
.sp-foot .plain{color:var(--sp-mute);font-size:.95rem}
.sp-close .act .mail{text-decoration:none}

</style>
