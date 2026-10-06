<script setup lang="ts">
import type { DifficultyMode, SetupDraft } from '~/types/setup'

const props = defineProps<{
  draft: SetupDraft
  hasSavedGame: boolean
  questionCount: number
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
      <fieldset class="game-setup-choice">
        <legend>Runden</legend>
        <div class="game-setup-choice-options">
          <button v-for="round in [3, 5, 7]" :key="round" type="button" :class="{ 'is-selected': draft.rounds === round }" :aria-pressed="draft.rounds === round" @click="emit('update:rounds', round)">{{ round }}</button>
        </div>
      </fieldset>
      <fieldset class="game-setup-choice">
        <legend>Zeit</legend>
        <div class="game-setup-choice-options">
          <button v-for="seconds in [30, 45, 60]" :key="seconds" type="button" :class="{ 'is-selected': draft.seconds === seconds }" :aria-pressed="draft.seconds === seconds" @click="emit('update:seconds', seconds)">{{ seconds }}</button>
        </div>
      </fieldset>
      <fieldset class="game-setup-choice game-setup-choice--difficulty">
        <legend>Schwierigkeit</legend>
        <div class="game-setup-choice-options">
          <button v-for="option in difficultyOptions" :key="option.value" type="button" :class="{ 'is-selected': draft.difficulty === option.value }" :aria-pressed="draft.difficulty === option.value" @click="emit('update:difficulty', option.value)">{{ option.label }}</button>
        </div>
      </fieldset>
    </div>
    <div class="game-setup-form-foot">
      <span>{{ questionCount }} Fragen · austauschbar</span>
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
