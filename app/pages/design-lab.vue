<script setup lang="ts">
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
    { id: 'control-rail', label: 'Control rail', note: 'Open setup / quiet settings', code: 'M' },
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
    { id: 'soft-field', label: 'Weiche Felder', note: 'Runde Flächen / direkt scannen', code: 'A' },
    { id: 'signal-grid', label: 'Signalraster', note: 'Große Ziele / klare Wahl', code: 'B' },
    { id: 'choice-lane', label: 'Wahlbahn', note: 'Eine Zeile / ein Fokus', code: 'C' },
    { id: 'offset-islands', label: 'Versetzte Inseln', note: 'Mehr Raum / mehr Spannung', code: 'D' },
  ],
  question: [
    { id: 'live-question', label: 'Live Question', note: 'One stage / clear answer', code: 'Q' },
  ],
}

const categoryOptions: CategoryOption[] = [
  { label: '2000er', descriptor: 'Nostalgie, Netzkultur, große Hits' },
  { label: 'Musik', descriptor: 'Tracks, Stimmen und Ohrwürmer' },
  { label: 'Filme', descriptor: 'Kino, Kult und Plot-Twists' },
  { label: 'WTF-Wissen', descriptor: 'Fakten, die hängen bleiben' },
]

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
const selectedPalette = ref(1)

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
              <div class="split-field-copy"><div class="split-field-wordmark">JUNGLE <span>/</span> QUIZ</div><h2>Wer<br><em>spielt?</em></h2><p>Gib den Teams einen Namen. Den Rest regeln wir.</p><div class="split-field-meta"><span>7 Runden</span><span>45 Sek.</span><span>Schwer</span></div></div>
              <div class="split-field-form"><div class="split-field-head"><span>Teamnamen</span><span>Bereit?</span></div><label><span>Team eins</span><input v-model="setupNames.one" aria-label="Name Team Eins"></label><label><span>Team zwei</span><input v-model="setupNames.two" aria-label="Name Team Zwei"></label><div class="split-field-badges" aria-label="Spielmodus: 7 Runden, 45 Sekunden, schwer"><div class="split-field-badge"><strong>7</strong><span>Runden</span></div><div class="split-field-badge"><strong>45</strong><span>Sek.</span></div><div class="split-field-badge"><strong>Schwer</strong><span>Modus</span></div></div><button class="study-action study-action--cream" @click="chooseScreen('categories')">Spiel starten <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button></div>
            </div>

            <div v-else-if="activeScreen === 'setup' && activeVariant.id === 'control-rail'" class="study study-split-field study-control-rail" :style="splitFieldPaletteStyle">
              <div class="split-field-copy"><div class="split-field-wordmark">JUNGLE <span>/</span> QUIZ</div><h2>Bereit<br><em>fürs Spiel?</em></h2><p>Runde wählen. Tempo setzen. Loslegen.</p><div class="split-field-meta"><span>2 Teams</span><span>4 Kategorien</span><span>1 Chance zu stehlen</span></div></div>
              <div class="control-rail-form">
                <div class="split-field-head"><span>Spiel-Setup</span><span>Bereit?</span></div>
                <div class="control-rail-settings">
                  <label><span>Runden</span><strong>5</strong></label>
                  <label><span>Antwortzeit</span><strong>45 Sek.</strong></label>
                  <label><span>Schwierigkeit</span><strong>Gemischt</strong></label>
                </div>
                <button class="study-action study-action--cream" @click="chooseScreen('categories')">Spiel starten <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button>
              </div>
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

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'signal-grid'" class="study category-study category-study--signal-grid">
              <div class="category-study-top"><span>Kategorie wählen</span><strong>TEAM ONE IST DRAN</strong><span>01 / 05</span></div>
              <div class="category-study-intro"><h2>Was fühlt sich <em>richtig</em> an?</h2><p>Keine Rangliste. Nur die nächste gute Frage.</p></div>
              <div class="category-signal-grid" role="group" aria-label="Kategorien auswählen">
                <button v-for="(option, index) in categoryOptions" :key="option.label" data-uisfx-hover="hover" data-uisfx-press="press" class="category-signal-card" :class="{ 'category-signal-card--selected': selectedCategory === option.label }" @click="chooseCategory(option.label)">
                  <span class="category-signal-card-number">0{{ index + 1 }}</span><span class="category-signal-card-copy"><strong>{{ option.label }}</strong><small>{{ option.descriptor }}</small></span><Icon name="lucide:arrow-up-right" size="19" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'choice-lane'" class="study category-study category-study--choice-lane">
              <div class="category-study-top"><span>Runde 01 / 05</span><strong>TEAM ONE IST DRAN</strong><span>Dein Pick</span></div>
              <div class="category-study-intro"><h2>Picke deine <em>Kategorie.</em></h2><p>Scannen. Entscheiden. Los.</p></div>
              <div class="category-lane" role="group" aria-label="Kategorien auswählen">
                <button v-for="(option, index) in categoryOptions" :key="option.label" data-uisfx-hover="hover" data-uisfx-press="press" class="category-lane-row" :class="{ 'category-lane-row--selected': selectedCategory === option.label }" @click="chooseCategory(option.label)">
                  <span class="category-lane-index">0{{ index + 1 }}</span><strong>{{ option.label }}</strong><small>{{ option.descriptor }}</small><Icon name="lucide:arrow-right" size="19" aria-hidden="true" />
                </button>
              </div>
              <p class="category-study-foot">Die Auswahl zählt für beide Teams.</p>
            </div>

            <div v-else-if="activeScreen === 'categories' && activeVariant.id === 'offset-islands'" class="study category-study category-study--offset-islands">
              <div class="category-study-top"><span>01 / Kategorie</span><strong>TEAM ONE IST DRAN</strong><span>Jungle / Quiz</span></div>
              <div class="category-study-intro"><h2>Geh dahin, wo es <em>interessant</em> wird.</h2><p>Vier Ecken. Eine Richtung für diese Runde.</p></div>
              <div class="category-islands" role="group" aria-label="Kategorien auswählen">
                <button v-for="(option, index) in categoryOptions" :key="option.label" data-uisfx-hover="hover" data-uisfx-press="press" class="category-island" :class="{ 'category-island--selected': selectedCategory === option.label }" @click="chooseCategory(option.label)">
                  <span class="category-island-top"><span>0{{ index + 1 }}</span><Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" /></span><strong>{{ option.label }}</strong><small>{{ option.descriptor }}</small>
                </button>
              </div>
              <p class="category-study-foot">{{ selectedCategory || 'Noch keine Kategorie gewählt' }}</p>
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

          <section v-if="activeScreen === 'setup' && ['split-field', 'control-rail'].includes(activeVariant.id)" class="palette-dock" aria-label="Farbpaletten für Split field und Control rail">
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
.split-field-copy h2 { max-width: 8ch; margin-top: 5rem; color: var(--split-ink); font-size: clamp(4.6rem, 8vw, 7.4rem); letter-spacing: -.012em; line-height: .87; }
.split-field-copy h2 em { font-style: normal; }
.split-field-copy p { max-width: 18rem; margin-top: 1.7rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .88rem; }
.split-field-meta { display: flex; border-top: 1px solid color-mix(in srgb, var(--split-ink) 32%, transparent); padding-top: .8rem; color: color-mix(in srgb, var(--split-ink) 70%, transparent); font-size: .62rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.split-field-meta span + span::before { margin: 0 .75rem; color: color-mix(in srgb, var(--split-ink) 42%, transparent); content: '·'; }
.split-field-form { align-self: center; margin: 2rem; border: 1px solid var(--split-line); padding: 1.15rem; color: var(--split-cream); }
.split-field-form label { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: center; gap: .7rem; min-height: 74px; border-bottom: 1px solid var(--split-line); }
.split-field-form label span { color: var(--split-accent); font-size: .62rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.split-field-form input { width: 100%; border-color: color-mix(in srgb, var(--split-cream) 42%, transparent); padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.split-field-badges { display: grid; grid-template-columns: .68fr .82fr 1.3fr; margin-top: 1rem; border-top: 1px solid var(--split-line); border-bottom: 1px solid var(--split-line); }
.split-field-badge { display: flex; min-width: 0; min-height: 4.5rem; flex-direction: column; justify-content: center; gap: .18rem; padding: .7rem .75rem; }
.split-field-badge + .split-field-badge { border-left: 1px solid var(--split-line); }
.split-field-badge strong { overflow: hidden; color: var(--split-cream); font-family: var(--font-display); font-size: clamp(1.35rem, 2.35vw, 2.05rem); font-weight: 600; letter-spacing: -.025em; line-height: .95; text-overflow: ellipsis; white-space: nowrap; }
.split-field-badge span { color: var(--split-accent); font-size: .52rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
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

.control-rail-form { align-self: center; margin: 2rem; color: var(--split-cream); }
.control-rail-form label { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: center; gap: .7rem; min-height: 74px; border-bottom: 1px solid var(--split-line); }
.control-rail-form label span { color: var(--split-accent); font-size: .62rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.control-rail-form input { width: 100%; border-color: color-mix(in srgb, var(--split-cream) 42%, transparent); padding: .5rem 0; font-size: .95rem; font-weight: 600; }
.control-rail-settings { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; border-top: 1px solid var(--split-line); margin-top: 1rem; padding-top: .7rem; }
.control-rail-settings label { display: flex; min-height: 4.3rem; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: .7rem; border-bottom: 1px solid var(--split-line); padding-bottom: .7rem; }
.control-rail-settings label span { color: var(--split-muted); font-size: .58rem; }
.control-rail-settings strong { color: var(--split-cream); font-size: .88rem; font-weight: 600; }
.control-rail-form .study-action { width: 100%; margin-top: 1.4rem; }

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
.category-study--soft-field .category-surface-grid { gap: 1rem; margin-top: 4.35rem; }
.category-surface, .category-signal-card, .category-lane-row, .category-island { cursor: pointer; font: inherit; }
.category-surface { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 1rem; min-height: 8.5rem; border: 0; border-radius: 1rem; background: var(--lab-forest); color: var(--lab-cream); padding: 1.2rem 1.25rem; text-align: left; transition: transform 180ms ease, background 180ms ease, color 180ms ease; }
.category-surface:hover, .category-surface:focus-visible, .category-surface--selected { background: var(--lab-gold); color: var(--lab-ink); transform: translateY(-3px); }
.category-surface:focus-visible, .category-signal-card:focus-visible, .category-lane-row:focus-visible, .category-island:focus-visible { outline: 3px solid var(--lab-leaf); outline-offset: 3px; }
.category-signal-card-number, .category-lane-index { align-self: start; color: var(--lab-gold); font-family: var(--font-display); font-size: 1.25rem; }
.category-surface-copy, .category-signal-card-copy { display: flex; flex-direction: column; gap: .35rem; }
.category-surface-copy strong, .category-signal-card-copy strong { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 3rem); letter-spacing: -.04em; line-height: .9; }
.category-study--soft-field .category-study-intro h2 { letter-spacing: -.02em; }
.category-study--soft-field .category-surface-copy strong { letter-spacing: -.015em; }
.category-surface-copy small, .category-signal-card-copy small { color: var(--lab-muted); font-size: .67rem; line-height: 1.35; }
.category-surface--selected .category-surface-copy small, .category-surface:hover .category-surface-copy small, .category-surface:focus-visible .category-surface-copy small { color: rgb(7 26 19 / 72%); }
.category-surface > .iconify { color: var(--lab-gold); }.category-surface:hover > .iconify, .category-surface:focus-visible > .iconify, .category-surface--selected > .iconify { color: var(--lab-ink); }
.category-study-foot { display: flex; justify-content: space-between; margin: 1.2rem 0 0; border-top: 1px solid var(--lab-line); padding-top: .9rem; color: var(--lab-muted); font-size: .68rem; letter-spacing: .04em; }.category-study-foot span { color: var(--lab-gold); }

.category-study--signal-grid { background: var(--lab-forest); }
.category-signal-grid { display: grid; grid-template-columns: 1.12fr .88fr; gap: .7rem; margin-top: 2.8rem; }
.category-signal-card { display: flex; min-height: 10.5rem; flex-direction: column; justify-content: space-between; align-items: flex-start; border: 1px solid rgb(243 238 219 / 22%); border-radius: 1rem; background: var(--lab-jungle); color: var(--lab-cream); padding: 1.2rem 1.25rem; text-align: left; transition: transform 180ms ease, background 180ms ease, border-color 180ms ease; }
.category-signal-card:nth-child(3), .category-signal-card:nth-child(4) { grid-column: span 2; min-height: 7.5rem; flex-direction: row; align-items: flex-end; }
.category-signal-card:hover, .category-signal-card:focus-visible, .category-signal-card--selected { border-color: var(--lab-leaf); background: var(--lab-leaf); color: var(--lab-ink); transform: translateY(-3px); }
.category-signal-card--selected .category-signal-card-number, .category-signal-card:hover .category-signal-card-number, .category-signal-card:focus-visible .category-signal-card-number { color: var(--lab-ink); }
.category-signal-card-copy small { color: var(--lab-muted); }.category-signal-card--selected .category-signal-card-copy small, .category-signal-card:hover .category-signal-card-copy small, .category-signal-card:focus-visible .category-signal-card-copy small { color: rgb(7 26 19 / 70%); }
.category-signal-card > .iconify { align-self: flex-end; color: var(--lab-gold); }.category-signal-card:nth-child(3) > .iconify, .category-signal-card:nth-child(4) > .iconify { align-self: flex-end; }.category-signal-card:hover > .iconify, .category-signal-card:focus-visible > .iconify, .category-signal-card--selected > .iconify { color: var(--lab-ink); }

.category-study--choice-lane { background: var(--lab-cream); color: var(--lab-ink); }.category-study--choice-lane .category-study-top, .category-study--choice-lane .category-study-intro p, .category-study--choice-lane .category-study-foot { color: rgb(7 26 19 / 58%); }.category-study--choice-lane .category-study-top strong { color: var(--lab-jungle); }.category-study--choice-lane .category-study-intro h2 { color: var(--lab-ink); }.category-study--choice-lane .category-study-intro h2 em { color: var(--lab-jungle); }
.category-lane { margin-top: 2.8rem; border-top: 1px solid rgb(7 26 19 / 18%); }
.category-lane-row { display: grid; grid-template-columns: 2rem minmax(8rem, .75fr) 1fr auto; align-items: center; gap: 1rem; width: 100%; min-height: 4.6rem; border: 0; border-bottom: 1px solid rgb(7 26 19 / 18%); border-radius: .85rem; background: transparent; color: var(--lab-ink); padding: .7rem .8rem; text-align: left; transition: background 180ms ease, color 180ms ease, transform 180ms ease; }
.category-lane-row:hover, .category-lane-row:focus-visible, .category-lane-row--selected { background: var(--lab-jungle); color: var(--lab-cream); transform: translateX(.35rem); }.category-lane-index { color: var(--lab-jungle); }.category-lane-row:hover .category-lane-index, .category-lane-row:focus-visible .category-lane-index, .category-lane-row--selected .category-lane-index { color: var(--lab-gold); }.category-lane-row strong { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.7rem); letter-spacing: -.04em; }.category-lane-row small { color: rgb(7 26 19 / 58%); font-size: .68rem; }.category-lane-row:hover small, .category-lane-row:focus-visible small, .category-lane-row--selected small { color: var(--lab-muted); }.category-lane-row > .iconify { color: var(--lab-jungle); }.category-lane-row:hover > .iconify, .category-lane-row:focus-visible > .iconify, .category-lane-row--selected > .iconify { color: var(--lab-gold); }

.category-study--offset-islands { background: var(--lab-jungle); }.category-islands { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; margin-top: 2.8rem; }.category-island { display: flex; min-height: 10.5rem; flex-direction: column; align-items: stretch; justify-content: space-between; border: 0; border-radius: 1.1rem; background: var(--lab-forest); color: var(--lab-cream); padding: 1.25rem; text-align: left; transition: transform 180ms ease, background 180ms ease, color 180ms ease; }.category-island:nth-child(2) { transform: translateY(1.1rem); }.category-island:nth-child(3) { transform: translateY(-.45rem); }.category-island:hover, .category-island:focus-visible, .category-island--selected { background: var(--lab-leaf); color: var(--lab-ink); transform: translateY(-.35rem); }.category-island:nth-child(2):hover, .category-island:nth-child(2):focus-visible, .category-island:nth-child(2).category-island--selected { transform: translateY(.75rem); }.category-island:nth-child(3):hover, .category-island:nth-child(3):focus-visible, .category-island:nth-child(3).category-island--selected { transform: translateY(-.8rem); }.category-island-top { display: flex; justify-content: space-between; color: var(--lab-gold); font-family: var(--font-display); font-size: 1.15rem; }.category-island:hover .category-island-top, .category-island:focus-visible .category-island-top, .category-island--selected .category-island-top { color: var(--lab-ink); }.category-island strong { margin-top: 1.2rem; font-family: var(--font-display); font-size: clamp(1.8rem, 3.4vw, 3.4rem); letter-spacing: -.05em; line-height: .9; }.category-island small { margin-top: .45rem; color: var(--lab-muted); font-size: .67rem; line-height: 1.35; }.category-island:hover small, .category-island:focus-visible small, .category-island--selected small { color: rgb(7 26 19 / 68%); }

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
  .study-split-field { display: block; }.split-field-copy { display: block; min-height: 405px; padding: 1.5rem; }.split-field-copy .mini-kicker { margin-top: 3rem; }.split-field-copy h2 { font-size: 4.6rem; }.split-field-meta { margin-top: 2rem; }.split-field-form { margin: 0; border-width: 1px 0 0; padding: 1.5rem; }.split-field-badge { min-height: 4.1rem; padding-inline: .55rem; }.split-field-badge strong { font-size: 1.35rem; }.control-rail-form { margin: 0; padding: 1.5rem; }.control-rail-settings { gap: .6rem; }.control-rail-settings strong { font-size: .78rem; }
  .study-host-rail { display: block; padding: 1.5rem; }.host-rail-spine { flex-direction: row; justify-content: space-between; border-right: 0; border-bottom: 1px solid var(--lab-line); padding: 0 0 .8rem; }.host-rail-spine i { margin-top: 0; writing-mode: horizontal-tb; }.host-rail-copy { margin-top: 3rem; }.host-rail-copy h2 { margin-top: 2.8rem; font-size: 4.6rem; }.host-rail-stats { margin-top: 2rem; }.host-rail-form { margin-top: 2.5rem; }
  .study-press-card { padding: 1.5rem; }.press-card-layout { display: block; min-height: 0; margin-top: 2.8rem; }.press-card-mark { display: none; }.press-card-copy h2 { font-size: 4.6rem; }.press-card-form { margin-top: 2rem; }.press-card-foot { margin-top: 2rem; flex-wrap: wrap; }
  .low-slung-top { display: flex; flex-wrap: wrap; gap: .55rem 1rem; }.low-slung-top span:first-child { width: 100%; }.low-slung-copy { min-height: 310px; }.low-slung-copy h2 { font-size: 4.8rem; }.low-slung-bar { display: block; }.low-slung-inputs { grid-template-columns: 1fr; }.low-slung-bar .study-action { width: 100%; margin-top: 1rem; }.low-slung-foot { flex-wrap: wrap; }
  .study-flap { display: block; padding: 2.2rem 1.4rem; }.study-flap-title h2 { font-size: 4.2rem; }.flap-console { margin-top: 2rem; }
  .study-orbit { padding: 1.4rem; }.orbit-copy { top: 18%; left: 1.4rem; }.orbit-copy h2 { font-size: 4.1rem; }.orbit-ring { top: 39%; right: 10%; width: 210px; height: 210px; }.orbit-team--one { bottom: 15%; left: 1.4rem; }.orbit-team--two { right: 1.4rem; bottom: 15%; min-width: 8rem; }.orbit-footer { right: 1.4rem; bottom: 1.3rem; left: 1.4rem; }
  .study-poster { display: block; padding: 1.4rem; }.poster-edge { display: none; }.poster-content { padding-top: 1.5rem; }.poster-content h2 { font-size: 4.2rem; }.poster-form { grid-template-columns: 1fr; margin: 1.5rem 0; }.poster-spec { flex-direction: row; border: 0; border-top: 1px solid rgb(7 26 19 / 32%); margin-top: 2rem; padding: 1rem 0 0; }
  .study-signal { min-height: 680px; grid-template-columns: 3.2rem 1fr; }.signal-main { padding: 2rem 1.2rem; }.signal-main h2 { margin-top: 4rem; font-size: 4.8rem; }.signal-fields { grid-template-columns: 1fr; gap: 1.1rem; }.signal-bottom { flex-wrap: wrap; padding: 1rem 1.2rem; gap: .9rem; }
  .study-ticket { padding: 1.4rem; }.ticket-main h2 { font-size: 4.3rem; }.ticket-inputs { grid-template-columns: 1fr; }.ticket-stub { flex-wrap: wrap; }
  .category-study { min-height: 680px; padding: 1.5rem; }.category-study-top { grid-template-columns: 1fr auto; }.category-study-top span:last-child { display: none; }.category-study-top > strong { text-align: right; }.category-study-top--soft-field { grid-template-columns: 1fr auto 1fr; gap: .5rem; }.category-study-top--soft-field > strong { align-self: end; text-align: center; }.category-status { column-gap: .35rem; }.category-status strong { font-size: 2.2rem; }.category-status small { display: none; }.category-status--question { justify-items: end; }.category-study-intro { display: block; margin-top: 3.2rem; }.category-study-intro h2 { max-width: 9ch; font-size: 4rem; }.category-study-intro p { margin-top: 1.2rem; }.category-surface-grid, .category-signal-grid, .category-islands { grid-template-columns: 1fr; margin-top: 2.1rem; }.category-study--soft-field .category-surface-grid { gap: .85rem; margin-top: 3rem; }.category-surface { min-height: 6.6rem; }.category-signal-card, .category-signal-card:nth-child(3), .category-signal-card:nth-child(4) { min-height: 7rem; grid-column: auto; flex-direction: row; align-items: flex-end; }.category-signal-card-copy strong { font-size: 2rem; }.category-lane { margin-top: 2.1rem; }.category-lane-row { grid-template-columns: 1.5rem 1fr auto; gap: .65rem; min-height: 4.4rem; }.category-lane-row small { display: none; }.category-lane-row strong { font-size: 2rem; }.category-island, .category-island:nth-child(2), .category-island:nth-child(3) { min-height: 7.2rem; transform: none; }.category-island:hover, .category-island:focus-visible, .category-island--selected { transform: translateY(-3px); }
  .question-board-top, .timer-top, .editorial-top { align-items: flex-start; flex-direction: column; gap: .4rem; }.question-board-top b { margin-top: .6rem; }.question-board-main { padding-top: 4rem; }.question-board-main h2 { font-size: 4rem; }.board-answers { grid-template-columns: 1fr; margin-top: 2rem; }.board-time { position: static; flex-direction: row; align-items: baseline; gap: .55rem; min-width: 0; margin-top: 2rem; border-left: 0; border-top: 1px solid var(--lab-gold); padding: .8rem 0 0; }.board-time strong { margin: 0; font-size: 4rem; }.board-time i { flex: 1; margin: 0 0 0 .5rem; }.board-time button { margin-left: .3rem; }.arena-score--one { left: 1.4rem; }.arena-score--two { right: 1.4rem; }.arena-centre { margin-top: 8.5rem; }.arena-centre h2 { font-size: 3.7rem; }.arena-actions { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.editorial-grid { display: block; min-height: 0; }.editorial-question h2 { font-size: 4rem; }.editorial-options { margin-top: 2.5rem; }.editorial-bottom { margin-top: 2rem; flex-direction: column; }.timer-layout { display: block; min-height: 0; }.timer-question h2 { margin-top: 4rem; font-size: 3.8rem; }.timer-answer-grid { grid-template-columns: 1fr; margin-top: 2rem; }.timer-giant { display: flex; align-items: baseline; flex-wrap: wrap; gap: .8rem; margin-top: 3rem; border-left: 0; border-top: 1px solid var(--lab-coral); padding: 1rem 0 0; }.timer-giant strong { font-size: 6rem; }.timer-giant i { flex: 1; min-width: 100%; order: 3; }.timer-giant button { order: 4; }.study-duel { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr; gap: 1.2rem; padding: 1.5rem; }.duel-round { grid-column: 1 / -1; grid-row: 1; order: -1; }.duel-team { grid-row: 2; }.duel-team strong { font-size: 3rem; }.duel-question { grid-row: 3; }.duel-question h2 { font-size: 3.7rem; }.duel-options { grid-template-columns: repeat(2, 1fr); margin-top: 2rem; }.lab-footer { display: block; }.lab-footer p + p { margin-top: .7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .lab-page *, .lab-page *::before, .lab-page *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>
