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
  wrongOptions: number[]
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

const questionCount = computed(() => props.rounds * props.perRound)
const activeIndex = computed(() => props.activeName === props.names[1] && props.activeName !== props.names[0] ? 1 : 0)
const timerProgress = computed(() => Math.max(0, Math.min(1, props.timeRemaining / props.timeLimit)))
const seconds = computed(() => Math.ceil(props.timeRemaining))
const isOpen = computed(() => !props.resolved && !props.revealed)
const timerWarning = computed(() => isOpen.value && seconds.value <= 10)

// Long questions step down in size so the whole stage fits one screen without scrolling.
const questionSize = computed(() => {
  const length = props.question.question.length
  if (length <= 40)
    return 's'
  if (length <= 65)
    return 'm'
  if (length <= 90)
    return 'l'
  return 'xl'
})

function optionClass(index: number) {
  if (!isOpen.value) {
    if (index === props.question.correctIndex)
      return 'question-live-option--correct'
    if (props.wrongOptions.includes(index))
      return 'question-live-option--wrong'
    return 'question-live-option--muted'
  }

  if (props.wrongOptions.includes(index))
    return 'question-live-option--wrong'

  return ''
}
</script>

<template>
  <section class="question-live-stage" :class="{ 'question-live-stage--steal': stolen && isOpen, 'question-live-stage--resolved': !isOpen }">
    <div class="question-live-progress" :aria-label="`Frage ${turn + 1} von ${questionCount}, Runde ${round} von ${rounds}`">
      <div aria-hidden="true">
        <i v-for="tick in questionCount" :key="tick" :class="{ 'is-done': tick < turn + 1, 'is-current': tick === turn + 1 }" />
      </div>
      <span>Frage {{ turn + 1 }} / {{ questionCount }} · Runde {{ round }} / {{ rounds }}</span>
    </div>

    <div class="question-live-duel" aria-label="Punktestand">
      <div v-for="index in [0, 1] as const" :key="index" class="question-live-team" :class="[`question-live-team--${index === 0 ? 'one' : 'two'}`, { 'question-live-team--active': activeIndex === index && isOpen }]">
        <span class="question-live-team-name">{{ names[index] }}</span>
        <strong class="question-live-team-score">{{ scores[index] }}</strong>
        <small v-if="activeIndex === index && isOpen" class="question-live-team-badge">{{ stolen ? 'Steal-Chance' : 'Ist dran' }}</small>
      </div>
      <span class="question-live-duel-divider" aria-hidden="true">:</span>
    </div>

    <div class="question-live-main">
      <div class="question-live-copy">
        <span class="question-live-category">{{ question.category }}</span>
        <h2 :class="`question-live-question--${questionSize}`">{{ question.question }}</h2>
      </div>

      <aside class="question-live-timer" :class="{ 'question-live-timer--warning': timerWarning, 'question-live-timer--done': !isOpen }" aria-label="Antwortzeit">
        <span class="question-live-timer-label">{{ stolen && isOpen ? 'Steal-Zeit' : timeExpired ? 'Zeit vorbei' : 'Noch Zeit' }}</span>
        <strong>{{ seconds }}<small>Sek.</small></strong>
        <i aria-hidden="true"><b :style="{ transform: `scaleX(${timerProgress})` }" /></i>
        <div v-if="isOpen" class="question-live-timer-actions">
          <button data-uisfx-hover="hover" data-uisfx-press="press" @click="emit('toggleTimer')">{{ timerRunning ? 'Pause' : 'Weiter' }} <kbd>Leertaste</kbd></button>
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
        :disabled="!isOpen || wrongOptions.includes(index)"
        :aria-keyshortcuts="`${index + 1} ${letters[index]}`"
        :aria-label="`Antwort ${letters[index]}: ${option}`"
        @click="emit('select', index)"
      >
        <span class="question-live-option-letter">{{ letters[index] }}</span>
        <span class="question-live-option-copy">{{ option }}</span>
        <Icon v-if="!isOpen && index === question.correctIndex" name="lucide:check" size="22" aria-hidden="true" />
        <Icon v-else-if="wrongOptions.includes(index)" name="lucide:x" size="22" aria-hidden="true" />
      </button>
    </div>

    <div class="question-live-foot">
      <div v-if="!isOpen" class="question-live-reveal">
        <span>{{ resolved && winner !== null ? 'Richtig' : 'Antwort' }}</span>
        <strong>{{ question.answer }}</strong>
        <p>{{ result }}<template v-if="drink && resolved"> · {{ winner === null ? 'Beide Teams: 1 Schluck' : `${winnerName}: 1 Schluck` }} (optional)</template></p>
      </div>
      <button v-else data-uisfx-hover="hover" data-uisfx-press="press" class="question-live-action" @click="emit('reveal')">Antwort zeigen <kbd>Z</kbd></button>

      <button v-if="!isOpen" data-uisfx-hover="hover" data-uisfx-press="press" class="button-primary question-live-next" @click="emit('next')">Weiter <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      <p v-else-if="stolen" class="question-live-steal" role="status">{{ result }}</p>
      <p v-else class="question-live-hint">Antwort mit <kbd>1</kbd>–<kbd>4</kbd> oder <kbd>A</kbd>–<kbd>D</kbd></p>
    </div>
  </section>
</template>
