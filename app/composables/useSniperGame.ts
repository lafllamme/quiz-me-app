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
  revealAnswer,
  startCountdown,
  undoBuzz,
  type SniperRecord,
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
// The countdown cue has an accented beat every 0.8 s and goes quiet at 3.2 s. The digits
// 3 · 2 · 1 · Los follow those beats and the sound starts as the cue ends.
const COUNTDOWN_CUE = '/audio/countdown_start.mp3'
const COUNTDOWN_BEATS_MS = [800, 1600, 2400]
const COUNTDOWN_END_MS = 3250

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
  // Drawn one sound ahead so its file is already buffered when the host moves on.
  let upcoming: NonNullable<SniperState['current']> | null = null
  let timer: number | undefined
  let countdownTimers: number[] = []
  let countdownCue: HTMLAudioElement | null = null
  // Bumped whenever timers are cleared, so a cue that starts late cannot schedule a stale countdown.
  let countdownRun = 0

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

  function cue() {
    if (import.meta.server)
      return null
    if (!countdownCue) {
      countdownCue = new Audio(COUNTDOWN_CUE)
      countdownCue.preload = 'auto'
    }
    return countdownCue
  }

  function clearTimers() {
    if (timer)
      window.clearInterval(timer)
    countdownTimers.forEach(id => window.clearTimeout(id))
    timer = undefined
    countdownTimers = []
    countdownRun++
    timerRunning.value = false
    countdown.value = 0
    countdownCue?.pause()
  }

  function remember(id: string) {
    if (!archive.includes(id))
      archive.push(id)
  }

  function present(next: NonNullable<SniperState['current']>) {
    loadSound(state, next)
    player.load(next.src)
    timeRemaining.value = config.seconds
    paused.value = false
    sound.playMusic('categorySelection')
  }

  function draw(extra: SniperRecord[] = []) {
    const inGame = new Set(state.played)
    const history = [...state.history, ...extra]
    let next = pickSound(pool.value, new Set([...archive, ...inGame]), history)
    if (!next) {
      archive = archive.filter(id => inGame.has(id))
      next = pickSound(pool.value, inGame, history)
    }
    return next
  }

  /** Picks the sound after the current one and buffers its file in the background. */
  function planUpcoming() {
    const current = state.current
    upcoming = current ? draw([{ soundId: current.id, category: current.category, buzzer: null, winner: null, outcome: 'timeout' }]) : null
    if (upcoming)
      player.preload(upcoming.src)
  }

  /** Draws the next sound; when the selected pool is used up the archive starts over. */
  function drawNext() {
    const planned = upcoming
    const usable = planned && !state.played.includes(planned.id) && config.categories.includes(planned.category)
    const next = usable ? planned : draw()
    if (!next)
      return false
    present(next)
    planUpcoming()
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
    upcoming = null
    cue()?.load()
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
    if (state.current) {
      present(state.current)
      planUpcoming()
    }
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

  /** Enter on the ready screen: the cue plays 3 · 2 · 1 · Los, then the sound and the clock start together. */
  function begin() {
    if (!startCountdown(state))
      return
    sound.stopMusic()
    countdown.value = 3
    const run = ++countdownRun

    // The digits are scheduled once the cue really plays, so a slow start cannot put them off beat.
    const schedule = () => {
      if (run !== countdownRun || state.phase !== 'countdown' || countdownTimers.length)
        return
      COUNTDOWN_BEATS_MS.forEach((at, index) => {
        countdownTimers.push(window.setTimeout(() => { countdown.value = 2 - index }, at))
      })
      countdownTimers.push(window.setTimeout(() => {
        countdownTimers = []
        if (openListening(state)) {
          player.play()
          startTimer()
        }
      }, COUNTDOWN_END_MS))
    }

    const audio = sound.enabled.value ? cue() : null
    if (!audio) {
      schedule()
      return
    }
    audio.currentTime = 0
    audio.volume = 1
    void audio.play().then(schedule, schedule)
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

  /** While listening this spends a listen and leaves the clock alone; once the solution is out it is free. */
  function replay() {
    if (state.phase === 'listening') {
      if (player.play() && paused.value)
        startTimer()
    }
    else if (state.phase === 'resolved' || (state.phase === 'buzzed' && state.revealed)) {
      player.play(false)
    }
  }

  /** Uncovers the solution once the buzzing team has answered out loud. */
  function reveal() {
    if (revealAnswer(state)) {
      sound.play('drum')
      persist()
    }
  }

  /** A team key opens the answer; the same key again uncovers the solution. */
  function buzzIn(team: Team) {
    if (state.phase === 'buzzed' && state.buzzer === team) {
      reveal()
      return
    }
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
    countdownCue?.removeAttribute('src')
    countdownCue = null
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
    reveal,
    undo,
    markRight: () => settle(true),
    markWrong: () => settle(false),
    skip,
    next,
    leave,
  }
}
