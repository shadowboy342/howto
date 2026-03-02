# Middle East Live News Map (Arabic, RTL, Production-Oriented)

منصة أخبار تفاعلية تعتمد على خريطة حية للشرق الأوسط. كل خبر حديث يظهر كنقطة جغرافية (Marker) على الخريطة مع نافذة منبثقة تحتوي على:
- عنوان الخبر
- صورة مميزة (إن توفرت)
- ملخص
- تاريخ/وقت النشر
- المصدر
- رابط المقال الأصلي

## المعمارية

- **Frontend**: React + Vite + Leaflet (RTL + تصميم متجاوب + وضع ليلي)
- **Backend**: Node.js + Express + Cron + Caching
- **Database**: PostgreSQL مع Prisma
- **News APIs (حقيقية)**:
  - GDELT (يعمل بدون مفتاح غالبًا)
  - NewsAPI (اختياري بمفتاح)
  - GNews (اختياري بمفتاح)

## ميزات أساسية

- تمركز الخريطة وحدودها داخل الشرق الأوسط فقط.
- تحديث تلقائي للأخبار كل 10 دقائق (يمكن تخصيصه).
- فلترة حسب التصنيف/الدولة + بحث نصي.
- إزالة التكرار عبر `dedupHash` + `url` فريد.
- فلترة الأخبار الأحدث فقط (آخر 24–48 ساعة حسب الإعداد).
- واجهة عربية RTL بالكامل.
- صفحة تفاصيل خبر.
- لوحة إدارة بسيطة:
  - تحديث يدوي للأخبار
  - إحصائيات حسب التصنيف والدولة
- Fallback تلقائي عند فشل أي API مزود.

## تشغيل محلي سريع

## 1) المتطلبات
- Node.js 20+
- PostgreSQL 14+

## 2) إعداد الخلفية
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## 3) إعداد الواجهة
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

ثم افتح: `http://localhost:5173`

## Docker

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

## متغيرات البيئة

### backend/.env
- `DATABASE_URL` (إلزامي)
- `NEWS_API_KEY` (اختياري)
- `GNEWS_API_KEY` (اختياري)
- `ADMIN_TOKEN` (إلزامي للإدارة)
- `REFRESH_CRON` (مثال: `*/10 * * * *`)
- `NEWS_WINDOW_HOURS` (افتراضي: 48)

### frontend/.env
- `VITE_API_BASE_URL` (افتراضي: `http://localhost:4000/api`)

## النشر

### Vercel (Frontend)
- ارفع مجلد `frontend`
- عيّن `VITE_API_BASE_URL` إلى رابط الـ API المنشور

### Backend على VPS/Docker
- شغّل `backend` مع PostgreSQL
- فعّل `NODE_ENV=production`
- نفّذ `npx prisma migrate deploy`
- اضبط Reverse Proxy (Nginx) + HTTPS

## ملاحظات إنتاجية
- استخدم مفاتيح API حقيقية في `.env`.
- في حال غياب مفاتيح NewsAPI/GNews سيستمر النظام عبر GDELT كخيار بديل.
- يوصى بإضافة Rate Limiting وWAF عند النشر العام.
