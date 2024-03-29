import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
