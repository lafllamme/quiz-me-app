<script setup lang="ts">
import type { QuizQuestion } from '~/data/questions'

defineProps<{
  question: QuizQuestion
  activeName: string
  stolen: boolean
  revealed: boolean
  resolved: boolean
  result: string
  winner: 0 | 1 | null
  timeRemaining: number
  timeLimit: number
  timerRunning: boolean
  drink: boolean
  winnerName: string
}>()

const emit = defineEmits<{
  correct: []
  wrong: []
  reveal: []
  toggleTimer: []
  resetTimer: []
  next: []
}>()
</script>

<template>
  <section class="pt-9">
    <p class="eyebrow">{{ question.category }} / {{ stolen ? 'Steal · ' : '' }}{{ activeName }}</p>
    <div class="grid items-center gap-5 py-10 lg:grid-cols-[1fr_220px] lg:gap-10">
      <h2 class="display max-w-[17ch] text-[clamp(2.6rem,4.4vw,4rem)]">{{ question.question }}</h2>
      <div class="flex items-center justify-between gap-4 lg:block lg:text-center">
        <div class="font-display text-[clamp(5rem,10vw,9.25rem)] leading-none tabular-nums" :class="timeRemaining <= 10 ? 'text-coral animate-pulse' : 'text-gold'">{{ Math.ceil(timeRemaining) }}</div>
        <div class="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Sekunden</div>
        <div class="mt-4 h-1 w-full bg-white/10 lg:mt-6">
          <span class="block h-full bg-gold transition-[width] duration-100" :style="{ width: `${Math.max(0, Math.min(100, timeRemaining / timeLimit * 100))}%` }" />
        </div>
      </div>
    </div>

    <div v-if="revealed || resolved" class="border-t border-line py-5">
      <p class="eyebrow">Die Antwort</p>
      <p class="mt-3 max-w-[36ch] font-display text-[clamp(1.8rem,3vw,2.65rem)] leading-tight">{{ question.answer }}</p>
      <p class="mt-2 text-sm text-muted">{{ result || 'Antwort aufgedeckt. Kein Steal mehr möglich.' }}</p>
      <p v-if="drink && resolved" class="mt-4 text-sm text-gold">{{ winner === null ? 'Beide Teams: 1 Schluck' : `${winnerName}: 1 Schluck` }} · optional</p>
    </div>

    <div class="flex flex-wrap gap-3 border-t border-line pt-5">
      <button v-if="resolved" class="button-primary" @click="emit('next')">
        Weiter <Icon name="lucide:arrow-right" size="17" aria-hidden="true" />
      </button>
      <template v-else>
        <button class="button-base border-leaf bg-leaf text-ink hover:bg-[#cce8b3]" @click="emit('correct')">Richtig <span class="text-xs opacity-60">R</span></button>
        <button class="button-base border-coral text-coral hover:bg-coral/10" @click="emit('wrong')">Falsch <span class="text-xs opacity-60">F</span></button>
        <button v-if="!revealed" class="button-quiet" @click="emit('reveal')">Antwort zeigen <span class="text-xs text-muted">A</span></button>
        <button class="button-quiet" @click="emit('toggleTimer')">{{ timerRunning ? 'Pause' : 'Weiter' }}</button>
        <button class="button-quiet" @click="emit('resetTimer')">Timer reset</button>
      </template>
    </div>
    <p class="mt-7 text-sm text-muted">{{ stolen ? 'Letzte Chance für das andere Team.' : 'Der Host entscheidet. Die Frage zählt für beide Teams.' }}</p>
  </section>
</template>
