// Canvas painters for the 3D toss coin. Every face is drawn twice: once in
// colour (albedo map) and once in grey levels (bump map), so engraved parts
// catch the light in WebGL.

export type CoinFaceSpec = {
  team: string
  side: string
  caption: string
}

type Paint = {
  field: string | CanvasGradient
  rim: string
  raised: string
  sunken: string
}

const FACE_SIZE = 1024
const DISPLAY_FONT = '"Clash Display", sans-serif'
const UI_FONT = '"General Sans", sans-serif'

// Three.js is only needed on the toss screen. Calling this early (e.g. while
// the setup screen is idle) keeps the coin from appearing late.
export function loadCoinRuntime() {
  return Promise.all([
    import('three'),
    import('three/examples/jsm/environments/RoomEnvironment.js'),
    loadCoinFonts(),
  ])
}

export async function loadCoinFonts() {
  if (typeof document === 'undefined' || !document.fonts)
    return
  await Promise.allSettled([
    document.fonts.load(`600 120px ${DISPLAY_FONT}`),
    document.fonts.load(`700 40px ${UI_FONT}`),
  ])
}

export function paintCoinFace(spec: CoinFaceSpec, mode: 'color' | 'height') {
  const canvas = document.createElement('canvas')
  canvas.width = FACE_SIZE
  canvas.height = FACE_SIZE
  const ctx = canvas.getContext('2d')!
  const c = FACE_SIZE / 2

  const paint: Paint = mode === 'color'
    ? {
        field: goldField(ctx, c),
        rim: '#b8913f',
        raised: '#fff1c4',
        sunken: '#8a6a24',
      }
    : { field: '#5a5a5a', rim: '#9a9a9a', raised: '#e8e8e8', sunken: '#2a2a2a' }

  ctx.fillStyle = mode === 'color' ? '#a9832f' : '#808080'
  ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE)

  // Raised outer rim with a sunken field inside.
  circle(ctx, c, 508, paint.rim)
  circle(ctx, c, 462, paint.sunken)
  circle(ctx, c, 452, paint.field)

  // Beaded ring, a classic coin detail that also reads well when spinning.
  ctx.fillStyle = paint.raised
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(c + Math.cos(a) * 428, c + Math.sin(a) * 428, 6, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.lineWidth = 4
  ctx.strokeStyle = paint.raised
  ctx.beginPath()
  ctx.arc(c, c, 300, 0, Math.PI * 2)
  ctx.stroke()

  embossed(ctx, mode, paint, () => {
    arcText(ctx, 'JUNGLE / QUIZ', c, 362, -Math.PI / 2, `600 64px ${DISPLAY_FONT}`, 0.1, false)
    arcText(ctx, spec.caption, c, 362, Math.PI / 2, `700 40px ${UI_FONT}`, 0.18, true)
  })

  engraved(ctx, mode, paint, () => teamName(ctx, spec.team, c))

  // Side marker under the name: a small pill with KOPF / ZAHL.
  embossed(ctx, mode, paint, () => {
    ctx.font = `700 36px ${UI_FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = '8px'
    ctx.fillText(spec.side.toUpperCase(), c + 4, c + 206)
    ctx.letterSpacing = '0px'
  })

  return canvas
}

export function paintCoinEdge(mode: 'color' | 'height') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const ridges = 128
  const step = canvas.width / ridges

  for (let i = 0; i < ridges; i++) {
    const g = ctx.createLinearGradient(i * step, 0, (i + 1) * step, 0)
    if (mode === 'color') {
      g.addColorStop(0, '#8a6a24')
      g.addColorStop(0.5, '#f4d88c')
      g.addColorStop(1, '#8a6a24')
    }
    else {
      g.addColorStop(0, '#202020')
      g.addColorStop(0.5, '#f0f0f0')
      g.addColorStop(1, '#202020')
    }
    ctx.fillStyle = g
    ctx.fillRect(i * step, 0, step, canvas.height)
  }
  return canvas
}

function goldField(ctx: CanvasRenderingContext2D, c: number) {
  const g = ctx.createRadialGradient(c - 120, c - 160, 40, c, c, 470)
  g.addColorStop(0, '#f6dc8f')
  g.addColorStop(0.55, '#dfba64')
  g.addColorStop(1, '#b48b37')
  return g
}

function circle(ctx: CanvasRenderingContext2D, c: number, r: number, fill: string | CanvasGradient) {
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.arc(c, c, r, 0, Math.PI * 2)
  ctx.fill()
}

// Draws the same shape twice: a dark offset copy for depth, then the raised
// copy on top. In the height pass only the raised copy is needed.
function embossed(ctx: CanvasRenderingContext2D, mode: 'color' | 'height', paint: Paint, draw: () => void) {
  if (mode === 'color') {
    ctx.save()
    ctx.translate(3, 4)
    ctx.fillStyle = paint.sunken
    draw()
    ctx.restore()
  }
  ctx.fillStyle = paint.raised
  draw()
}

// The team name is cut into the field instead of raised, so it reads as a
// dark mark on bright gold: a light lower lip first, then the dark cut.
function engraved(ctx: CanvasRenderingContext2D, mode: 'color' | 'height', paint: Paint, draw: () => void) {
  if (mode === 'color') {
    ctx.save()
    ctx.translate(-2, -3)
    ctx.fillStyle = paint.raised
    draw()
    ctx.restore()
    ctx.fillStyle = '#5c4414'
  }
  else {
    ctx.fillStyle = '#1e1e1e'
  }
  draw()
}

function teamName(ctx: CanvasRenderingContext2D, raw: string, c: number) {
  const name = raw.trim().toUpperCase() || 'TEAM'
  const maxWidth = 540
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let size = 168; size >= 92; size -= 6) {
    ctx.font = `600 ${size}px ${DISPLAY_FONT}`
    if (ctx.measureText(name).width <= maxWidth) {
      ctx.fillText(name, c, c + 8)
      return
    }
  }

  const lines = splitInTwo(name)
  for (let size = 120; size >= 56; size -= 4) {
    ctx.font = `600 ${size}px ${DISPLAY_FONT}`
    if (lines.every(line => ctx.measureText(line).width <= maxWidth)) {
      ctx.fillText(lines[0], c, c - size * 0.46 + 8)
      ctx.fillText(lines[1], c, c + size * 0.46 + 8)
      return
    }
  }

  ctx.font = `600 56px ${DISPLAY_FONT}`
  ctx.fillText(lines[0], c, c - 18, maxWidth)
  ctx.fillText(lines[1], c, c + 34, maxWidth)
}

function splitInTwo(name: string): [string, string] {
  const words = name.split(/\s+/)
  if (words.length < 2) {
    const mid = Math.ceil(name.length / 2)
    return [`${name.slice(0, mid)}-`, name.slice(mid)]
  }
  let best: [string, string] = [words[0]!, words.slice(1).join(' ')]
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ')
    const b = words.slice(i).join(' ')
    const diff = Math.abs(a.length - b.length)
    if (diff < bestDiff) {
      best = [a, b]
      bestDiff = diff
    }
  }
  return best
}

// Text along a circle, centred on `angle`. Bottom text runs counter-clockwise
// so it stays readable instead of upside down.
function arcText(
  ctx: CanvasRenderingContext2D,
  text: string,
  c: number,
  radius: number,
  angle: number,
  font: string,
  tracking: number,
  bottom: boolean,
) {
  ctx.save()
  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const chars = [...text]
  const widths = chars.map(ch => ctx.measureText(ch).width + tracking * 100)
  const total = widths.reduce((sum, w) => sum + w, 0)
  const span = total / radius
  let a = bottom ? angle + span / 2 : angle - span / 2

  chars.forEach((ch, i) => {
    const step = widths[i]! / radius
    const mid = bottom ? a - step / 2 : a + step / 2
    ctx.save()
    ctx.translate(c + Math.cos(mid) * radius, c + Math.sin(mid) * radius)
    ctx.rotate(bottom ? mid - Math.PI / 2 : mid + Math.PI / 2)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
    a = bottom ? a - step : a + step
  })
  ctx.restore()
}
