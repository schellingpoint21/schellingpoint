<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const {
  public: { siteUrl }
} = useRuntimeConfig()

// Build a clean canonical URL: strip trailing slash (except root), drop query/hash.
const canonicalUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  return `${siteUrl}${path}`
})

const pageTitle = computed(() => t('seo.title'))
const pageDescription = computed(() => t('seo.description'))

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription }
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
