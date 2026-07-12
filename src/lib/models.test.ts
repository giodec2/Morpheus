import { describe, it, expect } from 'vitest';
import { ALL_MODELS, MODEL_DESCRIPTION_KEYS, getLocalizedModelDescriptions } from './models';
import { translate } from '@/i18n/translate';

describe('model descriptions', () => {
  it('has a description key for every model', () => {
    for (const model of ALL_MODELS) {
      expect(MODEL_DESCRIPTION_KEYS).toHaveProperty(model.value);
    }
  });

  it('resolves every description to a real string (not the key)', () => {
    const descriptions = getLocalizedModelDescriptions((key) => translate('en', key));
    for (const model of ALL_MODELS) {
      const desc = descriptions[model.value];
      expect(desc).toBeDefined();
      expect(desc).not.toBe(MODEL_DESCRIPTION_KEYS[model.value]);
      expect(desc).not.toMatch(/^chat\.modelDescriptions\./);
    }
  });

  it('resolves every Italian description to a real string', () => {
    const descriptions = getLocalizedModelDescriptions((key) => translate('it', key));
    for (const model of ALL_MODELS) {
      const desc = descriptions[model.value];
      expect(desc).toBeDefined();
      expect(desc).not.toMatch(/^chat\.modelDescriptions\./);
    }
  });
});
