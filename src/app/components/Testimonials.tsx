import { Star, Quote } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200";

export default function Testimonials() {
  const { language, t } = useLanguage();
  const { testimonials } = useSiteData();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10 px-2">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.testimonials.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((item) => {
            const name = language === "hi" ? item.name_hi || item.name : item.name;
            const location = language === "hi" ? item.location_hi || item.location : item.location;
            const text = language === "hi" ? item.text_hi || item.text : item.text;
            const crop = language === "hi" ? item.crop_hi || item.crop : item.crop;

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <Quote className="size-8 text-green-100 absolute top-4 right-4" />
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.image || DEFAULT_AVATAR}
                    alt={name}
                    className="size-12 rounded-full object-cover border-2 border-green-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{location}</p>
                    <p className="text-xs text-green-600 font-medium">{crop}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < item.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
