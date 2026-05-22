import { X, Trash2 } from "lucide-react";
import type { Product } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData } from "../../context/SiteDataContext";

interface CompareModalProps {
  compareIds: number[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

export default function CompareModal({ compareIds, onClose, onRemove }: CompareModalProps) {
  const { language, t } = useLanguage();
  const { products } = useSiteData();
  const items = compareIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  if (items.length === 0) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[70]" onClick={onClose} />
      <div className="fixed inset-2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-4xl sm:w-[calc(100%-2rem)] z-[70] bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col max-h-[95dvh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.compare.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target">
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-x-auto flex-1 p-4">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium w-28">{t.compare.feature}</th>
                {items.map((p) => (
                  <th key={p.id} className="text-left py-2 px-2 min-w-[140px]">
                    <button onClick={() => onRemove(p.id)} className="float-right text-red-500 p-1" aria-label="Remove">
                      <Trash2 className="size-4" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-white block pr-6">
                      {language === "hi" ? p.nameHi : p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 font-medium">{t.compare.price}</td>
                {items.map((p) => (
                  <td key={p.id} className="py-3 px-2 font-bold text-green-600">₹{p.price}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 font-medium">{t.compare.unit}</td>
                {items.map((p) => (
                  <td key={p.id} className="py-3 px-2">{p.unit}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 font-medium">{t.compare.stock}</td>
                {items.map((p) => (
                  <td key={p.id} className="py-3 px-2">{t.stock[p.stockStatus]}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-medium align-top">{t.compare.desc}</td>
                {items.map((p) => (
                  <td key={p.id} className="py-3 px-2 text-xs leading-relaxed">
                    {language === "hi" ? p.descriptionHi : p.description}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
