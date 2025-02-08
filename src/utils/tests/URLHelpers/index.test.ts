import { describe, expect, it } from 'vitest';

import { getIdFromUrl, getSearchWith, getURLSearchParams } from '@/utils/URLHelpers';

describe('index.ts exports', () => {
  it('should export getIdFromUrl and it works correctly', () => {
    const url = 'https://example.com/123/';
    const id = getIdFromUrl(url);

    expect(id).toBe('123');
  });

  it('should export getURLSearchParams and it works correctly', () => {
    const params = { search: 'test', page: '1' };
    const queryString = getURLSearchParams(params);

    expect(queryString).toBe('search=test&page=1');
  });
});

describe('getSearchWith', () => {
  it('should update parameters in the URLSearchParams object', () => {
    const currentParams = new URLSearchParams('search=test&page=1');
    const paramsToUpdate = {
      search: 'updated',
      page: '2',
    };

    const result = getSearchWith(currentParams, paramsToUpdate);

    expect(result).toBe('search=updated&page=2');
  });

  it('should delete the parameter if its value is null', () => {
    const currentParams = new URLSearchParams('search=test&page=1');
    const paramsToUpdate = {
      search: null,
    };

    const result = getSearchWith(currentParams, paramsToUpdate);

    expect(result).toBe('page=1');
  });

  it('should add multiple values for the same parameter if the value is an array', () => {
    const currentParams = new URLSearchParams('search=test&page=1');
    const paramsToUpdate = {
      search: ['new', 'value'],
    };

    const result = getSearchWith(currentParams, paramsToUpdate);

    expect(result).toBe('page=1&search=new&search=value');
  });

  it('should handle empty currentParams gracefully', () => {
    const currentParams = new URLSearchParams();
    const paramsToUpdate = {
      search: 'test',
      page: '1',
    };

    const result = getSearchWith(currentParams, paramsToUpdate);

    expect(result).toBe('search=test&page=1');
  });

  it('should return the same params if nothing is updated', () => {
    const currentParams = new URLSearchParams('search=test&page=1');
    const paramsToUpdate = {};

    const result = getSearchWith(currentParams, paramsToUpdate);

    expect(result).toBe('search=test&page=1');
  });
});
