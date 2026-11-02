<script setup lang="ts">
  import { caseStudies } from '~/lib/case-studies'

  const { locale } = useI18n()
  const localePath = useLocalePath()

  const isEs = computed(() => locale.value === 'es')

  const ui = computed(() =>
    isEs.value
      ? {
          back: '← Volver al inicio',
          title: 'Casos de estudio',
          lede: 'Cómo diseñamos estructuras de custodia en torno a personas reales: quién firma, qué ocurre cuando algo falla y qué concesiones se aceptan, y por qué.',
          read: 'Leer el caso',
          metaTitle: 'Casos de estudio: autocustodia y herencia de Bitcoin',
          metaDescription:
            'Casos de estudio de Schelling Point sobre estructuras de autocustodia, herencia y continuidad de Bitcoin para familias, fundadores y empresas.'
        }
      : {
          back: '← Back home',
          title: 'Case studies',
          lede: 'How we design custody structures around real people: who signs, what happens when something fails, and which trade-offs are accepted, and why.',
          read: 'Read the case study',
          metaTitle: 'Case Studies: Bitcoin Self-Custody and Inheritance',
          metaDescription:
            'Schelling Point case studies on Bitcoin self-custody, inheritance and continuity structures for families, founders and companies.'
        }
  )

  const items = computed(() =>
    [...caseStudies]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((s) => ({ ...s, copy: isEs.value ? s.es : s.en }))
  )

  useSeoMeta({
    title: () => ui.value.metaTitle,
    description: () => ui.value.metaDescription,
    ogTitle: () => ui.value.metaTitle,
    ogDescription: () => ui.value.metaDescription
  })
</script>

<template>
  <div class="container mx-auto max-w-4xl px-6 py-12">
    <NuxtLink
      :to="localePath('/')"
      class="mb-8 inline-block text-muted-foreground transition-colors hover:text-primary"
    >
      {{ ui.back }}
    </NuxtLink>

    <h1 class="mb-3 text-4xl font-bold">{{ ui.title }}</h1>
    <p class="mb-10 max-w-2xl text-muted-foreground">{{ ui.lede }}</p>

    <div class="flex flex-col gap-8">
      <article
        v-for="s in items"
        :key="s.slug"
        class="group rounded-lg border border-border p-6 transition-colors hover:border-primary"
      >
        <NuxtLink :to="localePath(`/case-studies/${s.slug}`)" class="block">
          <p
            class="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            {{ s.copy.eyebrow }}
          </p>
          <h2
            class="text-2xl font-semibold transition-colors group-hover:text-primary"
          >
            {{ s.copy.title }}
          </h2>
          <p class="mt-2 text-muted-foreground">{{ s.copy.subtitle }}</p>
          <p class="mt-4 text-sm text-foreground">{{ ui.read }} →</p>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
