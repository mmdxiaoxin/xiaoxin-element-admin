<template>
    <el-container>
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <el-aside
                :width="globalStore.isCollapse ? `64px` : `250`"
            >
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-tag-list />
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
import FHeader from '../components/FHeader.vue';
import FMenu from '../components/FMenu.vue';
import FTagList from '../components/FTagList.vue';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();
</script>
<style lang="scss">
.el-aside {
    transition: all 0.2s;
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
