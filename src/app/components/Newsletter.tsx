import { useState } from "react";
import { Bell, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../api/client";

export default function Newsletter() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (trimmed.length < 10) {
      toast.error(t.newsletter.invalid);
      return;
    }
    try {
      await api.newsletter(trimmed);
      toast.success(t.newsletter.success);
      setPhone("");
    } catch {
      toast.error(t.newsletter.invalid);
    }
  };

  return (
    <section className="py-10 sm:py-12 bg-green-600 dark:bg-green-800">
      <div className="max-w-xl mx-auto px-3 sm:px-6 text-center">
        <Bell className="size-8 text-white mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">{t.newsletter.title}</h3>
        <p className="text-green-100 text-sm mb-6">{t.newsletter.subtitle}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.newsletter.placeholder}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-base"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 touch-target"
          >
            <Send className="size-4" />
            {t.newsletter.cta}
          </button>
        </form>
      </div>
    </section>
  );
}
