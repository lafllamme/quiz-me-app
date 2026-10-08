import { computed, ref } from 'vue'
import { maxPlaysFor } from '~/lib/sniper-machine'

/**
 * The one audio element Sound Sniper plays through. It knows nothing about teams or points:
 * it loads a file, reads its real length from the metadata, and counts how often it was heard.
 * One element means one sound at a time; a replay always restarts the same element.
 */
export function useSniperPlayer() {
  let audio: HTMLAudioElement | null = null
  let prefetch: HTMLAudioElement | null = null

  const playing = ref(false)
  const duration = ref<number | null>(null)
  const plays = ref(0)
  const failed = ref(false)
  const maxPlays = computed(() => maxPlaysFor(duration.value))
  const canPlay = computed(() => !playing.value && plays.value < maxPlays.value)

  const onPlaying = () => { playing.value = true }
  const onStopped = () => { playing.value = false }
  const onMetadata = () => {
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0)
      duration.value = audio.duration
  }
  const onError = () => {
    playing.value = false
    failed.value = true
  }

  function element() {
    if (import.meta.server)
      return null
    if (!audio) {
      audio = new Audio()
      audio.preload = 'auto'
      audio.addEventListener('playing', onPlaying)
      audio.addEventListener('pause', onStopped)
      audio.addEventListener('ended', onStopped)
      audio.addEventListener('loadedmetadata', onMetadata)
      audio.addEventListener('error', onError)
    }
    return audio
  }

  /** Swaps in a new sound. The stored duration only bridges the gap until the metadata arrives. */
  function load(src: string, knownDuration?: number) {
    const target = element()
    if (!target)
      return
    target.pause()
    playing.value = false
    plays.value = 0
    failed.value = false
    duration.value = knownDuration ?? null
    target.src = src
    target.load()
  }

  /**
   * Plays from the start. A counted play spends one of the allowed listens; the replay on the
   * reveal screen is free. Returns false when nothing started.
   */
  function play(counted = true) {
    const target = element()
    if (!target || !target.src || playing.value)
      return false
    if (counted && plays.value >= maxPlays.value)
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

  /** Warms the browser cache for the next sound so it starts without a gap. */
  function preload(src: string) {
    if (import.meta.server)
      return
    prefetch ??= new Audio()
    prefetch.preload = 'auto'
    prefetch.src = src
    prefetch.load()
  }

  function dispose() {
    if (audio) {
      audio.pause()
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onStopped)
      audio.removeEventListener('ended', onStopped)
      audio.removeEventListener('loadedmetadata', onMetadata)
      audio.removeEventListener('error', onError)
      audio.removeAttribute('src')
      audio.load()
      audio = null
    }
    if (prefetch) {
      prefetch.removeAttribute('src')
      prefetch.load()
      prefetch = null
    }
    playing.value = false
    plays.value = 0
  }

  return { playing, duration, plays, maxPlays, canPlay, failed, load, play, pause, resume, stop, preload, dispose }
}
