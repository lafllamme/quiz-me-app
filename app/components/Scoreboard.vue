<script setup lang="ts">
defineProps<{
  names: [string, string]
  scores: [number, number]
  active: 0 | 1
  round: number
  rounds: number
  turn: number
  perRound: number
  tie?: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-4 py-5 md:py-7">
    <div class="min-w-0" :class="active === 0 ? 'text-cream' : 'text-muted'">
      <span v-if="active === 0" class="mb-2 block text-[10px] font-600 uppercase tracking-[0.18em] text-gold">Ist dran</span>
      <strong class="block truncate text-lg font-600 md:text-3xl">{{ names[0] }}</strong>
      <span class="mt-1 block font-display text-5xl leading-none text-gold md:text-7xl">{{ scores[0] }}</span>
    </div>
    <div class="pb-1 text-center text-[10px] uppercase leading-[1.8] tracking-[0.14em] text-muted md:text-xs">
      <template v-if="tie">Tiebreaker<br>Schätzfrage</template>
      <template v-else>Runde {{ round }} / {{ rounds }}<br>Frage {{ turn + 1 }} / {{ rounds * perRound }}</template>
    </div>
    <div class="min-w-0 text-right" :class="active === 1 ? 'text-cream' : 'text-muted'">
      <span v-if="active === 1" class="mb-2 block text-[10px] font-600 uppercase tracking-[0.18em] text-gold">Ist dran</span>
      <strong class="block truncate text-lg font-600 md:text-3xl">{{ names[1] }}</strong>
      <span class="mt-1 block font-display text-5xl leading-none text-gold md:text-7xl">{{ scores[1] }}</span>
    </div>
  </div>
</template>
