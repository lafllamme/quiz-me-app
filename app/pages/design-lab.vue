<script setup lang="ts">
type ScreenKey = 'setup' | 'categories' | 'question'

type Variant = {
  id: string
  label: string
  note: string
  code: string
}

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
    { id: 'monogram', label: 'Jungle mark', note: 'Big wordmark / clear teams', code: 'F' },
    { id: 'green-signal', label: 'Green signal', note: 'One green field / enter clean', code: 'G' },
    { id: 'quiet-room', label: 'Quiet room', note: 'Less copy / more breath', code: 'H' },
    { id: 'split-field', label: 'Split field', note: 'Light left / dark right', code: 'I' },
    { id: 'host-rail', label: 'Host rail', note: 'Setup as a control station', code: 'J' },
    { id: 'press-card', label: 'Press card', note: 'One sheet / one decision', code: 'K' },
    { id: 'low-slung', label: 'Low slung', note: 'Headline high / action low', code: 'L' },
    { id: 'flap', label: 'Split-flap', note: 'Live board / arrival energy', code: 'A' },
    { id: 'orbit', label: 'Orbit', note: 'Game table / centre pull', code: 'B' },
    { id: 'poster', label: 'Poster', note: 'Big type / one decisive action', code: 'C' },
    { id: 'signal', label: 'Signal', note: 'Host rail / player focus', code: 'D' },
    { id: 'ticket', label: 'Ticket', note: 'Night pass / compact setup', code: 'E' },
  ],
  categories: [
    { id: 'route', label: 'Route map', note: 'Trace the next move', code: 'A' },
    { id: 'index', label: 'Index spread', note: 'Fast scan / clear stakes', code: 'B' },
    { id: 'stack', label: 'Stacked field', note: 'One loud choice at a time', code: 'C' },
    { id: 'constellation', label: 'Constellation', note: 'Loose map / social pull', code: 'D' },
    { id: 'dial', label: 'Category dial', note: 'Pick by instinct', code: 'E' },
  ],
  question: [
    { id: 'board', label: 'Question board', note: 'Options as a live board', code: 'A' },
    { id: 'arena', label: 'Arena', note: 'Score at the edge / focus centre', code: 'B' },
    { id: 'editorial', label: 'Editorial', note: 'Quiet confidence / clean read', code: 'C' },
    { id: 'timer', label: 'Timer first', note: 'Urgency becomes the layout', code: 'D' },
    { id: 'duel', label: 'Duel', note: 'Two teams / one answer', code: 'E' },
  ],
}

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
const selectedPalette = ref(0)

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
          <p class="lab-lede">Drei Screens. {{ totalStudies }} Designstudien. Wähle die Richtung, die sich für eure Runde richtig anfühlt.</p>
        </div>
        <div class="lab-intro-stamp" :aria-label="`${totalStudies} design studies`">
          <span class="stamp-number">{{ totalStudies }}</span>
          <span class="stamp-copy">studies<br>in play</span>
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

            <!-- Setup studies -->
            <div v-if="activeScreen === 'setup' && activeVariant.id === 'monogram'" class="study study-monogram">
              <div class="monogram-brand">JUNGLE <span>/</span> QUIZ</div>
              <div class="monogram-topline"><span>Player setup</span><span>Ready when you are</span></div>
              <div class="monogram-content">
                <div class="monogram-headline">
                  <h2>Who's<br><em>playing?</em></h2>
                  <p>Name your teams. We'll handle the rest.</p>
                </div>
                <div class="monogram-team-list">
                  <label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"><b>01</b></label>
                  <label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"><b>02</b></label>
                  <button class="study-action study-action--gold" @click="chooseScreen('categories')">Enter the jungle <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button>
                </div>
              </div>
              <div class="monogram-footer"><span>5 rounds · 45 sec · 4 territories</span></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'green-signal'" class="study study-green-signal">
              <div class="green-signal-brand">JUNGLE <span>/</span> QUIZ</div>
              <div class="green-signal-grid">
                <div class="green-signal-copy"><h2>Make<br>your<br><em>entrance.</em></h2><p>Two teams. Four categories. One chance to steal.</p></div>
                <div class="green-signal-form">
                  <div class="green-signal-label"><span>Players</span><span>Ready when you are</span></div>
                  <label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"><i>01</i></label>
                  <label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"><i>02</i></label>
                  <button class="study-action study-action--cream" @click="chooseScreen('categories')">Enter <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button>
                </div>
              </div>
              <div class="green-signal-footer"><span>JQ / start</span><span>5 rounds · 45 sec</span></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'quiet-room'" class="study study-quiet-room">
              <div class="quiet-room-top"><span>JUNGLE <i>/</i> QUIZ</span><span>01 / SETUP</span></div>
              <div class="quiet-room-layout">
                <div class="quiet-room-copy"><span class="mini-kicker">Player setup</span><h2>Who's<br><em>playing?</em></h2><p>Two teams. One room.</p></div>
                <div class="quiet-room-form"><div class="quiet-room-form-head"><span>Players</span><span>Ready when you are</span></div><label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"><b>01</b></label><label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"><b>02</b></label><button class="study-action study-action--gold" @click="chooseScreen('categories')">Continue <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div>
              </div>
              <div class="quiet-room-foot">5 rounds · 45 sec · 4 territories</div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'split-field'" class="study study-split-field" :style="splitFieldPaletteStyle">
              <div class="split-field-copy"><div class="split-field-wordmark">JUNGLE <span>/</span> QUIZ</div><span class="mini-kicker">01 / Player setup</span><h2>Who's<br><em>playing?</em></h2><p>Name your teams, then open the room.</p><div class="split-field-meta"><span>5 rounds</span><span>45 sec</span><span>4 territories</span></div></div>
              <div class="split-field-form"><div class="split-field-head"><span>Players</span><span>Ready when you are</span></div><label><span>01 / Team one</span><input v-model="setupNames.one" aria-label="Name Team One"></label><label><span>02 / Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"></label><button class="study-action study-action--cream" @click="chooseScreen('categories')">Enter the jungle <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'host-rail'" class="study study-host-rail">
              <div class="host-rail-spine"><strong>JQ</strong><span>01<br>/ 03</span><i>SETUP</i></div>
              <div class="host-rail-copy"><div class="host-rail-top"><span>Player setup</span><span>Ready when you are</span></div><h2>Who's<br><em>playing?</em></h2><p>Give your teams a name. The rest can wait.</p><div class="host-rail-stats"><span>5 rounds</span><span>45 seconds</span><span>4 territories</span></div></div>
              <div class="host-rail-form"><label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"><b>01</b></label><label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"><b>02</b></label><button class="study-action study-action--leaf" @click="chooseScreen('categories')">Choose territory <Icon name="lucide:arrow-right" size="16" aria-hidden="true" /></button></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'press-card'" class="study study-press-card">
              <div class="press-card-top"><span>JUNGLE <i>/</i> QUIZ</span><span>START / 01</span></div>
              <div class="press-card-layout"><div class="press-card-mark">JQ<span>02<br>TEAMS</span></div><div class="press-card-copy"><span class="mini-kicker">The room is yours</span><h2>Who's<br><em>playing?</em></h2><p>Name both teams. Then make the first move.</p></div><div class="press-card-form"><label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"></label><label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"></label><button class="study-action study-action--gold" @click="chooseScreen('categories')">Let's play <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div></div>
              <div class="press-card-foot"><span>5 rounds · 45 sec · 4 territories</span><span>JQ / START</span></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'low-slung'" class="study study-low-slung">
              <div class="low-slung-top"><span>JUNGLE <i>/</i> QUIZ</span><span>PLAYER SETUP</span><span>READY WHEN YOU ARE</span></div>
              <div class="low-slung-copy"><h2>Who's <em>playing?</em></h2><p>Name your teams. We'll handle the rest.</p></div>
              <div class="low-slung-bar"><div class="low-slung-inputs"><label><span>01 / Team one</span><input v-model="setupNames.one" aria-label="Name Team One"></label><label><span>02 / Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"></label></div><button class="study-action study-action--gold" @click="chooseScreen('categories')">Enter <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div>
              <div class="low-slung-foot"><span>5 rounds · 45 sec · 4 territories</span><span>Two teams. One room.</span></div>
            </div>

            <div v-if="activeScreen === 'setup' && activeVariant.id === 'flap'" class="study study-flap">
              <div class="study-flap-title">
                <span class="mini-kicker">Birthday edition / 01</span>
                <h2>Ready when<br><em>you are.</em></h2>
                <p>Two teams. Four categories. One chance to steal.</p>
              </div>
              <div class="flap-console">
                <div class="flap-console-head"><span>Players</span><span>Round 01 / 05</span></div>
                <label class="flap-row"><span>01</span><input v-model="setupNames.one" aria-label="Name Team One"><b>●</b></label>
                <label class="flap-row"><span>02</span><input v-model="setupNames.two" aria-label="Name Team Two"><b>●</b></label>
                <div class="flap-row flap-row--quiet"><span>03</span><span>45 seconds</span><span>↘</span></div>
                <button class="study-action study-action--gold" @click="chooseScreen('categories')">Start round <Icon name="lucide:arrow-right" size="16" aria-hidden="true" /></button>
              </div>
              <span class="flap-side-note">JQ / 2026</span>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'orbit'" class="study study-orbit">
              <div class="orbit-topline"><span>JUNGLE / QUIZ</span><span>Birthday edition · 01</span></div>
              <div class="orbit-copy">
                <p class="mini-kicker">A game for the whole table</p>
                <h2>Who gets<br><em>the first bite?</em></h2>
                <button class="orbit-start" @click="chooseScreen('categories')"><span>Play</span><Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" /></button>
              </div>
              <div class="orbit-ring" aria-hidden="true"><span>JQ</span></div>
              <div class="orbit-team orbit-team--one"><small>Team one</small><strong>{{ setupNames.one }}</strong><i>01</i></div>
              <div class="orbit-team orbit-team--two"><small>Team two</small><strong>{{ setupNames.two }}</strong><i>02</i></div>
              <p class="orbit-footer">5 rounds <span>·</span> 45 sec <span>·</span> 10 questions</p>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'poster'" class="study study-poster">
              <div class="poster-edge"><span>JUNGLE<br>/ QUIZ</span><span>PLAY<br>LOUD</span></div>
              <div class="poster-content">
                <span class="mini-kicker">The birthday edition</span>
                <h2>Welcome<br>to the<br><em>Jungle.</em></h2>
                <p class="poster-deck">Name your teams<br>and make some noise.</p>
                <div class="poster-form">
                  <label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"></label>
                  <label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"></label>
                </div>
                <button class="study-action study-action--cream" @click="chooseScreen('categories')">Let’s play <Icon name="lucide:arrow-right" size="16" aria-hidden="true" /></button>
              </div>
              <div class="poster-spec"><span>2 teams</span><span>5 rounds</span><span>45 sec</span></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'signal'" class="study study-signal">
              <div class="signal-rail"><span class="signal-mark">JQ</span><span>01 / 03</span><span class="signal-vertical">SETUP</span></div>
              <div class="signal-main">
                <div class="signal-header"><span class="mini-kicker">Host station</span><span>Sound on&nbsp; ◖</span></div>
                <h2>Set the<br><em>scene.</em></h2>
                <p>Give your teams a name. The rest can wait.</p>
                <div class="signal-fields">
                  <label><span>Team 01</span><input v-model="setupNames.one" aria-label="Name Team One"></label>
                  <label><span>Team 02</span><input v-model="setupNames.two" aria-label="Name Team Two"></label>
                </div>
                <button class="study-action study-action--leaf" @click="chooseScreen('categories')">Choose territory <Icon name="lucide:arrow-right" size="16" aria-hidden="true" /></button>
              </div>
              <div class="signal-bottom"><span>Rounds <strong>05</strong></span><span>Time <strong>45″</strong></span><span>Questions <strong>10</strong></span></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'ticket'" class="study study-ticket">
              <div class="ticket-top"><span class="mini-kicker">Admit two</span><span class="ticket-serial">NO. 0001</span></div>
              <div class="ticket-main">
                <div class="ticket-wordmark">JUNGLE<span>/</span>QUIZ</div>
                <h2>Tonight’s<br><em>entertainment</em></h2>
                <div class="ticket-inputs">
                  <label><span>Team one</span><input v-model="setupNames.one" aria-label="Name Team One"></label>
                  <label><span>Team two</span><input v-model="setupNames.two" aria-label="Name Team Two"></label>
                </div>
              </div>
              <div class="ticket-stub"><span>5<br><small>rounds</small></span><span>45<br><small>seconds</small></span><button @click="chooseScreen('categories')">Enter <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div>
            </div>

            <!-- Category studies -->
            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'route'" class="study study-route">
              <div class="route-head"><div><span class="mini-kicker">Team two chooses</span><h2>Pick your<br><em>territory.</em></h2></div><div class="route-score"><strong>01</strong><span>round / 05</span></div></div>
              <div class="route-map">
                <div class="route-line route-line--one" aria-hidden="true"><i /><i /><i /><i /></div>
                <div class="route-line route-line--two" aria-hidden="true"><i /><i /><i /><i /></div>
                <button v-for="(category, index) in ['WTF-WISSEN', 'SERIEN', 'FILME', 'MEMES']" :key="category" class="route-stop" :class="{ 'route-stop--active': selectedCategory === category }" @click="chooseCategory(category)"><span>0{{ index + 1 }}</span><strong>{{ category }}</strong><Icon name="lucide:arrow-up-right" size="15" aria-hidden="true" /></button>
              </div>
              <p class="route-foot">The chosen line lights up. There is no wrong turn.</p>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'index'" class="study study-index">
              <div class="index-header"><span class="mini-kicker">Round 01 / Category index</span><span>Team two is choosing</span></div>
              <h2>What do<br>you know <em>best?</em></h2>
              <div class="index-list">
                <button v-for="(category, index) in ['WTF-WISSEN', 'SERIEN', 'FILME', 'MEMES']" :key="category" :class="{ 'index-row--active': selectedCategory === category }" class="index-row" @click="chooseCategory(category)"><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ category }}</strong><small>{{ ['the odd stuff', 'screen time', 'big feelings', 'internet archaeology'][index] }}</small><Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" /></button>
              </div>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'stack'" class="study study-stack">
              <div class="stack-top"><span class="mini-kicker">Your move / Team two</span><span>JQ · 01—05</span></div>
              <h2>Choose<br><em>a lane.</em></h2>
              <div class="stack-field">
                <button v-for="(category, index) in ['WTF-WISSEN', 'SERIEN', 'FILME', 'MEMES']" :key="category" class="stack-row" :class="{ 'stack-row--active': selectedCategory === category }" @click="chooseCategory(category)"><span>{{ ['odd facts', 'long nights', 'plot twists', 'deep scrolls'][index] }}</span><strong>{{ category }}</strong><i>0{{ index + 1 }}</i></button>
              </div>
              <p class="stack-note">Hover is a hint. Click is a commitment.</p>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'constellation'" class="study study-constellation">
              <div class="constellation-header"><span class="mini-kicker">A social map of things you know</span><strong>ROUND 01</strong></div>
              <h2>Find your<br><em>strange corner.</em></h2>
              <div class="constellation-space">
                <span class="star star--one" aria-hidden="true" /><span class="star star--two" aria-hidden="true" /><span class="star star--three" aria-hidden="true" />
                <svg viewBox="0 0 500 250" aria-hidden="true"><path d="M35 188 150 62 290 188 430 56" /><path d="M150 62 370 218" /></svg>
                <button v-for="(category, index) in ['WTF-WISSEN', 'SERIEN', 'FILME', 'MEMES']" :key="category" class="constellation-node" :class="`constellation-node--${index + 1}`" :aria-label="`Kategorie ${category}`" @click="chooseCategory(category)"><small>0{{ index + 1 }}</small><strong>{{ category }}</strong></button>
              </div>
              <p class="constellation-foot">{{ selectedCategory || 'Pick a star. Make it yours.' }}</p>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'dial'" class="study study-dial">
              <div class="dial-top"><span class="mini-kicker">Team two is up</span><span>01 / 05</span></div>
              <div class="dial-layout">
                <div class="dial-copy"><h2>Trust<br>your <em>gut.</em></h2><p>Every category is a different kind of trouble.</p><button class="study-action study-action--gold" @click="chooseCategory('WTF-WISSEN')">Spin the room <Icon name="lucide:rotate-cw" size="15" aria-hidden="true" /></button></div>
                <div class="dial-wheel" role="group" aria-label="Kategorien">
                  <button v-for="(category, index) in ['WTF-WISSEN', 'SERIEN', 'FILME', 'MEMES']" :key="category" class="dial-node" :class="{ 'dial-node--active': selectedCategory === category }" :style="{ '--dial-angle': `${index * 90 - 45}deg` }" @click="chooseCategory(category)">{{ category }}</button><span class="dial-centre">PICK<br><small>ONE</small></span>
                </div>
              </div>
            </div>

            <!-- Question studies -->
            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'board'" class="study study-question-board">
              <div class="question-board-top"><span class="mini-kicker">WTF-WISSEN / Frage</span><span>Round 01 · Frag 02 / 10</span><b>TEAM TWO IST DRAN</b></div>
              <div class="question-board-main"><h2>Wie viele Herzen hat ein <em>Oktopus?</em></h2><div class="board-answers"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" :class="{ 'answer-chip--selected': selectedAnswer === index }" class="answer-chip" @click="chooseAnswer(index)"><span>{{ ['A', 'B', 'C', 'D'][index] }}</span>{{ answer }}</button></div></div>
              <aside class="board-time"><small>Noch Zeit</small><strong>43</strong><span>Sekunden</span><i><b /></i><button @click="timerPaused = !timerPaused">{{ timerPaused ? 'Weiter' : 'Pause' }}</button></aside>
            </div>

            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'arena'" class="study study-arena">
              <div class="arena-score arena-score--one"><small>{{ setupNames.one }}</small><strong>1</strong><span>points</span></div>
              <div class="arena-score arena-score--two"><small>{{ setupNames.two }}</small><strong>0</strong><span>points</span></div>
              <div class="arena-centre"><div class="arena-status"><span class="live-pip" /> team two is answering</div><span class="mini-kicker">WTF-WISSEN / 02</span><h2>Wie viele Herzen<br>hat ein <em>Oktopus?</em></h2><div class="arena-actions"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" :class="{ 'arena-answer--selected': selectedAnswer === index }" @click="chooseAnswer(index)"><span>{{ ['A', 'B', 'C', 'D'][index] }}</span>{{ answer }}</button></div></div>
              <div class="arena-time"><strong>43</strong><span>sec left</span></div>
            </div>

            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'editorial'" class="study study-editorial">
              <div class="editorial-top"><span class="mini-kicker">Question 02 / 10</span><span>Category <strong>WTF-WISSEN</strong></span><span>Team two →</span></div>
              <div class="editorial-grid"><div class="editorial-question"><span class="editorial-number">02</span><h2>Wie viele<br>Herzen hat<br>ein <em>Oktopus?</em></h2><p>Take a breath. Pick your answer.</p></div><div class="editorial-options"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" :class="{ 'editorial-option--selected': selectedAnswer === index }" @click="chooseAnswer(index)"><span>{{ ['A', 'B', 'C', 'D'][index] }}</span><strong>{{ answer }}</strong><Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div></div>
              <div class="editorial-bottom"><span>Team two is answering</span><span class="editorial-timer"><i :class="{ 'editorial-timer--paused': timerPaused }" /><b>43</b> seconds remaining</span></div>
            </div>

            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'timer'" class="study study-timer">
              <div class="timer-top"><span class="mini-kicker">Question / 02</span><span>WTF-WISSEN</span><span>Team two answers</span></div>
              <div class="timer-layout"><div class="timer-question"><h2>Wie viele Herzen<br>hat ein <em>Oktopus?</em></h2><div class="timer-answer-grid"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" :class="{ 'timer-answer--selected': selectedAnswer === index }" @click="chooseAnswer(index)"><span>{{ ['A', 'B', 'C', 'D'][index] }}</span>{{ answer }}</button></div></div><div class="timer-giant"><span>seconds</span><strong>43</strong><i><b /></i><button @click="timerPaused = !timerPaused">{{ timerPaused ? 'Resume' : 'Pause clock' }}</button></div></div>
            </div>

            <div v-else-if="activeScreen === 'question' && activeVariant.id === 'duel'" class="study study-duel">
              <div class="duel-team duel-team--one"><span>TEAM ONE</span><strong>1</strong><small>waiting</small></div><div class="duel-round"><span class="mini-kicker">Round 01 / Question 02</span><div>VS</div><small>45 seconds</small></div><div class="duel-team duel-team--two"><span>TEAM TWO</span><strong>0</strong><small>in the hot seat</small></div>
              <div class="duel-question"><span class="mini-kicker">WTF-WISSEN</span><h2>Wie viele Herzen<br>hat ein <em>Oktopus?</em></h2><div class="duel-options"><button v-for="(answer, index) in ['Eins', 'Zwei', 'Drei', 'Vier']" :key="answer" :class="{ 'duel-option--selected': selectedAnswer === index }" @click="chooseAnswer(index)"><span>{{ ['A', 'B', 'C', 'D'][index] }}</span>{{ answer }}</button></div></div>
            </div>
          </div>

          <div class="preview-footer">
            <span><b class="preview-dot preview-dot--gold" /> Click the specimen to feel the flow</span>
            <span class="preview-footer-key">{{ activeVariant.code }} / {{ activeVariant.label.toUpperCase() }}</span>
          </div>

          <section v-if="activeScreen === 'setup' && activeVariant.id === 'split-field'" class="palette-dock" aria-label="Farbpaletten für Split field">
            <div class="palette-dock-head"><span>Color directions</span><span>Applied to I / Split field</span></div>
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
.study-monogram { min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4.5rem); background: var(--lab-leaf); color: var(--lab-ink); }
.monogram-brand, .green-signal-brand { color: var(--lab-ink); font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -.035em; }
.monogram-brand span, .green-signal-brand span { color: var(--lab-jungle); }
.monogram-topline { display: flex; justify-content: space-between; margin-top: 2rem; border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .75rem; color: rgb(7 26 19 / 68%); font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.monogram-content { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(250px, .8fr); gap: clamp(2rem, 7vw, 7rem); align-items: end; margin-top: 4.5rem; }
.monogram-headline h2 { max-width: 8ch; color: var(--lab-ink); font-size: clamp(4.4rem, 8vw, 7rem); letter-spacing: -.012em; line-height: .88; }
.monogram-headline h2 em { color: var(--lab-jungle); }
.monogram-headline p { max-width: 19rem; margin-top: 1.8rem; color: rgb(7 26 19 / 70%); font-size: .86rem; }
.monogram-team-list { border: 1px solid var(--lab-ink); background: var(--lab-jungle); padding: 1.15rem; color: var(--lab-cream); }
.monogram-team-list label { display: grid; grid-template-columns: 4.5rem 1fr 1.5rem; align-items: center; gap: .7rem; min-height: 64px; border-bottom: 1px solid var(--lab-line); }
.monogram-team-list label span { color: var(--lab-gold); font-size: .62rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.monogram-team-list input { width: 100%; padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.monogram-team-list b { color: var(--lab-muted); font-size: .65rem; text-align: right; }
.monogram-team-list .study-action { width: 100%; margin-top: 1.4rem; }
.monogram-footer, .green-signal-footer { display: flex; gap: 1.5rem; border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .8rem; color: rgb(7 26 19 / 68%); font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }

.study-green-signal { min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4.5rem); background: var(--lab-leaf); color: var(--lab-ink); }
.green-signal-brand { color: var(--lab-ink); }
.green-signal-brand span { color: var(--lab-jungle); }
.green-signal-grid { display: grid; grid-template-columns: minmax(0, 1.03fr) minmax(290px, .72fr); gap: clamp(3rem, 8vw, 8rem); align-items: end; min-height: 500px; }
.green-signal-copy { min-width: 0; }
.green-signal-copy h2 { max-width: 8.5ch; color: var(--lab-ink); font-size: clamp(4.6rem, 8vw, 8rem); letter-spacing: -.012em; line-height: .9; }
.green-signal-copy h2 em { color: var(--lab-jungle); }
.green-signal-copy p { max-width: 18rem; margin-top: 1.8rem; color: rgb(7 26 19 / 70%); font-size: .88rem; }
.green-signal-form { align-self: end; border: 1px solid var(--lab-ink); background: var(--lab-jungle); padding: 1.2rem; color: var(--lab-cream); }
.green-signal-label { display: flex; justify-content: space-between; gap: .5rem; border-bottom: 1px solid var(--lab-line); padding-bottom: .8rem; color: var(--lab-gold); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.green-signal-form label { display: grid; grid-template-columns: 4.5rem 1fr 1.2rem; align-items: center; gap: .7rem; min-height: 64px; border-bottom: 1px solid var(--lab-line); }
.green-signal-form label span { color: var(--lab-muted); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.green-signal-form input { width: 100%; padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.green-signal-form i { color: var(--lab-gold); font-size: .65rem; font-style: normal; text-align: right; }
.green-signal-form .study-action { width: 100%; margin-top: 1.4rem; }
.green-signal-footer { border-color: rgb(7 26 19 / 32%); color: rgb(7 26 19 / 68%); }

.study-quiet-room { min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4.5rem); background: var(--lab-leaf); color: var(--lab-ink); }
.quiet-room-top, .quiet-room-foot { display: flex; justify-content: space-between; gap: 1rem; color: rgb(7 26 19 / 68%); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.quiet-room-top { border-bottom: 1px solid rgb(7 26 19 / 32%); padding-bottom: .8rem; }
.quiet-room-top i, .press-card-top i, .low-slung-top i { color: var(--lab-jungle); font-style: normal; }
.quiet-room-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(270px, .72fr); align-items: center; gap: clamp(2rem, 7vw, 7rem); min-height: 500px; }
.quiet-room-copy h2 { max-width: 8ch; margin-top: 1.2rem; color: var(--lab-ink); font-size: clamp(4.4rem, 8vw, 7rem); letter-spacing: -.012em; line-height: .88; }
.quiet-room-copy h2 em { color: var(--lab-jungle); font-style: normal; }
.quiet-room-copy p { margin-top: 1.8rem; color: rgb(7 26 19 / 70%); font-size: .9rem; }
.quiet-room-form { border: 1px solid var(--lab-ink); background: var(--lab-jungle); padding: 1.15rem; color: var(--lab-cream); }
.quiet-room-form-head, .split-field-head { display: flex; justify-content: space-between; gap: .7rem; border-bottom: 1px solid var(--lab-line); padding-bottom: .8rem; color: var(--lab-gold); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.quiet-room-form label { display: grid; grid-template-columns: 4.5rem 1fr 1.3rem; align-items: center; gap: .7rem; min-height: 64px; border-bottom: 1px solid var(--lab-line); }
.quiet-room-form label span { color: var(--lab-muted); font-size: .62rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.quiet-room-form input { width: 100%; padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.quiet-room-form b { color: var(--lab-muted); font-size: .65rem; text-align: right; }
.quiet-room-form .study-action { width: 100%; margin-top: 1.4rem; }
.quiet-room-foot { border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .8rem; }

.study-split-field { --split-ink: var(--lab-ink); --split-jungle: var(--lab-jungle); --split-leaf: var(--lab-leaf); --split-accent: var(--lab-gold); --split-cream: var(--lab-cream); --split-muted: var(--lab-muted); --split-line: var(--lab-line); display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(270px, .78fr); min-height: 665px; padding: 0; background: var(--split-jungle); }
.split-field-copy { display: flex; flex-direction: column; justify-content: space-between; min-height: 665px; background: var(--split-leaf); padding: 2rem clamp(1.5rem, 5vw, 4.5rem); color: var(--split-ink); }
.split-field-wordmark, .press-card-top, .low-slung-top { color: var(--lab-ink); font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -.035em; }
.split-field-wordmark { color: var(--split-ink); }
.split-field-wordmark span, .split-field-copy h2 em { color: var(--split-jungle); }
.split-field-copy .mini-kicker { margin-top: 5rem; color: color-mix(in srgb, var(--split-ink) 68%, transparent); }
.split-field-copy h2 { max-width: 8ch; margin-top: 1.2rem; color: var(--split-ink); font-size: clamp(4.6rem, 8vw, 7.4rem); letter-spacing: -.012em; line-height: .87; }
.split-field-copy h2 em { font-style: normal; }
.split-field-copy p { max-width: 18rem; margin-top: 1.7rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .88rem; }
.split-field-meta { display: flex; gap: 1.3rem; border-top: 1px solid color-mix(in srgb, var(--split-ink) 32%, transparent); padding-top: .8rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-form { align-self: center; margin: 2rem; border: 1px solid var(--split-line); padding: 1.15rem; color: var(--split-cream); }
.split-field-form label { display: grid; grid-template-columns: 6rem 1fr; align-items: center; gap: .7rem; min-height: 74px; border-bottom: 1px solid var(--split-line); }
.split-field-form label span { color: var(--split-accent); font-size: .62rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.split-field-form input { width: 100%; border-color: color-mix(in srgb, var(--split-cream) 42%, transparent); padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.split-field-form .study-action { width: 100%; margin-top: 1.4rem; }

.study-host-rail { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr) minmax(250px, .7fr); gap: clamp(1.5rem, 4vw, 4rem); min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4rem); background: var(--lab-jungle); }
.host-rail-spine { display: flex; flex-direction: column; align-items: center; gap: 1.1rem; border-right: 1px solid var(--lab-line); color: var(--lab-muted); padding-right: 1rem; }
.host-rail-spine strong { color: var(--lab-gold); font-family: var(--font-display); font-size: 1.4rem; }
.host-rail-spine span { font-size: .62rem; line-height: 1.4; text-align: center; }
.host-rail-spine i { margin-top: auto; color: var(--lab-gold); font-size: .6rem; font-style: normal; letter-spacing: .16em; writing-mode: vertical-rl; }
.host-rail-copy { align-self: center; }
.host-rail-top { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--lab-line); padding-top: .75rem; color: var(--lab-muted); font-size: .63rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.host-rail-copy h2 { margin-top: 5rem; font-size: clamp(4.5rem, 8vw, 7rem); letter-spacing: -.012em; }
.host-rail-copy h2 em { color: var(--lab-leaf); font-style: normal; }
.host-rail-copy p { max-width: 18rem; margin-top: 1.6rem; }
.host-rail-stats { display: flex; gap: 1.1rem; margin-top: 3rem; color: var(--lab-muted); font-size: .6rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.host-rail-form { align-self: end; border-top: 1px solid var(--lab-line); padding-top: .6rem; }
.host-rail-form label { display: grid; grid-template-columns: 4.4rem 1fr 1.2rem; align-items: center; gap: .7rem; min-height: 70px; border-bottom: 1px solid var(--lab-line); }
.host-rail-form label span { color: var(--lab-gold); font-size: .61rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.host-rail-form input { width: 100%; padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.host-rail-form b { color: var(--lab-muted); font-size: .64rem; text-align: right; }
.host-rail-form .study-action { width: 100%; margin-top: 1.4rem; }

.study-press-card { min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4.5rem); background: var(--lab-cream); color: var(--lab-ink); }
.press-card-top { display: flex; justify-content: space-between; border-bottom: 1px solid rgb(7 26 19 / 32%); padding-bottom: .8rem; font-size: clamp(1.25rem, 2.5vw, 2rem); }
.press-card-layout { display: grid; grid-template-columns: .22fr minmax(0, 1fr) minmax(220px, .68fr); align-items: end; gap: clamp(1rem, 3.5vw, 3.5rem); min-height: 500px; }
.press-card-mark { color: var(--lab-gold); font-family: var(--font-display); font-size: clamp(4rem, 8vw, 7rem); line-height: .8; }
.press-card-mark span { display: block; margin-top: 1.2rem; color: rgb(7 26 19 / 64%); font-family: var(--font-ui); font-size: .58rem; font-weight: 700; letter-spacing: .14em; line-height: 1.3; text-transform: uppercase; }
.press-card-copy .mini-kicker { color: rgb(7 26 19 / 64%); }
.press-card-copy { min-width: 0; }
.press-card-copy h2 { max-width: 8ch; margin-top: 1.2rem; color: var(--lab-ink); font-size: clamp(4rem, 7vw, 6.6rem); letter-spacing: -.012em; line-height: .87; }
.press-card-copy h2 em { color: var(--lab-jungle); font-style: normal; }
.press-card-copy p { max-width: 16rem; margin-top: 1.7rem; color: rgb(7 26 19 / 70%); font-size: .86rem; }
.press-card-form { min-width: 0; border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .7rem; }
.press-card-form label { display: grid; grid-template-columns: 4.5rem 1fr; align-items: center; gap: .7rem; min-height: 70px; border-bottom: 1px solid rgb(7 26 19 / 20%); }
.press-card-form label span { color: rgb(7 26 19 / 64%); font-size: .61rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.press-card-form input { width: 100%; border-color: rgb(7 26 19 / 34%); color: var(--lab-ink); padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.press-card-form .study-action { width: 100%; margin-top: 1.4rem; }
.press-card-foot { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .8rem; color: rgb(7 26 19 / 68%); font-size: .62rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }

.study-low-slung { min-height: 665px; padding: 2rem clamp(1.5rem, 5vw, 4.5rem); background: var(--lab-leaf); color: var(--lab-ink); }
.low-slung-top { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 1.2rem; border-bottom: 1px solid rgb(7 26 19 / 32%); padding-bottom: .8rem; font-family: var(--font-ui); font-size: .62rem; letter-spacing: .13em; text-transform: uppercase; }
.low-slung-copy { display: flex; flex-direction: column; justify-content: center; min-height: 355px; }
.low-slung-copy h2 { max-width: 10ch; color: var(--lab-ink); font-size: clamp(4.8rem, 9vw, 8.5rem); letter-spacing: -.012em; line-height: .86; }
.low-slung-copy h2 em { color: var(--lab-jungle); font-style: normal; }
.low-slung-copy p { margin-top: 1.5rem; color: rgb(7 26 19 / 70%); font-size: .9rem; }
.low-slung-bar { display: flex; align-items: end; gap: 1.4rem; border-top: 1px solid rgb(7 26 19 / 32%); padding-top: .8rem; }
.low-slung-inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); flex: 1; gap: 1.2rem; }
.low-slung-inputs label { display: grid; grid-template-columns: 5rem 1fr; align-items: center; gap: .6rem; min-height: 52px; }
.low-slung-inputs label span { color: rgb(7 26 19 / 65%); font-size: .58rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.low-slung-inputs input { width: 100%; border-color: rgb(7 26 19 / 38%); color: var(--lab-ink); padding: .5rem 0; font-size: .9rem; font-weight: 600; }
.low-slung-bar .study-action { flex: 0 0 10rem; }
.low-slung-foot { display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem; color: rgb(7 26 19 / 68%); font-size: .61rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }

.study-split-field .study-action--cream { background: var(--split-cream); color: var(--split-ink); }

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

.study-flap { display: grid; grid-template-columns: 1fr minmax(240px, .8fr); gap: clamp(2rem, 7vw, 6rem); align-items: center; padding: clamp(2rem, 7vw, 5rem); }
.study-flap-title h2 { margin-top: 1.2rem; font-size: clamp(3.5rem, 7vw, 6.6rem); }
.study-flap-title p { max-width: 18rem; margin-top: 1.7rem; }
.flap-console { border: 1px solid var(--lab-line); background: rgb(7 26 19 / 28%); padding: 1.1rem; }
.flap-console-head { display: flex; justify-content: space-between; margin-bottom: .8rem; color: var(--lab-gold); font-size: .62rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.flap-row { display: grid; grid-template-columns: 1.6rem 1fr 1rem; align-items: center; gap: .7rem; min-height: 48px; border-top: 1px solid var(--lab-line); color: var(--lab-cream); font-size: .78rem; }
.flap-row input { width: 100%; height: 36px; border: 1px solid rgb(243 238 219 / 18%); padding: .3rem .5rem; font-size: .78rem; }
.flap-row b { color: var(--lab-leaf); font-size: .55rem; }
.flap-row--quiet { grid-template-columns: 1.6rem 1fr 1rem; color: var(--lab-muted); }
.flap-console .study-action { width: 100%; margin-top: 1.1rem; }
.flap-side-note { position: absolute; right: 1.4rem; bottom: 1.3rem; color: rgb(243 238 219 / 34%); font-size: .6rem; letter-spacing: .15em; transform: rotate(-90deg); transform-origin: right top; text-transform: uppercase; }

.study-orbit { min-height: 665px; overflow: hidden; padding: 1.7rem 2rem; }
.orbit-topline, .orbit-footer { display: flex; justify-content: space-between; color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
.orbit-copy { position: absolute; z-index: 1; top: 21%; left: 12%; }
.orbit-copy h2 { margin-top: 1.2rem; }
.orbit-start { display: inline-flex; align-items: center; gap: 1.5rem; margin-top: 2rem; border: 1px solid var(--lab-gold); background: var(--lab-gold); padding: .8rem 1rem; color: var(--lab-ink); font-size: .75rem; font-weight: 700; text-transform: uppercase; }
.orbit-ring { position: absolute; top: 15%; right: 8%; display: grid; width: 310px; height: 310px; place-items: center; border: 1px solid var(--lab-gold); border-radius: 50%; color: var(--lab-gold); font-family: var(--font-display); font-size: 4.5rem; }
.orbit-ring::before, .orbit-ring::after { position: absolute; border: 1px solid rgb(223 186 100 / 30%); border-radius: 50%; content: ''; }
.orbit-ring::before { inset: 23px; }
.orbit-ring::after { inset: 58px; border-color: rgb(183 214 158 / 45%); }
.orbit-team { position: absolute; display: flex; flex-direction: column; gap: .15rem; min-width: 11rem; border-top: 1px solid var(--lab-line); padding-top: .65rem; }
.orbit-team--one { bottom: 19%; left: 10%; }.orbit-team--two { right: 10%; bottom: 19%; }
.orbit-team small, .orbit-team i { color: var(--lab-gold); font-size: .62rem; font-style: normal; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }.orbit-team strong { font-size: .85rem; }
.orbit-footer { position: absolute; right: 2rem; bottom: 1.7rem; left: 2rem; }
.orbit-footer span { color: var(--lab-gold); }

.study-poster { min-height: 665px; display: grid; grid-template-columns: 4.5rem 1fr 7rem; gap: 2rem; padding: 2.2rem; background: var(--lab-gold); color: var(--lab-ink); }
.study-poster::before { background: transparent; }
.poster-edge { display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid rgb(7 26 19 / 32%); padding-right: 1rem; font-size: .58rem; font-weight: 800; letter-spacing: .16em; line-height: 1.2; text-transform: uppercase; }
.poster-content { padding: 3rem 0 0; }.poster-content .mini-kicker { color: var(--lab-ink); }.poster-content h2 { margin-top: 1.4rem; color: var(--lab-ink); font-size: clamp(4rem, 8vw, 7rem); }.poster-content h2 em { color: var(--lab-jungle); }.poster-deck { margin: 1.5rem 0; color: rgb(7 26 19 / 70%) !important; font-size: 1.05rem; }
.poster-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 31rem; margin: 2rem 0; }.poster-form label, .signal-fields label, .ticket-inputs label { display: block; }.poster-form label span, .signal-fields label span, .ticket-inputs label span { display: block; margin-bottom: .35rem; color: rgb(7 26 19 / 62%); font-size: .62rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }.poster-form input { width: 100%; border-color: rgb(7 26 19 / 50%); color: var(--lab-ink); font-size: .82rem; font-weight: 700; }.poster-spec { display: flex; flex-direction: column; justify-content: flex-end; gap: .55rem; border-left: 1px solid rgb(7 26 19 / 32%); padding-left: 1rem; font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }.poster-content .study-action { border-color: var(--lab-ink); color: var(--lab-cream); background: var(--lab-ink); }

.study-signal { min-height: 665px; display: grid; grid-template-columns: 4rem 1fr; grid-template-rows: 1fr auto; padding: 0; }.signal-rail { display: flex; flex-direction: column; align-items: center; justify-content: space-between; border-right: 1px solid var(--lab-line); padding: 1.8rem .8rem; color: var(--lab-muted); font-size: .58rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.signal-mark { color: var(--lab-cream); font-family: var(--font-display); font-size: 1.1rem; }.signal-vertical { writing-mode: vertical-rl; transform: rotate(180deg); }.signal-main { padding: 2.6rem clamp(1.5rem, 5vw, 5rem); }.signal-header { display: flex; justify-content: space-between; color: var(--lab-muted); font-size: .65rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }.signal-header .mini-kicker { margin: 0; }.signal-main h2 { margin-top: 4rem; font-size: clamp(4rem, 8vw, 7rem); }.signal-main p { max-width: 22rem; margin: 1.5rem 0 2.4rem; }.signal-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; max-width: 31rem; margin-bottom: 2rem; }.signal-fields input { width: 100%; padding-bottom: .5rem; font-size: .9rem; font-weight: 600; }.signal-bottom { grid-column: 1 / -1; display: flex; gap: 2rem; border-top: 1px solid var(--lab-line); padding: 1rem 2.5rem; color: var(--lab-muted); font-size: .65rem; text-transform: uppercase; }.signal-bottom strong { margin-left: .3rem; color: var(--lab-cream); }

.study-ticket { min-height: 665px; display: grid; grid-template-rows: auto 1fr auto; padding: 2.2rem clamp(1.5rem, 6vw, 5rem); background: var(--lab-cream); color: var(--lab-ink); }.study-ticket::before { background: linear-gradient(160deg, transparent 0 67%, rgb(183 214 158 / 75%) 67% 77%, transparent 77%); }.ticket-top, .ticket-stub { display: flex; align-items: center; justify-content: space-between; }.ticket-top .mini-kicker { color: var(--lab-jungle); }.ticket-serial { font-size: .6rem; font-weight: 700; letter-spacing: .14em; }.ticket-main { align-self: center; }.ticket-wordmark { color: var(--lab-jungle); font-family: var(--font-display); font-size: 1rem; font-weight: 700; letter-spacing: -.04em; }.ticket-wordmark span { color: var(--lab-gold); margin: 0 .25rem; }.ticket-main h2 { max-width: 8ch; margin-top: 1.8rem; color: var(--lab-ink); font-size: clamp(3.8rem, 8vw, 7rem); }.ticket-main h2 em { color: var(--lab-jungle); }.ticket-inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 12rem)); gap: 1rem; margin-top: 2rem; }.ticket-inputs input { width: 100%; border-color: rgb(7 26 19 / 38%); color: var(--lab-ink); font-size: .82rem; font-weight: 600; }.ticket-stub { gap: 1rem; border-top: 1px dashed rgb(7 26 19 / 35%); padding-top: 1rem; color: var(--lab-jungle); font-size: .9rem; font-weight: 800; }.ticket-stub span { display: flex; align-items: baseline; gap: .3rem; }.ticket-stub small { font-size: .55rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }.ticket-stub button { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid var(--lab-ink); background: var(--lab-ink); padding: .7rem .9rem; color: var(--lab-cream); font-size: .68rem; font-weight: 700; text-transform: uppercase; }

/* Category studies */
.route-head, .index-header, .stack-top, .dial-top, .constellation-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }.route-head h2, .index-header + h2, .stack-top + h2, .dial-copy h2, .constellation-header + h2 { margin-top: 1.1rem; }.route-score { text-align: right; }.route-score strong { display: block; color: var(--lab-gold); font-family: var(--font-display); font-size: 3.7rem; line-height: .75; }.route-score span { color: var(--lab-muted); font-size: .65rem; text-transform: uppercase; }
.route-map { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; margin-top: 3.5rem; padding: 1rem; }.route-line { position: absolute; z-index: -1; border: 1px solid var(--lab-gold); border-top: 0; transform: rotate(-8deg); }.route-line--one { inset: 0 47% 0 8%; }.route-line--two { inset: 0 8% 0 47%; border-color: var(--lab-leaf); transform: rotate(8deg); }.route-line i { position: absolute; width: .7rem; height: .7rem; border: 2px solid var(--lab-gold); border-radius: 50%; background: var(--lab-jungle); }.route-line i:nth-child(1) { top: -.4rem; left: 20%; }.route-line i:nth-child(2) { top: 34%; right: -.4rem; }.route-line i:nth-child(3) { bottom: 28%; left: -.4rem; }.route-line i:nth-child(4) { right: 20%; bottom: -.4rem; }.route-stop { display: grid; grid-template-columns: 1.6rem 1fr 1rem; align-items: center; gap: .6rem; min-height: 8.2rem; border: 1px solid var(--lab-line); background: rgb(13 42 29 / 75%); padding: 1rem; color: var(--lab-cream); text-align: left; transition: background 180ms ease, transform 180ms ease, border-color 180ms ease; }.route-stop:hover, .route-stop--active { border-color: var(--lab-gold); background: var(--lab-gold); color: var(--lab-ink); transform: rotate(-1deg); }.route-stop span { align-self: start; color: var(--lab-gold); font-family: var(--font-display); }.route-stop--active span { color: var(--lab-ink); }.route-stop strong { font-family: var(--font-display); font-size: clamp(1.5rem, 3.3vw, 3rem); letter-spacing: -.05em; }.route-foot { margin-top: 1.2rem; border-top: 1px solid var(--lab-line); padding-top: 1rem; font-size: .75rem; }

.study-index { padding: clamp(2rem, 5vw, 4rem); }.index-header { color: var(--lab-muted); font-size: .66rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.index-header .mini-kicker { margin: 0; }.study-index > h2 { margin: 3.5rem 0 2.5rem; font-size: clamp(3.4rem, 7vw, 7rem); }.index-list { border-top: 1px solid var(--lab-line); }.index-row { display: grid; grid-template-columns: 2rem minmax(0, 1fr) minmax(8rem, .8fr) 1rem; align-items: center; gap: 1rem; width: 100%; min-height: 70px; border: 0; border-bottom: 1px solid var(--lab-line); background: transparent; color: var(--lab-cream); padding: .5rem 0; text-align: left; transform: translateX(0); transition: transform 160ms ease, color 160ms ease, background 160ms ease; }.index-row:hover, .index-row--active { background: var(--lab-forest); color: var(--lab-cream); transform: translateX(8px); }.index-row > span { color: var(--lab-gold); font-size: .75rem; }.index-row strong { font-family: var(--font-display); font-size: clamp(1.5rem, 3.7vw, 3.5rem); letter-spacing: -.05em; }.index-row small { color: var(--lab-muted); font-size: .7rem; }.index-row > .iconify { color: var(--lab-gold); }

.study-stack { padding: 2rem clamp(1.5rem, 5vw, 4.5rem); }.stack-top { color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }.stack-top .mini-kicker { margin: 0; }.study-stack > h2 { margin-top: 3rem; font-size: clamp(4rem, 8vw, 8rem); }.stack-field { margin-top: 3rem; border-top: 1px solid var(--lab-line); }.stack-row { display: grid; grid-template-columns: minmax(5rem, .5fr) 1fr 2rem; align-items: center; width: 100%; min-height: 64px; border: 0; border-bottom: 1px solid var(--lab-line); background: transparent; color: var(--lab-cream); padding: .5rem 0; text-align: left; transform: translateX(0); transition: transform 160ms ease, background 160ms ease; }.stack-row:hover, .stack-row--active { background: rgb(183 214 158 / 12%); transform: translateX(8px); }.stack-row span { color: var(--lab-muted); font-size: .65rem; }.stack-row strong { font-family: var(--font-display); font-size: clamp(1.5rem, 3.5vw, 3.5rem); letter-spacing: -.05em; }.stack-row i { color: var(--lab-gold); font-size: .65rem; font-style: normal; font-weight: 700; text-align: right; }.stack-note { margin-top: 1.4rem; font-size: .7rem; }

.study-constellation { padding: 2.2rem clamp(1.5rem, 5vw, 4rem); }.constellation-header { color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.constellation-header .mini-kicker { margin: 0; }.study-constellation > h2 { margin-top: 1.5rem; font-size: clamp(3.4rem, 7vw, 7rem); }.constellation-space { position: relative; height: 285px; margin-top: 1.8rem; }.constellation-space svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: rgb(183 214 158 / 35%); stroke-width: 1; }.star { position: absolute; z-index: 1; width: .5rem; height: .5rem; border: 1px solid var(--lab-gold); border-radius: 50%; background: var(--lab-jungle); }.star--one { top: 9%; left: 30%; }.star--two { right: 19%; top: 39%; }.star--three { bottom: 9%; left: 12%; }.constellation-node { position: absolute; z-index: 2; display: flex; flex-direction: column; align-items: flex-start; border: 0; background: transparent; color: var(--lab-cream); padding: .2rem; text-align: left; }.constellation-node small { color: var(--lab-gold); font-size: .6rem; }.constellation-node strong { font-family: var(--font-display); font-size: clamp(1.25rem, 2.6vw, 2.5rem); letter-spacing: -.04em; }.constellation-node:hover strong, .constellation-node:focus-visible strong { color: var(--lab-gold); }.constellation-node--1 { top: 0; left: 13%; }.constellation-node--2 { top: 37%; left: 39%; }.constellation-node--3 { right: 4%; top: 6%; }.constellation-node--4 { bottom: 3%; left: 26%; }.constellation-foot { border-top: 1px solid var(--lab-line); padding-top: 1rem; font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }

.study-dial { padding: 2rem clamp(1.5rem, 5vw, 4rem); }.dial-top { color: var(--lab-muted); font-size: .65rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }.dial-top .mini-kicker { margin: 0; }.dial-layout { display: grid; grid-template-columns: .85fr 1fr; align-items: center; gap: 1rem; min-height: 520px; }.dial-copy p { max-width: 14rem; margin: 1.5rem 0; font-size: .82rem; }.dial-wheel { position: relative; width: min(29vw, 310px); aspect-ratio: 1; margin-left: auto; border: 1px solid var(--lab-gold); border-radius: 50%; }.dial-wheel::before { position: absolute; inset: 14%; border: 1px solid rgb(183 214 158 / 45%); border-radius: 50%; content: ''; }.dial-wheel::after { position: absolute; inset: 29%; border: 1px dashed rgb(243 238 219 / 24%); border-radius: 50%; content: ''; }.dial-centre { position: absolute; z-index: 1; inset: 39%; display: grid; place-items: center; border: 1px solid var(--lab-gold); border-radius: 50%; background: var(--lab-jungle); color: var(--lab-gold); font-family: var(--font-display); font-size: .95rem; line-height: .75; text-align: center; }.dial-centre small { font-family: var(--font-ui); font-size: .45rem; letter-spacing: .13em; }.dial-node { position: absolute; top: 44%; left: 44%; z-index: 2; width: 5rem; border: 0; background: transparent; color: var(--lab-cream); padding: .2rem; font-family: var(--font-display); font-size: .95rem; line-height: .9; transform: rotate(var(--dial-angle)) translateY(-12.8vw) rotate(calc(var(--dial-angle) * -1)); transform-origin: center; }.dial-node:hover, .dial-node--active { color: var(--lab-gold); }

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
  .study-monogram, .study-green-signal { min-height: 610px; }
  .study-quiet-room, .study-split-field, .study-host-rail, .study-press-card, .study-low-slung { min-height: 610px; }
  .split-field-copy { min-height: 610px; }
  .study-flap, .study-ticket { min-height: 610px; }
  .study-flap { gap: 2rem; }
  .orbit-ring { width: 240px; height: 240px; }
  .study-poster { min-height: 610px; }
  .study-signal { min-height: 610px; }
  .dial-wheel { width: min(36vw, 280px); }
  .dial-node { transform: rotate(var(--dial-angle)) translateY(-16vw) rotate(calc(var(--dial-angle) * -1)); }
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
  .palette-dock-head { display: block; line-height: 1.5; }.palette-dock-head span:last-child { display: block; margin-top: .25rem; }.palette-grid { grid-template-columns: 1fr; }
  .preview-frame, .study, .preview-frame--setup { min-height: 680px; }
  .study-monogram, .study-green-signal { min-height: 680px; }
  .study-quiet-room, .study-split-field, .study-host-rail, .study-press-card, .study-low-slung { min-height: 680px; }
  .monogram-content, .green-signal-grid { display: block; min-height: 0; margin-top: 3rem; }
  .monogram-headline h2, .green-signal-copy h2 { font-size: 4.6rem; }
  .monogram-team-list, .green-signal-form { margin-top: 2rem; }
  .monogram-footer, .green-signal-footer { flex-wrap: wrap; gap: .65rem 1rem; }
  .quiet-room-layout { display: block; min-height: 0; margin-top: 3rem; }.quiet-room-copy h2 { font-size: 4.6rem; }.quiet-room-form { margin-top: 2rem; }
  .study-split-field { display: block; }.split-field-copy { display: block; min-height: 405px; padding: 1.5rem; }.split-field-copy .mini-kicker { margin-top: 3rem; }.split-field-copy h2 { font-size: 4.6rem; }.split-field-meta { margin-top: 2rem; }.split-field-form { margin: 0; border-width: 1px 0 0; padding: 1.5rem; }
  .study-host-rail { display: block; padding: 1.5rem; }.host-rail-spine { flex-direction: row; justify-content: space-between; border-right: 0; border-bottom: 1px solid var(--lab-line); padding: 0 0 .8rem; }.host-rail-spine i { margin-top: 0; writing-mode: horizontal-tb; }.host-rail-copy { margin-top: 3rem; }.host-rail-copy h2 { margin-top: 2.8rem; font-size: 4.6rem; }.host-rail-stats { margin-top: 2rem; }.host-rail-form { margin-top: 2.5rem; }
  .study-press-card { padding: 1.5rem; }.press-card-layout { display: block; min-height: 0; margin-top: 2.8rem; }.press-card-mark { display: none; }.press-card-copy h2 { font-size: 4.6rem; }.press-card-form { margin-top: 2rem; }.press-card-foot { margin-top: 2rem; flex-wrap: wrap; }
  .low-slung-top { display: flex; flex-wrap: wrap; gap: .55rem 1rem; }.low-slung-top span:first-child { width: 100%; }.low-slung-copy { min-height: 310px; }.low-slung-copy h2 { font-size: 4.8rem; }.low-slung-bar { display: block; }.low-slung-inputs { grid-template-columns: 1fr; }.low-slung-bar .study-action { width: 100%; margin-top: 1rem; }.low-slung-foot { flex-wrap: wrap; }
  .study-flap { display: block; padding: 2.2rem 1.4rem; }.study-flap-title h2 { font-size: 4.2rem; }.flap-console { margin-top: 2rem; }
  .study-orbit { padding: 1.4rem; }.orbit-copy { top: 18%; left: 1.4rem; }.orbit-copy h2 { font-size: 4.1rem; }.orbit-ring { top: 39%; right: 10%; width: 210px; height: 210px; }.orbit-team--one { bottom: 15%; left: 1.4rem; }.orbit-team--two { right: 1.4rem; bottom: 15%; min-width: 8rem; }.orbit-footer { right: 1.4rem; bottom: 1.3rem; left: 1.4rem; }
  .study-poster { display: block; padding: 1.4rem; }.poster-edge { display: none; }.poster-content { padding-top: 1.5rem; }.poster-content h2 { font-size: 4.2rem; }.poster-form { grid-template-columns: 1fr; margin: 1.5rem 0; }.poster-spec { flex-direction: row; border: 0; border-top: 1px solid rgb(7 26 19 / 32%); margin-top: 2rem; padding: 1rem 0 0; }
  .study-signal { min-height: 680px; grid-template-columns: 3.2rem 1fr; }.signal-main { padding: 2rem 1.2rem; }.signal-main h2 { margin-top: 4rem; font-size: 4.8rem; }.signal-fields { grid-template-columns: 1fr; gap: 1.1rem; }.signal-bottom { flex-wrap: wrap; padding: 1rem 1.2rem; gap: .9rem; }
  .study-ticket { padding: 1.4rem; }.ticket-main h2 { font-size: 4.3rem; }.ticket-inputs { grid-template-columns: 1fr; }.ticket-stub { flex-wrap: wrap; }
  .route-head h2, .study-index > h2, .study-stack > h2, .dial-copy h2, .study-constellation > h2 { font-size: 4rem; }.route-map { grid-template-columns: 1fr; margin-top: 2.5rem; }.route-line--one { inset: 0 0 50% 0; transform: rotate(2deg); }.route-line--two { inset: 50% 0 0 0; transform: rotate(-2deg); }.route-stop { min-height: 6.2rem; }.index-header { display: block; }.index-header > span:last-child { display: block; margin-top: .7rem; }.index-row { grid-template-columns: 1.5rem 1fr 1rem; }.index-row small { display: none; }.index-row strong { font-size: 1.7rem; }.study-stack { padding: 1.5rem; }.stack-row { grid-template-columns: 1fr 2rem; }.stack-row span { display: none; }.study-constellation { padding: 1.5rem; }.constellation-space { height: 300px; }.constellation-node strong { font-size: 1.35rem; }.study-dial { padding: 1.5rem; }.dial-layout { display: block; min-height: 600px; }.dial-copy p { margin: 1.2rem 0; }.dial-wheel { width: 275px; margin: 3rem auto 0; }.dial-node { transform: rotate(var(--dial-angle)) translateY(-18vw) rotate(calc(var(--dial-angle) * -1)); }
  .question-board-top, .timer-top, .editorial-top { align-items: flex-start; flex-direction: column; gap: .4rem; }.question-board-top b { margin-top: .6rem; }.question-board-main { padding-top: 4rem; }.question-board-main h2 { font-size: 4rem; }.board-answers { grid-template-columns: 1fr; margin-top: 2rem; }.board-time { position: static; flex-direction: row; align-items: baseline; gap: .55rem; min-width: 0; margin-top: 2rem; border-left: 0; border-top: 1px solid var(--lab-gold); padding: .8rem 0 0; }.board-time strong { margin: 0; font-size: 4rem; }.board-time i { flex: 1; margin: 0 0 0 .5rem; }.board-time button { margin-left: .3rem; }.arena-score--one { left: 1.4rem; }.arena-score--two { right: 1.4rem; }.arena-centre { margin-top: 8.5rem; }.arena-centre h2 { font-size: 3.7rem; }.arena-actions { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.editorial-grid { display: block; min-height: 0; }.editorial-question h2 { font-size: 4rem; }.editorial-options { margin-top: 2.5rem; }.editorial-bottom { margin-top: 2rem; flex-direction: column; }.timer-layout { display: block; min-height: 0; }.timer-question h2 { margin-top: 4rem; font-size: 3.8rem; }.timer-answer-grid { grid-template-columns: 1fr; margin-top: 2rem; }.timer-giant { display: flex; align-items: baseline; flex-wrap: wrap; gap: .8rem; margin-top: 3rem; border-left: 0; border-top: 1px solid var(--lab-coral); padding: 1rem 0 0; }.timer-giant strong { font-size: 6rem; }.timer-giant i { flex: 1; min-width: 100%; order: 3; }.timer-giant button { order: 4; }.study-duel { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr; gap: 1.2rem; padding: 1.5rem; }.duel-round { grid-column: 1 / -1; grid-row: 1; order: -1; }.duel-team { grid-row: 2; }.duel-team strong { font-size: 3rem; }.duel-question { grid-row: 3; }.duel-question h2 { font-size: 3.7rem; }.duel-options { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.lab-footer { display: block; }.lab-footer p + p { margin-top: .7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .lab-page *, .lab-page *::before, .lab-page *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>
