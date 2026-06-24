# Payment Setup

## 1. Get Credentials from LemonSqueezy Dashboard

| Credential | Where to find it |
|------------|-----------------|
| **API Key** | [app.lemonsqueezy.com/settings/api](https://app.lemonsqueezy.com/settings/api) → Create API Key |
| **Store ID** | [app.lemonsqueezy.com/settings/stores](https://app.lemonsqueezy.com/settings/stores) |
| **Webhook Secret** | [app.lemonsqueezy.com/settings/webhooks](https://app.lemonsqueezy.com/settings/webhooks) → Signing Secret |
| **Variant IDs** | Product page → Variants tab |

## 2. Appwrite Function Environment Variables

Go to **Appwrite Console** → your project → **Functions** → `lemonsqueezy-handler` → **Settings** → **Variables**

```
APPWRITE_FUNCTION_API_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_FUNCTION_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_appwrite_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_PROFILES=profiles
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
LEMONSQUEEZY_STORE_ID=your_store_id
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
# Monthly variants
LEMONSQUEEZY_VARIANT_SCRIBE=your_scribe_monthly_variant_id
LEMONSQUEEZY_VARIANT_NOVELIST=your_novelist_monthly_variant_id
LEMONSQUEEZY_VARIANT_ARCHITECT=your_architect_monthly_variant_id
# Annual variants
LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL=your_scribe_annual_variant_id
LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL=your_novelist_annual_variant_id
LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL=your_architect_annual_variant_id
CHECKOUT_SUCCESS_URL=https://your-domain.com/app?checkout=success
```

## 3. Frontend Environment Variables

In your local `.env` file:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_BOOKS=books
VITE_APPWRITE_COLLECTION_CHAPTERS=chapters
VITE_APPWRITE_COLLECTION_CHARACTERS=characters
VITE_APPWRITE_COLLECTION_LORE_BIBLES=lore_bibles
VITE_APPWRITE_COLLECTION_PROFILES=profiles
VITE_APPWRITE_FUNCTION_ID=your_function_id
VITE_LEMONSQUEEZY_VARIANT_SCRIBE=your_scribe_monthly_variant_id
VITE_LEMONSQUEEZY_VARIANT_NOVELIST=your_novelist_monthly_variant_id
VITE_LEMONSQUEEZY_VARIANT_ARCHITECT=your_architect_monthly_variant_id
VITE_LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL=your_scribe_annual_variant_id
VITE_LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL=your_novelist_annual_variant_id
VITE_LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL=your_architect_annual_variant_id
```

## 4. Webhook URL

In LemonSqueezy Dashboard → Webhooks, set the URL to:

```
https://cloud.appwrite.io/v1/functions/lemonsqueezy-handler/executions
```

Subscribe to these events:
- `subscription_created`
- `subscription_updated`
- `subscription_cancelled`
- `subscription_expired`
- `subscription_paused`
- `subscription_resumed`
- `subscription_unpaused`
- `subscription_payment_success`
- `subscription_payment_failed`
- `subscription_payment_recovered`

## 5. Important Notes

- **Never commit API keys to git**. Use Appwrite function env vars for backend secrets, `.env` for frontend config (which is already in `.gitignore`).
- If you rotate your LemonSqueezy API key, update it in **both** the Appwrite function env vars and the webhook secret.
- The `CHECKOUT_SUCCESS_URL` can be changed to any URL — users land there after completing payment.
