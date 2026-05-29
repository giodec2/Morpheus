import { describe, it, expect } from 'vitest';
import { generateId, formatRelativeTime } from './utils';

describe('generateId', () => {
  it('returns a valid UUID-like string', () => {
    const id = generateId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('returns unique values on multiple calls', () => {
    const ids = new Set(Array.from({ length: 100 }, generateId));
    expect(ids.size).toBe(100);
  });
});

describe('formatRelativeTime', () => {
  it('returns "just now" for recent timestamps', () => {
    expect(formatRelativeTime(Date.now())).toBe('just now');
    expect(formatRelativeTime(Date.now() - 30 * 1000)).toBe('just now');
  });

  it('returns minutes for timestamps within an hour', () => {
    expect(formatRelativeTime(Date.now() - 5 * 60 * 1000)).toBe('5m ago');
  });

  it('returns hours for timestamps within a day', () => {
    expect(formatRelativeTime(Date.now() - 3 * 60 * 60 * 1000)).toBe('3h ago');
  });

  it('returns days for older timestamps', () => {
    expect(formatRelativeTime(Date.now() - 2 * 24 * 60 * 60 * 1000)).toBe('2d ago');
  });
});
