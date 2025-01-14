import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN, AUTH_TOKEN_HEADER } from '@/shared/constants/constants';
import { ROUTES } from '@/shared/constants/routes';

export const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token =
    localStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  if (token) request.headers[AUTH_TOKEN_HEADER] = `Bearer ${token}`;
  return request;
};

export const successResponseHandler = (response: AxiosResponse) => {
  if (response?.data?.code === 401) {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = `${window.location.origin}${ROUTES.LOGIN}`;
  }
  return {
    ...response,
    data: response.data,
  };
};

export const errorResponseHandler = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = `${window.location.origin}${ROUTES.LOGIN}`;
  }
  return Promise.reject(error);
};
