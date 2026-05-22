import { Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function SowingCalendar() {
  const { language, t } = useLanguage();
  const { sowing: sowingCalendar } = useSiteData();

  return (
    <section className="bg-gray-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Calendar className="size-4" />
            <span className="text-sm font-medium">{t.calendar.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.calendar.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.calendar.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {sowingCalendar.map((entry, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500"
            >
              <p className="text-xs font-semibold text-green-600 uppercase mb-1">
                {language === "hi" ? entry.seasonHi : entry.season}
              </p>
              <h4 className="font-bold text-gray-900 mb-3">
                {language === "hi" ? entry.monthHi : entry.month}
              </h4>
              <ul className="space-y-1">
                {(language === "hi" ? entry.cropsHi : entry.crops).map((crop) => (
                  <li key={crop} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="size-1.5 bg-green-500 rounded-full flex-shrink-0" />
                    {crop}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
