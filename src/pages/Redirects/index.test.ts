import { describe, it, expect } from 'vitest';

import * as Module from './';

describe('index.ts exports', () => {
  it('should export RedirectToCharacters', () => {
    expect(Module.RedirectToCharacters).toBeDefined();
  });
});
