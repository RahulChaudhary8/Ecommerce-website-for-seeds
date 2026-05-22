import { useMemo, useState, useRef, useEffect } from "react";
import { Search, Mic, MicOff } from "lucide-react";
import { products } from "../../data/products";
import type { Product } from "../../types/product";
import { useLanguage } from "../../context/LanguageContext";
import { toast } from "sonner";

interface SmartSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export default function SmartSearch({ value, onChange, onSelectProduct }: SmartSearchProps) {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!value.trim() || value.length < 2) return [];
    const q = value.toLowerCase();
    return products
      .filter((p) => {
        const name = language === "hi" ? p.nameHi : p.name;
        const desc = language === "hi" ? p.descriptionHi : p.description;
        return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
      })
      .slice(0, 6);
  }, [value, language]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const startVoice = () => {
    const SR = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) {
      toast.error(t.search.voiceUnsupported);
      return;
    }
    const rec = new SR();
    rec.lang = language === "hi" ? "hi-IN" : "en-IN";
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => {
      setListening(false);
      toast.error(t.search.voiceError);
    };
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[0]?.[0]?.transcript;
      if (text) {
        onChange(text);
        setOpen(true);
      }
    };
    rec.start();
  };

  return (
    <div ref={wrapRef} className="max-w-2xl mx-auto relative px-1 sm:px-0">
      <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
      <input
        type="search"
        placeholder={t.hero.search}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full pl-10 sm:pl-12 pr-24 py-3 sm:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        autoComplete="off"
      />
      <button
        type="button"
        onClick={startVoice}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg touch-target ${
          listening ? "bg-red-100 text-red-600 animate-pulse" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
        title={t.search.voice}
        aria-label={t.search.voice}
      >
        {listening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
      </button>

      {open && suggestions.length > 0 && (
        <ul className="absolute left-1 right-1 sm:left-0 sm:right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
          {suggestions.map((p) => {
            const name = language === "hi" ? p.nameHi : p.name;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-700 text-left touch-target"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                    onSelectProduct?.(p);
                  }}
                >
                  <img src={p.image} alt="" className="size-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{name}</p>
                    <p className="text-xs text-green-600">₹{p.price}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
