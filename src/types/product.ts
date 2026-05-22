export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "coming_soon";

/** Category slug from admin (e.g. seeds, fertilizer). */
export type ProductCategory = string;

export interface Product {
  id: number;
  name: string;
  nameHi: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  /** Optional extra URLs; local files `{id}-2.jpg` etc. are preferred when present */
  images?: string[];
  description: string;
  descriptionHi: string;
  stockStatus: StockStatus;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const SHOP_PHONE = "918318576674";
export const SHOP_PHONE_DISPLAY = "+91 8318576674";
export const SHOP_PHONE_2 = "918318576674";
export const SHOP_EMAIL = "info@agroseeds.com";
export const SHOP_ADDRESS = "123 Agriculture Market, Delhi - 110001, India";
export const SHOP_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=28.6315,77.2167";
export const SHOP_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.854489374!2d77.214!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTInNTAuNCJF!5e0!3m2!1sen!2sin!4v1";
