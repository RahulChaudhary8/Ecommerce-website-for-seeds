/** In dev, Vite proxies /api → Django. Set VITE_API_URL for production. */
export const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000/api");
