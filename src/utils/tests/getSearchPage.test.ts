import { describe, expect, it } from 'vitest';

import { getSearchPage } from '../getSearchPage';

describe('getSearchPage', () => {
  it('should return 1 if page is null', () => {
    expect(getSearchPage(null)).toBe(1);
  });

  it('should return 1 if page is not a number', () => {
    expect(getSearchPage('abc')).toBe(1);
  });

  it('should return 1 if page is NaN', () => {
    expect(getSearchPage('NaN')).toBe(1);
  });

  it('should return the correct page number if valid page is provided', () => {
    expect(getSearchPage('5')).toBe(5);
  });

  it('should return 0 if the page is 0', () => {
    expect(getSearchPage('0')).toBe(0);
  });

  it('should return the correct page number if valid page is provided as a string', () => {
    expect(getSearchPage('100')).toBe(100);
  });
});
