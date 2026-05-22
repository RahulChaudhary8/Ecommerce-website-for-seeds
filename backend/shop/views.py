from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AboutFeature,
    Category,
    CropAdvisorRule,
    CropSeedRate,
    FAQItem,
    FarmingTip,
    GovernmentScheme,
    NewsletterSubscription,
    Product,
    ServicePincode,
    ShopGalleryImage,
    ShopSettings,
    SowingCalendarEntry,
    Testimonial,
    TestimonialSuggestion,
)
from .serializers import (
    AboutFeatureSerializer,
    CategorySerializer,
    CropAdvisorRuleSerializer,
    FAQSerializer,
    FarmingTipSerializer,
    GallerySerializer,
    NewsletterSerializer,
    ProductSerializer,
    SchemeSerializer,
    SeedRateSerializer,
    ShopSettingsSerializer,
    SowingSerializer,
    TestimonialSerializer,
    TestimonialSuggestionSerializer,
)


class CategoryListView(APIView):
    def get(self, request):
        qs = Category.objects.filter(is_active=True)
        return Response(CategorySerializer(qs, many=True).data)


class ProductListView(APIView):
    def get(self, request):
        qs = (
            Product.objects.filter(is_active=True)
            .select_related("category")
            .prefetch_related("extra_images")
        )
        return Response(ProductSerializer(qs, many=True, context={"request": request}).data)


class SiteConfigView(APIView):
    def get(self, request):
        settings, _ = ShopSettings.objects.get_or_create(pk=1)
        about = AboutFeature.objects.filter(is_published=True)
        pincodes = list(ServicePincode.objects.values_list("pincode", flat=True))
        return Response(
            {
                "settings": ShopSettingsSerializer(settings).data,
                "about_features": AboutFeatureSerializer(about, many=True).data,
                "pincodes": pincodes,
            }
        )


class FAQListView(APIView):
    def get(self, request):
        qs = FAQItem.objects.filter(is_published=True)
        return Response(FAQSerializer(qs, many=True).data)


class TipsListView(APIView):
    def get(self, request):
        qs = FarmingTip.objects.filter(is_published=True)
        return Response(FarmingTipSerializer(qs, many=True).data)


class SchemesListView(APIView):
    def get(self, request):
        qs = GovernmentScheme.objects.filter(is_published=True)
        return Response(SchemeSerializer(qs, many=True).data)


class TestimonialsListView(APIView):
    def get(self, request):
        qs = Testimonial.objects.filter(is_published=True)
        return Response(TestimonialSerializer(qs, many=True, context={"request": request}).data)


class TestimonialSuggestView(APIView):
    def post(self, request):
        ser = TestimonialSuggestionSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(
            {"ok": True, "message": "Thank you! Your review will appear after admin approval."},
            status=status.HTTP_201_CREATED,
        )


class GalleryListView(APIView):
    def get(self, request):
        qs = ShopGalleryImage.objects.filter(is_published=True)
        return Response(GallerySerializer(qs, many=True, context={"request": request}).data)


class SeedRatesListView(APIView):
    def get(self, request):
        qs = CropSeedRate.objects.all()
        return Response(SeedRateSerializer(qs, many=True).data)


class SowingListView(APIView):
    def get(self, request):
        qs = SowingCalendarEntry.objects.filter(is_published=True)
        return Response(SowingSerializer(qs, many=True).data)


class CropAdvisorListView(APIView):
    def get(self, request):
        qs = CropAdvisorRule.objects.select_related("recommended_category")
        rules = {}
        for r in qs:
            rules.setdefault(r.season, {})[r.goal] = r.recommended_category.slug
        return Response(rules)


class NewsletterSubscribeView(APIView):
    def post(self, request):
        ser = NewsletterSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        phone = ser.validated_data["phone"]
        NewsletterSubscription.objects.update_or_create(
            phone=phone, defaults={"is_active": True}
        )
        return Response({"ok": True, "message": "Subscribed successfully."}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def health(request):
    return Response({"status": "ok"})
