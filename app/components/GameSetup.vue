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

function draftFromConfig(): SetupDraft {
  return {
    names: [...props.config.names] as [string, string],
    players: [...props.config.players] as [string, string],
    rounds: props.config.rounds,
    seconds: props.config.seconds,
    difficulty: props.config.difficulty,
  }
}

const draft = reactive<SetupDraft>(draftFromConfig())

// Saved settings are restored after this component is created. Until the host
// edits the form, the draft follows the config; otherwise restored team names
// would count as a change and hide "Spiel fortsetzen".
let edited = false
watch(
  () => [...props.config.names, ...props.config.players, props.config.rounds, props.config.seconds, props.config.difficulty],
  () => {
    if (!edited)
      Object.assign(draft, draftFromConfig())
  },
)

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
  edited = true
  draft.names = names
}

function updatePlayers(players: [string, string]) {
  edited = true
  draft.players = players
}

function updateRounds(rounds: number) {
  edited = true
  draft.rounds = rounds
}

function updateSeconds(seconds: number) {
  edited = true
  draft.seconds = seconds
}

function updateDifficulty(difficulty: DifficultyMode) {
  edited = true
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
