import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt2_vuetify_boilerplate',
    title: 'nuxt2_vuetify_boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js',
      },
      {
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-apexchar.js', ssr: false },
    // { src: '~/plugins/v-calendar.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    // '@nuxtjs/firebase',
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
  ],

  // router: {
  //   middleware: ['auth'],
  // },

  // firebase: {
  //   config: {
  //     apiKey: process.env.FIREBASE_API_KEY,
  //     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //     databaseURL: process.env.FIREBASE_DATABASE_URL,
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //     appId: process.env.FIREBASE_APP_ID,
  //     measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  //   },
  //   services: {
  //     storage: true,
  //     auth: {
  //       persistence: 'local', // default
  //       initialize: {
  //         onAuthStateChangedAction: 'onAuthStateChangedAction',
  //         subscribeManually: false,
  //       },
  //     },
  //   },
  // },

  apollo: {
    errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default: {
        httpEndpoint: process.env.ENDPOINT_URL,
        wsEndpoint: process.env.ENDPOINT_WS,
        wsLinkOptions: {
          reconnect: true,
        },
        httpLinkOptions: {
          credentials: 'same-origin',
          headers: {
            'x-hasura-admin-secret': process.env.ADMIN_SECRET
          },
        },
        tokenName: 'token',
        authenticationType: 'Bearer',
        persisting: false,
        // websocketsOnly: true,
      },
    },
  },

  i18n: {
    locales: ['en', 'la'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        la: require('./locales/la.json'),
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken4, // #E53935 #0d47a1
          secondary: colors.blue.lighten4, // #FFCDD2
          accent: colors.indigo.base, // #3F51B5
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
