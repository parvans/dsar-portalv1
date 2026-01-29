Got it 👍 — here’s a **very minimal, clean README** that reviewers love for machine tests.
No fluff, only **setup + run + test**.

You can **copy-paste this as your README.md**.

---

# **DSAR Portal – Setup**

## Prerequisites

* Node.js 18+
* PostgreSQL (Supabase or local)
* Stripe account (test mode)

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://...

NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 3. Database Setup

```bash
npx prisma db push
npx prisma db seed
```

**Seeded credentials**

* Admin: `admin@dsar.com / admin@123`
* Owner: `owner@dsar.com / owner@123`

---

## 4. Run the App

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 5. Stripe Webhook (Required for Subscriptions)

Login to Stripe CLI:

```bash
stripe login
```

Start webhook listener:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the generated `whsec_...` value into `.env`.

---

## 6. Test Subscription

* Login as Owner
* Go to Owner Dashboard
* Click **Subscribe**
* Use Stripe test card:

```
4242 4242 4242 4242
```

---

## 7. Public DSAR Page

After admin approval:

```
/c/[company-slug]
```

DSAR form is active only when subscription is active.

---

## Notes

* Public DSAR form is rate-limited
* Email notifications are logged to console
* Stripe runs in test mode

---

