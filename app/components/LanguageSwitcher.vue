<script setup lang="ts">
  const { locale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center gap-1 text-sm">
    <NuxtLink
      :to="switchLocalePath('en')"
      class="px-1.5 py-0.5 transition-colors"
      :class="
        locale === 'en'
          ? 'font-semibold text-white'
          : 'text-muted-foreground hover:text-white'
      "
    >
      EN
    </NuxtLink>
    <span class="text-muted-foreground">|</span>
    <NuxtLink
      :to="switchLocalePath('es')"
      class="px-1.5 py-0.5 transition-colors"
      :class="
        locale === 'es'
          ? 'font-semibold text-white'
          : 'text-muted-foreground hover:text-white'
      "
    >
      ES
    </NuxtLink>
  </div>
</template>
