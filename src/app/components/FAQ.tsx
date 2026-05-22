import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function FAQ() {
  const { language, t } = useLanguage();
  const { faq: faqItems } = useSiteData();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="bg-white py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="size-4" />
            <span className="text-sm font-medium">{t.faq.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.faq.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const question = language === "hi" ? item.question_hi : item.question;
            const answer = language === "hi" ? item.answer_hi : item.answer;

            return (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors touch-target"
                >
                  <span className="font-semibold text-gray-900 pr-3 sm:pr-4 text-sm sm:text-base text-left">{question}</span>
                  <ChevronDown
                    className={`size-5 text-green-600 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
