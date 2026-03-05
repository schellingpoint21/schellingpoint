<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-border px-6 py-12">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <!-- Brand -->
        <div>
          <NuxtLink to="/">
            <img src="/sp-logo.png" alt="Schelling Point" class="h-8 w-auto">
          </NuxtLink>
          <p class="mt-3 text-sm text-muted-foreground">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-sm font-semibold text-white">
            {{ t('footer.navigation') }}
          </h4>
          <ul class="mt-3 space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#packages"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                {{ t('nav.packages') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#faq"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                {{ t('nav.faq') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blog"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                {{ t('nav.blog') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-sm font-semibold text-white">
            {{ t('footer.contact') }}
          </h4>
          <ul class="mt-3 space-y-2">
            <li>
              <a
                href="tel:+50370204642"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                +503 7020 4642
              </a>
            </li>
            <li>
              <a
                href="mailto:charlie@schellingpoint.lat"
                class="text-sm text-muted-foreground transition-colors hover:text-white"
              >
                charlie@schellingpoint.lat
              </a>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="text-sm font-semibold text-white">
            {{ t('footer.followUs') }}
          </h4>
          <div class="mt-3 flex gap-3">
            <a
              href="https://instagram.com/schellingpoint21"
              target="_blank"
              rel="noopener"
              class="text-muted-foreground transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1.5"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href="https://x.com/schellingp21"
              target="_blank"
              rel="noopener"
              class="text-muted-foreground transition-colors hover:text-white"
              aria-label="X"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/schelling-point/"
              target="_blank"
              rel="noopener"
              class="text-muted-foreground transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-10 flex items-center justify-between border-t border-border pt-6"
      >
        <p class="text-xs text-muted-foreground">{{ t('footer.rights') }}</p>
        <LanguageSwitcher />
      </div>
    </div>
  </footer>
</template>
