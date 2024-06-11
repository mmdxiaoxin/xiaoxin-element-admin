import type {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import type { ResultData } from '@/api/interface';

const config = {
    // 默认地址请求地址，可在 .env.** 文件中修改
    baseURL: '/api',
    // 设置超时时间
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true,
};

class RequestHttp {
    service: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        // 实例化
        this.service = axios.create(config);

        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = getToken();
                if (token) {
                    config.headers['token'] = token;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            },
        );

        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response;
                return data;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            },
        );
    }

    get<T>(
        url: string,
        params?: object,
        _object = {},
    ): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object });
    }

    post<T>(
        url: string,
        params?: object | string,
        _object = {},
    ): Promise<ResultData<T>> {
        return this.service.post(url, params, _object);
    }

    put<T>(
        url: string,
        params?: object,
        _object = {},
    ): Promise<ResultData<T>> {
        return this.service.put(url, params, _object);
    }

    delete<T>(
        url: string,
        params?: any,
        _object = {},
    ): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object });
    }

    download(
        url: string,
        params?: object,
        _object = {},
    ): Promise<BlobPart> {
        return this.service.post(url, params, {
            ..._object,
            responseType: 'blob',
        });
    }
}

export default new RequestHttp(config);
