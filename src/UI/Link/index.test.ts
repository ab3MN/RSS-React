import { describe, it, expect } from 'vitest';

import * as Module from './';

describe('index.ts exports', () => {
  it('should export SearchLink', () => {
    expect(Module.SearchLink).toBeDefined();
  });

  it('should export SearchLink', () => {
    expect(Module.CustomLink).toBeDefined();
  });
});
