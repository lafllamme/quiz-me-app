<script setup lang="ts">
withDefaults(defineProps<{ total: number, current: number, label?: string }>(), { label: '' })
</script>

<template>
  <div class="sl-ticks" :aria-label="`Sound ${current} von ${total}`">
    <div aria-hidden="true">
      <i v-for="tick in total" :key="tick" :class="{ 'is-done': tick < current, 'is-current': tick === current }" />
    </div>
    <span v-if="label" class="sl-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.sl-ticks {
  display: grid;
  justify-items: center;
  gap: 1.2cqh;
}

.sl-ticks > div {
  display: flex;
  gap: 0.35cqw;
}

.sl-ticks i {
  width: 2.6cqw;
  height: max(3px, 0.55cqh);
  border-radius: 2px;
  background: var(--sl-line);
}

.sl-ticks i.is-done {
  background: color-mix(in srgb, var(--sl-cream) 62%, transparent);
}

.sl-ticks i.is-current {
  background: var(--sl-accent);
}

.sl-ticks .sl-label {
  color: var(--sl-accent);
}
</style>
