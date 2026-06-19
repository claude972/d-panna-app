export type Urgency = "immediate" | "today" | "this_week" | "planned";

export type Step =
  | "category"
  | "subcategory"
  | "location"
  | "contact"
  | "confirmation";

export interface LeadData {
  category: string;
  subcategory: string;
  urgency: Urgency;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  description: string;
}

export interface Category {
  slug: string;
  label: string;
  icon: string;
  subcategories?: string[];
  color?: string;
}

export interface Testimonial {
  name: string;
  city?: string;
  service?: string;
  rating: number;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface HowItWorksStep {
  num: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}
