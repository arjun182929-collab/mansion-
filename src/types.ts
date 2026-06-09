export interface Product {
  id: string;
  name: string;
  category: string; // one of the 10 categories
  subtitle: string;
  image: string;
  gallery: string[];
  materials: string[];
  dimensions: string;
  colors: string[];
  customizationOptions: string[];
  productionTime: string;
  moq: string;
  packagingDetails: string;
  shippingInfo: string;
  description: string;
  specifications: { [key: string]: string };
  priceApprox: number; // For currency converter and filter
}

export interface Project {
  id: string;
  title: string;
  category: string; // Hotel Projects, Villa Projects, Apartment Projects, Restaurant Projects, Commercial Projects
  image: string;
  gallery: string[];
  description: string;
  furnitureSupplied: string[];
  timeline: string;
  clientRequirements: string;
  finalResult: string;
  location: string;
}

export interface FactoryDepartment {
  name: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: string; // Licensing, Audit, Product Quality, Export
  imageLabel: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string; // Furniture Trends, Interior Design, Hotel Furniture, Villa Furniture, Manufacturing, Buying Guides
  date: string;
  image: string;
  author: string;
  readTime: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  emailAddress: string;
  whatsappNumber: string;
  companyName: string;
  message: string;
  productName: string;
  interestType: string;
  dateReceived: string;
}

export type ViewType = 
  | "home"
  | "products"
  | "projects"
  | "factory"
  | "certifications"
  | "blog"
  | "about"
  | "contact"
  | "wishlist"
  | "compare"
  | "inquiry-logs";

export type LanguageCode = "en" | "zh" | "fr" | "it";

export type CurrencyCode = "USD" | "EUR" | "CNY";
