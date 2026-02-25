<script setup lang="ts">
  const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('blog').order('date', 'DESC').all()
  )
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="font-bold text-4xl mb-8">Blog</h1>

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
          <time
            v-if="post.date"
            :datetime="post.date"
            class="text-sm text-muted-foreground mt-4 block"
          >
            {{ new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) }}
          </time>
        </NuxtLink>
      </article>
    </div>

    <p v-else class="text-muted-foreground">No posts yet.</p>
  </div>
</template>
