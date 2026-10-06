<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryTile } from '~/composables/useQuestionDeck'
import type { TurnRecord } from '~/composables/useQuizGame'
import { QUIZ_CATEGORIES, type VisualKind } from '~/data/quiz-catalog'

const props = defineProps<{
  tiles: CategoryTile[]
  activeName: string
  names: [string, string]
  scores: [number, number]
  history: TurnRecord[]
  first: 0 | 1
  round: number
  rounds: number
  perRound: number
  questionNumber: number
  questionCount: number
  previewOnly?: boolean
}>()

const emit = defineEmits<{ choose: [tile: CategoryTile] }>()

const categoryDescriptors = Object.fromEntries(QUIZ_CATEGORIES.map(category => [category.label, category.descriptor]))

// Match status for the side panel: score, steals, progress, last moves.
const activeTeam = computed(() => ((props.first + props.questionNumber - 1) % 2) as 0 | 1)
const steals = computed(() => ([0, 1] as const).map(team => props.history.filter(turn => turn.winner === team && turn.outcome === 'stolen').length))

const lead = computed(() => {
  const [a, b] = props.scores
  if (a === b)
    return a === 0 ? 'Noch alles offen.' : 'Gleichstand.'
  const gap = Math.abs(a - b)
  return `${props.names[a > b ? 0 : 1]} führt mit ${gap} ${gap === 1 ? 'Punkt' : 'Punkten'}.`
})

const progress = computed(() => Array.from({ length: props.rounds }, (_, round) =>
  Array.from({ length: props.perRound }, (_, slot) => {
    const index = round * props.perRound + slot
    const turn = props.history[index]
    const state = index < props.questionNumber - 1 ? 'done' : index === props.questionNumber - 1 ? 'now' : 'next'
    return { index, state, winner: turn?.winner ?? null }
  })))

const recent = computed(() => props.history.slice(-2).reverse())

function describe(turn: TurnRecord) {
  if (turn.outcome === 'stolen')
    return `${props.names[turn.winner as 0 | 1]} klaut ${turn.category}`
  if (turn.outcome === 'right')
    return `${props.names[turn.team]} holt ${turn.category}`
  return `${turn.category}: kein Punkt`
}

const upcoming = computed(() => Array.from({ length: Math.min(2, props.questionCount - props.questionNumber) }, (_, i) =>
  props.names[((props.first + props.questionNumber + i) % 2) as 0 | 1]))

const VISUAL_LABELS: Record<VisualKind, string> = {
  emoji: 'Emoji-Rätsel',
  doodle: 'Schlecht gemalt',
  trend: 'Trend-Kurve',
  swatch: 'Farbe raten',
}

</script>

<template>
  <section class="category-board" :class="{ 'category-board--preview': previewOnly }">
    <aside class="category-board-marker" aria-label="Spielstand">
      <div class="category-board-marker-top"><span>Runde {{ round }} / {{ rounds }}</span><span>Frage {{ questionNumber }} / {{ questionCount }}</span></div>
      <div class="category-board-marker-copy">
        <span>Am Zug</span>
        <strong>{{ activeName }}</strong>
      </div>

      <ol class="category-board-score" aria-label="Punktestand">
        <li v-for="(name, team) in names" :key="team" :class="{ 'category-board-score--active': team === activeTeam }">
          <i class="category-board-team-mark" :class="`category-board-team-mark--${team}`" aria-hidden="true" />
          <span>{{ name }}<small v-if="steals[team]">{{ steals[team] }}× geklaut</small></span>
          <b>{{ scores[team] }}</b>
        </li>
      </ol>
      <p class="category-board-lead">{{ lead }}</p>

      <div class="category-board-progress" role="img" :aria-label="`Frage ${questionNumber} von ${questionCount}`">
        <div v-for="(slots, round) in progress" :key="round" class="category-board-progress-round">
          <div class="category-board-progress-ticks">
            <i v-for="slot in slots" :key="slot.index" :class="[`category-board-tick--${slot.state}`, slot.winner !== null ? `category-board-tick--won-${slot.winner}` : '']" />
          </div>
          <small>R{{ round + 1 }}</small>
        </div>
      </div>

      <ol v-if="recent.length" class="category-board-recent" aria-label="Letzte Züge">
        <li v-for="(turn, i) in recent" :key="history.length - i" :class="`category-board-recent--${turn.outcome}`">
          <Icon :name="turn.outcome === 'stolen' ? 'lucide:arrow-left-right' : turn.outcome === 'right' ? 'lucide:check' : 'lucide:minus'" size="15" aria-hidden="true" />
          <span>{{ describe(turn) }}</span>
          <small>{{ i === 0 ? 'zuletzt' : 'davor' }}</small>
        </li>
      </ol>
      <p v-else class="category-board-recent-empty">Noch kein Zug gespielt. Der erste Pick eröffnet das Spiel.</p>

      <div class="category-board-marker-foot"><span>{{ upcoming.length ? `Danach: ${upcoming.join(' · ')}` : 'Letzte Frage' }}</span></div>
    </aside>

    <div class="category-board-play">
      <div class="category-board-play-top"><span>Dein Territorium</span><span>{{ previewOnly ? '6er-Layout · Vorschau' : 'Wähle jetzt' }}</span></div>
      <div class="category-board-intro">
        <h2>Picke eine <em>Kategorie.</em></h2>
        <p>Eine Frage. Ein Fokus. Ihr entscheidet.</p>
      </div>

      <div class="category-board-grid category-board-grid--even" role="group" aria-label="Kategorien auswählen">
        <button
          v-for="tile in tiles"
          :key="`${tile.category}-${tile.visual ?? 'text'}`"
          data-uisfx-hover="hover"
          data-uisfx-press="press"
          class="category-board-option"
          :class="{ 'category-board-option--preview': previewOnly, 'category-board-option--visual': tile.visual }"
          :aria-disabled="previewOnly"
          :aria-label="tile.visual ? `${tile.category}, Bildfrage: ${VISUAL_LABELS[tile.visual]}` : undefined"
          @click="previewOnly ? undefined : emit('choose', tile)"
        >
          <span class="category-board-option-copy">
            <strong>{{ tile.category }}</strong>
            <small v-if="!tile.visual">{{ categoryDescriptors[tile.category] ?? 'Eine neue Richtung für diese Runde' }}</small>
          </span>
          <span v-if="tile.visual" class="category-board-visual">
            <span class="category-board-visual-tag">
              <Icon name="lucide:eye" size="13" aria-hidden="true" />
              {{ VISUAL_LABELS[tile.visual] }}
            </span>
            <CategoryVisualTeaser :kind="tile.visual" />
          </span>
          <Icon v-else name="lucide:arrow-up-right" size="19" aria-hidden="true" />
        </button>
      </div>

      <p class="category-board-foot">{{ questionNumber === 1 ? 'Bereit für den ersten Pick.' : `${activeName} wählt.` }} <span>↗</span></p>
    </div>
  </section>
</template>

<style scoped>
.category-board-grid--even {
  grid-auto-rows: 1fr;
}

/* Visual tiles flip to cream so a picture question is visible from across the room. */
.category-board-option--visual {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  align-items: start;
  gap: 1.1rem;
  border-color: transparent;
  background: var(--category-cream);
  color: var(--category-ink);
}

.category-board-option--visual:hover,
.category-board-option--visual:focus-visible {
  background: var(--category-accent);
}

.category-board-visual {
  position: relative;
  display: block;
  align-self: end;
}

/* Format tag: a small tilted game token on the image strip, the board's irregular gesture. */
.category-board-visual-tag {
  position: absolute;
  top: -0.75rem;
  right: 0.75rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  background: var(--category-accent);
  color: var(--category-ink);
  padding: 0.38rem 0.65rem;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: rotate(3deg);
}

.category-board-option--visual:hover .category-board-visual-tag,
.category-board-option--visual:focus-visible .category-board-visual-tag {
  background: var(--category-ink);
  color: var(--category-accent);
}

@media (max-width: 809px) {
  .category-board-visual-tag {
    position: static;
    margin-bottom: 0.45rem;
    padding: 0.32rem 0.5rem;
    font-size: 0.52rem;
    letter-spacing: 0.06em;
    transform: none;
  }

  .category-board-visual-tag .iconify { display: none; }
}
</style>
