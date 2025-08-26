export type UserRole = 'admin' | 'staff' | 'user';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
}

export interface YarnSkein {
  id: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  position: { x: number; y: number };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  color?: string;
  weight: string;
  description: string;
  stock: number;
  material: string;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
}

export interface Collection {
  id: string
  title: string
  description: string
  imageClass: string
  buttonText: string
}

export interface Step {
  id: string
  icon: string
  title: string
  description: string
}

export type PageType = 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'staff';

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface NewsletterForm {
  email: string
}

export interface SearchResult {
  id: string
  name: string
  category: string
  price: number
  image: string
}




