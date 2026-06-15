# i18n Guide for Subagents

## How to translate a component

1. Import the hook:
   ```tsx
   import { useI18n } from '@/i18n/useI18n';
   ```

2. Use it inside the component:
   ```tsx
   const { t } = useI18n();
   ```

3. Replace hard-coded user-facing strings with `t('key')` or `t('key', { var: 'value' })`.
   Interpolation tokens in dictionary strings look like `{{var}}`.

## Dictionary files

- `src/i18n/common.ts` — common actions, states, auth, errors, time, footer
- `src/i18n/landing.ts` — landing page marketing copy
- `src/i18n/app.ts` — app layout, dashboard strings
- `src/i18n/settings.ts` — settings modal, export/import, upgrade, limit modals
- `src/i18n/legal.ts` — static pages (FAQ, contact, legal)
- `src/i18n/chat.ts` — chat components

When translating, add new keys to the appropriate file under BOTH `en` and `it` sections.
Keep translations natural and context-appropriate (not word-for-word).

## Important rules

- Do NOT translate code comments, console logs, or internal-only error messages.
- Do NOT change component logic — only replace strings.
- For dynamic values (names, counts, prices), use interpolation tokens `{{var}}`.
- Reuse existing keys when the same string already exists.
- After editing, run `npx tsc -b --noEmit` inside the project root to catch TypeScript errors.
