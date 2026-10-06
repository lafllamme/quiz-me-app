<script setup lang="ts">
defineProps<{
  tone?: 'dark' | 'light'
  split?: boolean
  canBack?: boolean
  canForward?: boolean
}>()

const emit = defineEmits<{
  home: []
  back: []
  forward: []
}>()
</script>

<template>
  <header class="app-header" :class="{ 'app-header--light': tone === 'light', 'app-header--split': split }">
    <div class="app-header-inner">
      <JungleLogo :tone="tone === 'light' ? 'ink' : 'cream'" interactive @activate="emit('home')" />
      <nav class="app-header-nav" aria-label="Spielnavigation">
        <button type="button" :disabled="!canBack" aria-label="Zurück" title="Zurück" @click="emit('back')">
          <Icon name="lucide:arrow-left" size="18" aria-hidden="true" />
        </button>
        <button type="button" :disabled="!canForward" aria-label="Weiter" title="Weiter" @click="emit('forward')">
          <Icon name="lucide:arrow-right" size="18" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </header>
</template>
