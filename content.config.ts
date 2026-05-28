import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md'
    }),
    resources_en: defineCollection({
      type: 'page',
      source: 'resources/en/**/*.md'
    }),
    resources_es: defineCollection({
      type: 'page',
      source: 'resources/es/**/*.md'
    })
  }
})
