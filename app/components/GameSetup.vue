<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'
import { soundCountFor, SNIPER_SOUNDS_PER_ROUND, type SniperConfig } from '~/composables/useSniperGame'
import type { SniperCategoryId } from '~/data/sniper-sounds.types'
import type { DifficultyMode, GameMode, SetupDraft } from '~/types/setup'

const props = defineProps<{
  mode: GameMode
  config: QuizConfig
  sniperConfig: SniperConfig
  hasSavedGame: boolean
  hasSavedSniperGame: boolean
  catalogExhausted: boolean
  remainingQuestionCount: number
  totalQuestionCount: number
}>()

const emit = defineEmits<{
  'update:mode': [mode: GameMode]
  start: [config: Partial<QuizConfig>]
  resume: []
  newGame: [config: Partial<QuizConfig>]
  startSniper: [config: Partial<SniperConfig>]
  resumeSniper: []
  rules: []
  settings: []
  resetHistory: []
}>()

function draftFromConfig(): SetupDraft {
  const names = props.mode === 'sniper' ? props.sniperConfig.names : props.config.names
  return {
    names: [...names] as [string, string],
    players: [...props.config.players] as [string, string],
    rounds: props.config.rounds,
    seconds: props.config.seconds,
    difficulty: props.config.difficulty,
    sniperRounds: props.sniperConfig.rounds,
    sniperSeconds: props.sniperConfig.seconds,
    sniperCategories: [...props.sniperConfig.categories],
  }
}

const draft = reactive<SetupDraft>(draftFromConfig())

// Saved settings are restored after this component is created. Until the host
// edits the form, the draft follows the config; otherwise restored team names
// would count as a change and hide "Spiel fortsetzen".
let edited = false
watch(
  () => [...props.config.names, ...props.config.players, props.config.rounds, props.config.seconds, props.config.difficulty, ...props.sniperConfig.names, props.sniperConfig.rounds, props.sniperConfig.seconds, props.sniperConfig.categories.join()],
  () => {
    if (!edited)
      Object.assign(draft, draftFromConfig())
  },
)

const cleanNames = (): [string, string] => [draft.names[0].trim() || 'TEAM ONE', draft.names[1].trim() || 'TEAM TWO']

function payload(): Partial<QuizConfig> {
  return {
    names: cleanNames(),
    players: draft.players,
    rounds: draft.rounds,
    seconds: draft.seconds,
    difficulty: draft.difficulty,
  }
}

function sniperPayload(): Partial<SniperConfig> {
  return {
    names: cleanNames(),
    rounds: draft.sniperRounds,
    seconds: draft.sniperSeconds,
    categories: [...draft.sniperCategories],
  }
}

const hasDraftChanges = computed(() => {
  if (props.mode === 'sniper') {
    return draft.names[0] !== props.sniperConfig.names[0]
      || draft.names[1] !== props.sniperConfig.names[1]
      || draft.sniperRounds !== props.sniperConfig.rounds
      || draft.sniperSeconds !== props.sniperConfig.seconds
      || draft.sniperCategories.join() !== props.sniperConfig.categories.join()
  }
  return draft.names[0] !== props.config.names[0]
    || draft.names[1] !== props.config.names[1]
    || draft.rounds !== props.config.rounds
    || draft.seconds !== props.config.seconds
    || draft.difficulty !== props.config.difficulty
})

const savedGame = computed(() => props.mode === 'sniper' ? props.hasSavedSniperGame : props.hasSavedGame)
const primaryActionLabel = computed(() => savedGame.value && !hasDraftChanges.value ? 'Spiel fortsetzen' : 'Spiel starten')
const sniperPoolCount = computed(() => soundCountFor(draft.sniperCategories))

function start() {
  const resume = savedGame.value && !hasDraftChanges.value
  if (props.mode === 'sniper') {
    if (resume)
      emit('resumeSniper')
    else if (sniperPoolCount.value)
      emit('startSniper', sniperPayload())
    return
  }
  if (resume)
    emit('resume')
  else
    emit('start', payload())
}

function newGame() {
  if (props.mode === 'sniper') {
    if (sniperPoolCount.value)
      emit('startSniper', sniperPayload())
    return
  }
  emit('newGame', payload())
}

function update<K extends keyof SetupDraft>(key: K, value: SetupDraft[K]) {
  edited = true
  draft[key] = value
}

function setMode(mode: GameMode) {
  emit('update:mode', mode)
}

function toggleCategory(id: SniperCategoryId) {
  const current = draft.sniperCategories
  // At least one category stays on; an empty pool would make the mode unplayable.
  if (current.includes(id) && current.length === 1)
    return
  update('sniperCategories', current.includes(id) ? current.filter(item => item !== id) : [...current, id])
}
</script>

<template>
  <section class="game-setup" :data-mode="mode">
    <GameSetupHero :mode="mode" />
    <GameSetupPanel
      :mode="mode"
      :draft="draft"
      :has-saved-game="savedGame"
      :question-count="mode === 'sniper' ? draft.sniperRounds * SNIPER_SOUNDS_PER_ROUND : draft.rounds * config.perRound"
      :catalog-exhausted="mode === 'quiz' && catalogExhausted"
      :remaining-question-count="remainingQuestionCount"
      :total-question-count="totalQuestionCount"
      :sniper-pool-count="sniperPoolCount"
      :primary-action-label="primaryActionLabel"
      @update:mode="setMode"
      @update:names="update('names', $event)"
      @update:players="update('players', $event)"
      @update:rounds="update('rounds', $event)"
      @update:seconds="update('seconds', $event)"
      @update:difficulty="update('difficulty', $event as DifficultyMode)"
      @update:sniper-rounds="update('sniperRounds', $event)"
      @update:sniper-seconds="update('sniperSeconds', $event)"
      @toggle-category="toggleCategory"
      @start="start"
      @new-game="newGame"
      @rules="emit('rules')"
      @reset-history="emit('resetHistory')"
    />
  </section>
</template>
