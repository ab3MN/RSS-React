import { vi, describe, it, expect } from 'vitest';

import { handleRequest } from '../handleRequest';

vi.mock('axios', () => ({
  isAxiosError: vi.fn(),
}));

describe('handleRequest', () => {
  it('should return the data if the request is successful', async () => {
    const mockData = { data: 'success' };
    const mockRequest = Promise.resolve(mockData);

    await expect(handleRequest(mockRequest)).resolves.toEqual(mockData);
  });

  it('should throw the error message from axios error response if the error is an AxiosError with a message', async () => {
    const axiosError = {
      response: {
        data: {
          message: 'Axios error occurred',
        },
      },
    };

    const mockRequest = Promise.reject(axiosError);

    await expect(handleRequest(mockRequest)).rejects.toBe('An unexpected error occurred');
  });

  it('should throw "An unexpected error occurred" if the error is not an AxiosError or does not have a valid message', async () => {
    const unexpectedError = new Error('Some other error');

    const mockRequest = Promise.reject(unexpectedError);

    await expect(handleRequest(mockRequest)).rejects.toBe('An unexpected error occurred');
  });

  it('should throw "An unexpected error occurred" if the error is an AxiosError without a message', async () => {
    const axiosErrorWithoutMessage = {
      response: {
        data: {},
      },
    };

    const mockRequest = Promise.reject(axiosErrorWithoutMessage);

    await expect(handleRequest(mockRequest)).rejects.toBe('An unexpected error occurred');
  });
});
