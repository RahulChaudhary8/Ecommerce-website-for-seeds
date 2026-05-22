import { useState } from "react";
import { Sprout, ChevronRight, RotateCcw } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

interface CropAdvisorProps {
  onApplyCategory: (category: string) => void;
  onScrollToProducts: () => void;
}

type Season = "kharif" | "rabi" | "zaid";
type Goal = "vegetables" | "grains" | "organic";

export default function CropAdvisor({ onApplyCategory, onScrollToProducts }: CropAdvisorProps) {
  const { t } = useLanguage();
  const { advisorRules: recommendations } = useSiteData();
  const [step, setStep] = useState(0);
  const [season, setSeason] = useState<Season | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const reset = () => {
    setStep(0);
    setSeason(null);
    setGoal(null);
  };

  const finish = () => {
    if (!season || !goal) return;
    const cat = recommendations[season]?.[goal];
    if (!cat) return;
    onApplyCategory(cat);
    onScrollToProducts();
    reset();
  };

  const seasonLabel = (s: Season) =>
    s === "kharif" ? t.advisor.kharif : s === "rabi" ? t.advisor.rabi : t.advisor.zaid;
  const goalLabel = (g: Goal) =>
    g === "vegetables" ? t.advisor.vegetables : g === "grains" ? t.advisor.grains : t.advisor.organicGoal;

  return (
    <section id="advisor" className="py-10 sm:py-16 bg-gradient-to-br from-emerald-700 to-green-800 text-white">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
            <Sprout className="size-4" />
            <span className="text-sm font-medium">{t.advisor.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">{t.advisor.title}</h3>
          <p className="text-green-100 text-sm sm:text-base">{t.advisor.subtitle}</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-5 sm:p-8 border border-white/20">
          {step === 0 && (
            <div>
              <p className="font-semibold mb-4">{t.advisor.q1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["kharif", "rabi", "zaid"] as Season[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSeason(s);
                      setStep(1);
                    }}
                    className="bg-white/20 hover:bg-white/30 py-4 px-4 rounded-lg font-medium touch-target transition-colors"
                  >
                    {seasonLabel(s)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && season && (
            <div>
              <p className="font-semibold mb-4">{t.advisor.q2}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["vegetables", "grains", "organic"] as Goal[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGoal(g);
                      setStep(2);
                    }}
                    className="bg-white/20 hover:bg-white/30 py-4 px-4 rounded-lg font-medium touch-target transition-colors"
                  >
                    {goalLabel(g)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && season && goal && (
            <div className="text-center">
              <p className="text-lg font-bold mb-2">{t.advisor.result}</p>
              <p className="text-green-100 mb-6">{t.advisor.resultHint}</p>
              <button
                onClick={finish}
                className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 touch-target"
              >
                {t.advisor.viewProducts}
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}

          {step > 0 && (
            <button
              onClick={reset}
              className="mt-6 flex items-center gap-2 text-sm text-green-200 hover:text-white mx-auto touch-target"
            >
              <RotateCcw className="size-4" />
              {t.advisor.restart}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
