<script setup lang="ts">
  // Brand film band (Nov 2026), placed directly below the hero.
  // Weight: preload="none" + poster, so nothing downloads until playback starts;
  // phones get the 720p file (~6 MB), wider screens the 1080p file (~12 MB).
  // Behaviour: plays once, muted, for every visitor when half in view; pauses when
  // scrolled away. "Sound on" restarts from the top
  // the first time, so the music is heard from the beginning.
  const { t } = useI18n()

  const video = ref<HTMLVideoElement | null>(null)
  const muted = ref(true)
  const playing = ref(false)
  const ended = ref(false)
  const heardSound = ref(false)
  let userPaused = false
  let io: IntersectionObserver | null = null

  // Autoplay can be refused (e.g. low-power mode); the play button then stays visible.
  const play = async () => {
    try {
      await video.value?.play()
    } catch {
      playing.value = false
    }
  }

  const toggleSound = () => {
    const v = video.value
    if (!v) {
      return
    }
    if (v.muted) {
      v.muted = false
      if (!heardSound.value) {
        v.currentTime = 0
        heardSound.value = true
      }
      userPaused = false
      play()
    } else {
      v.muted = true
    }
  }

  const togglePlay = () => {
    const v = video.value
    if (!v) {
      return
    }
    if (v.paused) {
      userPaused = false
      play()
    } else {
      userPaused = true
      v.pause()
    }
  }

  const onPlay = () => {
    playing.value = true
    ended.value = false
  }
  const onPause = () => {
    playing.value = false
  }
  const onEnded = () => {
    playing.value = false
    ended.value = true
  }
  const onVolume = () => {
    muted.value = video.value?.muted ?? true
  }

  onMounted(() => {
    const v = video.value
    if (!v) {
      return
    }
    if (!('IntersectionObserver' in window)) {
      return
    }
    io = new IntersectionObserver(
      ([e]) => {
        if (!e) {
          return
        }
        if (e.intersectionRatio >= 0.5) {
          if (!(userPaused || ended.value) && v.paused) {
            play()
          }
        } else if (!v.paused) {
          v.pause()
        }
      },
      { threshold: [0, 0.5] }
    )
    io.observe(v)
  })

  onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section class="sp-sec sp-film" :aria-label="t('home.film.aria')" data-reveal>
    <figure class="frame sp-fade" style="--d: 0.12s">
      <video
        ref="video"
        muted
        playsinline
        preload="none"
        poster="/video/brand-film-poster.jpg"
        width="1906"
        height="1080"
        :aria-label="t('home.film.aria')"
        @click="togglePlay"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @volumechange="onVolume"
      >
        <source
          src="/video/brand-film-1080.mp4"
          type="video/mp4"
          media="(min-width: 900px)"
        >
        <source src="/video/brand-film-720.mp4" type="video/mp4">
      </video>

      <button v-if="!playing" type="button" class="play" @click="togglePlay">
        <span class="ico" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M5 3.5v9l7.5-4.5z" />
          </svg>
        </span>
        <span class="txt"
          >{{ ended ? t('home.film.replay') : t('home.film.play') }}</span
        >
      </button>

      <button
        type="button"
        class="sound"
        :aria-pressed="!muted"
        @click="toggleSound"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path class="spk" d="M2 6h2.6L8 3.2v9.6L4.6 10H2z" />
          <template v-if="muted">
            <path class="ln" d="M10.5 6l4 4M14.5 6l-4 4" />
          </template>
          <template v-else>
            <path
              class="ln"
              d="M10.4 5.6a3.4 3.4 0 0 1 0 4.8M12.3 3.8a6 6 0 0 1 0 8.4"
            />
          </template>
        </svg>
        <span
          >{{ muted ? t('home.film.soundOn') : t('home.film.soundOff') }}</span
        >
      </button>
    </figure>
  </section>
</template>

<style scoped>
  .sp-film .frame {
    position: relative;
    /* centred; capped so the whole frame, controls included, fits one screen height */
    margin: 0 auto;
    max-width: calc((100svh - 200px) * 1906 / 1080);
    aspect-ratio: 1906 / 1080;
    background: #000;
    box-shadow: var(--ring);
    overflow: hidden;
  }
  .sp-film video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .sp-film button {
    font-family: var(--sp-sans);
    color: var(--sp-paper);
    border: 0;
    cursor: pointer;
    transition-property: background-color, box-shadow, scale;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }
  .sp-film button:active {
    scale: 0.96;
  }

  .sp-film .sound {
    position: absolute;
    left: clamp(10px, 2vw, 22px);
    bottom: clamp(10px, 2vw, 22px);
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.95rem 0.6rem 0.8rem;
    font-size: 11px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    background: rgba(15, 14, 14, 0.62);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: var(--ring-hover);
  }
  .sp-film .sound svg {
    width: 16px;
    height: 16px;
    flex: none;
  }
  .sp-film .sound .spk {
    fill: var(--sp-paper);
  }
  .sp-film .sound .ln {
    fill: none;
    stroke: var(--sp-paper);
    stroke-width: 1.3;
    stroke-linecap: round;
  }
  .sp-film .sound[aria-pressed="true"] .ln {
    stroke: var(--sp-green);
  }

  .sp-film .play {
    position: absolute;
    right: clamp(10px, 2vw, 22px);
    bottom: clamp(10px, 2vw, 22px);
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.4rem 1rem 0.4rem 0.45rem;
    font-family: var(--sp-serif);
    font-style: italic;
    font-size: 1rem;
    background: rgba(15, 14, 14, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: var(--ring-hover);
  }
  .sp-film .play .ico {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--sp-paper);
  }
  .sp-film .play .ico svg {
    width: 12px;
    height: 12px;
    fill: var(--sp-ink);
    margin-left: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    .sp-film .sound:hover,
    .sp-film .play:hover {
      background: rgba(15, 14, 14, 0.8);
    }
  }
  @media (max-width: 520px) {
    .sp-film .sound {
      padding: 0.5rem 0.75rem 0.5rem 0.65rem;
      font-size: 10px;
      letter-spacing: 0.2em;
    }
    .sp-film .play .txt {
      display: none;
    }
    .sp-film .play {
      padding: 0.4rem;
    }
  }
</style>
