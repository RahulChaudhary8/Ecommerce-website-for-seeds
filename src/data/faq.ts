export interface FAQItem {
  id: number;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Do you deliver seeds to home?",
    questionHi: "क्या आप घर पर बीज डिलीवर करते हैं?",
    answer:
      "No online or home delivery. We are a physical shop in Delhi — please visit in person, check products on the shelf, and take them from our counter. Call or WhatsApp only to confirm stock before you travel.",
    answerHi:
      "ऑनलाइन या घर डिलीवरी नहीं। हम दिल्ली की दुकान हैं — कृपया खुद आएं, उत्पाद देखें और काउंटर से लें। आने से पहले स्टॉक पूछने के लिए कॉल/WhatsApp कर सकते हैं।",
  },
  {
    id: 2,
    question: "How do I know which seeds to buy?",
    questionHi: "मुझे कौन से बीज खरीदने हैं कैसे पता चलेगा?",
    answer:
      "Our staff has 15+ years of experience. Visit the shop with your land details (soil type, season, crop) and we will recommend the best seeds and fertilizers.",
    answerHi:
      "हमारे स्टाफ को 15+ साल का अनुभव है। अपनी जमीन की जानकारी (मिट्टी, मौसम, फसल) के साथ दुकान पर आएं, हम सर्वोत्तम बीज और उर्वरक सुझाएंगे।",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    questionHi: "आप कौन से भुगतान स्वीकार करते हैं?",
    answer:
      "Payment is only at our shop counter after you see the product — no online payment on this website. We accept cash, UPI (PhonePe, Google Pay, Paytm), and cards in-store.",
    answerHi:
      "भुगतान सिर्फ दुकान के काउंटर पर, उत्पाद देखने के बाद — इस वेबसाइट पर ऑनलाइन पेमेंट नहीं। नकद, UPI (PhonePe, Google Pay, Paytm) और कार्ड दुकान पर स्वीकार हैं।",
  },
  {
    id: 4,
    question: "Can I return or exchange products?",
    questionHi: "क्या मैं उत्पाद वापस या बदल सकता हूं?",
    answer:
      "Unopened seed packets can be exchanged within 7 days with receipt. Fertilizers and opened packets cannot be returned due to quality regulations.",
    answerHi:
      "बिना खोले बीज के पैकेट रसीद के साथ 7 दिनों में बदले जा सकते हैं। गुणवत्ता नियमों के कारण उर्वरक और खुले पैकेट वापस नहीं होते।",
  },
  {
    id: 5,
    question: "Do you offer bulk discounts?",
    questionHi: "क्या आप थोक छूट देते हैं?",
    answer:
      "Yes! For orders above ₹10,000 or large quantities for cooperatives, contact us on WhatsApp for special wholesale pricing.",
    answerHi:
      "हां! ₹10,000 से ऊपर के ऑर्डर या सहकारी समितियों के लिए थोक कीमत के लिए WhatsApp पर संपर्क करें।",
  },
  {
    id: 6,
    question: "Are your seeds certified?",
    questionHi: "क्या आपके बीज प्रमाणित हैं?",
    answer:
      "Yes, all our seeds come from government-approved suppliers with proper germination certificates and batch labels.",
    answerHi:
      "हां, हमारे सभी बीज सरकारी अनुमोदित आपूर्तिकर्ताओं से अंकुरण प्रमाणपत्र और बैच लेबल के साथ आते हैं।",
  },
];
