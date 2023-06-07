import axios, { InternalAxiosRequestConfig } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

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
        let message = '';
        switch (err.response.status) {
          case 400:
            message = '请求错误';
            break;
          case 401:
            message = '未授权，请重新登录';
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求出错';
            break;
          case 500:
            message = '服务器错误';
            break;
          case 501:
            message = '服务未实现';
            break;
          case 502:
            message = '网络错误';
            break;
          case 503:
            message = '服务不可用';
            break;
          case 504:
            message = '网络超时';
            break;
          case 505:
            message = 'HTTP版本不受支持';
            break;
          default:
            message = '连接出错';
        }
        ElMessage({
          showClose: true,
          message,
          type: 'error',
        });
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
