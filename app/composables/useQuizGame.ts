import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { TIE_QUESTIONS, type QuizQuestion } from '~/data/quiz-catalog'
import { useQuestionDeck } from '~/composables/useQuestionDeck'
import type { DifficultyMode } from '~/types/setup'

export type GameScreen = 'menu' | 'toss' | 'category' | 'question' | 'tie' | 'final'
export type StealMode = 'remaining' | '15' | '20'

export interface QuizConfig {
  names: [string, string]
  players: [string, string]
  rounds: number
  seconds: number
  difficulty: DifficultyMode
  perRound: number
  steal: StealMode
  motion: boolean
  drink: boolean
}

interface GameState {
  scores: [number, number]
  turn: number
  first: 0 | 1
  active: 0 | 1
  used: string[]
  categories: string[]
  currentQuestion: QuizQuestion | null
  selectedOption: number | null
  timeExpired: boolean
  stolen: boolean
  revealed: boolean
  resolved: boolean
  winner: 0 | 1 | null
  result: string
}

const defaultConfig: QuizConfig = {
  names: ['TEAM ONE', 'TEAM TWO'],
  players: ['', ''],
  rounds: 5,
  seconds: 45,
  difficulty: 'mixed',
  perRound: 2,
  steal: '15',
  motion: true,
  drink: false,
}

const emptyGame = (): GameState => ({
  scores: [0, 0],
  turn: 0,
  first: 0,
  active: 0,
  used: [],
  categories: [],
  currentQuestion: null,
  selectedOption: null,
  timeExpired: false,
  stolen: false,
  revealed: false,
  resolved: false,
  winner: null,
  result: '',
})

export function useQuizGame() {
  const sound = useSound()
  const deck = useQuestionDeck()
  const screen = ref<GameScreen>('menu')
  const config = reactive<QuizConfig>(structuredClone(defaultConfig))
  const game = reactive<GameState>(emptyGame())
  const timeRemaining = ref(defaultConfig.seconds)
  const timerRunning = ref(false)
  const hasSavedGame = ref(false)
  const tieIndex = ref(0)
  let timer: number | undefined
  let tossTimeout: number | undefined

  const questionCount = computed(() => config.rounds * config.perRound)
  const roundNumber = computed(() => Math.floor(game.turn / config.perRound) + 1)
  const availableQuestions = computed(() => deck.getAvailableQuestions(game.used))
  const catalogExhausted = computed(() => deck.isExhausted.value)
  const tieQuestion = computed(() => TIE_QUESTIONS[tieIndex.value % TIE_QUESTIONS.length] ?? { question: '', answer: 0 })

  function persist() {
    if (import.meta.server)
      return

    localStorage.setItem('jungle-settings', JSON.stringify(config))
    if (screen.value !== 'menu' || game.turn > 0)
      localStorage.setItem('jungle-game', JSON.stringify({ ...game, screen: screen.value }))
  }

  function hydrate() {
    try {
      const savedConfig = JSON.parse(localStorage.getItem('jungle-settings') || 'null')
      if (savedConfig)
        Object.assign(config, savedConfig)

      const savedGame = JSON.parse(localStorage.getItem('jungle-game') || 'null')
      if (savedGame?.used && savedGame?.scores) {
        Object.assign(game, savedGame)
        // A refresh must always return to the setup screen. The saved game stays
        // available behind the explicit “Spiel fortsetzen” action.
        screen.value = 'menu'
        hasSavedGame.value = true
      }
    }
    catch {
      // Local storage is optional; a fresh session is a valid state.
    }

    if (screen.value === 'menu')
      sound.playTrack('startScreen', true)
  }

  function stopTimer() {
    if (timer)
      window.clearInterval(timer)
    timer = undefined
    timerRunning.value = false
  }

  function startTimer() {
    if (screen.value !== 'question' || game.resolved || game.revealed || timeRemaining.value <= 0 || timerRunning.value)
      return

    sound.resumeTrack('tension')
    timerRunning.value = true
    timer = window.setInterval(() => {
      timeRemaining.value = Math.max(0, timeRemaining.value - 0.1)
      const seconds = Math.ceil(timeRemaining.value)
      if (seconds <= 5 && seconds > 0 && Math.abs(timeRemaining.value - seconds) < 0.06)
        sound.play('tick')
      if (timeRemaining.value <= 0) {
        stopTimer()
        markWrong(true)
      }
    }, 100)
  }

  function pauseTimer() {
    stopTimer()
    sound.pauseTrack('tension')
  }

  function resetTimer() {
    if (game.timeExpired)
      return
    pauseTimer()
    timeRemaining.value = game.stolen && config.steal !== 'remaining' ? Number(config.steal) : config.seconds
    startTimer()
  }

  function openMenu() {
    stopTimer()
    sound.stopAllTracks()
    screen.value = 'menu'
    sound.playTrack('startScreen', true)
    if (catalogExhausted.value) {
      hasSavedGame.value = false
      if (!import.meta.server)
        localStorage.removeItem('jungle-game')
    }
    else {
      persist()
    }
  }

  function startGame(nextConfig?: Partial<QuizConfig>) {
    if (nextConfig)
      Object.assign(config, nextConfig)

    if (deck.isExhausted.value) {
      hasSavedGame.value = false
      screen.value = 'menu'
      if (!import.meta.server)
        localStorage.removeItem('jungle-game')
      return
    }

    stopTimer()
    sound.stopTrack('startScreen')
    Object.assign(game, emptyGame())
    game.first = Math.random() < 0.5 ? 0 : 1
    game.active = game.first
    hasSavedGame.value = false
    screen.value = 'toss'
    sound.play('ring')
    persist()

    if (tossTimeout)
      window.clearTimeout(tossTimeout)
    tossTimeout = window.setTimeout(() => {
      if (screen.value !== 'toss')
        return
      screen.value = 'category'
      prepareCategories()
      sound.play('drum')
      persist()
    }, 1100)
  }

  function resumeGame() {
    if (!game.used.length && screen.value === 'menu') {
      startGame()
      return
    }
    screen.value = game.currentQuestion && !game.resolved ? 'question' : 'category'
    if (screen.value === 'question') {
      timeRemaining.value = config.seconds
      void nextTick(startTimer)
    }
  }

  function prepareCategories() {
    const categories = deck.getAvailableCategories(game.used)
    game.categories = categories.sort(() => Math.random() - 0.5).slice(0, 6)
    game.active = ((game.first + game.turn) % 2) as 0 | 1
    game.currentQuestion = null
    game.selectedOption = null
    game.timeExpired = false
    game.stolen = false
    game.revealed = false
    game.resolved = false
    game.winner = null
    game.result = ''

    if (!game.categories.length) {
      finish()
      return
    }

    screen.value = 'category'
    sound.playTrack('categorySelection', true)
    persist()
  }

  function chooseCategory(category: string) {
    const question = deck.pickQuestion(category, config.difficulty, game.used)
    if (!question)
      return
    sound.stopTrack('categorySelection')
    game.currentQuestion = question
    game.selectedOption = null
    game.timeExpired = false
    if (!game.used.includes(question.id))
      game.used.push(question.id)
    game.stolen = false
    game.revealed = false
    game.resolved = false
    game.winner = null
    game.result = ''
    timeRemaining.value = config.seconds
    screen.value = 'question'
    sound.play('select')
    persist()
    void nextTick(startTimer)
  }

  function resolve(winner: 0 | 1 | null, result: string) {
    pauseTimer()
    sound.stopTrack('tension')
    game.resolved = true
    game.winner = winner
    game.result = result
    if (game.currentQuestion)
      deck.markAnswered(game.currentQuestion.id)
    if (winner !== null)
      game.scores[winner]++
    persist()
  }

  function markCorrect() {
    if (screen.value !== 'question' || game.resolved)
      return
    sound.playTrack('correct')
    resolve(game.active, `${config.names[game.active]} bekommt +1 Punkt.`)
  }

  function markWrong(timeout = false) {
    if (screen.value !== 'question' || game.resolved)
      return

    sound.stopTrack('tension')
    sound.playTrack(timeout ? 'timeOver' : 'wrong')

    if (timeout) {
      game.timeExpired = true
      game.result = 'Zeit abgelaufen. Wähle jetzt eine Antwort.'
      persist()
      return
    }

    if (game.timeExpired) {
      resolve(null, 'Zeit abgelaufen. Kein Punkt.')
      return
    }

    if (!game.stolen && !game.revealed) {
      pauseTimer()
      game.stolen = true
      game.active = (1 - game.active) as 0 | 1
      timeRemaining.value = config.steal === 'remaining' ? Math.max(0, timeRemaining.value) : Number(config.steal)
      sound.play('steal')
      if (timeRemaining.value > 0) {
        persist()
        void nextTick(startTimer)
        return
      }
    }

    resolve(null, timeout ? 'Zeit abgelaufen. Kein Punkt.' : 'Kein Punkt für diese Frage.')
  }

  function selectOption(index: number) {
    if (screen.value !== 'question' || game.resolved || game.revealed || !game.currentQuestion)
      return

    game.selectedOption = index
    if (index === game.currentQuestion.correctIndex)
      markCorrect()
    else
      markWrong()
  }

  function revealAnswer() {
    if (screen.value !== 'question' || game.resolved)
      return
    pauseTimer()
    sound.stopTrack('tension')
    game.revealed = true
    resolve(null, 'Antwort aufgedeckt. Kein Punkt.')
  }

  function nextQuestion() {
    if (screen.value !== 'question' || !game.resolved)
      return

    game.turn++
    if (game.turn >= questionCount.value) {
      if (game.scores[0] === game.scores[1]) {
        screen.value = 'tie'
        tieIndex.value = 0
        sound.play('steal')
      }
      else {
        finish()
      }
      persist()
      return
    }

    prepareCategories()
  }

  function submitTie(guesses: [number, number]) {
    const distances = guesses.map(guess => Math.abs(guess - tieQuestion.value.answer)) as [number, number]
    if (distances[0] === distances[1]) {
      tieIndex.value++
      return { tied: true, answer: tieQuestion.value.answer }
    }

    game.scores[distances[0] < distances[1] ? 0 : 1]++
    finish()
    return { tied: false, answer: tieQuestion.value.answer }
  }

  function finish() {
    stopTimer()
    screen.value = 'final'
    sound.play('end')
    persist()
  }

  function unlockAmbientSound() {
    if (screen.value === 'menu')
      sound.resumeTrack('startScreen')
    else if (screen.value === 'category')
      sound.resumeTrack('categorySelection')
  }

  function newGame() {
    startGame()
  }

  onMounted(() => {
    deck.hydrate()
    hydrate()
    window.addEventListener('pointerdown', unlockAmbientSound, { passive: true })
    window.addEventListener('keydown', unlockAmbientSound)
  })
  onBeforeUnmount(() => {
    stopTimer()
    if (tossTimeout)
      window.clearTimeout(tossTimeout)
    window.removeEventListener('pointerdown', unlockAmbientSound)
    window.removeEventListener('keydown', unlockAmbientSound)
  })

  return {
    config,
    game,
    screen,
    sound,
    timeRemaining,
    timerRunning,
    hasSavedGame,
    questionCount,
    roundNumber,
    availableQuestions,
    answeredQuestionCount: deck.answeredCount,
    remainingQuestionCount: deck.remainingCount,
    totalQuestionCount: deck.totalCount,
    catalogExhausted,
    tieQuestion,
    openMenu,
    startGame,
    resumeGame,
    newGame,
    chooseCategory,
    markCorrect,
    markWrong,
    selectOption,
    revealAnswer,
    nextQuestion,
    pauseTimer,
    startTimer,
    resetTimer,
    submitTie,
    resetQuestionHistory: deck.resetHistory,
  }
}
