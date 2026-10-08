import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { sniperSounds } from '~/data/sniper-sounds'
import { SNIPER_CATEGORIES, type SniperCategoryId } from '~/data/sniper-sounds.types'
import {
  advance,
  buzz,
  canSkip,
  emptySniperState,
  expire,
  judge,
  loadSound,
  openListening,
  pickSound,
  startCountdown,
  undoBuzz,
  type SniperState,
  type Team,
} from '~/lib/sniper-machine'

export interface SniperConfig {
  names: [string, string]
  rounds: number
  seconds: number
  categories: SniperCategoryId[]
}

/** Like the quiz: one round is one sound for each side of the duel. */
export const SNIPER_SOUNDS_PER_ROUND = 2
export const SNIPER_ROUND_OPTIONS = [3, 5, 7]
export const SNIPER_SECOND_OPTIONS = [10, 15, 20]
const COUNTDOWN_STEP_MS = 800

const SETTINGS_KEY = 'jungle-sniper-settings'
const GAME_KEY = 'jungle-sniper-game'
// Sounds heard in earlier games; they come back only once the selected pool is used up.
const ARCHIVE_KEY = 'jungle-sniper-archive'

const defaultConfig = (): SniperConfig => ({
  names: ['TEAM ONE', 'TEAM TWO'],
  rounds: 5,
  seconds: 15,
  categories: SNIPER_CATEGORIES.map(category => category.id),
})

export function soundCountFor(categories: SniperCategoryId[]) {
  return sniperSounds.filter(sound => categories.includes(sound.category)).length
}

export function useSniperGame() {
  const sound = useSound()
  const player = useSniperPlayer()
  const config = reactive<SniperConfig>(defaultConfig())
  const state = reactive<SniperState>(emptySniperState())
  const countdown = ref(0)
  const timeRemaining = ref(config.seconds)
  const timerRunning = ref(false)
  const paused = ref(false)
  const hasSavedGame = ref(false)
  let archive: string[] = []
  let timer: number | undefined
  let countdownTimer: number | undefined

  const pool = computed(() => sniperSounds.filter(item => config.categories.includes(item.category)))
  const roundNumber = computed(() => Math.min(Math.floor(state.index / SNIPER_SOUNDS_PER_ROUND) + 1, config.rounds))

  function persist() {
    if (import.meta.server)
      return
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(config))
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive))
    if (state.phase === 'final' || !state.current)
      localStorage.removeItem(GAME_KEY)
    else
      localStorage.setItem(GAME_KEY, JSON.stringify(state))
  }

  function hydrate() {
    try {
      const savedConfig = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null')
      if (savedConfig)
        Object.assign(config, savedConfig)
      archive = JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]')
      const savedGame = JSON.parse(localStorage.getItem(GAME_KEY) || 'null')
      if (savedGame?.current && savedGame.phase !== 'final') {
        Object.assign(state, savedGame)
        hasSavedGame.value = true
      }
    }
    catch {
      // Local storage is optional; a fresh session is a valid state.
    }
  }

  function clearTimers() {
    if (timer)
      window.clearInterval(timer)
    if (countdownTimer)
      window.clearInterval(countdownTimer)
    timer = undefined
    countdownTimer = undefined
    timerRunning.value = false
    countdown.value = 0
  }

  function remember(id: string) {
    if (!archive.includes(id))
      archive.push(id)
  }

  function present(next: NonNullable<SniperState['current']>) {
    loadSound(state, next)
    player.load(next.src, next.durationSeconds)
    timeRemaining.value = config.seconds
    paused.value = false
    sound.playMusic('categorySelection')
  }

  /** Draws the next sound; when the selected pool is used up the archive starts over. */
  function drawNext() {
    const inGame = new Set(state.played)
    let next = pickSound(pool.value, new Set([...archive, ...inGame]), state.history)
    if (!next) {
      archive = archive.filter(id => inGame.has(id))
      next = pickSound(pool.value, inGame, state.history)
    }
    if (!next)
      return false
    present(next)
    persist()
    return true
  }

  function finish() {
    clearTimers()
    player.stop()
    state.phase = 'final'
    sound.stopMusic()
    sound.play('end')
    hasSavedGame.value = false
    persist()
  }

  function start(next?: Partial<SniperConfig>) {
    if (next)
      Object.assign(config, next)
    clearTimers()
    player.stop()
    Object.assign(state, emptySniperState(config.rounds * SNIPER_SOUNDS_PER_ROUND))
    hasSavedGame.value = false
    if (!drawNext()) {
      finish()
      return false
    }
    return true
  }

  /** Picks a saved game up at the start of its current sound; a resolved sound moves on. */
  function resume() {
    clearTimers()
    hasSavedGame.value = false
    if (state.phase === 'resolved') {
      next()
      return
    }
    if (state.current)
      present(state.current)
  }

  function startTimer() {
    if (state.phase !== 'listening' || timerRunning.value || timeRemaining.value <= 0)
      return
    timerRunning.value = true
    paused.value = false
    timer = window.setInterval(() => {
      timeRemaining.value = Math.max(0, timeRemaining.value - 0.1)
      const seconds = Math.ceil(timeRemaining.value)
      // The last five seconds tick, but never over the sound the teams are listening to.
      if (seconds <= 5 && seconds > 0 && Math.abs(timeRemaining.value - seconds) < 0.06 && !player.playing.value)
        sound.play('tick')
      if (timeRemaining.value <= 0)
        timeUp()
    }, 100)
  }

  function stopTimer() {
    if (timer)
      window.clearInterval(timer)
    timer = undefined
    timerRunning.value = false
  }

  /** Enter on the ready screen: 3 · 2 · 1, then the sound and the clock start together. */
  function begin() {
    if (!startCountdown(state))
      return
    sound.stopMusic()
    countdown.value = 3
    sound.play('tick')
    countdownTimer = window.setInterval(() => {
      countdown.value--
      if (countdown.value > 0) {
        sound.play('tick')
        return
      }
      window.clearInterval(countdownTimer)
      countdownTimer = undefined
      if (openListening(state)) {
        player.play()
        startTimer()
      }
    }, COUNTDOWN_STEP_MS)
  }

  function togglePause() {
    if (state.phase !== 'listening')
      return
    if (timerRunning.value) {
      stopTimer()
      player.pause()
      paused.value = true
    }
    else {
      startTimer()
      player.resume()
    }
  }

  /** While listening this spends a listen and leaves the clock alone; after the reveal it is free. */
  function replay() {
    if (state.phase === 'listening') {
      if (player.play() && paused.value)
        startTimer()
    }
    else if (state.phase === 'resolved') {
      player.play(false)
    }
  }

  function buzzIn(team: Team) {
    if (!buzz(state, team))
      return
    player.pause()
    stopTimer()
    sound.play('steal')
    persist()
  }

  function undo() {
    if (!undoBuzz(state))
      return
    startTimer()
    player.resume()
  }

  function settle(correct: boolean) {
    if (!judge(state, correct))
      return
    player.stop()
    sound.playTrack(correct ? 'correct' : 'wrong')
    if (state.current)
      remember(state.current.id)
    persist()
  }

  function timeUp() {
    stopTimer()
    if (!expire(state))
      return
    player.stop()
    sound.playTrack('timeOver')
    if (state.current)
      remember(state.current.id)
    persist()
  }

  function skip() {
    if (!canSkip(state))
      return
    clearTimers()
    player.stop()
    if (state.current)
      remember(state.current.id)
    if (!drawNext())
      finish()
  }

  function next() {
    const result = advance(state)
    if (!result)
      return
    if (result === 'final' || !drawNext())
      finish()
  }

  /** Leaving for the menu keeps the game for “Spiel fortsetzen”. */
  function leave() {
    clearTimers()
    player.stop()
    hasSavedGame.value = state.phase !== 'final' && !!state.current
    persist()
  }

  onMounted(hydrate)
  onBeforeUnmount(() => {
    clearTimers()
    player.dispose()
  })

  return {
    config,
    state,
    player,
    pool,
    countdown,
    timeRemaining,
    timerRunning,
    paused,
    hasSavedGame,
    roundNumber,
    start,
    resume,
    begin,
    togglePause,
    replay,
    buzzIn,
    undo,
    markRight: () => settle(true),
    markWrong: () => settle(false),
    skip,
    next,
    leave,
  }
}
