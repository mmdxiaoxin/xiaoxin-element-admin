import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import {
    errorRoute,
    staticRouter,
} from '@/router/modules/staticRouter';
import { getToken } from '@/utils/auth';
import { toast } from '@/utils/common';
import { useUserStore } from '@/stores/modules/user';
import Nprogress from '@/config/nprogress';

const mode = 'hash';

const routerMode = {
    hash: () => createWebHashHistory(),
    history: () => createWebHistory(),
};

const router = createRouter({
    history: routerMode[mode](),
    routes: [...staticRouter, ...errorRoute],
    strict: false,
});

router.beforeEach(async (to, from, next) => {
    const token = getToken();
    const userStore = useUserStore();

    if (!token && to.path !== '/login') {
        toast('请先登录', 'error');
        return next({ path: '/login' });
    }

    if (token && to.path === '/login') {
        return next({ path: '/' });
    }

    if (token !== null) {
        await userStore.getUserInfo();
    }
    next();
});

export default router;
