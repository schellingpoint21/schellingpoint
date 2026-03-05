<template>
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
</template>

<style scoped>
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
