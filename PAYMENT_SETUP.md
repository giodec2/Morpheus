# LemonSqueezy Payment System — Deployment Guide

> **For Appwrite Free Plan (2 functions max):** We merged checkout + webhook into ONE function (`lemonsqueezy-handler`). Your 2 functions will be:
> 1. `hosted-ai-proxy` (existing, with token reset fix)
> 2. `lemonsqueezy-handler` (NEW — handles checkout creation AND webhooks)

---

## 📋 Your Known Values

| Setting | Value |
|---------|-------|
| **Store ID** | `YOUR_LEMONSQUEEZY_STORE_ID` |
| **Scribe Variant ID** | `YOUR_SCRIBE_VARIANT_ID` |
| **Novelist Variant ID** | `YOUR_NOVELIST_VARIANT_ID` |
| **Architect Variant ID** | `YOUR_ARCHITECT_VARIANT_ID` |
| **Appwrite Endpoint** | `https://cloud.appwrite.io/v1` |
| **Appwrite Project ID** | `YOUR_APPWRITE_PROJECT_ID` |
| **Appwrite Database ID** | `YOUR_APPWRITE_DATABASE_ID` |
| **Profiles Collection** | `profiles` |

---

## Step 1: Update Vercel Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**.

Add these 4 variables:

```
VITE_LEMONSQUEEZY_VARIANT_SCRIBE = YOUR_SCRIBE_VARIANT_ID
VITE_LEMONSQUEEZY_VARIANT_NOVELIST = YOUR_NOVELIST_VARIANT_ID
VITE_LEMONSQUEEZY_VARIANT_ARCHITECT = YOUR_ARCHITECT_VARIANT_ID
VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID = (leave empty for now — fill in after Step 3)
```

Then click **Redeploy**.

---

## Step 2: Deploy Appwrite Functions

You have a **2-function limit** on Appwrite Free. We use exactly 2:

| # | Function | Purpose |
|---|----------|---------|
| 1 | `hosted-ai-proxy` | AI inference proxy (existing, needs update) |
| 2 | `lemonsqueezy-handler` | **Checkout creation + Webhook receiver** (merged into one!) |

### 2A — Install Dependencies

Run in your terminal:

```bash
cd /home/giodec/progetto_gay/Morpheus

# lemonsqueezy-handler (checkout + webhook merged)
cd appwrite-functions/lemonsqueezy-handler
npm install
cd ../..

# hosted-ai-proxy (updated with weekly token reset)
cd appwrite-functions/hosted-ai-proxy
npm install
cd ../..
```

### 2B — Upload to Appwrite Console

**Function 1: Update `hosted-ai-proxy`**
1. Go to **Appwrite Console → Functions → hosted-ai-proxy**
2. Click **Deploy** or create a new deployment
3. Upload the `appwrite-functions/hosted-ai-proxy/` folder
4. Entrypoint: `src/main.js`

**Function 2: Create `lemonsqueezy-handler`**
1. Go to **Appwrite Console → Functions → Create Function**
2. Name: `lemonsqueezy-handler`
3. Runtime: **Node.js 20**
4. Upload the `appwrite-functions/lemonsqueezy-handler/` folder
5. Entrypoint: `src/main.js`
6. Click **Create**

---

## Step 3: Set Function Environment Variables

### Function: `lemonsqueezy-handler`

Go to **Appwrite Console → Functions → lemonsqueezy-handler → Settings → Variables**.

Add ALL of these:

| Variable | Value |
|----------|-------|
| `APPWRITE_FUNCTION_API_ENDPOINT` | `https://cloud.appwrite.io/v1` |
| `APPWRITE_FUNCTION_PROJECT_ID` | `YOUR_APPWRITE_PROJECT_ID` |
| `APPWRITE_API_KEY` | *(your Appwrite API key)* |
| `APPWRITE_DATABASE_ID` | `YOUR_APPWRITE_DATABASE_ID` |
| `APPWRITE_COLLECTION_PROFILES` | `profiles` |
| `LEMONSQUEEZY_API_KEY` | `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJkNDZhNTA0ZTU4ZTcyZjY3NzlmMDY4Y2Q1MTgyZTEwMTczNmMxYTdjOWI0MTQwZWIzNzMzZmEzNTQwYmUzMTcwZDkwYmYyY2M3MzY0N2Q5NyIsImlhdCI6MTc3OTc0MTQ2OS45OTk4NTksIm5iZiI6MTc3OTc0MTQ2OS45OTk4NjEsImV4cCI6MTc5NTU2NDgwMC4wMzA4MDYsInN1YiI6IjcxOTI5NDIiLCJzY29wZXMiOltdfQ.SZrvgxXWelYM3N0Bb7DTCjY7e7nRQN4IWCEQ3s6W37kygIMtotn5fOeqHlTfbBqDr99AJedexKRddMoo_WOtbY1Do5ESt4MxgqFpHiK8-W1fCC-Oy3PvC6vypkukntwwR4LZIKA1qik8Y3QAzRTR803DR9phnsEN4_GbD-EVEo89vAmzy1i8GSaSkPKn7t7i4b9IpUTDSMPV5WD3owob9Xy0Bf2bejlJn0AaBLvnUq2WNhAnc_m9oMyjUZb31KZqyKoPriiFk85wb52jrgMjaViW5LrumYaoWLYvGBBa6Dv6M02kjPDMb4G6khEmPTkOwnW4z0Ae11Vpk1_kLBDmJh_JmfNgGkI--FAiMCEIs_XRLIp2Fp0MRonZSs-qhIMvYMlFzYh6ZMkRnbA6uHAyBWHqFVW0Z3XgeVs5LttZHWcqJ9jwldaa4cGU9PLh307Ao6MAWjyzIm3FQBsv0xt0m8oZRP2ZUm_zkeyUjbjo0OzkXN5w0eZYh8jXMCBB9rjfIJP1Z6EPgzf4QAdlRazt8_WF9_9xuH1kTpmW0-tZ6sUq7oUIumt9_DSMMy48YCVBQR-nzWQhP__JnamXGPm4aY7D0t4kLyjCjlxijnUNfErsSN1aVjgu7u-n5RxKgk6DBz1Im8QDvO3r74Doug6fpQSYhPKU6IKaWCHyroi-FWw` |
| `LEMONSQUEEZY_STORE_ID` | `YOUR_LEMONSQUEEZY_STORE_ID` |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | *(leave empty for now — fill in after Step 5)* |
| `LEMONSQUEEZY_VARIANT_SCRIBE` | `YOUR_SCRIBE_VARIANT_ID` |
| `LEMONSQUEEZY_VARIANT_NOVELIST` | `YOUR_NOVELIST_VARIANT_ID` |
| `LEMONSQUEEZY_VARIANT_ARCHITECT` | `YOUR_ARCHITECT_VARIANT_ID` |

---

## Step 4: Get Your Function URLs

After deploying `lemonsqueezy-handler`, go to **Appwrite Console → Functions → lemonsqueezy-handler → Domains**.

You will see a domain like:
```
https://abc123def456.appwrite.global
```

Your **webhook URL** is:
```
https://abc123def456.appwrite.global/v1/functions/lemonsqueezy-handler/executions
```

**Copy this URL.** You need it for Step 5.

Also, go to **Functions → lemonsqueezy-handler** and copy its **Function ID** (looks like `65abc...`). You need this for Step 6.

---

## Step 5: Configure LemonSqueezy Webhook

1. Go to **LemonSqueezy Dashboard → Settings → Webhooks**
2. Make sure you're in **Test Mode** (toggle at top)
3. Click **Add Webhook**
4. **URL**: Paste the webhook URL from Step 4
5. **Events**: Select these 4:
   - ✅ `subscription_created`
   - ✅ `subscription_updated`
   - ✅ `subscription_cancelled`
   - ✅ `subscription_expired`
6. Click **Save**
7. **Copy the Signing Secret** (shown after saving)

### Paste the Signing Secret into Appwrite

Go back to **Appwrite Console → Functions → lemonsqueezy-handler → Settings → Variables**.

Update:
```
LEMONSQUEEZY_WEBHOOK_SECRET = (paste the signing secret here)
```

---

## Step 6: Finalize Vercel

Go back to **Vercel → Your Project → Settings → Environment Variables**.

Find `VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID` and set it to the Function ID you copied in Step 4.

Then **Redeploy Vercel**.

---

## Step 7: Test!

1. Go to `https://morpheusink.com`
2. Sign up / Log in
3. Click **"Start Free Trial"** on the Scribe plan
4. LemonSqueezy checkout overlay should open
5. Use test card:
   - Number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/30`)
   - CVC: Any 3 digits (e.g., `123`)
6. Complete payment
7. You should be redirected to `/app?checkout=success`
8. A toast should say: *"Your subscription is being activated!"*
9. Your tier badge should change from **"free"** to **"scribe"**

### Test Cancellation
1. Go to your **LemonSqueezy Test Dashboard → Subscriptions**
2. Find the test subscription
3. Click **Cancel**
4. The webhook should fire and update your profile to `subscriptionStatus: "cancelled"`

---

## 🚨 Troubleshooting

### "Payment system is not configured yet" error
- Check that `VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID` is set in Vercel
- Check that all 3 `VITE_LEMONSQUEEZY_VARIANT_*` IDs are set in Vercel
- Redeploy Vercel after changing env vars

### Webhook not firing
- Make sure the webhook URL is correct and publicly accessible
- Check Appwrite function logs: **Console → Functions → lemonsqueezy-handler → Logs**
- Check LemonSqueezy webhook logs: **Dashboard → Settings → Webhooks → Your webhook**

### Checkout overlay not opening
- Check browser console for errors
- Make sure `lemon.js` loaded (check Network tab for `https://app.lemonsqueezy.com/js/lemon.js`)
- Fallback: checkout opens in new tab

---

## 📦 Files Created/Modified

| File | Purpose |
|------|---------|
| `appwrite-functions/lemonsqueezy-handler/` | **Checkout + Webhook in ONE function** |
| `appwrite-functions/create-checkout/` | Separate checkout function (not needed, kept for reference) |
| `appwrite-functions/lemonsqueezy-webhook/` | Separate webhook function (not needed, kept for reference) |
| `src/services/billing.ts` | Frontend billing API |
| `src/hooks/useLemonSqueezy.ts` | Lemon.js loader + overlay opener |
| `src/stores/authStore.ts` | Extended UserProfile type |
| `src/services/auth.ts` | Subscription-aware tier normalization + token reset |
| `src/components/Landing/PricingSection.tsx` | Live checkout buttons |
| `src/components/common/UpgradeModal.tsx` | Live checkout on upgrade |
| `src/components/common/TierSelectorModal.tsx` | Live checkout on tier select |
| `src/components/Dashboard/DashboardPage.tsx` | Success/cancel handling + status UI |
| `index.html` | Loads Lemon.js |
| `.env.example` | Documents all env vars |
