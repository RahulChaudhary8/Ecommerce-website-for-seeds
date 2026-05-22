import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export default function InstallPWA() {
  const { t } = useLanguage();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem("agroseeds-pwa-dismissed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || dismissed) return null;

  const install = async () => {
    await deferred.prompt();
    setDeferred(null);
  };

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("agroseeds-pwa-dismissed", "1");
    setDeferred(null);
  };

  return (
    <div className="fixed bottom-36 sm:bottom-32 left-3 right-3 sm:left-auto sm:right-24 sm:max-w-sm z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 safe-bottom">
      <button onClick={dismiss} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600" aria-label="Close">
        <X className="size-4" />
      </button>
      <p className="font-semibold text-gray-900 dark:text-white text-sm pr-6">{t.pwa.title}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-3">{t.pwa.subtitle}</p>
      <button
        onClick={install}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold touch-target"
      >
        <Download className="size-4" />
        {t.pwa.install}
      </button>
    </div>
  );
}
