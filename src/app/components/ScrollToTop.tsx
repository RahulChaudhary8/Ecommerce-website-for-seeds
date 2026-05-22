import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-40 bg-white border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg
        hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all touch-target
        bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))]
        left-[max(0.75rem,env(safe-area-inset-left))]"
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
