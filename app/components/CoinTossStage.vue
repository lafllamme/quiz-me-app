<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  activeName: string
  round: number
  rounds: number
  ready: boolean
  result: 'kopf' | 'zahl'
}>()

const emit = defineEmits<{ continue: [] }>()

const phase = ref(0)
const phaseLabels = ['Münze in der Luft.', 'Noch ein Flip.', 'Der Start steht.']
let phaseTimer: number | undefined

onMounted(() => {
  phaseTimer = window.setInterval(() => {
    if (phase.value >= phaseLabels.length - 1) {
      if (phaseTimer)
        window.clearInterval(phaseTimer)
      return
    }
    phase.value++
  }, 760)
})

onBeforeUnmount(() => {
  if (phaseTimer)
    window.clearInterval(phaseTimer)
})
</script>

<template>
  <section class="coin-toss-stage" aria-live="polite">
    <div class="coin-toss-stage__inner">
      <div class="coin-toss-stage__meta">
        <span>Runde {{ round }} / {{ rounds }}</span>
        <span>Jungle Quiz</span>
      </div>

      <div class="coin-toss-stage__center">
        <p class="coin-toss-stage__eyebrow">Wer fängt an?</p>
        <div class="coin-toss-token" :class="{ 'coin-toss-token--settled': ready, 'coin-toss-token--zahl': result === 'zahl' }" aria-label="Münzwurf">
          <span class="coin-toss-token__face">KOPF</span>
          <span class="coin-toss-token__back">ZAHL</span>
        </div>
        <h1>Die Münze<br><em>entscheidet.</em></h1>
        <p class="coin-toss-stage__hint"><strong>{{ ready ? `${result === 'kopf' ? 'Kopf' : 'Zahl'} — ${activeName} beginnt.` : phaseLabels[phase] }}</strong></p>
        <button class="coin-toss-stage__continue" :disabled="!ready" type="button" @click="emit('continue')">
          {{ ready ? 'Weiter zu den Kategorien' : 'Münze wird geworfen …' }}
          <Icon name="lucide:arrow-right" size="18" aria-hidden="true" />
        </button>
      </div>

      <div class="coin-toss-stage__foot">
        <span>Ein kurzer Start.</span>
        <span>Bereit für die erste Frage.</span>
      </div>
    </div>
  </section>
</template>
