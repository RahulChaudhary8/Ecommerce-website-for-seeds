import { Store } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function VisitNotice() {
  const { t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm max-w-xl mx-auto mt-4">
      <Store className="size-4 flex-shrink-0" />
      <span>{t.visitOnly.notice}</span>
    </div>
  );
}
