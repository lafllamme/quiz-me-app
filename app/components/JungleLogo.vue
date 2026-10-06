<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'ink' | 'cream'
  interactive?: boolean
}>(), {
  tone: 'cream',
  interactive: false,
})

const emit = defineEmits<{ activate: [] }>()
</script>

<template>
  <button
    v-if="interactive"
    type="button"
    class="brand-logo brand-logo--button"
    :class="`brand-logo--${tone}`"
    aria-label="Zum Menü"
    @click="emit('activate')"
  >
    <span>Jungle</span><i aria-hidden="true">/</i><span>Quiz</span>
  </button>
  <span v-else class="brand-logo" :class="`brand-logo--${tone}`" role="img" aria-label="Jungle Quiz">
    <span>Jungle</span><i aria-hidden="true">/</i><span>Quiz</span>
  </span>
</template>
