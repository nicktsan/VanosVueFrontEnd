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
    title: 'Vancouver Convention Center',
    description:
      'The Vancouver Convention Centre in downtown Vancouver is a beautiful, inspiring event space with an unbeatable waterfront location.',
    location: '1055 Canada Pl, Vancouver, BC V6C 0C3',
    capacity: 200,
    pricePerHour: 150,
    amenities: ['WiFi', 'Projector', 'Catering Kitchen', 'Parking'],
    images: ['/images/venues/Vancouver_Convention_Centre_West_Building_KK-Law-3-724x707.jpg'],
  },
  {
    id: '1',
    title: 'Fairmont Waterfront Wedding Venue',
    description: 'Beautiful outdoor space with city views, ideal for weddings and parties',
    location: '900 Canada Place Way, Vancouver, British Columbia V6C 3L5, Canada',
    capacity: 100,
    pricePerHour: 200,
    amenities: ['Garden', 'City Views', 'Sound System', 'Bar Setup'],
    images: ['/images/venues/Fairmont_WFC_Rustic_Credit_Faraway_Studios-6-scaled.webp'],
  },
  {
    id: '2',
    title: 'Industrial Warehouse Space',
    description: 'Raw, industrial space perfect for art shows, pop-ups, and creative events',
    location: 'SOMA, San Francisco',
    capacity: 300,
    pricePerHour: 120,
    amenities: ['High Ceilings', 'Loading Dock', 'Basic Lighting', 'Open Floor'],
    images: ['/images/venues/industrial_warehouse.webp'],
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
