<script setup lang="ts">
defineProps<{
  categories: string[]
  activeName: string
}>()

const emit = defineEmits<{ choose: [category: string] }>()
</script>

<template>
  <section class="pt-9">
    <p class="eyebrow">{{ activeName }} wählt</p>
    <h2 class="display mt-6 text-[clamp(2.8rem,5vw,4.75rem)]">Pick your territory.</h2>
    <div class="mt-9 grid gap-3 sm:grid-cols-2">
      <button v-for="(category, index) in categories" :key="category" class="category-card group min-h-36 bg-jungle p-6 text-left transition duration-200 hover:-translate-y-1 hover:bg-[#173724] focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3 md:min-h-40" @click="emit('choose', category)">
        <span class="mb-6 block text-xs uppercase tracking-[0.18em] text-gold">0{{ index + 1 }} / Kategorie</span>
        <strong class="font-display text-3xl uppercase tracking-[-0.02em] md:text-5xl">{{ category }}</strong>
        <Icon name="lucide:arrow-up-right" size="20" class="float-right text-muted transition duration-200 group-hover:text-gold" aria-hidden="true" />
      </button>
    </div>
    <p class="mt-8 border-t border-line pt-5 text-sm text-muted">Eine offene Frage · +1 Punkt · keine Joker</p>
  </section>
</template>
