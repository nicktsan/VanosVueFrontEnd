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
  detailedAbout: string
  categories: string[]
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
  name: string
  subCategories: string[]
}

const categories: CategoryOption[] = [
  {
    name: 'Agriculture',
    subCategories: ['Dairy', 'Farming', 'Fishery', 'Ranching'],
  },
  {
    name: 'Arts',
    subCategories: ['Arts & Crafts', 'Fine Art', 'Performing Arts', 'Photography'],
  },
  {
    name: 'Construction',
    subCategories: ['Building Materials', 'Civil Engineering', 'Construction'],
  },
  {
    name: 'Consumer Goods',
    subCategories: [
      'Apparel & Fashion',
      'Consumer Electronics',
      'Consumer Goods',
      'Consumer Services',
      'Cosmetics',
      'Food & Beverages',
      'Furniture',
      'Luxury Goods & Jewelry',
      'Sporting Goods',
      'Tobacco',
      'Wine and Spirits',
    ],
  },
  {
    name: 'Corporate Services',
    subCategories: [
      'Accounting',
      'Business Supplies & Equipment',
      'Environmental Services',
      'Events Services',
      'Executive Office',
      'Facilities Services',
      'Human Resources',
      'Information Services',
      'Management Consulting',
      'Outsourcing/Offshoring',
      'Professional Training & Coaching',
      'Security & Investigations',
      'Staffing & Recruiting',
    ],
  },
  {
    name: 'Design',
    subCategories: ['Architecture & Planning', 'Design', 'Graphic Design'],
  },
  {
    name: 'Education',
    subCategories: [
      'Education Management',
      'E-Learning',
      'Higher Education',
      'Primary/Secondary Education',
      'Research',
    ],
  },
  {
    name: 'Energy & Mining',
    subCategories: ['Mining & Metals', 'Oil & Energy', 'Utilities'],
  },
  {
    name: 'Entertainment',
    subCategories: [
      'Animation',
      'Broadcast Media',
      'Computer Games',
      'Entertainment',
      'Media Production',
      'Mobile Games',
      'Motion Pictures & Film',
      'Music',
    ],
  },
  {
    name: 'Finance',
    subCategories: [
      'Banking',
      'Capital Markets',
      'Ficial Services',
      'Insurance',
      'Investment Banking',
      'Investment Management',
      'Venture Capital & Private Equity',
    ],
  },
  {
    name: 'Hardware & Networking',
    subCategories: [
      'Computer Hardware',
      'Computer Networking',
      'otechnologie',
      'Semiconductors',
      'Telecommunications',
      'Wireless',
    ],
  },
  {
    name: 'Health Care',
    subCategories: [
      'Biotechnology',
      'Hospital & Health Care',
      'Medical Device',
      'Medical Practice',
      'Mental Health Care',
      'Pharmaceuticals',
      'Veterinary',
    ],
  },
  {
    name: 'Legal',
    subCategories: ['Alternative Dispute Resolution', 'Law Practice', 'Legal Services'],
  },
  {
    name: 'Manufacturing',
    subCategories: [
      'Automotive',
      'Aviation & Aerospace',
      'Chemicals',
      'Defense & Space',
      'Electrical & Electronic Manufacturing',
      'Food Production',
      'Glass, Ceramics & Concrete',
      'Industrial Automation',
      'Machinery',
      'Mechanical or Industrial Engineering',
      'Packaging & Containers',
      'Paper & Forest Products',
      'Plastics',
      'Railroad Manufacture',
      'Renewables & Environment',
      'Shipbuilding',
      'Textiles',
    ],
  },
  {
    name: 'Media & Communications',
    subCategories: [
      'Market Research',
      'Marketing & Advertising',
      'Newspapers',
      'Online Media',
      'Printing',
      'Public Relations & Communications',
      'Publishing',
      'Translation & Localization',
      'Writing & Editing',
    ],
  },
  {
    name: 'Nonprofit',
    subCategories: [
      'Civic & Social Organization',
      'Fundraising',
      'Individual & Family Services',
      'International Trade & Development',
      'Libraries',
      'Museums & Institutions',
      'Non-Profit Organization Management',
      'Philanthropy',
      'Program Development',
      'Religious Institutions',
      'Think Tanks',
    ],
  },
  {
    name: 'Public Administration',
    subCategories: [
      'Government Administration',
      'Government Relations',
      'International Affairs',
      'Judiciary',
      'Legislative Office',
      'Political Organization',
      'Public Policy',
    ],
  },
  {
    name: 'Public Safety',
    subCategories: ['Law Enforcement', 'Military', 'Public Safety'],
  },
  {
    name: 'Real Estate',
    subCategories: ['Commercial Real Estate', 'Real Estate'],
  },
  {
    name: 'Recreation & Travel',
    subCategories: [
      'Airlines/Aviation',
      'Gambling & Casinos',
      'Hospitality',
      'Leisure, Travel & Tourism',
      'Restaurants',
      'Recreational Facilities & Services',
      'Sports',
    ],
  },
  {
    name: 'Retail',
    subCategories: ['Retail', 'Supermarkets', 'Wholesale'],
  },
  {
    name: 'Software & IT Services',
    subCategories: [
      'Computer & Network Security',
      'Computer Software',
      'Information Technology & Services',
      'Internet',
      'AI',
      'Cloud',
      'Open Source',
    ],
  },
  {
    name: 'Transportation & Logistics',
    subCategories: [
      'Import & Export',
      'Logistics & Supply Chain',
      'Maritime',
      'Package/Freight Delivery',
      'Transportation/Trucking/Railroad',
      'Warehousing',
    ],
  },
  {
    name: 'Wellness & Fitness',
    subCategories: ['Alternative Medicine', 'Health, Wellness & Fitness'],
  },
  {
    name: 'Minorities',
    subCategories: ['LGBTQ', 'BIPOC'],
  },
]

const communities: Community[] = [
  {
    id: '0',
    name: 'Vue.js Enthusiasts',
    description:
      'A global community for developers building with the Vue framework. Looking for food venues for our next event',
    detailedAbout:
      'Vue.js Enthusiasts is a worldwide network of developers passionate about building with the Vue framework. Our community organizes meetups, workshops, and conferences where members share knowledge, explore best practices, and collaborate on open-source projects. We foster a welcoming environment for both beginners and seasoned professionals, encouraging peer-to-peer learning and connections that span across industries and continents.',
    categories: ['Software & IT Services', 'Computer Software', 'Internet', 'Open Source'],
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
    detailedAbout:
      'Urban Sketchers is a global collective of artists dedicated to capturing the essence of cities through on-location drawing. Our members share techniques, participate in sketch walks, and connect over a shared love for architecture, culture, and street life. We believe in documenting the world one drawing at a time, celebrating diverse perspectives and storytelling through art.',
    categories: ['Arts', 'Fine Art', 'Photography'],
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
    detailedAbout:
      'Trail Runners Club is a community of running enthusiasts who come together to explore scenic trails, improve fitness, and share the joy of outdoor adventures. We welcome runners of all levels, offering weekly group runs, training advice, and social activities. Whether you are preparing for your next race or simply enjoy a jog in nature, our club provides camaraderie and encouragement every step of the way.',
    categories: [
      'Wellness & Fitness',
      'Health, Wellness & Fitness',
      'Recreation & Travel',
      'Sports',
    ],
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
    detailedAbout:
      'Indie Game Devs is a collaborative hub for independent game developers to share projects, exchange feedback, and explore partnerships. We focus on fostering creativity, supporting technical problem-solving, and providing a platform for showcasing games to a like-minded audience. Our community connects developers, artists, and testers in a vibrant space where ideas evolve into polished interactive experiences.',
    categories: ['Entertainment', 'Computer Games', 'Software & IT Services', 'Computer Software'],
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
    detailedAbout:
      'Plant-Based Cooking is a welcoming space for individuals passionate about healthy, sustainable eating. Our community shares recipes, cooking tips, and nutritional advice to help members enjoy plant-based meals without compromising on taste. We encourage collaborations with local farmers, restaurants, and chefs to inspire creativity and foster a deeper connection to the food we eat.',
    categories: [
      'Consumer Goods',
      'Food & Beverages',
      'Recreation & Travel',
      'Restaurants',
      'Agriculture',
    ],
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
    detailedAbout:
      'Lifelong Learners is a knowledge-driven community where curiosity is celebrated and learning never stops. Members exchange resources, review online courses, and explore diverse subjects ranging from technology to the arts. We provide an inclusive space for discussions, peer support, and collaborative learning projects, encouraging members to expand their horizons at any stage of life.',
    categories: [
      'Education',
      'E-Learning',
      'Higher Education',
      'Software & IT Services',
      'Information Technology & Services',
    ],
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
    detailedAbout:
      'Nick Gaming Community is a vibrant group of gamers who unite to organize events, tournaments, and collaborative projects with other gaming communities. Our focus is on fostering friendships, sharing strategies, and building a supportive environment for casual and competitive players alike. We embrace all platforms and genres, encouraging diverse gaming experiences and meaningful connections.',
    categories: ['Entertainment', 'Computer Games', 'Mobile Games'],
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
