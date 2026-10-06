<script setup lang="ts">
const emit = defineEmits<{
  home: []
}>()
</script>

<template>
  <header class="app-header">
    <div class="app-header-inner">
      <button class="group inline-flex items-center gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-4" aria-label="Zum Menü" @click="emit('home')">
        <span class="font-display text-[20px] font-600 uppercase tracking-[-0.02em] md:text-2xl">Jungle</span>
        <span class="font-display text-xl text-gold md:text-2xl">/</span>
        <span class="font-display text-[20px] font-600 uppercase tracking-[-0.02em] md:text-2xl">Quiz</span>
      </button>
    </div>
  </header>
</template>
