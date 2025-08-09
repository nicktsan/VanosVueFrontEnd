import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import CommunitiesView from '@/views/CommunitiesView.vue'
import CommunityDetailsView from '@/views/CommunityDetailsView.vue'
import { communities } from '@/data/communities'
import CreateCommunityView from '@/views/CreateCommunityView.vue'

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
      path: '/communities',
      name: 'communities',
      component: CommunitiesView,
    },
    {
      path: '/create-community',
      name: 'create-community',
      component: CreateCommunityView,
    },
    {
      path: '/communitydetails/:id',
      name: 'CommunityDetails',
      component: CommunityDetailsView,

      props: (route) => {
        const id = route.params.id as string

        return {
          community: communities.find((e) => e.id === id)!,
        }
      },
    },
  ],
})

export default router
