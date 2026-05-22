export interface CropSeedRate {
  id: string;
  name: string;
  nameHi: string;
  kgPerAcre: number;
  unit: string;
}

export const cropSeedRates: CropSeedRate[] = [
  { id: "wheat", name: "Wheat", nameHi: "गेहूं", kgPerAcre: 45, unit: "kg/acre" },
  { id: "rice", name: "Rice", nameHi: "धान", kgPerAcre: 25, unit: "kg/acre" },
  { id: "potato", name: "Potato", nameHi: "आलू", kgPerAcre: 800, unit: "kg/acre" },
  { id: "lauki", name: "Bottle Gourd (Lauki)", nameHi: "लौकी", kgPerAcre: 2, unit: "kg/acre" },
  { id: "bhindi", name: "Okra (Bhindi)", nameHi: "भिंडी", kgPerAcre: 3, unit: "kg/acre" },
  { id: "pumpkin", name: "Pumpkin", nameHi: "कद्दू", kgPerAcre: 1.5, unit: "kg/acre" },
];
