import { History } from "lucide-react";
import { products } from "../../data/products";
import { useLanguage } from "../../context/LanguageContext";

interface RecentlyViewedProps {
  recentIds: number[];
  onQuickView: (id: number) => void;
}

export default function RecentlyViewed({ recentIds, onQuickView }: RecentlyViewedProps) {
  const { language, t } = useLanguage();
  const items = recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="py-6 sm:py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <History className="size-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.recent.title}</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {items.map((p) => {
            if (!p) return null;
            const name = language === "hi" ? p.nameHi : p.name;
            return (
              <button
                key={p.id}
                onClick={() => onQuickView(p.id)}
                className="flex-shrink-0 snap-start w-36 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow text-left touch-target"
              >
                <img src={p.image} alt={name} className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2">{name}</p>
                  <p className="text-sm font-bold text-green-600 mt-1">₹{p.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
