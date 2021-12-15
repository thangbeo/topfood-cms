import colors from 'vuetify/es5/util/colors'
// import en from './assets/locale/en'
// import vi from './assets/locale/vi'

import BASE from './assets/configurations/BASE_URL'

export default {
  // mode: 'universal',

  server: {
    port: 2909, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  //async: true,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'Quản trị TOPFOOD',
    // titleTemplate: '%s - ' + 'XSĐT XSKT Content Management System',
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'TOPFOOD - CMS'
      }
    ],

    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'logo.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/APIs.js',
    '~/plugins/axios.js',
    { src: '~/plugins/common.js', ssr: false },
    '~/plugins/ult.js',
    '~/plugins/globalComponent.js'
  ],
  /*
   ** Nuxt.js dev-module
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js module
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Vue Wait (Loading management)
    'vue-wait/nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: BASE.URL
  },
  wait: { useVuex: true },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    // lang: {
    //   locales: {
    //     vi,
    //     en
    //   },
    //   current: 'vi'
    // },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
      themes: {
        dark: {
          primary: '#277cbe',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#2b8c8f'
          // secondary: '#ed1c24'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vue-pdf'],
    extend(config, ctx) {
      config.output.globalObject = 'this'
    },
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
