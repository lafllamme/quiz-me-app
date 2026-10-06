<script setup lang="ts">
import type { GameScreen } from '~/composables/useQuizGame'

defineProps<{
  screen: Exclude<GameScreen, 'menu'>
}>()
</script>

<template>
  <div class="game-screen-shell" :data-screen="screen">
    <div class="game-screen-shell__content">
      <slot />
    </div>
  </div>
</template>
