<script setup lang="ts">
import { PaperGrainGradient } from '~/ui/paper-grain-gradient'
import { labCategories, labMatch } from '~/lib/sniper-lab-fixtures'

defineProps<{ variant: string, reducedMotion: boolean }>()

const grain = {
  colorBack: '#081811',
  colors: ['#0b4429', '#2f7a3d', '#caff4a'],
  softness: 0.4,
  intensity: 0.2,
  noise: 0.5,
  shape: 'blob',
  fit: 'contain',
  scale: 1.3,
} as const

const names = labMatch.names
const activeCategories = labCategories.filter(category => category.on).length
const categorySummary = `${activeCategories} von ${labCategories.length} Kategorien`
</script>

<template>
  <div class="sl-stage st" :class="`st--${variant}`">
    <!-- S3 is one full-width arena; every other study keeps the split start screen. -->
    <template v-if="variant === 'S3'">
      <ClientOnly>
        <PaperGrainGradient v-bind="grain" :colors="[...grain.colors]" :speed="reducedMotion ? 0 : 0.5" class="st-grain" aria-hidden="true" />
      </ClientOnly>
      <SniperLabChrome>
        <div class="st-mode st-mode--center" role="radiogroup" aria-label="Spielmodus">
          <button type="button" role="radio" aria-checked="false">Quiz</button>
          <button type="button" role="radio" aria-checked="true" class="is-active">Sound Sniper</button>
        </div>
      </SniperLabChrome>
      <div class="st-arena">
        <h1 class="sl-display st-arena-title">Wer <em>hört's?</em></h1>
        <div class="st-arena-row">
          <label class="st-name st-name--left"><span class="sl-label">Team eins</span><input :value="names[0]" aria-label="Team eins"></label>
          <b class="st-vs">vs</b>
          <label class="st-name st-name--right"><span class="sl-label">Team zwei</span><input :value="names[1]" aria-label="Team zwei"></label>
        </div>
        <div class="st-arena-foot">
          <p class="st-sentence">
            <button type="button">5 Runden</button><span>·</span><button type="button">15 Sek.</button><span>·</span><button type="button">{{ categorySummary }}</button>
          </p>
          <button type="button" class="sl-btn st-go">Spiel starten <Icon name="lucide:arrow-up-right" aria-hidden="true" /></button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="st-hero">
        <ClientOnly>
          <PaperGrainGradient v-bind="grain" :colors="[...grain.colors]" :speed="reducedMotion ? 0 : 0.5" class="st-grain" aria-hidden="true" />
        </ClientOnly>
        <span class="st-brand">Jungle<i>/</i>Quiz</span>
        <div class="st-hero-copy">
          <h1 class="sl-display">Wer<br><em>hört's?</em></h1>
          <p>Ein Geräusch, zwei Buzzer. Wer zuerst drückt, muss es wissen.</p>
        </div>
      </div>

      <form class="st-panel" @submit.prevent>
        <button v-if="variant !== 'S4'" type="button" class="sl-host st-rules"><Icon name="lucide:book-open" aria-hidden="true" /> Regeln</button>

        <div class="st-mode" role="radiogroup" aria-label="Spielmodus">
          <button type="button" role="radio" aria-checked="false">Quiz</button>
          <button type="button" role="radio" aria-checked="true" class="is-active">Sound Sniper</button>
        </div>

        <!-- S1: the same column, but settings and categories collapse into one sentence. -->
        <template v-if="variant === 'S1'">
          <label class="st-name"><span class="sl-label">Team eins</span><input :value="names[0]" aria-label="Team eins"></label>
          <div class="st-versus" aria-hidden="true"><i /><b>vs</b><i /></div>
          <label class="st-name"><span class="sl-label">Team zwei</span><input :value="names[1]" aria-label="Team zwei"></label>
          <p class="st-sentence st-sentence--gap">
            <button type="button">5 Runden</button><span>·</span><button type="button">15 Sek.</button><span>·</span><button type="button">{{ categorySummary }}</button>
          </p>
          <button type="submit" class="sl-btn st-go st-go--wide">Spiel starten <Icon name="lucide:arrow-up-right" aria-hidden="true" /></button>
        </template>

        <!-- S2: who plays on top, the rules as a ruled scoreboard strip at the foot. -->
        <template v-else-if="variant === 'S2'">
          <div class="st-s2-match">
            <label class="st-name"><span class="sl-label">Team eins</span><input :value="names[0]" aria-label="Team eins"></label>
            <div class="st-versus" aria-hidden="true"><i /><b>vs</b><i /></div>
            <label class="st-name"><span class="sl-label">Team zwei</span><input :value="names[1]" aria-label="Team zwei"></label>
            <button type="submit" class="sl-btn st-go st-go--wide">Spiel starten <Icon name="lucide:arrow-up-right" aria-hidden="true" /></button>
          </div>
          <div class="st-strip" role="group" aria-label="Spieleinstellungen">
            <button type="button"><span class="sl-label">Runden</span><strong>5</strong><small>10 Sounds</small></button>
            <button type="button"><span class="sl-label">Hörzeit</span><strong>15<em>s</em></strong><small>pro Sound</small></button>
            <button type="button"><span class="sl-label">Kategorien</span><strong>{{ activeCategories }}<em>/{{ labCategories.length }}</em></strong><small>ohne Games</small></button>
          </div>
        </template>

        <!-- S4: categories become a mixing desk, a fader per category. -->
        <template v-else-if="variant === 'S4'">
          <div class="st-s4-names">
            <label class="st-name st-name--sm"><span class="sl-label">Team eins</span><input :value="names[0]" aria-label="Team eins"></label>
            <b class="st-vs st-vs--sm">vs</b>
            <label class="st-name st-name--sm"><span class="sl-label">Team zwei</span><input :value="names[1]" aria-label="Team zwei"></label>
          </div>
          <div class="st-desk" role="group" aria-label="Sound-Kategorien">
            <button v-for="(category, index) in labCategories" :key="category.label" type="button" :aria-pressed="category.on" :class="{ 'is-on': category.on }">
              <i :style="{ '--h': 0.45 + ((index * 37) % 7) / 12 }" />
              <span>{{ category.label }}</span>
            </button>
          </div>
          <p class="st-sentence st-sentence--sm">
            <button type="button">5 Runden</button><span>·</span><button type="button">15 Sek.</button>
          </p>
          <button type="submit" class="sl-btn st-go st-go--wide">Spiel starten <Icon name="lucide:arrow-up-right" aria-hidden="true" /></button>
        </template>

        <!-- S5: the VS is the start button. Settings shrink to one quiet line. -->
        <template v-else>
          <label class="st-name"><span class="sl-label">Team eins</span><input :value="names[0]" aria-label="Team eins"></label>
          <div class="st-versus st-versus--disc">
            <i aria-hidden="true" />
            <button type="submit" class="st-disc" aria-label="Spiel starten">
              <b>vs</b>
              <span>Start <span class="sl-key">Enter</span></span>
            </button>
            <i aria-hidden="true" />
          </div>
          <label class="st-name"><span class="sl-label">Team zwei</span><input :value="names[1]" aria-label="Team zwei"></label>
          <p class="st-sentence st-sentence--sm st-sentence--gap">
            <button type="button">5 Runden</button><span>·</span><button type="button">15 Sek.</button><span>·</span><button type="button">{{ categorySummary }}</button>
          </p>
        </template>
      </form>
    </template>
  </div>
</template>

<style scoped>
.st {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  background: var(--sl-forest);
}

.st-grain {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.st-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  overflow: hidden;
  background: var(--sl-ink);
  padding: var(--sl-pad-top) var(--sl-pad-x);
}

.st-brand {
  font-family: var(--font-display);
  font-size: 1.75cqw;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.st-brand i {
  margin: 0 0.25em;
  color: var(--sl-accent);
  font-style: normal;
}

.st-hero-copy {
  margin-block: auto;
}

.st-hero h1 {
  margin: 0;
  font-size: min(10cqw, 19cqh);
  line-height: 0.84;
}

.st-hero h1 em,
.st-arena-title em {
  color: var(--sl-accent);
  font-style: normal;
}

.st-hero p {
  max-width: 24ch;
  margin-top: 4cqh;
  color: color-mix(in srgb, var(--sl-cream) 80%, transparent);
  font-size: max(13px, 1.6cqw);
  font-weight: 500;
  line-height: 1.3;
}

/* Panel */
.st-panel {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9cqh 5.4cqw 6cqh;
  text-align: center;
}

.st-rules {
  position: absolute;
  top: var(--sl-pad-top);
  right: var(--sl-pad-x);
}

.st-mode {
  display: inline-flex;
  gap: 0.25cqw;
  margin-bottom: 5cqh;
  border: 1px solid rgb(251 248 237 / 24%);
  border-radius: 999px;
  padding: 0.5cqh;
}

.st-mode button {
  min-height: max(30px, 5.4cqh);
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--sl-muted);
  cursor: pointer;
  padding: 0 1.4cqw;
  font-size: max(9px, 0.85cqw);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.st-mode button.is-active {
  background: var(--sl-accent);
  color: var(--sl-ink);
}

.st-name {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 1.2cqh;
}

.st-name input {
  width: 100%;
  min-width: 0;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  caret-color: var(--sl-accent);
  color: var(--sl-cream);
  outline: none;
  padding: 0 0 0.6cqh;
  font-family: var(--font-display);
  font-size: min(3.7cqw, 7.4cqh);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: center;
}

.st-name input:hover {
  border-bottom-color: rgb(251 248 237 / 24%);
}

.st-name input:focus {
  border-bottom-color: var(--sl-accent);
}

.st-versus {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.8cqw;
  margin: 3.4cqh 0;
  color: var(--sl-accent);
}

.st-versus > i {
  height: 1px;
  flex: 1;
  background: color-mix(in srgb, var(--sl-accent) 35%, transparent);
}

.st-versus b,
.st-vs {
  font-family: var(--font-display);
  font-size: min(5.6cqw, 11cqh);
  font-style: italic;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 0.8;
}

.st-vs {
  color: var(--sl-accent);
}

.st-sentence {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 0.4cqh 0.7cqw;
  color: var(--sl-muted);
}

.st-sentence--gap {
  margin-top: 5.6cqh;
}

.st-sentence button {
  border: 0;
  border-bottom: 2px dotted color-mix(in srgb, var(--sl-accent) 60%, transparent);
  background: transparent;
  color: var(--sl-cream);
  cursor: pointer;
  padding: 0 0 0.2cqh;
  font-family: var(--font-display);
  font-size: min(1.9cqw, 3.8cqh);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.st-sentence button:hover {
  border-bottom-style: solid;
  color: var(--sl-accent);
}

.st-sentence--sm button {
  font-size: min(1.5cqw, 3cqh);
}

.st-go {
  margin-top: 4.6cqh;
}

.st-go--wide {
  width: 100%;
  max-width: 34cqw;
  min-height: 8.6cqh;
}

/* S2 strip */
.st--S2 .st-panel {
  justify-content: space-between;
  padding-bottom: 0;
}

.st-s2-match {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.st-strip {
  display: grid;
  width: calc(100% + 10.8cqw);
  grid-template-columns: repeat(3, 1fr);
  margin-top: 4cqh;
  border-top: 1px solid rgb(251 248 237 / 22%);
}

.st-strip button {
  display: grid;
  justify-items: start;
  gap: 0.8cqh;
  border: 0;
  border-right: 1px solid rgb(251 248 237 / 22%);
  background: transparent;
  color: var(--sl-cream);
  cursor: pointer;
  padding: 2.8cqh 2.2cqw 3.2cqh;
  text-align: left;
  transition: background 160ms ease;
}

.st-strip button:last-child {
  border-right: 0;
}

.st-strip button:hover {
  background: rgb(8 24 17 / 35%);
}

.st-strip strong {
  font-family: var(--font-display);
  font-size: min(4cqw, 8cqh);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.st-strip strong em {
  color: var(--sl-muted);
  font-size: 0.5em;
  font-style: normal;
  letter-spacing: 0;
}

.st-strip small {
  color: var(--sl-muted);
  font-size: max(10px, 0.9cqw);
}

/* S4 mixing desk */
.st-s4-names {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 1.4cqh;
}

.st-s4-names .st-name > span {
  display: none;
}

.st-name--sm input {
  font-size: min(3cqw, 6cqh);
}

.st-vs--sm {
  font-size: min(3cqw, 6cqh);
}

.st-desk {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.6cqw;
  margin-top: 5cqh;
}

.st-desk button {
  display: grid;
  grid-template-rows: 15cqh auto;
  justify-items: center;
  gap: 1.2cqh;
  border: 0;
  background: transparent;
  color: var(--sl-muted);
  cursor: pointer;
  padding: 0;
}

.st-desk i {
  align-self: end;
  width: 62%;
  height: calc(var(--h) * 100%);
  border: 1px solid rgb(251 248 237 / 26%);
  border-radius: 999px;
  transition: background 200ms ease, border-color 200ms ease;
}

.st-desk button.is-on i {
  border-color: var(--sl-accent);
  background: var(--sl-accent);
}

.st-desk span {
  font-size: max(9px, 0.82cqw);
  font-weight: 600;
  line-height: 1.15;
  text-wrap: balance;
}

.st-desk button.is-on span {
  color: var(--sl-cream);
}

.st-desk button:not(.is-on) span {
  text-decoration: line-through;
}

.st--S4 .st-sentence {
  margin-top: 3.6cqh;
}

.st--S4 .st-go {
  margin-top: 3cqh;
}

/* S5 disc */
.st-versus--disc {
  margin: 2.6cqh 0;
}

.st-disc {
  display: grid;
  width: min(14cqw, 26cqh);
  aspect-ratio: 1;
  place-content: center;
  justify-items: center;
  gap: 1cqh;
  border: 0;
  border-radius: 50%;
  background: var(--sl-accent);
  color: var(--sl-ink);
  cursor: pointer;
  box-shadow: 0 1.6cqh 4cqh rgb(8 24 17 / 45%);
  transition: transform 260ms var(--sl-ease);
}

.st-disc:hover {
  transform: scale(1.04) rotate(-3deg);
}

.st-disc b {
  font-family: var(--font-display);
  font-size: min(5.4cqw, 10.4cqh);
  font-style: italic;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 0.75;
}

.st-disc > span {
  display: inline-flex;
  align-items: center;
  gap: 0.5cqw;
  font-size: max(9px, 0.85cqw);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* S3 arena */
.st--S3 {
  display: block;
  background: var(--sl-ink);
}

.st-mode--center {
  margin: 0;
  pointer-events: auto;
}

.st-arena {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 15cqh var(--sl-pad-x) 6.4cqh;
}

.st-arena-title {
  margin: 0;
  font-size: min(5.2cqw, 10cqh);
  text-align: center;
}

.st-arena-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 3cqw;
}

.st-arena-row .st-name input {
  font-size: min(5.4cqw, 10.5cqh);
}

.st-name--left {
  justify-items: end;
}

.st-name--left input {
  text-align: right;
}

.st-name--right {
  justify-items: start;
}

.st-name--right input {
  text-align: left;
}

.st-arena-row .st-vs {
  font-size: min(9cqw, 17cqh);
}

.st-arena-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  border-top: 1px solid var(--sl-line);
  padding-top: 3.6cqh;
}

.st-arena-foot .st-go {
  min-width: 26cqw;
  min-height: 8.6cqh;
  margin: 0;
}
</style>
