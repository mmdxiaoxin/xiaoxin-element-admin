import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import {
    errorRouter,
    staticRouter,
} from '@/router/modules/staticRouter';

const mode = 'hash';

const routerMode = {
    hash: () => createWebHashHistory(),
    history: () => createWebHistory(),
};

const router = createRouter({
    history: routerMode[mode](),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
});

export default router;
