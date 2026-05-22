import { API_BASE } from "./config";
import type {
  ApiAboutFeature,
  ApiCategory,
  ApiCropAdvisorRules,
  ApiFaq,
  ApiGallery,
  ApiProduct,
  ApiScheme,
  ApiSeedRate,
  ApiSiteConfig,
  ApiSowing,
  ApiTestimonial,
  ApiTip,
} from "./types";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { detail?: string }).detail || `API ${path}: ${res.status}`);
  return data as T;
}

export const api = {
  site: () => get<ApiSiteConfig>("/site/"),
  categories: () => get<ApiCategory[]>("/categories/"),
  products: () => get<ApiProduct[]>("/products/"),
  faq: () => get<ApiFaq[]>("/faq/"),
  tips: () => get<ApiTip[]>("/tips/"),
  schemes: () => get<ApiScheme[]>("/schemes/"),
  testimonials: () => get<ApiTestimonial[]>("/testimonials/"),
  suggestTestimonial: (body: {
    name: string;
    location: string;
    farming_type: string;
    rating: number;
    description: string;
    phone?: string;
  }) => post<{ ok: boolean; message: string }>("/testimonials/suggest/", body),
  gallery: () => get<ApiGallery[]>("/gallery/"),
  seedRates: () => get<ApiSeedRate[]>("/seed-rates/"),
  sowing: () => get<ApiSowing[]>("/sowing-calendar/"),
  cropAdvisor: () => get<ApiCropAdvisorRules>("/crop-advisor/"),
  newsletter: (phone: string) => post<{ ok: boolean; message: string }>("/newsletter/", { phone }),
};
