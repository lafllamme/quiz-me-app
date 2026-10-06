<script setup lang="ts">
import type { QuizQuestion } from '~/data/questions'

const props = defineProps<{
  question: QuizQuestion
  activeName: string
  stolen: boolean
  revealed: boolean
  resolved: boolean
  result: string
  winner: 0 | 1 | null
  selectedOption: number | null
  timeExpired: boolean
  timeRemaining: number
  timeLimit: number
  timerRunning: boolean
  drink: boolean
  winnerName: string
}>()

const emit = defineEmits<{
  select: [index: number]
  reveal: []
  toggleTimer: []
  resetTimer: []
  next: []
}>()

const letters = ['A', 'B', 'C', 'D']

function optionClass(index: number) {
  if (props.resolved || props.revealed) {
    if (index === props.question.correctIndex)
      return 'answer-option answer-option--correct'
    if (index === props.selectedOption)
      return 'answer-option answer-option--wrong'
    return 'answer-option answer-option--muted'
  }

  if (index === props.selectedOption)
    return 'answer-option answer-option--wrong'

  return 'answer-option'
}
</script>

<template>
  <section class="question-stage pt-8 md:pt-12">
    <div class="mb-7 flex flex-wrap items-center justify-between gap-4">
      <p class="eyebrow">{{ question.category }} / Frage</p>
      <p class="turn-indicator"><span class="turn-dot" aria-hidden="true" /> {{ activeName }} ist dran<span v-if="stolen"> · Steal</span></p>
    </div>

    <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
      <div>
        <h2 class="display max-w-[18ch] text-[clamp(2.7rem,5vw,5.5rem)] font-500">{{ question.question }}</h2>

        <div class="mt-9 grid gap-2 sm:grid-cols-2" aria-label="Antwortmöglichkeiten">
          <button
            v-for="(option, index) in question.options"
            :key="option"
            class="answer-option"
            :class="optionClass(index)"
            data-uisfx-hover="hover"
            :disabled="resolved || revealed"
            :aria-label="`Antwort ${letters[index]}: ${option}`"
            @click="emit('select', index)"
          >
            <span class="answer-letter">{{ letters[index] }}</span>
            <span class="answer-copy">{{ option }}</span>
            <Icon v-if="resolved && index === question.correctIndex" name="lucide:check" size="18" aria-hidden="true" />
            <Icon v-else-if="selectedOption === index && !revealed" name="lucide:x" size="18" aria-hidden="true" />
          </button>
        </div>
      </div>

      <aside class="timer-panel" :class="timeRemaining <= 10 ? 'timer-panel--warning' : ''" aria-label="Antwortzeit">
        <div class="timer-caption">Noch Zeit</div>
        <div class="timer-value">{{ Math.ceil(timeRemaining) }}</div>
        <div class="timer-unit">Sekunden</div>
        <div class="timer-track" aria-hidden="true"><span :style="{ transform: 'scaleX(' + Math.max(0, Math.min(1, timeRemaining / timeLimit)) + ')' }" /></div>
        <div v-if="!timeExpired" class="mt-5 flex flex-wrap gap-2">
          <button data-uisfx-hover="hover" data-uisfx-press="press" class="timer-control" @click="emit('toggleTimer')">{{ timerRunning ? 'Pause' : 'Weiter' }}</button>
          <button data-uisfx-hover="hover" data-uisfx-press="press" class="timer-control" @click="emit('resetTimer')">Reset</button>
        </div>
      </aside>
    </div>

    <div v-if="revealed || resolved" class="answer-reveal">
      <div>
        <p class="eyebrow">{{ resolved ? (winner === null ? 'Keine Punkte' : 'Aufgelöst') : 'Antwort' }}</p>
        <p class="mt-2 font-display text-[clamp(1.65rem,3vw,2.5rem)] leading-tight">{{ question.answer }}</p>
        <p class="mt-2 text-sm text-muted">{{ result || 'Antwort aufgedeckt. Kein Steal mehr möglich.' }}</p>
      </div>
      <p v-if="drink && resolved" class="text-sm text-gold">{{ winner === null ? 'Beide Teams: 1 Schluck' : `${winnerName}: 1 Schluck` }} · optional</p>
    </div>

    <div class="mt-7 flex flex-wrap items-center justify-between gap-3">
      <button v-if="!resolved && !revealed && !timeExpired" data-uisfx-hover="hover" data-uisfx-press="press" class="text-action" @click="emit('reveal')">Antwort zeigen <span>A</span></button>
      <button v-if="resolved" data-uisfx-hover="hover" data-uisfx-press="press" class="button-primary" @click="emit('next')">Weiter <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      <p v-if="timeExpired && !resolved" class="timeout-notice" role="status">Zeit abgelaufen — jetzt Antwort wählen.</p>
      <p v-else class="ml-auto text-right text-xs uppercase tracking-[0.12em] text-muted">{{ resolved ? 'Punktestand aktualisiert' : 'Wähle A, B, C oder D' }}</p>
    </div>
  </section>
</template>
