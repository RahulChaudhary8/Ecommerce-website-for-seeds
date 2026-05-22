import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsApp } from "../../utils/whatsapp";
import { useShopContact } from "../../context/SiteDataContext";

export default function FloatingActions() {
  const { t } = useLanguage();
  const { phone } = useShopContact();

  return (
    <div
      className="fixed z-50 flex flex-col gap-2 sm:gap-3
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        right-[max(0.75rem,env(safe-area-inset-right))]"
    >
      <a
        href={`tel:+${phone}`}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white
          size-12 sm:size-auto sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-lg transition-all
          active:scale-95 sm:hover:scale-105 touch-target"
        title={t.floating.call}
        aria-label={t.floating.call}
      >
        <Phone className="size-5" />
        <span className="font-semibold text-sm hidden md:inline">{t.floating.call}</span>
      </a>
      <button
        onClick={() => openWhatsApp(t.whatsapp.inquiry, phone)}
        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white
          size-12 sm:size-auto sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-lg transition-all
          active:scale-95 sm:hover:scale-105 touch-target"
        title={t.floating.whatsapp}
        aria-label={t.floating.whatsapp}
      >
        <MessageCircle className="size-5" />
        <span className="font-semibold text-sm hidden md:inline">{t.floating.whatsapp}</span>
      </button>
    </div>
  );
}
