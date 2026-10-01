<script setup lang="ts">
  // Shared footer for the redesigned pages. WhatsApp sits quietly in the contact column.
  const { t, locale } = useI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const { BOOKING_URL, EMAIL, whatsappUrl } = useSpContact()
  const home = (hash: string) => ({ path: localePath('/'), hash })
</script>

<template>
  <footer class="sp-foot">
    <div>
      <NuxtLink class="sp-mark" :to="localePath('/')" aria-label="Schelling Point"><HomeSpLogo /></NuxtLink>
      <p class="conf">{{ t('home.footer.conf') }}</p>
      <p class="social">
        <a href="https://www.linkedin.com/company/schelling-point/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://x.com/schellingp21" target="_blank" rel="noopener">X</a>
        <a href="https://instagram.com/schellingpoint21" target="_blank" rel="noopener">Instagram</a>
      </p>
    </div>
    <div>
      <h4 class="sp-label">{{ t('home.footer.firm') }}</h4>
      <ul>
        <li><NuxtLink :to="home('#engagements')">{{ t('home.nav.engagements') }}</NuxtLink></li>
        <li><NuxtLink :to="home('#what-we-do')">{{ t('home.nav.whatWeDo') }}</NuxtLink></li>
        <li><NuxtLink :to="home('#stewardship')">{{ t('home.nav.stewardship') }}</NuxtLink></li>
        <li><NuxtLink :to="home('#about')">{{ t('home.nav.about') }}</NuxtLink></li>
      </ul>
    </div>
    <div>
      <h4 class="sp-label">{{ t('home.footer.reading') }}</h4>
      <ul>
        <li><NuxtLink :to="localePath('/glossary')">{{ t('home.footer.glossary') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/use-cases')">{{ t('home.footer.cases') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/resources/bitcoin-estate-planning')">{{ t('home.footer.estatePlanning') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/multisig')">{{ t('home.footer.multisig') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/blog')">{{ t('home.footer.blog') }}</NuxtLink></li>
        <li><NuxtLink :to="home('#playbook')">{{ t('home.footer.playbook') }}</NuxtLink></li>
      </ul>
    </div>
    <div>
      <h4 class="sp-label">{{ t('home.footer.appointment') }}</h4>
      <ul>
        <li><a :href="BOOKING_URL" target="_blank" rel="noopener">{{ t('home.footer.conversation') }}</a></li>
        <li><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></li>
        <li><a :href="whatsappUrl" target="_blank" rel="noopener">{{ t('home.footer.whatsapp') }}</a></li>
        <li><span class="plain">schellingpoint.xyz</span></li>
      </ul>
    </div>
    <div class="base">
      <span>{{ t('footer.rights') }}</span>
      <span class="lang">
        <NuxtLink :to="switchLocalePath('en')" :aria-current="locale === 'en' ? 'true' : undefined">English</NuxtLink>
        <NuxtLink :to="switchLocalePath('es')" :aria-current="locale === 'es' ? 'true' : undefined">Español</NuxtLink>
      </span>
    </div>
  </footer>
</template>
