import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../types/product";
import { getProductImageCandidates, probeImageUrls, PRODUCT_PLACEHOLDER } from "../../utils/productImage";
import { useLanguage } from "../../context/LanguageContext";

interface ProductImageGalleryProps {
  product: Product;
  alt: string;
}

export default function ProductImageGallery({ product, alt }: ProductImageGalleryProps) {
  const { t } = useLanguage();
  const [slides, setSlides] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(0);
    setLoading(true);
    const candidates = getProductImageCandidates(
      product.id,
      product.category,
      product.image,
      product.images
    );
    let cancelled = false;
    probeImageUrls(candidates).then((loaded) => {
      if (cancelled) return;
      setSlides(loaded.length > 0 ? loaded : [product.image]);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [product.id, product.category, product.image, product.images]);

  const goTo = (i: number) => {
    const next = ((i % slides.length) + slides.length) % slides.length;
    setIndex(next);
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || slides.length === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index && i >= 0 && i < slides.length) setIndex(i);
  };

  if (loading) {
    return (
      <div className="w-full h-44 sm:h-56 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 text-sm">
        …
      </div>
    );
  }

  const showControls = slides.length > 1;

  return (
    <div className="relative flex-shrink-0">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-44 sm:h-56"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex-shrink-0 w-full h-44 sm:h-56 snap-center snap-always"
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== PRODUCT_PLACEHOLDER) img.src = PRODUCT_PLACEHOLDER;
              }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow touch-target"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-14 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow touch-target"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
          <p className="absolute bottom-2 right-3 text-white/90 text-xs bg-black/40 px-2 py-0.5 rounded">
            {index + 1}/{slides.length}
          </p>
        </>
      )}
      {showControls && (
        <p className="absolute top-12 left-3 text-white/90 text-[10px] bg-black/40 px-2 py-0.5 rounded sm:hidden">
          {t.products.swipePhotos}
        </p>
      )}
    </div>
  );
}
