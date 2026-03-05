<script setup lang="ts">
  const { t } = useI18n()

  const items = computed(() => [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') }
  ])

  const openIndex = ref<number | null>(null)

  const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index
  }
</script>

<template>
  <div class="divide-y divide-border">
    <div v-for="(item, index) in items" :key="index">
      <button
        type="button"
        class="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white"
        :class="openIndex === index ? 'text-white' : 'text-muted-foreground'"
        @click="toggle(index)"
      >
        <span class="pr-4 text-sm font-medium">{{ item.q }}</span>
        <svg
          class="size-5 shrink-0 transition-transform duration-200"
          :class="openIndex === index ? 'rotate-180' : ''"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        class="overflow-hidden transition-all duration-200"
        :class="openIndex === index ? 'max-h-40 pb-5' : 'max-h-0'"
      >
        <p class="text-sm leading-relaxed text-muted-foreground">
          {{ item.a }}
        </p>
      </div>
    </div>
  </div>
</template>
