import { ref } from 'vue'

interface Community {
  id: string
  name: string
  description: string
  category: string
  image: string
  creator: string
  members: number
}

interface CategoryOption {
  label: string
  value: string
}

const categories: CategoryOption[] = [
  { label: 'Tech', value: 'Tech' },
  { label: 'Art', value: 'Art' },
  { label: 'Fitness', value: 'Fitness' },
  { label: 'Education', value: 'Education' },
  { label: 'Gaming', value: 'Gaming' },
  { label: 'Food', value: 'Food' },
]

const communities = ref<Community[]>([
  {
    id: '1',
    name: 'Vue.js Enthusiasts',
    description: 'A global community for developers building with the Vue framework.',
    category: 'Tech',
    image: 'https://source.unsplash.com/random/800x400?code',
    creator: 'Evan You',
    members: 8740,
  },
  {
    id: '2',
    name: 'Urban Sketchers',
    description: 'Join artists who love sketching cityscapes and sharing techniques.',
    category: 'Art',
    image: 'https://source.unsplash.com/random/800x400?art',
    creator: 'Gabi Campanario',
    members: 1542,
  },
  {
    id: '3',
    name: 'Trail Runners Club',
    description: 'Weekend runs, training tips, and race meet-ups for all levels.',
    category: 'Fitness',
    image: 'https://source.unsplash.com/random/800x400?running',
    creator: 'Sarah Kim',
    members: 312,
  },
  {
    id: '4',
    name: 'Indie Game Devs',
    description: 'Collaborate, showcase, and get feedback on your indie game projects.',
    category: 'Gaming',
    image: 'https://source.unsplash.com/random/800x400?gaming',
    creator: 'Mark Brown',
    members: 2115,
  },
  {
    id: '5',
    name: 'Plant-Based Cooking',
    description: 'Recipes, tips, and challenges for healthy plant-based eating.',
    category: 'Food',
    image: 'https://source.unsplash.com/random/800x400?food',
    creator: 'Nisha Vora',
    members: 974,
  },
  {
    id: '6',
    name: 'Lifelong Learners',
    description: 'Discuss online courses, share resources, and stay curious together.',
    category: 'Education',
    image: 'https://source.unsplash.com/random/800x400?education',
    creator: 'Ali Abdaal',
    members: 5830,
  },
])

export { categories, communities }
export type { Community, CategoryOption }
