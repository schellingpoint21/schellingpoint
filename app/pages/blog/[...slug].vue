<script setup lang="ts">
  const route = useRoute()
  const {
    public: { siteUrl }
  } = useRuntimeConfig()

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

  const author = computed(() => post.value?.author || 'Schelling Point')
  const postUrl = computed(() => `${siteUrl}/blog/${slug.value}`)
  const ogImage = computed(() =>
    post.value?.image
      ? `${siteUrl}${post.value.image}`
      : `${siteUrl}/og-image.png`
  )
  const formattedDate = computed(() =>
    post.value?.date
      ? new Date(post.value.date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : ''
  )

  // Per-post metadata: title, description, and Open Graph article tags.
  useSeoMeta({
    title: () => post.value?.title,
    description: () => post.value?.description,
    ogTitle: () => post.value?.title,
    ogDescription: () => post.value?.description,
    ogType: 'article',
    ogUrl: () => postUrl.value,
    ogImage: () => ogImage.value,
    twitterTitle: () => post.value?.title,
    twitterDescription: () => post.value?.description,
    articlePublishedTime: () => post.value?.date,
    articleAuthor: () => [author.value]
  })

  // Article structured data with the founder as author (E-E-A-T signal).
  useSchemaOrg([
    defineArticle({
      '@type': 'Article',
      headline: () => post.value?.title,
      description: () => post.value?.description,
      datePublished: () => post.value?.date,
      dateModified: () => post.value?.updated || post.value?.date,
      inLanguage: 'en',
      image: () => ogImage.value,
      author: {
        '@type': 'Person',
        name: author.value,
        url: siteUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'Schelling Point',
        url: siteUrl,
        logo: `${siteUrl}/sp-logo.png`
      }
    })
  ])
</script>

<template>
  <article class="container mx-auto px-6 py-12 max-w-3xl">
    <NuxtLink
      to="/blog"
      class="text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
    >
      &larr; Back to blog
    </NuxtLink>

    <header class="mb-10">
      <h1 class="font-bold text-4xl md:text-5xl leading-tight mb-4">
        {{ post?.title }}
      </h1>
      <p
        v-if="post?.description"
        class="text-xl text-muted-foreground leading-relaxed mb-6"
      >
        {{ post.description }}
      </p>
      <p class="text-sm text-muted-foreground">
        <span>By {{ author }}</span>
        <template v-if="formattedDate">
          <span aria-hidden="true"> &middot; </span>
          <time :datetime="post?.date">{{ formattedDate }}</time>
        </template>
        <template v-if="post?.readingTime">
          <span aria-hidden="true"> &middot; </span>
          <span>{{ post.readingTime }}</span>
        </template>
      </p>
    </header>

    <!-- Same prose treatment as /resources/bitcoin-estate-planning: the site
         has no .dark class, so prose-invert must be applied unconditionally. -->
    <div
      class="prose prose-lg prose-invert max-w-none
             prose-headings:text-foreground prose-headings:font-bold
             prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-3
             prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
             prose-p:text-foreground prose-p:text-base prose-p:leading-relaxed prose-p:mb-5
             prose-a:text-primary prose-a:underline prose-a:underline-offset-4
             [&_:is(h2,h3)_a]:text-foreground [&_:is(h2,h3)_a]:no-underline
             prose-hr:border-border prose-em:text-muted-foreground
             prose-blockquote:border-l-primary prose-blockquote:text-foreground
             prose-blockquote:italic prose-blockquote:font-medium"
    >
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </article>
</template>
