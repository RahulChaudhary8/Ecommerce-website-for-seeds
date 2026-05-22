from rest_framework import serializers

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
    ProductImage,
    ServicePincode,
    ShopGalleryImage,
    ShopSettings,
    SowingCalendarEntry,
    Testimonial,
    TestimonialSuggestion,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "slug", "name", "name_hi", "sort_order"]


def abs_media(request, file_field, url_field=""):
    if file_field:
        return request.build_absolute_uri(file_field.url)
    return url_field or ""


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ["id", "url", "sort_order"]

    def get_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image_url


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.slug", read_only=True)
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)
    original_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, coerce_to_string=False, allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "name_hi",
            "category",
            "price",
            "unit",
            "image",
            "images",
            "description",
            "description_hi",
            "stock_status",
            "original_price",
            "sort_order",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image_url

    def get_images(self, obj):
        extras = []
        request = self.context.get("request")
        for img in obj.extra_images.all():
            if img.image and request:
                extras.append(request.build_absolute_uri(img.image.url))
            elif img.image_url:
                extras.append(img.image_url)
        return extras


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ["id", "question", "question_hi", "answer", "answer_hi", "sort_order"]


class FarmingTipSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmingTip
        fields = [
            "id",
            "title",
            "title_hi",
            "excerpt",
            "excerpt_hi",
            "content",
            "content_hi",
            "season",
            "season_hi",
            "icon",
            "sort_order",
        ]


class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentScheme
        fields = [
            "id",
            "name",
            "name_hi",
            "description",
            "description_hi",
            "benefit",
            "benefit_hi",
            "link",
            "icon",
            "sort_order",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "id",
            "name",
            "name_hi",
            "location",
            "location_hi",
            "text",
            "text_hi",
            "rating",
            "image",
            "crop",
            "crop_hi",
            "sort_order",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image_url


class TestimonialSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialSuggestion
        fields = ["name", "location", "farming_type", "rating", "description", "phone"]
        extra_kwargs = {"phone": {"required": False, "allow_blank": True}}

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value


class GallerySerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ShopGalleryImage
        fields = ["id", "url", "caption", "caption_hi", "sort_order"]

    def get_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image_url


class SeedRateSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="slug")

    class Meta:
        model = CropSeedRate
        fields = ["id", "name", "name_hi", "kg_per_acre", "unit", "sort_order"]


class SowingSerializer(serializers.ModelSerializer):
    month = serializers.CharField(source="month_label")
    monthHi = serializers.CharField(source="month_label_hi")
    seasonHi = serializers.CharField(source="season_hi")
    crops = serializers.ListField(source="crops_en")
    cropsHi = serializers.ListField(source="crops_hi")

    class Meta:
        model = SowingCalendarEntry
        fields = ["id", "month", "monthHi", "season", "seasonHi", "crops", "cropsHi", "sort_order"]


class CropAdvisorRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropAdvisorRule
        fields = ["season", "goal", "recommended_category"]


class AboutFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFeature
        fields = ["id", "title", "title_hi", "description", "description_hi", "icon", "sort_order"]


class ShopSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopSettings
        fields = [
            "phone_e164",
            "phone_display",
            "email",
            "address",
            "maps_url",
            "maps_embed_url",
            "metro_note",
            "metro_note_hi",
            "bus_note",
            "bus_note_hi",
            "parking_note",
            "parking_note_hi",
            "contact_note",
            "contact_note_hi",
            "weekday_label",
            "weekday_label_hi",
            "sunday_label",
            "sunday_label_hi",
            "weekday_hours",
            "sunday_hours",
            "weekday_open_hour",
            "weekday_close_hour",
            "sunday_open_hour",
            "sunday_close_hour",
            "stat_years",
            "stat_farmers",
            "stat_products",
            "stat_quality",
        ]


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ["phone"]

    def validate_phone(self, value):
        digits = "".join(c for c in value if c.isdigit())
        if len(digits) < 10:
            raise serializers.ValidationError("Enter a valid 10-digit mobile number.")
        return digits[-10:]


class SiteBundleSerializer(serializers.Serializer):
    settings = ShopSettingsSerializer()
    about_features = AboutFeatureSerializer(many=True)
    pincodes = serializers.ListField(child=serializers.CharField())
