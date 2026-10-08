<script setup lang="ts">
import { PaperGrainGradient } from '~/ui/paper-grain-gradient'
import type { GameMode } from '~/types/setup'

defineProps<{ mode: GameMode }>()

// "Night jungle" grain gradient from the design lab (K2). It freezes on a still frame for
// reduced motion and while the tab is hidden, so an idle lobby does not keep the GPU busy.
const grain = {
  colorBack: '#081811',
  colors: ['#0b4429', '#2f7a3d', '#caff4a'],
  softness: 0.4,
  intensity: 0.2,
  noise: 0.5,
  shape: 'blob',
  fit: 'contain',
  scale: 1.3,
} as const
const grainSpeed = 0.5

const reducedMotion = ref(false)
const pageHidden = ref(false)
// Starts hidden and fades in once the shader has had a couple of frames to draw,
// so a refresh does not snap the gradient in hard.
const grainReady = ref(false)
const speed = computed(() => reducedMotion.value || pageHidden.value ? 0 : grainSpeed)

function syncVisibility() {
  pageHidden.value = document.hidden
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  syncVisibility()
  document.addEventListener('visibilitychange', syncVisibility)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    grainReady.value = true
  }))
})

onBeforeUnmount(() => document.removeEventListener('visibilitychange', syncVisibility))
</script>

<template>
  <div class="game-setup-copy">
    <ClientOnly>
      <PaperGrainGradient v-bind="grain" :colors="[...grain.colors]" :speed="speed" :class="grainReady ? 'game-setup-grain is-ready' : 'game-setup-grain'" aria-hidden="true" />
    </ClientOnly>
    <div class="game-setup-brand-spacer" aria-hidden="true" />
    <div class="game-setup-copy-main">
      <h1 v-if="mode === 'sniper'">Wer<br><em>hört's?</em></h1>
      <h1 v-else>Wer<br><em>spielt?</em></h1>
      <p v-if="mode === 'sniper'">Ein Geräusch, zwei Buzzer. Wer zuerst drückt, muss es wissen.</p>
      <p v-else>Gib den Teams einen Namen. Den Rest regeln wir.</p>
    </div>
  </div>
</template>
