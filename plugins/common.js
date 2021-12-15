import Vue from 'vue'
import Notifications from 'vue-notification'
import vueXlsxTable from 'vue-xlsx-table'
import VueLogger from 'vuejs-logger'
import VueApexCharts from 'vue-apexcharts'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import VueQuillEditor from 'vue-quill-editor'
import Vue2Editor from 'vue2-editor'
import Quill from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import GOOGLE from '~/assets/configurations/GOOGLE_MAP_API_KEY'

const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}
Vue.use(Vue2Editor, Quill)
Vue.use(VueLogger, options)
Vue.use(Notifications)
Vue.use(vueXlsxTable, { rABS: false })
Vue.component('apexchart', VueApexCharts)
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE.API_KEY_MAP,
    libraries: 'places',
    region: 'VI',
    language: 'vi'
  }
})
Vue.use(Viewer)
Vue.use(VueQuillEditor)
const sizeStyle = Quill.import('attributors/style/size')
sizeStyle.whitelist = [
  '6px',
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '30px',
  '32px',
  '36px'
]
Quill.register(sizeStyle, true)

import VueMask from 'v-mask'
Vue.use(VueMask)
