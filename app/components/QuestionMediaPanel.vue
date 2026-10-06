<script setup lang="ts">
import type { QuestionMedia } from '~/data/quiz-catalog'

/** Large visual for picture questions. Swatch questions render their colours in the answers instead. */
const props = defineProps<{ media: Exclude<QuestionMedia, { kind: 'swatch' }> }>()

const emojiSymbols = computed(() => props.media.kind === 'emoji' ? [...new Intl.Segmenter('de', { granularity: 'grapheme' }).segment(props.media.symbols)].map(part => part.segment).filter(part => part.trim()) : [])

const trend = computed(() => {
  if (props.media.kind !== 'trend')
    return null
  const { values, from } = props.media
  const last = values.length - 1
  const points = values.map((value, index) => `${(index / last) * 100},${100 - value}`).join(' ')
  // Each label sits at its January so a spike reads against the right year.
  const years = Array.from({ length: Math.ceil(values.length / 12) }, (_, index) => ({ year: from + index, left: `${(index * 12 / last) * 100}%` }))
  return { points, area: `0,100 ${points} 100,100`, years }
})
</script>

<template>
  <figure class="question-media" :data-kind="media.kind">
    <div v-if="media.kind === 'emoji'" class="question-media-emoji" role="img" :aria-label="`Emoji-Rätsel: ${media.symbols}`">
      <span v-for="(symbol, index) in emojiSymbols" :key="index" :style="{ animationDelay: `${index * 140}ms` }">{{ symbol }}</span>
    </div>

    <div v-else-if="media.kind === 'doodle'" class="question-media-paper">
      <svg :viewBox="media.viewBox" role="img" aria-label="Schlecht gemalte Zeichnung">
        <path v-for="(path, index) in media.paths" :key="index" :d="path" pathLength="1" :style="{ animationDelay: `${200 + index * 260}ms` }" />
      </svg>
      <figcaption>Aus dem Gedächtnis gemalt</figcaption>
    </div>

    <div v-else-if="trend" class="question-media-trend">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Kurve des Suchinteresses über mehrere Jahre">
        <polygon :points="trend.area" />
        <polyline :points="trend.points" />
      </svg>
      <div class="question-media-trend-years" aria-hidden="true">
        <span v-for="mark in trend.years" :key="mark.year" :style="{ left: mark.left }">{{ mark.year }}</span>
      </div>
      <figcaption>Suchinteresse in Deutschland, vereinfacht</figcaption>
    </div>
  </figure>
</template>

<style scoped>
.question-media {
  display: flex;
  height: clamp(8rem, 30vh, 19rem);
  margin: clamp(0.9rem, 2.4vh, 1.6rem) 0 0;
}

.question-media-emoji {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 2rem);
  border-radius: 1rem;
  background: var(--question-forest);
  font-size: clamp(3.5rem, min(8vw, 14vh), 8.5rem);
  line-height: 1;
}

.question-media-emoji span {
  display: inline-block;
  animation: question-media-pop 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Doodle: dark ink on a slightly crooked sheet of paper, lines drawn one after another. */
.question-media-paper {
  position: relative;
  display: grid;
  width: min(100%, 34rem);
  place-items: center;
  border-radius: 0.9rem;
  background: var(--question-cream);
  padding: 1rem 1.25rem 1.9rem;
  box-shadow: 0 18px 40px rgb(0 0 0 / 30%);
  transform: rotate(-1.2deg);
}

.question-media-paper svg {
  width: 100%;
  height: 100%;
}

.question-media-paper path {
  fill: none;
  stroke: var(--question-ink);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: question-media-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.question-media-paper figcaption,
.question-media-trend figcaption {
  position: absolute;
  bottom: 0.6rem;
  left: 1rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.question-media-paper figcaption {
  color: color-mix(in srgb, var(--question-ink) 62%, transparent);
}

/* Trend: the curve wipes in from the left like a chart being drawn live. */
.question-media-trend {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.5rem;
  border-radius: 1rem;
  background: var(--question-forest);
  padding: 1.25rem 1.25rem 2.1rem;
}

.question-media-trend svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: question-media-wipe 1.6s cubic-bezier(0.16, 1, 0.3, 1) 150ms both;
}

.question-media-trend polyline {
  fill: none;
  stroke: var(--question-accent);
  stroke-width: 3;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.question-media-trend polygon {
  fill: rgb(202 255 74 / 12%);
}

.question-media-trend-years {
  position: relative;
  height: 1.7rem;
  border-top: 1px solid var(--question-line);
  padding-top: 0.4rem;
  color: var(--question-leaf);
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.question-media-trend-years span {
  position: absolute;
  top: 0.4rem;
  border-left: 1px solid var(--question-line);
  padding-left: 0.35rem;
  line-height: 1;
}

.question-media-trend figcaption {
  color: var(--question-muted);
}

@keyframes question-media-pop {
  from { opacity: 0; transform: translateY(14px) scale(0.7); }
  to { opacity: 1; transform: none; }
}

@keyframes question-media-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes question-media-wipe {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

@media (prefers-reduced-motion: reduce) {
  .question-media-emoji span,
  .question-media-trend svg {
    animation: none;
  }

  .question-media-paper path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
