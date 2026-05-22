import { X, BookmarkPlus, MessageCircle } from "lucide-react";
import type { Product } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsApp } from "../../utils/whatsapp";
import { useShopContact, useSiteData } from "../../context/SiteDataContext";
import ProductImageGallery from "./ProductImageGallery";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  isSaved: boolean;
}

const stockStyles = {
  in_stock: "bg-green-500",
  low_stock: "bg-amber-500",
  out_of_stock: "bg-red-500",
  coming_soon: "bg-blue-500",
};

export default function QuickViewModal({ product, onClose, onSave, isSaved }: QuickViewModalProps) {
  const { language, t } = useLanguage();
  const { phone } = useShopContact();
  const { getCategoryLabel } = useSiteData();

  if (!product) return null;

  const name = language === "hi" ? product.nameHi : product.name;
  const description = language === "hi" ? product.descriptionHi : product.description;
  const categoryLabel = getCategoryLabel(product.category, language);
  const canSave = product.stockStatus === "in_stock" || product.stockStatus === "low_stock";
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[60]" onClick={onClose} />
      <div
        className="fixed z-[60] bg-white shadow-2xl overflow-hidden flex flex-col
          inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
          sm:max-w-lg sm:w-[calc(100%-2rem)] sm:max-h-[90vh] sm:rounded-xl
          max-h-[100dvh] sm:max-h-[90dvh]"
      >
        <div className="relative flex-shrink-0">
          <ProductImageGallery product={product} alt={name} />
          {discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-full">
              {discount}% {t.products.off}
            </span>
          )}
          <span
            className={`absolute top-3 right-14 text-white text-xs px-2 py-1 rounded-full ${stockStyles[product.stockStatus]}`}
          >
            {t.stock[product.stockStatus]}
          </span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full hover:bg-white touch-target shadow"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          <span className="text-xs text-gray-500 uppercase">{categoryLabel}</span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1 mb-2 break-words">{name}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex flex-wrap items-baseline gap-2 mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-base sm:text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-sm text-gray-500 w-full sm:w-auto">{product.unit}</span>
          </div>
          <div className="flex flex-col gap-2 pb-[env(safe-area-inset-bottom)]">
            <button
              onClick={() => onSave(product)}
              disabled={!canSave || isSaved}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 touch-target"
            >
              <BookmarkPlus className="size-4" />
              {isSaved ? t.products.saved : t.products.save}
            </button>
            <button
              onClick={() => openWhatsApp(t.whatsapp.productAsk(name), phone)}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 touch-target"
            >
              <MessageCircle className="size-4" />
              {t.products.askWhatsApp}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
