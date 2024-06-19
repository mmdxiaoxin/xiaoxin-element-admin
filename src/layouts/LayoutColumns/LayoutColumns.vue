<template>
    <el-container class="layout">
        <el-aside width="224px" style="padding: 12px">
            <div class="logo">Aside</div>
            <XMenu />
        </el-aside>
        <el-container>
            <el-header height="50px">
                <ToolBarRight />
            </el-header>
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import ToolBarRight from '@/layouts/components/XHeader/ToolBarRight.vue';
import XMenu from '@/layouts/components/XMenu/XMenu.vue';
</script>
<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;

    .el-aside {
        height: 100%;

        .logo {
            @apply flex items-center;
            height: 58px;
            line-height: 16px;
            font-size: 24px;
            padding-left: 12px;
        }

        transition: all 0.2s;
        background-color: #eeeeee;
    }

    :deep(.el-sub-menu__title) {
        height: 40px;
        font-size: 14px;
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-active {
    transition-delay: 0.3s;
}
</style>
