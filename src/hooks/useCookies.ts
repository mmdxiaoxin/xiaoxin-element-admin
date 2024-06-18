import type { Connect } from 'vite';
import type { RawCookies } from '@/utils/universal-cookie';
import { UniversalCookie } from '@/utils/universal-cookie';
import { onUnmounted, ref } from 'vue';

type IncomingMessage = Connect.IncomingMessage;

function shouldUpdate(
    dependencies: string[] | null,
    newCookies: RawCookies,
    oldCookies: RawCookies,
) {
    if (!dependencies) return true;

    for (const dependency of dependencies) {
        if (newCookies[dependency] !== oldCookies[dependency])
            return true;
    }

    return false;
}

export function createCookies(req?: IncomingMessage) {
    const cookieString = req ? req.headers.cookie || '' : null;
    const cookieInstance = new UniversalCookie(cookieString);
    return (
        dependencies?: string[] | null,
        {
            doNotParse = false,
            autoUpdateDependencies = false,
        } = {},
    ) =>
        useCookies(
            dependencies,
            { doNotParse, autoUpdateDependencies },
            cookieInstance,
        );
}

export function useCookies(
    dependencies?: string[] | null,
    { doNotParse = false, autoUpdateDependencies = false } = {},
    cookies = new UniversalCookie(),
) {
    const watchingDependencies = autoUpdateDependencies
        ? [...(dependencies || [])]
        : dependencies;

    let previousCookies = cookies.getAll(doNotParse);
    const touches = ref(0);
    const onChange = () => {
        const newCookies = cookies.getAll(doNotParse);
        if (
            shouldUpdate(
                watchingDependencies || null,
                newCookies,
                previousCookies,
            )
        ) {
            touches.value++;
        }
        previousCookies = newCookies;
    };

    cookies.addChangeListener(onChange);

    onUnmounted(() => {
        cookies.removeChangeListener(onChange);
    });

    return {
        get: (name: string) => {
            if (
                autoUpdateDependencies &&
                watchingDependencies &&
                !watchingDependencies.includes(name)
            ) {
                watchingDependencies.push(name);
            }
            touches.value; // Trigger reactivity
            return cookies.get(name, doNotParse);
        },
        getAll: () => {
            touches.value;
            return cookies.getAll(doNotParse);
        },
        set: (
            name: string,
            value: string,
            options: Record<string, any> = {},
        ) => {
            cookies.set(name, value, options);
        },
        remove: (
            name: string,
            optons: Record<string, any> = {},
        ) => {
            cookies.remove(name, options);
        },
        addChangeListener: (listener: () => void) => {
            cookes.addChangeListener(listener);
        },
        removeChangeListener: (listener: () => void) => {
            cookies.removeChangeListener(listener);
        },
    };
}
