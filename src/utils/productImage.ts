/** Local shop photos: add `public/images/products/{id}.jpg` (e.g. 1.jpg, 2.jpg). */
export const PRODUCT_PLACEHOLDER = "/images/placeholder.svg";

export const MAX_PRODUCT_GALLERY_SLOTS = 4;

export function getLocalProductImage(id: number, slot = 0): string {
  return slot === 0 ? `/images/products/${id}.jpg` : `/images/products/${id}-${slot + 1}.jpg`;
}

export function getLocalGalleryImage(index: number): string {
  return `/images/gallery/${index + 1}.jpg`;
}

/** Extra online images per category until you add local `id-2.jpg`, `id-3.jpg`, etc. */
const CATEGORY_EXTRA_IMAGES: Record<string, string[]> = {
  seeds: [
    "https://images.unsplash.com/photo-1635562985686-4f8bb9c0d3bf?w=800&q=80",
    "https://images.unsplash.com/photo-1574323347407-f5f1f6080b8c?w=800&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  ],
  fertilizer: [
    "https://images.unsplash.com/photo-1599320092708-8a9dde49fc2c?w=800&q=80",
    "https://images.unsplash.com/photo-1592997572594-34be01bc36c7?w=800&q=80",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  ],
  pesticides: [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  ],
  tools: [
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  ],
  organic: [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
  ],
  animal_feed: [
    "https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?w=800&q=80",
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
  ],
  irrigation: [
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  ],
};

export function getProductImageCandidates(
  productId: number,
  category: string,
  fallbackSrc: string,
  extraImages?: string[]
): string[] {
  const local = Array.from({ length: MAX_PRODUCT_GALLERY_SLOTS }, (_, i) =>
    getLocalProductImage(productId, i)
  );
  const pool = CATEGORY_EXTRA_IMAGES[category] ?? [];
  const fromPool = [
    pool[productId % pool.length],
    pool[(productId + 1) % pool.length],
    pool[(productId + 2) % pool.length],
  ].filter(Boolean);
  const seen = new Set<string>();
  return [...local, ...(extraImages ?? []), ...fromPool, fallbackSrc].filter((src) => {
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

export function probeImageUrls(urls: string[]): Promise<string[]> {
  const checks = urls.map(
    (src) =>
      new Promise<string | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
      })
  );
  return Promise.all(checks).then((results) => {
    const loaded = results.filter((s): s is string => s !== null);
    return loaded.length > 0 ? loaded : urls.length > 0 ? [urls[urls.length - 1]] : [];
  });
}
