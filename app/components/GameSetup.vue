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
  <section class="game-setup stage-enter-active">
    <div class="game-setup-copy">
      <div class="game-setup-wordmark">JUNGLE <span>/</span> QUIZ</div>
      <h1>Wer<br><em>spielt?</em></h1>
      <p>Zwei Teams. Vier Kategorien. Eine Chance zu stehlen.</p>
      <div class="game-setup-meta"><span>{{ draft.rounds }} Runden</span><span>{{ draft.seconds }} Sek.</span><span>4 Kategorien</span></div>
      <div class="game-setup-stamp" :aria-label="`${draft.rounds} Runden, ${draft.seconds} Sekunden Antwortzeit`">
        <strong>{{ draft.rounds }}</strong>
        <span>Runden<br><b>{{ draft.seconds }} Sek.</b></span>
      </div>
    </div>

    <form class="game-setup-form" @submit.prevent="start">
      <div class="game-setup-form-head"><span>Teamnamen</span><span>Bereit?</span></div>
      <div class="game-setup-team-grid">
        <div>
          <label for="team-one">Team eins</label>
          <input id="team-one" v-model="draft.names[0]" maxlength="28" autocomplete="off">
          <label for="players-one">Namen <small>· optional</small></label>
          <textarea id="players-one" v-model="draft.players[0]" placeholder="Mit Komma trennen" />
        </div>
        <div>
          <label for="team-two">Team zwei</label>
          <input id="team-two" v-model="draft.names[1]" maxlength="28" autocomplete="off">
          <label for="players-two">Namen <small>· optional</small></label>
          <textarea id="players-two" v-model="draft.players[1]" placeholder="Mit Komma trennen" />
        </div>
      </div>
      <div class="game-setup-config">
        <label for="rounds">Runden<select id="rounds" v-model.number="draft.rounds"><option v-for="round in [4, 5, 6]" :key="round" :value="round">{{ round }}</option></select></label>
        <label for="seconds">Antwortzeit<select id="seconds" v-model.number="draft.seconds"><option v-for="seconds in [30, 45, 60]" :key="seconds" :value="seconds">{{ seconds }} Sek.</option></select></label>
      </div>
      <div class="game-setup-form-foot">
        <span>{{ questionCount }} Fragen · austauschbar</span>
        <div>
          <button type="button" @click="emit('newGame', payload)">{{ hasSavedGame ? 'Neues Spiel' : 'Schnellstart' }}</button>
          <button type="button" @click="emit('rules')">Regeln</button>
        </div>
      </div>
      <button type="submit" class="game-setup-action">
        {{ hasSavedGame ? 'Spiel fortsetzen' : 'Spiel starten' }}
        <Icon name="lucide:arrow-up-right" size="17" aria-hidden="true" />
      </button>
    </form>
  </section>
</template>
