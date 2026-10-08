<script setup lang="ts">
import { labMatch, otherTeam, type LabTeam } from '~/lib/sniper-lab-fixtures'

const props = defineProps<{ variant: string, buzzer: LabTeam }>()

const names = labMatch.names
const other = computed(() => otherTeam(props.buzzer))
const key = computed(() => props.buzzer === 0 ? 'A' : 'B')
const ifRight = computed(() => {
  const scores = [...labMatch.scores] as [number, number]
  scores[props.buzzer] += 1
  return scores
})
const ifWrong = computed(() => {
  const scores = [...labMatch.scores] as [number, number]
  scores[other.value] += 1
  return scores
})
const heardFor = labMatch.seconds - labMatch.buzzedAt
</script>

<template>
  <div class="sl-stage bz" :class="[`bz--${variant}`, `bz--team-${buzzer}`]">
    <!-- B1: only the card. No timer, no badge, no footer; host keys tucked in a corner. -->
    <template v-if="variant === 'B1'">
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main bz-center">
        <div class="bz-card bz-card--xl" :class="`bz-card--from-${buzzer}`">
          <span class="sl-label bz-ink-label">Zuerst gebuzzert</span>
          <strong class="sl-display bz-card-name">{{ names[buzzer] }}</strong>
          <p class="bz-card-line">Antwort laut sagen.</p>
          <div class="bz-card-foot">
            <button type="button" class="sl-btn sl-btn--ink bz-reveal"><Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <span class="sl-key">{{ key }}</span></button>
            <span class="bz-stakes">Falsch = Punkt für {{ names[other] }}</span>
          </div>
        </div>
      </div>
      <div class="bz-corner">
        <button type="button" class="sl-host"><span class="sl-key">⌫</span> Falsches Team</button>
        <button type="button" class="sl-host"><span class="sl-key">S</span> Überspringen</button>
      </div>
    </template>

    <!-- B2: the buzzing team floods its half of the screen. -->
    <template v-else-if="variant === 'B2'">
      <div class="bz-half" :class="`bz-half--${buzzer}`">
        <div class="bz-half-team bz-half-team--on">
          <span class="sl-label bz-ink-label">Zuerst gebuzzert</span>
          <strong class="sl-display">{{ names[buzzer] }}</strong>
          <p>Antwort laut sagen.</p>
          <button type="button" class="sl-btn sl-btn--ink bz-reveal"><Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <span class="sl-key">{{ key }}</span></button>
          <b class="bz-half-score">{{ labMatch.scores[buzzer] }}</b>
        </div>
        <div class="bz-half-team bz-half-team--off">
          <span class="sl-label">Wartet</span>
          <strong class="sl-display">{{ names[other] }}</strong>
          <p>Liegt {{ names[buzzer] }} falsch, geht der Punkt hierher.</p>
          <b class="bz-half-score">{{ labMatch.scores[other] }}</b>
        </div>
      </div>
      <SniperLabChrome :tone="buzzer === 0 ? 'ink' : 'cream'" :nav="false" />
      <div class="bz-corner bz-corner--light">
        <button type="button" class="sl-host"><span class="sl-key">⌫</span> Falsches Team</button>
        <button type="button" class="sl-host"><span class="sl-key">S</span> Überspringen</button>
      </div>
    </template>

    <!-- B3: the whole screen turns lime. One name, one sentence, one key. -->
    <template v-else-if="variant === 'B3'">
      <SniperLabChrome tone="ink">
        <SniperLabDuel :names="names" :scores="labMatch.scores" :active="null" size="sm" tone="ink" class="bz-b3-duel" />
      </SniperLabChrome>
      <div class="bz-b3">
        <span class="sl-label bz-ink-label">Zuerst gebuzzert</span>
        <strong class="sl-display bz-b3-name">{{ names[buzzer] }}</strong>
        <p class="bz-b3-line">Antwort laut sagen.</p>
        <button type="button" class="sl-btn sl-btn--ink bz-reveal bz-reveal--xl"><Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <span class="sl-key">{{ key }}</span></button>
      </div>
      <div class="bz-corner bz-corner--ink">
        <span>Falsch = Punkt für {{ names[other] }}</span>
        <button type="button" class="sl-host"><span class="sl-key">⌫</span></button>
        <button type="button" class="sl-host"><span class="sl-key">S</span></button>
      </div>
    </template>

    <!-- B4: the card plus what is at stake, drawn as the two possible scores instead of a sentence. -->
    <template v-else-if="variant === 'B4'">
      <SniperLabHead :ticks="false" :duel="false" />
      <div class="sl-main bz-b4">
        <div class="bz-card" :class="`bz-card--from-${buzzer}`">
          <span class="sl-label bz-ink-label">Zuerst gebuzzert</span>
          <strong class="sl-display bz-card-name">{{ names[buzzer] }}</strong>
          <p class="bz-card-line">Antwort laut sagen.</p>
          <button type="button" class="sl-btn sl-btn--ink bz-reveal"><Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <span class="sl-key">{{ key }}</span></button>
        </div>
        <div class="bz-stake">
          <span class="sl-label">Es steht {{ labMatch.scores[0] }} : {{ labMatch.scores[1] }}</span>
          <div class="bz-stake-row bz-stake-row--right">
            <span><Icon name="lucide:check" aria-hidden="true" /> Richtig</span>
            <b>{{ ifRight[0] }} : {{ ifRight[1] }}</b>
            <small>+1 für {{ names[buzzer] }}</small>
          </div>
          <div class="bz-stake-row bz-stake-row--wrong">
            <span><Icon name="lucide:x" aria-hidden="true" /> Falsch</span>
            <b>{{ ifWrong[0] }} : {{ ifWrong[1] }}</b>
            <small>+1 für {{ names[other] }}</small>
          </div>
          <div class="bz-stake-host">
            <button type="button" class="sl-host"><span class="sl-key">⌫</span> Falsches Team</button>
            <button type="button" class="sl-host"><span class="sl-key">S</span> Überspringen</button>
          </div>
        </div>
      </div>
    </template>

    <!-- B5: the frozen wave marks the moment of the buzz; the card becomes a wide banner. -->
    <template v-else>
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main bz-b5">
        <div class="bz-b5-wave">
          <SniperLabWave :frozen-at="heardFor / labMatch.seconds" :bars="56" tone="cream" />
          <span class="bz-b5-mark" :style="{ left: `${(heardFor / labMatch.seconds) * 100}%` }">
            <span class="sl-label">Buzz nach {{ heardFor }} Sek.</span>
          </span>
        </div>
        <div class="bz-banner" :class="`bz-card--from-${buzzer}`">
          <div>
            <span class="sl-label bz-ink-label">Zuerst gebuzzert</span>
            <strong class="sl-display bz-card-name">{{ names[buzzer] }}</strong>
          </div>
          <div class="bz-banner-side">
            <p class="bz-card-line">Antwort laut sagen.</p>
            <button type="button" class="sl-btn sl-btn--ink bz-reveal"><Icon name="lucide:eye" aria-hidden="true" /> Lösung zeigen <span class="sl-key">{{ key }}</span></button>
          </div>
        </div>
      </div>
      <div class="bz-corner">
        <button type="button" class="sl-host"><span class="sl-key">⌫</span> Falsches Team</button>
        <button type="button" class="sl-host"><span class="sl-key">S</span> Überspringen</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.bz-ink-label {
  color: rgb(8 24 17 / 70%);
}

/* The loved lime card, scaled to the screen. */
.bz-card {
  border-radius: 2.6cqh;
  background: var(--sl-accent);
  color: var(--sl-ink);
  padding: 5cqh 3.4cqw;
  animation: bz-in 460ms var(--sl-ease) both;
}

.bz-card--from-0 { --from: -4cqw; }
.bz-card--from-1 { --from: 4cqw; }

@keyframes bz-in {
  from { opacity: 0; transform: translateX(var(--from)) scale(0.96); }
  to { opacity: 1; transform: none; }
}

.bz-card-name {
  display: block;
  margin-top: 1.6cqh;
  overflow-wrap: anywhere;
  font-size: min(8cqw, 15cqh);
  font-weight: 600;
  line-height: 0.88;
}

.bz-card-line {
  margin-top: 2.4cqh;
  font-size: min(2.4cqw, 4.6cqh);
  font-weight: 500;
}

.bz-reveal {
  min-height: 9cqh;
  margin-top: 4cqh;
  padding: 0 2.6cqw;
}

.bz-stakes {
  color: rgb(8 24 17 / 72%);
  font-size: max(11px, 1.25cqw);
  font-weight: 600;
}

.bz-corner {
  position: absolute;
  right: var(--sl-pad-x);
  bottom: 3.6cqh;
  display: flex;
  align-items: center;
  gap: 2cqw;
  opacity: 0.75;
}

/* B1 */
.bz-center {
  display: grid;
  place-items: center;
}

.bz-card--xl {
  width: min(100%, 66cqw);
  padding: 6cqh 4cqw;
}

.bz-card--xl .bz-card-name {
  font-size: min(10cqw, 19cqh);
}

.bz-card-foot {
  display: flex;
  align-items: center;
  gap: 2.4cqw;
  margin-top: 4cqh;
}

.bz-card-foot .bz-reveal {
  margin: 0;
}

/* B2 */
.bz-half {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.bz-half--1 {
  direction: rtl;
}

.bz-half-team {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  direction: ltr;
  padding: 14cqh var(--sl-pad-x) 12cqh;
}

.bz-half-team--on {
  background: var(--sl-accent);
  color: var(--sl-ink);
  animation: bz-flood 520ms var(--sl-ease) both;
}

.bz-half--0 .bz-half-team--on { transform-origin: left center; }
.bz-half--1 .bz-half-team--on { transform-origin: right center; }

@keyframes bz-flood {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

.bz-half--1 .bz-half-team--on {
  animation-name: bz-flood-rev;
}

@keyframes bz-flood-rev {
  from { clip-path: inset(0 0 0 100%); }
  to { clip-path: inset(0 0 0 0); }
}

.bz-half-team strong {
  margin-top: 1.6cqh;
  overflow-wrap: anywhere;
  font-size: min(7.6cqw, 15cqh);
  font-weight: 600;
}

.bz-half-team p {
  max-width: 24ch;
  margin-top: 2.4cqh;
  font-size: min(2.2cqw, 4.4cqh);
  font-weight: 500;
}

.bz-half-team--off {
  color: var(--sl-muted);
}

.bz-half-team--off strong {
  color: color-mix(in srgb, var(--sl-cream) 55%, transparent);
  font-size: min(4.6cqw, 9cqh);
}

.bz-half-team .bz-reveal {
  align-self: flex-start;
}

.bz-half-score {
  position: absolute;
  top: 12cqh;
  right: var(--sl-pad-x);
  font-family: var(--font-display);
  font-size: min(6cqw, 12cqh);
  font-weight: 500;
  line-height: 1;
}

.bz-half-team--off .bz-half-score {
  color: var(--sl-cream);
}

.bz-corner--light {
  right: auto;
  left: 50%;
  padding-left: var(--sl-pad-x);
}

.bz--team-1 .bz-corner--light {
  left: var(--sl-pad-x);
  padding: 0;
}

/* B3 */
.bz--B3 {
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.bz-b3-duel {
  width: 34cqw;
}

.bz-b3 {
  position: absolute;
  inset: 16cqh var(--sl-pad-x) 12cqh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: sl-rise 520ms var(--sl-ease) both;
}

.bz-b3-name {
  margin-top: 2.4cqh;
  max-width: 100%;
  font-size: min(11.5cqw, 24cqh);
  font-weight: 600;
  line-height: 0.86;
  text-wrap: balance;
}

.bz-b3-line {
  margin-top: 3cqh;
  font-size: min(2.8cqw, 5.4cqh);
  font-weight: 500;
}

.bz-reveal--xl {
  min-height: 11cqh;
  margin-top: 5cqh;
  padding: 0 3.6cqw;
  font-size: max(13px, 1.6cqw);
}

.bz-corner--ink {
  right: var(--sl-pad-x);
  left: var(--sl-pad-x);
  justify-content: flex-end;
  color: var(--sl-ink);
  font-size: max(11px, 1.15cqw);
  font-weight: 600;
}

.bz-corner--ink > span {
  margin-right: auto;
}

.bz-corner--ink .sl-host {
  color: var(--sl-ink);
}

/* B4 */
.bz-b4 {
  top: 15cqh;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  align-items: center;
  gap: 4cqw;
}

.bz-stake {
  display: grid;
  gap: 2.4cqh;
}

.bz-stake-row {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6cqw;
  align-items: baseline;
  border-top: 1px solid var(--sl-line);
  padding-top: 2.4cqh;
}

.bz-stake-row span {
  display: inline-flex;
  align-items: center;
  gap: 0.5cqw;
  font-size: max(11px, 1.2cqw);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.bz-stake-row b {
  grid-row: span 2;
  justify-self: end;
  font-family: var(--font-display);
  font-size: min(6cqw, 12cqh);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.bz-stake-row small {
  color: var(--sl-muted);
  font-size: max(10px, 1cqw);
}

.bz-stake-row--right span,
.bz-stake-row--right b {
  color: var(--sl-accent);
}

.bz-stake-row--wrong span,
.bz-stake-row--wrong b {
  color: var(--sl-coral);
}

.bz-stake-host {
  display: flex;
  gap: 2cqw;
}

/* B5 */
.bz-b5 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5cqh;
}

.bz-b5-wave {
  position: relative;
  height: 14cqh;
}

.bz-b5-mark {
  position: absolute;
  top: -2cqh;
  bottom: -2cqh;
  width: 2px;
  background: var(--sl-accent);
}

.bz-b5-mark .sl-label {
  position: absolute;
  bottom: calc(100% + 0.8cqh);
  left: 0;
  color: var(--sl-accent);
  white-space: nowrap;
  transform: translateX(-50%);
}

.bz-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4cqw;
  border-radius: 2.6cqh;
  background: var(--sl-accent);
  color: var(--sl-ink);
  padding: 5cqh 3.6cqw;
  animation: bz-in 460ms var(--sl-ease) both;
}

.bz-banner .bz-card-name {
  font-size: min(8.4cqw, 16cqh);
  white-space: nowrap;
}

.bz-banner-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.bz-banner-side .bz-card-line {
  margin: 0;
}

.bz-banner-side .bz-reveal {
  margin-top: 2.4cqh;
}
</style>
