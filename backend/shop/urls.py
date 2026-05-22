from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health),
    path("site/", views.SiteConfigView.as_view()),
    path("categories/", views.CategoryListView.as_view()),
    path("products/", views.ProductListView.as_view()),
    path("faq/", views.FAQListView.as_view()),
    path("tips/", views.TipsListView.as_view()),
    path("schemes/", views.SchemesListView.as_view()),
    path("testimonials/", views.TestimonialsListView.as_view()),
    path("testimonials/suggest/", views.TestimonialSuggestView.as_view()),
    path("gallery/", views.GalleryListView.as_view()),
    path("seed-rates/", views.SeedRatesListView.as_view()),
    path("sowing-calendar/", views.SowingListView.as_view()),
    path("crop-advisor/", views.CropAdvisorListView.as_view()),
    path("newsletter/", views.NewsletterSubscribeView.as_view()),
]
