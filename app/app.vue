<script setup lang="ts">
const uiSfx = useUiSfx()

onMounted(() => uiSfx.mount())
onBeforeUnmount(() => uiSfx.destroy())
</script>

<template>
  <NuxtPage />
</template>
