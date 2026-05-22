import { ExternalLink, Landmark } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function GovernmentSchemes() {
  const { language, t } = useLanguage();
  const { schemes: govSchemes } = useSiteData();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Landmark className="size-4" />
            <span className="text-sm font-medium">{t.schemes.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.schemes.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.schemes.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {govSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <span className="text-3xl mb-3">{scheme.icon}</span>
              <h4 className="font-bold text-gray-900 mb-2">
                {language === "hi" ? scheme.name_hi : scheme.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2 flex-1">
                {language === "hi" ? scheme.description_hi : scheme.description}
              </p>
              <p className="text-xs text-green-700 font-medium mb-4">
                {language === "hi" ? scheme.benefit_hi : scheme.benefit}
              </p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {t.schemes.learnMore}
                <ExternalLink className="size-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
