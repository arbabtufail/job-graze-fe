import axios, { AxiosRequestConfig } from 'axios';
import { ContentType } from './axios.types';
import { errorResponseHandler, requestHandler, successResponseHandler } from './interceptors';

const getAxiosInstance = (
  config: AxiosRequestConfig = {
    headers: { contentType: ContentType.json },
  },
) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASEURL,
    headers: {
      'Content-Type': config.headers?.contentType || ContentType.json,
    },
  });

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(successResponseHandler, errorResponseHandler);

  return instance;
};

export default getAxiosInstance();
