<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  void nextTick(() => closeButton.value?.focus())
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-20 grid place-items-center bg-ink/80 p-5 backdrop-blur-md" @click.self="emit('close')">
      <section class="max-h-[90vh] w-full max-w-2xl overflow-auto border border-line bg-jungle p-7 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-9" role="dialog" aria-modal="true" :aria-label="title">
        <div class="flex items-start justify-between gap-5">
          <h2 class="display text-4xl md:text-5xl">{{ title }}</h2>
          <button ref="closeButton" data-uisfx-hover="hover" data-uisfx="close" class="button-base border-0 p-2 text-muted hover:bg-white/6 hover:text-cream" aria-label="Dialog schließen" @click="emit('close')"><Icon name="lucide:x" size="20" aria-hidden="true" /></button>
        </div>
        <div class="mt-7 text-[15px] leading-relaxed text-muted">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>
