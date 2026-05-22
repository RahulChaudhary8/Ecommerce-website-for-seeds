import { Users, Award, Package, Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

export default function TrustStats() {
  const { t } = useLanguage();
  const { settings, products } = useSiteData();

  const stats = [
    { icon: Calendar, value: settings?.stat_years ?? "15+", label: t.stats.years },
    { icon: Users, value: settings?.stat_farmers ?? "5000+", label: t.stats.farmers },
    { icon: Package, value: settings?.stat_products ?? `${products.length}+`, label: t.stats.products },
    { icon: Award, value: settings?.stat_quality ?? "100%", label: t.stats.quality },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto px-1 sm:px-0 mt-6">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 text-center border border-green-100 dark:border-gray-700"
        >
          <Icon className="size-5 sm:size-6 text-green-600 mx-auto mb-1 sm:mb-2" />
          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 leading-tight">{label}</p>
        </div>
      ))}
    </div>
  );
}
