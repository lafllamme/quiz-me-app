<script setup lang="ts">
import type { QuizQuestion } from '~/data/questions'

const props = defineProps<{
  question: QuizQuestion
  names: [string, string]
  scores: [number, number]
  activeName: string
  round: number
  rounds: number
  turn: number
  perRound: number
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
const questionOrdinals = ['Erste', 'Zweite', 'Dritte', 'Vierte', 'Fünfte', 'Sechste', 'Siebte', 'Achte', 'Neunte', 'Zehnte']
const numberNames: Record<number, string> = { 1: 'Eine', 2: 'Zwei', 3: 'Drei', 4: 'Vier', 5: 'Fünf', 6: 'Sechs', 7: 'Sieben', 8: 'Acht', 9: 'Neun', 10: 'Zehn' }

const questionLabel = computed(() => questionOrdinals[props.turn] ?? `${props.turn + 1}.`)
const questionCountLabel = computed(() => `${numberNames[props.rounds * props.perRound] ?? props.rounds * props.perRound} Fragen`)
const timerProgress = computed(() => Math.max(0, Math.min(1, props.timeRemaining / props.timeLimit)))

function optionClass(index: number) {
  if (props.resolved || props.revealed) {
    if (index === props.question.correctIndex)
      return 'question-live-option--correct'
    if (index === props.selectedOption)
      return 'question-live-option--wrong'
    return 'question-live-option--muted'
  }

  if (index === props.selectedOption)
    return 'question-live-option--wrong'

  return ''
}
</script>

<template>
  <section class="question-live-stage" :class="{ 'question-live-stage--expired': timeExpired, 'question-live-stage--resolved': resolved || revealed }">
    <div class="question-live-top">
      <div class="question-live-context">
        <span>Frage</span>
        <strong>{{ questionLabel }} / {{ questionCountLabel }}</strong>
      </div>

      <div class="question-live-active-team">
        <span>Ist dran</span>
        <strong>{{ activeName }}</strong>
        <small>{{ stolen ? 'Steal' : 'Antwort wählen' }}</small>
      </div>

      <div class="question-live-context question-live-context--round">
        <span>Runde</span>
        <strong>{{ round }} / {{ rounds }}</strong>
      </div>
    </div>

    <div class="question-live-scoreline" aria-label="Punktestand">
      <span :class="{ 'question-live-scoreline--active': activeName === names[0] }">{{ names[0] }} <strong>{{ scores[0] }}</strong></span>
      <span :class="{ 'question-live-scoreline--active': activeName === names[1] }">{{ names[1] }} <strong>{{ scores[1] }}</strong></span>
    </div>

    <div class="question-live-main">
      <div class="question-live-copy">
        <span class="question-live-category">{{ question.category }}</span>
        <h2>{{ question.question }}</h2>
      </div>

      <aside class="question-live-timer" :class="{ 'question-live-timer--warning': timeRemaining <= 10 && !timeExpired, 'question-live-timer--expired': timeExpired }" aria-label="Antwortzeit">
        <span class="question-live-timer-label">{{ timeExpired ? 'Zeit vorbei' : 'Noch Zeit' }}</span>
        <strong>{{ Math.ceil(timeRemaining) }}</strong>
        <span class="question-live-timer-unit">Sekunden</span>
        <i aria-hidden="true"><b :style="{ transform: `scaleX(${timerProgress})` }" /></i>
        <div v-if="!timeExpired && !resolved && !revealed" class="question-live-timer-actions">
          <button data-uisfx-hover="hover" data-uisfx-press="press" @click="emit('toggleTimer')">{{ timerRunning ? 'Pause' : 'Weiter' }}</button>
          <button data-uisfx-hover="hover" data-uisfx-press="press" @click="emit('resetTimer')">Reset</button>
        </div>
      </aside>
    </div>

    <div class="question-live-answers" aria-label="Antwortmöglichkeiten">
      <button
        v-for="(option, index) in question.options"
        :key="option"
        class="question-live-option"
        :class="optionClass(index)"
        data-uisfx-hover="hover"
        :disabled="resolved || revealed"
        :aria-label="`Antwort ${letters[index]}: ${option}`"
        @click="emit('select', index)"
      >
        <span class="question-live-option-letter">{{ letters[index] }}</span>
        <span class="question-live-option-copy">{{ option }}</span>
        <Icon v-if="resolved && index === question.correctIndex" name="lucide:check" size="20" aria-hidden="true" />
        <Icon v-else-if="selectedOption === index && !revealed" name="lucide:x" size="20" aria-hidden="true" />
      </button>
    </div>

    <div v-if="revealed || resolved" class="question-live-reveal">
      <div>
        <span>{{ resolved ? (winner === null ? 'Keine Punkte' : 'Aufgelöst') : 'Antwort' }}</span>
        <strong>{{ question.answer }}</strong>
        <p>{{ result || 'Antwort aufgedeckt. Kein Steal mehr möglich.' }}</p>
      </div>
      <p v-if="drink && resolved">{{ winner === null ? 'Beide Teams: 1 Schluck' : `${winnerName}: 1 Schluck` }} · optional</p>
    </div>

    <div class="question-live-foot">
      <button v-if="!resolved && !revealed && !timeExpired" data-uisfx-hover="hover" data-uisfx-press="press" class="question-live-action" @click="emit('reveal')">Antwort zeigen <span>A</span></button>
      <button v-if="resolved" data-uisfx-hover="hover" data-uisfx-press="press" class="button-primary" @click="emit('next')">Weiter <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      <p v-if="timeExpired && !resolved" class="question-live-timeout" role="status">Zeit abgelaufen — jetzt Antwort wählen.</p>
      <p v-else class="question-live-hint">{{ resolved ? 'Punktestand aktualisiert' : 'Wähle A, B, C oder D' }}</p>
    </div>
  </section>
</template>
