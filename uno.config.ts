import { defineConfig, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      },
    }),
  ],
  theme: {
    colors: {
      ink: '#071a13',
      jungle: '#0d2a1d',
      leaf: '#b7d69e',
      cream: '#f3eedb',
      gold: '#dfba64',
      goldBright: '#f2d58e',
      coral: '#dd927b',
      muted: '#a5b5a3',
      line: 'rgba(243, 238, 219, 0.16)',
    },
    font: {
      display: '"Clash Display", sans-serif',
      sans: '"General Sans", sans-serif',
      body: '"General Sans", sans-serif',
    },
    breakpoints: {
      sm: '640px',
      md: '810px',
      lg: '1200px',
    },
  },
  shortcuts: {
    'page-shell': 'min-h-screen bg-ink text-cream font-body antialiased',
    'page-wrap': 'mx-auto max-w-[1500px] px-5 md:px-[5vw]',
    'display': 'font-display uppercase tracking-[-0.025em] leading-[0.92]',
    'eyebrow': 'font-sans text-xs font-600 uppercase tracking-[0.2em] text-gold',
    'quiet-text': 'text-muted leading-relaxed',
    'button-base': 'inline-flex items-center justify-center gap-2 border border-line rounded-[5px] px-5 py-4 font-600 transition duration-200 ease-out focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3',
    'button-primary': 'button-base border-gold bg-gold text-ink hover:bg-goldBright hover:-translate-y-0.5',
    'button-quiet': 'button-base hover:bg-white/6 hover:-translate-y-0.5',
    'field': 'w-full rounded-[4px] border border-line bg-jungle px-4 py-3.5 text-cream outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20',
  },
  safelist: [
    'text-leaf',
    'text-gold',
    'text-coral',
    'border-gold',
  ],
})
