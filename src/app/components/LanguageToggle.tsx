import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs sm:text-sm font-medium flex-shrink-0">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded-md transition-colors touch-target min-w-[36px] ${
          language === "en" ? "bg-white text-green-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded-md transition-colors touch-target min-w-[36px] ${
          language === "hi" ? "bg-white text-green-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Hindi"
      >
        हिं
      </button>
    </div>
  );
}
