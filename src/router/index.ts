import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import EventsView from '@/views/EventsView.vue'
import VenuesView from '@/views/VenuesView.vue'
import CreateEventView from '@/views/CreateEventView.vue'
import CreateVenueView from '@/views/CreateVenueView.vue'
import VenueDetailsView from '@/views/VenueDetailsView.vue'
import { venues, hosts, reviews } from '@/data/venues'
import EventDetailsView from '@/views/EventDetailsView.vue'
import { events } from '@/data/events'
import CommunitiesView from '@/views/CommunitiesView.vue'

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
      path: '/communities',
      name: 'communities',
      component: CommunitiesView,
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreateEventView,
    },
    {
      path: '/create-venue',
      name: 'create-venue',
      component: CreateVenueView,
    },
    {
      path: '/venuedetails/:id',
      name: 'VenueDetails',
      component: VenueDetailsView,
      props: (route) => {
        const id = route.params.id as string

        return {
          venue: venues.find((v) => v.id === id)!,
          host: hosts[id],
          reviews: reviews.filter((r) => r.id.startsWith(id)),
        }
      },
    },
    {
      path: '/eventdetails/:id',
      name: 'EventDetails',
      component: EventDetailsView,

      props: (route) => {
        const id = route.params.id as string

        return {
          event: events.find((e) => e.id === id)!,
        }
      },
    },
  ],
})

export default router
