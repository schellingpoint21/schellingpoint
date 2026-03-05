import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
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
