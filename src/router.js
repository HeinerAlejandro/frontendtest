import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Statitics from './views/Statitics.vue'

const routes = [
    {
        path: '/',
        name: 'Poll',
        component: Home
    },
    {
        path: '/statitics',
        name: 'Statitics',
        component: Statitics
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router