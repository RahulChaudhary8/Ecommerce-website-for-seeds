# AgroSeeds Django Backend

SQLite database + Django Admin to manage all website content.

## Setup

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver
```

Admin panel: **http://127.0.0.1:8000/admin/**

API base: **http://127.0.0.1:8000/api/**

## What admin can manage

| Model | Purpose |
|-------|---------|
| **Shop settings** | Phone, email, address, maps, shop hours (display + open/close hours), trust stats |
| **About features** | “Why choose us” cards (3+) |
| **Categories** | Product filter tabs (slug, English + Hindi name, sort order, active) |
| **Products** | Name, price, description, stock, category, image upload or URL, extra gallery images |
| **FAQ** | Questions/answers EN + HI |
| **Farming tips** | Full tips content |
| **Government schemes** | PM-KISAN etc. — add unlimited schemes |
| **Testimonials** | Published farmer reviews |
| **Testimonial suggestions** | Farmer-submitted reviews → **Approve** action publishes to site |
| **Shop gallery** | “Visit our store” carousel images |
| **Crop seed rates** | Seed calculator crops |
| **Sowing calendar** | Month/season/crops (JSON lists) |
| **Crop advisor rules** | Season × goal → product category |
| **Service pincodes** | Delhi NCR pincode check |
| **Newsletter subscriptions** | Phones from offer form |

## Testimonial workflow

1. Farmer submits form on website → **Testimonial suggestions** (pending)
2. In admin, select rows → action **“Approve → publish as testimonial”**
3. Review appears under **Testimonials** on the site

## Images

- Upload **Image** on Product / Gallery / Testimonial, or paste **Image URL**
- Uploaded files are served at `/media/...`

## Frontend

From project root:

```bash
npm run dev
```

Vite proxies `/api` and `/media` to Django. Start **both** servers.

Production: set `VITE_API_URL=https://your-domain.com/api`

## API endpoints

- `GET /api/site/` — settings, about, pincodes
- `GET /api/categories/` — active product categories (EN + HI labels)
- `GET /api/products/`
- `GET /api/faq/`
- `GET /api/tips/`
- `GET /api/schemes/`
- `GET /api/testimonials/`
- `POST /api/testimonials/suggest/`
- `GET /api/gallery/`
- `GET /api/seed-rates/`
- `GET /api/sowing-calendar/`
- `GET /api/crop-advisor/`
- `POST /api/newsletter/`
