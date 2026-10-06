<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'

const props = defineProps<{
  names: QuizConfig['names']
  question: string
  answer: number
}>()

const emit = defineEmits<{ submit: [guesses: [number, number]] }>()
const guesses = reactive<[string, string]>(['', ''])
const feedback = ref('')

function submit() {
  const values = guesses.map(value => Number(value)) as [number, number]
  if (values.some(value => !Number.isFinite(value))) {
    feedback.value = 'Bitte zwei gültige Zahlen eingeben.'
    return
  }
  emit('submit', values)
}
</script>

<template>
  <section class="mx-auto max-w-3xl py-14 text-center">
    <p class="eyebrow">Gleichstand · näher dran gewinnt</p>
    <h2 class="display mt-6 text-[clamp(2.8rem,5vw,4.75rem)]">{{ question }}</h2>
    <p class="mx-auto mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">Beide Teams geben verdeckt eine Schätzung ab.</p>
    <div class="mx-auto mt-9 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
      <label v-for="(name, index) in names" :key="name" class="text-sm text-muted">
        {{ name }}
        <input v-model="guesses[index]" type="number" inputmode="numeric" placeholder="Schätzung" class="field mt-2">
      </label>
    </div>
    <button class="button-primary mt-7" @click="submit">Schätzungen auswerten <Icon name="lucide:arrow-right" size="17" aria-hidden="true" /></button>
    <p v-if="feedback" class="mt-5 text-sm text-coral">{{ feedback }}</p>
  </section>
</template>
