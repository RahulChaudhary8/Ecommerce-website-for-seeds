import { SHOP_PHONE, SHOP_ADDRESS } from "../types/product";
import type { CartItem } from "../types/product";
import type { Language } from "../i18n/translations";

export function openWhatsApp(message: string, phone = SHOP_PHONE) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}

export function buildSavedListMessage(
  items: CartItem[],
  language: Language,
  estimatedTotal: number
): string {
  const hi = language === "hi";
  const getName = (item: CartItem) => (hi ? item.nameHi : item.name);
  const lines = items.map((item, i) => {
    const qty = item.quantity > 1 ? ` x${item.quantity}` : "";
    const lineTotal = item.price * item.quantity;
    return `${i + 1}. ${getName(item)}${qty} — ₹${lineTotal} (${item.unit})`;
  });

  const header = hi
    ? "नमस्ते AgroSeeds! मैं दुकान पर आने की योजना बना रहा/रही हूं। कृपया उपलब्धता की पुष्टि करें:\n"
    : "Hello AgroSeeds! I plan to visit your shop. Please confirm availability:\n";

  const footer = hi
    ? `\nअनुमानित कुल: ₹${estimatedTotal}\n📍 ${SHOP_ADDRESS}\n\n⚠️ ऑनलाइन डिलीवरी नहीं — कृपया दुकान पर आकर खरीदारी करें। धन्यवाद!`
    : `\nEstimated total: ₹${estimatedTotal}\n📍 ${SHOP_ADDRESS}\n\n⚠️ No online delivery — please visit our shop to purchase. Thank you!`;

  return header + lines.join("\n") + footer;
}
