import { ref } from 'vue';
import type { Ref } from 'vue';

const setCookie = (
    name: string,
    value: string,
    days?: number,
): void => {
    let expires = '';
    if (days) {
        const date: Date = new Date();
        date.setTime(
            date.getTime() + days * 24 * 60 * 60 * 1000,
        );
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const eraseCookie = (name: string): void => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
};

// Type definition for the cookie object
interface CookieObject {
    [key: string]: string;
}

// `useCookies` composition function
export function useCookies() {
    const cookies: Ref<CookieObject> = ref({});

    const updateCookies = (): void => {
        const cookieArray = document.cookie.split(';');
        const cookieObj: CookieObject = {};
        cookieArray.forEach((cookie) => {
            const [name, value] = cookie.split('=');
            cookieObj[name.trim()] = value;
        });
        cookies.value = cookieObj;
    };

    const set = (
        name: string,
        value: string,
        days?: number,
    ): void => {
        setCookie(name, value, days);
        updateCookies();
    };

    const get = (name: string): string | null => {
        return getCookie(name);
    };

    const remove = (name: string): void => {
        eraseCookie(name);
        updateCookies();
    };

    updateCookies();

    return {
        cookies,
        set,
        get,
        remove,
    };
}
