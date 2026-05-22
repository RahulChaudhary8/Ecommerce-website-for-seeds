import { FileDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useSiteData, useShopContact } from "../../context/SiteDataContext";

export default function PriceListDownload() {
  const { language, t } = useLanguage();
  const { products } = useSiteData();
  const { address, phoneDisplay } = useShopContact();

  const stockLabel = (status: string) => {
    const key = status as keyof typeof t.stock;
    return t.stock[key] ?? status;
  };

  const download = () => {
    const rows = products
      .map((p) => {
        const name = language === "hi" ? p.nameHi : p.name;
        return `<tr><td>${name}</td><td>₹${p.price}</td><td>${p.unit}</td><td>${stockLabel(p.stockStatus)}</td></tr>`;
      })
      .join("");

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html><html><head><title>AgroSeeds Price List</title>
      <style>
        @media print { @page { margin: 12mm; } }
        body{font-family:system-ui,sans-serif;padding:24px;color:#111}
        h1{color:#16a34a;margin-bottom:4px}
        .sub{color:#666;font-size:14px}
        .visit{color:#b45309;font-size:13px;margin:12px 0;padding:8px;background:#fffbeb;border-radius:6px}
        table{width:100%;border-collapse:collapse;margin-top:16px;font-size:13px}
        th,td{border:1px solid #ddd;padding:8px;text-align:left}
        th{background:#f0fdf4}
        tr:nth-child(even){background:#fafafa}
        .foot{margin-top:24px;font-size:12px;color:#666}
      </style>
      </head><body>
      <h1>AgroSeeds — ${t.priceList.title}</h1>
      <p class="sub">${address} | ${phoneDisplay}</p>
      <p class="sub">${new Date().toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN")}</p>
      <p class="visit">${t.visitOnly.notice}</p>
      <table><thead><tr><th>Product</th><th>Price</th><th>Unit</th><th>Stock</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="foot">${t.priceList.note}<br/>${t.priceList.pdfHint}</p>
      </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="flex flex-col items-start gap-0.5">
      <button
        onClick={download}
        className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 font-medium touch-target py-1"
      >
        <FileDown className="size-4" />
        {t.priceList.download}
      </button>
      <span className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:inline">{t.priceList.pdfHint}</span>
    </div>
  );
}
