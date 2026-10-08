import { computed, ref } from 'vue'
import { MAX_PLAYS } from '~/lib/sniper-machine'

/**
 * The audio element Sound Sniper plays through, plus a spare one that buffers the next sound.
 * It knows nothing about teams or points: it loads a file and counts how often it was heard. Only the element on stage ever plays, so two
 * sounds can never overlap; a replay always restarts that element.
 */
export function useSniperPlayer() {
  let audio: HTMLAudioElement | null = null
  let prefetch: HTMLAudioElement | null = null

  const playing = ref(false)
  const plays = ref(0)
  const failed = ref(false)
  const maxPlays = MAX_PLAYS
  const canPlay = computed(() => !playing.value && plays.value < maxPlays)

  // Both elements share the listeners; only events from the element on stage count.
  const onStage = (event: Event) => event.target === audio
  const onPlaying = (event: Event) => {
    if (onStage(event))
      playing.value = true
  }
  const onStopped = (event: Event) => {
    if (onStage(event))
      playing.value = false
  }
  const onError = (event: Event) => {
    if (!onStage(event))
      return
    playing.value = false
    failed.value = true
  }
  const events: [string, (event: Event) => void][] = [['playing', onPlaying], ['pause', onStopped], ['ended', onStopped], ['error', onError]]

  function create() {
    const created = new Audio()
    created.preload = 'auto'
    events.forEach(([name, handler]) => created.addEventListener(name, handler))
    return created
  }

  function element() {
    if (import.meta.server)
      return null
    audio ??= create()
    return audio
  }

  const sameSource = (target: HTMLAudioElement | null, src: string) => !!target?.src && new URL(src, location.href).href === target.src

  /** Puts a sound on stage with a fresh set of listens. */
  function load(src: string) {
    const current = element()
    if (!current)
      return
    current.pause()
    playing.value = false
    plays.value = 0
    failed.value = false

    // The spare already buffered this file: swap it on stage instead of downloading again.
    if (prefetch && sameSource(prefetch, src)) {
      audio = prefetch
      prefetch = current
      failed.value = !!audio.error
      return
    }
    current.src = src
    current.load()
  }

  /**
   * Plays from the start. A counted play spends one of the allowed listens; the replay on the
   * reveal screen is free. Returns false when nothing started.
   */
  function play(counted = true) {
    const target = element()
    if (!target || !target.src || playing.value)
      return false
    if (counted && plays.value >= maxPlays)
      return false
    if (counted)
      plays.value++
    target.currentTime = 0
    playing.value = true
    void target.play().catch(() => { playing.value = false })
    return true
  }

  function pause() {
    audio?.pause()
  }

  /** Continues an interrupted play without spending another listen. */
  function resume() {
    if (!audio || playing.value || audio.ended || audio.currentTime === 0)
      return
    playing.value = true
    void audio.play().catch(() => { playing.value = false })
  }

  function stop() {
    if (!audio)
      return
    audio.pause()
    audio.currentTime = 0
  }

  /** Buffers the next sound on the spare element so it starts without a gap. */
  function preload(src: string) {
    if (import.meta.server)
      return
    prefetch ??= create()
    if (sameSource(prefetch, src))
      return
    prefetch.src = src
    prefetch.load()
  }

  function dispose() {
    for (const target of [audio, prefetch]) {
      if (!target)
        continue
      target.pause()
      events.forEach(([name, handler]) => target.removeEventListener(name, handler))
      target.removeAttribute('src')
      target.load()
    }
    audio = null
    prefetch = null
    playing.value = false
    plays.value = 0
  }

  return { playing, plays, maxPlays, canPlay, failed, load, play, pause, resume, stop, preload, dispose }
}
