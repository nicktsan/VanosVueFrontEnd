export interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  venue: string
  location: string
  maxAttendees: number
  price: number
  status: string
  picture?: string
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors in the Bay Area tech scene',
    startTime: new Date('2024-01-15T18:00:00'),
    endTime: new Date('2024-01-15T21:00:00'),
    venue: 'Modern Conference Center',
    location: 'Downtown San Francisco',
    maxAttendees: 150,
    price: 25,
    status: 'published',
    picture: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Sustainable Living Workshop',
    description: 'Learn practical tips for reducing your environmental footprint',
    startTime: new Date('2024-01-20T14:00:00'),
    endTime: new Date('2024-01-20T17:00:00'),
    venue: 'Rooftop Garden Venue',
    location: 'Mission District, SF',
    maxAttendees: 50,
    price: 0,
    status: 'published',
    picture: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Local Artists Showcase',
    description: 'An evening celebrating local talent with art, music, and performance',
    startTime: new Date('2024-01-25T19:00:00'),
    endTime: new Date('2024-01-25T23:00:00'),
    venue: 'Industrial Warehouse Space',
    location: 'SOMA, San Francisco',
    maxAttendees: 200,
    price: 15,
    status: 'published',
    picture: '/placeholder.svg',
  },
]
