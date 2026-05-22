import { Tag, X, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getSaleEndDate, getTimeLeft } from "../../utils/countdown";

const BANNER_DISMISS_KEY = "agroseeds-seasonal-dismissed";

interface SeasonalBannerProps {
  onViewProducts: () => void;
}

export default function SeasonalBanner({ onViewProducts }: SeasonalBannerProps) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(BANNER_DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [left, setLeft] = useState(() => getTimeLeft(getSaleEndDate()));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(getSaleEndDate())), 1000);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(BANNER_DISMISS_KEY, "1");
  };

  if (dismissed) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Tag className="size-4 sm:size-5 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded">
                  {t.seasonal.badge}
                </span>
                <span className="font-semibold text-xs sm:text-sm md:text-base leading-snug">
                  {t.seasonal.title}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-100 mt-1 line-clamp-2 sm:line-clamp-1">
                {t.seasonal.subtitle}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-xs font-mono bg-black/20 rounded px-2 py-1 w-fit">
                <Clock className="size-3" />
                <span>
                  {left.days}
                  {t.countdown.days} {pad(left.hours)}:{pad(left.minutes)}:{pad(left.seconds)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
            <button
              onClick={onViewProducts}
              className="bg-white text-orange-600 px-3 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap touch-target"
            >
              {t.seasonal.cta}
            </button>
            <button
              onClick={dismiss}
              className="p-2 hover:bg-white/20 rounded transition-colors touch-target flex items-center justify-center"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
