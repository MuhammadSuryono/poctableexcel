// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ]
    },
    layoutTransition: { name: "fade-layout", mode: "out-in" },
    pageTransition: { name: "route", mode: "out-in" }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ["/"]
    }
  },

  modules: [
    // "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    // "@nuxtjs/eslint-module",
    "@nuxt/image",
    "@nuxt/ui",
    // "nuxt-lodash",
    "@vueuse/nuxt"
  ],

  typescript: {
    strict: true
  },

  colorMode: {
    preference: "light"
  },
  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    overwriting: true
  },
})
