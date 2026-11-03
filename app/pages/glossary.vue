<script setup lang="ts">
  // Plain-language glossary. Definitions live in app/data/glossary.ts.
  import { glossaryFor } from '~/data/glossary'

  definePageMeta({ layout: false })

  const { t, locale } = useI18n()
  const { BOOKING_URL } = useSpContact()
  const terms = computed(() => glossaryFor(locale.value))
  const letterOf = (term: string) => term.normalize('NFD').charAt(0).toUpperCase()
  const groups = computed(() => {
    const out: { letter: string; items: ReturnType<typeof glossaryFor> }[] = []
    for (const item of terms.value) {
      const l = letterOf(item.term)
      const last = out[out.length - 1]
      if (last && last.letter === l) last.items.push(item)
      else out.push({ letter: l, items: [item] })
    }
    return out
  })

  useSeoMeta({
    title: () => t('home.glossaryPage.seoTitle'),
    description: () => t('home.glossaryPage.seoDescription')
  })

  // DefinedTermSet structured data so search and answer engines can read the definitions.
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: t('home.glossaryPage.seoTitle'),
          inLanguage: locale.value,
          hasDefinedTerm: terms.value.map((x) => ({ '@type': 'DefinedTerm', name: x.term, description: x.def }))
        })
      }
    ]
  }))
</script>

<template>
  <div class="sp-home sp-page">
    <div class="sp-light" aria-hidden="true" />
    <div class="sp-grain" aria-hidden="true" />
    <div class="sp-vignette" aria-hidden="true" />
    <HomeHeader />
    <main>
      <section class="sp-page-head" aria-labelledby="h-gloss">
        <p class="sp-label">{{ t('home.glossaryPage.label') }}</p>
        <h1 id="h-gloss">{{ t('home.glossaryPage.title') }} <em>{{ t('home.glossaryPage.titleEm') }}</em></h1>
        <p class="intro">{{ t('home.glossaryPage.intro') }}</p>
        <nav class="letters" :aria-label="t('home.glossaryPage.jump')">
          <a v-for="g in groups" :key="g.letter" :href="`#letter-${g.letter}`">{{ g.letter }}</a>
        </nav>
      </section>

      <section class="sp-gloss">
        <div v-for="g in groups" :id="`letter-${g.letter}`" :key="g.letter" class="group">
          <p class="letter" aria-hidden="true">{{ g.letter }}</p>
          <dl>
            <div v-for="item in g.items" :id="item.id" :key="item.id" class="entry">
              <dt>{{ item.term }}</dt>
              <dd>{{ item.def }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="sp-page-end">
        <a class="sp-btn" :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.glossaryPage.cta') }}</a>
      </section>
    </main>
    <HomeFooter />
  </div>
</template>

<style src="~/assets/css/sp-home.css"></style>
