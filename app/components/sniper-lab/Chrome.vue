<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'cream' | 'ink', nav?: boolean }>(), { tone: 'cream', nav: true })
</script>

<template>
  <div class="sl-chrome" :class="`sl-chrome--${tone}`">
    <span class="sl-chrome-brand">Jungle<i>/</i>Quiz</span>
    <slot />
    <span v-if="nav" class="sl-chrome-nav" aria-hidden="true">
      <span><Icon name="lucide:arrow-left" /></span>
      <span><Icon name="lucide:arrow-right" /></span>
    </span>
  </div>
</template>

<style scoped>
.sl-chrome {
  position: absolute;
  z-index: 3;
  top: var(--sl-pad-top);
  right: var(--sl-pad-x);
  left: var(--sl-pad-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
  pointer-events: none;
}

.sl-chrome-brand {
  font-family: var(--font-display);
  font-size: 1.75cqw;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;
}

.sl-chrome-brand i {
  margin: 0 0.25em;
  color: var(--sl-accent);
  font-style: normal;
}

.sl-chrome--ink .sl-chrome-brand i {
  color: var(--sl-ink);
  opacity: 0.55;
}

.sl-chrome--ink {
  color: var(--sl-ink);
}

.sl-chrome-nav {
  display: flex;
  gap: 0.5cqw;
}

.sl-chrome-nav span {
  display: grid;
  width: 5.6cqh;
  height: 5.6cqh;
  place-items: center;
  border: 1px solid var(--sl-line);
  border-radius: 999px;
  color: var(--sl-muted);
  font-size: 2.1cqh;
}

.sl-chrome--ink .sl-chrome-nav span {
  border-color: rgb(8 24 17 / 25%);
  color: var(--sl-ink);
}
</style>
