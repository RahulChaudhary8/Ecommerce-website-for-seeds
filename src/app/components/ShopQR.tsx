import { QrCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SHOP_MAPS_URL } from "../../types/product";

export default function ShopQR() {
  const { t } = useLanguage();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SHOP_MAPS_URL)}`;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <QrCode className="size-5 text-green-600" />
        <h4 className="font-semibold text-gray-900 dark:text-white">{t.qr.title}</h4>
      </div>
      <img
        src={qrUrl}
        alt="Shop QR Code"
        width={160}
        height={160}
        className="mx-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white p-2"
        loading="lazy"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 max-w-xs mx-auto">{t.qr.hint}</p>
    </div>
  );
}
