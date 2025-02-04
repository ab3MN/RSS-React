export interface Response<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ResponseData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export interface ErrorResponse {
  message: string;
}
