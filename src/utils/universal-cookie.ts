export type RawCookies = Record<string, string>;

function parseCookies(cookieString: string): RawCookies {
    return cookieString
        .split('; ')
        .reduce((acc: RawCookies, cookie) => {
            const [name, ...rest] = cookie.split('=');
            acc[name] = rest.join('=');
            return acc;
        }, {});
}

function serializeCookie(
    name: string,
    value: string,
    options: Record<string, any> = {},
) {
    let cookie = `${encodeURIComponent(
        name,
    )}=${encodeURIComponent(value)}`;
    if (options.expires) {
        cookie += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
        cookie += `; path=${options.path}`;
    }
    return cookie;
}

function getCookie(
    name: string,
    cookies: RawCookies,
    doNotParse: boolean,
): any {
    const value = cookies[name];
    if (doNotParse || value === undefined) return value;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function getAllCookies(
    cookies: RawCookies,
    doNotParse: boolean,
): RawCookies {
    const result: RawCookies = {};
    for (const [name, value] of Object.entries(cookies)) {
        result[name] = doNotParse
            ? value
            : getCookie(name, cookies, false);
    }
    return result;
}

function setCookie(
    name: string,
    value: string,
    options: Record<string, any> = {},
) {
    document.cookie = serializeCookie(name, value, options);
}

function removeCookie(
    name: string,
    options: Record<string, any> = {},
) {
    setCookie(name, '', { ...options, expires: new Date(0) });
}

export class UniversalCookie {
    private cookies: RawCookies;
    private listeners: Array<() => void> = [];

    constructor(cookieString: string | null = null) {
        this.cookies = cookieString
            ? parseCookies(cookieString)
            : parseCookies(document.cookie);
    }

    get(name: string, doNotParse: boolean): any {
        return getCookie(name, this.cookies, doNotParse);
    }

    getAll(doNotParse: boolean): RawCookies {
        return getAllCookies(this.cookies, doNotParse);
    }

    set(
        name: string,
        value: string,
        options: Record<string, any> = {},
    ) {
        this.cookies[name] = value;
        setCookie(name, value, options);
        this.notifyChange();
    }

    remove(name: string, options: Record<string, any> = {}) {
        delete this.cookies[name];
        removeCookie(name, options);
        this.notifyChange();
    }

    addChangeListener(listener: () => void) {
        this.listeners.push(listener);
    }

    removeChangeListener(listener: () => void) {
        this.listeners = this.listeners.filter(
            (l) => l !== listener,
        );
    }

    private notifyChange() {
        this.listeners.forEach((listener) => listener());
    }
}
