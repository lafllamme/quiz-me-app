<script setup lang="ts">
import { labMatch } from '~/lib/sniper-lab-fixtures'

defineProps<{ variant: string, seconds: number }>()

const names = labMatch.names
const plays = labMatch.plays
const maxPlays = labMatch.maxPlays
const left = maxPlays - plays

// Three arcs around the replay disc, one per listen. Small gaps keep them readable as a count.
const arcs = Array.from({ length: maxPlays }, (_, index) => {
  const gap = 6
  const span = 100 / maxPlays
  return { offset: -(index * span) - gap / 2, length: span - gap, used: index < plays }
})
</script>

<template>
  <div class="sl-stage ls" :class="`ls--${variant}`">
    <SniperLabHead />

    <div class="sl-main ls-grid" :class="{ 'ls-grid--rail': variant === 'H5' }">
      <div class="ls-copy">
        <div class="ls-wave" :class="{ 'ls-wave--sweep': variant === 'H4' }">
          <SniperLabWave :sweep="variant === 'H4'" />
        </div>

        <!-- H4: the wave is a player. A ruler under it carries listen count and replay. -->
        <div v-if="variant === 'H4'" class="ls-ruler">
          <span class="sl-label"><b>1. Wiedergabe</b> · läuft</span>
          <button type="button" class="ls-ruler-replay">
            <Icon name="lucide:rotate-ccw" aria-hidden="true" /> Nochmal · {{ left }}× übrig <span class="sl-key">W</span>
          </button>
        </div>

        <h2 class="sl-display ls-prompt">Was hört ihr?</h2>

        <!-- H1: counter and replay are one control: a disc ringed by the three listens. -->
        <button v-if="variant === 'H1'" type="button" class="ls-h1">
          <span class="ls-h1-disc">
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
          <span class="ls-h1-copy">
            <strong>Nochmal hören <span class="sl-key">W</span></strong>
            <small>{{ left }} von {{ maxPlays }} übrig</small>
          </span>
        </button>

        <!-- H2: each listen is a token. Spent, next (the button), and the last one. -->
        <div v-else-if="variant === 'H2'" class="ls-h2" role="group" :aria-label="`Wiedergabe ${plays} von ${maxPlays}`">
          <span class="ls-token is-used"><Icon name="lucide:volume-2" aria-hidden="true" /> 1 · Gehört</span>
          <button type="button" class="ls-token is-next"><Icon name="lucide:rotate-ccw" aria-hidden="true" /> 2 · Nochmal hören <span class="sl-key">W</span></button>
          <span class="ls-token">3</span>
        </div>
      </div>

      <aside class="ls-side">
        <SniperLabClock :seconds="seconds" :total="labMatch.seconds" />

        <!-- H3: the listens live with the time; both are what the room can still spend. -->
        <div v-if="variant === 'H3'" class="ls-h3">
          <div class="ls-h3-head">
            <span class="sl-label">Wiedergaben</span>
            <span class="ls-dots" aria-hidden="true"><i v-for="slot in maxPlays" :key="slot" :class="{ 'is-used': slot <= plays }" /></span>
          </div>
          <button type="button" class="sl-btn sl-btn--ghost ls-h3-btn"><Icon name="lucide:rotate-ccw" aria-hidden="true" /> Nochmal hören <span class="sl-key">W</span></button>
        </div>

        <div v-if="variant !== 'H5'" class="ls-host">
          <button type="button" class="sl-host">Pause <span class="sl-key">Leertaste</span></button>
          <button type="button" class="sl-host">Überspringen <span class="sl-key">S</span></button>
        </div>
      </aside>
    </div>

    <!-- H5: every control in one transport rail; the stage keeps only wave, prompt and time. -->
    <div v-if="variant === 'H5'" class="ls-rail">
      <span class="ls-rail-buzz"><span class="sl-key">1</span> {{ names[0] }} <span class="ls-rail-sep" /> <span class="sl-key">2</span> {{ names[1] }}</span>
      <span class="ls-rail-plays">
        <span class="ls-dots" aria-hidden="true"><i v-for="slot in maxPlays" :key="slot" :class="{ 'is-used': slot <= plays }" /></span>
        <span class="sl-label">{{ plays }} / {{ maxPlays }} gehört</span>
      </span>
      <span class="ls-rail-actions">
        <button type="button" class="sl-btn ls-rail-replay"><Icon name="lucide:rotate-ccw" aria-hidden="true" /> Nochmal <span class="sl-key">W</span></button>
        <button type="button" class="sl-host"><Icon name="lucide:pause" aria-hidden="true" /> <span class="sl-key">Leertaste</span></button>
        <button type="button" class="sl-host"><Icon name="lucide:skip-forward" aria-hidden="true" /> <span class="sl-key">S</span></button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ls-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28cqw;
  align-items: center;
  gap: 5cqw;
}

.ls-grid--rail {
  bottom: 15cqh;
}

.ls-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.ls-wave {
  width: min(100%, 46cqw);
  height: 21cqh;
}

.ls--H3 .ls-wave,
.ls--H5 .ls-wave {
  width: 100%;
  height: 25cqh;
}

.ls-prompt {
  margin: 3cqh 0 0;
  font-size: min(5.6cqw, 11cqh);
  letter-spacing: -0.03em;
}

.ls--H3 .ls-prompt,
.ls--H5 .ls-prompt {
  font-size: min(6.6cqw, 13cqh);
}

.ls-side {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border-left: 1px solid var(--sl-line);
  padding-left: 3cqw;
}

.ls-host {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4cqh 2cqw;
  margin-top: 1.4cqh;
}

/* H1 */
.ls-h1 {
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  margin-top: 4cqh;
  border: 0;
  background: transparent;
  color: var(--sl-cream);
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.ls-h1-disc {
  position: relative;
  display: grid;
  width: 11cqh;
  aspect-ratio: 1;
  place-items: center;
  color: var(--sl-accent);
  font-size: 4cqh;
  transition: transform 260ms var(--sl-ease);
}

.ls-h1:hover .ls-h1-disc {
  transform: rotate(-30deg);
}

.ls-h1-disc svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.ls-h1-disc circle {
  fill: none;
  stroke: rgb(202 255 74 / 30%);
  stroke-linecap: round;
  stroke-width: 6;
}

.ls-h1-disc circle.is-used {
  stroke: var(--sl-accent);
}

.ls-h1-copy strong {
  display: flex;
  align-items: center;
  gap: 0.8cqw;
  font-size: max(14px, 1.9cqw);
  font-weight: 600;
}

.ls-h1-copy small {
  display: block;
  margin-top: 0.8cqh;
  color: var(--sl-muted);
  font-size: max(11px, 1.25cqw);
  font-weight: 500;
}

/* H2 */
.ls-h2 {
  display: flex;
  gap: 0.8cqw;
  margin-top: 4cqh;
}

.ls-token {
  display: inline-flex;
  min-width: 8cqh;
  min-height: 8cqh;
  align-items: center;
  justify-content: center;
  gap: 0.8cqw;
  border: 1px solid rgb(251 248 237 / 22%);
  border-radius: 999px;
  background: transparent;
  color: var(--sl-muted);
  padding: 0 1.6cqw;
  font-size: max(11px, 1.15cqw);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.ls-token.is-used {
  border-color: transparent;
  background: rgb(202 255 74 / 14%);
  color: var(--sl-accent);
}

.ls-token.is-next {
  border-color: var(--sl-accent);
  background: var(--sl-accent);
  color: var(--sl-ink);
  cursor: pointer;
}

/* H3 */
.ls-h3 {
  margin-top: 4cqh;
  border-top: 1px solid var(--sl-line);
  padding-top: 3cqh;
}

.ls-h3-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ls-dots {
  display: inline-flex;
  gap: 0.5cqw;
}

.ls-dots i {
  width: 1.9cqh;
  height: 1.9cqh;
  border: 2px solid var(--sl-accent);
  border-radius: 50%;
}

.ls-dots i.is-used {
  background: var(--sl-accent);
}

.ls-h3-btn {
  width: 100%;
  margin-top: 2cqh;
}

/* H4 */
.ls-wave--sweep {
  width: 100%;
}

.ls-ruler {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  margin-top: 1.6cqh;
  border-top: 1px solid var(--sl-line);
  padding-top: 1.4cqh;
}

.ls-ruler b {
  color: var(--sl-cream);
}

.ls-ruler-replay {
  display: inline-flex;
  align-items: center;
  gap: 0.6cqw;
  border: 0;
  background: transparent;
  color: var(--sl-accent);
  cursor: pointer;
  font-size: max(11px, 1.15cqw);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* H5 */
.ls-rail {
  position: absolute;
  right: var(--sl-pad-x);
  bottom: 4.4cqh;
  left: var(--sl-pad-x);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2cqw;
  border-top: 1px solid var(--sl-line);
  padding-top: 2.6cqh;
}

.ls-rail-buzz {
  display: flex;
  align-items: center;
  gap: 0.6cqw;
  color: var(--sl-muted);
  font-size: max(11px, 1.1cqw);
  font-weight: 600;
  white-space: nowrap;
}

.ls-rail-sep {
  width: 1.6cqw;
}

.ls-rail-plays {
  display: flex;
  align-items: center;
  gap: 1cqw;
}

.ls-rail-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.6cqw;
}

.ls-rail-replay {
  min-height: 7cqh;
}
</style>
