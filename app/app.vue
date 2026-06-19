<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
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

// Site-wide structured data, rendered server-side. Organization identity is
// configured in nuxt.config.ts (schemaOrg.identity). Here we add the WebSite,
// the ProfessionalService, and the founder Person entity for E-E-A-T signals.
useSchemaOrg([
  defineWebSite({
    name: 'Schelling Point',
    description: () => t('seo.description'),
    inLanguage: () => locale.value
  }),
  defineLocalBusiness({
    '@type': 'ProfessionalService',
    name: 'Schelling Point',
    description:
      'Bitcoin estate planning and self-custody advisory for individuals, families, and organisations.',
    areaServed: { '@type': 'Country', name: 'Worldwide' },
    address: { '@type': 'PostalAddress', addressCountry: 'SV' },
    priceRange: '$$',
    url: siteUrl
  }),
  definePerson({
    name: 'Charlie Stevens',
    jobTitle: 'Founder',
    description:
      'Founder of Schelling Point. Guiding individuals, families, and organisations to self-custody Bitcoin with recoverable, real-world frameworks since 2017.',
    worksFor: { '@type': 'Organization', name: 'Schelling Point' },
    sameAs: [
      'https://x.com/schellingp21',
      'https://www.linkedin.com/company/schelling-point/'
    ]
  })
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
