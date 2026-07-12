# Appwrite Setup Guide for Morpheus

This guide explains how to configure your own Appwrite backend for Morpheus.

## 1. Enable Authentication

1. In your Appwrite project, go to **Auth → Settings**.
2. Enable the **Email/Password** provider.
3. (Optional) Configure email verification settings.

## 2. Create a Database

1. Go to **Databases**.
2. Click **Create database**.
3. Name it (e.g., `morpheus`).
4. Copy the Database ID — you will need it for your `.env` file.

## 3. Create Collections

Create these **5 collections** inside your database.

For each collection:
- Enable **Document Security** (so the app can set per-document permissions).
- Under **Permissions**, add: `create("users")`, `read("users")`, `update("users")`, `delete("users")`.
- The app automatically assigns each document to its owner on creation.

> **Note on types:** Appwrite deprecated the old `string` type. Use the new types below.
> - **Varchar** = short strings with a max length (IDs, titles, names, emails)
> - **Text** = longer content up to ~65KB (summaries, descriptions, notes)
> - **Longtext** = very large content up to 4GB (chapter content JSON)

### Collection: `books`

| Column      | Type      | Size / Default | Required |
|-------------|-----------|----------------|----------|
| userId      | Varchar   | 64             | yes      |
| title       | Varchar   | 255            | yes      |
| createdAt   | Integer   | —              | yes      |
| updatedAt   | Integer   | —              | yes      |

### Collection: `chapters`

| Column             | Type      | Size / Default | Required |
|--------------------|-----------|----------------|----------|
| userId             | Varchar   | 64             | yes      |
| bookId             | Varchar   | 64             | yes      |
| title              | Varchar   | 255            | yes      |
| order              | Integer   | —              | yes      |
| content            | Longtext  | —              | yes      |
| summary            | Text      | —              | no       |
| summaryPreparedAt  | Integer   | —              | no       |
| taggedCharacterIds | Text      | —              | no       |
| createdAt          | Integer   | —              | yes      |
| updatedAt          | Integer   | —              | yes      |

> `content` stores TipTap JSON (can get large — use **Longtext**).
> `taggedCharacterIds` stores a JSON array string.

### Collection: `characters`

| Column      | Type      | Size / Default | Required |
|-------------|-----------|----------------|----------|
| userId      | Varchar   | 64             | yes      |
| bookId      | Varchar   | 64             | yes      |
| name        | Varchar   | 255            | yes      |
| appearance  | Text      | —              | no       |
| personality | Text      | —              | no       |
| notes       | Text      | —              | no       |
| isPinned    | Boolean   | false          | yes      |
| relations   | Text      | —              | no       |
| updatedAt   | Integer   | —              | yes      |

> `relations` stores a JSON array string.

### Collection: `lore_bibles`

| Column    | Type      | Size / Default | Required |
|-----------|-----------|----------------|----------|
| userId    | Varchar   | 64             | yes      |
| bookId    | Varchar   | 64             | yes      |
| content   | Longtext  | —              | yes      |
| updatedAt | Integer   | —              | yes      |

> `content` stores TipTap JSON (use **Longtext**).

### Collection: `profiles`

| Column                  | Type      | Size / Default | Required |
|-------------------------|-----------|----------------|----------|
| email                   | Varchar   | 255            | yes      |
| name                    | Varchar   | 255            | yes      |
| subscriptionTier        | Varchar   | 32             | yes      |
| subscriptionStatus      | Varchar   | 32             | no       |
| subscriptionId          | Varchar   | 255            | no       |
| subscriptionRenewsAt    | Integer   | —              | no       |
| subscriptionEndsAt      | Integer   | —              | no       |
| lemonSqueezyCustomerId  | Varchar   | 255            | no       |
| lemonSqueezyVariantId   | Varchar   | 255            | no       |
| customerPortalUrl       | Varchar   | 500            | no       |
| trialEndsAt             | Integer   | —              | no       |
| weeklyTokensUsed        | Integer   | 0              | yes      |
| weeklyTokensUsedPremium | Integer   | 0              | yes      |
| weeklyTokensResetAt     | Integer   | —              | yes      |
| maxBooks                | Integer   | —              | yes      |
| maxWeeklyTokensStandard | Integer   | —              | yes      |
| maxWeeklyTokensPremium  | Integer   | —              | yes      |

For `profiles`, the document ID is set to match the user's Appwrite ID automatically by the app.

**Default tier values** (the app creates these automatically for new users):

| Tier       | subscriptionTier | maxBooks | maxWeeklyTokensStandard | maxWeeklyTokensPremium |
|------------|------------------|----------|------------------------|------------------------|
| Free       | `free`           | 1        | 50,000                 | 0                      |
| Scribe     | `scribe`         | 3        | 500,000                | 0                      |
| Novelist   | `novelist`       | 10       | 1,000,000              | 50,000                 |
| Architect  | `architect`      | ∞        | 5,000,000              | 500,000                |
| Maestro    | `maestro`        | ∞        | 250,000                | 0                      |

## 4. Add Your Platform

1. Go to **Overview → Platforms** (or **Add Platform**).
2. Click **Web App**.
3. Add a name (e.g., `Morpheus Local`) and your URL:
   - Local dev: `http://localhost:5173`
   - Production: your actual domain
4. Click **Next** and finish.

> **CORS errors?** This step is what prevents them. Make sure both localhost and your production domain are added.

## 5. Environment File

Create a `.env` in the project root and fill in your own values from the Appwrite Console:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_BOOKS=books
VITE_APPWRITE_COLLECTION_CHAPTERS=chapters
VITE_APPWRITE_COLLECTION_CHARACTERS=characters
VITE_APPWRITE_COLLECTION_LORE_BIBLES=lore_bibles
VITE_APPWRITE_COLLECTION_PROFILES=profiles
```

Remember to restart the dev server after creating or editing `.env`.

## How Sync Works

- **Local-first**: Dexie remains the primary database. Everything works offline.
- **Auto-push**: When you create/update/delete a book, chapter, character, or lore bible, the app mirrors the change to Appwrite in the background.
- **Pull on login**: When you sign in, the app fetches your cloud data and merges it with local data. The newer `updatedAt` timestamp wins.
- **Chat history is NOT synced**.
