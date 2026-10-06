<script setup lang="ts">
defineProps<{
  soundEnabled: boolean
}>()

const emit = defineEmits<{
  toggleSound: []
  help: []
  home: []
}>()
</script>

<template>
  <header class="border-b border-line px-5 md:px-[4vw]">
    <div class="mx-auto flex h-[75px] max-w-[1500px] items-center justify-between gap-4 md:h-[88px]">
      <button class="group inline-flex items-center gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-4" aria-label="Zum Menü" @click="emit('home')">
        <span class="font-display text-[20px] font-600 uppercase tracking-[-0.02em] md:text-2xl">Jungle</span>
        <span class="font-display text-xl text-gold md:text-2xl">/</span>
        <span class="font-display text-[20px] font-600 uppercase tracking-[-0.02em] md:text-2xl">Quiz</span>
      </button>

      <nav class="flex items-center gap-1.5 md:gap-2" aria-label="Spielsteuerung">
        <NuxtLink to="/type-lab" data-uisfx-hover="hover" data-uisfx="forward" class="hidden items-center gap-2 px-3 py-2 text-xs font-600 uppercase tracking-[0.12em] text-muted transition hover:text-cream md:inline-flex">
          <Icon name="lucide:type" size="16" aria-hidden="true" />
          Type Lab
        </NuxtLink>
        <button data-uisfx-hover="hover" class="button-base border-0 px-2.5 py-2.5 text-muted hover:bg-white/6 hover:text-cream md:px-3.5" :aria-label="soundEnabled ? 'Sound ausschalten' : 'Sound einschalten'" @click="emit('toggleSound')">
          <Icon :name="soundEnabled ? 'lucide:volume-2' : 'lucide:volume-x'" size="17" aria-hidden="true" />
          <span class="hidden text-xs font-600 md:inline">{{ soundEnabled ? 'Sound an' : 'Sound aus' }}</span>
        </button>
        <button data-uisfx-hover="hover" data-uisfx="open" class="button-base border-0 px-2.5 py-2.5 text-muted hover:bg-white/6 hover:text-cream md:px-3.5" aria-label="Spielregeln" @click="emit('help')">
          <Icon name="lucide:circle-help" size="18" aria-hidden="true" />
        </button>
        <button data-uisfx-hover="hover" data-uisfx="open" class="button-base border-0 px-2.5 py-2.5 text-muted hover:bg-white/6 hover:text-cream md:px-3.5" aria-label="Zum Menü" @click="emit('home')">
          <Icon name="lucide:menu" size="18" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </header>
</template>
