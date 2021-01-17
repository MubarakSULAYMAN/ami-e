import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/tailwindcss/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faSearch,
    faMale,
    faFemale,
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faSortDown,
    faPhoneVolume,
    faMobileAlt,
    faUsers,
    faCloudDownloadAlt,
    faSyncAlt
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faSearch,
    faMale,
    faFemale,
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faSortDown,
    faPhoneVolume,
    faMobileAlt,
    faEnvelope,
    faUsers,
    faCloudDownloadAlt,
    faSyncAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')