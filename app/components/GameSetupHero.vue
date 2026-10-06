<script setup lang="ts">
import type { DifficultyMode } from '~/types/setup'

const props = defineProps<{
  rounds: number
  seconds: number
  difficulty: DifficultyMode
}>()

const difficultyLabel = computed(() => ({ easy: 'Leicht', mixed: 'Gemischt', hard: 'Schwer' })[props.difficulty])
</script>

<template>
  <div class="game-setup-copy">
    <div class="game-setup-wordmark">JUNGLE<span>/</span>QUIZ</div>
    <div class="game-setup-copy-main">
      <h1>Wer<br><em>spielt?</em></h1>
      <p>Gib den Teams einen Namen. Den Rest regeln wir.</p>
    </div>
    <div class="game-setup-copy-bottom">
      <div class="game-setup-meta">
        <span>{{ rounds }} Runden</span>
        <span>{{ seconds }} Sek.</span>
        <span>{{ difficultyLabel }}</span>
      </div>
    </div>
  </div>
</template>
