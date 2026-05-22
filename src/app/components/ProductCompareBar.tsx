import { GitCompare, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface ProductCompareBarProps {
  count: number;
  max: number;
  onOpen: () => void;
  onClear: () => void;
}

export default function ProductCompareBar({ count, max, onOpen, onClear }: ProductCompareBarProps) {
  const { t } = useLanguage();

  if (count === 0) return null;

  return (
    <div
      className="fixed left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md z-40
        bottom-[calc(8.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-6
        bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3"
    >
      <GitCompare className="size-5 text-green-400 flex-shrink-0" />
      <p className="text-sm flex-1 min-w-0">
        {count}/{max} {t.compare.selected}
      </p>
      <button
        onClick={onOpen}
        disabled={count < 2}
        className="text-sm font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg touch-target whitespace-nowrap"
      >
        {t.compare.compareNow}
      </button>
      <button onClick={onClear} className="p-1.5 hover:bg-white/10 rounded touch-target" aria-label="Clear">
        <X className="size-4" />
      </button>
    </div>
  );
}
