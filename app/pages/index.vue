<script setup lang="ts">
  useSeoMeta({
    title: 'Schelling Point — Self Custody Bitcoin Financial Framework',
    description:
      'Self custody with the right tools, training, and protocols so your wealth stays secure, usable, and survivable for your family and long term legacy.'
  })
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Navbar -->
    <header>
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
      >
        <NuxtLink to="/">
          <img src="/sp-logo.png" alt="Schelling Point" class="h-8 w-auto">
        </NuxtLink>

        <div class="flex items-center gap-8">
          <NuxtLink
            to="/"
            class="text-sm text-white transition-colors hover:text-white/70"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="#packages"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            Packages
          </NuxtLink>
          <NuxtLink
            to="#faq"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            FAQ
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-sm text-white/70 transition-colors hover:text-white"
          >
            Blog
          </NuxtLink>
          <UiButton
            class="rounded-full bg-primary px-5 text-sm text-white hover:bg-primary/90"
          >
            Get started
          </UiButton>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden px-6 pt-16 pb-24">
      <div
        class="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2"
      >
        <div>
          <h1 class="max-w-lg text-7xl font-bold leading-[1.1]">
            Self Custody <span class="text-gradient">Bitcoin</span> Estate
            <span class="text-gradient">Planning</span>
          </h1>
          <p
            class="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Self custody with the right tools, training, and protocols so your
            wealth stays secure, usable, and survivable for your family and long
            term legacy.
          </p>
          <div class="mt-8 flex items-center gap-4">
            <UiButton
              class="h-auto rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
            >
              Get started
            </UiButton>
            <a
              href="#"
              class="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
              Message on Whatsapp
            </a>
          </div>
        </div>

        <div class="relative hidden lg:block">
          <div class="hero-image-wrapper relative">
            <img
              src="/images/hero.jpg"
              alt="Bitcoin self custody security"
              class="h-auto w-full rounded-2xl object-cover"
            >
            <div
              class="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(150,201,113,0.25)_0%,transparent_60%)]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links & Divider -->
    <div class="px-6">
      <div class="mx-auto max-w-7xl">
        <div class="flex items-center gap-4 pb-6">
          <a
            href="#"
            class="text-white/40 transition-colors hover:text-white"
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
            href="#"
            class="text-white/40 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="#"
            class="text-white/40 transition-colors hover:text-white"
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
        </div>
      </div>
    </div>

    <!-- Separator -->
    <div class="flex items-center justify-center py-20">
      <div class="relative h-8 w-16">
        <div
          class="particle particle-1 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary"
        />
        <div
          class="particle particle-2 absolute left-1/2 top-1/2 size-1 rounded-full bg-primary/60"
        />
        <div
          class="particle particle-3 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary/80"
        />
      </div>
    </div>

    <!-- Bitcoin Done the Right Way -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            Bitcoin done
            <br>
            the right way
          </h2>
          <a
            href="#"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            Get started <span class="text-base">⟶</span>
          </a>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Large card -->
          <div
            class="col-span-2 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <img
              src="/images/vault.jpg"
              alt="Bitcoin vault structure"
              class="h-72 w-full object-cover"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                Structure your bitcoin into
                <br>
                <strong class="font-semibold text-white">Spending</strong>,
                <strong class="font-semibold text-white">Savings</strong>, and
                <strong class="font-semibold text-white">Vault</strong>
              </p>
            </div>
          </div>

          <!-- Left small card -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/family.png"
              alt="Family following written protocols"
              class="h-60 w-full object-cover"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                Get
                <strong class="font-semibold text-white"
                  >written protocols</strong
                >
                your
                <br>
                family can follow
              </p>
            </div>
          </div>

          <!-- Right small card -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/me.jpg"
              alt="Point of contact"
              class="h-60 w-full object-cover object-top grayscale"
            >
            <div class="p-6">
              <p class="text-muted-foreground">
                Have a
                <strong class="font-semibold text-white"
                  >point of contact</strong
                >
                <br>
                in an emergency
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Separator -->
    <div class="flex items-center justify-center py-20">
      <div class="relative h-8 w-16">
        <div
          class="particle particle-1 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary"
        />
        <div
          class="particle particle-2 absolute left-1/2 top-1/2 size-1 rounded-full bg-primary/60"
        />
        <div
          class="particle particle-3 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary/80"
        />
      </div>
    </div>

    <!-- You Don't Get a Second Chance -->
    <section class="px-6 pb-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            You don't get a second chance
            <br>
            with self custody
          </h2>
          <a
            href="#"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            Get started <span class="text-base">⟶</span>
          </a>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <!-- Left: Image -->
          <div class="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src="/images/grandpa.jpg"
              alt="Self custody for your family's future"
              class="h-full w-full object-cover"
            >
          </div>

          <!-- Right: Questions -->
          <div class="flex flex-col justify-center">
            <h3 class="mb-6 text-xl font-semibold">
              Taking custody brings real questions
            </h3>
            <div class="divide-y divide-border">
              <p class="py-4 text-sm text-muted-foreground">
                How do I secure Bitcoin properly with the right tools?
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                What order should I implement security so I don't make mistakes?
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                How do I build a system that balances security with real life
                usability?
              </p>
              <p class="py-4 text-sm text-muted-foreground">
                How do I make sure my family can recover it if something
                happens?
              </p>
            </div>
            <div class="mt-8">
              <p class="text-sm text-muted-foreground">
                You don't need more information.
              </p>
              <p class="mt-1 text-lg font-semibold">
                You need a system you can trust for years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Separator -->
    <div class="flex items-center justify-center py-20">
      <div class="relative h-8 w-16">
        <div
          class="particle particle-1 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary"
        />
        <div
          class="particle particle-2 absolute left-1/2 top-1/2 size-1 rounded-full bg-primary/60"
        />
        <div
          class="particle particle-3 absolute left-1/2 top-1/2 size-1.5 rounded-full bg-primary/80"
        />
      </div>
    </div>

    <!-- Learn About What We Do -->
    <section class="px-6 pb-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex items-end justify-between">
          <h2 class="text-4xl font-bold leading-tight">
            Learn about
            <br>
            what we do
          </h2>
          <a
            href="#"
            class="flex items-center gap-2 text-sm text-primary transition-colors hover:text-[#96C971]"
          >
            Get started <span class="text-base">⟶</span>
          </a>
        </div>

        <div class="space-y-4">
          <!-- Row 1 -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-muted-foreground">We don't just tech tools.</p>
              <p class="mt-1 text-lg font-semibold text-white">
                We build systems.
              </p>
            </div>
            <div class="h-52 rounded-2xl border border-border bg-card" />
          </div>

          <!-- Row 2 -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-sm leading-relaxed text-muted-foreground">
                Most people can buy a device, but they don't know how to
                structure Bitcoin around real-life risks like retirement,
                relocation, separation, illness, inheritance, and emergencies.
              </p>
            </div>
            <div class="h-52 rounded-2xl border border-border bg-card" />
          </div>

          <!-- Row 3 -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center"
            >
              <p class="text-muted-foreground">
                We build a complete framework.
              </p>
              <p class="mt-1 text-lg font-semibold text-white">
                Designed for <strong>recovery</strong> and
                <strong>continuity</strong>.
              </p>
            </div>
            <div class="h-52 rounded-2xl border border-border bg-card" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .text-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #96c971 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-image-wrapper {
    -webkit-mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 30%,
        black 70%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        black 20%,
        black 80%,
        transparent 100%
      );
    mask-image:
      linear-gradient(
        to right,
        transparent 0%,
        black 30%,
        black 70%,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        black 20%,
        black 80%,
        transparent 100%
      );
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  .particle {
    will-change: transform, opacity;
  }

  .particle-1 {
    animation: drift-1 3s ease-in-out infinite;
  }

  .particle-2 {
    animation: drift-2 4s ease-in-out infinite 0.5s;
  }

  .particle-3 {
    animation: drift-3 3.5s ease-in-out infinite 1s;
  }

  @keyframes drift-1 {
    0%,
    100% {
      transform: translate(-50%, -50%);
      opacity: 0.6;
    }
    50% {
      transform: translate(calc(-50% - 8px), calc(-50% - 10px));
      opacity: 1;
    }
  }

  @keyframes drift-2 {
    0%,
    100% {
      transform: translate(-50%, -50%);
      opacity: 0.4;
    }
    50% {
      transform: translate(calc(-50% + 10px), calc(-50% + 6px));
      opacity: 0.8;
    }
  }

  @keyframes drift-3 {
    0%,
    100% {
      transform: translate(-50%, -50%);
      opacity: 0.5;
    }
    50% {
      transform: translate(calc(-50% + 6px), calc(-50% - 8px));
      opacity: 1;
    }
  }
</style>
