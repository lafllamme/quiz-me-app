export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Jungle Quiz',
      meta: [
        { name: 'description', content: 'A fast, loud and slightly feral team quiz.' },
        { name: 'theme-color', content: '#071a13' },
      ],
    },
  },
  fonts: {
    defaults: {
      subsets: ['latin'],
    },
    families: [
      {
        name: 'Clash Display',
        provider: 'fontshare',
        global: true,
        preload: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: 'General Sans',
        provider: 'fontshare',
        global: true,
        preload: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: 'Switzer',
        provider: 'fontshare',
        global: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: 'Satoshi',
        provider: 'fontshare',
        global: true,
        weights: [400, 500, 600, 700],
      },
      {
        name: 'Zodiak',
        provider: 'fontshare',
        global: true,
        weights: [400, 500, 600, 700],
      },
    ],
  },
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },
})
