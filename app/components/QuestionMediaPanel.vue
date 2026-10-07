<script setup lang="ts">
import type { QuestionMedia } from '~/data/quiz-catalog'
import { GEO_MAPS } from '~/data/geo/maps'
import { GEO_SHAPES } from '~/data/geo/shapes'

export type PanelMedia = Exclude<QuestionMedia, { kind: 'swatch' } | { kind: 'flag', reveal: string }>

/**
 * Large visual for picture questions. `progress` (0–1) follows the answer timer and drives
 * the formats that reveal themselves over time; `revealed` shows everything at once.
 */
const props = defineProps<{ media: PanelMedia, progress: number, revealed: boolean }>()

// The timer restarts for a steal; the reveal must never run backwards.
const peak = ref(0)
watch(() => props.progress, value => peak.value = Math.max(peak.value, value), { immediate: true })
const reveal = computed(() => props.revealed ? 1 : peak.value)

const easeOut = (value: number) => 1 - (1 - Math.min(1, Math.max(0, value))) ** 3

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

// Silhouette: starts at 4.5× on the focus point and pulls back to the full shape by 80 % of the timer.
const SILHOUETTE_START_ZOOM = 4.5
const silhouette = computed(() => {
  if (props.media.kind !== 'silhouette')
    return null
  const source = 'shape' in props.media ? GEO_SHAPES[props.media.shape] : props.media
  const [fx, fy] = props.media.focus ?? [0.5, 0.5]
  const zoom = 1 + (SILHOUETTE_START_ZOOM - 1) * (1 - easeOut(reveal.value / 0.8))
  return { viewBox: source.viewBox, path: source.path, origin: `${fx * 100}% ${fy * 100}%`, zoom }
})

// Quartet: the first stat is visible right away, the rest turn over one by one.
const quartetVisible = computed(() => {
  if (props.media.kind !== 'quartet')
    return 0
  const count = props.media.stats.length
  return reveal.value >= 1 ? count : Math.min(count, 1 + Math.floor(reveal.value / 0.7 * (count - 1)))
})

const pinMap = computed(() => {
  if (props.media.kind !== 'pin')
    return null
  const map = GEO_MAPS[props.media.map]
  const [west, east, south, north] = map.bounds
  const mercator = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
  const project = ([lon, lat]: readonly [number, number]) => ({
    x: ((lon - west) / (east - west)) * map.width,
    y: ((mercator(north) - mercator(lat)) / (mercator(north) - mercator(south))) * map.height,
  })
  const place = (point: readonly [number, number]) => {
    const { x, y } = project(point)
    return { left: `${(x / map.width) * 100}%`, top: `${(y / map.height) * 100}%` }
  }
  return {
    map,
    target: place(props.media.at),
    reference: props.media.reference ? { label: props.media.reference.label, style: place(props.media.reference.at) } : null,
  }
})

// Pixel art: pixels appear in a fixed shuffled order and are all in place by 75 % of the timer.
const pixel = computed(() => {
  if (props.media.kind !== 'pixel')
    return null
  const { palette, rows } = props.media
  const cells = rows.flatMap((row, y) => [...row].map((char, x) => ({ x, y, color: palette[char] })).filter(cell => cell.color))
  let seed = [...rows.join('')].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32
  const order = cells.map((cell, index) => ({ cell, rank: random(), index })).sort((a, b) => a.rank - b.rank)
  const visible = Math.ceil(order.length * Math.min(1, 0.12 + reveal.value / 0.75))
  return {
    width: Math.max(...rows.map(row => row.length)),
    height: rows.length,
    cells: order.slice(0, visible).map(item => item.cell),
  }
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

    <div v-else-if="silhouette" class="question-media-silhouette">
      <svg :viewBox="silhouette.viewBox" role="img" aria-label="Umriss, der langsam herauszoomt">
        <path :d="silhouette.path" fill-rule="evenodd" :style="{ transformOrigin: silhouette.origin, transform: `scale(${silhouette.zoom})` }" />
      </svg>
      <figcaption>{{ silhouette.zoom > 1.02 ? 'Zoomt langsam raus …' : 'Ganz zu sehen' }}</figcaption>
    </div>

    <div v-else-if="media.kind === 'quartet'" class="question-media-quartet">
      <div class="question-media-quartet-card">
        <header>
          <span>{{ media.heading }}</span>
          <strong>???</strong>
        </header>
        <dl>
          <div v-for="(stat, index) in media.stats" :key="stat.label" :class="{ 'is-hidden': index >= quartetVisible }">
            <dt>{{ stat.label }}</dt>
            <dd>{{ index < quartetVisible ? stat.value : '· · ·' }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div v-else-if="pinMap" class="question-media-map">
      <!-- Pins sit in HTML over the map so they keep one size on every map scale. -->
      <div class="question-media-map-frame" :style="{ aspectRatio: `${pinMap.map.width} / ${pinMap.map.height}` }">
        <svg :viewBox="`0 0 ${pinMap.map.width} ${pinMap.map.height}`" role="img" aria-label="Karte mit markiertem Ort">
          <path v-for="(path, index) in pinMap.map.land" :key="`land-${index}`" class="question-media-map-land" :d="path" />
          <path v-for="(path, index) in pinMap.map.focus" :key="`focus-${index}`" class="question-media-map-focus" :d="path" />
          <path v-for="(path, index) in pinMap.map.rivers" :key="`river-${index}`" class="question-media-map-river" :d="path" />
        </svg>
        <span v-if="pinMap.reference" class="question-media-map-reference" :style="pinMap.reference.style">{{ pinMap.reference.label }}</span>
        <span class="question-media-map-pin" :style="pinMap.target" />
      </div>
    </div>

    <div v-else-if="pixel" class="question-media-pixel">
      <svg :viewBox="`0 0 ${pixel.width} ${pixel.height}`" shape-rendering="crispEdges" role="img" aria-label="Pixelbild, das sich aufbaut">
        <rect v-for="cell in pixel.cells" :key="`${cell.x}-${cell.y}`" :x="cell.x" :y="cell.y" width="1" height="1" :fill="cell.color" />
      </svg>
    </div>

    <div v-else-if="media.kind === 'flag'" class="question-media-flag">
      <FlagImage :spec="media.show" />
    </div>

    <div v-else-if="media.kind === 'phrase'" class="question-media-phrase">
      <p>{{ media.text }}</p>
      <small v-if="media.note && revealed">„{{ media.note }}“</small>
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

.question-media figcaption {
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

.question-media-trend figcaption,
.question-media-silhouette figcaption {
  color: var(--question-muted);
}

/* Silhouette: a cream shape on forest green; the zoom eases out in step with the timer. */
.question-media-silhouette {
  position: relative;
  display: grid;
  width: 100%;
  place-items: center;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--question-forest);
  padding: 1rem 1rem 2rem;
}

.question-media-silhouette svg {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.question-media-silhouette path {
  fill: var(--question-cream);
  transform-box: fill-box;
  transition: transform 400ms linear;
}

/* Quartet: a trump card whose stats turn over one by one. */
.question-media-quartet {
  display: grid;
  width: 100%;
  place-items: center;
}

.question-media-quartet-card {
  display: grid;
  width: min(100%, 30rem);
  height: 100%;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--question-cream);
  color: var(--question-ink);
  box-shadow: 0 18px 40px rgb(0 0 0 / 30%);
  transform: rotate(1deg);
}

.question-media-quartet-card header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  background: var(--question-accent);
  padding: 0.55rem 1rem;
}

.question-media-quartet-card header span {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.question-media-quartet-card header strong {
  font-size: 1.1rem;
  letter-spacing: 0.2em;
}

.question-media-quartet-card dl {
  display: grid;
  margin: 0;
  padding: 0.35rem 1rem;
}

.question-media-quartet-card dl div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px dashed color-mix(in srgb, var(--question-ink) 22%, transparent);
  font-size: clamp(0.95rem, min(1.6vw, 2.6vh), 1.35rem);
}

.question-media-quartet-card dl div:last-child {
  border-bottom: 0;
}

.question-media-quartet-card dt {
  color: color-mix(in srgb, var(--question-ink) 65%, transparent);
  font-weight: 600;
}

.question-media-quartet-card dd {
  margin: 0;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  text-align: right;
  animation: question-media-pop 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.question-media-quartet-card .is-hidden dd {
  color: color-mix(in srgb, var(--question-ink) 35%, transparent);
  animation: none;
}

/* Map: dark land, the focus area in cream, a pulsing accent pin. */
.question-media-map {
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;
  background: #072c1b;
}

.question-media-map-frame {
  position: relative;
  height: 100%;
  max-width: 100%;
}

.question-media-map svg {
  display: block;
  width: 100%;
  height: 100%;
}

.question-media-map-land {
  fill: #1d5a3a;
  stroke: #072c1b;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.question-media-map-focus {
  fill: var(--question-leaf);
  stroke: #6f9c7f;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.question-media-map-river {
  fill: none;
  stroke: #4f9fd6;
  stroke-width: 1.6;
  vector-effect: non-scaling-stroke;
}

.question-media-map-pin {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  border: 3px solid var(--question-ink);
  border-radius: 50%;
  background: var(--question-coral);
  transform: translate(-50%, -50%);
}

.question-media-map-pin::after {
  position: absolute;
  inset: -0.9rem;
  border: 2px solid var(--question-coral);
  border-radius: 50%;
  content: '';
  animation: question-media-pulse 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.question-media-map-reference {
  position: absolute;
  padding-left: 0.85rem;
  color: var(--question-ink);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1;
  transform: translate(-0.3rem, -50%);
  text-shadow: 0 0 3px var(--question-leaf), 0 0 3px var(--question-leaf);
}

.question-media-map-reference::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--question-ink);
  box-shadow: 0 0 0 2px var(--question-leaf);
  content: '';
  transform: translateY(-50%);
}

/* Pixel art builds up pixel by pixel. */
.question-media-pixel {
  display: grid;
  width: 100%;
  place-items: center;
  border-radius: 1rem;
  background: var(--question-forest);
  padding: 1rem;
}

.question-media-pixel svg {
  height: 100%;
  max-width: 100%;
}

.question-media-flag {
  display: grid;
  width: 100%;
  place-items: center;
}

.question-media-flag .flag-image {
  height: 100%;
  box-shadow: 0 18px 40px rgb(0 0 0 / 30%);
}

/* Phrase: a sign with big type; the translation appears after the answer. */
.question-media-phrase {
  display: grid;
  width: 100%;
  place-content: center;
  gap: 0.8rem;
  border-radius: 1rem;
  background: var(--question-cream);
  color: var(--question-ink);
  padding: 1rem 2rem;
  text-align: center;
}

.question-media-phrase p {
  margin: 0;
  font-size: clamp(2rem, min(5vw, 9vh), 4.6rem);
  font-weight: 800;
  line-height: 1.05;
  text-wrap: balance;
}

.question-media-phrase small {
  color: color-mix(in srgb, var(--question-ink) 65%, transparent);
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  font-weight: 600;
  animation: question-media-pop 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
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

@keyframes question-media-pulse {
  from { opacity: 0.9; transform: scale(0.4); }
  to { opacity: 0; transform: scale(1.6); }
}

@media (prefers-reduced-motion: reduce) {
  .question-media-emoji span,
  .question-media-trend svg,
  .question-media-quartet-card dd,
  .question-media-phrase small,
  .question-media-map-pin::after {
    animation: none;
  }

  .question-media-paper path {
    animation: none;
    stroke-dashoffset: 0;
  }

  .question-media-silhouette path {
    transition: none;
  }
}
</style>
