import { bindUISFX, createUISFX, type CueName, type UISFXBinding, type UISFXPlayer } from 'uisfx'

const SOUND_STATE_KEY = 'jungle-sound-enabled'
let player: UISFXPlayer | null = null
let binding: UISFXBinding | null = null

export function useUiSfx() {
  const enabled = useState<boolean>(SOUND_STATE_KEY, () => true)

  function getPlayer() {
    if (import.meta.server)
      return null

    player ??= createUISFX({
      pack: 'minimal',
      volume: 0.22,
      enabled: enabled.value,
      preferences: { key: 'jungle-quiz:ui-sfx' },
    })

    return player
  }

  function mount() {
    if (import.meta.server || binding)
      return

    const ui = getPlayer()
    if (ui)
      binding = bindUISFX(document, { player: ui })
  }

  function play(cue: CueName) {
    if (!enabled.value)
      return

    getPlayer()?.play(cue)
  }

  function setEnabled(value: boolean) {
    enabled.value = value
    getPlayer()?.setEnabled(value)
  }

  function destroy() {
    binding?.unbind()
    binding = null
    void player?.destroy()
    player = null
  }

  return {
    enabled,
    mount,
    play,
    setEnabled,
    destroy,
  }
}
