<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'
import type { DifficultyMode, SetupDraft } from '~/types/setup'

const props = defineProps<{
  config: QuizConfig
  hasSavedGame: boolean
  catalogExhausted: boolean
  remainingQuestionCount: number
  totalQuestionCount: number
}>()

const emit = defineEmits<{
  start: [config: Partial<QuizConfig>]
  resume: []
  newGame: [config: Partial<QuizConfig>]
  rules: []
  settings: []
  resetHistory: []
}>()

const draft = reactive<SetupDraft>({
  names: [...props.config.names] as [string, string],
  players: [...props.config.players] as [string, string],
  rounds: props.config.rounds,
  seconds: props.config.seconds,
  difficulty: props.config.difficulty,
})

function payload(): Partial<QuizConfig> {
  return {
    names: [draft.names[0].trim() || 'TEAM ONE', draft.names[1].trim() || 'TEAM TWO'],
    players: draft.players,
    rounds: draft.rounds,
    seconds: draft.seconds,
    difficulty: draft.difficulty,
  }
}

const hasDraftChanges = computed(() => draft.names[0] !== props.config.names[0]
  || draft.names[1] !== props.config.names[1]
  || draft.rounds !== props.config.rounds
  || draft.seconds !== props.config.seconds
  || draft.difficulty !== props.config.difficulty)

const primaryActionLabel = computed(() => props.hasSavedGame && !hasDraftChanges.value ? 'Spiel fortsetzen' : 'Spiel starten')

function start() {
  if (props.hasSavedGame && !hasDraftChanges.value)
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

function updateDifficulty(difficulty: DifficultyMode) {
  draft.difficulty = difficulty
}

function newGame() {
  emit('newGame', payload())
}

function rules() {
  emit('rules')
}
</script>

<template>
  <section class="game-setup">
    <GameSetupHero />
    <GameSetupPanel
      :draft="draft"
      :has-saved-game="hasSavedGame"
      :question-count="draft.rounds * config.perRound"
      :catalog-exhausted="catalogExhausted"
      :remaining-question-count="remainingQuestionCount"
      :total-question-count="totalQuestionCount"
      :primary-action-label="primaryActionLabel"
      @update:names="updateNames"
      @update:players="updatePlayers"
      @update:rounds="updateRounds"
      @update:seconds="updateSeconds"
      @update:difficulty="updateDifficulty"
      @start="start"
      @new-game="newGame"
      @rules="rules"
      @reset-history="emit('resetHistory')"
    />
  </section>
</template>
