export interface GovScheme {
  id: number;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  benefit: string;
  benefitHi: string;
  link: string;
  icon: string;
}

export const govSchemes: GovScheme[] = [
  {
    id: 1,
    name: "PM-KISAN",
    nameHi: "पीएम-किसान",
    description: "₹6,000 per year in 3 installments for eligible farmers",
    descriptionHi: "पात्र किसानों को साल में 3 किस्तों में ₹6,000",
    benefit: "Direct bank transfer — check eligibility at shop",
    benefitHi: "सीधा बैंक ट्रांसफर — दुकान पर पात्रता जांचें",
    link: "https://pmkisan.gov.in/",
    icon: "🇮🇳",
  },
  {
    id: 2,
    name: "Kisan Credit Card (KCC)",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Low-interest loans for seeds, fertilizers and equipment",
    descriptionHi: "बीज, उर्वरक और उपकरण के लिए कम ब्याज ऋण",
    benefit: "We help with application documents at our shop",
    benefitHi: "हम दुकान पर आवेदन दस्तावेज़ में मदद करते हैं",
    link: "https://www.india.gov.in/kisan-credit-card-kcc",
    icon: "💳",
  },
  {
    id: 3,
    name: "Soil Health Card",
    nameHi: "मृदा स्वास्थ्य कार्ड",
    description: "Free soil testing to choose the right fertilizer",
    descriptionHi: "सही उर्वरक चुनने के लिए मुफ्त मिट्टी परीक्षण",
    benefit: "Ask our staff about nearest soil testing center",
    benefitHi: "निकटतम मिट्टी परीक्षण केंद्र के लिए स्टाफ से पूछें",
    link: "https://soilhealth.dac.gov.in/",
    icon: "🧪",
  },
];
