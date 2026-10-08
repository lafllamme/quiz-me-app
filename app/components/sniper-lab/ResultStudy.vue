<script setup lang="ts">
import { labMatch, labResult, type LabOutcome, type LabTeam } from '~/lib/sniper-lab-fixtures'

const props = defineProps<{ variant: string, outcome: LabOutcome, buzzer: LabTeam, tick: number }>()

const names = labMatch.names
const result = computed(() => labResult(props.outcome, props.buzzer))
// Long solutions ("Toilettenspülung") step down a size instead of breaking mid-word.
const lengthClass = computed(() => result.value.answer.length > 12 ? 'is-long' : result.value.answer.length > 8 ? 'is-mid' : '')
const drinkLine = computed(() => result.value.drinker === null ? 'Keiner trinkt' : `${names[result.value.drinker]} trinkt!`)
const verdictTone = computed(() => props.outcome === 'right' ? 'win' : props.outcome === 'wrong' ? 'miss' : 'none')
const nextSound = labMatch.sound + 1

// E3/E4: five seconds of result, then 3·2·1·Los for the next sound, then it loops.
const flowStep = computed(() => props.tick % 9)
const waitLeft = computed(() => Math.max(0, 5 - flowStep.value))
const countdown = computed(() => flowStep.value < 5 ? null : flowStep.value === 8 ? 'Los!' : String(8 - flowStep.value))

// E5: a looped run-through. Result, then the result folds into a band over the countdown, then the next sound plays.
const runStep = computed(() => props.tick % 11)
const runPhase = computed(() => runStep.value < 4 ? 'result' : runStep.value < 8 ? 'countdown' : 'listening')
const runCount = computed(() => runStep.value === 7 ? 'Los!' : String(7 - runStep.value))
</script>

<template>
  <div class="sl-stage rs" :class="[`rs--${variant}`, `rs--${verdictTone}`, lengthClass]">
    <!-- E1: the verdict is the headline; the drink call is a full-width band with the next step on it. -->
    <template v-if="variant === 'E1'">
      <SniperLabHead :scores="result.scores" :plus="result.winner" />
      <div class="sl-main rs-e1">
        <div class="rs-e1-top">
          <h2 class="sl-display rs-verdict sl-rise">{{ result.title }}</h2>
          <p class="rs-e1-line">{{ result.line }}</p>
        </div>
        <div class="rs-e1-answer">
          <span class="sl-label">Es war</span>
          <strong class="sl-display">{{ result.answer }}</strong>
          <span class="sl-pill">{{ result.category }}</span>
        </div>
      </div>
      <div class="rs-band" :class="{ 'is-quiet': result.drinker === null }">
        <strong class="sl-display">{{ drinkLine }}</strong>
        <span class="rs-band-actions">
          <button type="button" class="sl-host rs-band-host"><Icon name="lucide:rotate-ccw" aria-hidden="true" /> So klang es <span class="sl-key">W</span></button>
          <button type="button" class="sl-btn sl-btn--ink">Weiter <span class="sl-key">Enter</span></button>
        </span>
      </div>
    </template>

    <!-- E2: the screen splits into what the round gave: a point on one side, a drink on the other. -->
    <template v-else-if="variant === 'E2'">
      <SniperLabChrome />
      <div class="rs-e2-strip">
        <span class="sl-label">Lösung</span>
        <strong class="sl-display">{{ result.answer }}</strong>
        <span class="sl-pill">{{ result.category }}</span>
        <button type="button" class="sl-btn rs-e2-next">Weiter <span class="sl-key">Enter</span></button>
      </div>
      <div class="rs-e2-halves">
        <div class="rs-e2-half" :class="result.winner === null ? 'is-empty' : 'is-point'">
          <template v-if="result.winner !== null">
            <span class="sl-label">{{ result.title }}</span>
            <b class="sl-display">+1</b>
            <strong>{{ names[result.winner] }}</strong>
            <small>jetzt {{ result.scores[result.winner] }} Punkte</small>
          </template>
          <template v-else>
            <span class="sl-label">Zeit vorbei</span>
            <b class="sl-display">0</b>
            <strong>Keine Punkte</strong>
            <small>Es bleibt {{ result.scores[0] }} : {{ result.scores[1] }}</small>
          </template>
        </div>
        <div class="rs-e2-half" :class="result.drinker === null ? 'is-empty' : 'is-drink'">
          <span class="sl-label">{{ result.drinker === null ? 'Glück gehabt' : 'Prost' }}</span>
          <b class="sl-display"><Icon name="lucide:beer" aria-hidden="true" /></b>
          <strong>{{ result.drinker === null ? 'Keiner trinkt' : names[result.drinker] }}</strong>
          <small>{{ result.drinker === null ? 'Nächster Sound, neues Glück' : 'trinkt' }}</small>
        </div>
      </div>
    </template>

    <!-- E3: the score is the hero, with the next sound already counting in along the foot. -->
    <template v-else-if="variant === 'E3'">
      <SniperLabChrome>
        <SniperLabTicks :total="labMatch.total" :current="labMatch.sound" :label="`Sound ${labMatch.sound} / ${labMatch.total}`" />
      </SniperLabChrome>
      <div class="rs-e3">
        <p class="rs-e3-answer"><span class="sl-label">Lösung</span> <strong class="sl-display">{{ result.answer }}</strong> <em class="rs-verdict-inline">{{ result.title }}</em></p>
        <div class="rs-e3-score">
          <div v-for="team in ([0, 1] as const)" :key="team" class="rs-e3-team" :class="{ 'is-win': result.winner === team }">
            <b :key="`${team}-${result.scores[team]}`" class="sl-display">{{ result.scores[team] }}</b>
            <span>{{ names[team] }}</span>
            <small v-if="result.winner === team">+1</small>
          </div>
          <i class="sl-display" aria-hidden="true">:</i>
        </div>
        <p class="rs-drink" :class="{ 'is-quiet': result.drinker === null }">{{ drinkLine }}</p>
      </div>
      <div class="rs-e3-next">
        <span class="sl-label">
          <template v-if="countdown === null">Sound {{ nextSound }} startet in {{ waitLeft }} Sek.</template>
          <template v-else>Sound {{ nextSound }} · {{ countdown }}</template>
        </span>
        <i aria-hidden="true"><b :style="{ transform: `scaleX(${Math.min(1, flowStep / 8)})` }" /></i>
        <span class="rs-e3-keys"><span class="sl-key">Enter</span> sofort <span class="sl-key">Leertaste</span> halten</span>
      </div>
    </template>

    <!-- E4: result left, the right column (where the clock lived) already belongs to the next sound. -->
    <template v-else-if="variant === 'E4'">
      <SniperLabHead :scores="result.scores" :plus="result.winner" />
      <div class="sl-main rs-e4">
        <div class="rs-e4-copy">
          <span class="sl-pill">{{ result.category }}</span>
          <h2 class="sl-display rs-e4-answer sl-rise">{{ result.answer }}</h2>
          <p class="rs-e4-verdict"><b>{{ result.title }}</b> {{ result.line }}</p>
          <p class="rs-drink rs-drink--lg" :class="{ 'is-quiet': result.drinker === null }">{{ drinkLine }}</p>
        </div>
        <aside class="rs-e4-next" :class="{ 'is-counting': countdown !== null }">
          <span class="sl-label">Als Nächstes · Sound {{ nextSound }} / {{ labMatch.total }}</span>
          <strong :key="countdown ?? `wait-${waitLeft}`" class="sl-display" :class="{ 'is-go': countdown === 'Los!' }">{{ countdown ?? waitLeft }}</strong>
          <p v-if="countdown === null">Countdown startet von selbst.</p>
          <p v-else>Ohren auf.</p>
          <div class="rs-e4-keys">
            <button type="button" class="sl-host"><span class="sl-key">Enter</span> Sofort</button>
            <button type="button" class="sl-host"><span class="sl-key">Leertaste</span> Halten</button>
            <button type="button" class="sl-host"><span class="sl-key">W</span> So klang es</button>
          </div>
        </aside>
      </div>
      <p class="rs-credit">{{ result.credit }}</p>
    </template>

    <!-- E5: a looped run-through of the flow. No ready screen between sounds. -->
    <template v-else>
      <SniperLabHead :scores="result.scores" :plus="runPhase === 'result' ? result.winner : null" :sound="runPhase === 'result' ? labMatch.sound : nextSound" />
      <Transition name="rs-fold">
        <div v-if="runPhase !== 'result'" class="rs-e5-band" :class="{ 'is-quiet': result.drinker === null }">
          <span class="sl-label">Sound {{ labMatch.sound }}</span>
          <strong>{{ result.answer }}</strong>
          <span>{{ result.title }} {{ result.line }}</span>
          <span class="rs-e5-band-drink">{{ drinkLine }}</span>
        </div>
      </Transition>
      <Transition name="rs-swap" mode="out-in">
        <div v-if="runPhase === 'result'" key="result" class="sl-main rs-e5-result">
          <span class="sl-pill">{{ result.category }}</span>
          <h2 class="sl-display rs-e4-answer">{{ result.answer }}</h2>
          <p class="rs-e4-verdict"><b>{{ result.title }}</b> {{ result.line }}</p>
          <p class="rs-drink rs-drink--lg" :class="{ 'is-quiet': result.drinker === null }">{{ drinkLine }}</p>
        </div>
        <div v-else-if="runPhase === 'countdown'" key="count" class="sl-main rs-e5-count">
          <span class="sl-label">Sound {{ nextSound }} von {{ labMatch.total }}</span>
          <strong :key="runCount" class="sl-display" :class="{ 'is-go': runCount === 'Los!' }">{{ runCount }}</strong>
        </div>
        <div v-else key="listen" class="sl-main rs-e5-listen">
          <div class="rs-e5-wave"><SniperLabWave /></div>
          <h2 class="sl-display">Was hört ihr?</h2>
        </div>
      </Transition>
      <p class="rs-e5-step sl-label">
        <span :class="{ 'is-on': runPhase === 'result' }">Ergebnis</span>
        <Icon name="lucide:arrow-right" aria-hidden="true" />
        <span :class="{ 'is-on': runPhase === 'countdown' }">Countdown</span>
        <Icon name="lucide:arrow-right" aria-hidden="true" />
        <span :class="{ 'is-on': runPhase === 'listening' }">Nächster Sound</span>
      </p>
    </template>
  </div>
</template>

<style scoped>
.rs {
  --verdict: var(--sl-accent);
}

.rs--miss { --verdict: var(--sl-coral); }
.rs--none { --verdict: color-mix(in srgb, var(--sl-cream) 62%, transparent); }

.rs-verdict {
  margin: 0;
  color: var(--verdict);
  font-size: min(13cqw, 25cqh);
  line-height: 0.84;
  white-space: nowrap;
}

.rs-drink {
  display: inline-block;
  border-radius: 999px;
  background: var(--sl-coral);
  color: var(--sl-ink);
  padding: 1.2cqh 1.6cqw;
  font-size: max(12px, 1.4cqw);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  animation: sl-rise 520ms 200ms var(--sl-ease) both;
}

.rs-drink.is-quiet {
  background: rgb(251 248 237 / 10%);
  color: var(--sl-muted);
}

.rs-drink--lg {
  padding: 1.8cqh 2.4cqw;
  font-size: max(14px, 2.1cqw);
}

/* E1 */
.rs-e1 {
  bottom: 20cqh;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  align-items: center;
  gap: 4cqw;
}

.rs-e1-line {
  margin-top: 2.4cqh;
  font-size: min(2.6cqw, 5cqh);
  font-weight: 600;
}

.rs-e1-answer {
  display: grid;
  justify-items: start;
  gap: 1.4cqh;
  border-left: 1px solid var(--sl-line);
  padding-left: 3cqw;
}

.rs-e1-answer strong {
  font-size: min(5.6cqw, 11cqh);
  hyphens: auto;
}

.rs-band {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  min-height: 16cqh;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  background: var(--sl-coral);
  color: var(--sl-ink);
  padding: 0 var(--sl-pad-x);
  animation: rs-band-in 560ms 160ms var(--sl-ease) both;
}

@keyframes rs-band-in {
  from { clip-path: inset(100% 0 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

.rs-band strong {
  font-size: min(5cqw, 9.4cqh);
  text-transform: uppercase;
}

.rs-band.is-quiet {
  background: var(--sl-forest);
  color: var(--sl-cream);
}

.rs-band-actions {
  display: flex;
  align-items: center;
  gap: 2.4cqw;
}

.rs-band-host {
  color: rgb(8 24 17 / 72%);
}

.rs-band.is-quiet .rs-band-host {
  color: var(--sl-muted);
}

.rs-band.is-quiet .sl-btn--ink {
  background: var(--sl-accent);
  color: var(--sl-ink);
}

/* E2 */
.rs-e2-strip {
  position: absolute;
  top: 13cqh;
  right: var(--sl-pad-x);
  left: var(--sl-pad-x);
  display: flex;
  align-items: center;
  gap: 1.8cqw;
  border-bottom: 1px solid var(--sl-line);
  padding-bottom: 3cqh;
}

.rs-e2-strip .sl-pill {
  align-self: center;
}

.rs-e2-strip strong {
  font-size: min(5.4cqw, 10.4cqh);
}

.rs-e2-next {
  margin-left: auto;
}

.rs-e2-halves {
  position: absolute;
  top: 33cqh;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.rs-e2-half {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--sl-pad-x);
  animation: sl-rise 520ms var(--sl-ease) both;
}

.rs-e2-half + .rs-e2-half {
  animation-delay: 140ms;
}

.rs-e2-half b {
  font-size: min(14cqw, 26cqh);
  line-height: 0.82;
}

.rs-e2-half strong {
  margin-top: 2cqh;
  font-family: var(--font-display);
  font-size: min(3.8cqw, 7.4cqh);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.rs-e2-half small {
  margin-top: 1cqh;
  font-size: max(11px, 1.3cqw);
  font-weight: 600;
  opacity: 0.75;
}

.rs-e2-half .sl-label {
  color: inherit;
  opacity: 0.75;
}

.rs-e2-half.is-point {
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.rs-e2-half.is-drink {
  background: var(--sl-coral);
  color: var(--sl-ink);
}

.rs-e2-half.is-empty {
  border-top: 1px solid var(--sl-line);
  color: var(--sl-muted);
}

.rs-e2-half.is-empty + .is-empty {
  border-left: 1px solid var(--sl-line);
}

/* E3 */
.rs-e3 {
  position: absolute;
  inset: 15cqh var(--sl-pad-x) 16cqh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rs-e3-answer {
  display: flex;
  align-items: baseline;
  gap: 1.4cqw;
}

.rs-e3-answer strong {
  font-size: min(4.4cqw, 8.6cqh);
}

.rs-verdict-inline {
  color: var(--verdict);
  font-size: max(13px, 1.9cqw);
  font-style: normal;
  font-weight: 700;
}

.rs-e3-score {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 3cqh 0;
}

.rs-e3-score > i {
  grid-column: 2;
  grid-row: 1;
  padding: 0 3cqw;
  color: var(--sl-line);
  font-size: min(10cqw, 20cqh);
  font-style: normal;
  line-height: 0.8;
}

.rs-e3-team {
  position: relative;
  display: grid;
  grid-row: 1;
  justify-items: end;
  color: var(--sl-muted);
}

.rs-e3-team:first-child {
  grid-column: 1;
  justify-self: end;
}

.rs-e3-team:nth-child(2) {
  grid-column: 3;
  justify-self: start;
  justify-items: start;
}

.rs-e3-team b {
  color: var(--sl-cream);
  font-size: min(17cqw, 33cqh);
  font-variant-numeric: tabular-nums;
  line-height: 0.8;
}

.rs-e3-team span {
  margin-top: 1.6cqh;
  font-size: max(11px, 1.3cqw);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.rs-e3-team.is-win b,
.rs-e3-team.is-win span {
  color: var(--sl-accent);
}

.rs-e3-team.is-win b {
  animation: sl-pop 760ms var(--sl-ease);
}

.rs-e3-team small {
  position: absolute;
  top: -1cqh;
  border-radius: 999px;
  background: var(--sl-accent);
  color: var(--sl-ink);
  padding: 0.6cqh 0.8cqw;
  font-size: max(11px, 1.2cqw);
  font-weight: 700;
}

.rs-e3-team:first-child small {
  left: -2cqw;
}

.rs-e3-team:nth-child(2) small {
  right: -2cqw;
}

.rs-e3-next {
  position: absolute;
  right: var(--sl-pad-x);
  bottom: 5cqh;
  left: var(--sl-pad-x);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2cqw;
}

.rs-e3-next .sl-label {
  min-width: 22cqw;
  color: var(--sl-accent);
}

.rs-e3-next i {
  display: block;
  height: max(4px, 0.8cqh);
  overflow: hidden;
  border-radius: 99px;
  background: rgb(251 248 237 / 12%);
}

.rs-e3-next i b {
  display: block;
  height: 100%;
  background: var(--sl-accent);
  transform-origin: left center;
  transition: transform 900ms linear;
}

.rs-e3-keys {
  display: flex;
  align-items: center;
  gap: 0.6cqw;
  color: var(--sl-muted);
  font-size: max(10px, 1cqw);
  font-weight: 600;
}

/* E4 */
.rs-e4 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28cqw;
  align-items: center;
  gap: 5cqw;
}

.rs-e4-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.rs-e4-answer {
  margin: 2.4cqh 0 0;
  font-size: min(10cqw, 19cqh);
  line-height: 0.86;
  hyphens: auto;
  text-wrap: balance;
}

.rs.is-mid .rs-e4-answer { font-size: min(8cqw, 16cqh); }
.rs.is-long .rs-e4-answer { font-size: min(5.8cqw, 12cqh); }
.rs.is-mid .rs-e1-answer strong { font-size: min(4.2cqw, 8.4cqh); }
.rs.is-long .rs-e1-answer strong { font-size: min(3.4cqw, 7cqh); }
.rs.is-long .rs-e2-strip strong { font-size: min(4cqw, 8cqh); }

.rs-e4-verdict {
  margin: 3cqh 0 2.6cqh;
  font-size: min(2.6cqw, 5cqh);
  font-weight: 500;
}

.rs-e4-verdict b {
  margin-right: 0.6cqw;
  color: var(--verdict);
}

.rs-e4-next {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--sl-line);
  padding-left: 3cqw;
}

.rs-e4-next strong {
  margin-top: 1.6cqh;
  color: color-mix(in srgb, var(--sl-cream) 35%, transparent);
  font-size: min(15cqw, 29cqh);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.07em;
  line-height: 0.78;
}

.rs-e4-next.is-counting strong {
  color: var(--sl-accent);
  animation: sl-count 900ms var(--sl-ease) both;
}

.rs-e4-next strong.is-go {
  font-size: min(9cqw, 17cqh);
}

.rs-e4-next p {
  margin-top: 2cqh;
  color: var(--sl-muted);
  font-size: max(12px, 1.4cqw);
  font-weight: 500;
}

.rs-e4-keys {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2cqh 1.8cqw;
  margin-top: 2.4cqh;
}

.rs-credit {
  position: absolute;
  bottom: 3cqh;
  left: var(--sl-pad-x);
  color: rgb(143 199 162 / 70%);
  font-size: max(9px, 0.82cqw);
}

/* E5 */
.rs-e5-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.rs-e5-band {
  position: absolute;
  z-index: 2;
  top: 23cqh;
  right: var(--sl-pad-x);
  left: var(--sl-pad-x);
  display: flex;
  align-items: center;
  gap: 2cqw;
  border-bottom: 1px solid var(--sl-line);
  padding-bottom: 2cqh;
  font-size: max(12px, 1.4cqw);
  font-weight: 600;
}

.rs-e5-band strong {
  font-family: var(--font-display);
  font-size: 1.5em;
  font-weight: 600;
}

.rs-e5-band-drink {
  margin-left: auto;
  border-radius: 999px;
  background: var(--sl-coral);
  color: var(--sl-ink);
  padding: 0.8cqh 1.2cqw;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rs-e5-band.is-quiet .rs-e5-band-drink {
  background: rgb(251 248 237 / 10%);
  color: var(--sl-muted);
}

.rs-e5-count,
.rs-e5-listen {
  top: 33cqh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rs-e5-count strong {
  margin-top: 2cqh;
  color: var(--sl-accent);
  font-size: min(24cqw, 44cqh);
  letter-spacing: -0.06em;
  line-height: 0.8;
  animation: sl-count 900ms var(--sl-ease) both;
}

.rs-e5-count strong.is-go {
  font-size: min(15cqw, 28cqh);
}

.rs-e5-wave {
  width: 46cqw;
  height: 22cqh;
}

.rs-e5-listen h2 {
  margin: 3cqh 0 0;
  font-size: min(5.6cqw, 11cqh);
}

.rs-e5-step {
  position: absolute;
  right: var(--sl-pad-x);
  bottom: 3.4cqh;
  display: flex;
  align-items: center;
  gap: 0.8cqw;
  color: rgb(143 199 162 / 55%);
}

.rs-e5-step .is-on {
  color: var(--sl-accent);
}

.rs-fold-enter-active,
.rs-fold-leave-active {
  transition: opacity 360ms var(--sl-ease), transform 460ms var(--sl-ease);
}

.rs-fold-enter-from {
  opacity: 0;
  transform: translateY(8cqh) scale(1.4);
}

.rs-fold-leave-to {
  opacity: 0;
  transform: translateY(-2cqh);
}

.rs-swap-enter-active {
  transition: opacity 320ms var(--sl-ease), transform 420ms var(--sl-ease);
}

.rs-swap-leave-active {
  transition: opacity 160ms ease-in, transform 160ms ease-in;
}

.rs-swap-enter-from {
  opacity: 0;
  transform: translateY(2cqh);
}

.rs-swap-leave-to {
  opacity: 0;
  transform: translateY(-1.4cqh);
}
</style>
