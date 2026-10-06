// Canvas painters for the 3D toss coin. Every face is drawn three times with
// the same layout: colour (albedo map), grey levels (bump map) and a
// metalness mask, so relief catches the light and enamel stays matte.

export type CoinFaceSpec = {
  team: string
  side: string
  caption: string
  numeral: string
}

// Bimetal follows the 2-euro coin: silver ring, gold core, a big numeral as
// the image. Gold and enamel are single-metal struck coins.
export type CoinFinish = 'bimetal' | 'bimetal-inverse' | 'gold' | 'enamel'
type StruckFinish = Exclude<CoinFinish, 'bimetal' | 'bimetal-inverse'>

type PaintMode = 'color' | 'height' | 'metal'

type Finish = {
  field: [string, string, string]
  rim: string
  bead: string
  mark: string
  markShade: string
  name: string
  nameLip: string
  name3d: 'engraved' | 'raised'
  metalField: boolean
  detail: 'full' | 'clean'
}

const FINISHES: Record<StruckFinish, Finish> = {
  gold: { field: ['#f6dc8f', '#dfba64', '#b48b37'], rim: '#b8913f', bead: '#fff1c4', mark: '#fff1c4', markShade: '#8a6a24', name: '#5c4414', nameLip: '#fff1c4', name3d: 'engraved', metalField: true, detail: 'full' },
  enamel: { field: ['#15583a', '#0b4429', '#06301c'], rim: '#c9a24c', bead: '#dfba64', mark: '#caff4a', markShade: '#03140b', name: '#fbf8ed', nameLip: '#03140b', name3d: 'raised', metalField: false, detail: 'clean' },
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

export function paintCoinFace(spec: CoinFaceSpec, mode: PaintMode, finishId: CoinFinish = 'gold') {
  if (finishId === 'bimetal' || finishId === 'bimetal-inverse')
    return paintBimetalFace(spec, mode, finishId === 'bimetal-inverse')

  const canvas = document.createElement('canvas')
  canvas.width = FACE_SIZE
  canvas.height = FACE_SIZE
  const ctx = canvas.getContext('2d')!
  const c = FACE_SIZE / 2
  const finish = FINISHES[finishId]
  const clean = finish.detail === 'clean'

  // Each pass maps the same layout to different values: colour for the albedo,
  // grey levels for relief, black/white for which parts are bare metal.
  const tone = {
    color: { base: '#a9832f', rim: finish.rim, groove: finish.markShade, field: fieldGradient(ctx, c, finish.field), bead: finish.bead },
    height: { base: '#808080', rim: '#9a9a9a', groove: '#2a2a2a', field: '#5a5a5a', bead: '#e8e8e8' },
    metal: { base: '#ffffff', rim: '#ffffff', groove: '#ffffff', field: finish.metalField ? '#ffffff' : '#000000', bead: finish.metalField ? '#ffffff' : '#000000' },
  }[mode]

  ctx.fillStyle = tone.base
  ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE)

  // Raised outer rim with a sunken field inside.
  circle(ctx, c, 508, tone.rim)
  circle(ctx, c, 462, mode === 'color' ? shade(finish) : tone.groove)
  circle(ctx, c, 452, tone.field)

  // Beaded ring, a classic coin detail that also reads well when spinning.
  ctx.fillStyle = tone.bead
  const beads = clean ? 72 : 96
  for (let i = 0; i < beads; i++) {
    const a = (i / beads) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(c + Math.cos(a) * 428, c + Math.sin(a) * 428, clean ? 5 : 6, 0, Math.PI * 2)
    ctx.fill()
  }

  if (!clean) {
    ctx.lineWidth = 4
    ctx.strokeStyle = tone.bead
    ctx.beginPath()
    ctx.arc(c, c, 300, 0, Math.PI * 2)
    ctx.stroke()
  }

  const marks = (draw: () => void) => relief(ctx, mode, finish.mark, finish.markShade, 'raised', draw)

  marks(() => {
    if (clean) {
      arcText(ctx, 'JUNGLE / QUIZ', c, 368, -Math.PI / 2, `600 70px ${DISPLAY_FONT}`, 0.08, false)
    }
    else {
      arcText(ctx, 'JUNGLE / QUIZ', c, 362, -Math.PI / 2, `600 64px ${DISPLAY_FONT}`, 0.1, false)
      arcText(ctx, spec.caption, c, 362, Math.PI / 2, `700 40px ${UI_FONT}`, 0.18, true)
    }
  })

  relief(ctx, mode, finish.name, finish.nameLip, finish.name3d, () => teamName(ctx, spec.team, c, clean))

  // Side marker under the name: KOPF / ZAHL. The clean finishes give it a
  // ruled line above so it reads as a label, not as part of the name.
  marks(() => {
    ctx.font = `700 ${clean ? 46 : 36}px ${UI_FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = clean ? '12px' : '8px'
    ctx.fillText(spec.side.toUpperCase(), c + (clean ? 6 : 4), c + (clean ? 262 : 206))
    ctx.letterSpacing = '0px'
    if (clean)
      ctx.fillRect(c - 70, c + 210, 140, 5)
  })

  return canvas
}

export function coinEdgeMetal(finish: CoinFinish): Metal {
  return finish === 'bimetal' ? 'silver' : 'gold'
}

export function paintCoinEdge(mode: 'color' | 'height', metal: Metal = 'gold') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const ridges = 128
  const step = canvas.width / ridges

  for (let i = 0; i < ridges; i++) {
    const g = ctx.createLinearGradient(i * step, 0, (i + 1) * step, 0)
    if (mode === 'color') {
      const { light, dark } = METALS[metal]
      g.addColorStop(0, dark)
      g.addColorStop(0.5, light)
      g.addColorStop(1, dark)
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

type Metal = 'gold' | 'silver'

const METALS: Record<Metal, { light: string, mid: string, dark: string, ink: string, shade: string }> = {
  silver: { light: '#f4f5f2', mid: '#c8cccb', dark: '#8c9291', ink: '#4f5655', shade: 'rgb(40 46 45 / 50%)' },
  gold: { light: '#f5de9c', mid: '#d8b25c', dark: '#a57a30', ink: '#5e4211', shade: 'rgb(70 45 8 / 55%)' },
}

const CORE_RADIUS = 352

// The 2-euro layout: numeral left, stippled image upper right, name lower
// right, meridian lines and stars on the right side of the ring only.
function paintBimetalFace(spec: CoinFaceSpec, mode: PaintMode, inverse: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = FACE_SIZE
  canvas.height = FACE_SIZE
  const ctx = canvas.getContext('2d')!
  const c = FACE_SIZE / 2
  const ring = METALS[inverse ? 'gold' : 'silver']
  const core = METALS[inverse ? 'silver' : 'gold']
  const height = mode === 'height'

  if (mode === 'metal') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE)
    return canvas
  }

  ctx.fillStyle = height ? '#808080' : ring.dark
  ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE)

  // Raised rim, ring field, a dark seam, then the slightly sunken core.
  circle(ctx, c, 510, height ? '#a8a8a8' : satin(ctx, c, ring, 510))
  circle(ctx, c, 486, height ? '#707070' : satin(ctx, c, ring, 486))
  circle(ctx, c, CORE_RADIUS + 7, height ? '#303030' : ring.dark)
  circle(ctx, c, CORE_RADIUS, height ? '#5c5c5c' : satin(ctx, c, core, CORE_RADIUS))

  // Ring: meridian lines on the right, interrupted by stars.
  ctx.save()
  ctx.beginPath()
  ctx.arc(c, c, 478, 0, Math.PI * 2)
  ctx.arc(c, c, CORE_RADIUS + 16, 0, Math.PI * 2, true)
  ctx.clip()
  ctx.fillStyle = height ? '#3c3c3c' : ring.dark
  for (let x = c + 214; x < c + 480; x += 20)
    ctx.fillRect(x, c - 470, 3, 940)
  const stars = Array.from({ length: 7 }, (_, i) => -0.95 + i * (1.9 / 6))
  for (const a of stars) {
    const sx = c + Math.cos(a) * 420
    const sy = c + Math.sin(a) * 420
    star(ctx, sx, sy, 22, height ? '#707070' : ring.mid)
    if (height) {
      star(ctx, sx, sy, 14, '#d8d8d8')
    }
    else {
      ctx.save()
      ctx.shadowColor = ring.shade
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 3
      ctx.shadowBlur = 3
      star(ctx, sx, sy, 14, ring.light)
      ctx.restore()
    }
  }
  ctx.restore()

  relief(ctx, mode, ring.ink, ring.light, 'engraved', () => {
    arcText(ctx, 'JUNGLE / QUIZ', c, 420, -Math.PI / 2 - 0.42, `600 58px ${DISPLAY_FONT}`, 0.1, false)
    arcText(ctx, spec.side.toUpperCase(), c, 420, Math.PI / 2 + 0.3, `700 44px ${UI_FONT}`, 0.32, true)
  })

  // Core: stippled monstera leaf upper right, clipped to the core like the
  // euro map that runs up to the seam.
  ctx.save()
  ctx.beginPath()
  ctx.arc(c, c, CORE_RADIUS - 6, 0, Math.PI * 2)
  ctx.clip()
  stippleLeaf(ctx, c + 150, c - 120, height ? '#dcdcdc' : core.light, height ? null : core.shade)
  ctx.restore()

  // Numeral: the image of the coin. Soft bevel in the height pass, a cast
  // shadow in the colour pass.
  const numeral = () => {
    ctx.font = `600 640px ${DISPLAY_FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(spec.numeral, c - 168, c + 230)
  }
  ctx.save()
  if (height) {
    ctx.filter = 'blur(9px)'
    ctx.fillStyle = '#f2f2f2'
    numeral()
    ctx.filter = 'none'
    ctx.fillStyle = '#e4e4e4'
    numeral()
  }
  else {
    ctx.shadowColor = core.shade
    ctx.shadowOffsetX = 7
    ctx.shadowOffsetY = 10
    ctx.shadowBlur = 12
    const g = ctx.createLinearGradient(c - 330, c - 260, c, c + 240)
    g.addColorStop(0, core.light)
    g.addColorStop(1, core.mid)
    ctx.fillStyle = g
    numeral()
  }
  ctx.restore()

  // Team name in the place of "EURO": cut into the core, dark and legible.
  relief(ctx, mode, core.ink, core.light, 'engraved', () => coreName(ctx, spec.team, c))

  return canvas
}

function satin(ctx: CanvasRenderingContext2D, c: number, metal: { light: string, mid: string, dark: string }, r: number) {
  const g = ctx.createLinearGradient(c - r, c - r, c + r, c + r)
  g.addColorStop(0, metal.light)
  g.addColorStop(0.55, metal.mid)
  g.addColorStop(1, metal.dark)
  return g
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.fillStyle = fill
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const radius = i % 2 === 0 ? r : r * 0.42
    ctx.lineTo(x + Math.cos(a) * radius, y + Math.sin(a) * radius)
  }
  ctx.closePath()
  ctx.fill()
}

// Halftone leaf: dots on a grid, larger towards the midline, with gaps for the
// midrib and the side veins so the shape reads as a leaf, not a blob.
function stippleLeaf(ctx: CanvasRenderingContext2D, cx: number, cy: number, fill: string, shadow: string | null) {
  const length = 520
  const width = 300
  const angle = -0.72
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const step = 12

  ctx.save()
  if (shadow) {
    ctx.shadowColor = shadow
    ctx.shadowOffsetX = 1.5
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 1.5
  }
  ctx.fillStyle = fill
  for (let y = cy - length / 2; y <= cy + length / 2; y += step) {
    for (let x = cx - length / 2; x <= cx + length / 2; x += step) {
      const dx = x - cx
      const dy = y - cy
      const u = dx * cos + dy * sin
      const v = -dx * sin + dy * cos
      const t = (u + length / 2) / length
      if (t <= 0 || t >= 1)
        continue
      const half = (width / 2) * Math.sin(Math.PI * t) ** 0.8
      const across = Math.abs(v)
      if (across >= half || across < 9)
        continue
      // Side veins sweep towards the tip.
      const phase = (u - across * 0.8) / 62
      if (Math.abs(phase - Math.round(phase)) < 0.1)
        continue
      const r = 2.2 + 2.6 * (1 - across / half)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.restore()
}

function coreName(ctx: CanvasRenderingContext2D, raw: string, c: number) {
  const name = raw.trim().toUpperCase() || 'TEAM'
  const left = c + 14
  const maxWidth = 300
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  for (let size = 104; size >= 64; size -= 4) {
    ctx.font = `600 ${size}px ${DISPLAY_FONT}`
    if (ctx.measureText(name).width <= maxWidth) {
      ctx.fillText(name, left, c + 168)
      return
    }
  }
  const lines = splitInTwo(name)
  for (let size = 84; size >= 40; size -= 4) {
    ctx.font = `600 ${size}px ${DISPLAY_FONT}`
    if (lines.every(line => ctx.measureText(line).width <= maxWidth)) {
      ctx.fillText(lines[0], left, c + 168 - size * 0.95)
      ctx.fillText(lines[1], left, c + 168)
      return
    }
  }
  ctx.font = `600 40px ${DISPLAY_FONT}`
  ctx.fillText(lines[0], left, c + 130, maxWidth)
  ctx.fillText(lines[1], left, c + 168, maxWidth)
}

function fieldGradient(ctx: CanvasRenderingContext2D, c: number, [light, mid, dark]: [string, string, string]) {
  const g = ctx.createRadialGradient(c - 120, c - 160, 40, c, c, 470)
  g.addColorStop(0, light)
  g.addColorStop(0.55, mid)
  g.addColorStop(1, dark)
  return g
}

function shade(finish: Finish) {
  return finish.metalField ? '#8a6a24' : finish.field[2]
}

function circle(ctx: CanvasRenderingContext2D, c: number, r: number, fill: string | CanvasGradient) {
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.arc(c, c, r, 0, Math.PI * 2)
  ctx.fill()
}

// Draws a mark with a one-sided lip so it reads as relief: raised marks get a
// shade below-right, engraved marks a light lip above-left. In the height pass
// raised marks are bright and engraved ones dark; in the metal pass marks
// stay bare metal.
function relief(
  ctx: CanvasRenderingContext2D,
  mode: PaintMode,
  color: string,
  lip: string,
  kind: 'raised' | 'engraved',
  draw: () => void,
) {
  if (mode === 'color') {
    ctx.save()
    if (kind === 'raised')
      ctx.translate(3, 4)
    else
      ctx.translate(-2, -3)
    ctx.fillStyle = lip
    draw()
    ctx.restore()
    ctx.fillStyle = color
  }
  else if (mode === 'height') {
    ctx.fillStyle = kind === 'raised' ? '#e8e8e8' : '#1e1e1e'
  }
  else {
    ctx.fillStyle = '#ffffff'
  }
  draw()
}

function teamName(ctx: CanvasRenderingContext2D, raw: string, c: number, clean: boolean) {
  const name = raw.trim().toUpperCase() || 'TEAM'
  const maxWidth = clean ? 620 : 540
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let size = clean ? 200 : 168; size >= 92; size -= 6) {
    ctx.font = `600 ${size}px ${DISPLAY_FONT}`
    if (ctx.measureText(name).width <= maxWidth) {
      ctx.fillText(name, c, c + 8)
      return
    }
  }

  const lines = splitInTwo(name)
  for (let size = clean ? 150 : 120; size >= 56; size -= 4) {
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
