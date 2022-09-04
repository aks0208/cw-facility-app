export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cw-facility-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/alert.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      },
    },
    baseURL: process.env.API_URL || 'http://127.0.0.1:3333/api',
  },
  auth: {
    scopeKey: 'scope',
    strategies: {
      local: {
        token: {
          property: "token", //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true,
          maxAge: 60 * 60 * 24 * 7
        },
        refreshToken: {
          property: 'refresh_token' // change to your refresh token property
        },
        user: {
          property: false,
          autoFetch: true
        },
        //user: false,
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: false,
          user: { url: '/me', method: 'get' }
        },
      },
    },
    cookie: {
      options: {
        secure: false,
      },
    },
    watchLoggedIn: true,
    redirect: {
      logout: '/login',
      // callback: '/dashboard',
      home: '/',
      login: '/login'
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
