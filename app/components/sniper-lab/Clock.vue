<script setup lang="ts">
/** The big listening clock. `state` decides colour: live, warning (last five), stopped. */
const props = withDefaults(defineProps<{
  seconds: number
  total: number
  label?: string
  state?: 'live' | 'stopped'
  bar?: boolean
}>(), { label: 'Hörzeit', state: 'live', bar: true })

const warning = computed(() => props.state === 'live' && props.seconds <= 5)
const progress = computed(() => Math.max(0, Math.min(1, props.seconds / props.total)))
</script>

<template>
  <div class="sl-clock" :class="{ 'is-warning': warning, 'is-stopped': state === 'stopped' }" role="timer" :aria-label="`${label}: ${seconds} Sekunden`">
    <span class="sl-label">{{ label }}</span>
    <strong :key="warning ? seconds : 0">{{ seconds }}<small>Sek.</small></strong>
    <i v-if="bar" aria-hidden="true"><b :style="{ transform: `scaleX(${progress})` }" /></i>
    <slot />
  </div>
</template>

<style scoped>
.sl-clock {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.sl-clock > strong {
  display: flex;
  align-items: baseline;
  gap: 0.8cqw;
  margin-top: 1.4cqh;
  color: var(--sl-accent);
  font-family: var(--font-display);
  font-size: var(--clock-size, min(15cqw, 29cqh));
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.75;
  transition: color 200ms ease;
}

.sl-clock > strong small {
  color: var(--sl-muted);
  font-family: var(--font-ui);
  font-size: max(10px, 0.9cqw);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sl-clock > i {
  display: block;
  height: max(5px, 1cqh);
  margin-top: 2.4cqh;
  overflow: hidden;
  border-radius: 99px;
  background: rgb(251 248 237 / 12%);
}

.sl-clock > i b {
  display: block;
  height: 100%;
  background: var(--sl-accent);
  transform-origin: left center;
  transition: transform 900ms linear, background 200ms ease;
}

.sl-clock.is-warning > strong,
.sl-clock.is-warning > .sl-label {
  color: var(--sl-coral);
}

.sl-clock.is-warning > strong {
  animation: sl-alarm 1s ease-in-out;
}

.sl-clock.is-warning > i b {
  background: var(--sl-coral);
}

.sl-clock.is-stopped > strong {
  color: color-mix(in srgb, var(--sl-cream) 30%, transparent);
}

.sl-clock.is-stopped > i b {
  background: color-mix(in srgb, var(--sl-cream) 30%, transparent);
}

@keyframes sl-alarm {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.06); }
}
</style>
