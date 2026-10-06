<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'

const quiz = useQuizGame()
const modal = ref<'rules' | 'settings' | 'new' | null>(null)

const winnerIndex = computed(() => quiz.game.scores[0] > quiz.game.scores[1] ? 0 : 1)
const winnerName = computed(() => quiz.config.names[winnerIndex.value])
const resolvedWinnerName = computed(() => quiz.game.winner === null ? '' : quiz.config.names[quiz.game.winner])

function submitSetup(config: Partial<QuizConfig>) {
  quiz.startGame(config)
}

function newGame(config: Partial<QuizConfig>) {
  modal.value = null
  quiz.startGame(config)
}

function toggleTimer() {
  if (quiz.timerRunning.value)
    quiz.pauseTimer()
  else
    quiz.startTimer()
}

async function fullscreen() {
  try {
    if (document.fullscreenElement)
      await document.exitFullscreen()
    else
      await document.documentElement.requestFullscreen()
  }
  catch {
    modal.value = 'rules'
  }
}
</script>

<template>
  <div class="page-shell relative min-h-screen">
    <div class="app-noise" aria-hidden="true" />
    <AppHeader :sound-enabled="quiz.sound.enabled.value" @toggle-sound="quiz.sound.toggle" @fullscreen="fullscreen" @help="modal = 'rules'" @home="quiz.openMenu" />

    <main class="page-wrap relative z-1">
      <Transition name="stage" mode="out-in">
        <GameSetup v-if="quiz.screen.value === 'menu'" :config="quiz.config" :has-saved-game="quiz.hasSavedGame.value" :question-count="quiz.questionCount.value" @start="submitSetup" @resume="quiz.resumeGame" @new-game="newGame" @rules="modal = 'rules'" @settings="modal = 'settings'" />

        <section v-else-if="quiz.screen.value === 'toss'" class="grid min-h-[calc(100vh-210px)] place-items-center py-14 text-center">
          <div>
            <p class="eyebrow">Wer fängt an?</p>
            <div class="mx-auto my-7 grid size-32 place-items-center rounded-full border-2 border-gold font-display text-5xl text-gold animate-[spin_1.2s_linear_infinite]">JQ</div>
            <h1 class="display text-5xl md:text-7xl">Die Münze<br>entscheidet.</h1>
          </div>
        </section>

        <section v-else-if="quiz.screen.value === 'category' || quiz.screen.value === 'question' || quiz.screen.value === 'tie'" class="py-10">
          <Scoreboard :names="quiz.config.names" :scores="quiz.game.scores" :active="quiz.game.active" :round="quiz.roundNumber.value" :rounds="quiz.config.rounds" :turn="quiz.game.turn" :per-round="quiz.config.perRound" :tie="quiz.screen.value === 'tie'" />
          <CategoryBoard v-if="quiz.screen.value === 'category'" :categories="quiz.game.categories" :active-name="quiz.config.names[quiz.game.active]" @choose="quiz.chooseCategory" />
          <QuestionStage v-else-if="quiz.screen.value === 'question' && quiz.game.currentQuestion" :question="quiz.game.currentQuestion" :active-name="quiz.config.names[quiz.game.active]" :stolen="quiz.game.stolen" :revealed="quiz.game.revealed" :resolved="quiz.game.resolved" :result="quiz.game.result" :winner="quiz.game.winner" :selected-option="quiz.game.selectedOption" :time-expired="quiz.game.timeExpired" :time-remaining="quiz.timeRemaining.value" :time-limit="quiz.game.stolen && quiz.config.steal !== 'remaining' ? Number(quiz.config.steal) : quiz.config.seconds" :timer-running="quiz.timerRunning.value" :drink="quiz.config.drink" :winner-name="resolvedWinnerName" @select="quiz.selectOption" @reveal="quiz.revealAnswer" @toggle-timer="toggleTimer" @reset-timer="quiz.resetTimer" @next="quiz.nextQuestion" />
          <TieBreaker v-else-if="quiz.screen.value === 'tie'" :names="quiz.config.names" :question="quiz.tieQuestion.value.question" :answer="quiz.tieQuestion.value.answer" @submit="quiz.submitTie" />
        </section>

        <FinalStage v-else-if="quiz.screen.value === 'final'" :winner-name="winnerName" :scores="quiz.game.scores" @rematch="quiz.startGame()" @menu="quiz.openMenu" />
      </Transition>
    </main>

    <AppFooter />

    <AppModal v-if="modal === 'rules'" title="So wird gespielt" @close="modal = null">
      <p>Die Münze bestimmt das erste Team. Ihr wählt abwechselnd eine von vier Kategorien. Der Host liest die Frage vor und bewertet die Antwort.</p>
      <p class="mt-4">Richtig: +1 Punkt. Falsch oder Zeit abgelaufen: Das andere Team bekommt eine Steal-Chance. Danach wird aufgelöst. Bei Gleichstand entscheidet eine Schätzfrage.</p>
      <p class="mt-4 text-cream">Tastatur: R richtig · F falsch · A Antwort zeigen · Leertaste Pause / Start · Enter nächste Frage · Esc Menü</p>
    </AppModal>

    <AppModal v-if="modal === 'settings'" title="Host Settings" @close="modal = null">
      <p>Die erweiterten Einstellungen kommen in der nächsten Iteration als eigener Host-Dialog. Der spielbare Prototyp nutzt aktuell {{ quiz.config.perRound }} Fragen pro Runde und die konfigurierte Steal-Zeit.</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <button class="button-quiet" @click="quiz.config.motion = !quiz.config.motion; modal = null">Animationen: {{ quiz.config.motion ? 'an' : 'aus' }}</button>
        <button class="button-quiet" @click="quiz.config.drink = !quiz.config.drink; modal = null">Trinkregeln: {{ quiz.config.drink ? 'an' : 'aus' }}</button>
      </div>
    </AppModal>

    <AppModal v-if="modal === 'new'" title="Neues Spiel?" @close="modal = null">
      <p>Der aktuelle Punktestand wird zurückgesetzt.</p>
      <button class="button-primary mt-7" @click="newGame({})">Neues Spiel starten</button>
    </AppModal>
  </div>
</template>
