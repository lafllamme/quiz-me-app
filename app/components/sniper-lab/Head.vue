<script setup lang="ts">
import { labMatch, type LabTeam } from '~/lib/sniper-lab-fixtures'

/** The stage header every play study shares: brand, progress ticks, nav, and the score duel below. */
withDefaults(defineProps<{
  scores?: [number, number]
  active?: LabTeam | null
  plus?: LabTeam | null
  ticks?: boolean
  duel?: boolean
  tone?: 'cream' | 'ink'
  sound?: number
}>(), { scores: () => labMatch.scores, active: null, plus: null, ticks: true, duel: true, tone: 'cream', sound: labMatch.sound })
</script>

<template>
  <SniperLabChrome :tone="tone">
    <SniperLabTicks v-if="ticks" :total="labMatch.total" :current="sound" :label="`Sound ${sound} / ${labMatch.total} · Runde ${labMatch.round} / ${labMatch.rounds}`" />
  </SniperLabChrome>
  <div v-if="duel" class="sl-head-duel">
    <SniperLabDuel :names="labMatch.names" :scores="scores" :active="active" :plus="plus" :tone="tone" />
  </div>
</template>

<style scoped>
.sl-head-duel {
  position: absolute;
  z-index: 2;
  top: 13.5cqh;
  left: 50%;
  width: 54cqw;
  transform: translateX(-50%);
}
</style>
