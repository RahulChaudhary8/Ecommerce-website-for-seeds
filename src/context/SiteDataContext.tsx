import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";
import { mapApiProduct } from "../api/mappers";
import type {
  ApiAboutFeature,
  ApiCategory,
  ApiCropAdvisorRules,
  ApiFaq,
  ApiGallery,
  ApiScheme,
  ApiSeedRate,
  ApiShopSettings,
  ApiSowing,
  ApiTestimonial,
  ApiTip,
} from "../api/types";
import { fallbackCategories } from "../data/categories";
import type { Product } from "../types/product";
import {
  SHOP_ADDRESS,
  SHOP_EMAIL,
  SHOP_MAPS_EMBED,
  SHOP_MAPS_URL,
  SHOP_PHONE,
  SHOP_PHONE_DISPLAY,
} from "../types/product";
import { products as fallbackProducts } from "../data/products";
import { faqItems as fallbackFaq } from "../data/faq";
import { farmingTips as fallbackTips } from "../data/tips";
import { govSchemes as fallbackSchemes } from "../data/schemes";
import { cropSeedRates as fallbackSeedRates } from "../data/seedRates";
import { sowingCalendar as fallbackSowing } from "../data/sowingCalendar";

interface SiteDataContextValue {
  loading: boolean;
  fromApi: boolean;
  settings: ApiShopSettings | null;
  categories: ApiCategory[];
  products: Product[];
  faq: ApiFaq[];
  tips: ApiTip[];
  schemes: ApiScheme[];
  testimonials: ApiTestimonial[];
  gallery: ApiGallery[];
  seedRates: ApiSeedRate[];
  sowing: ApiSowing[];
  advisorRules: ApiCropAdvisorRules;
  aboutFeatures: ApiAboutFeature[];
  pincodes: Set<string>;
  getCategoryLabel: (slug: string, language: "en" | "hi") => string;
  refresh: () => void;
}

const defaultAdvisor: ApiCropAdvisorRules = {
  kharif: { vegetables: "seeds", grains: "seeds", organic: "organic" },
  rabi: { vegetables: "seeds", grains: "seeds", organic: "fertilizer" },
  zaid: { vegetables: "seeds", grains: "pesticides", organic: "irrigation" },
};

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

function mapFallbackFaq() {
  return fallbackFaq.map((f) => ({
    id: f.id,
    question: f.question,
    question_hi: f.questionHi,
    answer: f.answer,
    answer_hi: f.answerHi,
  }));
}

function mapFallbackTips() {
  return fallbackTips.map((t) => ({
    id: t.id,
    title: t.title,
    title_hi: t.titleHi,
    excerpt: t.excerpt,
    excerpt_hi: t.excerptHi,
    content: t.content,
    content_hi: t.contentHi,
    season: t.season,
    season_hi: t.seasonHi,
    icon: t.icon,
  }));
}

function mapFallbackSchemes() {
  return fallbackSchemes.map((s) => ({
    id: s.id,
    name: s.name,
    name_hi: s.nameHi,
    description: s.description,
    description_hi: s.descriptionHi,
    benefit: s.benefit,
    benefit_hi: s.benefitHi,
    link: s.link,
    icon: s.icon,
  }));
}

function mapFallbackSeedRates() {
  return fallbackSeedRates.map((r) => ({
    id: r.id,
    name: r.name,
    name_hi: r.nameHi,
    kg_per_acre: r.kgPerAcre,
    unit: r.unit,
  }));
}

function mapFallbackSowing() {
  return fallbackSowing.map((s, i) => ({
    id: i + 1,
    month: s.month,
    monthHi: s.monthHi,
    season: s.season,
    seasonHi: s.seasonHi,
    crops: s.crops,
    cropsHi: s.cropsHi,
  }));
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);
  const [settings, setSettings] = useState<ApiShopSettings | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>(fallbackCategories);
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [faq, setFaq] = useState<ApiFaq[]>(mapFallbackFaq());
  const [tips, setTips] = useState<ApiTip[]>(mapFallbackTips());
  const [schemes, setSchemes] = useState<ApiScheme[]>(mapFallbackSchemes());
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [gallery, setGallery] = useState<ApiGallery[]>([]);
  const [seedRates, setSeedRates] = useState<ApiSeedRate[]>(mapFallbackSeedRates());
  const [sowing, setSowing] = useState<ApiSowing[]>(mapFallbackSowing());
  const [advisorRules, setAdvisorRules] = useState<ApiCropAdvisorRules>(defaultAdvisor);
  const [aboutFeatures, setAboutFeatures] = useState<ApiAboutFeature[]>([]);
  const [pincodes, setPincodes] = useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const results = await Promise.allSettled([
      api.site(),
      api.categories(),
      api.products(),
      api.faq(),
      api.tips(),
      api.schemes(),
      api.testimonials(),
      api.gallery(),
      api.seedRates(),
      api.sowing(),
      api.cropAdvisor(),
    ]);

    let connected = false;

    const site = results[0];
    if (site.status === "fulfilled") {
      setSettings(site.value.settings);
      setAboutFeatures(site.value.about_features);
      setPincodes(new Set(site.value.pincodes));
      connected = true;
    }

    const cats = results[1];
    if (cats.status === "fulfilled") {
      setCategories(cats.value);
      connected = true;
    }

    const prods = results[2];
    if (prods.status === "fulfilled") {
      setProducts(prods.value.map(mapApiProduct));
      connected = true;
    }

    const faqData = results[3];
    if (faqData.status === "fulfilled") {
      setFaq(faqData.value);
      connected = true;
    }

    const tipsData = results[4];
    if (tipsData.status === "fulfilled") {
      setTips(tipsData.value);
      connected = true;
    }

    const schemesData = results[5];
    if (schemesData.status === "fulfilled") {
      setSchemes(schemesData.value);
      connected = true;
    }

    const testiData = results[6];
    if (testiData.status === "fulfilled") {
      setTestimonials(testiData.value);
      connected = true;
    } else {
      setTestimonials([]);
    }

    const galleryData = results[7];
    if (galleryData.status === "fulfilled") {
      setGallery(galleryData.value);
      connected = true;
    }

    const rates = results[8];
    if (rates.status === "fulfilled") {
      setSeedRates(rates.value);
      connected = true;
    }

    const sow = results[9];
    if (sow.status === "fulfilled") {
      setSowing(sow.value);
      connected = true;
    }

    const advisor = results[10];
    if (advisor.status === "fulfilled") {
      setAdvisorRules(advisor.value);
      connected = true;
    }

    setFromApi(connected);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const getCategoryLabel = (slug: string, language: "en" | "hi") => {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) return slug;
    return language === "hi" ? cat.name_hi || cat.name : cat.name;
  };

  return (
    <SiteDataContext.Provider
      value={{
        loading,
        fromApi,
        settings,
        categories,
        products,
        faq,
        tips,
        schemes,
        testimonials,
        gallery,
        seedRates,
        sowing,
        advisorRules,
        aboutFeatures,
        pincodes,
        getCategoryLabel,
        refresh: load,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}

export function useShopContact() {
  const { settings } = useSiteData();
  return {
    phone: settings?.phone_e164 ?? SHOP_PHONE,
    phoneDisplay: settings?.phone_display ?? SHOP_PHONE_DISPLAY,
    email: settings?.email ?? SHOP_EMAIL,
    address: settings?.address ?? SHOP_ADDRESS,
    mapsUrl: settings?.maps_url || SHOP_MAPS_URL,
    mapsEmbed: settings?.maps_embed_url || SHOP_MAPS_EMBED,
    settings,
  };
}
