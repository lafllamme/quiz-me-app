<script setup lang="ts">
import type { SetupDraft } from '~/types/setup'

const props = defineProps<{
  draft: SetupDraft
  hasSavedGame: boolean
  questionCount: number
}>()

const emit = defineEmits<{
  'update:names': [names: [string, string]]
  'update:players': [players: [string, string]]
  'update:rounds': [rounds: number]
  'update:seconds': [seconds: number]
  start: []
  newGame: []
  rules: []
}>()

function updateName(index: 0 | 1, event: Event) {
  const names = [...props.draft.names] as [string, string]
  names[index] = (event.target as HTMLInputElement).value
  emit('update:names', names)
}

function updatePlayers(index: 0 | 1, event: Event) {
  const players = [...props.draft.players] as [string, string]
  players[index] = (event.target as HTMLTextAreaElement).value
  emit('update:players', players)
}

function updateNumber(field: 'rounds' | 'seconds', event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)

  if (field === 'rounds')
    emit('update:rounds', value)
  else
    emit('update:seconds', value)
}
</script>

<template>
  <form class="game-setup-form" @submit.prevent="emit('start')">
    <div class="game-setup-form-head"><span>Teamnamen</span><span>Bereit?</span></div>
    <div class="game-setup-team-grid">
      <div>
        <label for="team-one">Team eins</label>
        <input id="team-one" :value="draft.names[0]" maxlength="28" autocomplete="off" @input="updateName(0, $event)">
        <label for="players-one">Namen <small>· optional</small></label>
        <textarea id="players-one" :value="draft.players[0]" placeholder="Mit Komma trennen" @input="updatePlayers(0, $event)" />
      </div>
      <div>
        <label for="team-two">Team zwei</label>
        <input id="team-two" :value="draft.names[1]" maxlength="28" autocomplete="off" @input="updateName(1, $event)">
        <label for="players-two">Namen <small>· optional</small></label>
        <textarea id="players-two" :value="draft.players[1]" placeholder="Mit Komma trennen" @input="updatePlayers(1, $event)" />
      </div>
    </div>
    <div class="game-setup-config">
      <label for="rounds">Runden<select id="rounds" :value="draft.rounds" @change="updateNumber('rounds', $event)"><option v-for="round in [4, 5, 6]" :key="round" :value="round">{{ round }}</option></select></label>
      <label for="seconds">Antwortzeit<select id="seconds" :value="draft.seconds" @change="updateNumber('seconds', $event)"><option v-for="seconds in [30, 45, 60]" :key="seconds" :value="seconds">{{ seconds }} Sek.</option></select></label>
    </div>
    <div class="game-setup-form-foot">
      <span>{{ questionCount }} Fragen · austauschbar</span>
      <div>
        <button type="button" @click="emit('newGame')">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
        <button type="button" @click="emit('rules')">Regeln</button>
      </div>
    </div>
    <button type="submit" class="game-setup-action">
      {{ hasSavedGame ? 'Spiel fortsetzen' : 'Spiel starten' }}
      <Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" />
    </button>
  </form>
</template>
