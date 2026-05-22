import { useState } from "react";
import { Store, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function ShopGallery() {
  const { language, t } = useLanguage();
  const { gallery: galleryImages } = useSiteData();
  const [index, setIndex] = useState(0);

  if (galleryImages.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));

  const current = galleryImages[index];
  const caption = language === "hi" ? current.caption_hi : current.caption;

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Store className="size-4" />
            <span className="text-sm font-medium">{t.gallery.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.gallery.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.gallery.subtitle}</p>
        </div>

        <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
          <img src={current.url} alt={caption} className="w-full aspect-[4/3] sm:aspect-video object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
            <p className="text-white font-semibold text-sm sm:text-base">{caption}</p>
            <p className="text-white/70 text-sm mt-1">
              {index + 1} / {galleryImages.length}
            </p>
          </div>
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 sm:p-2 rounded-full shadow touch-target"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 sm:p-2 rounded-full shadow touch-target"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`size-2 rounded-full transition-colors ${
                i === index ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
