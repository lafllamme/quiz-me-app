<script setup lang="ts">
import type { PanelMedia } from '~/components/QuestionMediaPanel.vue'
import type { QuizQuestion } from '~/data/questions'
import { formatEstimate } from '~/utils/estimate-format'

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
  estimateGuesses?: [number, number] | null
}>()

const emit = defineEmits<{
  select: [index: number]
  reveal: []
  toggleTimer: []
  resetTimer: []
  next: []
  estimate: [guesses: [number, number]]
}>()

const letters = ['A', 'B', 'C', 'D']

const questionCount = computed(() => props.rounds * props.perRound)
const activeIndex = computed(() => props.activeName === props.names[1] && props.activeName !== props.names[0] ? 1 : 0)
const timerProgress = computed(() => Math.max(0, Math.min(1, props.timeRemaining / props.timeLimit)))
const seconds = computed(() => Math.ceil(props.timeRemaining))
const isOpen = computed(() => !props.resolved && !props.revealed)
const timerWarning = computed(() => isOpen.value && seconds.value <= 10)
const media = computed(() => props.question.media)
const isSwatch = computed(() => media.value?.kind === 'swatch')
// Flag questions without `show` put the flags into the answer buttons, like colour swatches.
const isFlagOptions = computed(() => media.value?.kind === 'flag' && 'reveal' in media.value)
const displayMedia = computed<PanelMedia | undefined>(() => {
  const current = media.value
  if (!current || current.kind === 'swatch' || (current.kind === 'flag' && 'reveal' in current))
    return undefined
  return current
})
const answerLabel = computed(() => {
  const current = media.value
  if (current?.kind === 'swatch' || (current?.kind === 'flag' && 'reveal' in current))
    return current.reveal
  return props.question.answer
})
// Drives the formats that reveal themselves while the clock runs.
const mediaProgress = computed(() => 1 - timerProgress.value)

const estimate = computed(() => props.question.estimate)
const estimateInputs = reactive<[string, string]>(['', ''])
const estimateError = ref('')
watch(() => props.question.id, () => {
  estimateInputs[0] = ''
  estimateInputs[1] = ''
  estimateError.value = ''
})

function submitEstimate() {
  const values = estimateInputs.map(value => Number(String(value).replace(/[\s.]/g, '').replace(',', '.'))) as [number, number]
  if (estimateInputs.some(value => String(value).trim() === '') || values.some(value => !Number.isFinite(value))) {
    estimateError.value = 'Bitte für beide Teams eine Zahl eingeben.'
    return
  }
  estimateError.value = ''
  emit('estimate', values)
}

const formatNumber = (value: number) => formatEstimate(value, estimate.value?.unit ?? '')
const estimateDistance = (index: 0 | 1) => props.estimateGuesses && estimate.value ? Math.abs(props.estimateGuesses[index] - estimate.value.value) : null

// Long questions step down in size so the whole stage fits one screen without scrolling.
const questionSize = computed(() => {
  // Picture questions give the space to the image, so the text takes the smallest step.
  if (displayMedia.value)
    return 'xl'
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
        <QuestionMediaPanel v-if="displayMedia" :key="question.id" :media="displayMedia" :progress="mediaProgress" :revealed="!isOpen" />
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

    <form v-if="estimate" class="question-estimate" :class="{ 'question-estimate--done': !isOpen }" aria-label="Schätzungen" @submit.prevent="submitEstimate">
      <label v-for="index in [0, 1] as const" :key="index" class="question-estimate-team" :class="{ 'question-estimate-team--winner': !isOpen && winner === index }">
        <span>{{ names[index] }}</span>
        <input v-if="isOpen" v-model="estimateInputs[index]" type="text" inputmode="decimal" autocomplete="off" placeholder="Schätzung">
        <strong v-else-if="estimateGuesses">{{ formatNumber(estimateGuesses[index]) }}<small v-if="estimate.unit" class="question-estimate-unit">{{ estimate.unit }}</small></strong>
        <small v-if="!isOpen && estimateDistance(index) !== null">{{ estimateDistance(index) === 0 ? 'Volltreffer' : `${formatNumber(estimateDistance(index)!)} daneben` }}</small>
        <small v-else-if="isOpen && estimate.unit">in {{ estimate.unit }}</small>
      </label>
      <button v-if="isOpen" type="submit" data-uisfx-hover="hover" data-uisfx-press="press" class="button-primary question-estimate-submit">Auswerten <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      <p v-if="estimateError" class="question-estimate-error" role="alert">{{ estimateError }}</p>
    </form>

    <div v-else class="question-live-answers" :class="{ 'question-live-answers--swatch': isSwatch || isFlagOptions }" aria-label="Antwortmöglichkeiten">
      <button
        v-for="(option, index) in question.options"
        :key="option"
        class="question-live-option"
        :class="optionClass(index)"
        data-uisfx-hover="hover"
        :disabled="!isOpen || wrongOptions.includes(index)"
        :aria-keyshortcuts="`${index + 1} ${letters[index]}`"
        :aria-label="isSwatch ? `Antwort ${letters[index]}: Farbe ${letters[index]}` : isFlagOptions ? `Antwort ${letters[index]}: Flagge ${letters[index]}` : `Antwort ${letters[index]}: ${option}`"
        @click="emit('select', index)"
      >
        <span class="question-live-option-letter">{{ letters[index] }}</span>
        <span v-if="isSwatch" class="question-live-option-swatch" :style="{ background: option }" />
        <FlagImage v-else-if="isFlagOptions" class="question-live-option-flag" :spec="option" />
        <span v-else class="question-live-option-copy">{{ option }}</span>
        <Icon v-if="!isOpen && index === question.correctIndex" name="lucide:check" size="22" aria-hidden="true" />
        <Icon v-else-if="wrongOptions.includes(index)" name="lucide:x" size="22" aria-hidden="true" />
      </button>
    </div>

    <div class="question-live-foot">
      <div v-if="!isOpen" class="question-live-reveal">
        <span>{{ resolved && winner !== null ? 'Richtig' : 'Antwort' }}</span>
        <strong>{{ answerLabel }}</strong>
        <p>{{ result }}<template v-if="drink && resolved"> · {{ winner === null ? 'Beide Teams: 1 Schluck' : `${winnerName}: 1 Schluck` }} (optional)</template></p>
      </div>
      <button v-else data-uisfx-hover="hover" data-uisfx-press="press" class="question-live-action" @click="emit('reveal')">Antwort zeigen <kbd>Z</kbd></button>

      <button v-if="!isOpen" data-uisfx-hover="hover" data-uisfx-press="press" class="button-primary question-live-next" @click="emit('next')">Weiter <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      <p v-else-if="stolen" class="question-live-steal" role="status">{{ result }}</p>
      <p v-else-if="estimate" class="question-live-hint">Beide Teams schätzen, näher dran punktet</p>
      <p v-else class="question-live-hint">Antwort mit <kbd>1</kbd>–<kbd>4</kbd> oder <kbd>A</kbd>–<kbd>D</kbd></p>
    </div>
  </section>
</template>

<style scoped>
/* Flag answers: the flag is the option, sized like a small card. */
.question-live-option-flag {
  height: clamp(3.2rem, 9vh, 5.4rem);
  justify-self: start;
}

.question-live-option--wrong .question-live-option-flag,
.question-live-option--muted .question-live-option-flag {
  opacity: 0.6;
}

/* Estimate: one big input per team instead of four options. */
.question-estimate {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: stretch;
  gap: 0.8rem;
}

.question-estimate--done {
  grid-template-columns: 1fr 1fr;
}

.question-estimate-team {
  display: grid;
  gap: 0.35rem;
  border: 1px solid var(--question-line);
  border-radius: 0.9rem;
  background: rgb(251 248 237 / 6%);
  padding: 0.8rem 1rem;
  color: var(--question-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.question-estimate-team input {
  width: 100%;
  border: 0;
  border-bottom: 2px solid var(--question-accent);
  background: transparent;
  color: var(--question-cream);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  outline: none;
}

.question-estimate-team input::placeholder {
  color: rgb(251 248 237 / 30%);
}

.question-estimate-team strong {
  color: var(--question-cream);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
  text-transform: none;
}

.question-estimate-team small {
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: none;
}

.question-estimate-team .question-estimate-unit {
  margin-left: 0.3em;
  color: var(--question-muted);
  font-size: 0.5em;
}

.question-estimate-team--winner {
  border-color: var(--question-accent);
  background: rgb(202 255 74 / 12%);
}

.question-estimate-submit {
  align-self: center;
}

.question-estimate-error {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--question-coral);
}

@media (max-width: 720px) {
  .question-estimate {
    grid-template-columns: 1fr;
  }
}

/* Colour-guess answers: the swatch is the option, so it fills the whole label area. */
.question-live-option-swatch {
  display: block;
  align-self: stretch;
  min-height: 2.6rem;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 0 1px rgb(251 248 237 / 18%);
}

/* After the reveal the wrong colours stay visible for comparison, just quieter. */
.question-live-answers--swatch .question-live-option--muted {
  opacity: 1;
}

.question-live-option--wrong .question-live-option-swatch,
.question-live-option--muted .question-live-option-swatch {
  opacity: 0.6;
}
</style>
