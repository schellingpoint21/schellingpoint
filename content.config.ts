import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    // asSitemapCollection registers every post with @nuxtjs/sitemap; content
    // routes are not auto-discovered on their own.
    blog: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'blog/**/*.md',
        // Frontmatter fields must be declared here or @nuxt/content drops them
        // (and ordering by an undeclared `date` column throws at query time).
        schema: z.object({
          date: z.string(),
          updated: z.string().optional(),
          author: z.string().optional(),
          readingTime: z.string().optional(),
          image: z.string().optional(),
          tags: z.array(z.string()).optional()
        })
      })
    )
  }
})
