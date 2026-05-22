import type { ProductCategory, StockStatus } from "../types/product";

export interface ApiShopSettings {
  phone_e164: string;
  phone_display: string;
  email: string;
  address: string;
  maps_url: string;
  maps_embed_url: string;
  metro_note: string;
  metro_note_hi: string;
  bus_note: string;
  bus_note_hi: string;
  parking_note: string;
  parking_note_hi: string;
  contact_note: string;
  contact_note_hi: string;
  weekday_label: string;
  weekday_label_hi: string;
  sunday_label: string;
  sunday_label_hi: string;
  weekday_hours: string;
  sunday_hours: string;
  weekday_open_hour: number;
  weekday_close_hour: number;
  sunday_open_hour: number;
  sunday_close_hour: number;
  stat_years: string;
  stat_farmers: string;
  stat_products: string;
  stat_quality: string;
}

export interface ApiCategory {
  id: number;
  slug: string;
  name: string;
  name_hi: string;
  sort_order: number;
}

export interface ApiAboutFeature {
  id: number;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  icon: string;
  sort_order: number;
}

export interface ApiSiteConfig {
  settings: ApiShopSettings;
  about_features: ApiAboutFeature[];
  pincodes: string[];
}

export interface ApiProduct {
  id: number;
  name: string;
  name_hi: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  images: string[];
  description: string;
  description_hi: string;
  stock_status: StockStatus;
  original_price: number | null;
  sort_order: number;
}

export interface ApiFaq {
  id: number;
  question: string;
  question_hi: string;
  answer: string;
  answer_hi: string;
}

export interface ApiTip {
  id: number;
  title: string;
  title_hi: string;
  excerpt: string;
  excerpt_hi: string;
  content: string;
  content_hi: string;
  season: string;
  season_hi: string;
  icon: string;
}

export interface ApiScheme {
  id: number;
  name: string;
  name_hi: string;
  description: string;
  description_hi: string;
  benefit: string;
  benefit_hi: string;
  link: string;
  icon: string;
}

export interface ApiTestimonial {
  id: number;
  name: string;
  name_hi: string;
  location: string;
  location_hi: string;
  text: string;
  text_hi: string;
  rating: number;
  image: string;
  crop: string;
  crop_hi: string;
}

export interface ApiGallery {
  id: number;
  url: string;
  caption: string;
  caption_hi: string;
}

export interface ApiSeedRate {
  id: string;
  name: string;
  name_hi: string;
  kg_per_acre: number;
  unit: string;
}

export interface ApiSowing {
  id: number;
  month: string;
  monthHi: string;
  season: string;
  seasonHi: string;
  crops: string[];
  cropsHi: string[];
}

export type ApiCropAdvisorRules = Record<string, Record<string, ProductCategory>>;
