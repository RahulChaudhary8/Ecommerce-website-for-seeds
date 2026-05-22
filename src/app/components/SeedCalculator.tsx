import { useState } from "react";
import { Calculator } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function SeedCalculator() {
  const { language, t } = useLanguage();
  const { seedRates: cropSeedRates } = useSiteData();
  const [cropId, setCropId] = useState(cropSeedRates[0]?.id ?? "wheat");
  const [acres, setAcres] = useState("1");

  const crop = cropSeedRates.find((c) => c.id === cropId) ?? cropSeedRates[0];
  if (!crop) return null;
  const cropName = language === "hi" ? crop.name_hi : crop.name;
  const acresNum = Math.max(0, parseFloat(acres) || 0);
  const seedNeeded = (Number(crop.kg_per_acre) * acresNum).toFixed(2);

  return (
    <section id="calculator" className="bg-white py-10 sm:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Calculator className="size-4" />
            <span className="text-sm font-medium">{t.calculator.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.calculator.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t.calculator.subtitle}</p>
        </div>

        <div className="max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-8 rounded-xl shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.calculator.selectCrop}</label>
              <select
                value={cropId}
                onChange={(e) => setCropId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
              >
                {cropSeedRates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === "hi" ? c.name_hi : c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.calculator.landSize}</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="bg-white p-6 rounded-lg text-center border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">{t.calculator.result}</p>
              <p className="text-3xl font-bold text-green-600">
                {seedNeeded} {language === "hi" ? "किलो" : "kg"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {cropName} — {crop.kgPerAcre} {crop.unit} × {acresNum} {t.calculator.acres}
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">{t.calculator.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
