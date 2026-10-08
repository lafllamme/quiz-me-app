<script setup lang="ts">
import { sniperCategoryLabel } from '~/data/sniper-sounds.types'
import { drinkingTeam, type SniperState, type Team } from '~/lib/sniper-machine'

/**
 * Sound Sniper play screen, built from the design lab picks:
 * R1 ready, H1 listening, B2 buzz (team half), L4 judging (choices with consequences), E2 result (point | drink).
 * The stage is a size container, so every measure is a share of the real screen (cqw / cqh).
 */
const props = defineProps<{
  state: SniperState
  names: [string, string]
  rounds: number
  round: number
  seconds: number
  countdown: number
  timeRemaining: number
  timerRunning: boolean
  paused: boolean
  playing: boolean
  plays: number
  maxPlays: number
  failed: boolean
}>()

const emit = defineEmits<{
  begin: []
  buzz: [team: Team]
  reveal: []
  undo: []
  right: []
  wrong: []
  replay: []
  togglePause: []
  skip: []
  next: []
}>()

const BARS = 36
// Fixed bar profile: a loud middle, quieter edges. Deterministic so SSR and client agree.
const bars = Array.from({ length: BARS }, (_, index) => {
  const centre = 1 - Math.abs(index - (BARS - 1) / 2) / (BARS / 2)
  return { height: 0.25 + centre * 0.6 + ((index * 37) % 11) / 40, delay: ((index * 53) % 17) * 45 }
})

const phase = computed(() => props.state.phase)
const buzzer = computed(() => props.state.buzzer)
const other = (team: Team) => (1 - team) as Team

/** One block per moment; the key drives the swap transition between them. */
const view = computed(() => {
  if (phase.value === 'buzzed')
    return props.state.revealed ? 'judge' : 'buzz'
  if (phase.value === 'resolved')
    return 'result'
  return phase.value
})
const showTicks = computed(() => view.value !== 'buzz')
const showDuel = computed(() => ['ready', 'countdown', 'listening', 'judge'].includes(view.value))

const soundNumber = computed(() => props.state.index + 1)
const progressLabel = computed(() => props.state.suddenDeath
  ? 'Entscheidungs-Sound · Wer ihn holt, gewinnt'
  : `Sound ${soundNumber.value} / ${props.state.total} · Runde ${props.round} / ${props.rounds}`)

const secondsLeft = computed(() => Math.ceil(props.timeRemaining))
const timerProgress = computed(() => Math.max(0, Math.min(1, props.timeRemaining / props.seconds)))
const warning = computed(() => phase.value === 'listening' && secondsLeft.value <= 5)

// Three arcs around the replay disc, one per listen; filled arcs are spent.
const arcs = computed(() => Array.from({ length: props.maxPlays }, (_, index) => {
  const gap = 6
  const span = 100 / props.maxPlays
  return { offset: -(index * span) - gap / 2, length: span - gap, used: index < props.plays }
}))
const listensLeft = computed(() => props.maxPlays - props.plays)

// Long solutions step down a size instead of breaking mid-word.
const answer = computed(() => props.state.current?.answer ?? '')
const answerSize = computed(() => answer.value.length > 16 ? 'xl' : answer.value.length > 11 ? 'l' : answer.value.length > 7 ? 'm' : 's')

const winner = computed(() => props.state.winner)
const drinker = computed(() => drinkingTeam(props.state))
const verdictTitle = computed(() => props.state.outcome === 'right' ? 'Richtig!' : props.state.outcome === 'wrong' ? 'Daneben!' : 'Zeit vorbei')
const pointLine = computed(() => {
  const { outcome, scores } = props.state
  if (outcome === 'wrong' && buzzer.value !== null)
    return `${props.names[buzzer.value]} lag falsch · Stand ${scores[0]} : ${scores[1]}`
  return `Stand ${scores[0]} : ${scores[1]}`
})
</script>

<template>
  <section class="sniper-stage" :class="[`sniper-stage--${view}`, buzzer !== null ? `sniper-stage--team-${buzzer}` : '']">
    <div v-if="showTicks" class="sniper-ticks" :aria-label="progressLabel">
      <div aria-hidden="true">
        <i v-for="tick in state.total" :key="tick" :class="{ 'is-done': tick < soundNumber, 'is-current': tick === soundNumber && !state.suddenDeath }" />
      </div>
      <span>{{ progressLabel }}</span>
    </div>

    <div v-if="showDuel" class="sniper-duel" aria-label="Punktestand">
      <div v-for="team in ([0, 1] as const)" :key="team" class="sniper-duel-team" :class="[`sniper-duel-team--${team}`, { 'is-active': view === 'judge' && buzzer === team }]">
        <span>{{ names[team] }}</span>
        <strong>{{ state.scores[team] }}</strong>
      </div>
      <i aria-hidden="true">:</i>
    </div>

    <Transition name="sniper-swap" mode="out-in">
      <!-- R1 / Volle Zeile: the headline across the full width, the action row at the foot. -->
      <div v-if="view === 'ready'" key="ready" class="sniper-main sniper-ready">
        <span class="sniper-pill">{{ state.suddenDeath ? 'Entscheidungs-Sound' : `Sound ${soundNumber} von ${state.total}` }}</span>
        <h2 class="sniper-display sniper-ready-title">Ohren <em>auf.</em></h2>
        <p class="sniper-ready-sub">Seid ihr bereit? Wer zuerst buzzert, muss liefern. Falsch geraten heißt: Punkt für die anderen.</p>
        <div class="sniper-ready-row">
          <button type="button" class="sniper-btn sniper-start" data-uisfx-press="press" @click="emit('begin')">
            <span class="sniper-start-icon"><Icon name="lucide:play" aria-hidden="true" /></span>
            Sound starten <kbd>Enter</kbd>
          </button>
          <dl class="sniper-facts">
            <div><dt>Hörzeit</dt><dd>{{ seconds }} Sek.</dd></div>
            <div><dt>Hören</dt><dd>bis zu {{ maxPlays }}×</dd></div>
            <div><dt>Buzzer</dt><dd><kbd>1</kbd> {{ names[0] }} · <kbd>2</kbd> {{ names[1] }}</dd></div>
          </dl>
        </div>
      </div>

      <div v-else-if="view === 'countdown'" key="countdown" class="sniper-main sniper-countdown" role="timer" :aria-label="countdown > 0 ? `Noch ${countdown}` : 'Los'">
        <strong :key="countdown" :class="{ 'is-go': countdown === 0 }">{{ countdown > 0 ? countdown : 'Los!' }}</strong>
      </div>

      <!-- H1 / Zähler im Knopf: the wave stays the hero; replay and the listen count are one control. -->
      <div v-else-if="view === 'listening'" key="listening" class="sniper-main sniper-listen">
        <div class="sniper-listen-copy">
          <div class="sniper-wave" :class="{ 'is-playing': playing }" aria-hidden="true">
            <i v-for="(bar, index) in bars" :key="index" :style="{ '--bar': bar.height, animationDelay: `${bar.delay}ms` }" />
          </div>
          <h2 class="sniper-display sniper-prompt">Was hört ihr?</h2>
          <button type="button" class="sniper-replay" :disabled="playing || listensLeft <= 0" :aria-label="`Nochmal hören, ${listensLeft} von ${maxPlays} übrig`" @click="emit('replay')">
            <span class="sniper-replay-disc">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  v-for="(arc, index) in arcs"
                  :key="index"
                  cx="50"
                  cy="50"
                  r="45"
                  pathLength="100"
                  :class="{ 'is-used': arc.used }"
                  :style="{ strokeDasharray: `${arc.length} ${100 - arc.length}`, strokeDashoffset: arc.offset }"
                />
              </svg>
              <Icon name="lucide:rotate-ccw" aria-hidden="true" />
            </span>
            <span class="sniper-replay-copy">
              <strong>{{ listensLeft > 0 ? 'Nochmal hören' : 'Keine Wiederholung mehr' }} <kbd>W</kbd></strong>
              <small>{{ listensLeft }} von {{ maxPlays }} übrig</small>
            </span>
          </button>
          <p v-if="failed" class="sniper-error" role="alert">Die Datei lässt sich nicht abspielen. Mit S überspringen.</p>
        </div>

        <aside class="sniper-clock" :class="{ 'is-warning': warning, 'is-alarm': warning && timerRunning }" role="timer" :aria-label="`Hörzeit: ${secondsLeft} Sekunden`">
          <span class="sniper-label">{{ paused ? 'Pausiert' : 'Hörzeit' }}</span>
          <strong>{{ secondsLeft }}<small>Sek.</small></strong>
          <i aria-hidden="true"><b :style="{ transform: `scaleX(${timerProgress})` }" /></i>
          <div class="sniper-host-row">
            <button type="button" class="sniper-host" @click="emit('togglePause')">{{ timerRunning ? 'Pause' : 'Weiter' }} <kbd>Leertaste</kbd></button>
            <button type="button" class="sniper-host" @click="emit('skip')">Überspringen <kbd>S</kbd></button>
          </div>
        </aside>
      </div>

      <!-- B2 / Teamhälfte: the buzzing team floods its half of the screen. -->
      <div v-else-if="view === 'buzz' && buzzer !== null" key="buzz" class="sniper-half" :class="`sniper-half--${buzzer}`">
        <div class="sniper-half-team sniper-half-team--on">
          <span class="sniper-label">Zuerst gebuzzert</span>
          <strong class="sniper-display">{{ names[buzzer] }}</strong>
          <p>Antwort laut sagen.</p>
          <button type="button" class="sniper-btn sniper-btn--ink sniper-reveal-btn" @click="emit('reveal')">
            <Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <kbd>{{ buzzer === 0 ? 'A' : 'B' }}</kbd>
          </button>
          <b class="sniper-half-score">{{ state.scores[buzzer] }}</b>
        </div>
        <div class="sniper-half-team sniper-half-team--off">
          <span class="sniper-label">Wartet</span>
          <strong class="sniper-display">{{ names[other(buzzer)] }}</strong>
          <p>Liegt {{ names[buzzer] }} falsch, geht der Punkt hierher.</p>
          <b class="sniper-half-score">{{ state.scores[other(buzzer)] }}</b>
          <div class="sniper-half-host">
            <button type="button" class="sniper-host" @click="emit('undo')"><kbd>⌫</kbd> Falsches Team</button>
            <button type="button" class="sniper-host" @click="emit('skip')"><kbd>S</kbd> Überspringen</button>
          </div>
        </div>
      </div>

      <!-- L4 / Mit Folgen: the solution in the middle, each verdict shows what it causes. -->
      <div v-else-if="view === 'judge' && buzzer !== null" key="judge" class="sniper-main sniper-judge">
        <div class="sniper-judge-answer">
          <span class="sniper-label">Lösung</span>
          <h2 class="sniper-display sniper-answer" :class="`sniper-answer--${answerSize}`">{{ answer }}</h2>
          <p class="sniper-judge-question">
            <span>Hatte <b>{{ names[buzzer] }}</b> recht?</span>
            <button type="button" class="sniper-host" :disabled="playing" @click="emit('replay')">So klang es <kbd>W</kbd></button>
          </p>
        </div>
        <div class="sniper-choices">
          <button type="button" class="sniper-choice sniper-choice--right" @click="emit('right')">
            <span class="sniper-choice-head"><Icon name="lucide:check" aria-hidden="true" /> Richtig <kbd>R</kbd></span>
            <span class="sniper-choice-effect"><b>+1 {{ names[buzzer] }}</b><small>{{ names[other(buzzer)] }} trinkt</small></span>
          </button>
          <button type="button" class="sniper-choice sniper-choice--wrong" @click="emit('wrong')">
            <span class="sniper-choice-head"><Icon name="lucide:x" aria-hidden="true" /> Falsch <kbd>F</kbd></span>
            <span class="sniper-choice-effect"><b>+1 {{ names[other(buzzer)] }}</b><small>{{ names[buzzer] }} trinkt</small></span>
          </button>
        </div>
      </div>

      <!-- E2 / Punkt | Schluck: the solution on a strip, the screen splits into what the round gave. -->
      <div v-else-if="view === 'result' && state.current" key="result" class="sniper-result">
        <div class="sniper-result-strip">
          <span class="sniper-label">Lösung</span>
          <strong class="sniper-display" :class="`sniper-result-answer--${answerSize}`">{{ answer }}</strong>
          <span class="sniper-pill">{{ sniperCategoryLabel(state.current.category) }}</span>
          <span class="sniper-result-actions">
            <button type="button" class="sniper-host" :disabled="playing" @click="emit('replay')">So klang es <kbd>W</kbd></button>
            <button type="button" class="sniper-btn" @click="emit('next')">Weiter <kbd>Enter</kbd></button>
          </span>
        </div>
        <div class="sniper-result-halves">
          <div class="sniper-result-half" :class="winner === null ? 'is-empty' : 'is-point'">
            <span class="sniper-label">{{ verdictTitle }}</span>
            <b class="sniper-display">{{ winner === null ? '0' : '+1' }}</b>
            <strong>{{ winner === null ? 'Keine Punkte' : names[winner] }}</strong>
            <small>{{ pointLine }}</small>
          </div>
          <div class="sniper-result-half" :class="drinker === null ? 'is-empty' : 'is-drink'">
            <span class="sniper-label">{{ drinker === null ? 'Glück gehabt' : 'Prost' }}</span>
            <b class="sniper-display"><Icon name="lucide:beer" aria-hidden="true" /></b>
            <strong>{{ drinker === null ? 'Keiner trinkt' : names[drinker] }}</strong>
            <small>{{ drinker === null ? 'Nächster Sound, neues Glück' : 'trinkt' }}</small>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.sniper-stage {
  --sn-ink: #081811;
  --sn-forest: #0b4429;
  --sn-cream: #fbf8ed;
  --sn-accent: #caff4a;
  --sn-muted: #8fc7a2;
  --sn-coral: #dd927b;
  --sn-line: rgb(251 248 237 / 20%);
  --sn-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --sn-pad-x: var(--page-gutter);
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  isolation: isolate;
  container-type: size;
  background: var(--sn-ink);
  color: var(--sn-cream);
  font-family: var(--font-ui);
}

.sniper-display {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 0.88;
}

.sniper-label {
  color: var(--sn-muted);
  font-size: max(10px, 0.9cqw);
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 1.2;
  text-transform: uppercase;
}

.sniper-stage kbd {
  display: inline-grid;
  min-width: 1.5em;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 0.32em;
  padding: 0.18em 0.36em 0.14em;
  font-family: var(--font-ui);
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  opacity: 0.85;
}

.sniper-pill {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  border: 1px solid rgb(202 255 74 / 28%);
  border-radius: 999px;
  background: rgb(202 255 74 / 10%);
  color: var(--sn-accent);
  padding: 0.9cqh 1.1cqw 0.8cqh;
  font-size: max(10px, 0.88cqw);
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Primary action: a full pill, lime on ink. */
.sniper-btn {
  display: inline-flex;
  min-height: max(48px, 7.4cqh);
  align-items: center;
  justify-content: center;
  gap: 1cqw;
  border: 0;
  border-radius: 999px;
  background: var(--sn-accent);
  color: var(--sn-ink);
  cursor: pointer;
  padding: 0 2.4cqw;
  font-size: max(12px, 1.2cqw);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: transform 220ms var(--sn-ease);
}

.sniper-btn:hover {
  transform: translateY(-2px);
}

.sniper-btn:active {
  transform: translateY(0) scale(0.98);
}

.sniper-btn--ink {
  background: var(--sn-ink);
  color: var(--sn-accent);
}

/* Quiet host control: small, muted, never competes with the stage. */
.sniper-host {
  display: inline-flex;
  align-items: center;
  gap: 0.6cqw;
  border: 0;
  background: transparent;
  color: var(--sn-muted);
  cursor: pointer;
  padding: 0.6cqh 0;
  font-size: max(10px, 0.85cqw);
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition: color 160ms ease, opacity 160ms ease;
}

.sniper-host:hover:not(:disabled) {
  color: var(--sn-cream);
}

.sniper-host:disabled {
  cursor: default;
  opacity: 0.4;
}

.sniper-stage button:focus-visible {
  outline: 2px solid var(--sn-accent);
  outline-offset: 4px;
}

/* Head: progress ticks share the header line with the logo and nav, the duel sits below. */
.sniper-ticks {
  position: absolute;
  z-index: 3;
  top: 2rem;
  left: 50%;
  display: grid;
  min-height: 2.5rem;
  align-content: center;
  justify-items: center;
  gap: 1.1cqh;
  transform: translateX(-50%);
}

.sniper-ticks > div {
  display: flex;
  gap: 0.35cqw;
}

.sniper-ticks i {
  width: 2.6cqw;
  height: max(3px, 0.5cqh);
  border-radius: 2px;
  background: var(--sn-line);
  transition: background 240ms ease;
}

.sniper-ticks i.is-done {
  background: color-mix(in srgb, var(--sn-cream) 62%, transparent);
}

.sniper-ticks i.is-current {
  background: var(--sn-accent);
}

.sniper-ticks > span {
  color: var(--sn-accent);
  font-size: max(10px, 0.78cqw);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
}

.sniper-duel {
  position: absolute;
  z-index: 2;
  top: 13.5cqh;
  left: 50%;
  display: grid;
  width: 54cqw;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  color: var(--sn-muted);
  font-size: max(22px, 3.1cqw);
  transform: translateX(-50%);
}

.sniper-duel > i {
  grid-column: 2;
  grid-row: 1;
  padding: 0 1.2cqw;
  color: var(--sn-line);
  font-family: var(--font-display);
  font-size: 0.8em;
  font-style: normal;
  line-height: 1;
}

.sniper-duel-team {
  display: flex;
  min-width: 0;
  grid-row: 1;
  align-items: center;
  gap: 1cqw;
}

.sniper-duel-team--0 {
  grid-column: 1;
  justify-content: flex-end;
}

.sniper-duel-team--1 {
  grid-column: 3;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.sniper-duel-team span {
  overflow: hidden;
  font-size: 0.42em;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.sniper-duel-team strong {
  color: var(--sn-cream);
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 0.85;
}

.sniper-duel-team.is-active span,
.sniper-duel-team.is-active strong {
  color: var(--sn-accent);
}

/* Play area below the head. */
.sniper-main {
  position: absolute;
  top: 23cqh;
  right: var(--sn-pad-x);
  bottom: 6.4cqh;
  left: var(--sn-pad-x);
  min-height: 0;
}

/* Phase swap: the old block lifts away quickly, the new one settles in. */
.sniper-swap-enter-active {
  transition: opacity 320ms var(--sn-ease), transform 420ms var(--sn-ease);
}

.sniper-swap-leave-active {
  transition: opacity 160ms ease-in, transform 160ms ease-in;
}

.sniper-swap-enter-from {
  opacity: 0;
  transform: translateY(1.6cqh);
}

.sniper-swap-leave-to {
  opacity: 0;
  transform: translateY(-1cqh);
}

/* R1 ready */
.sniper-ready {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sniper-ready-title {
  margin: 3cqh 0 0;
  font-size: min(15cqw, 27cqh);
  line-height: 0.82;
  white-space: nowrap;
}

.sniper-ready-title em {
  color: var(--sn-accent);
  font-style: normal;
}

.sniper-ready-sub {
  max-width: 52ch;
  margin-top: 3.4cqh;
  color: color-mix(in srgb, var(--sn-cream) 84%, transparent);
  font-size: min(2.35cqw, 4.6cqh);
  font-weight: 500;
  line-height: 1.25;
  text-wrap: pretty;
}

.sniper-ready-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  margin-top: auto;
  border-top: 1px solid var(--sn-line);
  padding-top: 3.4cqh;
}

.sniper-start {
  min-height: max(56px, 10cqh);
  gap: 1.2cqw;
  padding: 0 2.6cqw 0 1cqh;
  font-size: max(13px, 1.4cqw);
}

.sniper-start-icon {
  display: grid;
  width: max(44px, 8cqh);
  height: max(44px, 8cqh);
  place-items: center;
  border-radius: 50%;
  background: var(--sn-ink);
  color: var(--sn-accent);
  font-size: max(18px, 3.4cqh);
}

.sniper-facts {
  display: flex;
  gap: 3.4cqw;
  margin: 0;
}

.sniper-facts div {
  display: grid;
  gap: 0.8cqh;
}

.sniper-facts dt {
  color: var(--sn-muted);
  font-size: max(10px, 0.9cqw);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.sniper-facts dd {
  margin: 0;
  font-size: max(13px, 1.35cqw);
  font-weight: 600;
  white-space: nowrap;
}

/* Countdown: one huge digit that lands on each beat of the cue. */
.sniper-countdown {
  display: grid;
  place-items: center;
}

.sniper-countdown strong {
  color: var(--sn-accent);
  font-family: var(--font-display);
  font-size: min(26cqw, 52cqh);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.8;
  animation: sniper-count 800ms var(--sn-ease) both;
}

.sniper-countdown strong.is-go {
  font-size: min(17cqw, 34cqh);
}

@keyframes sniper-count {
  from { opacity: 0; transform: scale(1.35); }
  35% { opacity: 1; transform: scale(1); }
  to { opacity: 0.9; transform: scale(0.95); }
}

/* H1 listening */
.sniper-listen {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28cqw;
  align-items: center;
  gap: 5cqw;
}

.sniper-listen-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.sniper-wave {
  display: flex;
  width: min(100%, 46cqw);
  height: 21cqh;
  align-items: center;
  gap: 0.42cqw;
}

.sniper-wave i {
  height: 100%;
  flex: 1;
  border-radius: 99px;
  background: var(--sn-accent);
  opacity: 0.3;
  transform: scaleY(calc(var(--bar) * 0.14));
  transition: transform 420ms var(--sn-ease), opacity 300ms ease;
}

.sniper-wave.is-playing i {
  opacity: 1;
  animation: sniper-bar 620ms ease-in-out infinite alternate;
}

@keyframes sniper-bar {
  from { transform: scaleY(calc(var(--bar) * 0.25)); }
  to { transform: scaleY(var(--bar)); }
}

.sniper-prompt {
  margin: 3cqh 0 0;
  font-size: min(5.6cqw, 11cqh);
}

.sniper-replay {
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  margin-top: 4cqh;
  border: 0;
  background: transparent;
  color: var(--sn-cream);
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: opacity 160ms ease;
}

.sniper-replay:disabled {
  cursor: default;
  opacity: 0.45;
}

.sniper-replay-disc {
  position: relative;
  display: grid;
  width: max(64px, 11cqh);
  aspect-ratio: 1;
  place-items: center;
  color: var(--sn-accent);
  font-size: max(22px, 4cqh);
  transition: transform 260ms var(--sn-ease);
}

.sniper-replay:hover:not(:disabled) .sniper-replay-disc {
  transform: rotate(-30deg);
}

.sniper-replay-disc svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.sniper-replay-disc circle {
  fill: none;
  stroke: rgb(202 255 74 / 30%);
  stroke-linecap: round;
  stroke-width: 6;
  transition: stroke 240ms ease;
}

.sniper-replay-disc circle.is-used {
  stroke: var(--sn-accent);
}

.sniper-replay-copy strong {
  display: flex;
  align-items: center;
  gap: 0.8cqw;
  font-size: max(15px, 1.9cqw);
  font-weight: 600;
}

.sniper-replay-copy small {
  display: block;
  margin-top: 0.8cqh;
  color: var(--sn-muted);
  font-size: max(12px, 1.25cqw);
  font-weight: 500;
}

.sniper-error {
  margin-top: 2cqh;
  color: var(--sn-coral);
}

.sniper-clock {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border-left: 1px solid var(--sn-line);
  padding-left: 3cqw;
}

.sniper-clock > strong {
  display: flex;
  align-items: baseline;
  gap: 0.8cqw;
  margin-top: 1.4cqh;
  color: var(--sn-accent);
  font-family: var(--font-display);
  font-size: min(15cqw, 29cqh);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.75;
  transition: color 200ms ease;
}

.sniper-clock > strong small {
  color: var(--sn-muted);
  font-family: var(--font-ui);
  font-size: max(10px, 0.9cqw);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sniper-clock > i {
  display: block;
  height: max(5px, 1cqh);
  margin-top: 2.4cqh;
  overflow: hidden;
  border-radius: 99px;
  background: rgb(251 248 237 / 12%);
}

.sniper-clock > i b {
  display: block;
  height: 100%;
  background: var(--sn-accent);
  transform-origin: left center;
  transition: transform 100ms linear, background 200ms ease;
}

.sniper-clock.is-warning > strong,
.sniper-clock.is-warning > .sniper-label {
  color: var(--sn-coral);
}

.sniper-clock.is-warning > i b {
  background: var(--sn-coral);
}

.sniper-clock.is-alarm > strong {
  animation: sniper-alarm 1s ease-in-out infinite;
}

@keyframes sniper-alarm {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.06); }
}

.sniper-host-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4cqh 2cqw;
  margin-top: 1.4cqh;
}

/* B2 buzz: the buzzing team floods its half of the screen. */
.sniper-half {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sniper-half--1 {
  direction: rtl;
}

.sniper-half-team {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  direction: ltr;
  padding: 14cqh var(--sn-pad-x) 12cqh;
}

.sniper-half-team--on {
  background: var(--sn-accent);
  color: var(--sn-ink);
  animation: sniper-flood 520ms var(--sn-ease) both;
}

.sniper-half--1 .sniper-half-team--on {
  animation-name: sniper-flood-rev;
}

@keyframes sniper-flood {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

@keyframes sniper-flood-rev {
  from { clip-path: inset(0 0 0 100%); }
  to { clip-path: inset(0 0 0 0); }
}

.sniper-half-team--on .sniper-label {
  color: rgb(8 24 17 / 70%);
}

.sniper-half-team strong {
  margin-top: 1.6cqh;
  overflow-wrap: anywhere;
  font-size: min(7.6cqw, 15cqh);
  font-weight: 600;
}

.sniper-half-team p {
  max-width: 24ch;
  margin-top: 2.4cqh;
  font-size: min(2.2cqw, 4.4cqh);
  font-weight: 500;
}

.sniper-reveal-btn {
  align-self: flex-start;
  min-height: max(56px, 9cqh);
  margin-top: 4cqh;
  padding: 0 2.6cqw;
}

.sniper-half-team--off {
  color: var(--sn-muted);
}

.sniper-half-team--off strong {
  color: color-mix(in srgb, var(--sn-cream) 55%, transparent);
  font-size: min(4.6cqw, 9cqh);
}

.sniper-half-score {
  position: absolute;
  top: 14cqh;
  right: var(--sn-pad-x);
  font-family: var(--font-display);
  font-size: min(6cqw, 12cqh);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  line-height: 1;
}

.sniper-half-team--off .sniper-half-score {
  color: var(--sn-cream);
}

.sniper-half-host {
  position: absolute;
  right: var(--sn-pad-x);
  bottom: 4cqh;
  left: var(--sn-pad-x);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4cqh 2cqw;
}

/* L4 judging */
.sniper-judge {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sniper-judge-answer {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.sniper-answer {
  max-width: 100%;
  margin: 1.4cqh 0 0;
  letter-spacing: -0.04em;
  line-height: 0.86;
  text-wrap: balance;
  animation: sniper-rise 560ms var(--sn-ease) both;
}

.sniper-answer--s { font-size: min(12cqw, 22cqh); }
.sniper-answer--m { font-size: min(9.6cqw, 19cqh); }
.sniper-answer--l { font-size: min(7.4cqw, 15cqh); }
.sniper-answer--xl { font-size: min(6cqw, 12cqh); }

@keyframes sniper-rise {
  from { opacity: 0; transform: translateY(2.4cqh); }
  to { opacity: 1; transform: none; }
}

.sniper-judge-question {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6cqh 2cqw;
  margin-top: 2.6cqh;
  color: color-mix(in srgb, var(--sn-cream) 82%, transparent);
  font-size: min(2.4cqw, 4.6cqh);
  font-weight: 500;
}

.sniper-judge-question b {
  color: var(--sn-accent);
  font-weight: 600;
}

.sniper-choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2cqw;
  margin-top: 3cqh;
}

.sniper-choice {
  display: flex;
  min-width: 0;
  min-height: 17cqh;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  border-radius: 2.4cqh;
  cursor: pointer;
  padding: 0 2.6cqw;
  text-align: left;
  transition: transform 200ms var(--sn-ease);
}

.sniper-choice:hover {
  transform: translateY(-3px);
}

.sniper-choice-head {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.9cqw;
  font-size: min(2.6cqw, 5cqh);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sniper-choice-effect {
  display: grid;
  min-width: 0;
  justify-items: end;
  gap: 0.6cqh;
  text-align: right;
}

.sniper-choice-effect b {
  max-width: 100%;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: min(2.2cqw, 4.4cqh);
  font-weight: 600;
  letter-spacing: -0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sniper-choice-effect small {
  font-size: max(11px, 1.1cqw);
  font-weight: 600;
  opacity: 0.75;
}

.sniper-choice--right {
  border: 0;
  background: var(--sn-accent);
  color: var(--sn-ink);
}

.sniper-choice--wrong {
  border: 2px solid var(--sn-coral);
  background: rgb(221 146 123 / 8%);
  color: var(--sn-coral);
}

/* E2 result */
.sniper-result-strip {
  position: absolute;
  top: 13cqh;
  right: var(--sn-pad-x);
  left: var(--sn-pad-x);
  display: flex;
  align-items: center;
  gap: 1.8cqw;
  border-bottom: 1px solid var(--sn-line);
  padding-bottom: 3cqh;
}

.sniper-result-strip > strong {
  min-width: 0;
  overflow: hidden;
  font-size: min(5.4cqw, 10.4cqh);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sniper-result-strip > strong.sniper-result-answer--l { font-size: min(4.4cqw, 8.6cqh); }
.sniper-result-strip > strong.sniper-result-answer--xl { font-size: min(3.4cqw, 6.8cqh); }

.sniper-result-strip .sniper-pill {
  align-self: center;
}

.sniper-result-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 2cqw;
  margin-left: auto;
}

.sniper-result-halves {
  position: absolute;
  top: 33cqh;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sniper-result-half {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--sn-pad-x);
  animation: sniper-rise 520ms var(--sn-ease) both;
}

.sniper-result-half + .sniper-result-half {
  animation-delay: 140ms;
}

.sniper-result-half .sniper-label {
  color: inherit;
  opacity: 0.75;
}

.sniper-result-half b {
  display: flex;
  height: 0.82em;
  align-items: center;
  margin-top: 1.4cqh;
  font-size: min(14cqw, 26cqh);
  line-height: 0.82;
}

.sniper-result-half b .iconify {
  width: 0.78em;
  height: 0.78em;
}

.sniper-result-half strong {
  margin-top: 2cqh;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: min(3.8cqw, 7.4cqh);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sniper-result-half small {
  margin-top: 1cqh;
  font-size: max(12px, 1.3cqw);
  font-weight: 600;
  opacity: 0.75;
}

.sniper-result-half.is-point {
  background: var(--sn-accent);
  color: var(--sn-ink);
}

.sniper-result-half.is-drink {
  background: var(--sn-coral);
  color: var(--sn-ink);
}

.sniper-result-half.is-empty {
  border-top: 1px solid var(--sn-line);
  color: var(--sn-muted);
}

.sniper-result-half.is-empty + .is-empty {
  border-left: 1px solid var(--sn-line);
}

@media (max-width: 809px) {
  .sniper-listen {
    grid-template-columns: 1fr;
    gap: 3cqh;
  }

  .sniper-clock {
    border-left: 0;
    padding-left: 0;
  }

  .sniper-ready-row,
  .sniper-result-strip {
    flex-wrap: wrap;
  }

  .sniper-facts {
    flex-wrap: wrap;
    gap: 2cqh 6cqw;
  }

  .sniper-ready-title {
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sniper-swap-enter-active,
  .sniper-swap-leave-active {
    transition: opacity 120ms linear;
  }

  .sniper-swap-enter-from,
  .sniper-swap-leave-to {
    transform: none;
  }

  .sniper-wave.is-playing i {
    animation: none;
    transform: scaleY(var(--bar));
  }

  .sniper-half-team--on {
    animation: none;
  }
}
</style>
