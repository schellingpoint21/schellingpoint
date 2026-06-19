import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://schellingpoint.xyz'
const SITE_TITLE = 'Bitcoin Estate Planning & Self-Custody Advisory'
const SITE_DESCRIPTION =
  'Self custody your Bitcoin for your family or organisation with the right tools, training, and protocols so your capital stays secure, usable, and survivable for the right purpose at the right time.'

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { name: 'description', content: SITE_DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        {
          property: 'og:image',
          content: `${SITE_URL}/og-image.png`
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:site_name', content: 'Schelling Point' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        {
          name: 'twitter:image',
          content: `${SITE_URL}/og-image.png`
        }
      ],
      title: SITE_TITLE
    }
  },
  site: {
    url: SITE_URL,
    name: 'Schelling Point'
  },
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
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
    'nuxt-schema-org'
  ],
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
      { code: 'en', file: 'en.json', name: 'English', language: 'en-US' },
      { code: 'es', file: 'es.json', name: 'Español', language: 'es-ES' }
    ],
    langDir: 'locales',
    strategy: 'prefix_except_default'
  },
  sitemap: {
    // Routes auto-discovered from app/pages and @nuxt/content.
    // hreflang alternates emitted automatically via @nuxtjs/i18n integration.
    autoLastmod: true,
    xsl: false
  },
  schemaOrg: {
    // Emitted server-side so AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
    // and non-JS bots can read structured data in raw HTML.
    identity: {
      type: 'Organization',
      name: 'Schelling Point',
      url: SITE_URL,
      logo: `${SITE_URL}/sp-logo.png`,
      description: SITE_DESCRIPTION,
      sameAs: [
        'https://instagram.com/schellingpoint21',
        'https://x.com/schellingp21',
        'https://www.linkedin.com/company/schelling-point/'
      ]
    }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
