import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://schellingpoint.xyz'
const SITE_TITLE = 'Bitcoin Estate Planning & Self-Custody Advisory'
const SITE_DESCRIPTION =
  'Self custody with the right tools, training, and protocols.'

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
    '@nuxtjs/i18n'
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
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Español' }
    ],
    langDir: 'locales',
    strategy: 'prefix_except_default'
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
