<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'

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

const draft = reactive({
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
</script>

<template>
  <section class="grid min-h-[calc(100vh-170px)] items-center gap-14 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-[7vw]">
    <div class="stage-enter-active">
      <p class="mb-5 font-sans text-xs font-600 uppercase tracking-[0.2em] text-gold">BIRTHDAY QUIZ</p>
      <h1 class="display max-w-[8ch] text-[clamp(4rem,15.5vw,11.25rem)]">
        Wer<br><span class="text-leaf">spielt?</span>
      </h1>
      <p class="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted">Zwei Teams. Vier Kategorien. Eine Chance zu stehlen.</p>
      <div class="mt-8 flex flex-wrap items-center gap-6">
        <div class="setup-stamp" :aria-label="`${draft.rounds} Runden, ${draft.seconds} Sekunden Antwortzeit`">
          <strong class="setup-stamp-number">{{ draft.rounds }}</strong>
          <span class="setup-stamp-copy">Runden<br><b>{{ draft.seconds }} Sek.</b></span>
        </div>
        <div class="flex flex-wrap gap-3">
        <button data-uisfx-hover="hover" class="button-primary" @click="start">
          <Icon name="lucide:play" size="17" aria-hidden="true" />
          {{ hasSavedGame ? 'Spiel fortsetzen' : 'Spiel starten' }}
        </button>
        <button data-uisfx-hover="hover" class="button-quiet" @click="emit('newGame', payload)">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
        <button data-uisfx-hover="hover" data-uisfx="open" class="button-quiet" @click="emit('rules')">
          <Icon name="lucide:circle-help" size="17" aria-hidden="true" />
          Regeln
        </button>
        </div>
      </div>
    </div>

    <form class="border-t border-line pt-7" @submit.prevent="start">
      <p class="eyebrow mb-6">Teamnamen</p>
      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-xs uppercase tracking-[0.12em] text-muted" for="team-one">Team 1</label>
          <input id="team-one" v-model="draft.names[0]" class="field" maxlength="28" autocomplete="off">
          <label class="mb-2 mt-5 block text-xs uppercase tracking-[0.12em] text-muted" for="players-one">Namen <span class="normal-case tracking-normal opacity-70">· optional</span></label>
          <textarea id="players-one" v-model="draft.players[0]" class="field min-h-18 resize-y" placeholder="Namen, mit Komma getrennt" />
        </div>
        <div>
          <label class="mb-2 block text-xs uppercase tracking-[0.12em] text-muted" for="team-two">Team 2</label>
          <input id="team-two" v-model="draft.names[1]" class="field" maxlength="28" autocomplete="off">
          <label class="mb-2 mt-5 block text-xs uppercase tracking-[0.12em] text-muted" for="players-two">Namen <span class="normal-case tracking-normal opacity-70">· optional</span></label>
          <textarea id="players-two" v-model="draft.players[1]" class="field min-h-18 resize-y" placeholder="Namen, mit Komma getrennt" />
        </div>
      </div>
      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-xs uppercase tracking-[0.12em] text-muted" for="rounds">Runden</label>
          <select id="rounds" v-model.number="draft.rounds" class="field">
            <option v-for="round in [4, 5, 6]" :key="round" :value="round">{{ round }} Runden</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-xs uppercase tracking-[0.12em] text-muted" for="seconds">Antwortzeit</label>
          <select id="seconds" v-model.number="draft.seconds" class="field">
            <option v-for="seconds in [30, 45, 60]" :key="seconds" :value="seconds">{{ seconds }} Sekunden</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span class="text-xs text-muted">{{ questionCount }} Fragen · austauschbar</span>
        <button type="button" data-uisfx-hover="hover" data-uisfx="open" class="button-quiet px-3 py-2.5 text-xs" @click="emit('settings')">Mehr Einstellungen</button>
      </div>
    </form>
  </section>
</template>
