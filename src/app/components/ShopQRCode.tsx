import { QrCode } from "lucide-react";
import { SHOP_MAPS_URL, SHOP_PHONE_DISPLAY } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";

export default function ShopQRCode() {
  const { t } = useLanguage();
  const qrData = encodeURIComponent(`${SHOP_MAPS_URL} | Call: ${SHOP_PHONE_DISPLAY}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <QrCode className="size-5 text-green-600" />
        {t.qr.title}
      </h4>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img src={qrUrl} alt="Shop QR Code" className="size-36 sm:size-40 rounded-lg border border-gray-200 dark:border-gray-600 bg-white p-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">{t.qr.hint}</p>
      </div>
    </div>
  );
}
