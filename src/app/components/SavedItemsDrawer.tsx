import { X, Trash2, MapPin, Clock, Printer, MessageCircle, Mail, Minus, Plus } from "lucide-react";
import type { CartItem } from "../../types/product";
import { SHOP_ADDRESS, SHOP_EMAIL } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsApp, buildSavedListMessage } from "../../utils/whatsapp";
import ProductImage from "./ProductImage";

interface SavedItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export default function SavedItemsDrawer({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onUpdateQuantity,
}: SavedItemsDrawerProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const total = savedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = savedItems.reduce((sum, item) => sum + item.quantity, 0);

  const getItemName = (item: CartItem) => (language === "hi" ? item.nameHi : item.name);

  const buildListText = () =>
    savedItems
      .map((item, i) => {
        const qty = item.quantity > 1 ? ` x${item.quantity}` : "";
        return `${i + 1}. ${getItemName(item)}${qty} — ₹${item.price * item.quantity} (${item.unit})`;
      })
      .join("\n");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = savedItems
      .map(
        (item) =>
          `<tr><td>${getItemName(item)}</td><td>${item.quantity}</td><td>₹${item.price * item.quantity}</td><td>${item.unit}</td></tr>`
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AgroSeeds - Visit List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            h1 { color: #16a34a; }
            .note { color: #b45309; font-size: 14px; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f0fdf4; }
            .total { font-weight: bold; margin-top: 16px; font-size: 18px; }
            .address { margin-top: 24px; color: #666; }
          </style>
        </head>
        <body>
          <h1>AgroSeeds - Visit List</h1>
          <p class="note">${t.visitOnly.notice}</p>
          <p>Date: ${new Date().toLocaleDateString("en-IN")} | Items: ${itemCount}</p>
          <table>
            <thead><tr><th>Product</th><th>Qty</th><th>Est. Price</th><th>Unit</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p class="total">Estimated Total: ₹${total}</p>
          <div class="address">
            <p><strong>Visit us at:</strong></p>
            <p>${SHOP_ADDRESS}</p>
            <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareWhatsApp = () => {
    openWhatsApp(buildSavedListMessage(savedItems, language, total));
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("AgroSeeds - My Visit List");
    const body = encodeURIComponent(
      `${t.visitOnly.notice}\n\n${buildListText()}\n\nEstimated Total: ₹${total}\n\nShop Address: ${SHOP_ADDRESS}`
    );
    window.location.href = `mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      <div
        className="fixed right-0 top-0 h-full h-[100dvh] w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col
          pt-[env(safe-area-inset-top)]"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{t.drawer.title}</h2>
            <p className="text-xs text-gray-600 truncate">{t.drawer.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-target flex-shrink-0"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4">
          {savedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 px-4">
              <svg className="size-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-center">{t.drawer.empty}</p>
              <p className="text-sm text-gray-400 mt-2 text-center">{t.drawer.emptyHint}</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {savedItems.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 bg-gray-50 p-3 rounded-lg">
                  <ProductImage
                    productId={item.id}
                    fallbackSrc={item.image}
                    alt={getItemName(item)}
                    className="size-16 sm:size-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{getItemName(item)}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.unit}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="font-bold text-green-600">₹{item.price * item.quantity}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 mr-1">{t.drawer.qty}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 rounded bg-white border border-gray-200 disabled:opacity-40 touch-target"
                          aria-label={t.drawer.decrease}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded bg-white border border-gray-200 touch-target"
                          aria-label={t.drawer.increase}
                        >
                          <Plus className="size-3.5" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 hover:bg-red-50 text-red-500 rounded transition-colors touch-target ml-1"
                          title="Remove"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {savedItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3 sm:space-y-4 flex-shrink-0 safe-bottom">
            <div className="flex justify-between items-center text-base sm:text-lg font-bold">
              <span className="text-gray-700">{t.drawer.total}</span>
              <span className="text-green-600">₹{total}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                onClick={handlePrint}
                className="flex flex-col items-center justify-center gap-1 p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-[10px] sm:text-xs font-medium text-gray-700 touch-target"
              >
                <Printer className="size-4 sm:size-5" />
                <span className="text-center leading-tight">{t.drawer.print}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center justify-center gap-1 p-2 sm:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-[10px] sm:text-xs font-medium text-green-700 touch-target"
              >
                <MessageCircle className="size-4 sm:size-5" />
                <span className="text-center leading-tight">{t.drawer.shareWhatsApp}</span>
              </button>
              <button
                onClick={handleEmail}
                className="flex flex-col items-center justify-center gap-1 p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-[10px] sm:text-xs font-medium text-blue-700 touch-target"
              >
                <Mail className="size-4 sm:size-5" />
                <span className="text-center leading-tight">{t.drawer.emailList}</span>
              </button>
            </div>

            <div className="bg-green-50 p-3 sm:p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">{t.drawer.visit}</h3>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <MapPin className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="break-words">{SHOP_ADDRESS}</p>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <Clock className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">{t.drawer.bringList}</p>
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 sm:py-3 rounded-lg font-semibold transition-colors touch-target"
            >
              {t.drawer.continue}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
