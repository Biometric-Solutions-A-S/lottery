import { createRouter, createWebHistory } from 'vue-router'
import SessionView from '../views/SessionView.vue'
import HomeView from '../views/HomeView.vue'
import PeopleView from '../views/PeopleView.vue'
import WinnerView from '../views/WinnerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'session',
      component: SessionView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresSession: true },
    },
    {
      path: '/people',
      name: 'people',
      component: PeopleView,
      meta: { requiresSession: true },
    },
    {
      path: '/winner',
      name: 'winner',
      component: WinnerView,
      meta: { requiresSession: true },
    },
  ],
})

router.beforeEach((to) => {
  const sessionId = localStorage.getItem('people-session-id')

  if (to.meta.requiresSession && !sessionId) {
    return { name: 'session' }
  }
})

export default router
