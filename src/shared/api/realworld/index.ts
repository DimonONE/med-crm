import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
import { PATH_PAGE } from '~shared/lib/react-router';
import type {
  HttpResponse,
  RequestParams,
  UserEntityDto,
} from './Api';

export const API_URL = 'http://stage.medicare-online.info';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL, 
  timeout: 5000, 
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = getCookie('token'); 

    const updatedConfig = { ...config };
    if (!updatedConfig.headers) {
      updatedConfig.headers = {} as AxiosRequestHeaders;
    }

    if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`;
    }

    return updatedConfig;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 && 
      window.location.pathname !== PATH_PAGE.register
    ) {
      window.location.href = PATH_PAGE.logout; 
    }
    return Promise.reject(error);
  },
);

export type {
  HttpResponse,
  RequestParams,
  UserEntityDto,
};

export * as Api from './Api';

export default axiosInstance;