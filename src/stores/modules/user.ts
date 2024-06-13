import { defineStore } from 'pinia';
import { getUserInfoApi, loginApi } from '@/api/modules/user';
import { state } from 'vue-tsc/out/shared';

export const useUserStore = defineStore({
    id: 'xiaoxin-user',
    state: () => ({
        user: {},
        menus: [],
        ruleNames: [],
    }),
    actions: {
        async getUserInfo() {
            const { data } = await getUserInfoApi();
            console.log(data);
        },
    },
});
