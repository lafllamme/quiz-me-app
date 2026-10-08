<script setup lang="ts">
import { labMatch } from '~/lib/sniper-lab-fixtures'

defineProps<{ variant: string }>()

const names = labMatch.names
const sub = 'Seid ihr bereit? Wer zuerst buzzert, muss liefern. Falsch geraten heißt: Punkt für die anderen.'
</script>

<template>
  <div class="sl-stage rd" :class="`rd--${variant}`">
    <SniperLabHead />

    <!-- R1: one full-width line for the headline, a wide sub, the action row at the foot. -->
    <div v-if="variant === 'R1'" class="sl-main rd-r1">
      <span class="sl-pill">Sound {{ labMatch.sound }} von {{ labMatch.total }}</span>
      <h2 class="sl-display rd-r1-title sl-rise">Ohren <em>auf.</em></h2>
      <p class="rd-r1-sub">{{ sub }}</p>
      <div class="rd-r1-row">
        <button type="button" class="sl-btn rd-start">
          <span class="rd-start-icon"><Icon name="lucide:play" aria-hidden="true" /></span>
          Sound starten <span class="sl-key">Enter</span>
        </button>
        <dl class="rd-facts">
          <div><dt class="sl-label">Hörzeit</dt><dd>{{ labMatch.seconds }} Sek.</dd></div>
          <div><dt class="sl-label">Hören</dt><dd>bis zu 3×</dd></div>
          <div><dt class="sl-label">Buzzer</dt><dd><span class="sl-key">1</span> {{ names[0] }} · <span class="sl-key">2</span> {{ names[1] }}</dd></div>
        </dl>
      </div>
    </div>

    <!-- R2: a centred stage. One round play disc, the sentence wide under the headline. -->
    <div v-else-if="variant === 'R2'" class="sl-main rd-r2">
      <span class="sl-pill">Sound {{ labMatch.sound }} von {{ labMatch.total }} · {{ labMatch.seconds }} Sek.</span>
      <h2 class="sl-display rd-r2-title sl-rise">Ohren <em>auf.</em></h2>
      <p class="rd-r2-sub">{{ sub }}</p>
      <button type="button" class="rd-r2-play" aria-label="Sound starten">
        <span class="sl-disc" style="--disc: 15cqh"><Icon name="lucide:play" aria-hidden="true" /></span>
        <span class="sl-label">Starten <span class="sl-key">Enter</span></span>
      </button>
    </div>

    <!-- R3: two equal halves. The words left, the explanation and the action right. -->
    <div v-else-if="variant === 'R3'" class="sl-main rd-r3">
      <h2 class="sl-display rd-r3-title sl-rise">Ohren<br><em>auf.</em></h2>
      <div class="rd-r3-side">
        <span class="sl-pill">Sound {{ labMatch.sound }} von {{ labMatch.total }}</span>
        <p>{{ sub }}</p>
        <div class="rd-r3-action">
          <button type="button" class="sl-disc" style="--disc: 13cqh" aria-label="Sound starten"><Icon name="lucide:play" aria-hidden="true" /></button>
          <span><strong>Sound starten</strong><small class="sl-label">Enter · {{ labMatch.seconds }} Sek. Hörzeit</small></span>
        </div>
      </div>
    </div>

    <!-- R4: headline and action share one line; the paragraph becomes three beats across the width. -->
    <div v-else-if="variant === 'R4'" class="sl-main rd-r4">
      <div class="rd-r4-top">
        <div>
          <span class="sl-pill">Sound {{ labMatch.sound }} von {{ labMatch.total }}</span>
          <h2 class="sl-display rd-r4-title sl-rise">Ohren <em>auf.</em></h2>
        </div>
        <button type="button" class="sl-btn rd-start rd-start--xl">
          <span class="rd-start-icon"><Icon name="lucide:play" aria-hidden="true" /></span>
          Starten <span class="sl-key">Enter</span>
        </button>
      </div>
      <ol class="rd-beats">
        <li><b>Hören</b><span>{{ labMatch.seconds }} Sekunden, bis zu dreimal.</span></li>
        <li><b>Buzzern</b><span>Wer zuerst drückt, antwortet.</span></li>
        <li><b>Liefern</b><span>Falsch heißt: Punkt für die anderen.</span></li>
      </ol>
    </div>

    <!-- R5: next-up state. The sound number leads, a ring starts the sound on its own. -->
    <div v-else class="sl-main rd-r5">
      <div class="rd-r5-number" aria-label="Sound 4 von 10">
        <strong class="sl-display">0{{ labMatch.sound }}</strong>
        <span class="sl-label">von {{ labMatch.total }}</span>
      </div>
      <div class="rd-r5-copy">
        <h2 class="sl-display">Ohren <em>auf.</em></h2>
        <p>{{ sub }}</p>
        <div class="rd-r5-action">
          <button type="button" class="rd-ring" aria-label="Sound starten">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" class="rd-ring-track" />
              <circle cx="50" cy="50" r="46" class="rd-ring-fill" pathLength="100" />
            </svg>
            <Icon name="lucide:play" aria-hidden="true" />
          </button>
          <span><strong>Startet gleich</strong><small class="sl-label"><span class="sl-key">Enter</span> sofort · <span class="sl-key">Leertaste</span> halten</small></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rd em {
  color: var(--sl-accent);
  font-style: normal;
}

.rd-start {
  min-height: 10cqh;
  gap: 1.2cqw;
  padding: 0 2.6cqw 0 1cqh;
  font-size: max(12px, 1.4cqw);
}

.rd-start-icon {
  display: grid;
  width: 8cqh;
  height: 8cqh;
  place-items: center;
  border-radius: 50%;
  background: var(--sl-ink);
  color: var(--sl-accent);
  font-size: 3.4cqh;
}

/* R1 */
.rd-r1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rd-r1-title {
  margin: 3cqh 0 0;
  font-size: min(15cqw, 27cqh);
  line-height: 0.82;
  white-space: nowrap;
}

.rd-r1-sub {
  max-width: 52ch;
  margin-top: 3.4cqh;
  color: color-mix(in srgb, var(--sl-cream) 84%, transparent);
  font-size: min(2.35cqw, 4.6cqh);
  font-weight: 500;
  line-height: 1.25;
  text-wrap: pretty;
}

.rd-r1-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  margin-top: auto;
  border-top: 1px solid var(--sl-line);
  padding-top: 3.4cqh;
}

.rd-facts {
  display: flex;
  gap: 3.4cqw;
  margin: 0;
}

.rd-facts div {
  display: grid;
  gap: 0.8cqh;
}

.rd-facts dd {
  margin: 0;
  font-size: max(12px, 1.35cqw);
  font-weight: 600;
  white-space: nowrap;
}

/* R2 */
.rd-r2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rd-r2 .sl-pill {
  align-self: center;
}

.rd-r2-title {
  margin: 2.6cqh 0 0;
  font-size: min(12cqw, 21cqh);
  white-space: nowrap;
}

.rd-r2-sub {
  max-width: 44ch;
  margin-top: 2.6cqh;
  color: color-mix(in srgb, var(--sl-cream) 84%, transparent);
  font-size: min(2.2cqw, 4.2cqh);
  font-weight: 500;
  line-height: 1.25;
  text-wrap: balance;
}

.rd-r2-play {
  display: grid;
  justify-items: center;
  gap: 1.6cqh;
  margin-top: 4.4cqh;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.rd-r2-play .sl-disc {
  box-shadow: 0 0 0 1.6cqh rgb(202 255 74 / 12%);
}

/* R3 */
.rd-r3 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
}

.rd-r3-title {
  margin: 0;
  font-size: min(14cqw, 30cqh);
  line-height: 0.82;
}

.rd-r3-side {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--sl-line);
  padding-left: 4cqw;
}

.rd-r3-side p {
  margin-top: 3cqh;
  font-size: min(2.5cqw, 5cqh);
  font-weight: 500;
  line-height: 1.2;
  text-wrap: pretty;
}

.rd-r3-action {
  display: flex;
  align-items: center;
  gap: 1.6cqw;
  margin-top: 5cqh;
}

.rd-r3-action strong {
  display: block;
  font-size: max(14px, 1.8cqw);
  font-weight: 600;
}

.rd-r3-action small {
  display: block;
  margin-top: 0.8cqh;
}

/* R4 */
.rd-r4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7cqh;
}

.rd-r4-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3cqw;
}

.rd-r4-title {
  margin: 2.6cqh 0 0;
  font-size: min(12.5cqw, 23cqh);
  white-space: nowrap;
}

.rd-start--xl {
  min-height: 13cqh;
  margin-bottom: 1.4cqh;
  padding-right: 3.4cqw;
  font-size: max(13px, 1.7cqw);
}

.rd-start--xl .rd-start-icon {
  width: 10.6cqh;
  height: 10.6cqh;
}

.rd-beats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--sl-line);
  counter-reset: beat;
  list-style: none;
}

.rd-beats li {
  display: grid;
  gap: 1cqh;
  padding: 3cqh 2cqw 0 0;
  counter-increment: beat;
}

.rd-beats b {
  display: flex;
  align-items: baseline;
  gap: 0.8cqw;
  font-family: var(--font-display);
  font-size: min(3.2cqw, 6cqh);
  font-weight: 500;
  letter-spacing: -0.02em;
}

.rd-beats b::before {
  color: var(--sl-accent);
  content: counter(beat);
}

.rd-beats span {
  color: color-mix(in srgb, var(--sl-cream) 78%, transparent);
  font-size: max(12px, 1.5cqw);
  line-height: 1.3;
}

/* R5 */
.rd-r5 {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 5cqw;
}

.rd-r5-number {
  display: grid;
  justify-items: end;
}

.rd-r5-number strong {
  color: var(--sl-accent);
  font-size: min(24cqw, 48cqh);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  line-height: 0.76;
}

.rd-r5-number .sl-label {
  margin-top: 1.6cqh;
  font-size: max(10px, 1.2cqw);
}

.rd-r5-copy h2 {
  margin: 0;
  font-size: min(7cqw, 13cqh);
  white-space: nowrap;
}

.rd-r5-copy p {
  max-width: 40ch;
  margin-top: 2.6cqh;
  color: color-mix(in srgb, var(--sl-cream) 82%, transparent);
  font-size: min(1.9cqw, 3.8cqh);
  font-weight: 500;
  line-height: 1.3;
}

.rd-r5-action {
  display: flex;
  align-items: center;
  gap: 1.6cqw;
  margin-top: 5cqh;
}

.rd-r5-action strong {
  display: block;
  font-size: max(13px, 1.6cqw);
  font-weight: 600;
}

.rd-r5-action small {
  display: flex;
  align-items: center;
  gap: 0.4cqw;
  margin-top: 0.8cqh;
}

.rd-ring {
  position: relative;
  display: grid;
  width: 12cqh;
  aspect-ratio: 1;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--sl-accent);
  cursor: pointer;
  font-size: 4.4cqh;
}

.rd-ring svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.rd-ring circle {
  fill: none;
  stroke-width: 5;
}

.rd-ring-track {
  stroke: rgb(202 255 74 / 18%);
}

.rd-ring-fill {
  stroke: var(--sl-accent);
  stroke-dasharray: 100;
  stroke-linecap: round;
  animation: rd-fill 5s linear infinite;
}

@keyframes rd-fill {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .rd-ring-fill { stroke-dashoffset: 40; animation: none; }
}
</style>
