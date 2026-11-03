<script setup lang="ts">
  import { getCaseStudy } from '~/lib/case-studies'

  const { BOOKING_URL } = useSpContact()

  const route = useRoute()
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const study = getCaseStudy(String(route.params.slug))
  if (!study) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Case study not found'
    })
  }

  const isEs = computed(() => locale.value === 'es')
  const c = computed(() => (isEs.value ? study.es : study.en))

  const ui = computed(() =>
    isEs.value
      ? {
          back: '← Casos de estudio',
          glance: 'En resumen',
          download: 'Descargar el PDF (en inglés)',
          ctaHeading: 'Una conversación confidencial',
          ctaBody:
            'Cada estructura parte de cómo se toman las decisiones en su empresa o su familia. Si quiere estudiar la suya, estaremos encantados de hablarlo.',
          ctaButton: 'Concertar una conversación'
        }
      : {
          back: '← Case studies',
          glance: 'At a glance',
          download: 'Download the PDF',
          ctaHeading: 'A confidential conversation',
          ctaBody:
            'Every structure starts from how decisions are made in your company or family. If you would like to look at yours, we would be glad to talk it through.',
          ctaButton: 'Arrange a conversation'
        }
  )

  useSeoMeta({
    title: () => c.value.metaTitle,
    description: () => c.value.metaDescription,
    ogTitle: () => c.value.metaTitle,
    ogDescription: () => c.value.metaDescription,
    ogType: 'article'
  })

  useSchemaOrg([
    defineArticle({
      '@type': 'Article',
      headline: () => c.value.title,
      description: () => c.value.metaDescription,
      datePublished: study.date,
      dateModified: study.date,
      inLanguage: () => (isEs.value ? 'es' : 'en'),
      author: { '@type': 'Organization', name: 'Schelling Point' }
    })
  ])
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <article class="container mx-auto max-w-3xl px-6 py-12">
      <NuxtLink
        :to="localePath('/case-studies')"
        class="mb-8 inline-block text-base text-muted-foreground transition-colors hover:text-primary"
      >
        {{ ui.back }}
      </NuxtLink>

      <header class="mb-10">
        <p
          class="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          {{ c.eyebrow }}
        </p>
        <h1
          class="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
        >
          {{ c.title }}
        </h1>
        <p class="text-xl leading-relaxed text-muted-foreground">
          {{ c.subtitle }}
        </p>
        <a
          :href="study.pdf"
          download
          class="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-white"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
          </svg>
          {{ ui.download }}
        </a>
      </header>

      <p class="mb-10 text-lg italic leading-relaxed">{{ c.intro }}</p>

      <!-- At a glance -->
      <section
        class="mb-4 rounded-2xl border border-border bg-card p-6"
        :aria-label="ui.glance"
      >
        <h2
          class="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          {{ ui.glance }}
        </h2>
        <dl class="divide-y divide-border">
          <div
            v-for="row in c.glance"
            :key="row.label"
            class="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt class="text-sm font-semibold text-white">{{ row.label }}</dt>
            <dd class="text-sm leading-relaxed text-muted-foreground">
              {{ row.value }}
            </dd>
          </div>
        </dl>
      </section>

      <section v-for="section in c.sections" :key="section.title" class="cs">
        <h2>{{ section.title }}</h2>
        <template v-for="(b, i) in section.blocks" :key="i">
          <p v-if="b.type === 'p'">{{ b.text }}</p>
          <h3 v-else-if="b.type === 'h3'">{{ b.text }}</h3>
          <component
            :is="b.ordered ? 'ol' : 'ul'"
            v-else-if="b.type === 'list'"
          >
            <li v-for="item in b.items" :key="item">{{ item }}</li>
          </component>
          <blockquote v-else-if="b.type === 'quote'">{{ b.text }}</blockquote>
          <div v-else-if="b.type === 'table'" class="cs-table">
            <table>
              <thead>
                <tr>
                  <th v-for="h in b.head" :key="h" scope="col">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in b.rows" :key="row[0]">
                  <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Money-flow diagram -->
          <figure v-else-if="b.type === 'flow'" class="flow">
            <div class="flow-grid">
              <div class="node reserve">
                <strong>{{ c.flow.reserve }}</strong>
                <span>{{ c.flow.reserveNormal }}</span>
                <span>{{ c.flow.reserveLate }}</span>
              </div>
              <div class="bridge">
                <span>← {{ c.flow.sweep }}</span>
                <span>{{ c.flow.topUp }} →</span>
              </div>
              <div class="stack">
                <div class="node">
                  <strong>{{ c.flow.revenue }}</strong>
                  <span>{{ c.flow.revenueNote }}</span>
                </div>
                <div class="arrow">↓</div>
                <div class="node">
                  <strong>{{ c.flow.ops }}</strong>
                  <span>{{ c.flow.opsNote }}</span>
                </div>
                <div class="arrow">↓ <em>{{ c.flow.monthly }}</em></div>
                <div class="node">
                  <strong>{{ c.flow.float }}</strong>
                  <span>{{ c.flow.floatNote }}</span>
                </div>
                <div class="arrow">↓ <em>{{ c.flow.approved }}</em></div>
                <div class="node">
                  <strong>{{ c.flow.payees }}</strong>
                  <span>{{ c.flow.payeesNote }}</span>
                </div>
              </div>
            </div>
            <figcaption>{{ c.flow.caption }}</figcaption>
          </figure>
        </template>
      </section>

      <!-- CTA -->
      <div
        class="mt-16 rounded-2xl border border-primary/50 bg-card p-8 text-center shadow-[0_0_0_1px_rgba(123,168,92,0.18)]"
      >
        <h2 class="text-2xl font-bold text-white">{{ ui.ctaHeading }}</h2>
        <p
          class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground"
        >
          {{ ui.ctaBody }}
        </p>
        <div
          class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiButton
            as="a"
            :href="BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="h-auto rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            {{ ui.ctaButton }}
          </UiButton>
          <a
            :href="study.pdf"
            download
            class="text-sm text-muted-foreground transition-colors hover:text-white"
          >
            {{ ui.download }} →
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
  .cs h2 {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--color-foreground, #fff);
  }
  .cs h3 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 1.15rem;
    font-weight: 600;
    color: #fff;
  }
  .cs p {
    margin-bottom: 1.1rem;
    line-height: 1.75;
  }
  .cs ul,
  .cs ol {
    margin: 0 0 1.25rem 1.25rem;
    line-height: 1.7;
  }
  .cs ul {
    list-style: disc;
  }
  .cs ol {
    list-style: decimal;
  }
  .cs li {
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
  }
  .cs blockquote {
    margin: 2rem 0;
    border-left: 3px solid var(--color-primary, #7ba85c);
    padding: 0.25rem 0 0.25rem 1.25rem;
    font-size: 1.15rem;
    font-style: italic;
    line-height: 1.6;
    color: #fff;
  }
  .cs-table {
    margin: 1.5rem 0 1.75rem;
    overflow-x: auto;
  }
  .cs-table table {
    width: 100%;
    min-width: 32rem;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .cs-table th {
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.2));
    padding: 0.6rem 0.75rem 0.6rem 0;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted-foreground, #999);
  }
  .cs-table td {
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
    padding: 0.75rem 0.75rem 0.75rem 0;
    vertical-align: top;
    line-height: 1.55;
  }
  .cs-table td:first-child {
    font-weight: 600;
    color: #fff;
  }

  .flow {
    margin: 2rem 0;
  }
  .flow-grid {
    display: grid;
    gap: 1rem;
    align-items: center;
  }
  @media (min-width: 640px) {
    .flow-grid {
      grid-template-columns: 1fr auto 1fr;
    }
  }
  .node {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.2));
    border-radius: 0.75rem;
    background: var(--color-card, #161514);
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    line-height: 1.45;
    color: var(--color-muted-foreground, #999);
  }
  .node strong {
    font-size: 0.875rem;
    color: #fff;
  }
  .node.reserve {
    border-color: var(--color-primary, #7ba85c);
  }
  .bridge {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.75rem;
    text-align: center;
    color: var(--color-muted-foreground, #999);
  }
  .stack {
    display: flex;
    flex-direction: column;
  }
  .arrow {
    padding: 0.3rem 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--color-muted-foreground, #999);
  }
  .arrow em {
    font-size: 0.75rem;
  }
  .flow figcaption {
    margin-top: 1rem;
    font-size: 0.875rem;
    font-style: italic;
    line-height: 1.6;
    color: var(--color-muted-foreground, #999);
  }
</style>
