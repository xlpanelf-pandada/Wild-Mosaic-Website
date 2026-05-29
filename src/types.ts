export interface Workshop {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  date: string;
  seatsTotal: number;
  seatsLeft: number;
  level: "Beginner" | "Intermediate" | "All Levels";
  includes: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "student" | "original";
  image: string;
  dimensions: string;
  materials: string;
  isAvailableForSale?: boolean;
  price?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingSubmission {
  workshopId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  numberOfGuests: number;
  notes?: string;
}

export interface CommissionSubmission {
  userName: string;
  userEmail: string;
  projectType: string;
  dimensions: string;
  budgetRange: string;
  description: string;
}

export interface NewsletterSubmission {
  email: string;
}
