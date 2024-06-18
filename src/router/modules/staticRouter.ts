import type { RouteRecordRaw } from 'vue-router';

/**
 * staticRouter (静态路由)
 */
export const staticRoute: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'test',
        component: () =>
            import('@/layouts/LayoutDefault/LayoutDefault.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/"@/views/login/index.vue"        meta: {
            title: '登录',
        },
    },
    // {
    //     path: REGISTER_URL,
    //     name: 'register',
    //     component: () => import('@/views/register/index.vue'),
    //     meta: {
    //         title: '注册',
    //     },
    // },
    // {
    //     path: '/layout',
    //     name: 'layout',
    //     component: () => import('@/layouts/index.vue'),
    //     // component: () => import("@/layouts/indexAsync.vue"),
    //     redirect: HOME_URL,
    //     children: [],
    // },
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRoute = [
    {
        path: '/403',
        name: '403',
        component: () =>
            import('@/components/ErrorMessage/403.vue'),
        meta: {
            title: '403页面',
        },
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import('@/components/ErrorMessage/404.vue'),
        meta: {
            title: '404页面',
        },
    },
    {
        path: '/500',
        name: '500',
        component: () =>
            import('@/components/ErrorMessage/500.vue'),
        meta: {
            title: '500页面',
        },
    },
    // Resolve refresh page, route warnings
    {
        path: '/:pathMatch(.*)*',
        component: () =>
            import('@/components/ErrorMessage/404.vue'),
    },
];
