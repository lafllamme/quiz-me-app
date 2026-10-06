<script setup lang="ts">
defineProps<{
  winnerName: string
  scores: [number, number]
}>()

const emit = defineEmits<{ rematch: []; menu: [] }>()
</script>

<template>
  <section class="mx-auto flex min-h-[calc(100vh-210px)] max-w-5xl flex-col items-center justify-center py-14 text-center">
    <p class="eyebrow">Winners of the jungle</p>
    <h1 class="display mt-6 text-[clamp(4.5rem,11vw,10rem)]">{{ winnerName }}<br><span class="text-gold">wins.</span></h1>
    <div class="mt-8 font-display text-6xl text-cream md:text-8xl">{{ scores[0] }} : {{ scores[1] }}</div>
    <div class="mt-10 flex flex-wrap justify-center gap-3">
      <button class="button-primary" @click="emit('rematch')"><Icon name="lucide:rotate-ccw" size="17" aria-hidden="true" /> Rematch</button>
      <button class="button-quiet" @click="emit('menu')">Hauptmenü</button>
    </div>
  </section>
</template>
