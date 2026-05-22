import { useState, useEffect, useMemo } from "react";
import {
  BookmarkPlus,
  Menu,
  Leaf,
  Phone,
  Mail,
  MapPin,
  Clock,
  Home,
  ShoppingBag,
  Info,
  MessageCircle,
  X,
  BookOpen,
  HelpCircle,
  Share2,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import ProductCard from "./components/ProductCard";
import SavedItemsDrawer from "./components/SavedItemsDrawer";
import SeasonalBanner from "./components/SeasonalBanner";
import LanguageToggle from "./components/LanguageToggle";
import FloatingActions from "./components/FloatingActions";
import AgricultureTips from "./components/AgricultureTips";
import Testimonials from "./components/Testimonials";
import TestimonialSuggest from "./components/TestimonialSuggest";
import GoogleMap from "./components/GoogleMap";
import ShopStatusBadge from "./components/ShopStatusBadge";
import TrustStats from "./components/TrustStats";
import SeedCalculator from "./components/SeedCalculator";
import SowingCalendar from "./components/SowingCalendar";
import FAQ from "./components/FAQ";
import ShopGallery from "./components/ShopGallery";
import GovernmentSchemes from "./components/GovernmentSchemes";
import ScrollToTop from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";
import VisitNotice from "./components/VisitNotice";
import PincodeChecker from "./components/PincodeChecker";
import QuickViewModal from "./components/QuickViewModal";
import ProductToolbar, { type SortOption } from "./components/ProductToolbar";
import BulkOrderCTA from "./components/BulkOrderCTA";
import SmartSearch from "./components/SmartSearch";
import ThemeToggle from "./components/ThemeToggle";
import OfflineBanner from "./components/OfflineBanner";
import InstallPWA from "./components/InstallPWA";
import CropAdvisor from "./components/CropAdvisor";
import WeatherWidget from "./components/WeatherWidget";
import RecentlyViewed from "./components/RecentlyViewed";
import Newsletter from "./components/Newsletter";
import ShopQR from "./components/ShopQR";
import ProductCompareBar from "./components/ProductCompareBar";
import CompareModal from "./components/CompareModal";
import { useSiteData, useShopContact } from "../context/SiteDataContext";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import type { Product, CartItem } from "../types/product";
import { useLanguage } from "../context/LanguageContext";
import { openWhatsApp } from "../utils/whatsapp";

const SAVED_ITEMS_KEY = "agroseeds-saved-items";
const SECTION_IDS = ["home", "products", "advisor", "tips", "about", "contact", "faq", "calculator"];
const MAX_COMPARE = 3;

export default function App() {
  const { language, t } = useLanguage();
  const { products, aboutFeatures, categories, getCategoryLabel } = useSiteData();
  const shop = useShopContact();
  const PRICE_MAX = Math.max(...products.map((p) => p.price), 1);
  const [savedItems, setSavedItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_ITEMS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isSavedItemsOpen, setIsSavedItemsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [priceCeiling, setPriceCeiling] = useState(PRICE_MAX);
  const { recentIds, addRecent } = useRecentlyViewed();

  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMobileMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addToSavedItems = (product: Product) => {
    const exists = savedItems.find((item) => item.id === product.id);
    if (exists) {
      setSavedItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      toast.success(t.toast.saved);
      return;
    }
    setSavedItems((prev) => [...prev, { ...product, quantity: 1 }]);
    toast.success(t.toast.saved);
  };

  const removeFromSavedItems = (productId: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateSavedQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromSavedItems(productId);
      return;
    }
    setSavedItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const savedItemsCount = savedItems.reduce((sum, item) => sum + item.quantity, 0);
  const savedIds = new Set(savedItems.map((i) => i.id));

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    addRecent(product.id);
  };

  const openQuickViewById = (id: number) => {
    const p = products.find((x) => x.id === id);
    if (p) openQuickView(p);
  };

  const toggleCompare = (product: Product) => {
    setCompareIds((prev) => {
      if (prev.includes(product.id)) {
        toast.info(t.compare.removed);
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= MAX_COMPARE) {
        toast.error(t.compare.max);
        return prev;
      }
      toast.success(t.compare.added);
      return [...prev, product.id];
    });
  };

  const handleShareWebsite = async () => {
    const url = window.location.href;
    const text = "AgroSeeds - Premium Agricultural Seeds & Fertilizers in Delhi";
    if (navigator.share) {
      try {
        await navigator.share({ title: "AgroSeeds", text, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t.share.copied);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const name = language === "hi" ? product.nameHi : product.name;
      const desc = language === "hi" ? product.descriptionHi : product.description;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
      const matchesStock =
        !inStockOnly ||
        product.stockStatus === "in_stock" ||
        product.stockStatus === "low_stock";
      const matchesPrice = product.price <= priceCeiling;
      return matchesCategory && matchesSearch && matchesStock && matchesPrice;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "name") {
      result = [...result].sort((a, b) => {
        const na = language === "hi" ? a.nameHi : a.name;
        const nb = language === "hi" ? b.nameHi : b.name;
        return na.localeCompare(nb);
      });
    }
    return result;
  }, [selectedCategory, searchQuery, language, inStockOnly, sortBy, priceCeiling]);

  const getCategoryTitle = () => {
    if (selectedCategory === "all") return t.products.title;
    return getCategoryLabel(selectedCategory, language) || t.products.title;
  };

  const navLinkClass = (section: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
      activeSection === section
        ? "text-green-600 bg-green-50"
        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
    }`;

  const navItems = [
    { id: "home", icon: Home, label: t.nav.home },
    { id: "products", icon: ShoppingBag, label: t.nav.products },
    { id: "advisor", icon: Leaf, label: t.nav.advisor },
    { id: "tips", icon: BookOpen, label: t.nav.tips },
    { id: "about", icon: Info, label: t.nav.about },
    { id: "faq", icon: HelpCircle, label: t.nav.faq },
    { id: "contact", icon: MessageCircle, label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 dark:bg-gray-950 overflow-x-hidden w-full transition-colors">
      <SkipToContent />
      <OfflineBanner />
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{ className: "mt-[max(0.5rem,env(safe-area-inset-top))]" }}
      />
      <SeasonalBanner onViewProducts={() => scrollToSection("products")} />

      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 safe-x">
          <div className="flex items-center justify-between gap-2 min-h-14 sm:min-h-16 py-2 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Leaf className="size-7 sm:size-8 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">AgroSeeds</h1>
                  <ShopStatusBadge />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 truncate hidden min-[400px]:block">{t.tagline}</p>
              </div>
            </div>

            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => scrollToSection(id)} className={navLinkClass(id)}>
                  <Icon className="size-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <ThemeToggle />
              <LanguageToggle />
              <button
                onClick={handleShareWebsite}
                className="hidden md:flex touch-target p-2 hover:bg-gray-100 rounded-lg transition-colors items-center justify-center"
                title={t.share.website}
              >
                <Share2 className="size-5 text-gray-600" />
              </button>
              <button
                onClick={() => setIsSavedItemsOpen(true)}
                className="relative touch-target p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                title={t.savedItems}
              >
                <BookmarkPlus className="size-5 sm:size-6 text-gray-700" />
                {savedItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {savedItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden touch-target p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="xl:hidden border-t border-gray-200 py-3 max-h-[70vh] overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-target ${
                      activeSection === id ? "text-green-600 bg-green-50" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="size-5" />
                    <span>{label}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    handleShareWebsite();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 touch-target md:hidden"
                >
                  <Share2 className="size-5" />
                  <span>{t.share.website}</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="home" className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-1 leading-tight">
              {t.hero.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-2">{t.hero.subtitle}</p>
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md mb-4 sm:mb-6 max-w-full">
              <MapPin className="size-4 sm:size-5 text-green-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900 dark:text-white text-xs sm:text-base truncate">{t.hero.location}</span>
            </div>

            <WeatherWidget />
            <TrustStats />

            <div className="flex flex-col min-[400px]:flex-row justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 mb-6 sm:mb-8 px-2">
              <a
                href={`tel:+${shop.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 sm:py-2.5 rounded-lg font-semibold transition-colors w-full min-[400px]:w-auto touch-target"
              >
                <Phone className="size-4" />
                {t.contact.callNow}
              </a>
              <button
                onClick={() => openWhatsApp(t.whatsapp.inquiry, shop.phone)}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 sm:py-2.5 rounded-lg font-semibold transition-colors w-full min-[400px]:w-auto touch-target"
              >
                <MessageCircle className="size-4" />
                {t.contact.whatsapp}
              </button>
            </div>

            <SmartSearch
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectProduct={openQuickView}
            />
            <VisitNotice />
          </div>
        </div>
      </section>

      <main id="main-content">

      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-14 sm:top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide snap-x snap-mandatory">
            <button
              key="all"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm font-medium snap-start flex-shrink-0 touch-target ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.categories.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-xs sm:text-sm font-medium snap-start flex-shrink-0 touch-target ${
                  selectedCategory === cat.slug
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {language === "hi" ? cat.name_hi || cat.name : cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <CropAdvisor
        onApplyCategory={(cat) => setSelectedCategory(cat)}
        onScrollToProducts={() => scrollToSection("products")}
      />

      <section id="products" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 px-1">{getCategoryTitle()}</h3>
        <ProductToolbar
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onInStockOnlyChange={setInStockOnly}
          resultCount={filteredProducts.length}
          maxPrice={priceCeiling}
          priceCeiling={priceCeiling}
          onPriceCeilingChange={setPriceCeiling}
          priceMax={PRICE_MAX}
        />
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToSavedItems}
              onQuickView={openQuickView}
              isSaved={savedIds.has(product.id)}
              isInCompare={compareIds.includes(product.id)}
              onToggleCompare={toggleCompare}
              compareDisabled={compareIds.length >= MAX_COMPARE}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.products.noResults}</p>
          </div>
        )}
      </section>

      <RecentlyViewed recentIds={recentIds} onQuickView={openQuickViewById} />

      <BulkOrderCTA />
      <SowingCalendar />
      <SeedCalculator />
      <AgricultureTips />
      <ShopGallery />
      <Testimonials />
      <TestimonialSuggest />
      <GovernmentSchemes />

      <section id="about" className="bg-gray-50 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2">{t.about.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {(aboutFeatures.length > 0
              ? aboutFeatures
              : [
                  { id: 1, icon: "leaf", title: t.about.organic.title, title_hi: t.about.organic.title, description: t.about.organic.desc, description_hi: t.about.organic.desc },
                  { id: 2, icon: "quality", title: t.about.quality.title, title_hi: t.about.quality.title, description: t.about.quality.desc, description_hi: t.about.quality.desc },
                  { id: 3, icon: "visit", title: t.about.visit.title, title_hi: t.about.visit.title, description: t.about.visit.desc, description_hi: t.about.visit.desc },
                ]
            ).map((f) => (
              <div key={f.id} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-green-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {f.icon === "visit" ? (
                    <Clock className="size-8 text-green-600" />
                  ) : f.icon === "quality" ? (
                    <svg className="size-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <Leaf className="size-8 text-green-600" />
                  )}
                </div>
                <h4 className="text-lg font-semibold mb-2">{language === "hi" ? f.title_hi : f.title}</h4>
                <p className="text-gray-600">{language === "hi" ? f.description_hi : f.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 bg-white p-5 sm:p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center">{t.about.hours}</h4>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <div className="flex flex-col min-[480px]:flex-row min-[480px]:justify-between min-[480px]:items-center gap-1 py-2 border-b border-gray-200">
                <span>{language === "hi" ? shop.settings?.weekday_label_hi : shop.settings?.weekday_label ?? t.about.weekdays}</span>
                <span className="font-semibold">{shop.settings?.weekday_hours ?? "9:00 AM - 7:00 PM"}</span>
              </div>
              <div className="flex flex-col min-[480px]:flex-row min-[480px]:justify-between min-[480px]:items-center gap-1 py-2 border-b border-gray-200">
                <span>{language === "hi" ? shop.settings?.sunday_label_hi : shop.settings?.sunday_label ?? t.about.sunday}</span>
                <span className="font-semibold">{shop.settings?.sunday_hours ?? "10:00 AM - 5:00 PM"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Newsletter />

      <section id="contact" className="bg-white dark:bg-gray-900 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2">{t.contact.title}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-gray-50 p-5 sm:p-8 rounded-lg order-2 lg:order-1">
              <h4 className="font-semibold mb-4 text-lg text-gray-900">{t.contact.info}</h4>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.contact.phone}</p>
                    <a href={`tel:+${shop.phone}`} className="text-green-600 hover:underline block">
                      {shop.phoneDisplay}
                    </a>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a
                        href={`tel:+${shop.phone}`}
                        className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-green-700"
                      >
                        <Phone className="size-3" />
                        {t.contact.callNow}
                      </a>
                      <button
                        onClick={() => openWhatsApp(t.whatsapp.inquiry, shop.phone)}
                        className="inline-flex items-center gap-1 bg-[#25D366] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#20bd5a]"
                      >
                        <MessageCircle className="size-3" />
                        {t.contact.whatsapp}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.contact.email}</p>
                    <a href={`mailto:${shop.email}`} className="text-green-600 hover:underline">
                      {shop.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.contact.address}</p>
                    <p>{shop.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{t.contact.hours}</p>
                    <p>
                      {language === "hi" ? shop.settings?.weekday_label_hi : shop.settings?.weekday_label ?? "Mon-Sat"}:{" "}
                      {shop.settings?.weekday_hours ?? "9:00 AM - 7:00 PM"}
                    </p>
                    <p>
                      {language === "hi" ? shop.settings?.sunday_label_hi : shop.settings?.sunday_label ?? "Sunday"}:{" "}
                      {shop.settings?.sunday_hours ?? "10:00 AM - 5:00 PM"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3 text-gray-900">{t.contact.reach}</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>{language === "hi" ? shop.settings?.metro_note_hi || t.contact.metro : shop.settings?.metro_note || t.contact.metro}</p>
                  <p>{language === "hi" ? shop.settings?.bus_note_hi || t.contact.bus : shop.settings?.bus_note || t.contact.bus}</p>
                  <p>{language === "hi" ? shop.settings?.parking_note_hi || t.contact.parking : shop.settings?.parking_note || t.contact.parking}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  {language === "hi" ? shop.settings?.contact_note_hi || t.contact.note : shop.settings?.contact_note || t.contact.note}
                </p>
                <div className="mt-4">
                  <PincodeChecker />
                </div>
                <ShopQR />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-5 sm:p-8 rounded-lg order-1 lg:order-2">
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10 sm:py-12 pb-28 sm:pb-32 safe-bottom">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="size-6" />
                <span className="text-xl font-semibold">AgroSeeds</span>
              </div>
              <p className="text-gray-400">{t.footer.desc}</p>
              <button
                onClick={handleShareWebsite}
                className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
              >
                <Share2 className="size-4" />
                {t.share.website}
              </button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
              <div className="space-y-2 text-gray-400">
                <a href={`tel:+${shop.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="size-4" />
                  <span>{shop.phoneDisplay}</span>
                </a>
                <a href={`mailto:${shop.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="size-4" />
                  <span>{shop.email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.links}</h4>
              <ul className="space-y-2 text-gray-400">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)} className="hover:text-white transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 AgroSeeds. {t.footer.rights}</p>
          </div>
        </div>
      </footer>

      <SavedItemsDrawer
        isOpen={isSavedItemsOpen}
        onClose={() => setIsSavedItemsOpen(false)}
        savedItems={savedItems}
        onRemoveItem={removeFromSavedItems}
        onUpdateQuantity={updateSavedQuantity}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSave={addToSavedItems}
        isSaved={quickViewProduct ? savedIds.has(quickViewProduct.id) : false}
      />

      <ProductCompareBar
        count={compareIds.length}
        max={MAX_COMPARE}
        onOpen={() => setShowCompare(true)}
        onClear={() => setCompareIds([])}
      />
      {showCompare && (
        <CompareModal
          compareIds={compareIds}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        />
      )}

      </main>

      <InstallPWA />
      <FloatingActions />
      <ScrollToTop />
    </div>
  );
}
