from decimal import Decimal

from django.core.management.base import BaseCommand

from shop.models import (
    AboutFeature,
    Category,
    CropAdvisorRule,
    CropSeedRate,
    FAQItem,
    FarmingTip,
    GovernmentScheme,
    Product,
    ServicePincode,
    ShopGalleryImage,
    ShopSettings,
    SowingCalendarEntry,
    Testimonial,
)
from shop.seed_content import (
    ABOUT_FEATURES,
    ADVISOR_RULES,
    CATEGORIES,
    FAQ_DATA,
    GALLERY_DATA,
    PINCODES,
    PRODUCTS,
    SCHEMES,
    SEED_RATES,
    SOWING,
    TESTIMONIALS,
    TIPS,
)


class Command(BaseCommand):
    help = "Load initial AgroSeeds data from frontend seed files"

    def handle(self, *args, **options):
        self.stdout.write("Seeding database…")

        ShopSettings.objects.update_or_create(
            pk=1,
            defaults={
                "phone_e164": "918318576674",
                "phone_display": "+91 8318576674",
                "email": "info@agroseeds.com",
                "address": "123 Agriculture Market, Delhi - 110001, India",
                "maps_url": "https://www.google.com/maps/search/?api=1&query=28.6315,77.2167",
                "maps_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.854489374!2d77.214!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTInNTAuNCJF!5e0!3m2!1sen!2sin!4v1",
                "metro_note": "By Metro: Nearest metro station is 500m away",
                "metro_note_hi": "मेट्रो से: निकटतम मेट्रो स्टेशन 500 मीटर दूर",
                "bus_note": "By Bus: Multiple bus routes available",
                "bus_note_hi": "बस से: कई बस मार्ग उपलब्ध",
                "parking_note": "Parking: Free parking available for customers",
                "parking_note_hi": "पार्किंग: ग्राहकों के लिए मुफ्त पार्किंग",
                "contact_note": "Visit our shop to see our complete range of products and get personalized advice from our agriculture experts.",
                "contact_note_hi": "हमारी दुकान पर आकर उत्पाद देखें और कृषि विशेषज्ञों से व्यक्तिगत सलाह लें।",
                "stat_products": "20+",
            },
        )

        AboutFeature.objects.all().delete()
        for i, row in enumerate(ABOUT_FEATURES):
            AboutFeature.objects.create(sort_order=i, **row)

        Category.objects.all().delete()
        category_by_slug = {}
        for i, row in enumerate(CATEGORIES):
            cat = Category.objects.create(sort_order=i, **row)
            category_by_slug[cat.slug] = cat

        Product.objects.all().delete()
        for i, p in enumerate(PRODUCTS):
            orig = p.pop("original_price", None)
            slug = p.pop("category")
            Product.objects.create(
                sort_order=i,
                category=category_by_slug[slug],
                original_price=Decimal(str(orig)) if orig else None,
                **p,
            )

        FAQItem.objects.all().delete()
        for i, row in enumerate(FAQ_DATA):
            FAQItem.objects.create(sort_order=i, **row)

        FarmingTip.objects.all().delete()
        for i, row in enumerate(TIPS):
            FarmingTip.objects.create(sort_order=i, **row)

        GovernmentScheme.objects.all().delete()
        for i, row in enumerate(SCHEMES):
            GovernmentScheme.objects.create(sort_order=i, **row)

        Testimonial.objects.all().delete()
        for i, row in enumerate(TESTIMONIALS):
            Testimonial.objects.create(sort_order=i, **row)

        ShopGalleryImage.objects.all().delete()
        for i, row in enumerate(GALLERY_DATA):
            ShopGalleryImage.objects.create(sort_order=i, **row)

        CropSeedRate.objects.all().delete()
        for i, row in enumerate(SEED_RATES):
            CropSeedRate.objects.create(sort_order=i, **row)

        SowingCalendarEntry.objects.all().delete()
        for i, row in enumerate(SOWING):
            SowingCalendarEntry.objects.create(sort_order=i, **row)

        CropAdvisorRule.objects.all().delete()
        for row in ADVISOR_RULES:
            CropAdvisorRule.objects.create(
                recommended_category=category_by_slug[row["recommended_category"]],
                season=row["season"],
                goal=row["goal"],
            )

        ServicePincode.objects.all().delete()
        ServicePincode.objects.bulk_create([ServicePincode(pincode=p) for p in PINCODES])

        self.stdout.write(self.style.SUCCESS("Seed complete. Create admin: python manage.py createsuperuser"))
