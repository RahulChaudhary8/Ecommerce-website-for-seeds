import { BookmarkPlus, MessageCircle, Eye, GitCompare } from "lucide-react";
import type { Product } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsApp } from "../../utils/whatsapp";
import { useShopContact, useSiteData } from "../../context/SiteDataContext";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isSaved?: boolean;
  isInCompare?: boolean;
  onToggleCompare?: (product: Product) => void;
  compareDisabled?: boolean;
}

const stockStyles = {
  in_stock: "bg-green-500 text-white",
  low_stock: "bg-amber-500 text-white",
  out_of_stock: "bg-red-500 text-white",
  coming_soon: "bg-blue-500 text-white",
};

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isSaved,
  isInCompare,
  onToggleCompare,
  compareDisabled,
}: ProductCardProps) {
  const { language, t } = useLanguage();
  const { getCategoryLabel } = useSiteData();
  const name = language === "hi" ? product.nameHi : product.name;
  const description = language === "hi" ? product.descriptionHi : product.description;
  const categoryLabel = getCategoryLabel(product.category, language);
  const stockLabel = t.stock[product.stockStatus];
  const canSave = product.stockStatus === "in_stock" || product.stockStatus === "low_stock";
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleWhatsApp = () => {
    openWhatsApp(t.whatsapp.productAsk(name), phone);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col group h-full border border-transparent dark:border-gray-700">
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100">
        <ProductImage
          productId={product.id}
          fallbackSrc={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onQuickView(product)}
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full">
            {discount}% {t.products.off}
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium max-w-[45%] truncate ${stockStyles[product.stockStatus]}`}
        >
          {stockLabel}
        </span>
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(product)}
              disabled={compareDisabled && !isInCompare}
              className={`p-2 sm:p-2.5 rounded-full shadow touch-target ${
                isInCompare
                  ? "bg-blue-600 text-white"
                  : "bg-white/90 hover:bg-white text-gray-700 disabled:opacity-50"
              }`}
              title={t.compare.add}
              aria-label={t.compare.add}
            >
              <GitCompare className="size-4" />
            </button>
          )}
          <button
            onClick={() => onQuickView(product)}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 sm:p-2.5 rounded-full shadow
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-target"
            title={t.products.viewDetails}
            aria-label={t.products.viewDetails}
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">{categoryLabel}</span>
        </div>
        <h3
          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2 cursor-pointer hover:text-green-600"
          onClick={() => onQuickView(product)}
        >
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-1">{description}</p>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3 sm:mb-4">
          <p className="text-xl sm:text-2xl font-bold text-green-600">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-xs sm:text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
          )}
          <p className="text-[10px] sm:text-xs text-gray-500 w-full sm:w-auto">{product.unit}</p>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium touch-target"
            disabled={!canSave || isSaved}
          >
            <BookmarkPlus className="size-4 flex-shrink-0" />
            <span className="truncate">{isSaved ? t.products.saved : t.products.save}</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium touch-target"
          >
            <MessageCircle className="size-4 flex-shrink-0" />
            <span className="truncate">{t.products.askWhatsApp}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
