import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import EventsView from '@/views/EventsView.vue'
import VenuesView from '@/views/VenuesView.vue'
import CreateEventView from '@/views/CreateEventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: MyProfileView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/venues',
      name: 'venues',
      component: VenuesView,
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreateEventView,
    },
  ],
})

export default router
