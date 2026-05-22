export interface CategoryItem {
  id: number;
  slug: string;
  name: string;
  name_hi: string;
  sort_order: number;
}

export const fallbackCategories: CategoryItem[] = [
  { id: 1, slug: "seeds", name: "Seeds", name_hi: "बीज", sort_order: 0 },
  { id: 2, slug: "fertilizer", name: "Fertilizers", name_hi: "उर्वरक", sort_order: 1 },
  { id: 3, slug: "pesticides", name: "Pesticides", name_hi: "कीटनाशक", sort_order: 2 },
  { id: 4, slug: "tools", name: "Farming Tools", name_hi: "कृषि औजार", sort_order: 3 },
  { id: 5, slug: "organic", name: "Organic Products", name_hi: "जैविक उत्पाद", sort_order: 4 },
  { id: 6, slug: "animal_feed", name: "Animal Feed", name_hi: "पशु आहार", sort_order: 5 },
  { id: 7, slug: "irrigation", name: "Irrigation", name_hi: "सिंचाई", sort_order: 6 },
];
