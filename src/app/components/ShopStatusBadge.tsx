import { useEffect, useState } from "react";
import { isShopOpen } from "../../utils/shopHours";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function ShopStatusBadge() {
  const { t } = useLanguage();
  const { settings } = useSiteData();
  const hours = settings
    ? {
        weekdayOpenHour: settings.weekday_open_hour,
        weekdayCloseHour: settings.weekday_close_hour,
        sundayOpenHour: settings.sunday_open_hour,
        sundayCloseHour: settings.sunday_close_hour,
      }
    : undefined;
  const [open, setOpen] = useState(() => isShopOpen(new Date(), hours));

  useEffect(() => {
    const interval = setInterval(() => setOpen(isShopOpen(new Date(), hours)), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
        open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      <span className={`size-1.5 sm:size-2 rounded-full flex-shrink-0 ${open ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
      <span className="whitespace-nowrap">{open ? t.shopStatus.open : t.shopStatus.closed}</span>
    </span>
  );
}
