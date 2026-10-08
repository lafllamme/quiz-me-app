<script setup lang="ts">
import type { CoinFaceSpec, CoinFinish } from '~/lib/coin-face'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { coinEdgeMetal, loadCoinPortrait, loadCoinRuntime, paintCoinEdge, paintCoinFace } from '~/lib/coin-face'

const props = withDefaults(defineProps<{
  names: [string, string]
  result: 'kopf' | 'zahl'
  finish?: CoinFinish
}>(), { finish: 'gold' })

const emit = defineEmits<{ thrown: [], landed: [] }>()

const host = ref<HTMLDivElement>()
const failed = ref(false)

// Timeline in seconds. The game reveals the result after 2.4 s, so the coin
// has to be caught and settled before that.
const FLIGHT = 1.4
const SETTLE = 0.75
const SPINS = 5
const PEAK = 1.45
const RADIUS = 1
const THICKNESS = 0.11

let stop: (() => void) | undefined

onMounted(async () => {
  try {
    stop = await mountCoin()
  }
  catch {
    failed.value = true
    emit('landed')
  }
})

onBeforeUnmount(() => stop?.())

async function mountCoin() {
  const [[THREE, { RoomEnvironment }], portrait] = await Promise.all([
    loadCoinRuntime(),
    props.finish === 'bimetal-portrait' ? loadCoinPortrait() : undefined,
  ])
  const el = host.value
  if (!el)
    return

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NeutralToneMapping
  renderer.toneMappingExposure = 1
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  camera.position.set(0, 0.55, 7.2)
  camera.lookAt(0, 0.6, 0)

  const key = new THREE.DirectionalLight(0xFFF4D6, 1.6)
  key.position.set(-3, 4, 5)
  scene.add(key, new THREE.AmbientLight(0xFFFFFF, 0.25))

  const textures: InstanceType<typeof THREE.Texture>[] = []
  const texture = (canvas: HTMLCanvasElement, color: boolean) => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace
    t.anisotropy = renderer.capabilities.getMaxAnisotropy()
    t.center.set(0.5, 0.5)
    textures.push(t)
    return t
  }

  const faceMaterial = (spec: CoinFaceSpec, rotation: number) => {
    const map = texture(paintCoinFace(spec, 'color', props.finish), true)
    const bumpMap = texture(paintCoinFace(spec, 'height', props.finish), false)
    const metalnessMap = texture(paintCoinFace(spec, 'metal', props.finish), false)
    for (const t of [map, bumpMap, metalnessMap]) {
      t.rotation = rotation
      t.repeat.set(-1, -1)
    }
    return new THREE.MeshStandardMaterial({ map, bumpMap, metalnessMap, bumpScale: 2.2, metalness: 0.9, roughness: 0.34 })
  }

  const edgeMap = texture(paintCoinEdge('color', coinEdgeMetal(props.finish)), true)
  const edgeBump = texture(paintCoinEdge('height'), false)
  const materials = [
    new THREE.MeshStandardMaterial({ map: edgeMap, bumpMap: edgeBump, bumpScale: 1.5, metalness: 0.95, roughness: 0.3 }),
    faceMaterial({ team: props.names[0], side: 'Kopf', caption: 'TEAM 1 · BEGINNT BEI KOPF', numeral: '1', portrait }, -Math.PI / 2),
    faceMaterial({ team: props.names[1], side: 'Zahl', caption: 'TEAM 2 · BEGINNT BEI ZAHL', numeral: '2' }, Math.PI / 2),
  ]

  // Cylinder groups: 0 = side, 1 = top cap (+Y, Kopf), 2 = bottom cap (-Y, Zahl).
  const geometry = new THREE.CylinderGeometry(RADIUS, RADIUS, THICKNESS, 128, 1)
  const coin = new THREE.Mesh(geometry, materials)
  const pivot = new THREE.Group()
  pivot.add(coin)
  scene.add(pivot)

  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = shadowCanvas.height = 128
  const sctx = shadowCanvas.getContext('2d')!
  const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  sg.addColorStop(0, 'rgba(0,0,0,0.55)')
  sg.addColorStop(1, 'rgba(0,0,0,0)')
  sctx.fillStyle = sg
  sctx.fillRect(0, 0, 128, 128)
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: texture(shadowCanvas, false), transparent: true, depthWrite: false })
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.7), shadowMaterial)
  shadow.position.set(0, -1.2, 0)
  scene.add(shadow)

  // Resting pose: the coin stands upright, Kopf (+Y) facing the camera.
  // Flipping turns around the horizontal X axis; Zahl needs an extra half turn.
  const restAngle = Math.PI / 2 + (props.result === 'zahl' ? Math.PI : 0)
  const startAngle = restAngle - SPINS * Math.PI * 2

  const pose = (t: number) => {
    let y = 0
    let flip = restAngle
    let wobble = 0
    let yaw = 0

    if (t < FLIGHT) {
      const p = t / FLIGHT
      y = PEAK * 4 * p * (1 - p)
      // Spin slows down slightly towards the catch so the face is readable.
      flip = startAngle + (restAngle - startAngle) * (1 - (1 - p) ** 1.6)
      yaw = 0.42 * Math.sin(p * Math.PI)
    }
    else {
      const s = Math.min((t - FLIGHT) / SETTLE, 1)
      const decay = Math.exp(-5 * s)
      // A short dip on the catch, then a damped wobble around the rest pose.
      y = -0.12 * decay * Math.sin(s * Math.PI * 2.4)
      wobble = 0.16 * decay * Math.sin(s * Math.PI * 4.5)
      flip = restAngle + 0.1 * decay * Math.cos(s * Math.PI * 4.5)
    }

    pivot.position.y = y
    pivot.rotation.set(0, yaw, wobble)
    coin.rotation.set(flip, 0, 0)
    const lift = Math.max(y, 0) / PEAK
    shadow.scale.setScalar(1 - lift * 0.45)
    shadowMaterial.opacity = 1 - lift * 0.7
  }

  const render = () => renderer.render(scene, camera)
  const resize = () => {
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height)
      return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    render()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(el)
  resize()

  let frame = 0
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    pose(FLIGHT + SETTLE)
    render()
    emit('landed')
  }
  else {
    emit('thrown')
    const started = performance.now()
    const tick = (now: number) => {
      const t = (now - started) / 1000
      pose(t)
      render()
      if (t < FLIGHT + SETTLE)
        frame = requestAnimationFrame(tick)
      else
        emit('landed')
    }
    frame = requestAnimationFrame(tick)
  }

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    geometry.dispose()
    shadow.geometry.dispose()
    shadowMaterial.dispose()
    materials.forEach(m => m.dispose())
    textures.forEach(t => t.dispose())
    envMap.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
</script>

<template>
  <div class="toss-coin" role="img" :aria-label="`Münzwurf. Kopf: ${names[0]}, Zahl: ${names[1]}`">
    <div v-if="!failed" ref="host" class="toss-coin__canvas" />
    <div v-else class="coin-toss-token coin-toss-token--settled" :class="{ 'coin-toss-token--zahl': result === 'zahl' }">
      <span class="coin-toss-token__face">KOPF</span>
      <span class="coin-toss-token__back">ZAHL</span>
    </div>
  </div>
</template>
