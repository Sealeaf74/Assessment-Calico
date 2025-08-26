export interface YarnSkein {
  id: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  imageClass: string;
  buttonText: string;
}

export interface Step {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface NewsletterForm {
  email: string;
}

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}
