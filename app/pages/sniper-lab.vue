<script setup lang="ts">
import '~/assets/css/sniper-lab.css'
import { labMatch, type LabOutcome, type LabTeam } from '~/lib/sniper-lab-fixtures'

type ScenarioKey = 'start' | 'ready' | 'listen' | 'buzz' | 'solution' | 'result'

interface Study {
  code: string
  label: string
  note: string
  why: string
  recommended?: boolean
}

useHead({ title: 'Sound Sniper Lab · Jungle Quiz' })

const scenarios: { id: ScenarioKey, label: string, detail: string }[] = [
  { id: 'start', label: 'Start', detail: 'Modus & Teams' },
  { id: 'ready', label: 'Bereit', detail: 'Vor dem Sound' },
  { id: 'listen', label: 'Hören', detail: 'Sound läuft' },
  { id: 'buzz', label: 'Buzz', detail: 'Team antwortet' },
  { id: 'solution', label: 'Lösung', detail: 'Richtig oder falsch' },
  { id: 'result', label: 'Ergebnis', detail: 'Punkt, Schluck, weiter' },
]

const studies: Record<ScenarioKey, Study[]> = {
  start: [
    { code: 'S1', label: 'Aufgeräumt', note: 'Gleiche Spalte, Einstellungen und Kategorien als ein Satz', why: 'Kleinster Eingriff: Die sieben Chips und die Fußzeile verschwinden in einem Satz. Kategorien öffnen sich erst beim Klick auf "6 von 7 Kategorien".' },
    { code: 'S2', label: 'Spielbrett-Leiste', note: 'Empfehlung · Wer spielt oben, die Regeln als Leiste unten', why: 'Trennt die zwei Fragen des Screens sauber: Wer spielt (Namen, VS, Start) und nach welchen Regeln (drei große Zahlen). Alles bleibt einen Klick entfernt, nichts konkurriert mit dem Start-Button.', recommended: true },
    { code: 'S3', label: 'Arena', note: 'Kein Split: Teams stehen sich über die volle Breite gegenüber', why: 'Der Start wird zum Duell. Die linke Hälfte gibt ihren Platz an die Teams ab, Einstellungen und Start teilen sich eine Fußzeile.' },
    { code: 'S4', label: 'Mischpult', note: 'Kategorien als Regler statt Chips, wie eine Wellenform', why: 'Wenn Kategorien wichtig bleiben sollen: Sieben Regler lesen sich als ein Bild statt als Chip-Wolke und greifen die Soundwelle auf.' },
    { code: 'S5', label: 'VS-Knopf', note: 'Das VS ist selbst der Start-Knopf', why: 'Der Lieblingsteil wird zur Hauptaktion. Weniger Elemente geht kaum: Namen, ein runder Knopf, eine leise Zeile.' },
  ],
  ready: [
    { code: 'R1', label: 'Volle Zeile', note: 'Empfehlung · Headline über die ganze Breite, Aktionsleiste unten', why: 'Genau das Feedback: Headline in einer Zeile über die volle Breite, Text deutlich größer und breiter, runder Start-Button mit eigener Zeile. Die Uhr läuft noch nicht, also macht sie Platz und wird zur Info in der Leiste.', recommended: true },
    { code: 'R2', label: 'Bühnenmitte', note: 'Alles zentriert, ein runder Play-Knopf', why: 'Ruhigster Aufbau: eine Achse, eine runde Taste in der Mitte. Gut auf dem Fernseher, wenig Text zum Lesen.' },
    { code: 'R3', label: 'Zwei Hälften', note: 'Worte links, Erklärung und Aktion rechts', why: 'Der Platz der Uhr wird an den Text vergeben. Beide Hälften sind gleich schwer, nichts klebt mehr links.' },
    { code: 'R4', label: 'Drei Takte', note: 'Der Absatz wird zu drei Schritten über die ganze Breite', why: 'Ersetzt den Fließtext durch drei scannbare Regeln: Hören, Buzzern, Liefern. Neue Mitspieler verstehen das Spiel von der Couch aus.' },
    { code: 'R5', label: 'Nächster Sound', note: 'Die Soundnummer führt, ein Ring startet von selbst', why: 'Weniger Wiederholung: Ab Sound 2 muss niemand mehr drücken. Der Ring läuft fünf Sekunden, Enter startet sofort, Leertaste hält an.' },
  ],
  listen: [
    { code: 'H1', label: 'Zähler im Knopf', note: 'Empfehlung · Ein runder Knopf, drei Bögen zeigen die Hörungen', why: 'Zähler und Aktion werden ein Element: Die drei Bögen um den Knopf sind die drei Hörungen. Keine Punkte, kein doppelter Text, die Welle bleibt unangetastet.', recommended: true },
    { code: 'H2', label: 'Drei Marken', note: 'Jede Hörung ist eine Marke, die nächste ist der Knopf', why: 'Die Hörungen werden zu einer kleinen Reihe: verbraucht, nächste, letzte. Was übrig ist, sieht man ohne Rechnen.' },
    { code: 'H3', label: 'Am Timer', note: 'Hörungen wohnen bei der Zeit, links nur Welle und Frage', why: 'Zeit und Hörungen sind beide Vorrat, den der Raum verbraucht. Rechts gebündelt, bekommt die Welle links die volle Bühne.' },
    { code: 'H4', label: 'Abspielleiste', note: 'Die Welle als Player mit Abspielkopf', why: 'Zeigt zusätzlich, wie weit der Sound gelaufen ist. Die Wiederholung sitzt am Ende der Leiste, wie bei jedem Player.' },
    { code: 'H5', label: 'Transportleiste', note: 'Alle Steuerung in einer Leiste am Fuß', why: 'Die Bühne zeigt nur noch Welle, Frage und Zeit. Buzzer-Tasten, Hörungen und Host-Tasten teilen sich eine Zeile unten.' },
  ],
  buzz: [
    { code: 'B1', label: 'Nur die Karte', note: 'Empfehlung · Karte groß in der Mitte, sonst nur der Stand', why: 'Was der Raum jetzt wissen muss: wer dran ist und dass laut geantwortet wird. Uhr, Badge, Fortschritt und Fußzeile fallen weg; Host-Tasten stehen klein in der Ecke.', recommended: true },
    { code: 'B2', label: 'Teamhälfte', note: 'Die Bildschirmhälfte des Teams flutet in Lime', why: 'Von jedem Platz im Raum sofort lesbar: Die Seite des Teams leuchtet. Die andere Hälfte erklärt, was ein Fehler bringt.' },
    { code: 'B3', label: 'Vollfläche', note: 'Der ganze Screen wird zur Karte', why: 'Maximal laut und maximal ruhig zugleich: ein Name, ein Satz, eine Taste. Der Stand rutscht klein nach oben.' },
    { code: 'B4', label: 'Was auf dem Spiel steht', note: 'Statt Satz: die zwei möglichen Spielstände', why: 'Ersetzt "Falsch = Punkt für …" durch ein Bild: 3 : 1 oder 2 : 2. Spannung statt Erklärung, an der Stelle, wo vorher die Uhr stand.' },
    { code: 'B5', label: 'Gefrorene Welle', note: 'Die Welle friert ein und markiert den Buzz', why: 'Ein kleiner Show-Moment: Man sieht, wie früh gebuzzert wurde. Die Karte wird zum breiten Banner darunter.' },
  ],
  solution: [
    { code: 'L1', label: 'Zwei Felder', note: 'Lösung riesig, Urteil als zwei breite Felder', why: 'Die einfachste Form: Die Lösung steht allein in der Mitte, das Urteil sind zwei Flächen, die man nicht verfehlen kann.' },
    { code: 'L2', label: 'Karte dreht', note: 'Die Buzz-Karte kippt um, runde Urteile am Rand', why: 'Hält die Verbindung zur geliebten Karte: Sie dreht sich um und zeigt die Lösung. Häkchen und Kreuz als große runde Knöpfe.' },
    { code: 'L3', label: 'Ja oder Nein', note: 'Lösung links, eine Ja/Nein-Spalte rechts', why: 'Die Frage wird wörtlich beantwortet: Ja oder Nein, groß gesetzt. Für Hosts, die laut fragen "Hatte Dogi recht?".' },
    { code: 'L4', label: 'Mit Folgen', note: 'Empfehlung · Jede Taste zeigt Punkt und wer trinkt', why: 'Die Entscheidung wird größer und klarer: Jede Taste sagt vorher, was passiert (+1 für wen, wer trinkt). Der Raum sieht die Folgen schon beim Urteil, das Ergebnis danach überrascht nicht.', recommended: true },
    { code: 'L5', label: 'Lösungsband', note: 'Ein cremefarbenes Band, zwei große Tasten', why: 'Die Lösung kommt wie ein Schild ins Bild. Darunter zwei Tasten, die wie die echten Keys aussehen.' },
  ],
  result: [
    { code: 'E1', label: 'Urteil zuerst', note: 'Riesiges Urteil, Trink-Band mit Weiter', why: 'Erst das Gefühl (Richtig!/Daneben!), dann die Lösung. Wer trinkt, ist ein Band über die ganze Breite, auf dem auch der nächste Schritt liegt.' },
    { code: 'E2', label: 'Punkt | Schluck', note: 'Zwei Hälften: wer punktet, wer trinkt', why: 'Das Ergebnis als zwei Flächen. Bei "Zeit vorbei" bleiben beide dunkel: kein Punkt, kein Schluck.' },
    { code: 'E3', label: 'Spielstand', note: 'Der Stand wird zur Headline, der nächste Sound zählt an', why: 'Für Spiele, in denen der Stand zählt: Die +1 springt im großen Stand. Eine Leiste unten zählt in den nächsten Sound.' },
    { code: 'E4', label: 'Ergebnis + Nächstes', note: 'Empfehlung · Die Uhrspalte gehört schon dem nächsten Sound', why: 'Ergebnis klar links, und die Spalte, in der die Uhr stand, zählt direkt in den nächsten Sound (5, dann 3·2·1·Los). Das starre "Ohren auf" entfällt ab Sound 2; Enter startet sofort, Leertaste hält an.', recommended: true },
    { code: 'E5', label: 'Durchlauf', note: 'Prototyp: Ergebnis faltet sich, Countdown, nächster Sound', why: 'Zeigt den Übergang als Ablauf: Das Ergebnis schrumpft zu einem Band, darunter läuft schon der Countdown und dann die Welle. Kein Bereit-Screen mehr zwischen den Sounds.' },
  ],
}

const totalStudies = Object.values(studies).reduce((sum, list) => sum + list.length, 0)

const activeScenario = ref<ScenarioKey>('ready')
const selected = reactive<Record<ScenarioKey, number>>({ start: 1, ready: 0, listen: 0, buzz: 0, solution: 3, result: 3 })
const activeStudy = computed(() => studies[activeScenario.value][selected[activeScenario.value]]!)

const buzzer = ref<LabTeam>(0)
const outcome = ref<LabOutcome>('right')
const fullscreen = ref(false)
const reducedMotion = ref(false)

const outcomes: { id: LabOutcome, label: string }[] = [
  { id: 'right', label: 'Richtig' },
  { id: 'wrong', label: 'Falsch' },
  { id: 'timeout', label: 'Zeit vorbei' },
]

// One shared clock drives the ticking timer and the countdown loops.
const tick = ref(0)
const listenSeconds = computed(() => labMatch.seconds - (tick.value % labMatch.seconds))
let timer: ReturnType<typeof setInterval> | undefined

function chooseScenario(id: ScenarioKey) {
  activeScenario.value = id
  tick.value = 0
}

function chooseStudy(index: number) {
  selected[activeScenario.value] = index
  tick.value = 0
}

function onKey(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName))
    return
  const list = studies[activeScenario.value]
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    const step = event.key === 'ArrowDown' ? 1 : -1
    chooseStudy((selected[activeScenario.value] + step + list.length) % list.length)
  }
  else if (event.key === 'Escape' && fullscreen.value) {
    fullscreen.value = false
  }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setInterval(() => {
    tick.value += 1
  }, 1000)
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="sx">
    <header class="sx-header">
      <NuxtLink to="/" class="sx-brand" aria-label="Jungle Quiz Startseite"><span>Jungle</span><i>/</i><span>Quiz</span></NuxtLink>
      <nav class="sx-header-nav" aria-label="Labore">
        <NuxtLink to="/design-lab">Design lab</NuxtLink>
        <NuxtLink to="/" class="sx-back">Zurück zum Spiel <Icon name="lucide:arrow-up-right" aria-hidden="true" /></NuxtLink>
      </nav>
    </header>

    <main class="sx-main">
      <section class="sx-intro">
        <h1>Sound Sniper,<br><em>aufgeräumt.</em></h1>
        <p>Sechs Momente, {{ totalStudies }} Konzepte. Weniger gleichzeitig, alles größer. Pro Moment ist eine Empfehlung markiert. Mit <kbd>↑</kbd> <kbd>↓</kbd> durch die Varianten.</p>
      </section>

      <nav class="sx-tabs" aria-label="Moment auswählen">
        <button
          v-for="(scenario, index) in scenarios"
          :key="scenario.id"
          type="button"
          class="sx-tab"
          :class="{ 'is-active': activeScenario === scenario.id }"
          :aria-pressed="activeScenario === scenario.id"
          @click="chooseScenario(scenario.id)"
        >
          <span class="sx-tab-index">{{ index + 1 }}</span>
          <span><strong>{{ scenario.label }}</strong><small>{{ scenario.detail }}</small></span>
        </button>
      </nav>

      <section class="sx-bench" :aria-label="`${activeStudy.label} Studie`">
        <aside class="sx-rail">
          <button
            v-for="(study, index) in studies[activeScenario]"
            :key="study.code"
            type="button"
            class="sx-pick"
            :class="{ 'is-active': selected[activeScenario] === index }"
            :aria-pressed="selected[activeScenario] === index"
            @click="chooseStudy(index)"
          >
            <span class="sx-code">{{ study.code }}</span>
            <span class="sx-pick-copy">
              <strong>{{ study.label }} <em v-if="study.recommended">Empfehlung</em></strong>
              <small>{{ study.note.replace('Empfehlung · ', '') }}</small>
            </span>
          </button>
        </aside>

        <div class="sx-preview">
          <div class="sx-bar">
            <span><b>{{ activeStudy.code }}</b> / {{ activeStudy.label }}</span>
            <span class="sx-bar-tools">
              <span v-if="activeScenario === 'buzz' || activeScenario === 'solution' || activeScenario === 'result'" class="sx-seg" role="group" aria-label="Team, das gebuzzert hat">
                <button v-for="team in ([0, 1] as const)" :key="team" type="button" :class="{ 'is-on': buzzer === team }" :aria-pressed="buzzer === team" @click="buzzer = team">{{ labMatch.names[team] }}</button>
              </span>
              <span v-if="activeScenario === 'result'" class="sx-seg" role="group" aria-label="Ausgang">
                <button v-for="option in outcomes" :key="option.id" type="button" :class="{ 'is-on': outcome === option.id }" :aria-pressed="outcome === option.id" @click="outcome = option.id; tick = 0">{{ option.label }}</button>
              </span>
              <button type="button" class="sx-full" @click="fullscreen = true"><Icon name="lucide:maximize-2" aria-hidden="true" /> Vollbild</button>
            </span>
          </div>

          <div class="sx-frame-wrap" :class="{ 'is-full': fullscreen }">
            <div class="sl-frame" :class="{ 'is-full': fullscreen }">
              <SniperLabStartStudy v-if="activeScenario === 'start'" :key="activeStudy.code" :variant="activeStudy.code" :reduced-motion="reducedMotion" />
              <SniperLabReadyStudy v-else-if="activeScenario === 'ready'" :key="activeStudy.code" :variant="activeStudy.code" />
              <SniperLabListenStudy v-else-if="activeScenario === 'listen'" :key="activeStudy.code" :variant="activeStudy.code" :seconds="listenSeconds" />
              <SniperLabBuzzStudy v-else-if="activeScenario === 'buzz'" :key="`${activeStudy.code}-${buzzer}`" :variant="activeStudy.code" :buzzer="buzzer" />
              <SniperLabSolutionStudy v-else-if="activeScenario === 'solution'" :key="`${activeStudy.code}-${buzzer}`" :variant="activeStudy.code" :buzzer="buzzer" />
              <SniperLabResultStudy v-else :key="`${activeStudy.code}-${buzzer}-${outcome}`" :variant="activeStudy.code" :outcome="outcome" :buzzer="buzzer" :tick="tick" />
            </div>
            <button v-if="fullscreen" type="button" class="sx-close" @click="fullscreen = false"><Icon name="lucide:x" aria-hidden="true" /> Schließen <kbd>Esc</kbd></button>
          </div>

          <p class="sx-why"><b>{{ activeStudy.recommended ? 'Empfehlung.' : 'Idee.' }}</b> {{ activeStudy.why }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
:global(html),
:global(body) {
  background: #071a13;
}

.sx {
  --sx-ink: #071a13;
  --sx-jungle: #0d2a1d;
  --sx-cream: #f3eedb;
  --sx-accent: #caff4a;
  --sx-muted: #9cac9a;
  --sx-line: rgb(243 238 219 / 16%);
  min-height: 100vh;
  background: var(--sx-ink);
  color: var(--sx-cream);
}

.sx :focus-visible {
  outline: 2px solid var(--sx-accent);
  outline-offset: 3px;
}

.sx kbd {
  display: inline-grid;
  min-width: 1.5em;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 0.3em;
  padding: 0.1em 0.3em;
  font-family: inherit;
  font-size: 0.8em;
  line-height: 1.1;
}

.sx-header {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--sx-line);
  padding: 0 var(--page-gutter);
}

.sx-brand {
  display: inline-flex;
  gap: 0.4rem;
  color: var(--sx-cream);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  text-decoration: none;
}

.sx-brand i {
  color: var(--sx-accent);
  font-style: normal;
}

.sx-header-nav {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 0.78rem;
  font-weight: 600;
}

.sx-header-nav a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--sx-muted);
  text-decoration: none;
  transition: color 160ms ease;
}

.sx-header-nav a:hover {
  color: var(--sx-accent);
}

.sx-header-nav .sx-back {
  color: var(--sx-cream);
}

.sx-main {
  width: min(100% - 2 * var(--page-gutter), 1680px);
  margin: 0 auto;
  padding-bottom: 5rem;
}

.sx-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3rem;
  padding: 2.2rem 0 1.6rem;
}

.sx-intro h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.6vw, 3.6rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.sx-intro h1 em {
  color: var(--sx-accent);
  font-style: normal;
}

.sx-intro p {
  max-width: 34rem;
  color: var(--sx-muted);
  font-size: 0.92rem;
  line-height: 1.5;
}

.sx-tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid var(--sx-line);
  border-bottom: 1px solid var(--sx-line);
}

.sx-tab {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 0;
  border-right: 1px solid var(--sx-line);
  background: transparent;
  color: var(--sx-muted);
  padding: 0.85rem 1rem;
  text-align: left;
  transition: background 160ms ease, color 160ms ease;
}

.sx-tab:last-child {
  border-right: 0;
}

.sx-tab:hover,
.sx-tab.is-active {
  background: var(--sx-jungle);
  color: var(--sx-cream);
}

.sx-tab-index {
  color: rgb(243 238 219 / 38%);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-variant-numeric: tabular-nums;
}

.sx-tab.is-active .sx-tab-index {
  color: var(--sx-accent);
}

.sx-tab strong,
.sx-tab small {
  display: block;
}

.sx-tab strong {
  font-size: 0.86rem;
  font-weight: 600;
}

.sx-tab small {
  margin-top: 0.15rem;
  font-size: 0.68rem;
}

.sx-bench {
  display: grid;
  grid-template-columns: 15.5rem minmax(0, 1fr);
  gap: 2rem;
  padding-top: 1.6rem;
}

.sx-rail {
  align-self: start;
  position: sticky;
  top: 1rem;
  border-top: 1px solid var(--sx-line);
}

.sx-pick {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 0.75rem;
  border: 0;
  border-bottom: 1px solid rgb(243 238 219 / 9%);
  background: transparent;
  color: var(--sx-muted);
  padding: 0.85rem 0;
  text-align: left;
  transition: color 160ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sx-pick:hover,
.sx-pick.is-active {
  color: var(--sx-cream);
  transform: translateX(5px);
}

.sx-code {
  display: grid;
  min-width: 2rem;
  height: 1.6rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
}

.sx-pick.is-active .sx-code {
  border-color: var(--sx-accent);
  background: var(--sx-accent);
  color: var(--sx-ink);
}

.sx-pick-copy strong,
.sx-pick-copy small {
  display: block;
}

.sx-pick-copy strong {
  font-size: 0.85rem;
  font-weight: 600;
}

.sx-pick-copy em {
  margin-left: 0.3rem;
  border-radius: 999px;
  background: rgb(202 255 74 / 14%);
  color: var(--sx-accent);
  padding: 0.12rem 0.45rem;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: 0.1em;
}

.sx-pick-copy small {
  margin-top: 0.25rem;
  color: var(--sx-muted);
  font-size: 0.72rem;
  line-height: 1.35;
}

.sx-preview {
  min-width: 0;
}

.sx-bar {
  display: flex;
  min-height: 2.4rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.7rem;
  color: var(--sx-muted);
  font-size: 0.74rem;
  font-weight: 600;
}

.sx-bar b {
  color: var(--sx-accent);
}

.sx-bar-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
}

.sx-seg {
  display: inline-flex;
  border: 1px solid var(--sx-line);
  border-radius: 999px;
  padding: 0.18rem;
}

.sx-seg button,
.sx-full {
  min-height: 1.9rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--sx-muted);
  padding: 0 0.8rem;
  font-size: 0.72rem;
  font-weight: 600;
  transition: background 160ms ease, color 160ms ease;
}

.sx-seg button:hover,
.sx-full:hover {
  color: var(--sx-cream);
}

.sx-seg button.is-on {
  background: var(--sx-accent);
  color: var(--sx-ink);
}

.sx-full {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--sx-line);
}

.sx-frame-wrap.is-full {
  position: fixed;
  z-index: 50;
  inset: 0;
  display: grid;
  place-items: center;
  background: #000;
}

.sl-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--sx-line);
  container-type: size;
}

.sl-frame.is-full {
  width: min(100vw, 100vh * 16 / 9);
  border: 0;
}

.sx-close {
  position: fixed;
  z-index: 51;
  bottom: 1rem;
  left: 1rem;
  display: inline-flex;
  opacity: 0.55;
  transition: opacity 160ms ease;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgb(243 238 219 / 30%);
  border-radius: 999px;
  background: rgb(7 26 19 / 85%);
  color: var(--sx-cream);
  padding: 0.45rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.sx-close:hover,
.sx-close:focus-visible {
  opacity: 1;
}

.sx-why {
  max-width: 68ch;
  margin-top: 1rem;
  color: var(--sx-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.sx-why b {
  color: var(--sx-cream);
}

@media (max-width: 1000px) {
  .sx-tabs {
    grid-template-columns: repeat(3, 1fr);
  }

  .sx-bench {
    grid-template-columns: 1fr;
  }

  .sx-rail {
    position: static;
  }
}
</style>
