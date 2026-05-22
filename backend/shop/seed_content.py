# Initial data mirrored from src/data/*.ts

CATEGORIES = [
    {"slug": "seeds", "name": "Seeds", "name_hi": "बीज"},
    {"slug": "fertilizer", "name": "Fertilizers", "name_hi": "उर्वरक"},
    {"slug": "pesticides", "name": "Pesticides", "name_hi": "कीटनाशक"},
    {"slug": "tools", "name": "Farming Tools", "name_hi": "कृषि औजार"},
    {"slug": "organic", "name": "Organic Products", "name_hi": "जैविक उत्पाद"},
    {"slug": "animal_feed", "name": "Animal Feed", "name_hi": "पशु आहार"},
    {"slug": "irrigation", "name": "Irrigation", "name_hi": "सिंचाई"},
]

ABOUT_FEATURES = [
    {
        "title": "100% Organic",
        "title_hi": "100% जैविक",
        "description": "All our seeds are certified organic and GMO-free",
        "description_hi": "हमारे सभी बीज प्रमाणित जैविक और GMO-मुक्त हैं",
        "icon": "leaf",
    },
    {
        "title": "Quality Guaranteed",
        "title_hi": "गुणवत्ता की गारंटी",
        "description": "High germination rate and disease-resistant varieties",
        "description_hi": "उच्च अंकुरण दर और रोग प्रतिरोधी किस्में",
        "icon": "quality",
    },
    {
        "title": "Visit Our Shop",
        "title_hi": "दुकान पर आएं",
        "description": "See products in person and get expert advice",
        "description_hi": "उत्पाद देखें और विशेषज्ञ सलाह लें",
        "icon": "visit",
    },
]

PRODUCTS = [
    {"name": "Wheat Seeds (Premium Quality)", "name_hi": "गेहूं के बीज (प्रीमियम)", "category": "seeds", "price": 450, "unit": "per kg", "image_url": "https://images.unsplash.com/photo-1635562985686-4f8bb9c0d3bf?w=800", "description": "High-yield wheat seeds suitable for all soil types", "description_hi": "सभी मिट्टी के लिए उपयुक्त उच्च उपज वाले गेहूं के बीज", "stock_status": "in_stock"},
    {"name": "Rice Seeds (Basmati)", "name_hi": "चावल के बीज (बासमती)", "category": "seeds", "price": 850, "unit": "per kg", "image_url": "https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?w=800", "description": "Premium Basmati rice seeds for cultivation", "description_hi": "खेती के लिए प्रीमियम बासमती चावल के बीज", "stock_status": "low_stock", "original_price": 950},
    {"name": "DAP Fertilizer", "name_hi": "डीएपी उर्वरक", "category": "fertilizer", "price": 1200, "unit": "per 50kg bag", "image_url": "https://images.unsplash.com/photo-1599320092708-8a9dde49fc2c?w=800", "description": "Di-Ammonium Phosphate for better crop yield", "description_hi": "बेहतर फसल उपज के लिए डी-अमोनियम फॉस्फेट", "stock_status": "in_stock", "original_price": 1400},
    {"name": "Urea Fertilizer", "name_hi": "यूरिया उर्वरक", "category": "fertilizer", "price": 950, "unit": "per 50kg bag", "image_url": "https://images.unsplash.com/photo-1592997572594-34be01bc36c7?w=800", "description": "High nitrogen content for healthy plant growth", "description_hi": "स्वस्थ पौधों के विकास के लिए उच्च नाइट्रोजन", "stock_status": "in_stock"},
    {"name": "Pumpkin Seeds", "name_hi": "कद्दू के बीज", "category": "seeds", "price": 320, "unit": "per 100g", "image_url": "https://images.unsplash.com/photo-1602989106211-81de671c23a9?w=800", "description": "Organic pumpkin seeds with high germination rate", "description_hi": "उच्च अंकुरण दर वाले जैविक कद्दू के बीज", "stock_status": "in_stock"},
    {"name": "Potato Seeds", "name_hi": "आलू के बीज", "category": "seeds", "price": 280, "unit": "per kg", "image_url": "https://images.unsplash.com/photo-1621394988863-117a9fc6e77f?w=800", "description": "Certified potato seeds for better harvest", "description_hi": "बेहतर कटाई के लिए प्रमाणित आलू के बीज", "stock_status": "low_stock", "original_price": 340},
    {"name": "Lauki Seeds (Bottle Gourd)", "name_hi": "लौकी के बीज", "category": "seeds", "price": 180, "unit": "per 50g", "image_url": "https://images.unsplash.com/photo-1529159942819-334f07de4fe5?w=800", "description": "Hybrid lauki seeds for better yield", "description_hi": "बेहतर उपज के लिए संकर लौकी के बीज", "stock_status": "in_stock"},
    {"name": "Karela Seeds (Bitter Gourd)", "name_hi": "करेला के बीज", "category": "seeds", "price": 200, "unit": "per 50g", "image_url": "https://images.unsplash.com/photo-1651981350249-6173caeeb660?w=800", "description": "Disease-resistant karela seeds", "description_hi": "रोग प्रतिरोधी करेला के बीज", "stock_status": "out_of_stock"},
    {"name": "Bhindi Seeds (Okra)", "name_hi": "भिंडी के बीज", "category": "seeds", "price": 160, "unit": "per 50g", "image_url": "https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=800", "description": "High-quality bhindi seeds for home gardens", "description_hi": "घरेलू बगीचे के लिए उच्च गुणवत्ता भिंडी के बीज", "stock_status": "in_stock"},
    {"name": "Neem Oil Pesticide", "name_hi": "नीम तेल कीटनाशक", "category": "pesticides", "price": 350, "unit": "per 500ml", "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800", "description": "Organic neem oil spray for pest control", "description_hi": "कीट नियंत्रण के लिए जैविक नीम तेल स्प्रे", "stock_status": "in_stock"},
    {"name": "Insecticide Spray (Cypermethrin)", "name_hi": "कीटनाशक स्प्रे", "category": "pesticides", "price": 280, "unit": "per 250ml", "image_url": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800", "description": "Effective against common crop insects", "description_hi": "सामान्य फसल कीटों के खिलाफ प्रभावी", "stock_status": "low_stock"},
    {"name": "Hand Hoe (Khurpi)", "name_hi": "हाथ की कुदाल (खुर्पी)", "category": "tools", "price": 150, "unit": "per piece", "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", "description": "Durable steel khurpi for weeding and soil work", "description_hi": "निराई और मिट्टी के काम के लिए टिकाऊ स्टील खुर्पी", "stock_status": "in_stock"},
    {"name": "Sprayer Pump (16L)", "name_hi": "स्प्रेयर पंप (16 लीटर)", "category": "tools", "price": 1200, "unit": "per piece", "image_url": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800", "description": "Manual knapsack sprayer for pesticides and fertilizers", "description_hi": "कीटनाशक और उर्वरक के लिए मैनुअल स्प्रेयर", "stock_status": "in_stock"},
    {"name": "Vermicompost (Organic)", "name_hi": "वर्मीकम्पोस्ट (जैविक)", "category": "organic", "price": 80, "unit": "per kg", "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800", "description": "Rich organic compost for healthy soil", "description_hi": "स्वस्थ मिट्टी के लिए समृद्ध जैविक खाद", "stock_status": "in_stock"},
    {"name": "Cow Dung Manure", "name_hi": "गोबर की खाद", "category": "organic", "price": 50, "unit": "per kg", "image_url": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800", "description": "Traditional organic manure for all crops", "description_hi": "सभी फसलों के लिए पारंपरिक जैविक खाद", "stock_status": "in_stock"},
    {"name": "Cattle Feed Mix", "name_hi": "पशु आहार मिश्रण", "category": "animal_feed", "price": 1200, "unit": "per 25kg bag", "image_url": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800", "description": "Balanced nutrition feed for dairy cattle", "description_hi": "दुग्ध पशुओं के लिए संतुलित पोषण आहार", "stock_status": "in_stock"},
    {"name": "Poultry Feed", "name_hi": "मुर्गी आहार", "category": "animal_feed", "price": 850, "unit": "per 25kg bag", "image_url": "https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?w=800", "description": "High protein feed for laying hens", "description_hi": "अंडे देने वाली मुर्गियों के लिए उच्च प्रोटीन आहार", "stock_status": "coming_soon"},
    {"name": "Drip Irrigation Kit", "name_hi": "ड्रिप सिंचाई किट", "category": "irrigation", "price": 2500, "unit": "per kit", "image_url": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800", "description": "Complete drip kit for 1 acre — saves water", "description_hi": "1 एकड़ के लिए पूर्ण ड्रिप किट — पानी बचाता है", "stock_status": "in_stock"},
    {"name": "PVC Pipe (2 inch)", "name_hi": "पीवीसी पाइप (2 इंच)", "category": "irrigation", "price": 180, "unit": "per meter", "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", "description": "Heavy-duty PVC pipe for irrigation systems", "description_hi": "सिंचाई प्रणाली के लिए भारी शुल्क पीवीसी पाइप", "stock_status": "low_stock"},
    {"name": "NPK Complex Fertilizer", "name_hi": "एनपीके कॉम्प्लेक्स उर्वरक", "category": "fertilizer", "price": 1100, "unit": "per 50kg bag", "image_url": "https://images.unsplash.com/photo-1599320092708-8a9dde49fc2c?w=800", "description": "Balanced NPK for vegetables and fruits", "description_hi": "सब्जियों और फलों के लिए संतुलित एनपीके", "stock_status": "coming_soon"},
]

FAQ_DATA = [
    {"question": "Do you deliver seeds to home?", "question_hi": "क्या आप घर पर बीज डिलीवर करते हैं?", "answer": "No online or home delivery. We are a physical shop in Delhi — please visit in person, check products on the shelf, and take them from our counter. Call or WhatsApp only to confirm stock before you travel.", "answer_hi": "ऑनलाइन या घर डिलीवरी नहीं। हम दिल्ली की दुकान हैं — कृपया खुद आएं, उत्पाद देखें और काउंटर से लें। आने से पहले स्टॉक पूछने के लिए कॉल/WhatsApp कर सकते हैं।"},
    {"question": "How do I know which seeds to buy?", "question_hi": "मुझे कौन से बीज खरीदने हैं कैसे पता चलेगा?", "answer": "Our staff has 15+ years of experience. Visit the shop with your land details (soil type, season, crop) and we will recommend the best seeds and fertilizers.", "answer_hi": "हमारे स्टाफ को 15+ साल का अनुभव है। अपनी जमीन की जानकारी (मिट्टी, मौसम, फसल) के साथ दुकान पर आएं, हम सर्वोत्तम बीज और उर्वरक सुझाएंगे।"},
    {"question": "What payment methods do you accept?", "question_hi": "आप कौन से भुगतान स्वीकार करते हैं?", "answer": "Payment is only at our shop counter after you see the product — no online payment on this website. We accept cash, UPI (PhonePe, Google Pay, Paytm), and cards in-store.", "answer_hi": "भुगतान सिर्फ दुकान के काउंटर पर, उत्पाद देखने के बाद — इस वेबसाइट पर ऑनलाइन पेमेंट नहीं। नकद, UPI (PhonePe, Google Pay, Paytm) और कार्ड दुकान पर स्वीकार हैं।"},
    {"question": "Can I return or exchange products?", "question_hi": "क्या मैं उत्पाद वापस या बदल सकता हूं?", "answer": "Unopened seed packets can be exchanged within 7 days with receipt. Fertilizers and opened packets cannot be returned due to quality regulations.", "answer_hi": "बिना खोले बीज के पैकेट रसीद के साथ 7 दिनों में बदले जा सकते हैं। गुणवत्ता नियमों के कारण उर्वरक और खुले पैकेट वापस नहीं होते।"},
    {"question": "Do you offer bulk discounts?", "question_hi": "क्या आप थोक छूट देते हैं?", "answer": "Yes! For orders above ₹10,000 or large quantities for cooperatives, contact us on WhatsApp for special wholesale pricing.", "answer_hi": "हां! ₹10,000 से ऊपर के ऑर्डर या सहकारी समितियों के लिए थोक कीमत के लिए WhatsApp पर संपर्क करें।"},
    {"question": "Are your seeds certified?", "question_hi": "क्या आपके बीज प्रमाणित हैं?", "answer": "Yes, all our seeds come from government-approved suppliers with proper germination certificates and batch labels.", "answer_hi": "हां, हमारे सभी बीज सरकारी अनुमोदित आपूर्तिकर्ताओं से अंकुरण प्रमाणपत्र और बैच लेबल के साथ आते हैं।"},
]

SCHEMES = [
    {"name": "PM-KISAN", "name_hi": "पीएम-किसान", "description": "₹6,000 per year in 3 installments for eligible farmers", "description_hi": "पात्र किसानों को साल में 3 किस्तों में ₹6,000", "benefit": "Direct bank transfer — check eligibility at shop", "benefit_hi": "सीधा बैंक ट्रांसफर — दुकान पर पात्रता जांचें", "link": "https://pmkisan.gov.in/", "icon": "🇮🇳"},
    {"name": "Kisan Credit Card (KCC)", "name_hi": "किसान क्रेडिट कार्ड", "description": "Low-interest loans for seeds, fertilizers and equipment", "description_hi": "बीज, उर्वरक और उपकरण के लिए कम ब्याज ऋण", "benefit": "We help with application documents at our shop", "benefit_hi": "हम दुकान पर आवेदन दस्तावेज़ में मदद करते हैं", "link": "https://www.india.gov.in/kisan-credit-card-kcc", "icon": "💳"},
    {"name": "Soil Health Card", "name_hi": "मृदा स्वास्थ्य कार्ड", "description": "Free soil testing to choose the right fertilizer", "description_hi": "सही उर्वरक चुनने के लिए मुफ्त मिट्टी परीक्षण", "benefit": "Ask our staff about nearest soil testing center", "benefit_hi": "निकटतम मिट्टी परीक्षण केंद्र के लिए स्टाफ से पूछें", "link": "https://soilhealth.dac.gov.in/", "icon": "🧪"},
]

TESTIMONIALS = [
    {"name": "Ramesh Kumar", "name_hi": "रमेश कुमार", "location": "Ghaziabad, UP", "location_hi": "गाजियाबाद, यूपी", "text": "AgroSeeds has been my go-to shop for 10 years. Their wheat seeds gave me 20% more yield last season. Staff is very helpful!", "text_hi": "AgroSeeds 10 साल से मेरी पसंदीदा दुकान है। उनके गेहूं के बीज से पिछले सीजन में 20% ज्यादा उपज मिली। स्टाफ बहुत मददगार है!", "rating": 5, "image_url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200", "crop": "Wheat Farmer", "crop_hi": "गेहूं किसान"},
    {"name": "Sunita Devi", "name_hi": "सुनीता देवी", "location": "Noida, UP", "location_hi": "नोएडा, यूपी", "text": "I buy all my vegetable seeds from here. Lauki and bhindi seeds have excellent germination. Very fair prices too.", "text_hi": "मैं यहां से सभी सब्जी के बीज लेती हूं। लौकी और भिंडी के बीज का अंकुरण बहुत अच्छा है। कीमत भी उचित है।", "rating": 5, "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200", "crop": "Vegetable Grower", "crop_hi": "सब्जी उगाने वाली"},
    {"name": "Vijay Singh", "name_hi": "विजय सिंह", "location": "Faridabad, Haryana", "location_hi": "फरीदाबाद, हरियाणा", "text": "Got the drip irrigation kit installed with their guidance. Saved so much water! Also bought organic vermicompost — soil quality improved.", "text_hi": "उनके मार्गदर्शन से ड्रिप सिंचाई किट लगवाई। बहुत पानी बचा! जैविक वर्मीकम्पोस्ट भी लिया — मिट्टी की गुणवत्ता बढ़ी।", "rating": 5, "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", "crop": "Mixed Crop Farmer", "crop_hi": "मिश्रित फसल किसान"},
    {"name": "Mohammed Irfan", "name_hi": "मोहम्मद इरफान", "location": "Delhi", "location_hi": "दिल्ली", "text": "Best place for fertilizers and pesticides in Delhi. They explain which product to use and when. Highly recommended for new farmers.", "text_hi": "दिल्ली में उर्वरक और कीटनाशक के लिए सबसे अच्छी जगह। वे बताते हैं कौन सा उत्पाद कब उपयोग करें। नए किसानों के लिए बहुत अनुशंसित।", "rating": 4, "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", "crop": "Rice & Vegetable Farmer", "crop_hi": "धान और सब्जी किसान"},
]

GALLERY_DATA = [
    {"caption": "Our seed storage section", "caption_hi": "हमारा बीज भंडारण क्षेत्र", "image_url": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900"},
    {"caption": "Organic products display", "caption_hi": "जैविक उत्पाद प्रदर्शन", "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900"},
    {"caption": "Fertilizer & tools section", "caption_hi": "उर्वरक और औजार अनुभाग", "image_url": "https://images.unsplash.com/photo-1599320092708-8a9dde49fc2c?w=900"},
    {"caption": "Expert advice counter", "caption_hi": "विशेषज्ञ सलाह काउंटर", "image_url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900"},
    {"caption": "Tools & equipment section", "caption_hi": "औजार और उपकरण अनुभाग", "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900"},
]

SEED_RATES = [
    {"slug": "wheat", "name": "Wheat", "name_hi": "गेहूं", "kg_per_acre": 45},
    {"slug": "rice", "name": "Rice", "name_hi": "धान", "kg_per_acre": 25},
    {"slug": "potato", "name": "Potato", "name_hi": "आलू", "kg_per_acre": 800},
    {"slug": "lauki", "name": "Bottle Gourd (Lauki)", "name_hi": "लौकी", "kg_per_acre": 2},
    {"slug": "bhindi", "name": "Okra (Bhindi)", "name_hi": "भिंडी", "kg_per_acre": 3},
    {"slug": "pumpkin", "name": "Pumpkin", "name_hi": "कद्दू", "kg_per_acre": 1.5},
]

SOWING = [
    {"month_label": "June - July", "month_label_hi": "जून - जुलाई", "season": "Kharif (Monsoon)", "season_hi": "खरीफ (मानसून)", "crops_en": ["Rice", "Lauki", "Karela", "Bhindi", "Pumpkin"], "crops_hi": ["धान", "लौकी", "करेला", "भिंडी", "कद्दू"]},
    {"month_label": "October - November", "month_label_hi": "अक्टूबर - नवंबर", "season": "Rabi (Winter)", "season_hi": "रबी (सर्दी)", "crops_en": ["Wheat", "Potato", "Mustard", "Peas"], "crops_hi": ["गेहूं", "आलू", "सरसों", "मटर"]},
    {"month_label": "February - March", "month_label_hi": "फरवरी - मार्च", "season": "Zaid (Summer)", "season_hi": "ज़ायद (गर्मी)", "crops_en": ["Summer vegetables", "Melons", "Cucumber"], "crops_hi": ["गर्मी की सब्जियां", "खरबूजा", "खीरा"]},
    {"month_label": "Year Round", "month_label_hi": "पूरे साल", "season": "All Seasons", "season_hi": "सभी मौसम", "crops_en": ["Organic compost", "Neem pesticide", "Tools"], "crops_hi": ["जैविक खाद", "नीम कीटनाशक", "औजार"]},
]

ADVISOR_RULES = [
    {"season": "kharif", "goal": "vegetables", "recommended_category": "seeds"},
    {"season": "kharif", "goal": "grains", "recommended_category": "seeds"},
    {"season": "kharif", "goal": "organic", "recommended_category": "organic"},
    {"season": "rabi", "goal": "vegetables", "recommended_category": "seeds"},
    {"season": "rabi", "goal": "grains", "recommended_category": "seeds"},
    {"season": "rabi", "goal": "organic", "recommended_category": "fertilizer"},
    {"season": "zaid", "goal": "vegetables", "recommended_category": "seeds"},
    {"season": "zaid", "goal": "grains", "recommended_category": "pesticides"},
    {"season": "zaid", "goal": "organic", "recommended_category": "irrigation"},
]

PINCODES = [
    "110001", "110002", "110003", "110004", "110005", "110006", "110007", "110008",
    "110009", "110010", "110011", "110012", "110013", "110014", "110015", "110016",
    "110017", "110018", "110019", "110020", "110021", "110022", "110023", "110024",
    "110025", "110026", "110027", "110028", "110029", "110030", "110031", "110032",
    "110033", "110034", "110035", "110036", "110037", "110038", "110039", "110040",
    "110041", "110042", "110043", "110044", "110045", "110046", "110047", "110048",
    "110049", "110050", "110051", "110052", "110053", "110054", "110055", "110056",
    "110057", "110058", "110059", "110060", "110061", "110062", "110063", "110064",
    "110065", "110066", "110067", "110068", "110069", "110070", "110071", "110072",
    "110073", "110074", "110075", "110076", "110077", "110078", "110080", "110081",
    "110082", "110083", "110084", "110085", "110086", "110087", "110088", "110089",
    "110090", "110091", "110092", "110093", "110094", "110095", "110096", "110097",
    "121001", "121002", "121003", "122001", "122002", "122003", "122004", "122005",
    "122006", "122007", "122008", "122009", "122010", "122011", "122015", "122016",
    "122017", "122018", "201001", "201002", "201003", "201004", "201005", "201006",
    "201010", "201014", "203201", "203202",
]

TIPS = [
    {"title": "When to Plant Wheat Seeds", "title_hi": "गेहूं के बीज कब बोएं", "excerpt": "Best time is October-November (Rabi season) when soil temperature is 20-25°C.", "excerpt_hi": "सबसे अच्छा समय अक्टूबर-नवंबर (रबी सीजन) जब मिट्टी का तापमान 20-25°C हो।", "content": "Prepare land 2-3 weeks before sowing. Use 40-50 kg seeds per acre. Ensure proper drainage. Apply DAP at sowing time for better root development.", "content_hi": "बुवाई से 2-3 सप्ताह पहले जमीन तैयार करें। प्रति एकड़ 40-50 किलो बीज का उपयोग करें। उचित जल निकासी सुनिश्चित करें। बेहतर जड़ विकास के लिए बुवाई के समय डीएपी डालें।", "season": "Rabi (Winter)", "season_hi": "रबी (सर्दी)", "icon": "🌾"},
    {"title": "Proper Fertilizer Usage", "title_hi": "उर्वरक का सही उपयोग", "excerpt": "Never mix urea with DAP directly. Apply fertilizers based on soil test results.", "excerpt_hi": "यूरिया को सीधे डीएपी के साथ न मिलाएं। मिट्टी परीक्षण के आधार पर उर्वरक डालें।", "content": "Apply nitrogen (Urea) in split doses — 50% at sowing, 25% at tillering, 25% at flowering. Phosphorus (DAP) should be applied at sowing. Avoid over-fertilization as it damages soil.", "content_hi": "नाइट्रोजन (यूरिया) विभाजित मात्रा में डालें — 50% बुवाई पर, 25% कल्ले पर, 25% फूल आने पर। फॉस्फोरस (डीएपी) बुवाई के समय डालें। अधिक उर्वरक से मिट्टी को नुकसान होता है।", "season": "All Seasons", "season_hi": "सभी मौसम", "icon": "🧪"},
    {"title": "Monsoon Vegetable Planting Guide", "title_hi": "मानसून सब्जी बुवाई गाइड", "excerpt": "Plant lauki, karela, bhindi and pumpkin during June-July rains.", "excerpt_hi": "जून-जुलाई की बारिश में लौकी, करेला, भिंडी और कद्दू लगाएं।", "content": "Raise seedlings in nursery beds first. Transplant after 3-4 weeks. Use neem oil spray weekly to prevent pests. Ensure raised beds for drainage during heavy rains.", "content_hi": "पहले नर्सरी में पौधे उगाएं। 3-4 सप्ताह बाद रोपाई करें। कीटों से बचाव के लिए साप्ताहिक नीम तेल स्प्रे करें। भारी बारिश में जल निकासी के लिए ऊंची क्यारियां बनाएं।", "season": "Kharif (Monsoon)", "season_hi": "खरीफ (मानसून)", "icon": "🌧️"},
    {"title": "Organic Farming Best Practices", "title_hi": "जैविक खेती के सर्वोत्तम तरीके", "excerpt": "Use vermicompost and cow dung manure instead of chemical fertilizers.", "excerpt_hi": "रासायनिक उर्वरक के बजाय वर्मीकम्पोस्ट और गोबर की खाद का उपयोग करें।", "content": "Apply 2-3 tons compost per acre before each crop. Rotate crops yearly. Use neem-based pesticides. Maintain soil moisture with mulching.", "content_hi": "प्रत्येक फसल से पहले प्रति एकड़ 2-3 टन कम्पोस्ट डालें। सालाना फसल चक्र अपनाएं। नीम आधारित कीटनाशक उपयोग करें। मल्चिंग से मिट्टी की नमी बनाए रखें।", "season": "Year Round", "season_hi": "पूरे साल", "icon": "🌿"},
    {"title": "Water-Saving with Drip Irrigation", "title_hi": "ड्रिप सिंचाई से पानी बचाएं", "excerpt": "Drip irrigation saves up to 60% water compared to flood irrigation.", "excerpt_hi": "ड्रिप सिंचाई से बाढ़ सिंचाई की तुलना में 60% तक पानी बचता है।", "content": "Install drip lines along crop rows. Run irrigation early morning or evening. Check for clogged emitters weekly. Combine with mulching for best results.", "content_hi": "फसल की कतारों के साथ ड्रिप लाइन लगाएं। सुबह या शाम को सिंचाई करें। साप्ताहिक जाम नोजल जांच करें। सर्वोत्तम परिणाम के लिए मल्चिंग के साथ मिलाएं।", "season": "Summer", "season_hi": "गर्मी", "icon": "💧"},
    {"title": "Pest Control Without Harmful Chemicals", "title_hi": "हानिकारक रसायन के बिना कीट नियंत्रण", "excerpt": "Neem oil spray is effective against aphids, whiteflies and caterpillars.", "excerpt_hi": "नीम तेल स्प्रे एफिड्स, सफेद मक्खी और कैटरपिलर के खिलाफ प्रभावी है।", "content": "Mix 5ml neem oil per liter of water. Spray every 7-10 days. Apply in evening to avoid leaf burn. For severe infestations, consult our shop experts before using stronger pesticides.", "content_hi": "प्रति लीटर पानी में 5ml नीम तेल मिलाएं। हर 7-10 दिन स्प्रे करें। पत्ती जलने से बचने के लिए शाम को लगाएं। गंभीर संक्रमण में तेज कीटनाशक से पहले हमारे विशेषज्ञ से सलाह लें।", "season": "All Seasons", "season_hi": "सभी मौसम", "icon": "🐛"},
]
