export interface FarmingTip {
  id: number;
  title: string;
  titleHi: string;
  excerpt: string;
  excerptHi: string;
  content: string;
  contentHi: string;
  season: string;
  seasonHi: string;
  icon: string;
}

export const farmingTips: FarmingTip[] = [
  {
    id: 1,
    title: "When to Plant Wheat Seeds",
    titleHi: "गेहूं के बीज कब बोएं",
    excerpt: "Best time is October-November (Rabi season) when soil temperature is 20-25°C.",
    excerptHi: "सबसे अच्छा समय अक्टूबर-नवंबर (रबी सीजन) जब मिट्टी का तापमान 20-25°C हो।",
    content:
      "Prepare land 2-3 weeks before sowing. Use 40-50 kg seeds per acre. Ensure proper drainage. Apply DAP at sowing time for better root development.",
    contentHi:
      "बुवाई से 2-3 सप्ताह पहले जमीन तैयार करें। प्रति एकड़ 40-50 किलो बीज का उपयोग करें। उचित जल निकासी सुनिश्चित करें। बेहतर जड़ विकास के लिए बुवाई के समय डीएपी डालें।",
    season: "Rabi (Winter)",
    seasonHi: "रबी (सर्दी)",
    icon: "🌾",
  },
  {
    id: 2,
    title: "Proper Fertilizer Usage",
    titleHi: "उर्वरक का सही उपयोग",
    excerpt: "Never mix urea with DAP directly. Apply fertilizers based on soil test results.",
    excerptHi: "यूरिया को सीधे डीएपी के साथ न मिलाएं। मिट्टी परीक्षण के आधार पर उर्वरक डालें।",
    content:
      "Apply nitrogen (Urea) in split doses — 50% at sowing, 25% at tillering, 25% at flowering. Phosphorus (DAP) should be applied at sowing. Avoid over-fertilization as it damages soil.",
    contentHi:
      "नाइट्रोजन (यूरिया) विभाजित मात्रा में डालें — 50% बुवाई पर, 25% कल्ले पर, 25% फूल आने पर। फॉस्फोरस (डीएपी) बुवाई के समय डालें। अधिक उर्वरक से मिट्टी को नुकसान होता है।",
    season: "All Seasons",
    seasonHi: "सभी मौसम",
    icon: "🧪",
  },
  {
    id: 3,
    title: "Monsoon Vegetable Planting Guide",
    titleHi: "मानसून सब्जी बुवाई गाइड",
    excerpt: "Plant lauki, karela, bhindi and pumpkin during June-July rains.",
    excerptHi: "जून-जुलाई की बारिश में लौकी, करेला, भिंडी और कद्दू लगाएं।",
    content:
      "Raise seedlings in nursery beds first. Transplant after 3-4 weeks. Use neem oil spray weekly to prevent pests. Ensure raised beds for drainage during heavy rains.",
    contentHi:
      "पहले नर्सरी में पौधे उगाएं। 3-4 सप्ताह बाद रोपाई करें। कीटों से बचाव के लिए साप्ताहिक नीम तेल स्प्रे करें। भारी बारिश में जल निकासी के लिए ऊंची क्यारियां बनाएं।",
    season: "Kharif (Monsoon)",
    seasonHi: "खरीफ (मानसून)",
    icon: "🌧️",
  },
  {
    id: 4,
    title: "Organic Farming Best Practices",
    titleHi: "जैविक खेती के सर्वोत्तम तरीके",
    excerpt: "Use vermicompost and cow dung manure instead of chemical fertilizers.",
    excerptHi: "रासायनिक उर्वरक के बजाय वर्मीकम्पोस्ट और गोबर की खाद का उपयोग करें।",
    content:
      "Apply 2-3 tons compost per acre before each crop. Rotate crops yearly. Use neem-based pesticides. Maintain soil moisture with mulching.",
    contentHi:
      "प्रत्येक फसल से पहले प्रति एकड़ 2-3 टन कम्पोस्ट डालें। सालाना फसल चक्र अपनाएं। नीम आधारित कीटनाशक उपयोग करें। मल्चिंग से मिट्टी की नमी बनाए रखें।",
    season: "Year Round",
    seasonHi: "पूरे साल",
    icon: "🌿",
  },
  {
    id: 5,
    title: "Water-Saving with Drip Irrigation",
    titleHi: "ड्रिप सिंचाई से पानी बचाएं",
    excerpt: "Drip irrigation saves up to 60% water compared to flood irrigation.",
    excerptHi: "ड्रिप सिंचाई से बाढ़ सिंचाई की तुलना में 60% तक पानी बचता है।",
    content:
      "Install drip lines along crop rows. Run irrigation early morning or evening. Check for clogged emitters weekly. Combine with mulching for best results.",
    contentHi:
      "फसल की कतारों के साथ ड्रिप लाइन लगाएं। सुबह या शाम को सिंचाई करें। साप्ताहिक जाम नोजल जांच करें। सर्वोत्तम परिणाम के लिए मल्चिंग के साथ मिलाएं।",
    season: "Summer",
    seasonHi: "गर्मी",
    icon: "💧",
  },
  {
    id: 6,
    title: "Pest Control Without Harmful Chemicals",
    titleHi: "हानिकारक रसायन के बिना कीट नियंत्रण",
    excerpt: "Neem oil spray is effective against aphids, whiteflies and caterpillars.",
    excerptHi: "नीम तेल स्प्रे एफिड्स, सफेद मक्खी और कैटरपिलर के खिलाफ प्रभावी है।",
    content:
      "Mix 5ml neem oil per liter of water. Spray every 7-10 days. Apply in evening to avoid leaf burn. For severe infestations, consult our shop experts before using stronger pesticides.",
    contentHi:
      "प्रति लीटर पानी में 5ml नीम तेल मिलाएं। हर 7-10 दिन स्प्रे करें। पत्ती जलने से बचने के लिए शाम को लगाएं। गंभीर संक्रमण में तेज कीटनाशक से पहले हमारे विशेषज्ञ से सलाह लें।",
    season: "All Seasons",
    seasonHi: "सभी मौसम",
    icon: "🐛",
  },
];
