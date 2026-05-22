import { Truck, MessageCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { openWhatsApp } from "../../utils/whatsapp";
import { useShopContact } from "../../context/SiteDataContext";

export default function BulkOrderCTA() {
  const { t } = useLanguage();
  const { phone } = useShopContact();

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 text-white">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="bg-white/20 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
              <Truck className="size-6 sm:size-8" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold mb-1">{t.bulk.title}</h3>
              <p className="text-green-100 text-xs sm:text-sm">{t.bulk.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => openWhatsApp(t.bulk.whatsappMsg, phone)}
            className="flex items-center justify-center gap-2 bg-white text-green-700 px-5 py-3.5 sm:py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors w-full md:w-auto flex-shrink-0 touch-target"
          >
            <MessageCircle className="size-5" />
            {t.bulk.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
