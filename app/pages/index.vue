<script setup lang="ts">
  import { Blocks, Menu, RotateCcw, ShieldAlert } from 'lucide-vue-next'

  const { t, locale } = useI18n()
  const mobileMenuOpen = ref(false)

  const scrollToSection = (hash: string) => {
    mobileMenuOpen.value = false
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  const whatsappUrl = computed(() => {
    const message = encodeURIComponent(t('common.whatsappMessage'))
    return `https://wa.me/50370204642?text=${message}`
  })

  // Pricing tiers — copy and prices live in the locale files (packages.*).
  const tiers = computed(() => [
    {
      key: 'foundation',
      title: t('packages.foundationTitle'),
      who: t('packages.foundationWho'),
      price: t('packages.foundationPrice'),
      sats: t('packages.foundationSats'),
      cta: t('packages.foundationCta'),
      features: [
        t('packages.foundationFeature1'),
        t('packages.foundationFeature2'),
        t('packages.foundationFeature3'),
        t('packages.foundationFeature4'),
        t('packages.foundationFeature5')
      ]
    },
    {
      key: 'family',
      title: t('packages.familyTitle'),
      who: t('packages.familyWho'),
      badge: t('packages.familyBadge'),
      highlighted: true,
      price: t('packages.familyPrice'),
      sats: t('packages.familySats'),
      cta: t('packages.familyCta'),
      features: [
        t('packages.familyFeature1'),
        t('packages.familyFeature2'),
        t('packages.familyFeature3'),
        t('packages.familyFeature4'),
        t('packages.familyFeature5'),
        t('packages.familyFeature6')
      ]
    },
    {
      key: 'legacy',
      title: t('packages.legacyTitle'),
      who: t('packages.legacyWho'),
      price: t('packages.legacyPrice'),
      sats: t('packages.legacySats'),
      cta: t('packages.legacyCta'),
      features: [
        t('packages.legacyFeature1'),
        t('packages.legacyFeature2'),
        t('packages.legacyFeature3'),
        t('packages.legacyFeature4'),
        t('packages.legacyFeature5'),
        t('packages.legacyFeature6')
      ]
    }
  ])

  // Individual services shown beneath the tiers.
  const serviceRows = computed(() => [
    {
      name: t('packages.svcAssessName'),
      desc: t('packages.svcAssessDesc'),
      usd: t('packages.svcAssessUsd'),
      sats: ''
    },
    {
      name: t('packages.svcSetupName'),
      desc: t('packages.svcSetupDesc'),
      usd: t('packages.svcSetupUsd'),
      sats: t('packages.svcSetupSats')
    },
    {
      name: t('packages.svcReviewName'),
      desc: t('packages.svcReviewDesc'),
      usd: t('packages.svcReviewUsd'),
      sats: t('packages.svcReviewSats')
    },
    {
      name: t('packages.svcInheritName'),
      desc: t('packages.svcInheritDesc'),
      usd: t('packages.svcInheritUsd'),
      sats: t('packages.svcInheritSats')
    },
    {
      name: t('packages.svcAdvisoryName'),
      desc: t('packages.svcAdvisoryDesc'),
      usd: t('packages.svcAdvisoryUsd'),
      sats: t('packages.svcAdvisorySats')
    },
    {
      name: t('packages.svcEssentialName'),
      desc: t('packages.svcEssentialDesc'),
      usd: t('packages.svcEssentialUsd'),
      sats: t('packages.svcEssentialSats')
    },
    {
      name: t('packages.svcAdvancedName'),
      desc: t('packages.svcAdvancedDesc'),
      usd: t('packages.svcAdvancedUsd'),
      sats: t('packages.svcAdvancedSats')
    },
    {
      name: t('packages.svcPremiumName'),
      desc: t('packages.svcPremiumDesc'),
      usd: t('packages.svcPremiumUsd'),
      sats: t('packages.svcPremiumSats')
    }
  ])

  useSeoMeta({
    title: () => t('seo.title'),
    description: () => t('seo.description')
  })

  // Loads the Fillout embed script so the playbook popup opens on click.
  useHead({
    script: [{ src: 'https://server.fillout.com/embed/v1/', defer: true }]
  })

  // FAQ entries — kept in sync with FaqAccordion.vue and the locale files.
  // Emitted server-side as a FAQPage so Google is eligible for FAQ rich results
  // and AI answer engines can read the Q&A directly from raw HTML.
  const faqSchemas = [1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
    defineQuestion({
      name: () => t(`faq.q${i}`),
      acceptedAnswer: () => t(`faq.a${i}`)
    })
  )

  useSchemaOrg([
    defineWebPage({
      '@type': 'FAQPage',
      name: () => t('seo.title'),
      description: () => t('seo.description')
    }),
    ...faqSchemas
  ])
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Navbar -->
    <header>
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
      >
        <NuxtLink to="/">
          <img src="/sp-logo.png" alt="Schelling Point" class="h-8 w-auto">
        </NuxtLink>

        <div class="hidden items-center gap-8 md:flex">
          <NuxtLink
            to="/"
            class="text-sm text-white transition-colors hover:text-white/70"
          >
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink
            to="#packages"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            {{ t('nav.packages') }}
          </NuxtLink>
          <NuxtLink
            to="#faq"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            {{ t('nav.faq') }}
          </NuxtLink>
          <NuxtLink
            to="#playbook"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            {{ t('playbook.navLabel') }}
          </NuxtLink>
          <NuxtLink
            to="/resources/bitcoin-estate-planning"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            {{ t('nav.resources') }}
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            {{ t('nav.blog') }}
          </NuxtLink>
          <UiButton
            as="a"
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="rounded-full bg-primary px-5 text-sm text-white hover:bg-primary/90"
          >
            {{ t('nav.getStarted') }}
          </UiButton>
          <LanguageSwitcher />
        </div>

        <!-- Mobile hamburger -->
        <UiSheet v-model:open="mobileMenuOpen">
          <UiSheetTrigger as-child>
            <button class="md:hidden" aria-label="Open menu">
              <Menu class="size-6 text-white" />
            </button>
          </UiSheetTrigger>
          <UiSheetContent side="right" class="flex flex-col gap-6 p-6">
            <UiSheetTitle class="sr-only">Menu</UiSheetTitle>
            <nav class="mt-8 flex flex-col gap-6">
              <NuxtLink
                to="/"
                class="text-lg text-white transition-colors hover:text-white/70"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.home') }}
              </NuxtLink>
              <button
                class="text-left text-lg text-white/70 transition-colors hover:text-white"
                @click="scrollToSection('#packages')"
              >
                {{ t('nav.packages') }}
              </button>
              <button
                class="text-left text-lg text-white/70 transition-colors hover:text-white"
                @click="scrollToSection('#faq')"
              >
                {{ t('nav.faq') }}
              </button>
              <button
                class="text-left text-lg text-white/70 transition-colors hover:text-white"
                @click="scrollToSection('#playbook')"
              >
                {{ t('playbook.navLabel') }}
              </button>
              <NuxtLink
                to="/resources/bitcoin-estate-planning"
                class="text-lg text-white/70 transition-colors hover:text-white"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.resources') }}
              </NuxtLink>
              <NuxtLink
                to="/blog"
                class="text-lg text-white/70 transition-colors hover:text-white"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.blog') }}
              </NuxtLink>
              <UiButton
                as="a"
                href="https://tally.so/r/KY0PX8"
                target="_blank"
                rel="noopener"
                class="rounded-full bg-primary px-5 text-sm text-white hover:bg-primary/90"
                @click="mobileMenuOpen = false"
              >
                {{ t('nav.getStarted') }}
              </UiButton>
              <LanguageSwitcher />
            </nav>
          </UiSheetContent>
        </UiSheet>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden px-6 pt-16 pb-24">
      <div
        class="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2"
      >
        <div>
          <h1 class="max-w-lg text-5xl font-bold leading-[1.1] md:text-7xl">
            <span class="text-gradient">{{ t('hero.bitcoin') }}</span>
            {{ t('hero.estate') }}
            <span class="text-gradient">{{ t('hero.planning') }}</span>
          </h1>
          <p
            class="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {{ t('hero.description') }}
          </p>
          <div class="mt-8 flex flex-col gap-4">
            <div class="flex flex-row flex-wrap items-center gap-4">
              <UiButton
                as="a"
                href="https://tally.so/r/KY0PX8"
                target="_blank"
                rel="noopener"
                class="h-auto rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
              >
                {{ t('common.bookCta') }}
              </UiButton>
            </div>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
              {{ t('hero.whatsapp') }}
            </a>
          </div>
        </div>

        <div class="relative hidden lg:block">
          <div class="hero-image-wrapper relative">
            <img
              src="/images/hero.jpg"
              alt="Bitcoin self custody security"
              class="h-auto w-full rounded-2xl object-cover"
            >
            <div
              class="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(150,201,113,0.25)_0%,transparent_60%)]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Playbook feature band (directly under hero) -->
    <section id="playbook" class="px-6 pt-4 pb-16">
      <div class="mx-auto max-w-7xl">
        <div
          class="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 to-transparent p-8 md:p-12"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(123,168,92,0.18)_0%,transparent_55%)]"
          />
          <div
            class="relative grid items-center gap-8 md:grid-cols-[auto_1fr]"
          >
            <div class="flex justify-center md:justify-start">
              <NuxtImg
                src="/images/playbook-cover.png"
                alt="The Bitcoin Estate Playbook cover"
                class="w-44 rounded-lg shadow-2xl ring-1 ring-white/10 md:w-52"
                width="208"
                height="294"
                loading="lazy"
              />
            </div>
            <div class="text-center md:text-left">
              <p
                class="text-sm font-medium uppercase tracking-wider text-primary"
              >
                {{ t('playbook.badge') }}
              </p>
              <h2 class="mt-2 text-3xl font-bold md:text-4xl">
                {{ t('playbook.heading') }}
              </h2>
              <p
                class="mx-auto mt-3 max-w-lg text-muted-foreground md:mx-0"
              >
                {{ t('playbook.body') }}
              </p>
              <div class="mt-6 flex justify-center md:justify-start">
                <button
                  type="button"
                  data-fillout-id="wjPHP61hErus"
                  data-fillout-embed-type="popup"
                  data-fillout-dynamic-resize
                  data-fillout-inherit-parameters
                  data-fillout-popup-size="medium"
                  :data-fillout-parameters="`lang=${locale}`"
                  class="h-auto rounded-full bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90"
                >
                  {{ t('playbook.cta') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links & Divider -->
    <div class="px-6">
      <div class="mx-auto max-w-7xl">
        <div class="flex items-center gap-4 pb-6">
          <a
            href="https://instagram.com/schellingpoint21"
            target="_blank"
            rel="noopener"
            class="text-white/40 transition-colors hover:text-white"
            aria-label="Instagram"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          <a
            href="https://x.com/schellingp21"
            target="_blank"
            rel="noopener"
            class="text-white/40 transition-colors hover:text-white"
            aria-label="X"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/schelling-point/"
            target="_blank"
            rel="noopener"
            class="text-white/40 transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <SectionSeparator />

    <!-- Bitcoin Done the Right Way -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('rightWay.title1') }}
            <br>
            {{ t('rightWay.title2') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('rightWay.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <!-- Large card -->
          <div
            class="overflow-hidden rounded-2xl border border-border bg-card md:col-span-2"
          >
            <img
              src="/images/vault.jpg"
              alt="Bitcoin vault structure"
              class="h-72 w-full object-cover"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                {{ t('rightWay.vaultDesc') }}
                <br>
                <strong class="font-semibold text-white"
                  >{{ t('rightWay.spending') }}</strong
                >, <strong class="font-semibold text-white">
                  {{ t('rightWay.savings') }}
                </strong>, and
                <strong class="font-semibold text-white"
                  >{{ t('rightWay.vault') }}</strong
                >
              </p>
            </div>
          </div>

          <!-- Left small card -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/family.png"
              alt="Family following written protocols"
              class="h-60 w-full object-cover"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                {{ t('rightWay.protocolsPre') }}
                <strong class="font-semibold text-white"
                  >{{ t('rightWay.protocols') }}</strong
                >
                {{ t('rightWay.protocolsPost') }}
                <br>
                {{ t('rightWay.protocolsLine2') }}
              </p>
            </div>
          </div>

          <!-- Right small card -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/me.jpg"
              alt="Point of contact"
              class="h-60 w-full object-cover object-top grayscale"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                {{ t('rightWay.contactPre') }}
                <strong class="font-semibold text-white"
                  >{{ t('rightWay.contact') }}</strong
                >
                <br>
                {{ t('rightWay.contactPost') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- You Don't Get a Second Chance -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('secondChance.title1') }}
            <br>
            {{ t('secondChance.title2') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('secondChance.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>

        <div class="grid gap-8 md:grid-cols-2">
          <!-- Left: Image -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/grandpa.jpg"
              alt="Self custody for your family's future"
              class="h-full w-full object-cover"
            >
          </div>

          <!-- Right: Questions -->
          <div class="flex flex-col justify-center">
            <h3 class="mb-6 text-xl font-semibold">
              {{ t('secondChance.subheading') }}
            </h3>
            <div class="divide-y divide-border">
              <p class="py-4 text-sm text-muted-foreground">
                {{ t('secondChance.q1') }}
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                {{ t('secondChance.q2') }}
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                {{ t('secondChance.q3') }}
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                {{ t('secondChance.q4') }}
              </p>
            </div>
           <div class="mt-8">
              <p class="text-sm text-muted-foreground">
               {{ t('secondChance.closing1') }}
                </p>
                <p class="mt-1 text-lg font-semibold">
              {{ t('secondChance.closing2') }}
          </p>
         <a
    href="https://tally.so/r/NpVjPb"
    target="_blank"
    rel="noopener"
    class="mt-4 inline-flex h-auto rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
  >
    {{ t('common.takeQuiz') }}
  </a>
</div>
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- Learn About What We Do -->
    <section class="px-6 pb-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('whatWeDo.title1') }}
            <br>
            {{ t('whatWeDo.title2') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('whatWeDo.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>

        <div class="space-y-4">
          <!-- Row 1 -->
          <div class="grid gap-4 md:grid-cols-2">
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-muted-foreground">{{ t('whatWeDo.row1a') }}</p>
              <p class="mt-1 text-lg font-semibold text-white">
                {{ t('whatWeDo.row1b') }}
              </p>
            </div>
            <div
              class="flex h-52 items-center justify-center rounded-2xl border border-border bg-card"
            >
              <Blocks class="size-10 text-primary/50" />
            </div>
          </div>

          <!-- Row 2 -->
          <div class="grid gap-4 md:grid-cols-2">
            <div
              class="flex h-52 items-center justify-center rounded-2xl border border-border bg-card"
            >
              <ShieldAlert class="size-10 text-primary/50" />
            </div>
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ t('whatWeDo.row2') }}
              </p>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="grid gap-4 md:grid-cols-2">
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-muted-foreground">{{ t('whatWeDo.row3a') }}</p>
              <p class="mt-1 text-lg font-semibold text-white">
                <i18n-t keypath="whatWeDo.row3b" tag="span">
                  <template #recovery><strong>{{ t('whatWeDo.recovery') }}</strong></template>
                  <template #continuity><strong>{{ t('whatWeDo.continuity') }}</strong></template>
                </i18n-t>
              </p>
            </div>
            <div
              class="flex h-52 items-center justify-center rounded-2xl border border-border bg-card"
            >
              <RotateCcw class="size-10 text-primary/50 " />
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 4: The Framework — Spending, Savings, Vault -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('framework.heading') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('framework.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>
        <p class="mb-12 max-w-xl text-muted-foreground">
          {{ t('framework.intro') }}
        </p>

        <div class="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Connecting line -->
          <div
            class="absolute top-1/2 left-[16%] right-[16%] hidden h-px bg-border md:block"
          />

          <!-- Spending -->
          <div
            class="relative rounded-2xl border border-border bg-card p-8 text-center"
          >
            <div
              class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10"
            >
              <svg
                class="size-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white">
              {{ t('framework.spendingTitle') }}
            </h3>
            <p class="mt-3 text-sm text-muted-foreground">
              {{ t('framework.spendingDesc') }}
            </p>
          </div>

          <!-- Savings -->
          <div
            class="relative rounded-2xl border border-primary/30 bg-card p-8 text-center md:-translate-y-4"
          >
            <div
              class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10"
            >
              <svg
                class="size-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white">
              {{ t('framework.savingsTitle') }}
            </h3>
            <p class="mt-3 text-sm text-muted-foreground">
              {{ t('framework.savingsDesc') }}
            </p>
          </div>

          <!-- Vault -->
          <div
            class="relative rounded-2xl border border-primary/50 bg-card p-8 text-center md:-translate-y-8"
          >
            <div
              class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10"
            >
              <svg
                class="size-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white">
              {{ t('framework.vaultTitle') }}
            </h3>
            <p class="mt-3 text-sm text-muted-foreground">
              {{ t('framework.vaultDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 5: What You Receive -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('receive.heading') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('receive.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>

        <div class="space-y-6">
          <!-- Item 1 -->
          <div class="flex items-start gap-8">
            <span class="hidden text-6xl font-bold text-primary/20 md:block"
              >01</span
            >
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <h3 class="text-lg font-semibold text-white">
                {{ t('receive.item1Title') }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                {{ t('receive.item1Desc') }}
              </p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="flex items-start gap-8 md:ml-16">
            <span class="hidden text-6xl font-bold text-primary/20 md:block"
              >02</span
            >
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <h3 class="text-lg font-semibold text-white">
                {{ t('receive.item2Title') }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                {{ t('receive.item2Desc') }}
              </p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="flex items-start gap-8 md:ml-32">
            <span class="hidden text-6xl font-bold text-primary/20 md:block"
              >03</span
            >
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <h3 class="text-lg font-semibold text-white">
                {{ t('receive.item3Title') }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                {{ t('receive.item3Desc') }}
              </p>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="flex items-start gap-8 md:ml-48">
            <span class="hidden text-6xl font-bold text-primary/20 md:block"
              >04</span
            >
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <h3 class="text-lg font-semibold text-white">
                {{ t('receive.item4Title') }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                {{ t('receive.item4Desc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Important note -->
        <div
          class="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6"
        >
          <p class="text-sm text-muted-foreground">
            <strong class="font-semibold text-white"
              >{{ t('receive.important') }}</strong
            >
            {{ t('receive.importantNote') }}
          </p>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 6: Who We Are -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            {{ t('whoWeAre.heading') }}
          </h2>
          <a
            href="https://tally.so/r/KY0PX8"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            {{ t('whoWeAre.getStarted') }}
            <span class="text-base">&#10230;</span>
          </a>
        </div>

        <p
          class="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground"
        >
          {{ t('whoWeAre.body') }}
        </p>

        <div class="grid gap-6 md:grid-cols-5">
          <!-- Founder (3/5 width) -->
          <div class="group relative md:col-span-3">
            <div
              class="aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <NuxtImg
                src="/images/me.jpg"
                alt="Charlie Stevens, Founder of Schelling Point"
                class="h-full w-full object-cover brightness-75 transition-all group-hover:brightness-100"
              />
            </div>
            <!-- Overlay info -->
            <div
              class="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-linear-to-t from-black/80 to-transparent p-6"
            >
              <h3 class="text-2xl font-bold">
                {{ t('whoWeAre.founderName') }}
              </h3>
              <p class="text-sm text-primary">
                {{ t('whoWeAre.founderRole') }}
              </p>
              <p class="mt-2 text-sm text-white/80">
                {{ t('whoWeAre.founderBio') }}
              </p>
            </div>
          </div>

          <!-- Testimonials (2/5 width) -->
          <div class="flex flex-col gap-4 md:col-span-2">
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <svg
                class="mb-3 size-6 text-primary/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                />
              </svg>
              <p class="text-sm text-muted-foreground italic">
                {{ t('whoWeAre.testimonial1') }}
              </p>
              <p class="mt-4 text-xs font-semibold text-white">
                — {{ t('whoWeAre.testimonial1Author') }}
              </p>
            </div>
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <svg
                class="mb-3 size-6 text-primary/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                />
              </svg>
              <p class="text-sm text-muted-foreground italic">
                {{ t('whoWeAre.testimonial2') }}
              </p>
              <p class="mt-4 text-xs font-semibold text-white">
                — {{ t('whoWeAre.testimonial2Author') }}
              </p>
            </div>
            <div class="flex-1 rounded-2xl border border-border bg-card p-6">
              <svg
                class="mb-3 size-6 text-primary/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                />
              </svg>
              <p class="text-sm text-muted-foreground italic">
                {{ t('whoWeAre.testimonial3') }}
              </p>
              <p class="mt-4 text-xs font-semibold text-white">
                — {{ t('whoWeAre.testimonial3Author') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 7: Packages & Pricing -->
    <section id="packages" class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-2 text-center">
          <p
            class="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            {{ t('packages.eyebrow') }}
          </p>
          <h2 class="mx-auto max-w-3xl text-4xl font-bold leading-tight">
            {{ t('packages.heading') }}
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {{ t('packages.subheading') }}
          </p>
          <div
            class="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground"
          >
            <span class="size-1.5 rounded-full bg-primary" />
            {{ t('packages.rateNote') }}
          </div>
        </div>

        <!-- Three family tiers -->
        <div class="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          <div
            v-for="tier in tiers"
            :key="tier.key"
            class="relative flex flex-col rounded-2xl border bg-card p-7"
            :class="
              tier.highlighted
                ? 'border-primary/50 shadow-[0_0_0_1px_rgba(123,168,92,0.18)]'
                : 'border-border'
            "
          >
            <span
              v-if="tier.badge"
              class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0e1408]"
            >
              {{ tier.badge }}
            </span>

            <h3 class="text-xl font-semibold text-white">{{ tier.title }}</h3>
            <p class="mt-1 min-h-[3.25rem] text-sm text-muted-foreground">
              {{ tier.who }}
            </p>

            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-4xl font-bold text-white">{{ tier.price }}</span>
              <span class="text-sm text-muted-foreground">{{
                t('packages.oneTime')
              }}</span>
            </div>
            <p class="mt-1 text-xs font-medium text-primary">{{ tier.sats }}</p>

            <div class="my-5 h-px bg-border" />

            <ul class="flex-1 space-y-0">
              <li
                v-for="(feat, i) in tier.features"
                :key="i"
                class="flex items-start gap-2.5 border-b border-border/50 py-2 text-sm text-muted-foreground last:border-b-0"
              >
                <svg
                  class="mt-0.5 size-4 shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{{ feat }}</span>
              </li>
            </ul>

            <UiButton
              as="a"
              href="https://tally.so/r/KY0PX8"
              target="_blank"
              rel="noopener"
              class="mt-6 h-auto w-full rounded-full px-6 py-2.5 text-sm font-medium"
              :class="
                tier.highlighted
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'border border-border bg-transparent text-white hover:bg-white/5'
              "
            >
              {{ tier.cta }}
            </UiButton>
          </div>
        </div>

        <!-- Individual services -->
        <div
          class="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-6 md:p-8"
        >
          <h3 class="text-lg font-semibold text-white">
            {{ t('packages.servicesHeading') }}
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ t('packages.servicesSub') }}
          </p>
          <div class="mt-6 grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
            <div
              v-for="svc in serviceRows"
              :key="svc.name"
              class="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
            >
              <div>
                <p class="text-sm text-white">{{ svc.name }}</p>
                <p class="mt-0.5 text-xs text-muted-foreground">
                  {{ svc.desc }}
                </p>
              </div>
              <div class="text-right whitespace-nowrap">
                <p class="text-sm font-semibold text-white">{{ svc.usd }}</p>
                <p v-if="svc.sats" class="text-[11px] text-primary">
                  {{ svc.sats }}
                </p>
              </div>
            </div>
          </div>
          <p class="mt-6 text-xs leading-relaxed text-muted-foreground">
            {{ t('packages.servicesNote') }}
          </p>
        </div>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 9: Tools We Support -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-4xl text-center flex flex-col items-center">
        <h2 class="text-4xl font-bold">{{ t('tools.heading') }}</h2>
        <div
          class="mt-10 flex flex-wrap items-center justify-center gap-4 max-w-2xl"
        >
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/sparrow.png"
              alt="Sparrow"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.sparrow') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/seddsigner.png"
              alt="SeedSigner"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.seedsigner') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/coldcard.png"
              alt="Coldcard"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.coldcard') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/krux.png"
              alt="Krux"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white"
              >{{ t('tools.krux') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/passport.png"
              alt="Passport"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.passport') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/jade.png"
              alt="Jade"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.jade') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/nunchuk.png"
              alt="Nunchuk"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.nunchuk') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/liana.png"
              alt="Liana"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.liana') }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <img
              src="/images/tools/signal.svg"
              alt="Signal"
              class="size-6 rounded-full object-cover"
            >
            <span class="text-sm font-medium text-white">
              {{ t('tools.signal') }}
            </span>
          </div>
        </div>
        <p class="mt-8 text-sm text-muted-foreground">{{ t('tools.note') }}</p>
      </div>
    </section>

    <SectionSeparator />

    <!-- SECTION 10: Final CTA -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div
          class="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-b from-primary/5 to-transparent p-12 text-center md:p-20"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(123,168,92,0.15)_0%,transparent_60%)]"
          />
          <div class="relative">
            <h2 class="text-4xl font-bold md:text-5xl">
              {{ t('finalCta.heading') }}
            </h2>
            <p class="mx-auto mt-4 max-w-lg text-muted-foreground">
              {{ t('finalCta.body') }}
            </p>
            <div
              class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <UiButton
                as="a"
                href="https://tally.so/r/KY0PX8"
                target="_blank"
                rel="noopener"
                class="h-auto rounded-full bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90"
              >
                {{ t('finalCta.cta') }}
              </UiButton>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                {{ t('finalCta.whatsapp') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="px-6 pb-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-4xl font-bold">{{ t('faq.heading') }}</h2>
        <div class="mt-12">
          <FaqAccordion />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .text-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #96c971 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-image-wrapper {
    -webkit-mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 30%,
        black 70%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        black 20%,
        black 80%,
        transparent 100%
      );
    mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 30%,
        black 70%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        black 20%,
        black 80%,
        transparent 100%
      );
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }
</style>
