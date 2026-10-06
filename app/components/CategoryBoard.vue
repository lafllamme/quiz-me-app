<script setup lang="ts">
import territoryMarkerUrl from '~/assets/images/territory-marker.png'
import type { CategoryTile } from '~/composables/useQuestionDeck'
import { QUIZ_CATEGORIES, type VisualKind } from '~/data/quiz-catalog'

const props = defineProps<{
  tiles: CategoryTile[]
  activeName: string
  round: number
  rounds: number
  questionNumber: number
  questionCount: number
  previewOnly?: boolean
}>()

const emit = defineEmits<{ choose: [tile: CategoryTile] }>()

const categoryDescriptors = Object.fromEntries(QUIZ_CATEGORIES.map(category => [category.label, category.descriptor]))

const VISUAL_LABELS: Record<VisualKind, string> = {
  emoji: 'Emoji-Rätsel',
  doodle: 'Schlecht gemalt',
  trend: 'Trend-Kurve',
  swatch: 'Farbe raten',
}

</script>

<template>
  <section class="category-board" :class="{ 'category-board--preview': previewOnly }">
    <aside class="category-board-marker" aria-label="Aktueller Spielzug">
      <div class="category-board-marker-top"><span>Runde {{ round }} / {{ rounds }}</span><span>Jungle Quiz</span></div>
      <div class="category-board-marker-copy">
        <span>Ist dran</span>
        <strong>{{ activeName }}</strong>
      </div>
      <img class="category-board-marker-art" :src="territoryMarkerUrl" alt="" aria-hidden="true">
      <div class="category-board-marker-foot"><span>Frage {{ questionNumber }}</span><span>{{ questionCount }} Fragen</span></div>
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

      <p class="category-board-foot">Bereit für den ersten Pick. <span>↗</span></p>
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
