export interface User {
  id: string;
  email: string;
  displayName: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    newsletter: boolean;
  };
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FormErrors {
  [key: string]: string;
}
