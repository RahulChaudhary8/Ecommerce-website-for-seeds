from django.contrib import admin, messages

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


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "name_hi", "sort_order", "is_active"]
    list_editable = ["sort_order", "is_active"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name", "name_hi", "slug"]


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "stock_status", "is_active", "sort_order"]
    list_filter = ["category", "stock_status", "is_active"]
    search_fields = ["name", "name_hi"]
    list_editable = ["sort_order", "is_active", "stock_status"]
    inlines = [ProductImageInline]


@admin.register(ShopSettings)
class ShopSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not ShopSettings.objects.exists()

    fieldsets = (
        ("Contact", {"fields": ("phone_e164", "phone_display", "email", "address", "maps_url", "maps_embed_url")}),
        (
            "Reach notes",
            {
                "fields": (
                    ("metro_note", "metro_note_hi"),
                    ("bus_note", "bus_note_hi"),
                    ("parking_note", "parking_note_hi"),
                    ("contact_note", "contact_note_hi"),
                )
            },
        ),
        (
            "Shop hours (display + logic)",
            {
                "fields": (
                    ("weekday_label", "weekday_label_hi"),
                    "weekday_hours",
                    ("weekday_open_hour", "weekday_close_hour"),
                    ("sunday_label", "sunday_label_hi"),
                    "sunday_hours",
                    ("sunday_open_hour", "sunday_close_hour"),
                )
            },
        ),
        ("Trust stats", {"fields": ("stat_years", "stat_farmers", "stat_products", "stat_quality")}),
    )


@admin.register(AboutFeature)
class AboutFeatureAdmin(admin.ModelAdmin):
    list_display = ["title", "icon", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]


@admin.register(FAQItem)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]
    search_fields = ["question", "question_hi"]


@admin.register(FarmingTip)
class FarmingTipAdmin(admin.ModelAdmin):
    list_display = ["title", "season", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]


@admin.register(GovernmentScheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ["name", "icon", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["name", "location", "crop", "rating", "is_published", "sort_order"]
    list_editable = ["is_published", "sort_order", "rating"]


@admin.register(TestimonialSuggestion)
class TestimonialSuggestionAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "location",
        "farming_type",
        "rating",
        "status",
        "published_testimonial",
        "created_at",
    ]
    list_filter = ["status"]
    readonly_fields = ["created_at", "published_testimonial"]
    actions = ["approve_as_testimonial", "reject_suggestions"]

    @admin.action(description="Approve → publish as testimonial")
    def approve_as_testimonial(self, request, queryset):
        count = 0
        for suggestion in queryset.filter(status=TestimonialSuggestion.STATUS_PENDING):
            suggestion.status = TestimonialSuggestion.STATUS_APPROVED
            suggestion.save()
            count += 1
        self.message_user(request, f"{count} review(s) published.", messages.SUCCESS)

    @admin.action(description="Reject selected")
    def reject_suggestions(self, request, queryset):
        count = 0
        for suggestion in queryset.exclude(status=TestimonialSuggestion.STATUS_REJECTED):
            suggestion.status = TestimonialSuggestion.STATUS_REJECTED
            suggestion.save()
            count += 1
        self.message_user(request, f"{count} rejected.", messages.WARNING)


@admin.register(ShopGalleryImage)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["caption", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]


@admin.register(CropSeedRate)
class SeedRateAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "kg_per_acre", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(SowingCalendarEntry)
class SowingAdmin(admin.ModelAdmin):
    list_display = ["month_label", "season", "sort_order", "is_published"]
    list_editable = ["sort_order", "is_published"]


@admin.register(CropAdvisorRule)
class CropAdvisorAdmin(admin.ModelAdmin):
    list_display = ["season", "goal", "recommended_category"]


@admin.register(ServicePincode)
class PincodeAdmin(admin.ModelAdmin):
    list_display = ["pincode"]
    search_fields = ["pincode"]


@admin.register(NewsletterSubscription)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ["phone", "subscribed_at", "is_active"]
    list_filter = ["is_active"]
