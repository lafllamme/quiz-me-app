<script setup lang="ts">
import type { VisualKind } from '~/data/quiz-catalog'
import { GEO_SHAPES } from '~/data/geo/shapes'

/**
 * Generic preview of a visual question format on a category tile. It hints at the
 * format only; the actual question stays hidden until the tile is picked.
 */
defineProps<{ kind: VisualKind }>()

// Three years of monthly search interest with a sharp spike every February.
const trendPoints = Array.from({ length: 36 }, (_, month) => {
  const inSeason = month % 12
  const value = inSeason === 1 ? 92 : inSeason === 0 || inSeason === 2 ? 34 : 8 + ((month * 7) % 9)
  return `${(month / 35) * 156 + 2},${56 - value * 0.5}`
}).join(' ')

const swatches = ['#1DB954', '#1ED760', '#17A34A', '#2EC866']

const boot = GEO_SHAPES.ITA
const germany = GEO_SHAPES.DEU

// A small pixel heart: '#' is filled.
const pixelHeart = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...']
  .flatMap((row, y) => [...row].map((char, x) => ({ x, y, on: char === '#' })).filter(cell => cell.on))
  .map((cell, index) => ({ ...cell, delay: `${200 + ((index * 37) % 23) * 40}ms` }))
</script>

<template>
  <span class="visual-teaser" :data-kind="kind" aria-hidden="true">
    <span v-if="kind === 'emoji'" class="visual-teaser-emoji">
      <span>👴</span><span>🎈</span><span>🏠</span>
    </span>

    <svg v-else-if="kind === 'trend'" class="visual-teaser-trend" viewBox="0 0 160 60">
      <line x1="2" y1="58" x2="158" y2="58" />
      <polyline :points="trendPoints" pathLength="1" />
    </svg>

    <span v-else-if="kind === 'swatch'" class="visual-teaser-swatch">
      <i v-for="color in swatches" :key="color" :style="{ background: color }" />
    </span>

    <svg v-else-if="kind === 'silhouette'" class="visual-teaser-silhouette" :viewBox="boot.viewBox">
      <path :d="boot.path" fill-rule="evenodd" />
    </svg>

    <span v-else-if="kind === 'quartet'" class="visual-teaser-quartet">
      <b>???</b><i /><i /><i />
    </span>

    <svg v-else-if="kind === 'pin'" class="visual-teaser-pin" :viewBox="germany.viewBox">
      <path :d="germany.path" fill-rule="evenodd" />
      <circle cx="16" cy="45" r="5" />
    </svg>

    <svg v-else-if="kind === 'pixel'" class="visual-teaser-pixel" viewBox="0 0 7 6" shape-rendering="crispEdges">
      <rect v-for="cell in pixelHeart" :key="`${cell.x}-${cell.y}`" :x="cell.x" :y="cell.y" width="1" height="1" :style="{ animationDelay: cell.delay }" />
    </svg>

    <span v-else-if="kind === 'flag'" class="visual-teaser-flag">
      <i style="background: #000" /><i style="background: #dd0000" /><i style="background: #2e9e4f" />
    </span>

    <span v-else-if="kind === 'phrase'" class="visual-teaser-phrase">Dziękuję</span>

    <svg v-else class="visual-teaser-doodle" viewBox="0 0 120 80">
      <path pathLength="1" d="M6 76 Q40 72 62 76 T116 75" />
      <path pathLength="1" d="M19 76 L21 31 L27 7 L33 30 L35 76" />
      <path pathLength="1" d="M71 76 L73 33 L80 5 L85 29 L88 76" />
      <path pathLength="1" d="M35 52 Q52 43 72 51" />
      <path pathLength="1" d="M47 76 L48 63 Q53 56 58 63 L59 76" />
      <path pathLength="1" d="M104 16 m-7 0 a7 6.5 0 1 0 14 0.6 a7 7 0 1 0 -14 -0.6" />
    </svg>
  </span>
</template>

<style scoped>
.visual-teaser {
  display: grid;
  height: clamp(3.4rem, 7vh, 4.4rem);
  place-items: center;
  overflow: hidden;
  border-radius: 0.65rem;
  background: var(--category-ink);
  color: var(--category-cream);
}

.visual-teaser[data-kind='swatch'] {
  background: transparent;
}

.visual-teaser-emoji {
  display: flex;
  gap: 0.6rem;
  font-size: clamp(1.5rem, 2.2vw, 2.2rem);
  line-height: 1;
}

.visual-teaser-emoji span {
  display: inline-block;
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-teaser-trend,
.visual-teaser-doodle {
  width: auto;
  height: clamp(2.5rem, 5vh, 3.3rem);
  overflow: visible;
}

.visual-teaser-trend {
  width: 90%;
}

/* Trend curve and doodle draw themselves in: the board's one authored motion. */
.visual-teaser-trend polyline,
.visual-teaser-doodle path {
  fill: none;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: visual-teaser-draw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
}

.visual-teaser-trend polyline {
  stroke: var(--category-accent);
  stroke-width: 2.4;
}

.visual-teaser-trend line {
  stroke: color-mix(in srgb, var(--category-cream) 30%, transparent);
  stroke-width: 1;
}

.visual-teaser-doodle path {
  stroke: var(--category-cream);
  stroke-width: 2.6;
}

.visual-teaser-doodle path:nth-child(2) { animation-delay: 320ms; }
.visual-teaser-doodle path:nth-child(3) { animation-delay: 440ms; }
.visual-teaser-doodle path:nth-child(n + 4) { animation-delay: 560ms; }

.visual-teaser-swatch {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 0.3rem;
}

.visual-teaser-swatch i {
  display: block;
  flex: 1;
  border-radius: 0.5rem;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-teaser-silhouette,
.visual-teaser-pin {
  height: clamp(2.6rem, 5.4vh, 3.5rem);
  overflow: visible;
}

.visual-teaser-silhouette path {
  fill: var(--category-cream);
  transform-box: fill-box;
  transform-origin: 70% 75%;
  transform: scale(1.5);
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-teaser-pin path {
  fill: color-mix(in srgb, var(--category-cream) 85%, transparent);
}

.visual-teaser-pin circle {
  fill: var(--category-accent);
  stroke: var(--category-ink);
  stroke-width: 2;
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.visual-teaser-quartet {
  display: grid;
  width: 46%;
  gap: 0.22rem;
  border-radius: 0.35rem;
  background: var(--category-cream);
  padding: 0.3rem 0.45rem 0.4rem;
  transform: rotate(-3deg);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-teaser-quartet b {
  color: var(--category-ink);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  line-height: 1;
}

.visual-teaser-quartet i {
  display: block;
  height: 0.22rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--category-ink) 30%, transparent);
}

.visual-teaser-quartet i:nth-of-type(2) { width: 70%; }
.visual-teaser-quartet i:nth-of-type(3) { width: 85%; }

.visual-teaser-pixel {
  height: clamp(2.4rem, 5vh, 3.1rem);
}

.visual-teaser-pixel rect {
  fill: var(--category-accent);
  opacity: 0;
  animation: visual-teaser-appear 1ms linear forwards;
}

.visual-teaser-flag {
  display: flex;
  width: 3.6rem;
  height: 2.7rem;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.3rem;
  transform: rotate(2deg);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.visual-teaser-flag i {
  display: block;
  flex: 1;
}

.visual-teaser-phrase {
  border-radius: 0.35rem;
  background: var(--category-cream);
  padding: 0.3rem 0.6rem;
  color: var(--category-ink);
  font-size: clamp(0.95rem, 1.5vw, 1.25rem);
  font-weight: 800;
  transform: rotate(-2deg);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes visual-teaser-appear {
  to { opacity: 1; }
}

@keyframes visual-teaser-draw {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .visual-teaser-trend polyline,
  .visual-teaser-doodle path {
    animation: none;
    stroke-dashoffset: 0;
  }

  .visual-teaser-emoji span,
  .visual-teaser-swatch i,
  .visual-teaser-silhouette path,
  .visual-teaser-quartet,
  .visual-teaser-flag,
  .visual-teaser-phrase {
    transition: none;
  }

  .visual-teaser-pixel rect {
    animation: none;
    opacity: 1;
  }
}
</style>

<style>
/* Hover reactions are driven by the parent tile, so they live outside the scoped block. */
.category-board-option:hover .visual-teaser-emoji span { transform: translateY(-4px); }
.category-board-option:hover .visual-teaser-emoji span:nth-child(2) { transition-delay: 60ms; }
.category-board-option:hover .visual-teaser-emoji span:nth-child(3) { transition-delay: 120ms; }
.category-board-option:hover .visual-teaser-swatch i { transform: scaleY(0.82); }
.category-board-option:hover .visual-teaser-swatch i:nth-child(2) { transition-delay: 40ms; }
.category-board-option:hover .visual-teaser-swatch i:nth-child(3) { transition-delay: 80ms; }
.category-board-option:hover .visual-teaser-swatch i:nth-child(4) { transition-delay: 120ms; }
.category-board-option:hover .visual-teaser-silhouette path { transform: scale(1); }
.category-board-option:hover .visual-teaser-pin circle { transform: translateY(-3px) scale(1.2); }
.category-board-option:hover .visual-teaser-quartet { transform: rotate(2deg); }
.category-board-option:hover .visual-teaser-flag { transform: rotate(-3deg); }
.category-board-option:hover .visual-teaser-phrase { transform: rotate(1deg) scale(1.05); }
</style>
