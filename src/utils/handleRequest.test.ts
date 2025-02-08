import { describe, it, expect, vi } from 'vitest';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

import { handleRequest } from './handleRequest';

describe('handleRequest', () => {
  it('should return the response when the request succeeds', async () => {
    const mockResponse = { data: 'Success' };
    const request = Promise.resolve(mockResponse);

    await expect(handleRequest(request)).resolves.toEqual(mockResponse);
  });

  it('should throw an error message from Axios response if request fails with known error format', async () => {
    const errorMessage = 'Request failed';

    // Создаем объект, соответствующий структуре AxiosError
    const error = new AxiosError(errorMessage) as AxiosError<{ message: string }>;

    // Создаем корректный headers
    const headers = new AxiosHeaders();

    // Создаем типизированный config
    const config: InternalAxiosRequestConfig = {
      method: 'GET',
      headers, // Теперь headers корректный
      url: '',
    };

    // Типизируем response как AxiosResponse
    const response: AxiosResponse<{ message: string }> = {
      data: { message: errorMessage },
      status: 400,
      statusText: 'Bad Request',
      headers,
      config,
    };

    error.response = response;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const request = Promise.reject(error);

    await expect(handleRequest(request)).rejects.toEqual(errorMessage);
  });

  it('should throw a generic error if request fails with an unknown error format', async () => {
    const error = new Error('Some other error');

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    const request = Promise.reject(error);

    await expect(handleRequest(request)).rejects.toEqual('An unexpected error occurred');
  });
});
