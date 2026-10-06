<script setup lang="ts">
import { QUIZ_CATEGORIES } from '~/data/quiz-catalog'
import { PaperGrainGradient } from '~/ui/paper-grain-gradient'
import type { PaperGrainGradientProps } from '~/ui/paper-grain-gradient/types'

type ScreenKey = 'setup' | 'categories' | 'question'

type Variant = {
  id: string
  label: string
  note: string
  code: string
}

type CategoryOption = {
  label: string
  descriptor: string
}

type SetupField = 'rounds' | 'seconds' | 'difficulty'
type ConfigVariant = 'segments' | 'context-row' | 'matrix'

type Palette = {
  id: string
  label: string
  note: string
  ink: string
  jungle: string
  leaf: string
  accent: string
  cream: string
  muted: string
  line: string
  contrast: string
  swatches: string[]
}

const screenOptions: { id: ScreenKey; label: string; detail: string }[] = [
  { id: 'setup', label: 'Start', detail: 'Spiel eröffnen' },
  { id: 'categories', label: 'Kategorien', detail: 'Territorium wählen' },
  { id: 'question', label: 'Frage', detail: 'Antwort geben' },
]

const variants: Record<ScreenKey, Variant[]> = {
  setup: [
    { id: 'split-field', label: 'Split field', note: 'Light left / dark right', code: 'I' },
    { id: 'open-sheet', label: 'Open sheet', note: 'No card / ruled rows on green', code: 'J' },
    { id: 'versus', label: 'Versus', note: 'Teams face off / settings as a sentence', code: 'K' },
    { id: 'versus-centered', label: 'Versus centered', note: 'Centered names / big VS as the axis', code: 'K1' },
    { id: 'versus-grain', label: 'Versus grain', note: 'K1 + Paper grain gradient on the left field', code: 'K2' },
    { id: 'stepper-card', label: 'Stepper card', note: 'One quiet card / three steppers', code: 'L' },
    { id: 'two-blocks', label: 'Two blocks', note: 'Teams, then rules / segmented rows', code: 'M' },
    { id: 'split-duty', label: 'Split duty', note: 'Rules live left / teams own the right', code: 'N' },
  ],
  categories: [
    { id: 'soft-field', label: 'Territory grid', note: 'Sechs Kategorien / drei mal zwei', code: 'A' },
  ],
  question: [
    { id: 'header-duel', label: 'Header duel', note: 'Score in the logo row / timer right', code: 'Q1' },
    { id: 'score-rail', label: 'Score rail', note: 'All status in one bottom rail', code: 'Q2' },
    { id: 'timer-band', label: 'Timer band', note: 'Full-width time band / question gets the width', code: 'Q3' },
    { id: 'side-panel', label: 'Side panel', note: 'Question left / status column right', code: 'Q4' },
    { id: 'progress-ticks', label: 'Progress ticks', note: 'Ten ticks show where you stand', code: 'Q5' },
    { id: 'clock-band', label: 'Clock band', note: 'Q5 + Q3 / big clock at the end of the band', code: 'Q6' },
    { id: 'clock-panel', label: 'Clock panel', note: 'Q5 + Q4 / status column with a big clock', code: 'Q7' },
    { id: 'hero-clock', label: 'Hero clock', note: 'Q5 / the clock as the second headline', code: 'Q8' },
    { id: 'draining-panel', label: 'Draining panel', note: 'Q7 / the panel itself empties with time', code: 'Q9' },
  ],
}

const categoryOptions: readonly CategoryOption[] = QUIZ_CATEGORIES

const paletteOptions: Palette[] = [
  {
    id: 'canopy-signal',
    label: 'Canopy signal',
    note: 'Deep pine / tea green / warm token',
    ink: '#092219',
    jungle: '#123d2a',
    leaf: '#c7e9a7',
    accent: '#e4b84c',
    cream: '#f5f3e6',
    muted: '#9fc3a8',
    line: 'rgb(245 243 230 / 24%)',
    contrast: '12.5 : 1 on light',
    swatches: ['#092219', '#123d2a', '#c7e9a7', '#e4b84c'],
  },
  {
    id: 'acid-orchard',
    label: 'Acid orchard',
    note: 'Dark leaf / sharp lime / paper white',
    ink: '#081811',
    jungle: '#0b4429',
    leaf: '#e7f7b6',
    accent: '#caff4a',
    cream: '#fbf8ed',
    muted: '#8fc7a2',
    line: 'rgb(251 248 237 / 24%)',
    contrast: '16.0 : 1 on light',
    swatches: ['#081811', '#0b4429', '#e7f7b6', '#caff4a'],
  },
  {
    id: 'digital-emerald',
    label: 'Digital emerald',
    note: 'Black green / vivid emerald / mint pulse',
    ink: '#071a19',
    jungle: '#008c63',
    leaf: '#c9f3d0',
    accent: '#62f5b3',
    cream: '#f4f5e9',
    muted: '#8cc9ba',
    line: 'rgb(244 245 233 / 28%)',
    contrast: '14.7 : 1 on light',
    swatches: ['#071a19', '#008c63', '#c9f3d0', '#62f5b3'],
  },
  {
    id: 'lime-cypress',
    label: 'Lime cypress',
    note: 'Olive green / highlighter lime / soft ivory',
    ink: '#14210c',
    jungle: '#3d5f1f',
    leaf: '#eff7c8',
    accent: '#dfff3e',
    cream: '#fff9e4',
    muted: '#a7ba8d',
    line: 'rgb(255 249 228 / 28%)',
    contrast: '15.0 : 1 on light',
    swatches: ['#14210c', '#3d5f1f', '#eff7c8', '#dfff3e'],
  },
  {
    id: 'deep-aqua',
    label: 'Deep aqua',
    note: 'Cypress ink / blue-green field / clean mint',
    ink: '#041d1b',
    jungle: '#126b5b',
    leaf: '#d7f1df',
    accent: '#8bf2bd',
    cream: '#f5f4e9',
    muted: '#9bcfc0',
    line: 'rgb(245 244 233 / 27%)',
    contrast: '14.7 : 1 on light',
    swatches: ['#041d1b', '#126b5b', '#d7f1df', '#8bf2bd'],
  },
]

const questionSamples = {
  short: { category: 'WTF-Wissen', text: 'Wie viele Herzen hat ein Oktopus?', options: ['Eins', 'Zwei', 'Drei', 'Vier'], correct: 2 },
  long: { category: 'Internet', text: 'Welches Meme-Format zeigt meistens eine Reihe von Bildern mit einer immer weiter eskalierenden Reaktion?', options: ['Reaction-Meme', 'Listicle', 'Threadjack', 'Screenshot-Story'], correct: 0 },
} as const
const questionLength = ref<keyof typeof questionSamples>('short')
const sampleQuestion = computed(() => questionSamples[questionLength.value])
// Same thresholds as QuestionStage: long questions step down so the stage never scrolls.
const sampleQuestionSize = computed(() => {
  const length = sampleQuestion.value.text.length
  return length <= 40 ? 's' : length <= 65 ? 'm' : length <= 90 ? 'l' : 'xl'
})
// Live countdown so timer studies can be judged in motion. Pause in the study stops it; it loops at zero.
const labTimerLimit = 45
const labSeconds = ref(39)
const labTimerProgress = computed(() => labSeconds.value / labTimerLimit)
let labTimerHandle: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  labTimerHandle = setInterval(() => {
    if (activeScreen.value !== 'question' || timerPaused.value)
      return
    labSeconds.value = labSeconds.value <= 0 ? labTimerLimit : labSeconds.value - 1
  }, 1000)
})

onBeforeUnmount(() => clearInterval(labTimerHandle))

const sampleProgress = { question: 4, questions: 10, round: 2, rounds: 5, scores: [2, 1], active: 1 }

const activeScreen = ref<ScreenKey>('setup')
const selectedVariants = reactive<Record<ScreenKey, number>>({ setup: 0, categories: 0, question: 0 })
const selectedCategory = ref('')
const selectedAnswer = ref<number | null>(null)
const timerPaused = ref(false)
const setupNames = reactive({ one: 'TEAM ONE', two: 'TEAM TWO' })
const setupOptions = reactive({ rounds: 7, seconds: 45, difficulty: 'Schwer' })
const activeSetupField = ref<SetupField>('rounds')
const selectedConfigVariant = ref<ConfigVariant>('segments')
const selectedPalette = ref(1)

const configVariants: { id: ConfigVariant; code: string; label: string; note: string }[] = [
  { id: 'segments', code: '01', label: 'Direkte Segmente', note: 'Nur Werte, keine Wiederholung' },
  { id: 'context-row', code: '02', label: 'Kontextzeile', note: 'Ein kurzer Feldname führt die Auswahl' },
  { id: 'matrix', code: '03', label: 'Alles sichtbar', note: 'Alle Optionen direkt im Raster' },
]

const activeVariant = computed<Variant>(() => variants[activeScreen.value][selectedVariants[activeScreen.value]]!)
const activePalette = computed(() => paletteOptions[selectedPalette.value]!)
const totalStudies = computed(() => Object.values(variants).reduce((total, screenVariants) => total + screenVariants.length, 0))
const splitFieldPaletteStyle = computed<Record<string, string>>(() => ({
  '--split-ink': activePalette.value.ink,
  '--split-jungle': activePalette.value.jungle,
  '--split-leaf': activePalette.value.leaf,
  '--split-accent': activePalette.value.accent,
  '--split-cream': activePalette.value.cream,
  '--split-muted': activePalette.value.muted,
  '--split-line': activePalette.value.line,
}))

function chooseScreen(screen: ScreenKey) {
  activeScreen.value = screen
  selectedCategory.value = ''
  selectedAnswer.value = null
}

function chooseVariant(index: number) {
  selectedVariants[activeScreen.value] = index
  selectedCategory.value = ''
  selectedAnswer.value = null
}

function chooseCategory(category: string) {
  selectedCategory.value = category
}

function chooseAnswer(index: number) {
  selectedAnswer.value = index
}

const setupFieldOptions: Record<SetupField, Array<number | string>> = {
  rounds: [3, 5, 7],
  seconds: [30, 45, 60],
  difficulty: ['Leicht', 'Gemischt', 'Schwer'],
}

const setupFieldLabel: Record<SetupField, string> = {
  rounds: 'Runden',
  seconds: 'Sekunden',
  difficulty: 'Modus',
}

function selectSetupOption(value: number | string) {
  if (activeSetupField.value === 'rounds' && typeof value === 'number')
    setupOptions.rounds = value
  else if (activeSetupField.value === 'seconds' && typeof value === 'number')
    setupOptions.seconds = value
  else if (activeSetupField.value === 'difficulty' && typeof value === 'string')
    setupOptions.difficulty = value
}

function selectSetupOptionFor(field: SetupField, value: number | string) {
  if (field === 'rounds' && typeof value === 'number')
    setupOptions.rounds = value
  else if (field === 'seconds' && typeof value === 'number')
    setupOptions.seconds = value
  else if (field === 'difficulty' && typeof value === 'string')
    setupOptions.difficulty = value
  activeSetupField.value = field
}

// Paper Shaders grain gradient. "paper" entries are the library presets 1:1
// (@paper-design/shaders-react grainGradientPresets); "jungle" entries are mixes in the setup palette.
type GrainPreset = { id: string, label: string, note: string, group: 'paper' | 'jungle', tone: 'light' | 'dark', params: PaperGrainGradientProps }

const objectSizing = { fit: 'contain', scale: 1 } as const
const patternSizing = { fit: 'none', scale: 1 } as const

const grainPresets: GrainPreset[] = [
  { id: 'paper-default', label: 'Default', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...objectSizing, speed: 1, colorBack: '#000000', colors: ['#7300ff', '#eba8ff', '#00bfff', '#2a00ff'], softness: 0.5, intensity: 0.5, noise: 0.25, shape: 'corners' } },
  { id: 'paper-wave', label: 'Wave', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...patternSizing, speed: 1, colorBack: '#000a0f', colors: ['#c4730b', '#bdad5f', '#d8ccc7'], softness: 0.7, intensity: 0.15, noise: 0.5, shape: 'wave' } },
  { id: 'paper-dots', label: 'Dots', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...patternSizing, scale: 0.6, speed: 1, colorBack: '#0a0000', colors: ['#6f0000', '#0080ff', '#f2ebc9', '#33cc33'], softness: 1, intensity: 1, noise: 0.7, shape: 'dots' } },
  { id: 'paper-truchet', label: 'Truchet', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...patternSizing, speed: 1, colorBack: '#0a0000', colors: ['#6f2200', '#eabb7c', '#39b523'], softness: 0, intensity: 0.2, noise: 1, shape: 'truchet' } },
  { id: 'paper-ripple', label: 'Ripple', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...objectSizing, scale: 0.5, speed: 1, colorBack: '#140a00', colors: ['#6f2d00', '#88ddae', '#2c0b1d'], softness: 0.5, intensity: 0.5, noise: 0.5, shape: 'ripple' } },
  { id: 'paper-blob', label: 'Blob', note: 'Paper preset', group: 'paper', tone: 'dark', params: { ...objectSizing, scale: 1.3, speed: 1, colorBack: '#0f0e18', colors: ['#3e6172', '#a49b74', '#568c50'], softness: 0, intensity: 0.15, noise: 0.5, shape: 'blob' } },
  { id: 'jungle-tea', label: 'Tea field', note: 'Corners / tea green into lime, soft grain', group: 'jungle', tone: 'light', params: { ...objectSizing, fit: 'cover', speed: 0.45, colorBack: '#e7f7b6', colors: ['#caff4a', '#d9f59a', '#b9e27c', '#f4fbdc'], softness: 0.85, intensity: 0.35, noise: 0.35, shape: 'corners' } },
  { id: 'jungle-wave', label: 'Lime wave', note: 'Wave / slow lime bands', group: 'jungle', tone: 'light', params: { ...patternSizing, speed: 0.5, colorBack: '#e7f7b6', colors: ['#caff4a', '#addb6c', '#f3f9d8'], softness: 0.75, intensity: 0.18, noise: 0.45, shape: 'wave' } },
  { id: 'jungle-truchet', label: 'Game board', note: 'Truchet / printed tiles, heavy grain', group: 'jungle', tone: 'light', params: { ...patternSizing, scale: 1.4, speed: 0.35, colorBack: '#e7f7b6', colors: ['#d4f18c', '#bfe27f', '#eef8c8'], softness: 0, intensity: 0.2, noise: 0.9, shape: 'truchet' } },
  { id: 'jungle-gold', label: 'Gold corner', note: 'Corners / warm token gold in the lime', group: 'jungle', tone: 'light', params: { ...objectSizing, fit: 'cover', speed: 0.4, colorBack: '#e7f7b6', colors: ['#f1dd8c', '#caff4a', '#e7f7b6', '#d7ef9c'], softness: 0.9, intensity: 0.3, noise: 0.4, shape: 'corners' } },
  { id: 'jungle-ripple', label: 'Canopy ripple', note: 'Ripple / forest green rings from the corner', group: 'jungle', tone: 'light', params: { ...objectSizing, fit: 'cover', scale: 0.7, originX: 0.15, originY: 0.9, speed: 0.4, colorBack: '#e7f7b6', colors: ['#cdf27a', '#9fcf6a', '#e7f7b6'], softness: 0.6, intensity: 0.4, noise: 0.4, shape: 'ripple' } },
  { id: 'jungle-night', label: 'Night jungle', note: 'Blob / dark field, text flips to cream', group: 'jungle', tone: 'dark', params: { ...objectSizing, scale: 1.3, speed: 0.5, colorBack: '#081811', colors: ['#0b4429', '#2f7a3d', '#caff4a'], softness: 0.4, intensity: 0.2, noise: 0.5, shape: 'blob' } },
]
const selectedGrain = ref('jungle-tea')
const activeGrain = computed(() => grainPresets.find(preset => preset.id === selectedGrain.value) ?? grainPresets[0]!)
const prefersReducedMotion = ref(false)
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
// Reduced motion renders one still frame instead of animating.
const grainParams = computed<PaperGrainGradientProps>(() => ({ ...activeGrain.value.params, speed: prefersReducedMotion.value ? 0 : activeGrain.value.params.speed }))

const setupFields: SetupField[] = ['rounds', 'seconds', 'difficulty']
const refinedSetupVariants = ['open-sheet', 'versus', 'versus-centered', 'versus-grain', 'stepper-card', 'two-blocks', 'split-duty']
const isRefinedSetup = computed(() => activeScreen.value === 'setup' && refinedSetupVariants.includes(activeVariant.value.id))

function formatSetupOption(field: SetupField, value: number | string) {
  return field === 'seconds' ? `${value} Sek.` : String(value)
}

function stepSetupOption(field: SetupField, direction: 1 | -1) {
  const options = setupFieldOptions[field]
  const index = options.indexOf(setupOptions[field])
  const next = options[(index + direction + options.length) % options.length]!
  selectSetupOptionFor(field, next)
}

function isSelectedSetupOption(value: number | string) {
  return setupOptions[activeSetupField.value] === value
}
</script>

<template>
  <div class="lab-page">
    <div class="app-noise" aria-hidden="true" />

    <header class="lab-header">
      <NuxtLink to="/" class="lab-brand" aria-label="Jungle Quiz Startseite">
        <span>JUNGLE</span><i>/</i><span>QUIZ</span>
      </NuxtLink>
      <div class="lab-header-meta">
        <span class="lab-live-dot" aria-hidden="true" />
        <span>Design lab</span>
        <span class="lab-header-rule" aria-hidden="true" />
        <NuxtLink to="/" class="lab-back">Zurück zum Spiel <Icon name="lucide:arrow-up-right" size="15" aria-hidden="true" /></NuxtLink>
      </div>
    </header>

    <main class="lab-main">
      <section class="lab-intro">
        <div class="lab-intro-copy">
          <p class="lab-kicker">Visual direction / {{ totalStudies }} studies / live prototype</p>
          <h1>Make the quiz<br><em>feel like a room.</em></h1>
          <p class="lab-lede">Drei Screens. {{ totalStudies }} Designstudien. Die Startseite bleibt bei I: klar, geteilt, bereit zum Spielen.</p>
        </div>
        <div class="lab-intro-stamp" :aria-label="`${totalStudies} Varianten im Test`">
          <span class="stamp-number">{{ totalStudies }}</span>
          <span class="stamp-copy">Varianten<br>im Test</span>
        </div>
      </section>

      <nav class="screen-switcher" aria-label="Quiz-Screen auswählen">
        <button
          v-for="(screen, index) in screenOptions"
          :key="screen.id"
          class="screen-tab"
          :class="{ 'screen-tab--active': activeScreen === screen.id }"
          :aria-pressed="activeScreen === screen.id"
          @click="chooseScreen(screen.id)"
        >
          <span class="screen-tab-index">0{{ index + 1 }}</span>
          <span>
            <strong>{{ screen.label }}</strong>
            <small>{{ screen.detail }}</small>
          </span>
          <Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" />
        </button>
      </nav>

      <section class="lab-workbench" :aria-label="`${activeScreen} Designstudien`">
        <aside class="variant-rail">
          <div class="variant-rail-head">
            <span>Pick a direction</span>
            <span class="variant-count">{{ String(variants[activeScreen].length).padStart(2, '0') }}</span>
          </div>
          <div class="variant-list">
            <button
              v-for="(variant, index) in variants[activeScreen]"
              :key="variant.id"
              class="variant-picker"
              :class="{ 'variant-picker--active': selectedVariants[activeScreen] === index }"
              :aria-pressed="selectedVariants[activeScreen] === index"
              @click="chooseVariant(index)"
            >
              <span class="variant-code">{{ variant.code }}</span>
              <span class="variant-picker-copy">
                <strong>{{ variant.label }}</strong>
                <small>{{ variant.note }}</small>
              </span>
              <span class="variant-arrow">↗</span>
            </button>
          </div>
          <p class="variant-hint">Die Inhalte bleiben gleich. Nur die Dramaturgie ändert ihren Körper.</p>
        </aside>

        <div class="preview-column">
          <div class="preview-bar">
            <div>
              <span class="preview-label">Live study</span>
              <span class="preview-slash">/</span>
              <strong>{{ activeVariant.label }}</strong>
            </div>
            <div class="preview-context">
              <span>{{ screenOptions.find(screen => screen.id === activeScreen)?.label }}</span>
              <span class="preview-dot" aria-hidden="true" />
              <span>1440 × 900</span>
            </div>
          </div>

          <div class="preview-frame" :class="[`preview-frame--${activeScreen}`, `preview-frame--${activeVariant.id}`]">
            <div class="preview-corner preview-corner--tl" aria-hidden="true" />
            <div class="preview-corner preview-corner--br" aria-hidden="true" />

            <div v-if="activeScreen === 'setup' && activeVariant.id === 'split-field'" class="study study-split-field" :style="splitFieldPaletteStyle">
              <div class="split-field-copy"><div class="split-field-wordmark">JUNGLE <span>/</span> QUIZ</div><h2>Wer<br><em>spielt?</em></h2><p>Gib den Teams einen Namen. Den Rest regeln wir.</p><div class="split-field-meta"><span>{{ setupOptions.rounds }} Runden</span><span>{{ setupOptions.seconds }} Sek.</span><span>{{ setupOptions.difficulty }}</span></div></div>
              <div class="split-field-form">
                <div class="split-field-head"><span>Teamnamen</span><span>Bereit?</span></div>
                <label><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                <label><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                <div class="split-field-config" :class="'split-field-config--' + selectedConfigVariant">
                  <div class="split-field-badges" role="tablist" aria-label="Spieleinstellungen">
                    <button v-for="field in (['rounds', 'seconds', 'difficulty'] as SetupField[])" :key="field" type="button" class="split-field-badge" :class="{ 'split-field-badge--active': activeSetupField === field }" role="tab" :aria-selected="activeSetupField === field" @click="activeSetupField = field">
                      <strong>{{ setupOptions[field] }}</strong><span>{{ setupFieldLabel[field] }}</span>
                    </button>
                  </div>
                  <div v-if="selectedConfigVariant === 'segments'" class="split-field-picker split-field-picker--segments" :aria-label="setupFieldLabel[activeSetupField] + ' auswählen'">
                    <div>
                      <button v-for="option in setupFieldOptions[activeSetupField]" :key="option" type="button" :class="{ 'split-field-picker-option--selected': isSelectedSetupOption(option) }" :aria-pressed="isSelectedSetupOption(option)" @click="selectSetupOption(option)">{{ activeSetupField === 'seconds' ? option + ' Sek.' : option }}</button>
                    </div>
                  </div>
                  <div v-else-if="selectedConfigVariant === 'context-row'" class="split-field-picker split-field-picker--context" :aria-label="setupFieldLabel[activeSetupField] + ' auswählen'">
                    <span>{{ setupFieldLabel[activeSetupField] }}</span>
                    <div>
                      <button v-for="option in setupFieldOptions[activeSetupField]" :key="option" type="button" :class="{ 'split-field-picker-option--selected': isSelectedSetupOption(option) }" :aria-pressed="isSelectedSetupOption(option)" @click="selectSetupOption(option)">{{ activeSetupField === 'seconds' ? option + ' Sek.' : option }}</button>
                    </div>
                  </div>
                  <div v-else class="split-field-matrix" aria-label="Alle Spieleinstellungen">
                    <div v-for="field in (['rounds', 'seconds', 'difficulty'] as SetupField[])" :key="field" class="split-field-matrix-field">
                      <span>{{ setupFieldLabel[field] }}</span>
                      <div>
                        <button v-for="option in setupFieldOptions[field]" :key="option" type="button" :class="{ 'split-field-picker-option--selected': setupOptions[field] === option }" :aria-pressed="setupOptions[field] === option" @click="selectSetupOptionFor(field, option)">{{ field === 'seconds' ? option + ' Sek.' : option }}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="study-action study-action--cream" @click="chooseScreen('categories')">Spiel starten <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button>
              </div>
            </div>

            <!-- Refined setup studies: same content, calmer form, bigger copy -->
            <div v-else-if="isRefinedSetup" class="study setup-v" :class="[`setup-v--${activeVariant.id}`, { 'setup-v--versus-centered': activeVariant.id === 'versus-grain', 'setup-v--grain-dark': activeVariant.id === 'versus-grain' && activeGrain.tone === 'dark' }]" :style="splitFieldPaletteStyle">
              <div class="setup-v-grid">
                <div class="setup-v-copy">
                  <PaperGrainGradient v-if="activeVariant.id === 'versus-grain'" :key="activeGrain.id" v-bind="grainParams" class="setup-grain" />
                  <div class="split-field-wordmark">JUNGLE <span>/</span> QUIZ</div>
                  <div class="setup-v-copy-main">
                    <h2>Wer<br><em>spielt?</em></h2>
                    <p>Gib den Teams einen Namen. Den Rest regeln wir.</p>
                  </div>
                  <div v-if="activeVariant.id === 'split-duty'" class="setup-n-rules" aria-label="Spieleinstellungen">
                    <div v-for="field in setupFields" :key="field" class="setup-n-row">
                      <span>{{ setupFieldLabel[field] }}</span>
                      <div role="group" :aria-label="`${setupFieldLabel[field]} auswählen`">
                        <button v-for="option in setupFieldOptions[field]" :key="option" type="button" :class="{ 'is-on': setupOptions[field] === option }" :aria-pressed="setupOptions[field] === option" @click="selectSetupOptionFor(field, option)">{{ formatSetupOption(field, option) }}</button>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="activeVariant.id === 'open-sheet' || activeVariant.id === 'two-blocks'" class="setup-v-meta">
                    <span>{{ setupOptions.rounds }} Runden</span><span>{{ setupOptions.seconds }} Sek.</span><span>{{ setupOptions.difficulty }}</span>
                  </div>
                </div>

                <!-- J / Open sheet -->
                <form v-if="activeVariant.id === 'open-sheet'" class="setup-v-side setup-j" @submit.prevent="chooseScreen('categories')">
                  <label class="setup-j-team"><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                  <label class="setup-j-team"><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                  <div class="setup-j-rules">
                    <div v-for="field in setupFields" :key="field" class="setup-j-row">
                      <span>{{ setupFieldLabel[field] }}</span>
                      <div role="group" :aria-label="`${setupFieldLabel[field]} auswählen`">
                        <button v-for="option in setupFieldOptions[field]" :key="option" type="button" :class="{ 'is-on': setupOptions[field] === option }" :aria-pressed="setupOptions[field] === option" @click="selectSetupOptionFor(field, option)">{{ formatSetupOption(field, option) }}</button>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="setup-v-action">Spiel starten <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></button>
                </form>

                <!-- K / Versus, K1 / Versus centered -->
                <form v-else-if="activeVariant.id === 'versus' || activeVariant.id === 'versus-centered' || activeVariant.id === 'versus-grain'" class="setup-v-side setup-k" @submit.prevent="chooseScreen('categories')">
                  <label class="setup-k-team"><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                  <div class="setup-k-vs" aria-hidden="true"><i /><b>vs</b><i /></div>
                  <label class="setup-k-team"><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                  <p class="setup-k-sentence">
                    <button type="button" :aria-label="`Runden: ${setupOptions.rounds}, ändern`" @click="stepSetupOption('rounds', 1)">{{ setupOptions.rounds }} Runden</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" :aria-label="`Zeit: ${setupOptions.seconds} Sekunden, ändern`" @click="stepSetupOption('seconds', 1)">{{ setupOptions.seconds }} Sek.</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" :aria-label="`Modus: ${setupOptions.difficulty}, ändern`" @click="stepSetupOption('difficulty', 1)">{{ setupOptions.difficulty }}</button>
                  </p>
                  <button type="submit" class="setup-v-action">Spiel starten <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></button>
                </form>

                <!-- L / Stepper card -->
                <form v-else-if="activeVariant.id === 'stepper-card'" class="setup-v-side setup-l" @submit.prevent="chooseScreen('categories')">
                  <div class="setup-l-card">
                    <div class="setup-l-teams">
                      <label><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                      <label><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                    </div>
                    <div class="setup-l-steppers">
                      <div v-for="field in setupFields" :key="field" class="setup-l-stepper">
                        <span>{{ setupFieldLabel[field] }}</span>
                        <strong>{{ setupOptions[field] }}</strong>
                        <div>
                          <button type="button" :aria-label="`${setupFieldLabel[field]} verringern`" @click="stepSetupOption(field, -1)"><Icon name="lucide:minus" size="15" aria-hidden="true" /></button>
                          <button type="button" :aria-label="`${setupFieldLabel[field]} erhöhen`" @click="stepSetupOption(field, 1)"><Icon name="lucide:plus" size="15" aria-hidden="true" /></button>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="setup-v-action">Spiel starten <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></button>
                  </div>
                </form>

                <!-- M / Two blocks -->
                <form v-else-if="activeVariant.id === 'two-blocks'" class="setup-v-side setup-m" @submit.prevent="chooseScreen('categories')">
                  <section class="setup-m-block">
                    <h3>Teams</h3>
                    <label><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                    <label><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                  </section>
                  <section class="setup-m-block">
                    <h3>Spielregeln</h3>
                    <div v-for="field in setupFields" :key="field" class="setup-m-row">
                      <span>{{ setupFieldLabel[field] }}</span>
                      <div role="group" :aria-label="`${setupFieldLabel[field]} auswählen`">
                        <button v-for="option in setupFieldOptions[field]" :key="option" type="button" :class="{ 'is-on': setupOptions[field] === option }" :aria-pressed="setupOptions[field] === option" @click="selectSetupOptionFor(field, option)">{{ formatSetupOption(field, option) }}</button>
                      </div>
                    </div>
                  </section>
                  <button type="submit" class="setup-v-action">Spiel starten <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></button>
                </form>

                <!-- N / Split duty -->
                <form v-else class="setup-v-side setup-n" @submit.prevent="chooseScreen('categories')">
                  <label class="setup-n-team"><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label>
                  <label class="setup-n-team"><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label>
                  <button type="submit" class="setup-v-action">Spiel starten <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></button>
                </form>
              </div>
            </div>

            <!-- Category studies -->
            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'soft-field'" class="study category-study category-study--soft-field">
              <div class="category-study-top category-study-top--soft-field">
                <div class="category-status category-status--round"><span>Runde</span><strong>1</strong><small>Fünf Runden</small></div>
                <strong>TEAM ONE IST DRAN</strong>
                <div class="category-status category-status--question"><span>Frage</span><strong>Erste</strong><small>Zehn Fragen</small></div>
              </div>
              <div class="category-study-intro"><h2>Picke eine <em>Kategorie.</em></h2><p>Eine Frage. Ein Fokus. Ihr entscheidet.</p></div>
              <div class="category-surface-grid" role="group" aria-label="Kategorien auswählen">
                <button v-for="option in categoryOptions" :key="option.label" data-uisfx-hover="hover" data-uisfx-press="press" class="category-surface category-surface--soft" :class="{ 'category-surface--selected': selectedCategory === option.label }" @click="chooseCategory(option.label)">
                  <span class="category-surface-copy"><strong>{{ option.label }}</strong><small>{{ option.descriptor }}</small></span><Icon name="lucide:arrow-up-right" size="19" aria-hidden="true" />
                </button>
              </div>
              <p class="category-study-foot">{{ selectedCategory ? `${selectedCategory} gewählt` : 'Bereit für den ersten Pick.' }} <span>↗</span></p>
            </div>

            <!-- Question studies: one DOM, five layouts. Each fits its frame without scrolling. -->
            <div v-else-if="activeScreen === 'question'" class="study qv" :class="[`qv--${activeVariant.id}`, { 'qv--warning': labSeconds <= 10 }]" :style="{ '--q-progress': labTimerProgress }">
              <div class="qv-grid">
                <div class="qv-brand">JUNGLE <i>/</i> QUIZ</div>
                <div class="qv-nav" aria-hidden="true"><span><Icon name="lucide:arrow-left" size="14" /></span><span><Icon name="lucide:arrow-right" size="14" /></span></div>
                <div class="qv-duel" aria-label="Punktestand">
                  <div v-for="index in [0, 1]" :key="index" class="qv-team" :class="[`qv-team--${index === 0 ? 'one' : 'two'}`, { 'qv-team--active': sampleProgress.active === index }]">
                    <span>{{ index === 0 ? 'TEAM ONE' : 'TEAM TWO' }}</span>
                    <strong>{{ sampleProgress.scores[index] }}</strong>
                    <small v-if="sampleProgress.active === index">Ist dran</small>
                  </div>
                  <i aria-hidden="true">:</i>
                </div>
                <div class="qv-ticks" :aria-label="`Frage ${sampleProgress.question} von ${sampleProgress.questions}`">
                  <div><i v-for="tick in sampleProgress.questions" :key="tick" :class="{ 'is-done': tick < sampleProgress.question, 'is-current': tick === sampleProgress.question }" /></div>
                  <span>Frage {{ sampleProgress.question }} / {{ sampleProgress.questions }} · Runde {{ sampleProgress.round }} / {{ sampleProgress.rounds }}</span>
                </div>
                <div class="qv-copy">
                  <div class="qv-meta">
                    <span class="qv-category">{{ sampleQuestion.category }}</span>
                    <span class="qv-meta-progress">Frage {{ sampleProgress.question }} / {{ sampleProgress.questions }}</span>
                    <span class="qv-meta-progress">Runde {{ sampleProgress.round }} / {{ sampleProgress.rounds }}</span>
                  </div>
                  <h2 :class="`qv-question--${sampleQuestionSize}`">{{ sampleQuestion.text }}</h2>
                </div>
                <aside class="qv-timer" aria-label="Antwortzeit">
                  <span class="qv-timer-label">Noch Zeit</span>
                  <strong>{{ labSeconds }}<small>Sek.</small></strong>
                  <i aria-hidden="true"><b /></i>
                  <div class="qv-timer-actions"><button type="button" @click="timerPaused = !timerPaused">{{ timerPaused ? 'Weiter' : 'Pause' }}</button><button type="button" @click="labSeconds = labTimerLimit">Reset</button></div>
                </aside>
                <div class="qv-answers" aria-label="Antwortmöglichkeiten">
                  <button v-for="(answer, index) in sampleQuestion.options" :key="answer" type="button" class="qv-option" :class="{ 'qv-option--correct': selectedAnswer !== null && index === sampleQuestion.correct, 'qv-option--wrong': selectedAnswer === index && index !== sampleQuestion.correct }" @click="chooseAnswer(index)">
                    <span class="qv-option-letter">{{ ['A', 'B', 'C', 'D'][index] }}</span><span class="qv-option-copy">{{ answer }}</span>
                  </button>
                </div>
                <div class="qv-foot">
                  <button type="button" class="qv-action" @click="selectedAnswer = sampleQuestion.correct">Antwort zeigen <span>A</span></button>
                  <p>Wähle A, B, C oder D</p>
                </div>
              </div>
            </div>
          </div>

          <div class="preview-footer">
            <span><b class="preview-dot preview-dot--gold" /> Click the specimen to feel the flow</span>
            <span class="preview-footer-key">{{ activeVariant.code }} / {{ activeVariant.label.toUpperCase() }}</span>
          </div>

          <section v-if="activeScreen === 'question'" class="config-variant-dock" aria-label="Fragelänge testen">
            <div class="config-variant-dock-head"><span>Question length</span><span>Skalierung testen</span></div>
            <div class="config-variant-grid config-variant-grid--two">
              <button v-for="length in (['short', 'long'] as const)" :key="length" type="button" class="config-variant-option" :class="{ 'config-variant-option--active': questionLength === length }" :aria-pressed="questionLength === length" @click="questionLength = length; selectedAnswer = null">
                <span class="config-variant-code">{{ length === 'short' ? 'S' : 'XL' }}</span>
                <span class="config-variant-copy"><strong>{{ length === 'short' ? 'Kurze Frage' : 'Lange Frage' }}</strong><small>{{ questionSamples[length].text.length }} Zeichen</small></span>
                <span class="config-variant-arrow">↗</span>
              </button>
            </div>
          </section>

          <section v-if="activeScreen === 'setup' && activeVariant.id === 'versus-grain'" class="config-variant-dock" aria-label="Grain gradient presets">
            <div class="config-variant-dock-head"><span>Grain gradient</span><span>Paper presets 1:1 · Jungle mixes</span></div>
            <div v-for="group in (['jungle', 'paper'] as const)" :key="group" class="grain-group">
              <p class="grain-group-title">{{ group === 'jungle' ? 'Jungle mixes' : 'Paper presets (original)' }}</p>
              <div class="config-variant-grid">
                <button v-for="preset in grainPresets.filter(item => item.group === group)" :key="preset.id" type="button" class="config-variant-option grain-option" :class="{ 'config-variant-option--active': selectedGrain === preset.id }" :aria-pressed="selectedGrain === preset.id" @click="selectedGrain = preset.id">
                  <span class="grain-swatch" aria-hidden="true"><i :style="{ background: preset.params.colorBack }" /><i v-for="color in preset.params.colors" :key="color" :style="{ background: color }" /></span>
                  <span class="config-variant-copy"><strong>{{ preset.label }}</strong><small>{{ preset.note }}</small></span>
                </button>
              </div>
            </div>
          </section>

          <section v-if="activeScreen === 'setup' && activeVariant.id === 'split-field'" class="config-variant-dock" aria-label="Varianten für die Spieleinstellungen">
            <div class="config-variant-dock-head"><span>Config studies</span><span>Auswahlmodell testen</span></div>
            <div class="config-variant-grid">
              <button v-for="variant in configVariants" :key="variant.id" type="button" class="config-variant-option" :class="{ 'config-variant-option--active': selectedConfigVariant === variant.id }" :aria-pressed="selectedConfigVariant === variant.id" @click="selectedConfigVariant = variant.id">
                <span class="config-variant-code">{{ variant.code }}</span>
                <span class="config-variant-copy"><strong>{{ variant.label }}</strong><small>{{ variant.note }}</small></span>
                <span class="config-variant-arrow">↗</span>
              </button>
            </div>
          </section>

          <section v-if="activeScreen === 'setup'" class="palette-dock" aria-label="Farbpaletten für Split field">
            <div class="palette-dock-head"><span>Color directions</span><span>Applied to setup study</span></div>
            <div class="palette-grid">
              <button v-for="palette in paletteOptions" :key="palette.id" class="palette-option" :class="{ 'palette-option--active': activePalette.id === palette.id }" :aria-pressed="activePalette.id === palette.id" @click="selectedPalette = paletteOptions.indexOf(palette)">
                <span class="palette-swatches" aria-hidden="true"><i v-for="color in palette.swatches" :key="color" :style="{ backgroundColor: color }" /></span>
                <span class="palette-copy"><strong>{{ palette.label }}</strong><small>{{ palette.note }}</small></span>
                <span class="palette-contrast">{{ palette.contrast }}</span>
              </button>
            </div>
            <p class="palette-dock-note">{{ activePalette.label }} · {{ activePalette.ink }} ink · {{ activePalette.leaf }} field · {{ activePalette.accent }} accent</p>
          </section>
        </div>
      </section>

      <footer class="lab-footer">
        <p><span>Direction note</span> Keep the identity. Change the pressure.</p>
        <p>Jungle / Quiz <span class="lab-footer-slash">·</span> design experiment 01</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
:global(html) { background: #071a13; }
:global(body) { background: #071a13; }

.lab-page {
  --lab-ink: #071a13;
  --lab-jungle: #0d2a1d;
  --lab-forest: #123c29;
  --lab-cream: #f3eedb;
  --lab-gold: #dfba64;
  --lab-leaf: #b7d69e;
  --lab-coral: #dd927b;
  --lab-muted: #9cac9a;
  --lab-line: rgb(243 238 219 / 18%);
  min-height: 100vh;
  color: var(--lab-cream);
  background: var(--lab-ink);
}

.lab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  padding: 0 var(--page-gutter);
  border-bottom: 1px solid var(--lab-line);
  position: relative;
  z-index: 1;
}

.lab-brand { display: inline-flex; align-items: center; gap: .45rem; color: var(--lab-cream); font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; letter-spacing: -.04em; text-decoration: none; }
.lab-brand i { color: var(--lab-gold); font-style: normal; }
.lab-header-meta { display: flex; align-items: center; gap: .65rem; color: var(--lab-muted); font-size: .69rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.lab-live-dot { width: .42rem; height: .42rem; border-radius: 50%; background: var(--lab-leaf); box-shadow: 0 0 0 4px rgb(183 214 158 / 12%); }
.lab-header-rule { width: 2.2rem; height: 1px; margin: 0 .6rem; background: var(--lab-line); }
.lab-back { display: inline-flex; align-items: center; gap: .4rem; color: var(--lab-cream); text-decoration: none; text-transform: none; letter-spacing: .02em; }
.lab-back:hover { color: var(--lab-gold); }

.lab-main { width: min(100% - 2 * var(--page-gutter), 1400px); margin: 0 auto; }
.lab-intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 3rem; padding: clamp(4rem, 8vw, 8rem) 0 3.5rem; }
.lab-kicker, .mini-kicker { color: var(--lab-gold); font-size: .67rem; font-weight: 700; letter-spacing: .19em; text-transform: uppercase; }
.lab-intro h1 { max-width: 9ch; margin: 1.5rem 0 0; color: var(--lab-cream); font-family: var(--font-display); font-size: clamp(3.8rem, 9vw, 8.6rem); font-weight: 500; letter-spacing: -.075em; line-height: .83; }
.lab-intro h1 em, .study h2 em { color: var(--lab-leaf); font-style: normal; }
.lab-lede { max-width: 29rem; margin: 2.2rem 0 0; color: var(--lab-muted); font-size: 1rem; line-height: 1.55; }
.lab-intro-stamp { display: flex; align-items: center; gap: .85rem; padding: .8rem 1rem; border: 1px solid var(--lab-gold); color: var(--lab-gold); transform: rotate(3deg); }
.stamp-number { font-family: var(--font-display); font-size: 2.8rem; line-height: .8; }
.stamp-copy { font-size: .62rem; font-weight: 700; letter-spacing: .15em; line-height: 1.25; text-transform: uppercase; }

.screen-switcher { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--lab-line); border-bottom: 1px solid var(--lab-line); }
.screen-tab { display: flex; align-items: center; gap: 1.1rem; min-height: 85px; border: 0; border-right: 1px solid var(--lab-line); background: transparent; color: var(--lab-muted); padding: 1rem 1.3rem; text-align: left; transition: background 180ms ease, color 180ms ease; }
.screen-tab:last-child { border-right: 0; }
.screen-tab:hover, .screen-tab--active { background: var(--lab-jungle); color: var(--lab-cream); }
.screen-tab--active .screen-tab-index { color: var(--lab-gold); }
.screen-tab-index { color: rgb(243 238 219 / 42%); font-family: var(--font-display); font-size: 1.5rem; }
.screen-tab strong, .screen-tab small { display: block; }
.screen-tab strong { font-size: .88rem; font-weight: 600; }
.screen-tab small { margin-top: .25rem; color: var(--lab-muted); font-size: .7rem; }
.screen-tab > .iconify { margin-left: auto; }

.lab-workbench { display: grid; grid-template-columns: minmax(220px, .28fr) minmax(0, 1fr); gap: clamp(1.2rem, 3vw, 3rem); padding: 3.1rem 0 7rem; }
.variant-rail { align-self: start; position: sticky; top: 1rem; }
.variant-rail-head { display: flex; justify-content: space-between; padding-bottom: .8rem; border-bottom: 1px solid var(--lab-line); color: var(--lab-muted); font-size: .67rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
.variant-count { color: var(--lab-gold); }
.variant-list { border-bottom: 1px solid var(--lab-line); }
.variant-picker { display: flex; align-items: flex-start; width: 100%; min-height: 70px; gap: .75rem; border: 0; border-bottom: 1px solid rgb(243 238 219 / 10%); background: transparent; color: var(--lab-muted); padding: .9rem 0; text-align: left; transform: translateX(0); transition: color 160ms ease, transform 160ms ease, background 160ms ease; }
.variant-picker:hover { color: var(--lab-cream); transform: translateX(6px); }
.variant-picker--active { color: var(--lab-cream); transform: translateX(6px); }
.variant-code { display: grid; width: 1.5rem; height: 1.5rem; flex: 0 0 auto; place-items: center; border: 1px solid currentcolor; font-family: var(--font-display); font-size: .8rem; }
.variant-picker--active .variant-code { border-color: var(--lab-gold); background: var(--lab-gold); color: var(--lab-ink); }
.variant-picker-copy strong, .variant-picker-copy small { display: block; }
.variant-picker-copy strong { font-size: .84rem; font-weight: 600; }
.variant-picker-copy small { margin-top: .25rem; color: var(--lab-muted); font-size: .68rem; line-height: 1.3; }
.variant-arrow { margin-left: auto; color: var(--lab-gold); font-size: 1rem; opacity: 0; transition: opacity 160ms ease; }
.variant-picker--active .variant-arrow, .variant-picker:hover .variant-arrow { opacity: 1; }
.variant-hint { max-width: 16rem; margin: 1.4rem 0; color: var(--lab-muted); font-size: .72rem; line-height: 1.5; }

.preview-column { min-width: 0; }
.preview-bar, .preview-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: var(--lab-muted); font-size: .68rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.preview-bar { padding: 0 0 .8rem; }
.preview-bar strong { color: var(--lab-cream); font-weight: 600; }
.preview-label { color: var(--lab-gold); }
.preview-slash { margin: 0 .4rem; color: rgb(243 238 219 / 30%); }
.preview-context { display: flex; align-items: center; gap: .55rem; }
.preview-dot { width: .32rem; height: .32rem; border-radius: 50%; background: currentcolor; }
.preview-dot--gold { display: inline-block; margin-right: .4rem; background: var(--lab-gold); }

.preview-frame { position: relative; min-height: 650px; overflow: hidden; border: 1px solid var(--lab-line); background: var(--lab-jungle); }
.preview-frame--setup { min-height: 665px; }
.preview-corner { position: absolute; z-index: 2; width: 10px; height: 10px; border-color: var(--lab-gold); }
.preview-corner--tl { top: 11px; left: 11px; border-top: 1px solid; border-left: 1px solid; }
.preview-corner--br { right: 11px; bottom: 11px; border-right: 1px solid; border-bottom: 1px solid; }
.study { position: relative; min-height: 650px; padding: clamp(1.5rem, 4vw, 3.2rem); background: var(--lab-jungle); isolation: isolate; }
.study::before { position: absolute; z-index: -1; inset: 0; pointer-events: none; content: ''; }
.study h2 { margin: 0; color: var(--lab-cream); font-family: var(--font-display); font-size: clamp(2.8rem, 6vw, 5.8rem); font-weight: 500; letter-spacing: -.07em; line-height: .84; }
.study p { color: var(--lab-muted); line-height: 1.5; }
.study-action { display: inline-flex; align-items: center; justify-content: space-between; gap: 1rem; min-width: 10.5rem; min-height: 46px; border: 1px solid currentcolor; padding: .7rem 1rem; color: var(--lab-ink); font-size: .73rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; transition: transform 180ms ease, background 180ms ease; }
.study-action:hover { transform: translateY(-2px) rotate(-1deg); }
.study-action--gold { background: var(--lab-gold); }
.study-action--cream { background: var(--lab-cream); }
.study-action--leaf { background: var(--lab-leaf); }
input { min-width: 0; border: 0; border-bottom: 1px solid rgb(243 238 219 / 35%); outline: 0; background: transparent; color: var(--lab-cream); }
input:focus { border-bottom-color: var(--lab-gold); }
button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid var(--lab-gold); outline-offset: 4px; }

/* Setup studies */

.split-field-head { display: flex; justify-content: space-between; gap: .7rem; border-bottom: 1px solid var(--split-line); padding-bottom: .8rem; color: var(--split-accent); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }

.study-split-field { --split-ink: var(--lab-ink); --split-jungle: var(--lab-jungle); --split-leaf: var(--lab-leaf); --split-accent: var(--lab-gold); --split-cream: var(--lab-cream); --split-muted: var(--lab-muted); --split-line: var(--lab-line); display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(270px, .78fr); min-height: 665px; padding: 0; background: var(--split-jungle); }
.split-field-copy { display: flex; flex-direction: column; justify-content: space-between; min-height: 665px; background: var(--split-leaf); padding: 2rem clamp(1.5rem, 5vw, 4.5rem); color: var(--split-ink); }
.split-field-wordmark { color: var(--split-ink); font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -.035em; }
.split-field-wordmark span, .split-field-copy h2 em { color: var(--split-jungle); }
.split-field-copy h2 { max-width: 8ch; margin-top: 5rem; color: var(--split-ink); font-size: clamp(4.6rem, 8vw, 7.4rem); letter-spacing: -.012em; line-height: .87; }
.split-field-copy h2 em { font-style: normal; }
.split-field-copy p { max-width: 18rem; margin-top: 1.7rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .88rem; }
.split-field-meta { display: flex; border-top: 1px solid color-mix(in srgb, var(--split-ink) 32%, transparent); padding-top: .8rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-meta span + span::before { margin: 0 .75rem; color: color-mix(in srgb, var(--split-ink) 42%, transparent); content: '·'; }
.split-field-form { align-self: center; margin: 2rem 2.35rem 2rem 1.75rem; border: 1px solid var(--split-line); border-radius: 18px; background: color-mix(in srgb, var(--split-jungle) 94%, var(--split-cream)); padding: 1.45rem; color: var(--split-cream); overflow: hidden; }
.split-field-form .split-field-head { padding-bottom: 1rem; }
.split-field-form .split-field-config { margin-top: 1.25rem; }
.split-field-form .study-action { border-radius: 12px; }
.split-field-form label { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: center; gap: .7rem; min-height: 74px; border-bottom: 1px solid var(--split-line); }
.split-field-form label span { color: var(--split-accent); font-size: .62rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.split-field-form input { width: 100%; border-color: color-mix(in srgb, var(--split-cream) 42%, transparent); padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.split-field-config { margin-top: 1rem; }
.split-field-badges { display: grid; grid-template-columns: .68fr .82fr 1.3fr; border-top: 1px solid var(--split-line); }
.split-field-badge { display: flex; min-width: 0; min-height: 4.5rem; flex-direction: column; justify-content: center; gap: .18rem; border: 0; border-bottom: 1px solid var(--split-line); background: transparent; color: var(--split-cream); cursor: pointer; padding: .7rem .75rem; text-align: left; transition: background 160ms ease, color 160ms ease; }
.split-field-badge + .split-field-badge { border-left: 1px solid var(--split-line); }
.split-field-badge:hover, .split-field-badge:focus-visible, .split-field-badge--active { background: color-mix(in srgb, var(--split-accent) 15%, transparent); }
.split-field-badge:focus-visible { outline: 2px solid var(--split-accent); outline-offset: -2px; }
.split-field-badge strong { overflow: hidden; color: var(--split-cream); font-family: var(--font-display); font-size: clamp(1.35rem, 2.35vw, 2.05rem); font-weight: 600; letter-spacing: -.025em; line-height: .95; text-overflow: ellipsis; white-space: nowrap; }
.split-field-badge span { color: var(--split-accent); font-size: .52rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-picker { display: flex; align-items: center; justify-content: space-between; gap: .8rem; border-bottom: 1px solid var(--split-line); padding: .65rem 0 .7rem; }
.split-field-picker > span { color: var(--split-muted); font-size: .52rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-picker > div { display: grid; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column; gap: .35rem; flex: 1; }
.split-field-picker--segments { justify-content: flex-end; }
.split-field-picker--segments > div { width: 100%; }
.split-field-picker button { min-height: 2.2rem; border: 1px solid var(--split-line); background: transparent; color: var(--split-muted); cursor: pointer; font: inherit; font-size: .65rem; font-weight: 700; padding: .3rem .45rem; text-align: center; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
.split-field-picker button:hover, .split-field-picker button:focus-visible, .split-field-picker-option--selected { border-color: var(--split-accent); background: var(--split-accent); color: var(--split-ink); outline: none; }
.split-field-config--matrix .split-field-badges { display: none; }
.split-field-matrix { display: grid; grid-template-columns: 1fr; border-top: 1px solid var(--split-line); border-bottom: 1px solid var(--split-line); }
.split-field-matrix-field { display: grid; grid-template-columns: 4.7rem minmax(0, 1fr); align-items: center; min-width: 0; gap: .55rem; padding: .55rem 0; }
.split-field-matrix-field + .split-field-matrix-field { border-top: 1px solid var(--split-line); }
.split-field-matrix-field > span { color: var(--split-accent); font-size: .52rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-matrix-field > div { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .3rem; }
.split-field-matrix-field button { min-height: 2rem; }
.split-field-form .study-action { width: 100%; margin-top: 1.4rem; }

.study-split-field .study-action--cream { background: var(--split-cream); color: var(--split-ink); }

.config-variant-dock { margin-top: 1.6rem; border-top: 1px solid var(--lab-line); padding-top: 1rem; }
.config-variant-dock-head { display: flex; justify-content: space-between; gap: 1rem; color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.config-variant-dock-head span:first-child { color: var(--lab-gold); }
.config-variant-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .6rem; margin-top: .8rem; }
.config-variant-grid--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.config-variant-option { display: grid; grid-template-columns: auto 1fr auto; align-items: start; gap: .65rem; min-height: 74px; border: 1px solid var(--lab-line); background: transparent; color: var(--lab-muted); cursor: pointer; padding: .75rem; text-align: left; transition: border-color 160ms ease, background 160ms ease, color 160ms ease, transform 160ms ease; }
.config-variant-option:hover, .config-variant-option--active { border-color: var(--lab-gold); background: var(--lab-jungle); color: var(--lab-cream); transform: translateY(-2px); }
.config-variant-code { display: grid; width: 1.35rem; height: 1.35rem; place-items: center; border: 1px solid currentcolor; color: var(--lab-gold); font-family: var(--font-display); font-size: .68rem; }
.config-variant-copy strong, .config-variant-copy small { display: block; }
.config-variant-copy strong { font-size: .73rem; font-weight: 600; }
.config-variant-copy small { margin-top: .25rem; color: var(--lab-muted); font-size: .61rem; line-height: 1.3; }
.config-variant-arrow { color: var(--lab-gold); font-size: .95rem; }

.palette-dock { margin-top: 1.6rem; border-top: 1px solid var(--lab-line); padding-top: 1rem; }
.palette-dock-head { display: flex; justify-content: space-between; gap: 1rem; color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.palette-dock-head span:first-child { color: var(--lab-gold); }
.palette-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .6rem; margin-top: .8rem; }
.palette-option { display: grid; grid-template-columns: 1fr auto; gap: .75rem; align-items: center; min-height: 82px; border: 1px solid var(--lab-line); background: transparent; color: var(--lab-muted); padding: .75rem; text-align: left; transition: border-color 160ms ease, background 160ms ease, transform 160ms ease; }
.palette-option:hover, .palette-option--active { border-color: var(--lab-gold); background: var(--lab-jungle); color: var(--lab-cream); transform: translateY(-2px); }
.palette-swatches { display: flex; grid-column: 1 / -1; height: 20px; }
.palette-swatches i { flex: 1; border-right: 1px solid rgb(7 26 19 / 20%); }
.palette-swatches i:first-child { border-radius: 2px 0 0 2px; }
.palette-swatches i:last-child { border-right: 0; border-radius: 0 2px 2px 0; }
.palette-copy strong, .palette-copy small { display: block; }
.palette-copy strong { color: var(--lab-cream); font-size: .78rem; font-weight: 600; }
.palette-copy small { max-width: 15rem; margin-top: .2rem; color: var(--lab-muted); font-size: .64rem; line-height: 1.3; }
.palette-contrast { color: var(--lab-gold); font-size: .62rem; font-weight: 700; letter-spacing: .08em; white-space: nowrap; }
.palette-dock-note { margin-top: .7rem; color: var(--lab-muted); font-size: .68rem; }

/* Category studies */
.category-study { padding: 2rem clamp(1.4rem, 4vw, 3rem); }
.category-study--soft-field { --lab-ink: #081811; --lab-jungle: #081811; --lab-forest: #0b4429; --lab-cream: #fbf8ed; --lab-gold: #caff4a; --lab-leaf: #e7f7b6; --lab-muted: #8fc7a2; --lab-line: rgb(251 248 237 / 24%); background: var(--lab-ink); }
.category-study-top { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; color: var(--lab-muted); font-size: .62rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.category-study-top > strong { color: var(--lab-gold); font-size: .6rem; text-align: center; }
.category-study-top span:last-child { text-align: right; }
.category-study-top--soft-field { align-items: start; }
.category-status { display: grid; grid-template-columns: auto auto; align-items: end; column-gap: .55rem; row-gap: .18rem; }
.category-status > span { grid-column: 1 / -1; color: var(--lab-muted); font-size: .58rem; letter-spacing: .18em; }
.category-status strong { color: var(--lab-gold); font-family: var(--font-display); font-size: clamp(2.25rem, 4vw, 3.9rem); font-weight: 500; letter-spacing: -.05em; line-height: .72; }
.category-status small { align-self: end; color: var(--lab-muted); font-size: .53rem; letter-spacing: .1em; line-height: 1; text-transform: uppercase; }
.category-status--question strong { font-family: var(--font-ui); font-size: clamp(1.2rem, 2.1vw, 1.8rem); font-weight: 700; letter-spacing: .01em; line-height: 1; }
.category-status--question { justify-items: end; text-align: right; }
.category-study-intro { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-top: 4.1rem; }
.category-study-intro h2 { max-width: 10ch; margin: 0; font-size: clamp(3rem, 6vw, 6rem); }
.category-study-intro h2 em { color: var(--lab-leaf); font-style: normal; }
.category-study-intro p { max-width: 14rem; margin: 0 0 .35rem; color: var(--lab-muted); font-size: .78rem; line-height: 1.45; }
.category-surface-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; margin-top: 3rem; }
.category-study--soft-field .category-surface-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 4.35rem; }
.category-surface { cursor: pointer; font: inherit; }
.category-surface { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 1rem; min-height: 7.15rem; border: 0; border-radius: 0; background: var(--lab-forest); color: var(--lab-cream); padding: 1.2rem 1.25rem; text-align: left; transition: transform 180ms ease, background 180ms ease, color 180ms ease; }
.category-surface:hover, .category-surface:focus-visible, .category-surface--selected { background: var(--lab-gold); color: var(--lab-ink); transform: translateY(-3px); }
.category-surface:focus-visible { outline: 3px solid var(--lab-leaf); outline-offset: 3px; }
.category-surface-copy { display: flex; flex-direction: column; gap: .35rem; }
.category-surface-copy strong { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 3rem); letter-spacing: -.04em; line-height: .9; }
.category-study--soft-field .category-study-intro h2 { letter-spacing: -.02em; }
.category-study--soft-field .category-surface-copy strong { letter-spacing: -.015em; }
.category-surface-copy small { color: var(--lab-muted); font-size: .67rem; line-height: 1.35; }
.category-surface--selected .category-surface-copy small, .category-surface:hover .category-surface-copy small, .category-surface:focus-visible .category-surface-copy small { color: rgb(7 26 19 / 72%); }
.category-surface > .iconify { color: var(--lab-gold); }.category-surface:hover > .iconify, .category-surface:focus-visible > .iconify, .category-surface--selected > .iconify { color: var(--lab-ink); }
.category-study-foot { display: flex; justify-content: space-between; margin: 1.2rem 0 0; border-top: 1px solid var(--lab-line); padding-top: .9rem; color: var(--lab-muted); font-size: .68rem; letter-spacing: .04em; }.category-study-foot span { color: var(--lab-gold); }

/* Question studies */
.question-board-top, .timer-top, .editorial-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }.question-board-top .mini-kicker, .timer-top .mini-kicker { margin: 0; }.question-board-top b { color: var(--lab-gold); font-size: .6rem; }.question-board-main { width: min(100%, 52rem); padding-top: 6rem; }.question-board-main h2 { font-size: clamp(3.5rem, 7vw, 7.5rem); }.question-board-main h2 em { color: var(--lab-gold); }.board-answers { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem; margin-top: 2.8rem; }.answer-chip, .arena-actions button, .timer-answer-grid button, .duel-option { display: flex; align-items: center; gap: .8rem; min-height: 58px; border: 1px solid var(--lab-line); background: rgb(7 26 19 / 22%); color: var(--lab-cream); padding: .65rem .8rem; text-align: left; transition: background 160ms ease, color 160ms ease, transform 160ms ease; }.answer-chip:hover, .answer-chip--selected, .arena-actions button:hover, .arena-answer--selected, .timer-answer-grid button:hover, .timer-answer--selected, .duel-option:hover, .duel-option--selected { background: var(--lab-leaf); color: var(--lab-ink); transform: translateY(-2px); }.answer-chip span, .arena-actions button span, .timer-answer-grid button span, .duel-option span { display: grid; width: 1.6rem; height: 1.6rem; flex: 0 0 auto; place-items: center; background: rgb(223 186 100 / 14%); color: var(--lab-gold); font-family: var(--font-display); font-size: .95rem; }.answer-chip--selected span, .arena-answer--selected span, .timer-answer--selected span, .duel-option--selected span { background: rgb(7 26 19 / 13%); color: var(--lab-ink); }.board-time { position: absolute; right: clamp(1.5rem, 5vw, 4rem); bottom: 4rem; display: flex; flex-direction: column; min-width: 8rem; border-left: 1px solid var(--lab-gold); padding-left: 1rem; }.board-time small, .board-time span { color: var(--lab-muted); font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; }.board-time strong { margin: .5rem 0; color: var(--lab-gold); font-family: var(--font-display); font-size: 6rem; font-weight: 500; line-height: .75; }.board-time i, .timer-giant i { height: 4px; margin: 1rem 0; background: rgb(243 238 219 / 15%); }.board-time i b, .timer-giant i b { display: block; width: 78%; height: 100%; background: var(--lab-gold); }.board-time button, .timer-giant button { align-self: flex-start; border: 0; background: transparent; color: var(--lab-muted); padding: .4rem 0; font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }

.study-arena { min-height: 665px; }.arena-score { position: absolute; top: 2.2rem; display: flex; flex-direction: column; border-top: 1px solid var(--lab-line); padding-top: .7rem; }.arena-score--one { left: 2rem; }.arena-score--two { right: 2rem; text-align: right; }.arena-score small { font-size: .62rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.arena-score strong { color: var(--lab-gold); font-family: var(--font-display); font-size: 3.6rem; line-height: .82; }.arena-score span { color: var(--lab-muted); font-size: .6rem; text-transform: uppercase; }.arena-centre { max-width: 45rem; margin: 8rem auto 0; text-align: center; }.arena-status { display: inline-flex; align-items: center; gap: .45rem; color: var(--lab-gold); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.live-pip { width: .42rem; height: .42rem; border-radius: 50%; background: var(--lab-coral); }.arena-centre .mini-kicker { margin-top: 2rem; }.arena-centre h2 { margin-top: 1.1rem; font-size: clamp(3.3rem, 7vw, 7rem); }.arena-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: .5rem; margin-top: 3rem; }.arena-actions button { justify-content: center; flex-direction: column; align-items: flex-start; min-height: 95px; }.arena-time { position: absolute; bottom: 1.5rem; left: 50%; display: flex; align-items: baseline; gap: .4rem; color: var(--lab-muted); transform: translateX(-50%); }.arena-time strong { color: var(--lab-gold); font-family: var(--font-display); font-size: 2.4rem; }.arena-time span { font-size: .65rem; text-transform: uppercase; }

.study-editorial { padding: 2rem clamp(1.5rem, 5vw, 4.5rem); }.editorial-top { border-bottom: 1px solid var(--lab-line); padding-bottom: 1rem; }.editorial-top .mini-kicker { margin: 0; }.editorial-top strong { color: var(--lab-cream); }.editorial-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: clamp(1.5rem, 5vw, 5rem); align-items: end; min-height: 500px; }.editorial-number { display: block; color: var(--lab-gold); font-family: var(--font-display); font-size: 1.1rem; }.editorial-question h2 { margin-top: 1.2rem; font-size: clamp(3.8rem, 8vw, 7.5rem); }.editorial-question p { margin-top: 2rem; font-size: .78rem; }.editorial-options { border-top: 1px solid var(--lab-line); }.editorial-options button { display: grid; grid-template-columns: 1.6rem 1fr 1rem; align-items: center; gap: .8rem; width: 100%; min-height: 63px; border: 0; border-bottom: 1px solid var(--lab-line); background: transparent; color: var(--lab-cream); padding: .5rem 0; text-align: left; }.editorial-options button:hover, .editorial-option--selected { color: var(--lab-gold); padding-left: .5rem !important; }.editorial-options button span { color: var(--lab-gold); font-family: var(--font-display); }.editorial-options button strong { font-size: 1rem; font-weight: 500; }.editorial-bottom { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--lab-line); padding-top: 1rem; color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }.editorial-timer { display: inline-flex; align-items: center; gap: .45rem; }.editorial-timer i { width: .45rem; height: .45rem; border-radius: 50%; background: var(--lab-coral); }.editorial-timer i.editorial-timer--paused { background: var(--lab-gold); }

.study-timer { padding: 2rem clamp(1.5rem, 5vw, 4.5rem); }.timer-top .mini-kicker { margin: 0; }.timer-layout { display: grid; grid-template-columns: minmax(0, 1fr) 15rem; gap: 2rem; align-items: center; min-height: 510px; }.timer-question h2 { margin-top: 4rem; font-size: clamp(3.4rem, 7.2vw, 7.2rem); }.timer-question h2 em { color: var(--lab-coral); }.timer-answer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .5rem; max-width: 38rem; margin-top: 2.5rem; }.timer-answer-grid button { min-height: 54px; }.timer-giant { border-left: 1px solid var(--lab-coral); padding-left: 1rem; }.timer-giant span { display: block; color: var(--lab-muted); font-size: .65rem; letter-spacing: .13em; text-transform: uppercase; }.timer-giant strong { display: block; margin-top: .5rem; color: var(--lab-coral); font-family: var(--font-display); font-size: clamp(7rem, 13vw, 11rem); font-weight: 500; letter-spacing: -.08em; line-height: .75; }.timer-giant i b { background: var(--lab-coral); }

.study-duel { display: grid; grid-template-columns: 1fr 8rem 1fr; grid-template-rows: auto 1fr; gap: 2rem; padding: 2rem clamp(1.5rem, 5vw, 4rem); }.duel-team { display: flex; flex-direction: column; gap: .35rem; border-top: 1px solid var(--lab-line); padding-top: .7rem; }.duel-team--two { align-items: flex-end; text-align: right; }.duel-team span { color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .13em; }.duel-team strong { color: var(--lab-gold); font-family: var(--font-display); font-size: 4.5rem; line-height: .75; }.duel-team small { color: var(--lab-muted); font-size: .65rem; }.duel-round { text-align: center; }.duel-round .mini-kicker { display: block; margin: 0; }.duel-round div { margin: .7rem 0; color: var(--lab-gold); font-family: var(--font-display); font-size: 1.8rem; }.duel-round small { color: var(--lab-muted); font-size: .62rem; text-transform: uppercase; }.duel-question { grid-column: 1 / -1; align-self: center; text-align: center; }.duel-question .mini-kicker { display: block; }.duel-question h2 { margin-top: 1.3rem; font-size: clamp(3.3rem, 7vw, 7rem); }.duel-question h2 em { color: var(--lab-leaf); }.duel-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .5rem; max-width: 47rem; margin: 3rem auto 0; }.duel-option { justify-content: center; flex-direction: column; align-items: center; min-height: 92px; }

.preview-footer { border-top: 1px solid var(--lab-line); padding-top: .8rem; }.preview-footer-key { color: var(--lab-gold); }
.lab-footer { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--lab-line); padding: 1.2rem 0 2rem; color: var(--lab-muted); font-size: .68rem; }.lab-footer p { margin: 0; }.lab-footer p span:first-child { color: var(--lab-gold); margin-right: .45rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }.lab-footer-slash { color: var(--lab-gold); }

/* Refined setup studies (J–N). Sizes use container units so the study scales like the real full-screen setup. */
.setup-v { container-type: inline-size; min-height: 665px; padding: 0; background: var(--split-jungle); color: var(--split-cream); }
.setup-v-grid { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr); min-height: 665px; }
.setup-v-copy { display: flex; flex-direction: column; justify-content: flex-start; gap: 3cqi; background: var(--split-leaf); padding: 4cqi 5cqi 3.4cqi; color: var(--split-ink); }
.setup-v-copy-main { margin-block: auto; }
.setup-v-copy .split-field-wordmark { font-size: clamp(1.3rem, 2.9cqi, 2.6rem); }
.setup-v-copy h2 { color: var(--split-ink); font-size: clamp(4.6rem, 13.2cqi, 13rem); letter-spacing: -.035em; line-height: .84; }
.setup-v-copy h2 em { color: var(--split-jungle); font-style: normal; }
.setup-v-copy p { max-width: 25ch; margin: 3.4cqi 0 0; color: color-mix(in srgb, var(--split-ink) 78%, transparent); font-size: clamp(1.1rem, 2.15cqi, 1.75rem); font-weight: 500; letter-spacing: -.01em; line-height: 1.3; text-wrap: balance; }
.setup-v-meta { display: flex; border-top: 1px solid color-mix(in srgb, var(--split-ink) 28%, transparent); padding-top: 1.1rem; color: color-mix(in srgb, var(--split-ink) 72%, transparent); font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.setup-v-meta span + span::before { margin: 0 .8rem; color: color-mix(in srgb, var(--split-ink) 40%, transparent); content: '·'; }
.setup-v-side { display: flex; min-width: 0; flex-direction: column; justify-content: center; padding: 4cqi 4.4cqi; }
.setup-v-side input { width: 100%; border: 0; background: transparent; color: var(--split-cream); font-family: var(--font-display); font-weight: 600; letter-spacing: -.02em; caret-color: var(--split-accent); }
.setup-v-side input:focus-visible { outline: none; }
.setup-v-side label > span, .setup-v-side h3, .setup-j-row > span, .setup-m-row > span, .setup-l-stepper > span { color: var(--split-muted); font-size: .66rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.setup-v-action { display: flex; align-items: center; justify-content: space-between; gap: 1rem; width: 100%; min-height: 60px; margin-top: 2.2rem; border: 0; border-radius: 14px; background: var(--split-accent); color: var(--split-ink); cursor: pointer; padding: 0 1.4rem; font-size: .82rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; transition: transform 200ms cubic-bezier(.16, 1, .3, 1), background 160ms ease; }
.setup-v-action:hover { transform: translateY(-2px); }
.setup-v-action:active { transform: translateY(0) scale(.99); }

/* Shared segmented control */
.setup-j-row > div, .setup-m-row > div, .setup-n-row > div { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .3rem; }
.setup-j-row button, .setup-m-row button { min-height: 44px; border: 1px solid var(--split-line); border-radius: 10px; background: transparent; color: var(--split-cream); cursor: pointer; font-size: .82rem; font-weight: 600; transition: background 160ms ease, border-color 160ms ease, color 160ms ease; }
.setup-j-row button:hover, .setup-m-row button:hover { border-color: color-mix(in srgb, var(--split-accent) 70%, transparent); }
.setup-j-row button.is-on, .setup-m-row button.is-on { border-color: var(--split-accent); background: var(--split-accent); color: var(--split-ink); }

/* J / Open sheet: no card, ruled rows directly on green */
.setup-j-team { display: grid; gap: .55rem; border-bottom: 1px solid var(--split-line); padding: 1.3rem 0 1rem; transition: border-color 160ms ease; }
.setup-j-team:focus-within { border-bottom-color: var(--split-accent); }
.setup-j-team input { font-size: clamp(1.6rem, 3.4cqi, 2.7rem); }
.setup-j-rules { display: grid; gap: .9rem; margin-top: 2.2rem; }
.setup-j-row { display: grid; grid-template-columns: 5.6rem minmax(0, 1fr); align-items: center; gap: 1rem; }

/* K / Versus: names face off, settings as one tappable sentence */
.setup-k { gap: 0; }
.setup-k-team { display: grid; gap: .5rem; }
.setup-k-team input { border-bottom: 1px solid var(--split-line); padding: .25rem 0 .7rem; font-size: clamp(2rem, 4.6cqi, 3.6rem); line-height: 1; transition: border-color 160ms ease; }
.setup-k-team input:focus { border-bottom-color: var(--split-accent); }
.setup-k-vs { display: flex; align-items: center; gap: 1rem; margin: 1.6rem 0; color: var(--split-accent); }
.setup-k-vs i { height: 1px; flex: 1; background: var(--split-line); }
.setup-k-vs b { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; font-style: italic; }
.setup-k-sentence { display: flex; flex-wrap: wrap; align-items: baseline; gap: .2rem .55rem; margin: 2.8rem 0 0; color: var(--split-muted); }
.setup-k-sentence button { border: 0; border-bottom: 2px dotted color-mix(in srgb, var(--split-accent) 60%, transparent); background: transparent; color: var(--split-cream); cursor: pointer; padding: 0 0 .1rem; font-family: var(--font-display); font-size: clamp(1.25rem, 2.6cqi, 2rem); font-weight: 600; letter-spacing: -.02em; transition: color 160ms ease, border-color 160ms ease; }
.setup-k-sentence button:hover { border-bottom-style: solid; color: var(--split-accent); }

/* K1 / Versus centered: names on one centre axis, VS carries the composition, lines only around VS */
.setup-v--versus-centered .setup-k { align-items: center; text-align: center; }
.setup-v--versus-centered .setup-k-team { width: 100%; justify-items: center; gap: .7rem; }
.setup-v--versus-centered .setup-k-team input { max-width: 100%; border-bottom: 2px solid transparent; padding: .1rem 0 .35rem; text-align: center; font-size: clamp(2.2rem, 5.2cqi, 4.2rem); }
.setup-v--versus-centered .setup-k-team input:hover { border-bottom-color: var(--split-line); }
.setup-v--versus-centered .setup-k-team input:focus { border-bottom-color: var(--split-accent); }
.setup-v--versus-centered .setup-k-vs { width: 100%; gap: clamp(1rem, 2.4cqi, 1.8rem); margin: clamp(1.4rem, 3.4cqi, 2.6rem) 0; }
.setup-v--versus-centered .setup-k-vs i:first-child { background: linear-gradient(to right, transparent, color-mix(in srgb, var(--split-accent) 45%, transparent)); }
.setup-v--versus-centered .setup-k-vs i:last-child { background: linear-gradient(to left, transparent, color-mix(in srgb, var(--split-accent) 45%, transparent)); }
.setup-v--versus-centered .setup-k-vs b { font-size: clamp(3.2rem, 8cqi, 6.4rem); font-weight: 600; letter-spacing: -.03em; line-height: .8; }
.setup-v--versus-centered .setup-k-sentence { justify-content: center; margin-top: clamp(2.2rem, 4.8cqi, 3.6rem); }
.setup-v--versus-centered .setup-v-action { justify-content: center; gap: .8rem; }

/* Question studies (Q1–Q5). The study is a size container so every layout must fit its frame, like a real screen. */
.qv { --q-ink: #081811; --q-forest: #0b4429; --q-cream: #fbf8ed; --q-accent: #caff4a; --q-leaf: #e7f7b6; --q-muted: #8fc7a2; --q-coral: #dd927b; --q-line: rgb(251 248 237 / 20%); container-type: size; height: 650px; min-height: 0; padding: 0; background: var(--q-ink); color: var(--q-cream); }
.qv-grid { position: relative; display: grid; height: 100%; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto auto; grid-template-areas: "brand duel nav" "copy copy timer" "answers answers answers" "foot foot foot"; align-items: center; gap: 2.6cqh 3cqw; padding: 3.6cqh 5cqw 2.6cqh; }
.qv-brand { grid-area: brand; z-index: 1; font-family: var(--font-display); font-size: 2.1cqw; font-weight: 600; letter-spacing: -.04em; line-height: .9; white-space: nowrap; }
.qv-brand i { color: var(--lab-gold); font-style: normal; }
.qv-nav { grid-area: nav; z-index: 1; display: flex; justify-self: end; gap: .35rem; }
.qv-nav span > * { width: 2.4cqh !important; height: 2.4cqh !important; font-size: 2.4cqh; }
.qv-nav span { display: grid; width: 5.4cqh; height: 5.4cqh; place-items: center; border: 1px solid var(--q-line); border-radius: 999px; color: var(--q-muted); }
.qv-duel { grid-area: duel; position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; justify-self: center; }
.qv-duel > i { grid-column: 2; grid-row: 1; padding: 0 1.4cqw; color: var(--q-line); font-family: var(--font-display); font-size: 3.4cqh; font-style: normal; }
.qv-team { position: relative; display: flex; grid-row: 1; align-items: baseline; gap: .9cqw; color: var(--q-muted); white-space: nowrap; }
.qv-team--one { grid-column: 1; justify-content: flex-end; }
.qv-team--two { grid-column: 3; flex-direction: row-reverse; justify-content: flex-end; }
.qv-team span { font-size: max(.6rem, 1.1cqw); font-weight: 700; letter-spacing: .13em; }
.qv-team strong { color: var(--q-cream); font-family: var(--font-display); font-size: 4.6cqh; font-variant-numeric: tabular-nums; font-weight: 500; line-height: .85; }
.qv-team--active span, .qv-team--active strong { color: var(--q-accent); }
.qv-team small { position: absolute; top: calc(100% + .5cqh); color: var(--q-accent); font-size: max(.5rem, .85cqw); font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.qv-team--one small { right: 0; }
.qv-team--two small { left: 0; }
.qv-ticks { grid-area: ticks; display: none; }
.qv-ticks > div { display: flex; gap: .45cqw; }
.qv-ticks i { width: 3.2cqw; height: 4px; border-radius: 2px; background: var(--q-line); }
.qv-ticks i.is-done { background: color-mix(in srgb, var(--q-cream) 62%, transparent); }
.qv-ticks i.is-current { background: var(--q-accent); }
.qv-ticks span { display: block; margin-top: 1cqh; color: var(--q-muted); font-size: max(.55rem, .95cqw); font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.qv-copy { grid-area: copy; min-width: 0; align-self: center; }
.qv-meta { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1.8cqw; color: var(--q-muted); font-size: max(.55rem, 1cqw); font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.qv-category { border: 1px solid rgb(202 255 74 / 28%); border-radius: 999px; background: rgb(202 255 74 / 10%); color: var(--q-accent); padding: .45rem .75rem .4rem; line-height: 1; }
.qv-copy h2 { margin: 2.6cqh 0 0; color: var(--q-cream); font-family: var(--font-display); font-weight: 500; letter-spacing: -.02em; text-wrap: balance; }
.qv .qv-copy h2.qv-question--s { max-width: 13ch; font-size: min(6.6cqw, 11cqh); line-height: .88; }
.qv .qv-copy h2.qv-question--m { max-width: 17ch; font-size: min(5.4cqw, 8.8cqh); line-height: .92; }
.qv .qv-copy h2.qv-question--l { max-width: 21ch; font-size: min(4.2cqw, 6.8cqh); line-height: .96; }
.qv .qv-copy h2.qv-question--xl { max-width: 25ch; font-size: min(3.5cqw, 5.8cqh); line-height: 1; }
.qv-timer { grid-area: timer; display: flex; min-width: 0; flex-direction: column; width: 19cqw; justify-self: end; }
.qv-timer-label { color: var(--q-muted); font-size: max(.55rem, .95cqw); font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.qv-timer strong { display: flex; align-items: baseline; gap: .8cqw; margin-top: 1.2cqh; color: var(--q-accent); font-family: var(--font-display); font-size: min(10cqw, 16cqh); font-variant-numeric: tabular-nums; font-weight: 500; letter-spacing: -.06em; line-height: .75; }
.qv-timer strong small { color: var(--q-muted); font-family: var(--font-ui); font-size: max(.55rem, 1cqw); font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.qv-timer > i { display: block; height: 4px; margin-top: 1.8cqh; overflow: hidden; background: rgb(251 248 237 / 12%); }
.qv-timer > i b { display: block; width: 100%; height: 100%; background: var(--q-accent); transform: scaleX(var(--q-progress, .78)); transform-origin: left center; transition: transform 1s linear, background 200ms ease; }
.qv--warning .qv-timer strong, .qv--warning .qv-timer-label { color: var(--q-coral); }
.qv--warning .qv-timer > i b { background: var(--q-coral); }
.qv-timer-actions { display: flex; gap: 1.6cqw; margin-top: .8cqh; }
.qv-timer-actions button, .qv-action { border: 0; background: transparent; color: var(--q-muted); cursor: pointer; padding: .4rem 0; font-size: max(.55rem, .95cqw); font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.qv-timer-actions button:hover, .qv-action:hover { color: var(--q-cream); }
.qv-action span { margin-left: .25rem; color: var(--q-accent); }
.qv-answers { grid-area: answers; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.6cqh 1.4cqw; }
.qv-option { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 1.4cqw; min-height: 10cqh; border: 0; border-radius: .7rem; background: var(--q-forest); color: var(--q-cream); cursor: pointer; padding: 1.3cqh 1.6cqw 1.3cqh 1.3cqh; text-align: left; transition: background 160ms ease, color 160ms ease, transform 160ms ease; }
.qv-option:hover { background: var(--q-accent); color: var(--q-ink); transform: translateY(-2px); }
.qv-option-letter { display: grid; align-self: stretch; width: 4cqw; min-height: 6cqh; place-items: center; border-radius: .4rem; background: rgb(8 24 17 / 74%); color: var(--q-accent); font-family: var(--font-display); font-size: max(.8rem, 1.5cqw); font-weight: 600; }
.qv-option-copy { min-width: 0; font-size: min(2.3cqw, 3.8cqh); font-weight: 500; letter-spacing: -.015em; line-height: 1.1; }
.qv-option--correct { background: var(--q-leaf); color: var(--q-ink); }
.qv-option--correct .qv-option-letter { background: rgb(7 26 19 / 12%); color: var(--q-ink); }
.qv-option--wrong { background: rgb(221 146 123 / 16%); color: var(--q-coral); }
.qv-option--wrong .qv-option-letter { background: rgb(221 146 123 / 18%); color: var(--q-coral); }
.qv-foot { grid-area: foot; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--q-line); padding-top: 1.4cqh; }
.qv-foot p { margin: 0; color: var(--q-muted); font-size: max(.55rem, .95cqw); letter-spacing: .08em; text-transform: uppercase; }

/* Q2 / Score rail: header stays empty, all status lives in one rail under the answers. */
.qv--score-rail .qv-grid { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto auto; grid-template-areas: "brand . nav" "copy copy copy" "answers answers answers" "duel foot timer"; }
.qv--score-rail .qv-duel { justify-self: start; border-top: 1px solid var(--q-line); padding-top: 1.4cqh; }
.qv--score-rail .qv-team small { position: static; margin-left: .4rem; }
.qv--score-rail .qv-team--two { flex-direction: row; }
.qv--score-rail .qv-foot { justify-content: center; }
.qv--score-rail .qv-foot p { display: none; }
.qv--score-rail .qv-timer { display: grid; width: 26cqw; grid-template-columns: auto 1fr auto; align-items: center; gap: 0 1.2cqw; border-top: 1px solid var(--q-line); padding-top: 1.4cqh; }
.qv--score-rail .qv-timer-label { display: none; }
.qv--score-rail .qv-timer strong { margin: 0; font-size: 5.6cqh; letter-spacing: -.03em; }
.qv--score-rail .qv-timer > i { margin: 0; }
.qv--score-rail .qv-timer-actions { margin: 0; }
.qv--score-rail .qv-timer-actions button:last-child { display: none; }
.qv--score-rail .qv-copy h2 { max-width: 22ch; }
.qv--score-rail .qv-copy h2.qv-question--s { font-size: min(7cqw, 12cqh); max-width: 16ch; }

/* Q3 / Timer band: the remaining time stretches across the stage; the question gets the full width. */
.qv--timer-band .qv-grid { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); grid-template-rows: auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand duel nav" "timer timer timer" "copy copy copy" "answers answers answers" "foot foot foot"; }
.qv--timer-band .qv-timer { display: grid; width: 100%; grid-template-columns: minmax(0, 1fr) auto auto; grid-template-areas: "bar num actions"; align-items: center; gap: 2cqw; margin-top: 2cqh; }
.qv--timer-band .qv-timer-label { display: none; }
.qv--timer-band .qv-timer > i { grid-area: bar; height: 6px; margin: 0; border-radius: 3px; }
.qv--timer-band .qv-timer strong { grid-area: num; margin: 0; font-size: 7cqh; letter-spacing: -.03em; }
.qv--timer-band .qv-timer-actions { grid-area: actions; margin: 0; }
.qv--timer-band .qv-copy h2 { max-width: 24ch; }
.qv--timer-band .qv-copy h2.qv-question--s { max-width: 18ch; font-size: min(7.2cqw, 11cqh); }
.qv--timer-band .qv-copy h2.qv-question--xl { max-width: 32ch; font-size: min(3.9cqw, 6cqh); }

/* Q4 / Side panel: one status column carries turn, score, progress and time. */
.qv--side-panel .qv-grid { grid-template-columns: minmax(0, 1fr) 26cqw; grid-template-rows: auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand nav" "copy duel" "copy ticks" "answers timer" "foot timer"; column-gap: 7cqw; }
.qv--side-panel .qv-grid::before { position: absolute; inset: 0 0 0 auto; width: calc(26cqw + 8.5cqw); background: var(--q-forest); content: ''; }
.qv--side-panel .qv-duel, .qv--side-panel .qv-ticks, .qv--side-panel .qv-timer { position: relative; z-index: 1; }
.qv--side-panel .qv-duel { display: flex; flex-direction: column; align-items: stretch; justify-self: stretch; gap: 1.4cqh; align-self: start; margin-top: 4cqh; }
.qv--side-panel .qv-duel > i { display: none; }
.qv--side-panel .qv-team, .qv--side-panel .qv-team--two { flex-direction: row; justify-content: space-between; border-bottom: 1px solid var(--q-line); padding-bottom: 1.2cqh; }
.qv--side-panel .qv-team span { order: 1; }
.qv--side-panel .qv-team small { position: static; order: 2; margin-right: auto; border-radius: 999px; background: var(--q-accent); color: var(--q-ink); padding: .3rem .5rem; line-height: 1; }
.qv--side-panel .qv-team strong { order: 3; margin-left: auto; }
.qv--side-panel .qv-team strong { font-size: 6cqh; }
.qv--side-panel .qv-ticks { display: block; align-self: start; }
.qv--side-panel .qv-ticks i { width: auto; flex: 1; }
.qv--side-panel .qv-meta-progress { display: none; }
.qv--side-panel .qv-timer { width: 100%; align-self: end; }
.qv--side-panel .qv-answers { grid-template-columns: 1fr 1fr; }
.qv--side-panel .qv-nav span { border-color: rgb(251 248 237 / 30%); }
.qv--side-panel .qv-copy h2.qv-question--s { font-size: min(6cqw, 10cqh); }
.qv--side-panel .qv-copy h2.qv-question--xl { font-size: min(3cqw, 5.2cqh); }

/* Q5 / Progress ticks: the header shows how far the game has come; the turn gets its own line. */
.qv--progress-ticks .qv-grid { grid-template-rows: auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand ticks nav" "duel duel duel" "copy copy timer" "answers answers answers" "foot foot foot"; }
.qv--progress-ticks .qv-ticks { display: block; text-align: center; }
.qv--progress-ticks .qv-meta-progress { display: none; }
.qv--progress-ticks .qv-duel { margin-top: 1.6cqh; }
.qv--progress-ticks .qv-team small { position: static; order: 3; border-radius: 999px; background: var(--q-accent); color: var(--q-ink); padding: .35rem .6rem; line-height: 1; }
.qv--progress-ticks .qv-team--two small { order: -1; }

/* Q6–Q9 build on Q5: ticks in the header, a badge for the team on turn, and a clock you can read across the room. */
.qv--clock-band .qv-ticks, .qv--clock-panel .qv-ticks, .qv--hero-clock .qv-ticks, .qv--draining-panel .qv-ticks { display: block; text-align: center; }
.qv--clock-band .qv-meta-progress, .qv--clock-panel .qv-meta-progress, .qv--hero-clock .qv-meta-progress, .qv--draining-panel .qv-meta-progress { display: none; }
.qv--clock-band .qv-team small, .qv--hero-clock .qv-team small { position: static; order: 3; border-radius: 999px; background: var(--q-accent); color: var(--q-ink); padding: .35rem .6rem; line-height: 1; }
.qv--clock-band .qv-team--two small, .qv--hero-clock .qv-team--two small { order: -1; }

/* Q6 / Clock band: Q3's full-width question, with the band ending in a big number. */
.qv--clock-band .qv-grid { grid-template-rows: auto auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand ticks nav" "duel duel duel" "timer timer timer" "copy copy copy" "answers answers answers" "foot foot foot"; row-gap: 2cqh; }
.qv--clock-band .qv-duel { margin-top: 1cqh; }
.qv--clock-band .qv-timer { display: grid; width: 100%; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "bar num" "actions num"; align-items: center; gap: .6cqh 2.4cqw; }
.qv--clock-band .qv-timer-label { display: none; }
.qv--clock-band .qv-timer > i { grid-area: bar; align-self: end; height: 1.6cqh; margin: 0; border-radius: 99px; }
.qv--clock-band .qv-timer-actions { grid-area: actions; align-self: start; margin: 0; }
.qv--clock-band .qv-timer strong { grid-area: num; margin: 0; font-size: min(10cqw, 15cqh); }
.qv--clock-band .qv-copy h2 { max-width: 26ch; }
.qv--clock-band .qv-copy h2.qv-question--s { max-width: 18ch; font-size: min(6.4cqw, 9cqh); }
.qv--clock-band .qv-copy h2.qv-question--xl { max-width: 34ch; font-size: min(3.5cqw, 5cqh); }
.qv--clock-band .qv-option { min-height: 8.6cqh; }

/* Q7 / Clock panel: Q4's status column, the clock fills the lower half of it. */
.qv--clock-panel .qv-grid, .qv--draining-panel .qv-grid { grid-template-columns: minmax(0, 1fr) 30cqw; grid-template-rows: auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand nav" "copy duel" "copy timer" "answers timer" "foot timer"; column-gap: 7cqw; }
.qv--clock-panel .qv-grid::before, .qv--draining-panel .qv-grid::before { position: absolute; inset: 0 0 0 auto; width: calc(30cqw + 8.5cqw); background: var(--q-forest); content: ''; }
.qv--clock-panel .qv-ticks, .qv--draining-panel .qv-ticks { grid-area: brand; justify-self: end; }
.qv--clock-panel .qv-ticks i, .qv--draining-panel .qv-ticks i { width: 2.4cqw; }
.qv--clock-panel .qv-ticks span, .qv--draining-panel .qv-ticks span { text-align: right; }
.qv--clock-panel .qv-duel, .qv--clock-panel .qv-timer, .qv--draining-panel .qv-duel, .qv--draining-panel .qv-timer { position: relative; z-index: 1; }
.qv--clock-panel .qv-duel, .qv--draining-panel .qv-duel { display: flex; flex-direction: column; align-items: stretch; justify-self: stretch; gap: 1.6cqh; align-self: start; margin-top: 3cqh; }
.qv--clock-panel .qv-duel > i, .qv--draining-panel .qv-duel > i { display: none; }
.qv--clock-panel .qv-team, .qv--draining-panel .qv-team { flex-direction: row; justify-content: flex-start; border-bottom: 1px solid var(--q-line); padding-bottom: 1.4cqh; }
.qv--clock-panel .qv-team span, .qv--draining-panel .qv-team span { order: 1; }
.qv--clock-panel .qv-team small, .qv--draining-panel .qv-team small { position: static; order: 2; border-radius: 999px; background: var(--q-accent); color: var(--q-ink); padding: .3rem .5rem; line-height: 1; }
.qv--clock-panel .qv-team strong, .qv--draining-panel .qv-team strong { order: 3; margin-left: auto; font-size: 6.4cqh; }
.qv--clock-panel .qv-timer, .qv--draining-panel .qv-timer { width: 100%; align-self: end; }
.qv--clock-panel .qv-timer strong, .qv--draining-panel .qv-timer strong { font-size: min(14cqw, 27cqh); letter-spacing: -.07em; }
.qv--clock-panel .qv-timer > i, .qv--draining-panel .qv-timer > i { height: 1.2cqh; border-radius: 99px; }
.qv--clock-panel .qv-copy h2.qv-question--s, .qv--draining-panel .qv-copy h2.qv-question--s { font-size: min(5.6cqw, 10cqh); }
.qv--clock-panel .qv-copy h2.qv-question--xl, .qv--draining-panel .qv-copy h2.qv-question--xl { font-size: min(2.9cqw, 5.2cqh); }
.qv--clock-panel .qv-option-copy, .qv--draining-panel .qv-option-copy { font-size: min(1.9cqw, 3.4cqh); }
.qv--clock-panel .qv-nav span, .qv--draining-panel .qv-nav span { border-color: rgb(251 248 237 / 30%); }

/* Q8 / Hero clock: Q5's layout, the clock column doubles and reads as a second headline. */
.qv--hero-clock .qv-grid { grid-template-columns: minmax(0, 1fr) auto 30cqw; grid-template-rows: auto auto minmax(0, 1fr) auto auto; grid-template-areas: "brand ticks nav" "duel duel duel" "copy copy timer" "answers answers answers" "foot foot foot"; }
.qv--hero-clock .qv-duel { margin-top: 1.6cqh; }
.qv--hero-clock .qv-timer { width: 100%; border-left: 1px solid var(--q-line); padding-left: 3cqw; }
.qv--hero-clock .qv-timer strong { font-size: min(15cqw, 29cqh); letter-spacing: -.07em; }
.qv--hero-clock .qv-timer > i { height: 1.2cqh; border-radius: 99px; }
.qv--hero-clock .qv-copy h2.qv-question--s { font-size: min(5.4cqw, 10cqh); }
.qv--hero-clock .qv-copy h2.qv-question--xl { font-size: min(2.9cqw, 5.2cqh); }

/* Q9 / Draining panel: Q7, but the panel colour is the countdown and sinks as time runs out. */
.qv--draining-panel .qv-grid::before { background: color-mix(in srgb, var(--q-forest) 45%, var(--q-ink)); }
.qv--draining-panel .qv-grid { overflow: hidden; }
.qv--draining-panel .qv-grid::after { position: absolute; top: 0; right: 0; width: calc(30cqw + 8.5cqw); height: 100%; border-top: 2px solid var(--q-accent); background: var(--q-forest); content: ''; transform: translateY(calc((1 - var(--q-progress, .78)) * 100%)); transition: transform 1s linear, background 300ms ease; }
.qv--draining-panel.qv--warning .qv-grid::after { border-top-color: var(--q-coral); background: color-mix(in srgb, var(--q-coral) 34%, var(--q-ink)); }
.qv--draining-panel .qv-timer > i { display: none; }
.qv--draining-panel .qv-brand, .qv--draining-panel .qv-nav { z-index: 2; }

/* K2 / Versus grain: the Paper grain gradient sits behind the light field's copy. */
.setup-v--versus-grain .setup-v-copy { position: relative; isolation: isolate; overflow: hidden; }
.setup-v--versus-grain .setup-v-copy > :not(.setup-grain) { position: relative; z-index: 1; }
.setup-grain { position: absolute; inset: 0; z-index: 0; }
.setup-v--grain-dark .setup-v-copy, .setup-v--grain-dark .setup-v-copy .split-field-wordmark, .setup-v--grain-dark .setup-v-copy h2 { color: var(--split-cream); }
.setup-v--grain-dark .setup-v-copy h2 em { color: var(--split-accent); }
.setup-v--grain-dark .setup-v-copy p { color: color-mix(in srgb, var(--split-cream) 80%, transparent); }
.grain-group { margin-top: .9rem; }
.grain-group-title { margin: 0; color: var(--lab-muted); font-size: .62rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.grain-option { grid-template-columns: auto 1fr; align-items: center; }
.grain-swatch { display: flex; overflow: hidden; border: 1px solid var(--lab-line); border-radius: 4px; }
.grain-swatch i { width: .7rem; height: 1.6rem; }

/* L / Stepper card: one card, no inner borders doubled, steppers instead of tabs + picker */
.setup-l-card { border: 1px solid var(--split-line); border-radius: 16px; background: color-mix(in srgb, var(--split-ink) 30%, transparent); padding: 1.6rem; }
.setup-l-teams { display: grid; gap: .6rem; }
.setup-l-teams label { display: grid; gap: .35rem; border-radius: 10px; background: color-mix(in srgb, var(--split-cream) 7%, transparent); padding: .8rem 1rem .7rem; transition: box-shadow 160ms ease; }
.setup-l-teams label:focus-within { box-shadow: inset 0 0 0 1px var(--split-accent); }
.setup-l-teams input { font-size: clamp(1.3rem, 2.6cqi, 2rem); }
.setup-l-steppers { display: grid; grid-template-columns: 1fr 1fr 1.25fr; gap: 1.1rem; margin-top: 1.6rem; border-top: 1px solid var(--split-line); }
.setup-l-stepper { display: grid; min-width: 0; gap: .5rem; padding-top: 1.1rem; }
.setup-l-stepper strong { font-family: var(--font-display); font-size: clamp(1.3rem, 2.7cqi, 2.1rem); font-weight: 600; letter-spacing: -.02em; line-height: 1; white-space: nowrap; }
.setup-l-stepper > div { display: flex; gap: .3rem; }
.setup-l-stepper button { display: grid; min-width: 0; height: 40px; flex: 1; place-items: center; border: 1px solid var(--split-line); border-radius: 8px; background: transparent; color: var(--split-cream); cursor: pointer; transition: background 160ms ease, color 160ms ease; }
.setup-l-stepper button:hover { border-color: var(--split-accent); background: var(--split-accent); color: var(--split-ink); }

/* M / Two blocks: teams, then rules, with clear separation */
.setup-m { gap: 2.4rem; }
.setup-m-block { display: grid; gap: .3rem; }
.setup-m-block h3 { margin: 0 0 .6rem; color: var(--split-accent); }
.setup-m-block label { display: grid; grid-template-columns: 6rem minmax(0, 1fr); align-items: center; gap: 1rem; min-height: 60px; border-bottom: 1px solid var(--split-line); }
.setup-m-block label:focus-within { border-bottom-color: var(--split-accent); }
.setup-m-block input { font-size: clamp(1.2rem, 2.4cqi, 1.8rem); }
.setup-m-row { display: grid; grid-template-columns: 6rem minmax(0, 1fr); align-items: center; gap: 1rem; padding: .35rem 0; }
.setup-m .setup-v-action { margin-top: 0; }

/* N / Split duty: rules move to the light field, right side only names and start */
.setup-v--split-duty .setup-v-copy { gap: 2.4cqi; }
.setup-v--split-duty .setup-v-copy h2 { font-size: clamp(4.2rem, 11.6cqi, 11.5rem); }
.setup-n-rules { display: grid; border-top: 1px solid color-mix(in srgb, var(--split-ink) 24%, transparent); }
.setup-n-row { display: grid; grid-template-columns: 5.4rem minmax(0, 1fr); align-items: center; gap: .8rem; border-bottom: 1px solid color-mix(in srgb, var(--split-ink) 14%, transparent); padding: .45rem 0; }
.setup-n-row > span { color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .66rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.setup-n-row button { min-height: 44px; border: 0; border-radius: 10px; background: transparent; color: var(--split-ink); cursor: pointer; font-size: .85rem; font-weight: 600; transition: background 160ms ease, color 160ms ease; }
.setup-n-row button:hover { background: color-mix(in srgb, var(--split-ink) 8%, transparent); }
.setup-n-row button.is-on { background: var(--split-ink); color: var(--split-leaf); }
.setup-n { gap: 0; }
.setup-n-team { display: grid; gap: .6rem; border-bottom: 1px solid var(--split-line); padding: 1.6rem 0 1.1rem; }
.setup-n-team:focus-within { border-bottom-color: var(--split-accent); }
.setup-n-team input { font-size: clamp(2rem, 4.8cqi, 3.8rem); line-height: 1; }

@container (max-width: 700px) {
  .setup-v-grid { grid-template-columns: 1fr; }
  .setup-v-copy { gap: 2.5rem; padding: 1.6rem 1.5rem 1.8rem; }
  .setup-v-copy h2, .setup-v--split-duty .setup-v-copy h2 { font-size: clamp(4rem, 21cqi, 6.4rem); }
  .setup-v-copy p { margin-top: 1.4rem; font-size: 1.15rem; }
  .setup-v-side { padding: 1.8rem 1.5rem 2rem; }
  .setup-j-team input, .setup-n-team input { font-size: 1.8rem; }
  .setup-k-team input, .setup-v--versus-centered .setup-k-team input { font-size: 2.1rem; }
  .setup-v--versus-centered .setup-k-vs b { font-size: 3.6rem; }
  .setup-j-row, .setup-m-row, .setup-m-block label { grid-template-columns: 1fr; gap: .45rem; }
  .setup-m-block label { padding: .6rem 0; }
  .setup-l-steppers { grid-template-columns: 1fr; }
  .setup-l-steppers { gap: 0; }
  .setup-l-stepper { grid-template-columns: 1fr auto 6.5rem; align-items: center; padding: .8rem 0; }
  .setup-l-stepper + .setup-l-stepper { border-top: 1px solid var(--split-line); }
}

@media (max-width: 900px) {
  .lab-intro { align-items: flex-start; }
  .lab-intro-stamp { margin-top: .4rem; }
  .lab-workbench { grid-template-columns: 1fr; }
  .variant-rail { position: static; }
  .variant-list { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: .5rem; border: 0; }
  .variant-picker { min-height: 88px; display: block; border: 1px solid var(--lab-line); padding: .7rem; }
  .variant-picker:hover, .variant-picker--active { padding: .7rem; }
  .variant-picker-copy { display: block; margin-top: .4rem; }
  .variant-picker-copy small { display: none; }
  .variant-arrow { display: none; }
  .variant-hint { display: none; }
  .preview-frame, .study, .preview-frame--setup { min-height: 610px; }
  .study-split-field { min-height: 610px; }
  .split-field-copy { min-height: 610px; }
}

@media (max-width: 640px) {
  .lab-header { min-height: 64px; }
  .lab-header-meta > span:not(.lab-live-dot), .lab-header-rule { display: none; }
  .lab-back { font-size: .65rem; }
  .lab-intro { display: block; padding: 3.5rem 0 2.5rem; }
  .lab-intro h1 { font-size: clamp(3.6rem, 18vw, 6rem); }
  .lab-intro-stamp { width: max-content; margin-top: 2rem; }
  .screen-switcher { grid-template-columns: 1fr; }
  .screen-tab { min-height: 65px; border-right: 0; border-bottom: 1px solid var(--lab-line); }
  .screen-tab:last-child { border-bottom: 0; }
  .variant-list { grid-template-columns: repeat(4, minmax(56px, 1fr)); }
  .variant-picker { min-height: 60px; padding: .55rem .4rem; }
  .variant-picker:hover, .variant-picker--active { padding: .55rem .4rem; }
  .variant-picker-copy strong { font-size: .68rem; }
  .preview-bar { display: block; line-height: 1.7; }
  .preview-context { margin-top: .2rem; }
  .palette-dock-head { display: block; line-height: 1.5; }.palette-dock-head span:last-child { display: block; margin-top: .25rem; }.palette-grid { grid-template-columns: 1fr; }.config-variant-dock-head { display: block; line-height: 1.5; }.config-variant-dock-head span:last-child { display: block; margin-top: .25rem; }.config-variant-grid { grid-template-columns: 1fr; }
  .preview-frame, .study, .preview-frame--setup { min-height: 680px; }
  .study-split-field { min-height: 680px; }
  .study-split-field { display: block; }.split-field-copy { display: block; min-height: 405px; padding: 1.5rem; }.split-field-copy h2 { font-size: 4.6rem; }.split-field-meta { margin-top: 2rem; }.split-field-form { margin: 0; border-width: 1px 0 0; padding: 1.5rem; }.split-field-badge { min-height: 4.1rem; padding-inline: .55rem; }.split-field-badge strong { font-size: 1.35rem; }.split-field-picker { align-items: stretch; flex-direction: column; }.split-field-picker > div { width: 100%; }.split-field-matrix { grid-template-columns: 1fr; }.split-field-matrix-field + .split-field-matrix-field { border-top: 1px solid var(--split-line); border-left: 0; }
  .category-study { min-height: 680px; padding: 1.5rem; }.category-study-top { grid-template-columns: 1fr auto; }.category-study-top span:last-child { display: none; }.category-study-top > strong { text-align: right; }.category-study-top--soft-field { grid-template-columns: 1fr auto 1fr; gap: .5rem; }.category-study-top--soft-field > strong { align-self: end; text-align: center; }.category-status { column-gap: .35rem; }.category-status strong { font-size: 2.2rem; }.category-status small { display: none; }.category-status--question { justify-items: end; }.category-study-intro { display: block; margin-top: 3.2rem; }.category-study-intro h2 { max-width: 9ch; font-size: 4rem; }.category-study-intro p { margin-top: 1.2rem; }.category-surface-grid { grid-template-columns: 1fr; margin-top: 2.1rem; }.category-study--soft-field .category-surface-grid { gap: .85rem; margin-top: 3rem; }.category-surface { min-height: 6.6rem; }
  .question-board-top, .timer-top, .editorial-top { align-items: flex-start; flex-direction: column; gap: .4rem; }.question-board-top b { margin-top: .6rem; }.question-board-main { padding-top: 4rem; }.question-board-main h2 { font-size: 4rem; }.board-answers { grid-template-columns: 1fr; margin-top: 2rem; }.board-time { position: static; flex-direction: row; align-items: baseline; gap: .55rem; min-width: 0; margin-top: 2rem; border-left: 0; border-top: 1px solid var(--lab-gold); padding: .8rem 0 0; }.board-time strong { margin: 0; font-size: 4rem; }.board-time i { flex: 1; margin: 0 0 0 .5rem; }.board-time button { margin-left: .3rem; }.arena-score--one { left: 1.4rem; }.arena-score--two { right: 1.4rem; }.arena-centre { margin-top: 8.5rem; }.arena-centre h2 { font-size: 3.7rem; }.arena-actions { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.editorial-grid { display: block; min-height: 0; }.editorial-question h2 { font-size: 4rem; }.editorial-options { margin-top: 2.5rem; }.editorial-bottom { margin-top: 2rem; flex-direction: column; }.timer-layout { display: block; min-height: 0; }.timer-question h2 { margin-top: 4rem; font-size: 3.8rem; }.timer-answer-grid { grid-template-columns: 1fr; margin-top: 2rem; }.timer-giant { display: flex; align-items: baseline; flex-wrap: wrap; gap: .8rem; margin-top: 3rem; border-left: 0; border-top: 1px solid var(--lab-coral); padding: 1rem 0 0; }.timer-giant strong { font-size: 6rem; }.timer-giant i { flex: 1; min-width: 100%; order: 3; }.timer-giant button { order: 4; }.study-duel { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr; gap: 1.2rem; padding: 1.5rem; }.duel-round { grid-column: 1 / -1; grid-row: 1; order: -1; }.duel-team { grid-row: 2; }.duel-team strong { font-size: 3rem; }.duel-question { grid-row: 3; }.duel-question h2 { font-size: 3.7rem; }.duel-options { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.lab-footer { display: block; }.lab-footer p + p { margin-top: .7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .lab-page *, .lab-page *::before, .lab-page *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>
