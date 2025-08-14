import type { Community } from './communities'

interface Notification {
  from: Community
  content: string
}

const notifications: Notification[] = [
  {
    from: {
      id: '3',
      name: 'Indie Game Devs',
      description:
        'Collaborate, showcase, and get feedback on your indie game projects. Looking to collaborate with gaming communities for beta testing.',
      detailedAbout:
        'Indie Game Devs is a collaborative hub for independent game developers to share projects, exchange feedback, and explore partnerships. We focus on fostering creativity, supporting technical problem-solving, and providing a platform for showcasing games to a like-minded audience. Our community connects developers, artists, and testers in a vibrant space where ideas evolve into polished interactive experiences.',
      categories: [
        'Entertainment',
        'Computer Games',
        'Software & IT Services',
        'Computer Software',
      ],
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
    content:
      'Hello, we are a group that connects indie game devs. We are looking to collaborate in future events since we share common interests.',
  },
]
export { notifications }
export type { Notification }
