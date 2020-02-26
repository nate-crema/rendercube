import bodyParser from 'body-parser'
import session from 'express-session'
// require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'rendercube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Rendercube Beta Service (nuxt)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,200,300,400,500,600,700,800,900&amp;subset=korean'}
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
      { src: 'https://unpkg.com/axios/dist/axios.min.js' },
      { src: 'https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/index.js' },
      { src: 'http://' + (process.env.HOST || process.env.IP || "localhost") + ':225/socket.io/socket.io.js' }
    ],
    css: [
      // node.js 모듈을 로드
      // 'hover.css/css/hover-min.css',
      'bulma/css/bulma.css',
      // 전처리기가 사용된 node.js 모듈.
      { src: 'bulma', lang: 'scss' },
      // 프로젝트 내부의 Css 파일
      '~/assets/css/animate.css',
      // // 프로젝트의 sass 파일
      { src: '~assets/css/animate.css', lang: 'scss' } // sass 대신 scss
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  
  // add for middleware access authorization
  router: {
    middleware: 'auth'
  },

  modules: [
    ['nuxt-mq'],
    '@nuxtjs/axios',
    [
      'nuxt-session', {
        //express-session options definition
        name: 'rendercube_session',
        secret: '156$#@%XSDGsdhn%#*(VJTBwefrrentrmnfrtvinr'
      }
    ],
    // '@nuxtjs/dotenv',
    // '@nuxtjs/auth'
  ],
  plugins: [
    '~plugins/ww_plugin_set',
    // '~/plugins/socket.io.js',
  ],

//  'mq': {
//     defaultBreakpoint: 'default',
//     breakpoints: {
//       mobile: 450,
//       tablet: 900,
//       laptop: 1250,
//       desktop: Infinity,
//     }
//   },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/apis'
  ]
}

