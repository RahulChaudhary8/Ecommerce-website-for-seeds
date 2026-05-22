import { SlidersHorizontal, PackageCheck, IndianRupee } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import PriceListDownload from "./PriceListDownload";

export type SortOption = "default" | "price-asc" | "price-desc" | "name";

interface ProductToolbarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  resultCount: number;
  maxPrice: number;
  priceCeiling: number;
  onPriceCeilingChange: (value: number) => void;
  priceMax: number;
}

export default function ProductToolbar({
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockOnlyChange,
  resultCount,
  maxPrice,
  priceCeiling,
  onPriceCeilingChange,
  priceMax,
}: ProductToolbarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {resultCount} {t.products.results}
        </p>
        <PriceListDownload />
      </div>
      <div className="flex flex-col min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 touch-target py-1">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500 size-4"
          />
          <PackageCheck className="size-4 text-green-600 flex-shrink-0" />
          <span>{t.products.inStockOnly}</span>
        </label>
        <div className="flex items-center gap-2 w-full min-[480px]:flex-1 min-[480px]:max-w-xs">
          <IndianRupee className="size-4 text-green-600 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {t.products.maxPrice}: ₹{maxPrice}
          </span>
          <input
            type="range"
            min={50}
            max={priceMax}
            step={50}
            value={priceCeiling}
            onChange={(e) => onPriceCeilingChange(Number(e.target.value))}
            className="flex-1 accent-green-600"
          />
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            {t.products.under} ₹{priceCeiling}
          </span>
        </div>
        <div className="flex items-center gap-2 w-full min-[480px]:w-auto">
          <SlidersHorizontal className="size-4 text-gray-500 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="flex-1 min-[480px]:flex-none min-[480px]:min-w-[180px] text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white touch-target"
          >
            <option value="default">{t.products.sortDefault}</option>
            <option value="price-asc">{t.products.sortPriceLow}</option>
            <option value="price-desc">{t.products.sortPriceHigh}</option>
            <option value="name">{t.products.sortName}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
