<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'
import type { SetupDraft } from '~/types/setup'

const props = defineProps<{
  config: QuizConfig
  hasSavedGame: boolean
  questionCount: number
}>()

const emit = defineEmits<{
  start: [config: Partial<QuizConfig>]
  resume: []
  newGame: [config: Partial<QuizConfig>]
  rules: []
  settings: []
}>()

const draft = reactive<SetupDraft>({
  names: [...props.config.names] as [string, string],
  players: [...props.config.players] as [string, string],
  rounds: props.config.rounds,
  seconds: props.config.seconds,
})

function payload(): Partial<QuizConfig> {
  return {
    names: [draft.names[0].trim() || 'TEAM ONE', draft.names[1].trim() || 'TEAM TWO'],
    players: draft.players,
    rounds: draft.rounds,
    seconds: draft.seconds,
  }
}

function start() {
  if (props.hasSavedGame)
    emit('resume')
  else
    emit('start', payload())
}

function updateNames(names: [string, string]) {
  draft.names = names
}

function updatePlayers(players: [string, string]) {
  draft.players = players
}

function updateRounds(rounds: number) {
  draft.rounds = rounds
}

function updateSeconds(seconds: number) {
  draft.seconds = seconds
}

function newGame() {
  emit('newGame', payload())
}

function rules() {
  emit('rules')
}
</script>

<template>
  <section class="game-setup stage-enter-active">
    <GameSetupHero :rounds="draft.rounds" :seconds="draft.seconds" />
    <GameSetupPanel
      :draft="draft"
      :has-saved-game="hasSavedGame"
      :question-count="questionCount"
      @update:names="updateNames"
      @update:players="updatePlayers"
      @update:rounds="updateRounds"
      @update:seconds="updateSeconds"
      @start="start"
      @new-game="newGame"
      @rules="rules"
    />
  </section>
</template>
