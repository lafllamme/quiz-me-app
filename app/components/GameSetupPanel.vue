<script setup lang="ts">
import { computed } from 'vue'

import type { DifficultyMode, SetupDraft } from '~/types/setup'

const props = defineProps<{
  draft: SetupDraft
  hasSavedGame: boolean
  questionCount: number
  catalogExhausted: boolean
  remainingQuestionCount: number
  totalQuestionCount: number
  primaryActionLabel: string
}>()

const emit = defineEmits<{
  'update:names': [names: [string, string]]
  'update:players': [players: [string, string]]
  'update:rounds': [rounds: number]
  'update:seconds': [seconds: number]
  'update:difficulty': [difficulty: DifficultyMode]
  start: []
  newGame: []
  rules: []
  'reset-history': []
}>()

function updateName(index: 0 | 1, event: Event) {
  const names = [...props.draft.names] as [string, string]
  names[index] = (event.target as HTMLInputElement).value
  emit('update:names', names)
}

const difficultyOptions: { value: DifficultyMode; label: string }[] = [
  { value: 'easy', label: 'Leicht' },
  { value: 'mixed', label: 'Gemischt' },
  { value: 'hard', label: 'Schwer' },
]

const roundOptions = [3, 5, 7]
const secondOptions = [30, 45, 60]

const difficultyIndex = computed(() => Math.max(0, difficultyOptions.findIndex(option => option.value === props.draft.difficulty)))
const difficultyLabel = computed(() => difficultyOptions[difficultyIndex.value]!.label)

function nextOf<T>(options: readonly T[], current: T): T {
  return options[(options.indexOf(current) + 1) % options.length]!
}

function cycleRounds() {
  emit('update:rounds', nextOf(roundOptions, props.draft.rounds))
}

function cycleSeconds() {
  emit('update:seconds', nextOf(secondOptions, props.draft.seconds))
}

function cycleDifficulty() {
  emit('update:difficulty', difficultyOptions[(difficultyIndex.value + 1) % difficultyOptions.length]!.value)
}
</script>

<template>
  <form class="game-setup-form" @submit.prevent="emit('start')">
    <label class="game-setup-team" for="team-one"><span>Team eins</span>
      <input id="team-one" :value="draft.names[0]" maxlength="28" autocomplete="off" spellcheck="false" @input="updateName(0, $event)">
    </label>
    <div class="game-setup-versus" aria-hidden="true"><i /><b>vs</b><i /></div>
    <label class="game-setup-team" for="team-two"><span>Team zwei</span>
      <input id="team-two" :value="draft.names[1]" maxlength="28" autocomplete="off" spellcheck="false" @input="updateName(1, $event)">
    </label>
    <p class="game-setup-sentence" aria-label="Spieleinstellungen">
      <button type="button" :aria-label="`Runden: ${draft.rounds}. Klicken zum Ändern`" @click="cycleRounds">{{ draft.rounds }} Runden</button>
      <span aria-hidden="true">·</span>
      <button type="button" :aria-label="`Zeit: ${draft.seconds} Sekunden. Klicken zum Ändern`" @click="cycleSeconds">{{ draft.seconds }} Sek.</button>
      <span aria-hidden="true">·</span>
      <button type="button" :aria-label="`Modus: ${difficultyLabel}. Klicken zum Ändern`" @click="cycleDifficulty">{{ difficultyLabel }}</button>
    </p>
    <button type="submit" class="game-setup-action">
      {{ primaryActionLabel }}
      <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" />
    </button>
    <div class="game-setup-form-foot">
      <span v-if="catalogExhausted" class="game-setup-history-warning">Katalog durchgespielt · <button type="button" @click="emit('reset-history')">Archiv zurücksetzen</button></span>
      <span v-else>{{ questionCount }} Fragen pro Spiel · {{ remainingQuestionCount }} / {{ totalQuestionCount }} im Pool</span>
      <div>
        <button type="button" @click="emit('newGame')">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
        <button type="button" @click="emit('rules')">Regeln</button>
      </div>
    </div>
  </form>
</template>
