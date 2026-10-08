<script setup lang="ts">
import { computed } from 'vue'

import { SNIPER_ROUND_OPTIONS, SNIPER_SECOND_OPTIONS } from '~/composables/useSniperGame'
import { SNIPER_CATEGORIES, type SniperCategoryId } from '~/data/sniper-sounds.types'
import type { DifficultyMode, GameMode, SetupDraft } from '~/types/setup'

const props = defineProps<{
  mode: GameMode
  draft: SetupDraft
  sniperPoolCount: number
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
  'update:mode': [mode: GameMode]
  'update:sniperRounds': [rounds: number]
  'update:sniperSeconds': [seconds: number]
  'toggle-category': [id: SniperCategoryId]
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

const modes: { value: GameMode, label: string }[] = [
  { value: 'quiz', label: 'Quiz' },
  { value: 'sniper', label: 'Sound Sniper' },
]

const isSniper = computed(() => props.mode === 'sniper')
const rounds = computed(() => isSniper.value ? props.draft.sniperRounds : props.draft.rounds)
const seconds = computed(() => isSniper.value ? props.draft.sniperSeconds : props.draft.seconds)

function cycleRounds() {
  if (isSniper.value)
    emit('update:sniperRounds', nextOf(SNIPER_ROUND_OPTIONS, props.draft.sniperRounds))
  else
    emit('update:rounds', nextOf(roundOptions, props.draft.rounds))
}

function cycleSeconds() {
  if (isSniper.value)
    emit('update:sniperSeconds', nextOf(SNIPER_SECOND_OPTIONS, props.draft.sniperSeconds))
  else
    emit('update:seconds', nextOf(secondOptions, props.draft.seconds))
}

function cycleDifficulty() {
  emit('update:difficulty', difficultyOptions[(difficultyIndex.value + 1) % difficultyOptions.length]!.value)
}
</script>

<template>
  <form class="game-setup-form" @submit.prevent="emit('start')">
    <div class="game-setup-mode" role="radiogroup" aria-label="Spielmodus">
      <button
        v-for="option in modes"
        :key="option.value"
        type="button"
        role="radio"
        :aria-checked="mode === option.value"
        :class="{ 'is-active': mode === option.value }"
        @click="emit('update:mode', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <label class="game-setup-team" for="team-one"><span>Team eins</span>
      <input id="team-one" :value="draft.names[0]" maxlength="28" autocomplete="off" spellcheck="false" @input="updateName(0, $event)">
    </label>
    <div class="game-setup-versus" aria-hidden="true"><i /><b>vs</b><i /></div>
    <label class="game-setup-team" for="team-two"><span>Team zwei</span>
      <input id="team-two" :value="draft.names[1]" maxlength="28" autocomplete="off" spellcheck="false" @input="updateName(1, $event)">
    </label>
    <p class="game-setup-sentence" aria-label="Spieleinstellungen">
      <button type="button" :aria-label="`Runden: ${rounds}. Klicken zum Ändern`" @click="cycleRounds">{{ rounds }} Runden</button>
      <span aria-hidden="true">·</span>
      <button type="button" :aria-label="`${isSniper ? 'Hörzeit' : 'Zeit'}: ${seconds} Sekunden. Klicken zum Ändern`" @click="cycleSeconds">{{ seconds }} Sek.</button>
      <template v-if="!isSniper">
        <span aria-hidden="true">·</span>
        <button type="button" :aria-label="`Modus: ${difficultyLabel}. Klicken zum Ändern`" @click="cycleDifficulty">{{ difficultyLabel }}</button>
      </template>
    </p>
    <div v-if="isSniper" class="game-setup-categories" role="group" aria-label="Sound-Kategorien">
      <button
        v-for="category in SNIPER_CATEGORIES"
        :key="category.id"
        type="button"
        :aria-pressed="draft.sniperCategories.includes(category.id)"
        :class="{ 'is-on': draft.sniperCategories.includes(category.id) }"
        @click="emit('toggle-category', category.id)"
      >
        {{ category.label }}
      </button>
    </div>
    <button type="submit" class="game-setup-action" :disabled="isSniper && !sniperPoolCount">
      {{ primaryActionLabel }}
      <Icon name="lucide:arrow-up-right" size="18" aria-hidden="true" />
    </button>
    <div class="game-setup-form-foot">
      <template v-if="isSniper">
        <span v-if="sniperPoolCount">{{ questionCount }} Sounds pro Spiel · {{ sniperPoolCount }} Sounds im Pool</span>
        <span v-else class="game-setup-history-warning">Noch keine Sounds. MP3s nach <code>public/sounds/sniper/</code> legen und in <code>app/data/sniper-sounds.ts</code> eintragen.</span>
      </template>
      <span v-else-if="catalogExhausted" class="game-setup-history-warning">Katalog durchgespielt · <button type="button" @click="emit('reset-history')">Archiv zurücksetzen</button></span>
      <span v-else>{{ questionCount }} Fragen pro Spiel · {{ remainingQuestionCount }} / {{ totalQuestionCount }} im Pool</span>
      <div>
        <button type="button" @click="emit('newGame')">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
        <button type="button" @click="emit('rules')">Regeln</button>
      </div>
    </div>
  </form>
</template>
