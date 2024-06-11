import type {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

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
}

export default new RequestHttp(config);
