<script setup lang="ts">
import type { LabTeam } from '~/lib/sniper-lab-fixtures'

withDefaults(defineProps<{
  names: [string, string]
  scores: [number, number]
  active?: LabTeam | null
  plus?: LabTeam | null
  size?: 'sm' | 'md' | 'lg'
  tone?: 'cream' | 'ink'
}>(), { active: null, plus: null, size: 'md', tone: 'cream' })
</script>

<template>
  <div class="sl-duel" :class="[`sl-duel--${size}`, `sl-duel--${tone}`]" aria-label="Punktestand">
    <div v-for="team in ([0, 1] as const)" :key="team" class="sl-duel-team" :class="[`sl-duel-team--${team}`, { 'is-active': active === team }]">
      <span>{{ names[team] }}</span>
      <strong :key="`${team}-${scores[team]}`" :class="{ 'is-pop': plus === team }">{{ scores[team] }}</strong>
    </div>
    <i aria-hidden="true">:</i>
  </div>
</template>

<style scoped>
.sl-duel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  color: var(--sl-muted);
}

.sl-duel > i {
  grid-column: 2;
  grid-row: 1;
  padding: 0 1.2cqw;
  color: var(--sl-line);
  font-family: var(--font-display);
  font-size: 1.6em;
  font-style: normal;
  line-height: 1;
}

.sl-duel-team {
  display: flex;
  min-width: 0;
  grid-row: 1;
  align-items: center;
  gap: 1cqw;
}

.sl-duel-team--0 {
  grid-column: 1;
  justify-content: flex-end;
}

.sl-duel-team--1 {
  grid-column: 3;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.sl-duel-team span {
  overflow: hidden;
  font-size: 0.42em;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.sl-duel-team strong {
  color: var(--sl-cream);
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 0.85;
}

.sl-duel-team strong.is-pop {
  color: var(--sl-accent);
  animation: sl-pop 700ms var(--sl-ease);
}

.sl-duel-team.is-active span,
.sl-duel-team.is-active strong {
  color: var(--sl-accent);
}

.sl-duel--sm { font-size: max(18px, 2.3cqw); }
.sl-duel--md { font-size: max(22px, 3.1cqw); }
.sl-duel--lg { font-size: max(28px, 4.6cqw); }

.sl-duel--ink,
.sl-duel--ink .sl-duel-team strong {
  color: var(--sl-ink);
}

.sl-duel--ink > i {
  color: rgb(8 24 17 / 35%);
}
</style>
