<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'
import { formatEstimate } from '~/utils/estimate-format'

const props = defineProps<{
  names: QuizConfig['names']
  question: string
  answer: number
}>()

const emit = defineEmits<{ submit: [guesses: [number, number]] }>()
const guesses = reactive<[string, string]>(['', ''])
const feedback = ref('')
// Guesses are evaluated here first so both teams see the solution before the result counts.
const revealed = ref<[number, number] | null>(null)

const distances = computed(() => revealed.value?.map(guess => Math.abs(guess - props.answer)) as [number, number] | undefined)
const winner = computed(() => {
  if (!distances.value || distances.value[0] === distances.value[1])
    return null
  return distances.value[0] < distances.value[1] ? 0 : 1
})

const rows = computed(() => revealed.value
  ? props.names.map((name, index) => ({ name, guess: revealed.value![index]!, distance: distances.value![index]! }))
  : [])

function format(value: number) {
  return formatEstimate(value, '')
}

// German input: "10.080" is ten thousand and eighty, "2,5" is two and a half.
function parseGuess(input: string) {
  const compact = input.trim().replace(/\s/g, '')
  const withoutThousands = /^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(compact) ? compact.replace(/\./g, '') : compact
  return Number(withoutThousands.replace(',', '.'))
}

function reveal() {
  const values = guesses.map(parseGuess) as [number, number]
  if (guesses.some(value => value.trim() === '') || values.some(value => !Number.isFinite(value))) {
    feedback.value = 'Bitte zwei gültige Zahlen eingeben.'
    return
  }
  feedback.value = ''
  revealed.value = values
}

function confirm() {
  if (revealed.value)
    emit('submit', revealed.value)
}

// A repeated tie brings the next estimate question; start that one fresh.
watch(() => props.question, () => {
  guesses[0] = ''
  guesses[1] = ''
  revealed.value = null
})
</script>

<template>
  <section class="mx-auto max-w-3xl py-14 text-center">
    <p class="eyebrow">Gleichstand · näher dran gewinnt</p>
    <h2 class="display mt-6" :class="revealed ? 'text-[clamp(1.5rem,2.4vw,2.2rem)]' : 'text-[clamp(2.8rem,5vw,4.75rem)]'">{{ question }}</h2>

    <template v-if="!revealed">
      <p class="mx-auto mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">Beide Teams geben verdeckt eine Schätzung ab.</p>
      <form class="mx-auto mt-9 grid max-w-2xl gap-4 text-left sm:grid-cols-2" @submit.prevent="reveal">
        <label v-for="(name, index) in names" :key="index" class="text-sm text-muted">
          {{ name }}
          <input v-model="guesses[index]" type="text" inputmode="decimal" autocomplete="off" placeholder="Schätzung" class="field mt-2">
        </label>
        <button type="submit" class="button-primary mt-3 justify-self-center sm:col-span-2">Schätzungen auswerten <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
      </form>
      <p v-if="feedback" class="mt-5 text-sm text-coral" role="alert">{{ feedback }}</p>
    </template>

    <div v-else class="tie-reveal mt-7" role="status">
      <div class="tie-reveal-row">
        <div v-for="(row, index) in rows" :key="index" class="tie-reveal-guess" :class="[`tie-reveal-guess--${index === 0 ? 'one' : 'two'}`, { 'tie-reveal-guess--winner': winner === index }]">
          <span>{{ row.name }}</span>
          <strong>{{ format(row.guess) }}</strong>
          <small>{{ row.distance === 0 ? 'Exakt getroffen' : `${format(row.distance)} daneben` }}</small>
        </div>
        <div class="tie-reveal-solution">
          <p class="tie-reveal-label">Lösung</p>
          <strong class="tie-reveal-answer">{{ format(answer) }}</strong>
        </div>
      </div>
      <p class="tie-reveal-verdict">{{ winner === null ? 'Wieder gleich nah dran. Es gibt eine neue Schätzfrage.' : `${names[winner]} war näher dran und gewinnt.` }}</p>
      <button type="button" class="button-primary mt-5" @click="confirm">
        {{ winner === null ? 'Nächste Schätzfrage' : 'Zum Ergebnis' }} <Icon name="lucide:arrow-right" size="17" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.tie-reveal-label {
  color: var(--color-muted, #a5b5a3);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.tie-reveal-answer {
  display: block;
  margin-top: 0.6rem;
  color: #caff4a;
  font-family: var(--font-display);
  font-size: clamp(3.4rem, min(8vw, 13vh), 7rem);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.tie-reveal-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-areas: "one solution two";
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
}

.tie-reveal-guess--one { grid-area: one; }
.tie-reveal-guess--two { grid-area: two; }
.tie-reveal-solution { grid-area: solution; }

.tie-reveal-guess {
  display: grid;
  gap: 0.35rem;
  border: 1px solid rgb(251 248 237 / 18%);
  border-radius: 0.9rem;
  padding: 1.1rem 1.2rem;
  text-align: left;
}

.tie-reveal-guess span,
.tie-reveal-guess small {
  color: var(--color-muted, #a5b5a3);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.tie-reveal-guess strong {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  line-height: 1;
}

.tie-reveal-guess--winner {
  border-color: #caff4a;
  background: rgb(202 255 74 / 10%);
}

.tie-reveal-guess--winner span,
.tie-reveal-guess--winner strong {
  color: #caff4a;
}

.tie-reveal-verdict {
  margin-top: 1.4rem;
  font-size: 1.15rem;
}

@media (max-width: 560px) {
  .tie-reveal-row {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "solution solution" "one two";
  }
}
</style>
