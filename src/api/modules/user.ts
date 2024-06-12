import axios from '@/api';
import type { Login } from '@/api/interface';

export const loginApi = (username: string, password: string) => {
    return axios.post<Login.ResLogin>('/admin/login', {
        username,
        password,
    });
};

export const getUserInfoApi = () => {
    return axios.post('/admin/getinfo');
};

export const logoutApi = () => {
    return axios.post('/admin/logout');
};

export const changePasswordApi = (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}) => {
    return axios.post('/admin/updatepassword', data);
};
