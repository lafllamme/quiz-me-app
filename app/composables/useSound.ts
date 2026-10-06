type SoundName = 'menu' | 'select' | 'start' | 'tick' | 'right' | 'wrong' | 'steal' | 'end' | 'drum' | 'ring'
export type TrackName = 'startScreen' | 'tension' | 'categorySelection' | 'timeOver' | 'wrong' | 'correct'
export type MusicName = Extract<TrackName, 'startScreen' | 'tension' | 'categorySelection'>

const patterns: Record<SoundName, Array<[number, number, number, OscillatorType?]>> = {
  menu: [[350, 0, 0.08]],
  select: [[500, 0, 0.1], [750, 0.1, 0.15]],
  start: [[160, 0, 0.2], [320, 0.15, 0.18]],
  tick: [[850, 0, 0.07]],
  right: [[440, 0, 0.15], [554, 0.12, 0.15], [659, 0.24, 0.28]],
  wrong: [[180, 0, 0.2], [110, 0.15, 0.3]],
  steal: [[240, 0, 0.12], [480, 0.1, 0.12], [720, 0.2, 0.22]],
  end: [[330, 0, 0.18], [440, 0.16, 0.18], [554, 0.32, 0.18], [660, 0.48, 0.45]],
  drum: [[85, 0, 0.32, 'triangle']],
  ring: [[700, 0, 0.1], [950, 0.12, 0.1], [700, 0.24, 0.1], [950, 0.36, 0.18]],
}

const trackSources: Record<TrackName, string> = {
  startScreen: '/audio/start_screen.mp3',
  tension: '/audio/tension_45s.mp3',
  categorySelection: '/audio/category_selection.mp3',
  timeOver: '/audio/time_over.mp3',
  wrong: '/audio/wrong.mp3',
  correct: '/audio/correct.mp3',
}

// Audio elements live at module level so every caller shares them. Music is a single channel:
// starting one music track always stops the previous one, so two songs can never overlap.
const tracks = new Map<TrackName, HTMLAudioElement>()
let currentMusic: MusicName | null = null
let context: AudioContext | null = null

export function useSound() {
  const enabled = useState<boolean>('jungle-sound-enabled', () => true)
  const uiSfx = useUiSfx()

  function unlock() {
    if (import.meta.server || !enabled.value)
      return

    try {
      context ??= new window.AudioContext()
      void context.resume()
    }
    catch {
      context = null
    }
  }

  function getTrack(name: TrackName) {
    if (import.meta.server)
      return null

    let track = tracks.get(name)
    if (!track) {
      track = new Audio(trackSources[name])
      track.preload = 'auto'
      tracks.set(name, track)
    }
    return track
  }

  function playTrack(name: TrackName, loop = false) {
    if (!enabled.value)
      return

    const track = getTrack(name)
    if (!track)
      return

    track.pause()
    track.currentTime = 0
    track.loop = loop
    void track.play().catch(() => undefined)
  }

  function pauseTrack(name: TrackName) {
    getTrack(name)?.pause()
  }

  function resumeTrack(name: TrackName) {
    if (!enabled.value)
      return

    const track = getTrack(name)
    if (track)
      void track.play().catch(() => undefined)
  }

  function stopTrack(name: TrackName) {
    const track = getTrack(name)
    if (!track)
      return

    track.pause()
    track.currentTime = 0
  }

  function stopAllTracks() {
    tracks.forEach((track) => {
      track.pause()
      track.currentTime = 0
    })
  }

  /** Plays a music track exclusively. The same track keeps playing (or resumes) unless restart is set. */
  function playMusic(name: MusicName, options: { loop?: boolean, restart?: boolean } = {}) {
    if (currentMusic && currentMusic !== name)
      stopTrack(currentMusic)

    currentMusic = name
    if (!enabled.value)
      return

    const track = getTrack(name)
    if (!track)
      return

    track.loop = options.loop ?? true
    if (options.restart)
      track.currentTime = 0
    if (track.paused)
      void track.play().catch(() => undefined)
  }

  function pauseMusic() {
    if (currentMusic)
      pauseTrack(currentMusic)
  }

  /** Retries the current music, e.g. after the first user gesture unlocks autoplay. */
  function resumeMusic() {
    if (currentMusic)
      resumeTrack(currentMusic)
  }

  function stopMusic() {
    if (currentMusic)
      stopTrack(currentMusic)
    currentMusic = null
  }

  function tone(frequency: number, time: number, duration: number, type: OscillatorType = 'sine', volume = 0.16) {
    if (!context || !enabled.value)
      return

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = context.currentTime + time

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, start)
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(35, frequency * 0.65), start + duration)
    gain.gain.setValueAtTime(0.001, start)
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
  }

  function play(name: SoundName) {
    unlock()
    patterns[name].forEach(([frequency, time, duration, type]) => tone(frequency, time, duration, type, name === 'drum' ? 0.24 : 0.16))
  }

  function toggle() {
    enabled.value = !enabled.value
    uiSfx.setEnabled(enabled.value)
    if (enabled.value) {
      play('menu')
      resumeMusic()
    }
    else {
      stopAllTracks()
    }
  }

  return {
    enabled,
    play,
    playTrack,
    playMusic,
    pauseMusic,
    resumeMusic,
    stopMusic,
    pauseTrack,
    resumeTrack,
    stopTrack,
    stopAllTracks,
    toggle,
  }
}
