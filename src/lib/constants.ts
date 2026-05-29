/**
 * Application-wide constants to replace magic numbers.
 */

// Auto-save debounce delay (ms)
export const AUTO_SAVE_DEBOUNCE_MS = 2000;

// Chat input limits
export const CHAT_INPUT_MAX_LENGTH = 4000;
export const CHAT_INPUT_WARNING_THRESHOLD = 3500;

// Chat history
export const CHAT_HISTORY_MAX_MESSAGES = 10;

// Streaming simulation delay (ms per character)
export const STREAMING_MIN_DELAY_MS = 5;
export const STREAMING_MAX_DELAY_MS = 30;
export const STREAMING_DELAY_THRESHOLD_CHARS = 100;

// Token budget
export const TOKEN_BUDGET_HISTORY_RATIO = 0.1;
export const TOKEN_BUDGET_CONTEXT_TARGET_RATIO = 0.85;
export const TOKEN_BUDGET_CURRENT_CHAPTER_RATIO = 0.9;

// Character relevance scoring
export const SCORE_PINNED = 100;
export const SCORE_TAGGED = 50;
export const SCORE_NAME_IN_CHAPTER = 30;
export const SCORE_NAME_IN_MESSAGE = 20;

// Sync / time constants
export const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Toast
export const MAX_VISIBLE_TOASTS = 5;
export const TOAST_DURATION_MS = 3000;

// BYOK / Hosted timeouts
export const BYOK_TIMEOUT_MS = 30000;
export const HOSTED_TIMEOUT_MS = 30000;
