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
  <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line pb-7 md:gap-6">
    <div class="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-5" :class="active === 0 ? 'text-cream' : 'text-muted'">
      <strong class="truncate text-base font-600 md:text-2xl">{{ names[0] }}</strong>
      <span class="font-display text-4xl text-gold md:text-6xl">{{ scores[0] }}</span>
    </div>
    <div class="text-center text-[10px] uppercase leading-[1.8] tracking-[0.12em] text-muted md:text-xs">
      <template v-if="tie">Tiebreaker<br>Schätzfrage</template>
      <template v-else>Runde {{ round }} / {{ rounds }}<br>Frage {{ turn + 1 }} / {{ rounds * perRound }}</template>
    </div>
    <div class="flex min-w-0 flex-col-reverse items-end gap-1 md:flex-row md:items-center md:justify-end md:gap-5" :class="active === 1 ? 'text-cream' : 'text-muted'">
      <span class="font-display text-4xl text-gold md:text-6xl">{{ scores[1] }}</span>
      <strong class="truncate text-right text-base font-600 md:text-2xl">{{ names[1] }}</strong>
    </div>
  </div>
</template>
