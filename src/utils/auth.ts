import { useCookies } from '@/hooks/useCookies';

const TokenKey = 'admin-token';
const cookie = useCookies();

// 获取token
export function getToken() {
    return cookie.get(TokenKey);
}

// 设置token
export function setToken(token: string) {
    return cookie.set(TokenKey, token);
}

// 清除token
export function removeToken() {
    return cookie.remove(TokenKey);
}
