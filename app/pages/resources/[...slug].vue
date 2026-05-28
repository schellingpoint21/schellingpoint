<script setup lang="ts">
  const route = useRoute()
  const { locale, t } = useI18n()

  const slug = computed(() => {
    const slugParam = route.params.slug
    if (Array.isArray(slugParam)) {
      return slugParam.join('/')
    }
    return slugParam || ''
  })

  // Pick the right collection based on the active locale.
  const collectionName = computed(() =>
    locale.value === 'es' ? 'resources_es' : 'resources_en'
  )

  const contentPath = computed(() =>
    `/resources/${locale.value === 'es' ? 'es' : 'en'}/${slug.value}`
  )

  const { data: page } = await useAsyncData(
    `resource-${locale.value}-${slug.value}`,
    () =>
      // queryCollection accepts a runtime collection name as a string key.
      queryCollection(collectionName.value as any)
        .path(contentPath.value)
        .first(),
    { watch: [locale, slug] }
  )

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Resource not found' })
  }

  useSeoMeta({
    title: () => page.value?.title,
    description: () => page.value?.description,
    ogTitle: () => page.value?.title,
    ogDescription: () => page.value?.description,
    ogType: 'article'
  })
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <article class="container mx-auto px-4 py-12 max-w-3xl">
      <NuxtLink
        :to="locale === 'es' ? '/es' : '/'"
        class="text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
      >
        &larr; {{ locale === 'es' ? 'Volver al inicio' : 'Back home' }}
      </NuxtLink>

      <header class="mb-8">
        <h1 class="font-bold text-4xl md:text-5xl mb-4">{{ page?.title }}</h1>
        <p v-if="page?.description" class="text-lg text-muted-foreground">
          {{ page.description }}
        </p>
      </header>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>
  </div>
</template>
