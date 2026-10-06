<script setup lang="ts">
import { QUIZ_CATEGORIES } from '~/data/quiz-catalog'

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
  ],
  categories: [
    { id: 'soft-field', label: 'Territory grid', note: 'Sechs Kategorien / drei mal zwei', code: 'A' },
  ],
  question: [
    { id: 'live-question', label: 'Live Question', note: 'One stage / clear answer', code: 'Q' },
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

            <!-- Question studies -->
            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'live-question'" class="study question-live-stage">
              <div class="question-live-top">
                <div class="question-live-context"><span>Frage</span><strong>Zweite / Zehn Fragen</strong></div>
                <div class="question-live-active-team"><span>Ist dran</span><strong>TEAM TWO</strong><small>Antwort wählen</small></div>
                <div class="question-live-context question-live-context--round"><span>Runde</span><strong>1 / 5</strong></div>
              </div>
              <div class="question-live-scoreline"><span>TEAM ONE <strong>1</strong></span><span class="question-live-scoreline--active">TEAM TWO <strong>0</strong></span></div>
              <div class="question-live-main">
                <div class="question-live-copy"><span class="question-live-category">WTF-WISSEN</span><h2>Wie viele Herzen hat ein <em>Oktopus?</em></h2></div>
                <aside class="question-live-timer"><span class="question-live-timer-label">Noch Zeit</span><strong>43</strong><span class="question-live-timer-unit">Sekunden</span><i aria-hidden="true"><b style="transform: scaleX(.78)" /></i><div class="question-live-timer-actions"><button @click="timerPaused = !timerPaused">{{ timerPaused ? 'Weiter' : 'Pause' }}</button><button>Reset</button></div></aside>
              </div>
              <div class="question-live-answers" aria-label="Antwortmöglichkeiten"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" class="question-live-option" :class="{ 'question-live-option--wrong': selectedAnswer === index }" @click="chooseAnswer(index)"><span class="question-live-option-letter">{{ ['A', 'B', 'C', 'D'][index] }}</span><span class="question-live-option-copy">{{ answer }}</span></button></div>
              <div class="question-live-foot"><button class="question-live-action" @click="timerPaused = !timerPaused">Antwort zeigen <span>A</span></button><p class="question-live-hint">Wähle A, B, C oder D</p></div>
            </div>
          </div>

          <div class="preview-footer">
            <span><b class="preview-dot preview-dot--gold" /> Click the specimen to feel the flow</span>
            <span class="preview-footer-key">{{ activeVariant.code }} / {{ activeVariant.label.toUpperCase() }}</span>
          </div>

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

          <section v-if="activeScreen === 'setup' && activeVariant.id === 'split-field'" class="palette-dock" aria-label="Farbpaletten für Split field">
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
