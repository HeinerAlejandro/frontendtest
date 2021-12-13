import { createApp } from 'vue'

import Antd from 'ant-design-vue'

import App from './App.vue'

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import 'ant-design-vue/dist/antd.css'
import router from './router'

createApp(App)
    .use(router)
    .use(Antd)
    .use(VueChartkick)
    .mount('#app')