import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://schellingpoint.xyz'

export default defineNuxtConfig({
  site: {
    url: SITE_URL,
    name: 'Schelling Point',
    description:
      'Bitcoin estate planning and self-custody advisory for families and business owners holding Bitcoin as multi-generational capital.',
    defaultLocale: 'en'
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        {
          name: 'description',
          content:
            'Bitcoin estate planning and self-custody advisory. Secure, usable, and survivable Bitcoin for your family and long-term legacy.'
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Schelling Point — Bitcoin Estate Planning'
        },
        {
          property: 'og:description',
          content:
            'Bitcoin estate planning and self-custody advisory. Secure, usable, and survivable for your family and long-term legacy.'
        },
        {
          property: 'og:image',
          content: `${SITE_URL}/og-image.png`
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:site_name', content: 'Schelling Point' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Schelling Point — Bitcoin Estate Planning'
        },
        {
          name: 'twitter:description',
          content:
            'Bitcoin estate planning and self-custody advisory. Secure, usable, and survivable for your family and long-term legacy.'
        },
        {
          name: 'twitter:image',
          content: `${SITE_URL}/og-image.png`
        }
      ],
      title: 'Schelling Point — Bitcoin Estate Planning'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'nuxt-studio',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org'
  ],

  sitemap: {
    sources: ['/api/__sitemap__/urls']
  },

  robots: {
    sitemap: `${SITE_URL}/sitemap.xml`,
    groups: [
      { userAgent: ['*'], allow: ['/'] },
      // Explicitly allow AI crawlers — AEO is a strategic priority.
      { userAgent: ['GPTBot'], allow: ['/'] },
      { userAgent: ['ChatGPT-User'], allow: ['/'] },
      { userAgent: ['ClaudeBot'], allow: ['/'] },
      { userAgent: ['anthropic-ai'], allow: ['/'] },
      { userAgent: ['Google-Extended'], allow: ['/'] },
      { userAgent: ['PerplexityBot'], allow: ['/'] },
      { userAgent: ['Applebot-Extended'], allow: ['/'] },
      { userAgent: ['CCBot'], allow: ['/'] }
    ]
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Schelling Point',
      url: SITE_URL,
      logo: `${SITE_URL}/sp-logo.png`,
      sameAs: []
    }
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui'
  },
  fonts: {
    families: [
      {
        name: 'Poppins',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ]
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'schellingpoint21',
      repo: 'schellingpoint',
      branch: 'main'
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Español' }
    ],
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: SITE_URL
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
