<script setup lang="ts">
import { computed, ref } from 'vue'

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

type SetupField = 'rounds' | 'seconds' | 'difficulty'

const activeSetupField = ref<SetupField>('rounds')
const difficultyLabel = computed(() => difficultyOptions.find(option => option.value === props.draft.difficulty)?.label ?? '')

function selectSetupOption(field: SetupField, value: number | DifficultyMode) {
  if (field === 'rounds' && typeof value === 'number') {
    emit('update:rounds', value)
  }

  if (field === 'seconds' && typeof value === 'number') {
    emit('update:seconds', value)
  }

  if (field === 'difficulty' && typeof value === 'string') {
    emit('update:difficulty', value as DifficultyMode)
  }
}
</script>

<template>
  <form class="game-setup-form" @submit.prevent="emit('start')">
    <div class="game-setup-form-head"><span>Teamnamen</span><span>Bereit?</span></div>
    <div class="game-setup-team-grid">
      <label for="team-one"><span>Team eins</span>
        <input id="team-one" :value="draft.names[0]" maxlength="28" autocomplete="off" @input="updateName(0, $event)">
      </label>
      <label for="team-two"><span>Team zwei</span>
        <input id="team-two" :value="draft.names[1]" maxlength="28" autocomplete="off" @input="updateName(1, $event)">
      </label>
    </div>
    <div class="game-setup-config" aria-label="Spieleinstellungen">
      <div class="game-setup-badges" role="tablist" aria-label="Aktive Spieleinstellungen">
        <button class="game-setup-badge" :class="{ 'is-active': activeSetupField === 'rounds' }" type="button" role="tab" :aria-selected="activeSetupField === 'rounds'" @click="activeSetupField = 'rounds'">
          <strong>{{ draft.rounds }}</strong>
          <span>Runden</span>
        </button>
        <button class="game-setup-badge" :class="{ 'is-active': activeSetupField === 'seconds' }" type="button" role="tab" :aria-selected="activeSetupField === 'seconds'" @click="activeSetupField = 'seconds'">
          <strong>{{ draft.seconds }}</strong>
          <span>Sekunden</span>
        </button>
        <button class="game-setup-badge" :class="{ 'is-active': activeSetupField === 'difficulty' }" type="button" role="tab" :aria-selected="activeSetupField === 'difficulty'" @click="activeSetupField = 'difficulty'">
          <strong>{{ difficultyLabel }}</strong>
          <span>Modus</span>
        </button>
      </div>
      <div class="game-setup-picker" :aria-label="`${activeSetupField === 'rounds' ? 'Runden' : activeSetupField === 'seconds' ? 'Sekunden' : 'Modus'} auswählen`">
        <div v-if="activeSetupField === 'rounds'">
          <button v-for="round in [3, 5, 7]" :key="round" type="button" :class="{ 'is-selected': draft.rounds === round }" :aria-pressed="draft.rounds === round" @click="selectSetupOption('rounds', round)">{{ round }}</button>
        </div>
        <div v-else-if="activeSetupField === 'seconds'">
          <button v-for="seconds in [30, 45, 60]" :key="seconds" type="button" :class="{ 'is-selected': draft.seconds === seconds }" :aria-pressed="draft.seconds === seconds" @click="selectSetupOption('seconds', seconds)">{{ seconds }} Sek.</button>
        </div>
        <div v-else>
          <button v-for="option in difficultyOptions" :key="option.value" type="button" :class="{ 'is-selected': draft.difficulty === option.value }" :aria-pressed="draft.difficulty === option.value" @click="selectSetupOption('difficulty', option.value)">{{ option.label }}</button>
        </div>
      </div>
    </div>
    <div class="game-setup-form-foot">
      <span v-if="catalogExhausted" class="game-setup-history-warning">Katalog durchgespielt · <button type="button" @click="emit('reset-history')">Archiv zurücksetzen</button></span>
      <span v-else>{{ questionCount }} Fragen pro Spiel · {{ remainingQuestionCount }} / {{ totalQuestionCount }} im Pool</span>
      <div>
        <button type="button" @click="emit('newGame')">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
        <button type="button" @click="emit('rules')">Regeln</button>
      </div>
    </div>
    <button type="submit" class="game-setup-action">
      {{ primaryActionLabel }}
      <Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" />
    </button>
  </form>
</template>
