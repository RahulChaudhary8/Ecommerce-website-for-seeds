import { useState } from "react";
import { MessageSquarePlus, Star } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../api/client";

export default function TestimonialSuggest() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [farmingType, setFarmingType] = useState("");
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !farmingType.trim() || description.trim().length < 20) {
      toast.error(t.testimonialSuggest.invalid);
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.suggestTestimonial({
        name: name.trim(),
        location: location.trim(),
        farming_type: farmingType.trim(),
        rating,
        description: description.trim(),
        phone: phone.trim() || undefined,
      });
      toast.success(res.message || t.testimonialSuggest.success);
      setName("");
      setLocation("");
      setFarmingType("");
      setRating(5);
      setDescription("");
      setPhone("");
    } catch {
      toast.error(t.testimonialSuggest.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-10 sm:py-14 border-t border-gray-100">
      <div className="max-w-xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-3">
            <MessageSquarePlus className="size-4" />
            <span className="text-sm font-medium">{t.testimonialSuggest.badge}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t.testimonialSuggest.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{t.testimonialSuggest.subtitle}</p>
        </div>

        <form onSubmit={submit} className="bg-gray-50 rounded-xl p-5 sm:p-6 space-y-4 border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.name}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.location}</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ghaziabad, UP"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.farmingType}</label>
            <input
              value={farmingType}
              onChange={(e) => setFarmingType(e.target.value)}
              placeholder="e.g. Wheat Farmer"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.rating}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className="p-1 touch-target"
                  aria-label={`${n} stars`}
                >
                  <Star
                    className={`size-7 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.description}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.testimonialSuggest.phone}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold touch-target"
          >
            {submitting ? "…" : t.testimonialSuggest.submit}
          </button>
          <p className="text-xs text-gray-500 text-center">{t.testimonialSuggest.note}</p>
        </form>
      </div>
    </section>
  );
}
