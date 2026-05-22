export interface SowingMonth {
  month: string;
  monthHi: string;
  crops: string[];
  cropsHi: string[];
  season: string;
  seasonHi: string;
}

export const sowingCalendar: SowingMonth[] = [
  {
    month: "June - July",
    monthHi: "जून - जुलाई",
    crops: ["Rice", "Lauki", "Karela", "Bhindi", "Pumpkin"],
    cropsHi: ["धान", "लौकी", "करेला", "भिंडी", "कद्दू"],
    season: "Kharif (Monsoon)",
    seasonHi: "खरीफ (मानसून)",
  },
  {
    month: "October - November",
    monthHi: "अक्टूबर - नवंबर",
    crops: ["Wheat", "Potato", "Mustard", "Peas"],
    cropsHi: ["गेहूं", "आलू", "सरसों", "मटर"],
    season: "Rabi (Winter)",
    seasonHi: "रबी (सर्दी)",
  },
  {
    month: "February - March",
    monthHi: "फरवरी - मार्च",
    crops: ["Summer vegetables", "Melons", "Cucumber"],
    cropsHi: ["गर्मी की सब्जियां", "खरबूजा", "खीरा"],
    season: "Zaid (Summer)",
    seasonHi: "ज़ायद (गर्मी)",
  },
  {
    month: "Year Round",
    monthHi: "पूरे साल",
    crops: ["Organic compost", "Neem pesticide", "Tools"],
    cropsHi: ["जैविक खाद", "नीम कीटनाशक", "औजार"],
    season: "All Seasons",
    seasonHi: "सभी मौसम",
  },
];
