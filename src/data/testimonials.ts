export interface Testimonial {
  id: number;
  name: string;
  nameHi: string;
  location: string;
  locationHi: string;
  text: string;
  textHi: string;
  rating: number;
  image: string;
  crop: string;
  cropHi: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    nameHi: "रमेश कुमार",
    location: "Ghaziabad, UP",
    locationHi: "गाजियाबाद, यूपी",
    text: "AgroSeeds has been my go-to shop for 10 years. Their wheat seeds gave me 20% more yield last season. Staff is very helpful!",
    textHi: "AgroSeeds 10 साल से मेरी पसंदीदा दुकान है। उनके गेहूं के बीज से पिछले सीजन में 20% ज्यादा उपज मिली। स्टाफ बहुत मददगार है!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    crop: "Wheat Farmer",
    cropHi: "गेहूं किसान",
  },
  {
    id: 2,
    name: "Sunita Devi",
    nameHi: "सुनीता देवी",
    location: "Noida, UP",
    locationHi: "नोएडा, यूपी",
    text: "I buy all my vegetable seeds from here. Lauki and bhindi seeds have excellent germination. Very fair prices too.",
    textHi: "मैं यहां से सभी सब्जी के बीज लेती हूं। लौकी और भिंडी के बीज का अंकुरण बहुत अच्छा है। कीमत भी उचित है।",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    crop: "Vegetable Grower",
    cropHi: "सब्जी उगाने वाली",
  },
  {
    id: 3,
    name: "Vijay Singh",
    nameHi: "विजय सिंह",
    location: "Faridabad, Haryana",
    locationHi: "फरीदाबाद, हरियाणा",
    text: "Got the drip irrigation kit installed with their guidance. Saved so much water! Also bought organic vermicompost — soil quality improved.",
    textHi: "उनके मार्गदर्शन से ड्रिप सिंचाई किट लगवाई। बहुत पानी बचा! जैविक वर्मीकम्पोस्ट भी लिया — मिट्टी की गुणवत्ता बढ़ी।",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    crop: "Mixed Crop Farmer",
    cropHi: "मिश्रित फसल किसान",
  },
  {
    id: 4,
    name: "Mohammed Irfan",
    nameHi: "मोहम्मद इरफान",
    location: "Delhi",
    locationHi: "दिल्ली",
    text: "Best place for fertilizers and pesticides in Delhi. They explain which product to use and when. Highly recommended for new farmers.",
    textHi: "दिल्ली में उर्वरक और कीटनाशक के लिए सबसे अच्छी जगह। वे बताते हैं कौन सा उत्पाद कब उपयोग करें। नए किसानों के लिए बहुत अनुशंसित।",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    crop: "Rice & Vegetable Farmer",
    cropHi: "धान और सब्जी किसान",
  },
];
