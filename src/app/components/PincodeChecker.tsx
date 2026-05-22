import { useState } from "react";
import { MapPin, CheckCircle, Info } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

type Result = "idle" | "served" | "not_served" | "invalid";

export default function PincodeChecker() {
  const { t } = useLanguage();
  const { pincodes } = useSiteData();
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<Result>("idle");

  const check = () => {
    const pin = pincode.replace(/\D/g, "");
    if (pin.length !== 6) {
      setResult("invalid");
      return;
    }
    setResult(pincodes.has(pin) ? "served" : "not_served");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-lg p-4 sm:p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="size-5 text-green-600 flex-shrink-0" />
        <h4 className="font-semibold text-gray-900 dark:text-white">{t.pincode.title}</h4>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">{t.pincode.subtitle}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult("idle");
          }}
          placeholder={t.pincode.placeholder}
          className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm
            dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={check}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm touch-target"
        >
          {t.pincode.check}
        </button>
      </div>
      {result === "served" && (
        <p className="mt-3 flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
          <CheckCircle className="size-4 flex-shrink-0 mt-0.5" />
          {t.pincode.served}
        </p>
      )}
      {result === "not_served" && (
        <p className="mt-3 flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
          <Info className="size-4 flex-shrink-0 mt-0.5" />
          {t.pincode.notServed}
        </p>
      )}
      {result === "invalid" && (
        <p className="mt-3 text-sm text-red-600">{t.pincode.invalid}</p>
      )}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t.delivery.noDelivery}</p>
    </div>
  );
}
