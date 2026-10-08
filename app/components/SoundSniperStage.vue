<script setup lang="ts">
import { sniperCategoryLabel } from '~/data/sniper-sounds.types'
import { drinkingTeam, type SniperState, type Team } from '~/lib/sniper-machine'

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
const listeningOpen = computed(() => phase.value === 'listening')
const timerProgress = computed(() => Math.max(0, Math.min(1, props.timeRemaining / props.seconds)))
const secondsLeft = computed(() => Math.ceil(props.timeRemaining))
const warning = computed(() => listeningOpen.value && secondsLeft.value <= 5)
const timerDone = computed(() => phase.value === 'buzzed' || phase.value === 'resolved')
const timerLabel = computed(() => {
  if (phase.value === 'buzzed')
    return 'Gestoppt'
  if (phase.value === 'resolved')
    return props.state.outcome === 'timeout' ? 'Zeit vorbei' : 'Gestoppt'
  if (props.paused)
    return 'Pausiert'
  return 'Hörzeit'
})

const soundNumber = computed(() => props.state.index + 1)
const progressLabel = computed(() => props.state.suddenDeath
  ? 'Entscheidungs-Sound · Wer ihn holt, gewinnt'
  : `Sound ${soundNumber.value} / ${props.state.total} · Runde ${props.round} / ${props.rounds}`)

const other = (team: Team) => (1 - team) as Team
const loser = computed(() => drinkingTeam(props.state))
const verdict = computed(() => {
  const { outcome, buzzer, winner } = props.state
  if (outcome === 'right' && winner !== null)
    return { title: 'Richtig!', line: `+1 für ${props.names[winner]}` }
  if (outcome === 'wrong' && buzzer !== null && winner !== null)
    return { title: 'Daneben!', line: `${props.names[buzzer]} lag falsch · +1 für ${props.names[winner]}` }
  return { title: 'Keiner wusste es', line: 'Keine Punkte' }
})
const drinkLine = computed(() => loser.value === null ? 'Keiner trinkt' : `${props.names[loser.value]} trinkt!`)
</script>

<template>
  <section
    class="question-live-stage sniper-stage"
    :class="[`sniper-stage--${phase}`, { 'sniper-stage--sudden': state.suddenDeath }]"
  >
    <div class="question-live-progress" :aria-label="progressLabel">
      <div aria-hidden="true">
        <i v-for="tick in state.total" :key="tick" :class="{ 'is-done': tick < soundNumber, 'is-current': tick === soundNumber && !state.suddenDeath }" />
      </div>
      <span>{{ progressLabel }}</span>
    </div>

    <div class="question-live-duel" aria-label="Punktestand">
      <div
        v-for="index in [0, 1] as const"
        :key="index"
        class="question-live-team"
        :class="[`question-live-team--${index === 0 ? 'one' : 'two'}`, { 'question-live-team--active': state.buzzer === index && phase === 'buzzed' }]"
      >
        <span class="question-live-team-name">{{ names[index] }}</span>
        <strong :key="`${index}-${state.scores[index]}`" class="question-live-team-score" :class="{ 'sniper-score-pop': phase === 'resolved' && state.winner === index }">{{ state.scores[index] }}</strong>
        <small v-if="phase === 'buzzed' && state.buzzer === index" class="question-live-team-badge">Antwortet</small>
        <small v-else-if="phase === 'resolved' && state.winner === index" class="question-live-team-badge sniper-plus">+1</small>
      </div>
      <span class="question-live-duel-divider" aria-hidden="true">:</span>
    </div>

    <div class="question-live-main">
      <div class="sniper-stage-copy" aria-live="polite">
        <!-- Ready: big invitation, nothing about the sound itself. -->
        <template v-if="phase === 'ready'">
          <span class="question-live-category">{{ state.suddenDeath ? 'Entscheidung' : `Sound ${soundNumber} von ${state.total}` }}</span>
          <h2 class="sniper-headline">Ohren<br><em>auf.</em></h2>
          <p class="sniper-sub">Seid ihr bereit? Wer zuerst buzzert, muss liefern. Falsch geraten heißt: Punkt für die anderen.</p>
          <button type="button" class="button-primary sniper-start" data-uisfx-press="press" @click="emit('begin')">
            Sound starten <kbd>Enter</kbd>
          </button>
        </template>

        <div v-else-if="phase === 'countdown'" class="sniper-countdown" role="timer" :aria-label="`Noch ${countdown}`">
          <strong :key="countdown">{{ countdown }}</strong>
        </div>

        <template v-else-if="phase === 'listening'">
          <div class="sniper-wave" :class="{ 'is-playing': playing }" aria-hidden="true">
            <i v-for="(bar, index) in bars" :key="index" :style="{ '--bar': bar.height, animationDelay: `${bar.delay}ms` }" />
          </div>
          <h2 class="sniper-prompt">Was hört ihr?</h2>
          <div class="sniper-plays">
            <span class="sniper-plays-dots" :aria-label="`Wiedergabe ${plays} von ${maxPlays}`">
              <i v-for="slot in maxPlays" :key="slot" :class="{ 'is-used': slot <= plays }" />
            </span>
            <span>Wiedergabe {{ plays }} / {{ maxPlays }}</span>
            <button v-if="plays < maxPlays" type="button" class="question-live-action" :disabled="playing" @click="emit('replay')">
              <Icon name="lucide:rotate-ccw" size="15" aria-hidden="true" /> Erneut abspielen <kbd>W</kbd>
            </button>
          </div>
          <p v-if="failed" class="sniper-error" role="alert">Die Datei lässt sich nicht abspielen. Mit S überspringen.</p>
        </template>

        <!-- Buzzed: the team that hit first takes the whole stage. -->
        <div v-else-if="phase === 'buzzed' && state.buzzer !== null" class="sniper-buzz" :class="`sniper-buzz--${state.buzzer === 0 ? 'one' : 'two'}`">
          <span>Zuerst gebuzzert</span>
          <strong>{{ names[state.buzzer] }}</strong>
          <p>Antwort laut sagen. Falsch = Punkt für {{ names[other(state.buzzer)] }}.</p>
          <div class="sniper-judge">
            <button type="button" class="sniper-judge-right" @click="emit('right')"><Icon name="lucide:check" size="20" aria-hidden="true" /> Richtig <kbd>R</kbd></button>
            <button type="button" class="sniper-judge-wrong" @click="emit('wrong')"><Icon name="lucide:x" size="20" aria-hidden="true" /> Falsch <kbd>F</kbd></button>
          </div>
        </div>

        <!-- Resolved: the only place the solution is ever rendered. -->
        <div v-else-if="phase === 'resolved' && state.current" class="sniper-reveal" :class="`sniper-reveal--${state.outcome}`">
          <span class="question-live-category">{{ sniperCategoryLabel(state.current.category) }}</span>
          <p class="sniper-reveal-label">Lösung</p>
          <h2 class="sniper-reveal-answer">{{ state.current.answer }}</h2>
          <p class="sniper-reveal-verdict"><b>{{ verdict.title }}</b> {{ verdict.line }}</p>
          <p class="sniper-reveal-drink" :class="{ 'is-quiet': loser === null }">{{ drinkLine }}</p>
        </div>
      </div>

      <aside class="question-live-timer" :class="{ 'question-live-timer--warning': warning, 'question-live-timer--done': timerDone, 'sniper-timer--alarm': warning && timerRunning }" aria-label="Hörzeit">
        <span class="question-live-timer-label">{{ timerLabel }}</span>
        <strong>{{ secondsLeft }}<small>Sek.</small></strong>
        <i aria-hidden="true"><b :style="{ transform: `scaleX(${timerProgress})` }" /></i>
        <div class="question-live-timer-actions">
          <button v-if="listeningOpen" type="button" @click="emit('togglePause')">{{ timerRunning ? 'Pause' : 'Weiter' }} <kbd>Leertaste</kbd></button>
          <button v-if="phase === 'buzzed'" type="button" @click="emit('undo')">Falsches Team <kbd>⌫</kbd></button>
          <button v-if="phase !== 'resolved'" type="button" @click="emit('skip')">Überspringen <kbd>S</kbd></button>
          <button v-else type="button" :disabled="playing" @click="emit('replay')">So klang es <kbd>W</kbd></button>
        </div>
      </aside>
    </div>

    <div class="question-live-foot">
      <template v-if="phase === 'resolved'">
        <p class="question-live-hint sniper-foot-credit">
          Sound: {{ state.current?.credit.author }} · {{ state.current?.credit.license }}
        </p>
        <button type="button" class="button-primary question-live-next" @click="emit('next')">Weiter <kbd>Enter</kbd></button>
      </template>
      <p v-else-if="phase === 'buzzed'" class="question-live-hint">Bewerten mit <kbd>R</kbd> richtig oder <kbd>F</kbd> falsch</p>
      <p v-else class="question-live-hint">Buzzer: <kbd>1</kbd> / <kbd>A</kbd> {{ names[0] }} · <kbd>2</kbd> / <kbd>B</kbd> {{ names[1] }}</p>
    </div>
  </section>
</template>

<style scoped>
.sniper-stage-copy {
  display: flex;
  min-width: 0;
  min-height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.sniper-headline {
  margin: clamp(1rem, 2.6vh, 1.75rem) 0 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, min(9vw, 17vh), 11rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 0.84;
}

.sniper-headline em {
  color: var(--question-accent);
  font-style: normal;
}

.sniper-sub {
  max-width: 34ch;
  margin-top: clamp(1rem, 2.4vh, 1.6rem);
  color: color-mix(in srgb, var(--question-cream) 78%, transparent);
  font-size: clamp(1.05rem, 1.5vw, 1.5rem);
  line-height: 1.35;
  text-wrap: balance;
}

.sniper-start {
  margin-top: clamp(1.4rem, 3vh, 2.2rem);
  border-color: var(--question-accent);
  background: var(--question-accent);
  color: var(--question-ink);
}

.sniper-stage kbd {
  margin-left: 0.2rem;
}

/* Countdown: one huge digit that lands on each step. */
.sniper-countdown {
  display: grid;
  width: 100%;
  place-items: center;
}

.sniper-countdown strong {
  color: var(--question-accent);
  font-family: var(--font-display);
  font-size: clamp(10rem, min(26vw, 48vh), 26rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.8;
  animation: sniper-count 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes sniper-count {
  from { opacity: 0; transform: scale(1.35); }
  35% { opacity: 1; transform: scale(1); }
  to { opacity: 0.85; transform: scale(0.94); }
}

/* Listening: the waveform moves only while the file actually plays. */
.sniper-wave {
  display: flex;
  width: min(100%, 44rem);
  height: clamp(7rem, 22vh, 13rem);
  align-items: center;
  gap: clamp(3px, 0.5vw, 7px);
}

.sniper-wave i {
  height: 100%;
  flex: 1;
  border-radius: 99px;
  background: var(--question-accent);
  opacity: 0.3;
  transform: scaleY(calc(var(--bar) * 0.14));
  transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease;
}

.sniper-wave.is-playing i {
  opacity: 1;
  transform: scaleY(calc(var(--bar) * 0.5));
  animation: sniper-bar 620ms ease-in-out infinite alternate;
}

@keyframes sniper-bar {
  from { transform: scaleY(calc(var(--bar) * 0.25)); }
  to { transform: scaleY(var(--bar)); }
}

.sniper-prompt {
  margin: clamp(1rem, 2.6vh, 1.8rem) 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, min(5.4vw, 10vh), 6.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 0.9;
}

.sniper-plays {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.2rem;
  margin-top: clamp(0.8rem, 2vh, 1.4rem);
  color: var(--question-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sniper-plays-dots {
  display: inline-flex;
  gap: 0.35rem;
}

.sniper-plays-dots i {
  width: 0.7rem;
  height: 0.7rem;
  border: 2px solid var(--question-accent);
  border-radius: 50%;
}

.sniper-plays-dots i.is-used {
  background: var(--question-accent);
}

.sniper-plays .question-live-action:disabled {
  cursor: default;
  opacity: 0.4;
}

.sniper-error {
  margin-top: 1rem;
  color: var(--question-coral);
}

/* Buzzed: a solid accent card that slides in from the buzzing team's side. */
.sniper-buzz {
  width: min(100%, 52rem);
  border-radius: 1.25rem;
  background: var(--question-accent);
  color: var(--question-ink);
  padding: clamp(1.4rem, 3.4vh, 2.6rem) clamp(1.5rem, 3vw, 3rem);
  animation: sniper-buzz-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.sniper-buzz--two {
  align-self: flex-end;
  --buzz-from: 3rem;
}

.sniper-buzz--one {
  --buzz-from: -3rem;
}

@keyframes sniper-buzz-in {
  from { opacity: 0; transform: translateX(var(--buzz-from)) scale(0.96); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

.sniper-buzz > span {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.sniper-buzz > strong {
  display: block;
  margin-top: 0.6rem;
  overflow-wrap: anywhere;
  font-family: var(--font-display);
  font-size: clamp(3rem, min(7vw, 13vh), 8rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 0.88;
}

.sniper-buzz > p {
  margin-top: clamp(0.8rem, 2vh, 1.2rem);
  font-size: clamp(1rem, 1.4vw, 1.35rem);
  font-weight: 500;
}

.sniper-judge {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: clamp(1.2rem, 3vh, 2rem);
}

.sniper-judge button {
  display: inline-flex;
  min-height: 3.4rem;
  align-items: center;
  gap: 0.6rem;
  border: 2px solid var(--question-ink);
  border-radius: 0.8rem;
  cursor: pointer;
  padding: 0 1.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: transform 160ms ease;
}

.sniper-judge button:hover {
  transform: translateY(-2px);
}

.sniper-judge-right {
  background: var(--question-ink);
  color: var(--question-accent);
}

.sniper-judge-wrong {
  background: transparent;
  color: var(--question-ink);
}

/* Reveal: the solution is the hero, the verdict and the drink call sit under it. */
.sniper-reveal-label {
  margin-top: clamp(1rem, 2.4vh, 1.6rem);
  color: var(--question-muted);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.sniper-reveal-answer {
  max-width: 14ch;
  margin: 0.5rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(3.2rem, min(7vw, 13vh), 8.5rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 0.88;
  text-wrap: balance;
  animation: sniper-reveal-in 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes sniper-reveal-in {
  from { opacity: 0; transform: translateY(0.6em); }
  to { opacity: 1; transform: translateY(0); }
}

.sniper-reveal-verdict {
  margin-top: clamp(1rem, 2.6vh, 1.8rem);
  font-size: clamp(1.1rem, 1.6vw, 1.6rem);
}

.sniper-reveal-verdict b {
  margin-right: 0.4rem;
  color: var(--question-accent);
}

.sniper-reveal--wrong .sniper-reveal-verdict b {
  color: var(--question-coral);
}

.sniper-reveal--timeout .sniper-reveal-verdict b {
  color: var(--question-muted);
}

.sniper-reveal-drink {
  display: inline-block;
  margin-top: 0.9rem;
  border-radius: 999px;
  background: var(--question-coral);
  color: var(--question-ink);
  padding: 0.55rem 1rem;
  font-size: clamp(0.85rem, 1.1vw, 1.05rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  animation: sniper-reveal-in 520ms 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.sniper-reveal-drink.is-quiet {
  background: rgb(251 248 237 / 10%);
  color: var(--question-muted);
}

.sniper-plus {
  background: var(--question-accent);
}

.sniper-score-pop {
  animation: sniper-pop 640ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes sniper-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  100% { transform: scale(1); }
}

/* Last five seconds: the clock pulses. */
.sniper-timer--alarm > strong {
  animation: sniper-alarm 1s ease-in-out infinite;
}

@keyframes sniper-alarm {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.06); }
}

.question-live-timer-actions button:disabled {
  cursor: default;
  opacity: 0.4;
}

.sniper-foot-credit {
  margin-left: 0;
  text-align: left;
  text-transform: none;
  letter-spacing: 0.02em;
}

@media (max-width: 809px) {
  .sniper-buzz--two {
    align-self: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sniper-wave.is-playing i {
    animation: none;
    transform: scaleY(var(--bar));
  }
}
</style>
