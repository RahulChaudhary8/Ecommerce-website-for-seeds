import { MapPin, Navigation } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useShopContact } from "../../context/SiteDataContext";

export default function GoogleMap() {
  const { t } = useLanguage();
  const { address, mapsEmbed, mapsUrl } = useShopContact();

  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="font-semibold text-base sm:text-lg text-gray-900 flex items-center gap-2">
        <MapPin className="size-5 text-green-600 flex-shrink-0" />
        <span>{t.contact.mapTitle}</span>
      </h4>
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm responsive-embed min-h-[200px] sm:min-h-0">
        <iframe
          title="AgroSeeds Shop Location"
          src={mapsEmbed}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-600 break-words">{address}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 sm:py-2.5 rounded-lg font-semibold transition-colors touch-target"
      >
        <Navigation className="size-4" />
        {t.contact.getDirections}
      </a>
    </div>
  );
}
