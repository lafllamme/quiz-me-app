<script setup lang="ts">
import { labMatch, labRevealAnswer, otherTeam, type LabTeam } from '~/lib/sniper-lab-fixtures'

const props = defineProps<{ variant: string, buzzer: LabTeam }>()

const names = labMatch.names
const answer = labRevealAnswer
const other = computed(() => otherTeam(props.buzzer))
</script>

<template>
  <div class="sl-stage lo" :class="`lo--${variant}`">
    <!-- L1: the solution owns the middle, the verdict is two full-width fields at the foot. -->
    <template v-if="variant === 'L1'">
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main lo-l1">
        <div class="lo-l1-answer">
          <span class="sl-label">Lösung</span>
          <h2 class="sl-display lo-answer sl-rise">{{ answer }}</h2>
          <p class="lo-question">Hatte <b>{{ names[buzzer] }}</b> recht?</p>
        </div>
        <div class="lo-fields">
          <button type="button" class="lo-field lo-field--right"><Icon name="lucide:check" aria-hidden="true" /> Richtig <span class="sl-key">R</span></button>
          <button type="button" class="lo-field lo-field--wrong"><Icon name="lucide:x" aria-hidden="true" /> Falsch <span class="sl-key">F</span></button>
        </div>
      </div>
    </template>

    <!-- L2: the buzz card stays and turns over: solution inside, two round judges on its edge. -->
    <template v-else-if="variant === 'L2'">
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main lo-l2">
        <div class="lo-card">
          <div class="lo-card-copy">
            <span class="sl-label lo-ink-label">{{ names[buzzer] }} · Lösung</span>
            <h2 class="sl-display lo-answer">{{ answer }}</h2>
            <p class="lo-card-q">Hatte {{ names[buzzer] }} recht?</p>
          </div>
          <div class="lo-card-judges">
            <button type="button" class="lo-judge lo-judge--right" aria-label="Richtig"><Icon name="lucide:check" aria-hidden="true" /><span class="sl-key">R</span></button>
            <button type="button" class="lo-judge lo-judge--wrong" aria-label="Falsch"><Icon name="lucide:x" aria-hidden="true" /><span class="sl-key">F</span></button>
          </div>
        </div>
      </div>
    </template>

    <!-- L3: answer left, a yes/no column right. The question is the column's heading. -->
    <template v-else-if="variant === 'L3'">
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main lo-l3">
        <div>
          <span class="sl-label">Lösung</span>
          <h2 class="sl-display lo-answer sl-rise">{{ answer }}</h2>
        </div>
        <div class="lo-l3-side">
          <p class="sl-display lo-l3-q">Hatte {{ names[buzzer] }} recht?</p>
          <button type="button" class="lo-yes"><span>Ja</span><span class="sl-key">R</span></button>
          <button type="button" class="lo-no"><span>Nein</span><span class="sl-key">F</span></button>
        </div>
      </div>
    </template>

    <!-- L4: each verdict button shows what it does to the score and who drinks. -->
    <template v-else-if="variant === 'L4'">
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="sl-main lo-l4">
        <div class="lo-l4-answer">
          <span class="sl-label">Lösung</span>
          <h2 class="sl-display lo-answer sl-rise">{{ answer }}</h2>
          <p class="lo-question">Hatte <b>{{ names[buzzer] }}</b> recht?</p>
        </div>
        <div class="lo-l4-choices">
          <button type="button" class="lo-choice lo-choice--right">
            <span class="lo-choice-head"><Icon name="lucide:check" aria-hidden="true" /> Richtig <span class="sl-key">R</span></span>
            <span class="lo-choice-effect"><b>+1 {{ names[buzzer] }}</b><small>{{ names[other] }} trinkt</small></span>
          </button>
          <button type="button" class="lo-choice lo-choice--wrong">
            <span class="lo-choice-head"><Icon name="lucide:x" aria-hidden="true" /> Falsch <span class="sl-key">F</span></span>
            <span class="lo-choice-effect"><b>+1 {{ names[other] }}</b><small>{{ names[buzzer] }} trinkt</small></span>
          </button>
        </div>
      </div>
    </template>

    <!-- L5: the solution arrives as a cream band across the full width; two keycaps judge it. -->
    <template v-else>
      <SniperLabHead :ticks="false" :active="buzzer" />
      <div class="lo-band-wrap">
        <p class="sl-label lo-band-kicker">{{ names[buzzer] }} hat geantwortet. Die Lösung:</p>
        <div class="lo-band"><h2 class="sl-display">{{ answer }}</h2></div>
        <div class="lo-caps">
          <button type="button" class="lo-cap lo-cap--right"><span class="lo-cap-key">R</span><span><Icon name="lucide:check" aria-hidden="true" /> Richtig</span></button>
          <button type="button" class="lo-cap lo-cap--wrong"><span class="lo-cap-key">F</span><span><Icon name="lucide:x" aria-hidden="true" /> Falsch</span></button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.lo-answer {
  margin: 1.4cqh 0 0;
  font-size: min(13cqw, 25cqh);
  letter-spacing: -0.04em;
  line-height: 0.84;
  text-wrap: balance;
}

.lo-question {
  margin-top: 2.6cqh;
  color: color-mix(in srgb, var(--sl-cream) 82%, transparent);
  font-size: min(2.4cqw, 4.6cqh);
  font-weight: 500;
}

.lo-question b {
  color: var(--sl-accent);
  font-weight: 600;
}

/* L1 */
.lo-l1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lo-l1-answer {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.lo-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2cqw;
}

.lo-field {
  display: flex;
  min-height: 15cqh;
  align-items: center;
  justify-content: center;
  gap: 1.2cqw;
  border-radius: 2.4cqh;
  cursor: pointer;
  font-size: min(2.6cqw, 5cqh);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: transform 200ms var(--sl-ease);
}

.lo-field:hover {
  transform: translateY(-3px);
}

.lo-field--right {
  border: 0;
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.lo-field--wrong {
  border: 2px solid var(--sl-coral);
  background: transparent;
  color: var(--sl-coral);
}

/* L2 */
.lo-l2 {
  display: grid;
  place-items: center;
}

.lo-card {
  display: flex;
  width: min(100%, 76cqw);
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  border-radius: 2.6cqh;
  background: var(--sl-accent);
  color: var(--sl-ink);
  padding: 5.4cqh 3.6cqw;
  animation: lo-flip 620ms var(--sl-ease) both;
}

@keyframes lo-flip {
  from { opacity: 0.4; transform: perspective(1200px) rotateX(70deg); }
  to { opacity: 1; transform: none; }
}

.lo-ink-label {
  color: rgb(8 24 17 / 70%);
}

.lo-card .lo-answer {
  font-size: min(11cqw, 21cqh);
}

.lo-card-q {
  margin-top: 2.4cqh;
  font-size: min(2.2cqw, 4.2cqh);
  font-weight: 600;
}

.lo-card-judges {
  display: grid;
  gap: 2cqh;
}

.lo-judge {
  position: relative;
  display: grid;
  width: 16cqh;
  aspect-ratio: 1;
  place-items: center;
  border: 3px solid var(--sl-ink);
  border-radius: 50%;
  cursor: pointer;
  font-size: 6cqh;
  transition: transform 200ms var(--sl-ease);
}

.lo-judge:hover {
  transform: scale(1.05);
}

.lo-judge .sl-key {
  position: absolute;
  right: -0.4cqw;
  bottom: -0.4cqh;
  background: var(--sl-accent);
  font-size: max(10px, 1cqw);
  opacity: 1;
}

.lo-judge--right {
  background: var(--sl-ink);
  color: var(--sl-accent);
}

.lo-judge--right .sl-key {
  color: var(--sl-ink);
}

.lo-judge--wrong {
  background: transparent;
  color: var(--sl-ink);
}

/* L3 */
.lo-l3 {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  align-items: center;
  gap: 4cqw;
}

.lo-l3-side {
  display: grid;
  gap: 1.6cqh;
  border-left: 1px solid var(--sl-line);
  padding-left: 3cqw;
}

.lo-l3-q {
  margin: 0 0 1.4cqh;
  font-size: min(3.4cqw, 6.6cqh);
}

.lo-yes,
.lo-no {
  display: flex;
  min-height: 14cqh;
  align-items: center;
  justify-content: space-between;
  border-radius: 2.4cqh;
  cursor: pointer;
  padding: 0 2.4cqw;
  font-family: var(--font-display);
  font-size: min(4.6cqw, 9cqh);
  font-weight: 600;
  letter-spacing: -0.02em;
  transition: transform 200ms var(--sl-ease);
}

.lo-yes:hover,
.lo-no:hover {
  transform: translateX(4px);
}

.lo-yes .sl-key,
.lo-no .sl-key {
  font-size: max(12px, 1.3cqw);
}

.lo-yes {
  border: 0;
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.lo-no {
  border: 2px solid var(--sl-coral);
  background: transparent;
  color: var(--sl-coral);
}

/* L4 */
.lo-l4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lo-l4-answer {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.lo-l4 .lo-answer {
  font-size: min(12cqw, 22cqh);
}

.lo-l4-choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2cqw;
}

.lo-choice {
  display: flex;
  min-height: 17cqh;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  border-radius: 2.4cqh;
  cursor: pointer;
  padding: 0 2.6cqw;
  text-align: left;
  transition: transform 200ms var(--sl-ease);
}

.lo-choice:hover {
  transform: translateY(-3px);
}

.lo-choice-head {
  display: inline-flex;
  align-items: center;
  gap: 0.9cqw;
  font-size: min(2.6cqw, 5cqh);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lo-choice-effect {
  display: grid;
  justify-items: end;
  gap: 0.6cqh;
  text-align: right;
}

.lo-choice-effect b {
  font-family: var(--font-display);
  font-size: min(2.2cqw, 4.4cqh);
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.lo-choice-effect small {
  font-size: max(10px, 1.1cqw);
  font-weight: 600;
  opacity: 0.75;
}

.lo-choice--right {
  border: 0;
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.lo-choice--wrong {
  border: 2px solid var(--sl-coral);
  background: rgb(221 146 123 / 8%);
  color: var(--sl-coral);
}

/* L5 */
.lo-band-wrap {
  position: absolute;
  inset: 24cqh 0 6cqh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lo-band-kicker {
  margin-bottom: 2.6cqh;
}

.lo-band {
  width: 100%;
  background: var(--sl-cream);
  color: var(--sl-ink);
  padding: 3.4cqh var(--sl-pad-x) 2.6cqh;
  text-align: center;
  animation: lo-band 620ms var(--sl-ease) both;
}

@keyframes lo-band {
  from { clip-path: inset(0 50% 0 50%); }
  to { clip-path: inset(0 0 0 0); }
}

.lo-band h2 {
  margin: 0;
  font-size: min(14cqw, 26cqh);
  letter-spacing: -0.04em;
  line-height: 0.86;
}

.lo-caps {
  display: flex;
  gap: 4cqw;
  margin-top: 5cqh;
}

.lo-cap {
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: max(13px, 1.7cqw);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.lo-cap > span:last-child {
  display: inline-flex;
  align-items: center;
  gap: 0.5cqw;
}

.lo-cap-key {
  display: grid;
  width: 11cqh;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 1.8cqh;
  font-family: var(--font-display);
  font-size: 5.6cqh;
  font-weight: 600;
  box-shadow: 0 0.8cqh 0.3cqh rgb(0 0 0 / 28%), 0 1.6cqh 2.4cqh rgb(0 0 0 / 22%);
  transition: transform 160ms var(--sl-ease), box-shadow 160ms ease;
}

.lo-cap:hover .lo-cap-key {
  box-shadow: 0 0.3cqh 0.2cqh rgb(0 0 0 / 28%), 0 0.8cqh 1.6cqh rgb(0 0 0 / 22%);
  transform: translateY(0.5cqh);
}

.lo-cap--right {
  color: var(--sl-accent);
}

.lo-cap--right .lo-cap-key {
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.lo-cap--wrong {
  color: var(--sl-coral);
}

.lo-cap--wrong .lo-cap-key {
  background: var(--sl-coral);
  color: var(--sl-ink);
}
</style>
