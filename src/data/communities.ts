interface Comment {
  authorName: string
  content: string
  likes: number
  comments: Comment[]
}

interface Post {
  authorName: string
  title: string
  content: string
  likes: number
  comments: Comment[]
}

interface Community {
  id: string
  name: string
  description: string
  category: string
  image?: string
  creator: string
  members: number
  lookingFor: string[]
  location: string
  pastCollaborators?: string[]
  currentCollaborators?: string[]
  posts: Post[]
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

const communities: Community[] = [
  {
    id: '0',
    name: 'Vue.js Enthusiasts',
    description:
      'A global community for developers building with the Vue framework. Looking for food venues for our next event',
    category: 'Tech',
    image: '/images/communities/vuelogo.png',
    creator: 'Evan You',
    members: 8740,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Food'],
    pastCollaborators: ['Urban Sketchers'],
    posts: [
      {
        authorName: 'Evan You',
        title: 'Call for caterers for VueConf meetup',
        content:
          'We’re scouting food vendors for next month’s meetup (100–150 attendees). Recommendations welcome—bonus points for vegetarian options.',
        likes: 128,
        comments: [
          {
            authorName: 'Nisha Vora',
            content: 'Happy to connect you with a plant-based caterer we used last quarter. DM me!',
            likes: 37,
            comments: [],
          },
          {
            authorName: 'Mark Brown',
            content:
              'Indie Game Devs used StreetGrains and had a great experience. Reasonable pricing.',
            likes: 22,
            comments: [
              {
                authorName: 'Evan You',
                content: 'Thanks! Adding them to the shortlist.',
                likes: 9,
                comments: [],
              },
            ],
          },
        ],
      },
      {
        authorName: 'Sarah Kim',
        title: 'Vue 3.5 features AMA',
        content:
          'Dropping a Q&A thread for the new reactivity ergonomics. Ask away, I’ll answer tonight.',
        likes: 76,
        comments: [],
      },
    ],
  },
  {
    id: '1',
    name: 'Urban Sketchers',
    description: 'Join artists who love sketching cityscapes and sharing techniques.',
    category: 'Art',
    image: '/images/communities/urban sketcher.jpg',
    creator: 'Gabi Campanario',
    members: 1542,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Fitness'],
    pastCollaborators: ['Vue.js Enthusiasts'],
    posts: [
      {
        authorName: 'Gabi Campanario',
        title: 'Plein air meetup recap: Gastown',
        content:
          'Great turnout! Posting a thread for your sketches—share tips on perspective and shading.',
        likes: 91,
        comments: [
          {
            authorName: 'Ali Abdaal',
            content:
              'Would love a short tutorial video for beginners. Could cross-post to Lifelong Learners.',
            likes: 18,
            comments: [],
          },
        ],
      },
      {
        authorName: 'Sarah Kim',
        title: 'Sketch-walk + stretch collab?',
        content: 'Trail Runners Club can lead a gentle warm-up before sketching. Interested?',
        likes: 34,
        comments: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Trail Runners Club',
    description: 'Weekend runs, training tips, and race meet-ups for all levels.',
    category: 'Fitness',
    image: '/images/communities/trail_runners_club.png',
    creator: 'Sarah Kim',
    members: 312,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Art'],
    posts: [
      {
        authorName: 'Sarah Kim',
        title: 'Saturday 10K — Lynn Canyon',
        content:
          'Meet 8:00 AM at the suspension bridge parking lot. Pace 5:30–6:15/km. Coffee after!',
        likes: 45,
        comments: [
          {
            authorName: 'Mark Brown',
            content:
              'I’ll bring a GoPro—maybe we can turn this into a background pack for artists.',
            likes: 11,
            comments: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Indie Game Devs',
    description:
      'Collaborate, showcase, and get feedback on your indie game projects. Looking to collaborate with gaming communities for beta testing.',
    category: 'Gaming',
    image: '/images/communities/indiegamedevs.png',
    creator: 'Mark Brown',
    members: 2115,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Tech', 'Gaming'],
    currentCollaborators: ['Nick Gaming Community'],
    posts: [
      {
        authorName: 'Mark Brown',
        title: 'Need testers for pixel roguelite (closed beta)',
        content:
          'Looking for 50 testers across PC and Switch. Perks: credit + early access Discord role.',
        likes: 203,
        comments: [
          {
            authorName: 'Nicholas Tsang',
            content:
              'Nick Gaming Community can funnel 20 reliable testers. Let’s coordinate dates.',
            likes: 56,
            comments: [
              {
                authorName: 'Mark Brown',
                content: 'Amazing—DMing you a scheduling link.',
                likes: 21,
                comments: [],
              },
            ],
          },
        ],
      },
      {
        authorName: 'Evan You',
        title: 'Tech stack Q: ECS libraries you like?',
        content: 'Curious what Entity Component System libs folks are shipping with in 2025.',
        likes: 67,
        comments: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Plant-Based Cooking',
    description:
      'Recipes, tips, and challenges for healthy plant-based eating. Looking for partnerships with farmers.',
    category: 'Food',
    image: '/images/communities/plantbasedcooking.jpg',
    creator: 'Nisha Vora',
    members: 974,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Education', 'Agriculture'],
    posts: [
      {
        authorName: 'Nisha Vora',
        title: 'CSA farm partners wanted',
        content:
          'Seeking local farms for a seasonal veggie box collab. We can co-produce recipe cards.',
        likes: 112,
        comments: [
          {
            authorName: 'Sarah Kim',
            content: 'Happy to connect you with a North Shore farm we love.',
            likes: 14,
            comments: [],
          },
        ],
      },
      {
        authorName: 'Ali Abdaal',
        title: '30-minute weeknight tofu challenge',
        content:
          'Post your fastest, tastiest tofu dinners. Winner gets a feature in our next newsletter.',
        likes: 49,
        comments: [],
      },
    ],
  },
  {
    id: '5',
    name: 'Lifelong Learners',
    description: 'Discuss online courses, share resources, and stay curious together.',
    category: 'Education',
    image: '/images/communities/lifelonglearners.jpg',
    creator: 'Ali Abdaal',
    members: 5830,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Tech', 'Art', 'Education'],
    posts: [
      {
        authorName: 'Ali Abdaal',
        title: 'Best note-taking workflows (2025 edition)',
        content:
          'What’s your current stack? I’m testing Markdown + spaced repetition + canvas boards.',
        likes: 188,
        comments: [
          {
            authorName: 'Evan You',
            content: 'We built a small Vue app to auto-tag highlights. Could share the repo.',
            likes: 33,
            comments: [],
          },
        ],
      },
      {
        authorName: 'Gabi Campanario',
        title: 'Micro-courses: urban sketching fundamentals',
        content: 'Thinking of a 4-week intro—interest check?',
        likes: 73,
        comments: [],
      },
    ],
  },
  {
    id: '6',
    name: 'Nick Gaming Community',
    description:
      'Nick Gaming Community description. Looking to collaborate with other gaming communities for an upcoming event.',
    category: 'Gaming',
    image: '/images/communities/nicksgaming.webp',
    creator: 'Nicholas Tsang',
    members: 123,
    location: 'Vancouver, BC, Canada',
    lookingFor: ['Gaming'],
    currentCollaborators: ['Indie Game Devs'],
    posts: [
      {
        authorName: 'Nicholas Tsang',
        title: 'Co-hosted tournament with Indie Game Devs',
        content:
          'Planning a cross-community tourney next month. Poll incoming for game picks & dates.',
        likes: 64,
        comments: [
          {
            authorName: 'Mark Brown',
            content: 'We can provide servers + mods. Let’s sync this week.',
            likes: 19,
            comments: [],
          },
        ],
      },
      {
        authorName: 'Sarah Kim',
        title: 'Looking for shoutcasters',
        content:
          'If you’ve got casting experience (or want to practice), we’ll run a training session.',
        likes: 27,
        comments: [],
      },
    ],
  },
]

export { categories, communities }
export type { Community, CategoryOption, Post, Comment }
