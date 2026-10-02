<script setup lang="ts">
  // Shared header for the redesigned pages (homepage, glossary, scenarios).
  const { t, locale } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const { BOOKING_URL } = useSpContact()

  const scrolled = ref(false)
  const menu = ref<HTMLDetailsElement | null>(null)
  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  const closeMenu = () => {
    if (menu.value) menu.value.open = false
  }
  // Section links resolve to the homepage from any page.
  const home = (hash: string) => ({ path: localePath('/'), hash })
  const links = computed(() => [
    { to: home('#engagements'), label: t('home.nav.engagements') },
    { to: home('#what-we-do'), label: t('home.nav.whatWeDo') },
    { to: home('#stewardship'), label: t('home.nav.stewardship') },
    { to: home('#about'), label: t('home.nav.about') }
  ])
  // Reading material, grouped under one "Resources" item.
  const resources = computed(() => [
    { to: localePath('/resources/bitcoin-estate-planning'), label: t('home.footer.estatePlanning') },
    { to: localePath('/blog'), label: t('home.footer.blog') },
    { to: localePath('/use-cases'), label: t('home.footer.cases') },
    { to: localePath('/glossary'), label: t('home.nav.glossary') }
  ])

  // Desktop Resources dropdown: opens on hover, click or keyboard; closes on
  // Escape, an outside click, or navigation.
  const resOpen = ref(false)
  const resEl = ref<HTMLElement | null>(null)
  const route = useRoute()
  const onDocClick = (e: MouseEvent) => {
    if (resEl.value && !resEl.value.contains(e.target as Node)) resOpen.value = false
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') resOpen.value = false
  }
  watch(() => route.fullPath, () => {
    resOpen.value = false
    closeMenu()
  })

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKey)
  })
</script>

<template>
  <header id="top" class="sp-head" :class="{ 'is-scrolled': scrolled }">
    <NuxtLink class="sp-mark" :to="localePath('/')" aria-label="Schelling Point">
      <HomeSpLogo />
    </NuxtLink>
    <div class="right">
      <nav class="sp-nav" :aria-label="t('home.nav.menu')">
        <NuxtLink v-for="l in links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink>
        <div
          ref="resEl"
          class="sp-drop"
          :class="{ 'is-open': resOpen }"
          @mouseenter="resOpen = true"
          @mouseleave="resOpen = false"
        >
          <button
            type="button"
            class="sp-drop-btn"
            aria-haspopup="true"
            :aria-expanded="resOpen ? 'true' : 'false'"
            aria-controls="sp-resources"
            @click="resOpen = !resOpen"
          >
            {{ t('home.nav.resources') }}<span class="caret" aria-hidden="true" />
          </button>
          <div id="sp-resources" class="sp-drop-panel" :hidden="!resOpen">
            <NuxtLink v-for="r in resources" :key="r.label" :to="r.to" @click="resOpen = false">{{ r.label }}</NuxtLink>
          </div>
        </div>
      </nav>
      <span class="sp-lang">
        <NuxtLink :to="switchLocalePath('en')" :aria-current="locale === 'en' ? 'true' : undefined">EN</NuxtLink>
        <NuxtLink :to="switchLocalePath('es')" :aria-current="locale === 'es' ? 'true' : undefined">ES</NuxtLink>
      </span>
      <a class="appt sp-btn ghost sm" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.nav.appointment') }}</a>
      <details ref="menu" class="sp-menu">
        <summary>{{ t('home.nav.menu') }}</summary>
        <nav :aria-label="t('home.nav.menu')">
          <NuxtLink v-for="l in links" :key="l.label" :to="l.to" @click="closeMenu">{{ l.label }}</NuxtLink>
          <span class="menu-group">{{ t('home.nav.resources') }}</span>
          <NuxtLink v-for="r in resources" :key="r.label" class="menu-sub" :to="r.to" @click="closeMenu">{{ r.label }}</NuxtLink>
          <a :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.nav.appointment') }}</a>
          <span class="menu-lang">
            <NuxtLink :to="switchLocalePath('en')" @click="closeMenu">EN</NuxtLink>
            <NuxtLink :to="switchLocalePath('es')" @click="closeMenu">ES</NuxtLink>
          </span>
        </nav>
      </details>
    </div>
  </header>
</template>
