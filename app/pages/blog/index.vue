<script setup lang="ts">
  const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('blog')
      .select('title', 'description', 'date', 'path', 'author', 'readingTime')
      .order('date', 'DESC')
      .all()
  )

  // Unique per-page metadata so /blog no longer inherits the homepage title.
  useSeoMeta({
    title: 'Blog — Bitcoin Estate Planning & Self-Custody',
    description:
      'Guides and articles on Bitcoin estate planning, self-custody, inheritance, and multi-generational wealth from Schelling Point.',
    ogTitle: 'Blog — Bitcoin Estate Planning & Self-Custody',
    ogDescription:
      'Guides and articles on Bitcoin estate planning, self-custody, inheritance, and multi-generational wealth from Schelling Point.'
  })
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <NuxtLink
      to="/"
      class="text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
    >
      &larr; Back home
    </NuxtLink>

    <h1 class="font-bold text-4xl mb-3">Blog</h1>
    <p class="text-muted-foreground mb-10 max-w-2xl">
      Essays on holding Bitcoin as long-term, multi-generational capital:
      custody, inheritance, and continuity.
    </p>

    <div v-if="posts?.length" class="flex flex-col gap-8">
      <article
        v-for="post in posts"
        :key="post.path"
        class="group border border-border rounded-lg p-6 hover:border-primary transition-colors"
      >
        <NuxtLink :to="post.path" class="block">
          <h2
            class="font-semibold text-2xl group-hover:text-primary transition-colors"
          >
            {{ post.title }}
          </h2>
          <p v-if="post.description" class="text-muted-foreground mt-2">
            {{ post.description }}
          </p>
          <p class="text-sm text-muted-foreground mt-4">
            <span v-if="post.author">By {{ post.author }}</span>
            <span v-if="post.author && post.date" aria-hidden="true">
              &middot;
            </span>
            <time v-if="post.date" :datetime="post.date">
              {{ new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) }}
            </time>
            <template v-if="post.readingTime">
              <span aria-hidden="true"> &middot; </span>
              <span>{{ post.readingTime }}</span>
            </template>
          </p>
        </NuxtLink>
      </article>
    </div>

    <p v-else class="text-muted-foreground">No posts yet.</p>
  </div>
</template>
