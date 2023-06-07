import axios, { InternalAxiosRequestConfig } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

export class Request {
  //axios实例
  instance: AxiosInstance;

  //基础配置
  baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
  };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    //请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        return config;
      },
      (err: any) => {
        return Promise.reject(new Error(err));
      },
    );

    //响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => {
        return Promise.reject(new Error(err));
      },
    );
  }

  //定义请求方法
  public request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

export default new Request({});
