<script setup lang="ts">
  const route = useRoute()
  const slug = computed(() => {
    const slugParam = route.params.slug
    if (Array.isArray(slugParam)) {
      return slugParam.join('/')
    }
    return slugParam || ''
  })

  const { data: post } = await useAsyncData(`blog-${slug.value}`, () =>
    queryCollection('blog').path(`/blog/${slug.value}`).first()
  )

  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  useSeoMeta({
    title: post.value.title,
    description: post.value.description
  })
</script>

<template>
  <article class="container mx-auto px-4 py-12 max-w-3xl">
    <NuxtLink
      to="/blog"
      class="text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
    >
      &larr; Back to blog
    </NuxtLink>

    <header class="mb-8">
      <h1 class="font-bold text-4xl mb-4">{{ post?.title }}</h1>
      <time
        v-if="post?.date"
        :datetime="post.date"
        class="text-muted-foreground"
      >
        {{ new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) }}
      </time>
    </header>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </article>
</template>
