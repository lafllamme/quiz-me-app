<script setup lang="ts">
import type { QuizConfig } from '~/composables/useQuizGame'
import type { SniperConfig } from '~/composables/useSniperGame'
import type { GameMode } from '~/types/setup'
import { QUIZ_CATEGORIES } from '~/data/quiz-catalog'
import { loadCoinRuntime } from '~/lib/coin-face'

const quiz = useQuizGame()
const sniper = useSniperGame()
const MODE_KEY = 'jungle-mode'
const mode = ref<GameMode>('quiz')
const isSniper = computed(() => quiz.screen.value === 'sniper')
const sniperFinal = computed(() => isSniper.value && sniper.state.phase === 'final')
const modal = ref<'rules' | 'settings' | 'new' | null>(null)
const route = useRoute()

const previewCategories = QUIZ_CATEGORIES.map(category => category.label)
const isCategoryPreview = computed(() => route.query.categoryPreview === '5' || route.query.categoryPreview === '6' || route.query.categoryPreview === '10')
const visibleTiles = computed(() => isCategoryPreview.value ? previewCategories.map(category => ({ category, visual: null })) : quiz.game.tiles)

const winnerIndex = computed(() => quiz.game.scores[0] > quiz.game.scores[1] ? 0 : 1)
const winnerName = computed(() => quiz.config.names[winnerIndex.value])
const resolvedWinnerName = computed(() => quiz.game.winner === null ? '' : quiz.config.names[quiz.game.winner])
const sniperWinnerName = computed(() => sniper.config.names[sniper.state.scores[0] > sniper.state.scores[1] ? 0 : 1])
const canGoBack = computed(() => quiz.screen.value !== 'menu' && !(quiz.screen.value === 'question' && quiz.game.resolved))
const canGoForward = computed(() => {
  if (isSniper.value)
    return ['ready', 'resolved', 'final'].includes(sniper.state.phase)
  if (quiz.screen.value === 'toss')
    return quiz.tossReady.value
  if (quiz.screen.value === 'final')
    return true
  return quiz.screen.value === 'question' && quiz.game.resolved
})

function setMode(next: GameMode) {
  mode.value = next
  localStorage.setItem(MODE_KEY, next)
}

// Sound Sniper runs on its own screen; the quiz screen ref only marks it so the
// lobby music stops and the shared header knows where we are.
function startSniper(config?: Partial<SniperConfig>) {
  if (config?.names)
    quiz.config.names = [...config.names] as [string, string]
  quiz.screen.value = 'sniper'
  if (!sniper.start(config))
    goMenu()
}

function resumeSniper() {
  quiz.screen.value = 'sniper'
  sniper.resume()
}

function goMenu() {
  if (isSniper.value)
    sniper.leave()
  quiz.openMenu()
}

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

function goBack() {
  if (isSniper.value)
    goMenu()
  else if (quiz.screen.value === 'question')
    quiz.backToCategory()
  else
    quiz.openMenu()
}

// Sound Sniper keys. The host presses the team key when a physical buzzer goes off.
function onSniperKey(key: string, repeat: boolean) {
  if (repeat)
    return true
  if (key === '1' || key === 'a')
    sniper.buzzIn(0)
  else if (key === '2' || key === 'b')
    sniper.buzzIn(1)
  else if (key === 'r')
    sniper.markRight()
  else if (key === 'f')
    sniper.markWrong()
  else if (key === 'w')
    sniper.replay()
  else if (key === ' ')
    sniper.togglePause()
  else if (key === 's')
    sniper.skip()
  else if (key === 'backspace')
    sniper.undo()
  else if (key === 'enter' && sniper.state.phase === 'ready')
    sniper.begin()
  else if (key === 'enter' && sniper.state.phase === 'resolved')
    sniper.next()
  else if (key === 'escape')
    goMenu()
  else
    return false
  return true
}

const optionKeys = ['1', '2', '3', '4']
const optionLetters = ['a', 'b', 'c', 'd']

// Host shortcuts. Ignored while typing or while a modal is open (the modal owns Escape then).
function onKeydown(event: KeyboardEvent) {
  if (modal.value || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey)
    return
  if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]'))
    return

  const key = event.key.toLowerCase()
  const screen = quiz.screen.value
  let handled = true

  if (screen === 'sniper') {
    handled = onSniperKey(key, event.repeat)
  }
  else if (screen === 'question') {
    const optionIndex = optionKeys.includes(key) ? optionKeys.indexOf(key) : optionLetters.indexOf(key)
    if (optionIndex >= 0)
      quiz.selectOption(optionIndex)
    else if (key === 'z')
      quiz.revealAnswer()
    else if (key === 'r')
      quiz.markCorrect()
    else if (key === 'f')
      quiz.markWrong()
    else if (key === ' ')
      toggleTimer()
    else if (key === 'enter' && quiz.game.resolved)
      quiz.nextQuestion()
    else if (key === 'escape')
      quiz.openMenu()
    else
      handled = false
  }
  else if (screen === 'toss' && key === 'enter') {
    quiz.continueFromToss()
  }
  else if (key === 'escape' && screen !== 'menu') {
    quiz.openMenu()
  }
  else {
    handled = false
  }

  if (handled)
    event.preventDefault()
}

onMounted(() => {
  const savedMode = localStorage.getItem(MODE_KEY)
  if (savedMode === 'quiz' || savedMode === 'sniper')
    mode.value = savedMode
  window.addEventListener('keydown', onKeydown)
  // Warm up the 3D coin while the setup screen is idle.
  const warmUp = () => loadCoinRuntime().catch(() => {})
  if ('requestIdleCallback' in window)
    window.requestIdleCallback(warmUp, { timeout: 4000 })
  else
    setTimeout(warmUp, 1500)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

function goForward() {
  if (isSniper.value) {
    if (sniper.state.phase === 'ready')
      sniper.begin()
    else if (sniper.state.phase === 'resolved')
      sniper.next()
    else if (sniper.state.phase === 'final')
      startSniper()
  }
  else if (quiz.screen.value === 'toss')
    quiz.continueFromToss()
  else if (quiz.screen.value === 'question' && quiz.game.resolved)
    quiz.nextQuestion()
  else if (quiz.screen.value === 'final')
    quiz.startGame()
}

</script>

<template>
  <div class="page-shell relative min-h-screen">
    <div class="app-noise" aria-hidden="true" />
    <AppHeader :tone="quiz.screen.value === 'category' ? 'light' : 'dark'" :can-back="canGoBack" :can-forward="canGoForward" :split="quiz.screen.value === 'category'" @home="goMenu" @back="goBack" @forward="goForward" />

    <main :class="quiz.screen.value === 'menu' ? 'game-stage-wrap relative z-1' : 'game-screen-transition relative z-1'">
      <Transition name="stage" mode="out-in">
        <GameSetup v-if="quiz.screen.value === 'menu'" :mode="mode" :config="quiz.config" :sniper-config="sniper.config" :has-saved-sniper-game="sniper.hasSavedGame.value" :has-saved-game="quiz.hasSavedGame.value" :catalog-exhausted="quiz.catalogExhausted.value" :remaining-question-count="quiz.remainingQuestionCount.value" :total-question-count="quiz.totalQuestionCount.value" @start="submitSetup" @resume="quiz.resumeGame" @new-game="newGame" @rules="modal = 'rules'" @settings="modal = 'settings'" @reset-history="quiz.resetQuestionHistory" @update:mode="setMode" @start-sniper="startSniper" @resume-sniper="resumeSniper" />

        <GameScreenShell v-else :screen="sniperFinal ? 'final' : quiz.screen.value">
          <template v-if="isSniper">
            <FinalStage v-if="sniperFinal" :winner-name="sniperWinnerName" :scores="sniper.state.scores" @rematch="startSniper()" @menu="goMenu" />
            <SoundSniperStage
              v-else
              :state="sniper.state"
              :names="sniper.config.names"
              :rounds="sniper.config.rounds"
              :round="sniper.roundNumber.value"
              :seconds="sniper.config.seconds"
              :countdown="sniper.countdown.value"
              :time-remaining="sniper.timeRemaining.value"
              :timer-running="sniper.timerRunning.value"
              :paused="sniper.paused.value"
              :playing="sniper.player.playing.value"
              :plays="sniper.player.plays.value"
              :max-plays="sniper.player.maxPlays.value"
              :failed="sniper.player.failed.value"
              @begin="sniper.begin"
              @buzz="sniper.buzzIn"
              @undo="sniper.undo"
              @right="sniper.markRight"
              @wrong="sniper.markWrong"
              @replay="sniper.replay"
              @toggle-pause="sniper.togglePause"
              @skip="sniper.skip"
              @next="sniper.next"
            />
          </template>

          <CoinTossStage v-else-if="quiz.screen.value === 'toss'" :active-name="quiz.config.names[quiz.game.active]" :names="quiz.config.names" :round="quiz.roundNumber.value" :rounds="quiz.config.rounds" :ready="quiz.tossReady.value" :result="quiz.tossResult.value" @continue="quiz.continueFromToss" />

          <template v-else-if="quiz.screen.value === 'category' || quiz.screen.value === 'question' || quiz.screen.value === 'tie'">
            <Scoreboard v-if="quiz.screen.value === 'tie'" :names="quiz.config.names" :scores="quiz.game.scores" :active="quiz.game.active" :round="quiz.roundNumber.value" :rounds="quiz.config.rounds" :turn="quiz.game.turn" :per-round="quiz.config.perRound" :tie="true" />
            <CategoryBoard v-if="quiz.screen.value === 'category'" :tiles="visibleTiles" :active-name="quiz.config.names[quiz.game.active]" :names="quiz.config.names" :scores="quiz.game.scores" :history="quiz.game.history" :first="quiz.game.first" :round="quiz.roundNumber.value" :rounds="quiz.config.rounds" :per-round="quiz.config.perRound" :question-number="quiz.game.turn + 1" :question-count="quiz.questionCount.value" :preview-only="isCategoryPreview" @choose="quiz.chooseCategory" />
            <QuestionStage v-else-if="quiz.screen.value === 'question' && quiz.game.currentQuestion" :question="quiz.game.currentQuestion" :names="quiz.config.names" :scores="quiz.game.scores" :active-name="quiz.config.names[quiz.game.active]" :round="quiz.roundNumber.value" :rounds="quiz.config.rounds" :turn="quiz.game.turn" :per-round="quiz.config.perRound" :stolen="quiz.game.stolen" :revealed="quiz.game.revealed" :resolved="quiz.game.resolved" :result="quiz.game.result" :winner="quiz.game.winner" :selected-option="quiz.game.selectedOption" :wrong-options="quiz.game.wrongOptions" :time-expired="quiz.game.timeExpired" :time-remaining="quiz.timeRemaining.value" :time-limit="quiz.game.stolen && quiz.config.steal !== 'remaining' ? Number(quiz.config.steal) : quiz.config.seconds" :timer-running="quiz.timerRunning.value" :drink="quiz.config.drink" :winner-name="resolvedWinnerName" :estimate-guesses="quiz.game.estimateGuesses" @estimate="quiz.submitEstimate" @select="quiz.selectOption" @reveal="quiz.revealAnswer" @toggle-timer="toggleTimer" @reset-timer="quiz.resetTimer" @next="quiz.nextQuestion" />
            <TieBreaker v-else-if="quiz.screen.value === 'tie'" :names="quiz.config.names" :question="quiz.tieQuestion.value.question" :answer="quiz.tieQuestion.value.answer" @submit="quiz.submitTie" />
          </template>

          <FinalStage v-else-if="quiz.screen.value === 'final'" :winner-name="winnerName" :scores="quiz.game.scores" @rematch="quiz.startGame()" @menu="quiz.openMenu" />
        </GameScreenShell>
      </Transition>
    </main>

    <AppModal v-if="modal === 'rules' && mode === 'sniper'" title="Sound Sniper" @close="modal = null">
      <p>Ein Geräusch läuft, beide Teams hören zu. Wer es erkennt, haut auf den Buzzer, der Host drückt die Taste des Teams und das Team sagt die Antwort laut.</p>
      <p class="mt-4">Richtig: +1 Punkt, das andere Team trinkt. Falsch: Der Punkt geht sofort ans andere Team, das buzzernde Team trinkt. Niemand buzzert: keine Punkte. Kurze Sounds laufen bis zu zweimal, lange einmal. Bei Gleichstand entscheidet ein Extra-Sound.</p>
      <p class="mt-4 text-cream">Tastatur: Enter Sound starten / weiter · 1 oder A Team eins · 2 oder B Team zwei · R richtig · F falsch · W erneut abspielen · Leertaste Pause · S überspringen · Rückschritt Buzz zurücknehmen · Esc Menü</p>
    </AppModal>

    <AppModal v-else-if="modal === 'rules'" title="So wird gespielt" @close="modal = null">
      <p>Die Münze bestimmt das erste Team. Ihr wählt abwechselnd eine von sechs Kategorien. Der Host liest die Frage vor und bewertet die Antwort.</p>
      <p class="mt-4">Richtig: +1 Punkt. Falsch oder Zeit abgelaufen: Das andere Team bekommt eine Steal-Chance. Danach wird aufgelöst. Bei Gleichstand entscheidet eine Schätzfrage.</p>
      <p class="mt-4 text-cream">Tastatur: 1–4 oder A–D Antwort wählen · Z Antwort zeigen · R richtig · F falsch · Leertaste Pause / Start · Enter nächste Frage · Esc Menü</p>
    </AppModal>

    <AppModal v-if="modal === 'settings'" title="Host Settings" @close="modal = null">
      <p>Der Fragenkatalog enthält {{ quiz.totalQuestionCount.value }} Fragen. Bereits aufgelöste Fragen bleiben aus dem Pool, damit sich im nächsten Spiel nichts wiederholt.</p>
      <p class="mt-4 text-cream">{{ quiz.answeredQuestionCount.value }} von {{ quiz.totalQuestionCount.value }} Fragen beantwortet · {{ quiz.remainingQuestionCount.value }} noch offen.</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <button class="button-quiet" @click="quiz.config.motion = !quiz.config.motion; modal = null">Animationen: {{ quiz.config.motion ? 'an' : 'aus' }}</button>
        <button class="button-quiet" @click="quiz.config.drink = !quiz.config.drink; modal = null">Trinkregeln: {{ quiz.config.drink ? 'an' : 'aus' }}</button>
        <button class="button-quiet" @click="quiz.resetQuestionHistory(); modal = null">Fragenarchiv zurücksetzen</button>
      </div>
    </AppModal>

    <AppModal v-if="modal === 'new'" title="Neues Spiel?" @close="modal = null">
      <p>Der aktuelle Punktestand wird zurückgesetzt.</p>
      <button class="button-primary mt-7" @click="newGame({})">Neues Spiel starten</button>
    </AppModal>
  </div>
</template>
