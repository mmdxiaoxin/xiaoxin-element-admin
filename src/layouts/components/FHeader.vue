<template>
    <div class="f-header">
        <span class="header-logo">
            <el-icon class="mr-1"><eleme-filled /></el-icon>
            商城后台管理
        </span>
        <el-icon class="icon-btn" @click="handleCollapse">
            <fold v-if="globalStore.isCollapse" />
            <Expand v-else />
        </el-icon>
        <el-tooltip
            effect="dark"
            content="刷新"
            placement="bottom"
        >
            <el-icon class="icon-btn" @click="handleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="header-avatar">
            <el-tooltip
                effect="dark"
                content="全屏"
                placement="bottom"
            >
                <el-icon class="icon-btn" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown
                class="dropdown"
                @command="handleCommand"
            >
                <span class="flex items-center text-light-50">
                    <el-avatar
                        class="mr-2"
                        :size="25"
                        :src="userStore.user.avatar"
                    />
                    {{ userStore.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword"
                            >修改密码
                        </el-dropdown-item>
                        <el-dropdown-item command="logout"
                            >退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <form-drawer
        ref="formDrawerRef"
        title="修改密码"
        destroyOnClose
        @submit="onSubmit"
    >
        <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="80px"
            size="small"
        >
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input
                    v-model="form.oldpassword"
                    placeholder="请输入旧密码"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input
                    type="password"
                    v-model="form.repassword"
                    placeholder="请输入确认密码"
                    show-password
                ></el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>
<script setup>
import {
    Aim,
    ArrowDown,
    ElemeFilled,
    Expand,
    Fold,
    FullScreen,
    Refresh,
} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/modules/user';
import { useGlobalStore } from '@/stores/modules/global';
import useFullscreen from '@/hooks/useFullscreen';
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue';

const userStore = useUserStore();
const globalStore = useGlobalStore();
// 全屏图标操作
const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle,
} = useFullscreen();

// 下拉菜单命令
const handleCommand = (c) => {
    switch (c) {
        case 'logout':
            break;
        case 'rePassword':
            break;
    }
};

// 折叠
const handleCollapse = () => {
    globalStore.isCollapse = !globalStore.isCollapse;
};

// 刷新
const handleRefresh = () => location.reload();
</script>
<style lang="scss">
.f-header {
    @apply flex
    items-center
    bg-indigo-700
    fixed
    text-indigo-50
    top-0
    left-0
    right-0;
    height: 64px;
    z-index: 100;

    .header-logo {
        @apply flex
        items-center
        justify-center
        text-xl
        font-thin;
        width: 250px;
    }

    .header-avatar {
        @apply flex
        items-center
        ml-auto;

        .dropdown {
            height: 64px;
            cursor: pointer;
            @apply flex
            justify-center
            items-center
            mx-5;
        }
    }
}

.icon-btn {
    @apply flex
    justify-center
    items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;

    &:hover {
        @apply bg-indigo-600;
    }
}
</style>
