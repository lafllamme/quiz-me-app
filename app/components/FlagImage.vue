<script setup lang="ts">
import { paintFlag, parseFlagSpec } from '~/utils/flag-spec'

/** Renders a flag from a FlagSpec string; each flag file is loaded on demand. */
const props = defineProps<{ spec: string }>()

const sources = import.meta.glob<string>('../../node_modules/flag-icons/flags/4x3/*.svg', { query: '?raw', import: 'default' })

const flag = computed(() => parseFlagSpec(props.spec))
const markup = ref('')
const idPrefix = `flag-${useId()}`

watchEffect(async () => {
  const load = sources[`../../node_modules/flag-icons/flags/4x3/${flag.value.code}.svg`]
  const spec = flag.value
  markup.value = load ? paintFlag(await load(), spec, idPrefix) : ''
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -- trusted SVG from the bundled flag-icons package -->
  <span class="flag-image" :class="{ 'flag-image--mirror': flag.mirror }" aria-hidden="true" v-html="markup" />
</template>

<style scoped>
.flag-image {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.4rem;
  background: rgb(251 248 237 / 8%);
  box-shadow: 0 0 0 1px rgb(251 248 237 / 18%);
}

.flag-image--mirror {
  transform: scaleX(-1);
}

.flag-image :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
