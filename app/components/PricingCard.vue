<script setup lang="ts">
  defineProps<{
    title: string
    price: string
    priceUsd: string
    features: string[]
    cta: string
    highlighted?: boolean
    note?: string
  }>()
</script>

<template>
  <div
    class="flex h-full flex-col rounded-2xl border p-8"
    :class="
      highlighted
        ? 'border-2 border-primary bg-card shadow-lg shadow-primary/10'
        : 'border-border bg-card'
    "
  >
    <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
    <div class="mt-4">
      <p class="text-3xl font-bold text-white">{{ price }}</p>
      <p class="mt-1 text-sm text-muted-foreground">{{ priceUsd }}</p>
    </div>
    <ul class="mt-6 flex-1 space-y-3">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-start gap-3 text-sm text-muted-foreground"
      >
        <svg
          class="mt-0.5 size-4 shrink-0 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {{ feature }}
      </li>
    </ul>
    <p v-if="note" class="mt-4 text-xs text-muted-foreground italic">
      {{ note }}
    </p>
    <UiButton
      as="a"
      href="https://calendly.com/charlie-schellingpoint-jwgf/30min"
      target="_blank"
      rel="noopener"
      class="mt-6 w-full rounded-full text-sm font-medium"
      :class="
        highlighted
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'border border-border bg-transparent text-white hover:bg-white/5'
      "
    >
      {{ cta }}
    </UiButton>
  </div>
</template>
