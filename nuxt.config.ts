// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/_variables.scss" as *;`
        }
      }
    }
  },
  runtimeConfig: {
    apiUrl: '',
    baseUrl: '',
    public: {
      apiUrl: '',
      baseUrl: ''
    }
  },
  experimental: {
    asyncContext: true
  }
})
