<script setup lang="ts">
/**
 * The loved Sound Sniper waveform: a fixed bar profile that dances while the sound plays.
 * `sweep` adds a playhead that lights the bars already heard.
 */
const props = withDefaults(defineProps<{
  bars?: number
  playing?: boolean
  sweep?: boolean
  frozenAt?: number | null
  tone?: 'accent' | 'ink' | 'cream'
}>(), { bars: 36, playing: true, sweep: false, frozenAt: null, tone: 'accent' })

const profile = computed(() => Array.from({ length: props.bars }, (_, index) => {
  const centre = 1 - Math.abs(index - (props.bars - 1) / 2) / (props.bars / 2)
  return { height: 0.25 + centre * 0.6 + ((index * 37) % 11) / 40, delay: ((index * 53) % 17) * 45 }
}))
</script>

<template>
  <div class="sl-wave" :class="[`sl-wave--${tone}`, { 'is-playing': playing && frozenAt === null, 'is-sweep': sweep, 'is-frozen': frozenAt !== null }]" aria-hidden="true">
    <div class="sl-wave-row">
      <i
        v-for="(bar, index) in profile"
        :key="index"
        :class="{ 'is-past': frozenAt !== null && index / bars <= frozenAt }"
        :style="{ '--bar': bar.height, animationDelay: `${bar.delay}ms` }"
      />
    </div>
    <div v-if="sweep" class="sl-wave-row sl-wave-lit">
      <i v-for="(bar, index) in profile" :key="index" :style="{ '--bar': bar.height, animationDelay: `${bar.delay}ms` }" />
    </div>
    <b v-if="sweep" class="sl-wave-head" />
  </div>
</template>

<style scoped>
.sl-wave {
  position: relative;
  width: 100%;
  height: 100%;
  --wave-color: var(--sl-accent);
}

.sl-wave--ink { --wave-color: var(--sl-ink); }
.sl-wave--cream { --wave-color: var(--sl-cream); }

.sl-wave-row {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 0.42cqw;
}

.sl-wave i {
  height: 100%;
  flex: 1;
  border-radius: 99px;
  background: var(--wave-color);
  opacity: 0.3;
  transform: scaleY(calc(var(--bar) * 0.14));
}

.sl-wave.is-playing i {
  opacity: 1;
  animation: sl-bar 620ms ease-in-out infinite alternate;
}

/* Sweep: the base row stays dim, a lit copy is revealed behind the playhead. */
.sl-wave.is-sweep .sl-wave-row:first-child i {
  opacity: 0.22;
}

.sl-wave-lit {
  clip-path: inset(0 100% 0 0);
  animation: sl-sweep 5.2s linear infinite;
}

.sl-wave-lit i {
  opacity: 1 !important;
}

.sl-wave-head {
  position: absolute;
  top: -6%;
  bottom: -6%;
  left: 0;
  width: 2px;
  background: var(--sl-cream);
  animation: sl-head 5.2s linear infinite;
}

.sl-wave.is-frozen i {
  opacity: 0.18;
  transform: scaleY(calc(var(--bar) * 0.7));
}

.sl-wave.is-frozen i.is-past {
  opacity: 0.55;
}

@keyframes sl-bar {
  from { transform: scaleY(calc(var(--bar) * 0.25)); }
  to { transform: scaleY(var(--bar)); }
}

@keyframes sl-sweep {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}

@keyframes sl-head {
  from { left: 0; }
  to { left: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .sl-wave.is-playing i { transform: scaleY(var(--bar)); }
  .sl-wave-lit { clip-path: inset(0 45% 0 0); }
  .sl-wave-head { left: 55%; }
}
</style>
