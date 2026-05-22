import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function AgricultureTips() {
  const { language, t } = useLanguage();
  const { tips: farmingTips } = useSiteData();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="tips" className="bg-gradient-to-b from-green-50 to-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <BookOpen className="size-4" />
            <span className="text-sm font-medium">{t.nav.tips}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.tips.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.tips.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {farmingTips.map((tip) => {
            const isExpanded = expandedId === tip.id;
            const title = language === "hi" ? tip.title_hi : tip.title;
            const excerpt = language === "hi" ? tip.excerpt_hi : tip.excerpt;
            const content = language === "hi" ? tip.content_hi : tip.content;
            const season = language === "hi" ? tip.season_hi : tip.season;

            return (
              <article
                key={tip.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {season}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-900 mt-2">{title}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
                  {isExpanded && (
                    <p className="text-gray-700 text-sm mb-4 border-t border-gray-100 pt-4">{content}</p>
                  )}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="size-4" />
                        {language === "hi" ? "कम दिखाएं" : "Show Less"}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="size-4" />
                        {t.tips.readMore}
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
