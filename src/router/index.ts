import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import {
    errorRoute,
    staticRoute,
} from '@/router/modules/staticRouter';
import { getToken } from '@/utils/auth';
import { toast } from '@/utils/common';
import { useUserStore } from '@/stores/modules/user';
import Nprogress from '@/config/nprogress';
import { addRoutes } from '@/router/modules/dynamicRouter';
import { getUserInfoApi } from '@/api/modules/user';

const mode = 'hash';

const routerMode = {
    hash: () => createWebHashHistory(),
    history: () => createWebHistory(),
};

const router = createRouter({
    history: routerMode[mode](),
    routes: [...staticRoute, ...errorRoute],
    strict: false,
});

// 防止重复获取用户信息
let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
    const token = getToken();
    const userStore = useUserStore();

    Nprogress.start();

    if (!token && to.path !== '/login') {
        toast('请先登录', 'error');
        return next({ path: '/login' });
    }

    if (token && to.path === '/login') {
        return next({ path: from.path ? from.path : '/' });
    }

    if (token && !hasGetInfo) {
        await userStore.getUserInfo();
        hasGetInfo = true;
    }
    next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
    Nprogress.done();
    console.warn('路由错误', error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
    Nprogress.done();
});

export default router;
