<script setup lang="ts">
  // Three illustrative family scenarios. Content lives in app/data/useCases.ts.
  import { useCasesFor } from '~/data/useCases'

  definePageMeta({ layout: false })

  const { t, locale } = useI18n()
  const { BOOKING_URL } = useSpContact()
  const cases = computed(() => useCasesFor(locale.value))

  useSeoMeta({
    title: () => t('home.casesPage.seoTitle'),
    description: () => t('home.casesPage.seoDescription')
  })
</script>

<template>
  <div class="sp-home sp-page">
    <div class="sp-light" aria-hidden="true" />
    <div class="sp-grain" aria-hidden="true" />
    <div class="sp-vignette" aria-hidden="true" />
    <HomeHeader />
    <main>
      <section class="sp-page-head" aria-labelledby="h-cases-page">
        <p class="sp-label">{{ t('home.casesPage.label') }}</p>
        <h1 id="h-cases-page">{{ t('home.casesPage.title') }} <em>{{ t('home.casesPage.titleEm') }}</em></h1>
        <p class="intro">{{ t('home.casesPage.intro') }}</p>
      </section>

      <article v-for="(c, i) in cases" :id="c.id" :key="c.id" class="sp-case" :aria-labelledby="`case-${c.id}`">
        <div class="side">
          <p class="num">{{ String(i + 1).padStart(2, '0') }}</p>
          <p class="sp-label">{{ c.label }}</p>
        </div>
        <div class="main">
          <h2 :id="`case-${c.id}`">{{ c.title }}</h2>
          <p v-for="(para, j) in c.story" :key="j" class="story">{{ para }}</p>
          <div class="cols">
            <div>
              <h3 class="sp-label">{{ c.mistakeLabel }}</h3>
              <p>{{ c.mistake }}</p>
            </div>
            <div>
              <h3 class="sp-label green">{{ c.helpLabel }}</h3>
              <ul>
                <li v-for="(h, k) in c.help" :key="k">{{ h }}</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <p class="sp-case-note">{{ t('home.casesPage.note') }}</p>

      <section class="sp-page-end">
        <h2>{{ t('home.casesPage.closeTitle') }} <em>{{ t('home.casesPage.closeTitleEm') }}</em></h2>
        <a class="sp-btn" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.casesPage.cta') }}</a>
      </section>
    </main>
    <HomeFooter />
  </div>
</template>

<style src="~/assets/css/sp-home.css"></style>
