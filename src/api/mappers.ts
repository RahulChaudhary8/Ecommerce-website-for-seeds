import type { ApiProduct } from "./types";
import type { Product } from "../types/product";

export function mapApiProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    nameHi: p.name_hi,
    category: p.category,
    price: Number(p.price),
    unit: p.unit,
    image: p.image,
    images: p.images?.length ? p.images : undefined,
    description: p.description,
    descriptionHi: p.description_hi,
    stockStatus: p.stock_status,
    originalPrice: p.original_price != null ? Number(p.original_price) : undefined,
  };
}
