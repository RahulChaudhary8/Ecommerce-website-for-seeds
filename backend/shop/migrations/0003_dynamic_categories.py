import django.db.models.deletion
from django.db import migrations, models


DEFAULT_CATEGORIES = [
    ("seeds", "Seeds", "बीज"),
    ("fertilizer", "Fertilizers", "उर्वरक"),
    ("pesticides", "Pesticides", "कीटनाशक"),
    ("tools", "Farming Tools", "कृषि औजार"),
    ("organic", "Organic Products", "जैविक उत्पाद"),
    ("animal_feed", "Animal Feed", "पशु आहार"),
    ("irrigation", "Irrigation", "सिंचाई"),
]


def seed_categories(apps, schema_editor):
    Category = apps.get_model("shop", "Category")
    for i, (slug, name, name_hi) in enumerate(DEFAULT_CATEGORIES):
        Category.objects.get_or_create(
            slug=slug,
            defaults={"name": name, "name_hi": name_hi, "sort_order": i, "is_active": True},
        )


def link_products_and_rules(apps, schema_editor):
    Category = apps.get_model("shop", "Category")
    Product = apps.get_model("shop", "Product")
    CropAdvisorRule = apps.get_model("shop", "CropAdvisorRule")

    by_slug = {c.slug: c for c in Category.objects.all()}

    for product in Product.objects.all():
        slug = product.category_old
        category = by_slug.get(slug)
        if category:
            product.category = category
            product.save(update_fields=["category"])

    for rule in CropAdvisorRule.objects.all():
        slug = rule.recommended_category_old
        category = by_slug.get(slug)
        if category:
            rule.recommended_category = category
            rule.save(update_fields=["recommended_category"])


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0002_testimonial_suggestion_link"),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(max_length=32, unique=True)),
                ("name", models.CharField(max_length=128)),
                ("name_hi", models.CharField(max_length=128)),
                ("sort_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name_plural": "categories",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.RunPython(seed_categories, migrations.RunPython.noop),
        migrations.RenameField(
            model_name="product",
            old_name="category",
            new_name="category_old",
        ),
        migrations.AddField(
            model_name="product",
            name="category",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="products",
                to="shop.category",
            ),
        ),
        migrations.RenameField(
            model_name="cropadvisorrule",
            old_name="recommended_category",
            new_name="recommended_category_old",
        ),
        migrations.AddField(
            model_name="cropadvisorrule",
            name="recommended_category",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="advisor_rules",
                to="shop.category",
            ),
        ),
        migrations.RunPython(link_products_and_rules, migrations.RunPython.noop),
        migrations.RemoveField(
            model_name="product",
            name="category_old",
        ),
        migrations.RemoveField(
            model_name="cropadvisorrule",
            name="recommended_category_old",
        ),
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="products",
                to="shop.category",
            ),
        ),
        migrations.AlterField(
            model_name="cropadvisorrule",
            name="recommended_category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="advisor_rules",
                to="shop.category",
            ),
        ),
    ]
