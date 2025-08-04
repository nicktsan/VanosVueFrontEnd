export interface Venue {
  id: string
  title: string
  description: string
  location: string
  capacity: number
  pricePerHour: number
  amenities: string[]
  images: string[]
}

export interface Host {
  name: string
  bio: string
}

export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: Date
}

export const venues: Venue[] = [
  {
    id: '0',
    title: 'Modern Conference Center',
    description: 'A sleek, modern space perfect for corporate events and conferences',
    location: 'Downtown San Francisco',
    capacity: 200,
    pricePerHour: 150,
    amenities: ['WiFi', 'Projector', 'Catering Kitchen', 'Parking'],
    images: ['/placeholder.svg'],
  },
  {
    id: '1',
    title: 'Rooftop Garden Venue',
    description: 'Beautiful outdoor space with city views, ideal for weddings and parties',
    location: 'Mission District, SF',
    capacity: 100,
    pricePerHour: 200,
    amenities: ['Garden', 'City Views', 'Sound System', 'Bar Setup'],
    images: ['/placeholder.svg'],
  },
  {
    id: '2',
    title: 'Industrial Warehouse Space',
    description: 'Raw, industrial space perfect for art shows, pop-ups, and creative events',
    location: 'SOMA, San Francisco',
    capacity: 300,
    pricePerHour: 120,
    amenities: ['High Ceilings', 'Loading Dock', 'Basic Lighting', 'Open Floor'],
    images: ['/placeholder.svg'],
  },
]

export const hosts: Record<string, Host> = {
  '0': { name: 'Alice Johnson', bio: 'Event-space owner & coffee aficionado' },
  '1': { name: 'Bob Smith', bio: 'Wedding planner with a passion for design' },
  '2': { name: 'Charlie Brown', bio: 'Creative director and event space enthusiast' },
}

export const reviews: Review[] = [
  {
    id: '0',
    user: 'David Lee',
    rating: 5,
    comment: 'Great acoustics and friendly staff!',
    date: new Date('2025-06-01'),
  },
  {
    id: '1',
    user: 'Emma Wilson',
    rating: 4,
    comment: 'Beautiful venue.',
    date: new Date('2025-06-02'),
  },
  {
    id: '2',
    user: 'Frank Garcia',
    rating: 3,
    comment: 'Nice space',
    date: new Date('2025-06-03'),
  },
]
