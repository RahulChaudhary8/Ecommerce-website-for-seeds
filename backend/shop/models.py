from django.db import models


class StockStatus(models.TextChoices):
    IN_STOCK = "in_stock", "In Stock"
    LOW_STOCK = "low_stock", "Low Stock"
    OUT_OF_STOCK = "out_of_stock", "Out of Stock"
    COMING_SOON = "coming_soon", "Coming Soon"


class AdvisorSeason(models.TextChoices):
    KHARIF = "kharif", "Kharif (Monsoon)"
    RABI = "rabi", "Rabi (Winter)"
    ZAID = "zaid", "Zaid (Summer)"


class AdvisorGoal(models.TextChoices):
    VEGETABLES = "vegetables", "Vegetables"
    GRAINS = "grains", "Grains"
    ORGANIC = "organic", "Organic farming"


class ShopSettings(models.Model):
    phone_e164 = models.CharField(max_length=20, default="918318576674")
    phone_display = models.CharField(max_length=32, default="+91 8318576674")
    email = models.EmailField(default="info@agroseeds.com")
    address = models.TextField(default="123 Agriculture Market, Delhi - 110001, India")
    maps_url = models.URLField(max_length=500, blank=True)
    maps_embed_url = models.URLField(max_length=1000, blank=True)
    metro_note = models.CharField(max_length=255, blank=True)
    metro_note_hi = models.CharField(max_length=255, blank=True)
    bus_note = models.CharField(max_length=255, blank=True)
    bus_note_hi = models.CharField(max_length=255, blank=True)
    parking_note = models.CharField(max_length=255, blank=True)
    parking_note_hi = models.CharField(max_length=255, blank=True)
    contact_note = models.TextField(blank=True)
    contact_note_hi = models.TextField(blank=True)
    weekday_label = models.CharField(max_length=64, default="Monday - Saturday")
    weekday_label_hi = models.CharField(max_length=64, default="सोमवार - शनिवार")
    sunday_label = models.CharField(max_length=64, default="Sunday")
    sunday_label_hi = models.CharField(max_length=64, default="रविवार")
    weekday_hours = models.CharField(max_length=32, default="9:00 AM - 7:00 PM")
    sunday_hours = models.CharField(max_length=32, default="10:00 AM - 5:00 PM")
    weekday_open_hour = models.PositiveSmallIntegerField(default=9)
    weekday_close_hour = models.PositiveSmallIntegerField(default=19)
    sunday_open_hour = models.PositiveSmallIntegerField(default=10)
    sunday_close_hour = models.PositiveSmallIntegerField(default=17)
    stat_years = models.CharField(max_length=16, default="15+")
    stat_farmers = models.CharField(max_length=16, default="5000+")
    stat_products = models.CharField(max_length=16, default="20+")
    stat_quality = models.CharField(max_length=16, default="100%")

    class Meta:
        verbose_name = "Shop settings"
        verbose_name_plural = "Shop settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return "Shop settings"


class AboutFeature(models.Model):
    ICON_CHOICES = [
        ("leaf", "Leaf / Organic"),
        ("quality", "Quality check"),
        ("visit", "Visit shop"),
    ]
    title = models.CharField(max_length=128)
    title_hi = models.CharField(max_length=128)
    description = models.TextField()
    description_hi = models.TextField()
    icon = models.CharField(max_length=16, choices=ICON_CHOICES, default="leaf")
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(max_length=32, unique=True)
    name = models.CharField(max_length=128)
    name_hi = models.CharField(max_length=128)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    name_hi = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=64)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    description = models.TextField()
    description_hi = models.TextField()
    stock_status = models.CharField(max_length=20, choices=StockStatus.choices, default=StockStatus.IN_STOCK)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="extra_images")
    image = models.ImageField(upload_to="products/extra/")
    image_url = models.URLField(max_length=500, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]


class FAQItem(models.Model):
    question = models.CharField(max_length=500)
    question_hi = models.CharField(max_length=500)
    answer = models.TextField()
    answer_hi = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "FAQ"

    def __str__(self):
        return self.question[:60]


class FarmingTip(models.Model):
    title = models.CharField(max_length=255)
    title_hi = models.CharField(max_length=255)
    excerpt = models.TextField()
    excerpt_hi = models.TextField()
    content = models.TextField()
    content_hi = models.TextField()
    season = models.CharField(max_length=64)
    season_hi = models.CharField(max_length=64)
    icon = models.CharField(max_length=16, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title


class GovernmentScheme(models.Model):
    name = models.CharField(max_length=255)
    name_hi = models.CharField(max_length=255)
    description = models.TextField()
    description_hi = models.TextField()
    benefit = models.TextField()
    benefit_hi = models.TextField()
    link = models.URLField(max_length=500)
    icon = models.CharField(max_length=16, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Government scheme"

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    name = models.CharField(max_length=128)
    name_hi = models.CharField(max_length=128, blank=True)
    location = models.CharField(max_length=128)
    location_hi = models.CharField(max_length=128, blank=True)
    text = models.TextField()
    text_hi = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    crop = models.CharField(max_length=128, help_text="Farming type e.g. Wheat Farmer")
    crop_hi = models.CharField(max_length=128, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.name


class TestimonialSuggestion(models.Model):
    STATUS_PENDING = "pending"
    STATUS_APPROVED = "approved"
    STATUS_REJECTED = "rejected"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending review"),
        (STATUS_APPROVED, "Approved"),
        (STATUS_REJECTED, "Rejected"),
    ]
    name = models.CharField(max_length=128)
    location = models.CharField(max_length=128)
    farming_type = models.CharField(max_length=128)
    rating = models.PositiveSmallIntegerField(default=5)
    description = models.TextField()
    phone = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_PENDING)
    published_testimonial = models.OneToOneField(
        Testimonial,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="source_suggestion",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    admin_notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.status})"

    def _testimonial_fields(self):
        return {
            "name": self.name,
            "name_hi": self.name,
            "location": self.location,
            "location_hi": self.location,
            "text": self.description,
            "text_hi": self.description,
            "rating": self.rating,
            "crop": self.farming_type,
            "crop_hi": self.farming_type,
        }

    def sync_published_testimonial(self):
        """Keep linked Testimonial in sync with suggestion status."""
        if self.status == self.STATUS_APPROVED:
            fields = self._testimonial_fields()
            if self.published_testimonial_id:
                testimonial = self.published_testimonial
                for key, value in fields.items():
                    setattr(testimonial, key, value)
                testimonial.is_published = True
                testimonial.save()
            else:
                testimonial = Testimonial.objects.create(
                    **fields,
                    sort_order=Testimonial.objects.count() + 1,
                    is_published=True,
                )
                TestimonialSuggestion.objects.filter(pk=self.pk).update(
                    published_testimonial=testimonial
                )
                self.published_testimonial = testimonial
        elif self.published_testimonial_id:
            testimonial = self.published_testimonial
            if testimonial.is_published:
                testimonial.is_published = False
                testimonial.save(update_fields=["is_published"])

    def save(self, *args, **kwargs):
        old_status = None
        if self.pk:
            old_status = (
                TestimonialSuggestion.objects.filter(pk=self.pk)
                .values_list("status", flat=True)
                .first()
            )
        super().save(*args, **kwargs)
        if old_status != self.status or (
            self.status == self.STATUS_APPROVED and not self.published_testimonial_id
        ):
            self.sync_published_testimonial()


class ShopGalleryImage(models.Model):
    image = models.ImageField(upload_to="gallery/", blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    caption = models.CharField(max_length=255)
    caption_hi = models.CharField(max_length=255)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Shop gallery image"

    def __str__(self):
        return self.caption[:50]


class CropSeedRate(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=128)
    name_hi = models.CharField(max_length=128)
    kg_per_acre = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=32, default="kg/acre")
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.name


class SowingCalendarEntry(models.Model):
    month_label = models.CharField(max_length=64)
    month_label_hi = models.CharField(max_length=64)
    season = models.CharField(max_length=64)
    season_hi = models.CharField(max_length=64)
    crops_en = models.JSONField(default=list, help_text='["Wheat", "Mustard"]')
    crops_hi = models.JSONField(default=list)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order"]
        verbose_name = "Sowing calendar entry"

    def __str__(self):
        return self.month_label


class CropAdvisorRule(models.Model):
    season = models.CharField(max_length=16, choices=AdvisorSeason.choices)
    goal = models.CharField(max_length=16, choices=AdvisorGoal.choices)
    recommended_category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="advisor_rules"
    )

    class Meta:
        unique_together = [("season", "goal")]
        verbose_name = "Crop advisor rule"

    def __str__(self):
        return f"{self.season} + {self.goal} → {self.recommended_category.slug}"


class ServicePincode(models.Model):
    pincode = models.CharField(max_length=6, unique=True, db_index=True)

    class Meta:
        ordering = ["pincode"]

    def __str__(self):
        return self.pincode


class NewsletterSubscription(models.Model):
    phone = models.CharField(max_length=20, unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.phone
