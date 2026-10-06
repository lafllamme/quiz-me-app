<script setup lang="ts">
import territoryMarkerUrl from '~/assets/images/territory-marker.png'

const props = defineProps<{
  categories: string[]
  activeName: string
  round: number
  rounds: number
  questionNumber: number
  questionCount: number
  previewOnly?: boolean
}>()

const emit = defineEmits<{ choose: [category: string] }>()

const categoryDescriptors: Record<string, string> = {
  '2000er': 'Nostalgie, Netzkultur, große Hits',
  Musik: 'Tracks, Stimmen und Ohrwürmer',
  Filme: 'Kino, Kult und Plot-Twists',
  Serien: 'Staffeln, Kultfiguren und Cliffhanger',
  Memes: 'Internet, Running Gags und Chaos',
  '2010er': 'Apps, Trends und digitale Meilensteine',
  'WTF-Wissen': 'Fakten, die hängen bleiben',
  Köln: 'Stadt, FC und deutsche Geschichte',
  'Film & Serie': 'Kino, Streaming und Kultfiguren',
  'Netz & Memes': 'Chat, Running Gags und Internetkultur',
  Wissen: 'Körper, Alltag und unnütze Fakten',
  Nostalgie: '2000er, 2010er und frühe Netzkultur',
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

      <div class="category-board-grid" role="group" aria-label="Kategorien auswählen">
        <button v-for="category in categories" :key="category" data-uisfx-hover="hover" data-uisfx-press="press" class="category-board-option" :class="{ 'category-board-option--preview': previewOnly }" :aria-disabled="previewOnly" @click="previewOnly ? undefined : emit('choose', category)">
          <span class="category-board-option-copy">
            <strong>{{ category }}</strong>
            <small>{{ categoryDescriptors[category] ?? 'Eine neue Richtung für diese Runde' }}</small>
          </span>
          <Icon name="lucide:arrow-up-right" size="19" aria-hidden="true" />
        </button>
      </div>

      <p class="category-board-foot">Bereit für den ersten Pick. <span>↗</span></p>
    </div>
  </section>
</template>
