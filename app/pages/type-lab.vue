<script setup lang="ts">
interface TypeSystem {
  id: string
  name: string
  pairing: string
  uiFont: string
  accentFont: string
  mood: string
  note: string
  ratio: string
  vars: Record<string, string>
}

const systems: TypeSystem[] = [
  {
    id: 'field-signal',
    name: 'Field Signal',
    pairing: 'Clash Display × General Sans',
    uiFont: 'General Sans',
    accentFont: 'General Sans',
    mood: 'klar · direkt · urban',
    note: 'Die stärkste Allround-Kombination für das eigentliche Spiel. Clash trägt den Moment, General Sans hält die Bedienung ruhig.',
    ratio: 'Display 1 : UI 0.22',
    vars: { '--type-ui': '"General Sans", sans-serif', '--type-accent': '"General Sans", sans-serif', '--type-scale': '1', '--type-tracking': '-0.025em' },
  },
  {
    id: 'night-safari',
    name: 'Night Safari',
    pairing: 'Clash Display × Switzer',
    uiFont: 'Switzer',
    accentFont: 'Switzer',
    mood: 'präzise · grafisch · game show',
    note: 'Mehr Spannung und Kante. Switzer macht Scoreboard, Timer und Antwortlabels fast schon zu einer Sendungsgrafik.',
    ratio: 'Display 1 : UI 0.2',
    vars: { '--type-ui': '"Switzer", sans-serif', '--type-accent': '"Switzer", sans-serif', '--type-scale': '0.94', '--type-tracking': '-0.035em' },
  },
  {
    id: 'after-dark',
    name: 'After Dark',
    pairing: 'Clash Display × Satoshi',
    uiFont: 'Satoshi',
    accentFont: 'Satoshi',
    mood: 'warm · sozial · birthday',
    note: 'Die zugänglichste Richtung. Satoshi gibt der App mehr Wärme, ohne die große Clash-Geste zu verniedlichen.',
    ratio: 'Display 1 : UI 0.24',
    vars: { '--type-ui': '"Satoshi", sans-serif', '--type-accent': '"Satoshi", sans-serif', '--type-scale': '1.02', '--type-tracking': '-0.02em' },
  },
  {
    id: 'canopy-editorial',
    name: 'Canopy Editorial',
    pairing: 'Clash Display × Zodiak',
    uiFont: 'General Sans',
    accentFont: 'Zodiak',
    mood: 'satt · luxuriös · überraschend',
    note: 'Zodiak wird nur als Akzent eingesetzt — für Antworten, Reveal-Momente oder einen besonderen Host-Modus.',
    ratio: 'Display 1 : Accent 0.34',
    vars: { '--type-ui': '"General Sans", sans-serif', '--type-accent': '"Zodiak", serif', '--type-scale': '0.98', '--type-tracking': '-0.02em' },
  },
]

const activeId = ref(systems[0]!.id)
const activeSystem = computed(() => systems.find(system => system.id === activeId.value) ?? systems[0]!)
</script>

<template>
  <div class="type-lab min-h-screen bg-ink text-cream" :style="activeSystem.vars">
    <header class="border-b border-line px-5 md:px-[4vw]">
      <div class="mx-auto flex h-20 max-w-[1500px] items-center justify-between gap-5">
        <NuxtLink to="/" class="flex items-center gap-2 font-display text-xl uppercase tracking-[-0.02em] focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-4">
          Jungle <span class="text-gold">/</span> Quiz
        </NuxtLink>
        <div class="hidden text-xs font-600 uppercase tracking-[0.18em] text-muted md:block">Type Lab / 04 Systems</div>
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-xs font-600 uppercase tracking-[0.12em] text-muted transition hover:text-cream">
          <Icon name="lucide:arrow-left" size="16" aria-hidden="true" />
          Zurück zum Spiel
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto max-w-[1500px] px-5 py-12 md:px-[5vw] md:py-20">
      <section class="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p class="eyebrow">Typography / Jungle Quiz</p>
          <h1 class="mt-6 max-w-[10ch] font-display text-[clamp(4rem,10vw,9rem)] font-500 uppercase leading-[0.86] tracking-[-0.035em]">Same voice.<br><span class="text-leaf">Four signals.</span></h1>
        </div>
        <p class="max-w-[34rem] text-base leading-relaxed text-muted md:text-lg">Clash Display bleibt die Stimme des Spiels. Hier vergleichen wir nur, wie sich die Bedienung darunter anfühlt — vom klaren Host-Board bis zur etwas luxuriöseren Jungle-Edition.</p>
      </section>

      <section class="grid gap-10 py-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <aside class="lg:sticky lg:top-6 lg:self-start">
          <p class="eyebrow mb-4">Choose a system</p>
          <div class="space-y-1">
            <button v-for="(system, index) in systems" :key="system.id" data-uisfx-hover="hover" data-uisfx="select" class="flex w-full items-start gap-3 border-0 border-b border-white/10 bg-transparent px-0 py-4 text-left transition hover:text-gold" :class="activeId === system.id ? 'text-cream' : 'text-muted'" @click="activeId = system.id">
              <span class="font-sans text-xs text-gold">0{{ index + 1 }}</span>
              <span>
                <strong class="block font-600">{{ system.name }}</strong>
                <small class="mt-1 block text-xs leading-relaxed opacity-70">{{ system.mood }}</small>
              </span>
            </button>
          </div>
        </aside>

        <div class="min-w-0">
          <div class="type-specimen" :class="`type-specimen--${activeSystem.id}`">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 pb-5 text-xs uppercase tracking-[0.14em] opacity-65">
              <span>{{ activeSystem.name }}</span>
              <span>{{ activeSystem.pairing }}</span>
            </div>
            <div class="grid gap-10 py-12 md:grid-cols-[1fr_0.48fr] md:items-end md:py-16">
              <div>
                <p class="type-kicker">Birthday edition / 01</p>
                <h2 class="type-hero">Welcome<br><span>to the Jungle.</span></h2>
                <p class="type-body">Zwei Teams. Vier Kategorien. Eine Chance zum Steal.</p>
              </div>
              <div class="type-mini-board">
                <div class="flex items-end justify-between gap-3">
                  <div><small>TEAM ONE</small><strong>42</strong></div>
                  <div class="text-right"><small>TEAM TWO</small><strong>08</strong></div>
                </div>
                <div class="type-rule" />
                <div class="flex items-center justify-between gap-3">
                  <span class="type-ui-label">Antwortzeit</span>
                  <span class="type-timer">15</span>
                </div>
                <button data-uisfx-hover="hover" data-uisfx-press="press" class="type-cta">Spiel starten <Icon name="lucide:arrow-up-right" size="16" aria-hidden="true" /></button>
              </div>
            </div>
            <div class="grid gap-6 border-t border-current/15 pt-6 sm:grid-cols-3">
              <div><span class="type-ui-label">UI family</span><strong class="type-value">{{ activeSystem.uiFont }}</strong></div>
              <div><span class="type-ui-label">Accent role</span><strong class="type-value type-accent">{{ activeSystem.accentFont }}</strong></div>
              <div><span class="type-ui-label">Scale ratio</span><strong class="type-value">{{ activeSystem.ratio }}</strong></div>
            </div>
          </div>

          <div class="mt-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p class="eyebrow">What this does</p>
              <p class="mt-3 max-w-[40ch] text-base leading-relaxed text-muted">{{ activeSystem.note }}</p>
            </div>
            <div class="grid grid-cols-2 gap-x-5 gap-y-3 text-xs uppercase tracking-[0.12em] text-muted">
              <span>Display / Clash Display</span>
              <span>UI / {{ activeSystem.uiFont }}</span>
              <span>Score / tabular numerals</span>
              <span>Answer / high contrast</span>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-line pt-10 md:pt-12">
        <div class="flex flex-wrap items-end justify-between gap-5">
          <div><p class="eyebrow">Quick compare</p><h2 class="mt-3 font-display text-4xl uppercase md:text-6xl">One phrase. Four moods.</h2></div>
          <p class="max-w-[28ch] text-sm leading-relaxed text-muted">Klick auf einen Streifen, um das große Specimen oben zu wechseln.</p>
        </div>
        <div class="mt-8 grid gap-2 lg:grid-cols-4">
          <button v-for="(system, index) in systems" :key="system.id" data-uisfx-hover="hover" data-uisfx="select" class="type-compare" :class="activeId === system.id ? 'type-compare--active' : ''" :style="system.vars" @click="activeId = system.id">
            <span class="type-compare-meta">0{{ index + 1 }} / {{ system.name }}</span>
            <strong class="type-compare-word">Jungle fever</strong>
            <span class="type-compare-ui">{{ system.uiFont }}</span>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.type-specimen {
  --specimen-bg: #0d2a1d;
  --specimen-fg: #f3eedb;
  --specimen-accent: #dfba64;
  background: var(--specimen-bg);
  color: var(--specimen-fg);
  padding: clamp(1.25rem, 3vw, 3rem);
  transition: background 220ms ease, color 220ms ease;
}

.type-specimen--night-safari { --specimen-bg: #122b22; --specimen-accent: #f0c96c; }
.type-specimen--after-dark { --specimen-bg: #19372b; --specimen-accent: #c6df9a; }
.type-specimen--canopy-editorial { --specimen-bg: #10251b; --specimen-accent: #dbb577; }

.type-kicker,
.type-ui-label {
  color: var(--specimen-accent);
  font-family: var(--type-ui);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.type-hero {
  max-width: 8ch;
  margin-top: 1.25rem;
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(4rem, 8vw, 8.75rem);
  font-weight: 500;
  letter-spacing: var(--type-tracking);
  line-height: 0.84;
  text-transform: uppercase;
}

.type-hero span { color: var(--specimen-accent); }

.type-body {
  max-width: 34ch;
  margin-top: 2rem;
  color: color-mix(in srgb, var(--specimen-fg) 72%, transparent);
  font-family: var(--type-ui);
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  line-height: 1.5;
}

.type-mini-board { font-family: var(--type-ui); }
.type-mini-board small { display: block; color: color-mix(in srgb, var(--specimen-fg) 60%, transparent); font-size: 0.65rem; letter-spacing: 0.15em; }
.type-mini-board strong { display: block; color: var(--specimen-accent); font-family: 'Clash Display', sans-serif; font-size: clamp(3.5rem, 7vw, 6rem); font-weight: 500; line-height: 0.9; }
.type-rule { height: 1px; margin: 1.5rem 0; background: color-mix(in srgb, var(--specimen-fg) 18%, transparent); }
.type-timer { color: var(--specimen-accent); font-family: 'Clash Display', sans-serif; font-size: 2.25rem; }
.type-cta { display: inline-flex; align-items: center; gap: 0.75rem; margin-top: 2rem; border: 0; background: var(--specimen-accent); padding: 0.8rem 1rem; color: #071a13; font-family: var(--type-ui); font-size: 0.8rem; font-weight: 600; }
.type-value { display: block; margin-top: 0.45rem; font-family: var(--type-ui); font-size: 1rem; font-weight: 600; }
.type-accent { font-family: var(--type-accent); font-size: 1.15rem; font-weight: 500; }

.type-compare { min-height: 10rem; border: 0; border-top: 1px solid rgb(243 238 219 / 14%); background: #0d2a1d; padding: 1rem; text-align: left; transition: background 180ms ease, transform 180ms ease; }
.type-compare:hover, .type-compare--active { transform: translateY(-3px); background: #173724; }
.type-compare-meta, .type-compare-ui { display: block; color: #a5b5a3; font-family: var(--type-ui); font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; }
.type-compare-word { display: block; margin: 1.5rem 0 0.4rem; font-family: 'Clash Display', sans-serif; font-size: clamp(2rem, 3vw, 3rem); font-weight: 500; letter-spacing: var(--type-tracking); line-height: 0.9; text-transform: uppercase; }
.type-compare-ui { color: #dfba64; }

@media (prefers-reduced-motion: reduce) {
  .type-specimen, .type-compare { transition: none; }
}
</style>
