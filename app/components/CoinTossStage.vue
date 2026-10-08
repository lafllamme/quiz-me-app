<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  activeName: string
  names: [string, string]
  round: number
  rounds: number
  ready: boolean
  result: 'kopf' | 'zahl'
}>()

const emit = defineEmits<{ continue: [] }>()

// The game decides the result up front; only reveal it once the coin shows it.
const landed = ref(false)

const sound = useSound()

// The flick lands with the throw, the swoosh trails it by a beat.
function thrown() {
  void sound.playSample('coinFlip')
  void sound.playSample('coinSwoosh', 0.08)
}
const revealed = computed(() => props.ready && landed.value)

const teams = computed(() => [
  { side: 'kopf' as const, label: 'Kopf', name: props.names[0] },
  { side: 'zahl' as const, label: 'Zahl', name: props.names[1] },
])
</script>

<template>
  <section class="coin-toss-stage" :class="[`coin-toss-stage--${result}`, { 'coin-toss-stage--revealed': revealed }]">
    <div class="coin-toss-stage__inner">
      <div class="coin-toss-stage__meta">
        <span>Runde {{ round }} / {{ rounds }}</span>
        <span>Münzwurf</span>
      </div>

      <h1>Wer fängt an?</h1>

      <!-- Versus axis: the teams flank the coin, the winner lights up on landing. -->
      <div class="coin-toss-duel">
        <div
          v-for="team in teams"
          :key="team.side"
          class="coin-toss-team"
          :class="[`coin-toss-team--${team.side}`, { 'coin-toss-team--won': revealed && result === team.side }]"
        >
          <span>{{ team.label }}</span>
          <strong>{{ team.name }}</strong>
          <small aria-hidden="true">beginnt</small>
        </div>
        <ClientOnly>
          <TossCoin :names="names" :result="result" finish="bimetal-portrait" @thrown="thrown" @landed="landed = true" />
        </ClientOnly>
      </div>

      <div class="coin-toss-stage__foot">
        <p class="coin-toss-stage__status" aria-live="polite">
          {{ revealed ? `${result === 'kopf' ? 'Kopf' : 'Zahl'}: ${activeName} beginnt.` : 'Die Münze fliegt …' }}
        </p>
        <button class="coin-toss-stage__continue" :disabled="!revealed" type="button" @click="emit('continue')">
          Weiter zu den Kategorien
          <Icon name="lucide:arrow-right" size="18" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>
