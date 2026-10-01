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
    { to: home('#about'), label: t('home.nav.about') },
    { to: localePath('/glossary'), label: t('home.nav.glossary') }
  ])

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header id="top" class="sp-head" :class="{ 'is-scrolled': scrolled }">
    <NuxtLink class="sp-mark" :to="localePath('/')" aria-label="Schelling Point">
      <HomeSpLogo />
    </NuxtLink>
    <div class="right">
      <nav class="sp-nav" :aria-label="t('home.nav.menu')">
        <NuxtLink v-for="l in links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink>
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
