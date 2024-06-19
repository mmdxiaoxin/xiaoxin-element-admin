<template>
    <el-menu
        :router="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="accordion"
        class="border-0"
    >
        <XSubMenu :menu-list="subMenuList" />
    </el-menu>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import XSubMenu from '@/layouts/components/XMenu/XSubMenu.vue';
import { computed, ref } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';

const route = useRoute();
const globalStore = useGlobalStore();

const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const activeMenu = computed(
    () =>
        (route.meta.activeMenu
            ? route.meta.activeMenu
            : route.path) as string,
);

const subMenuList = ref<Menu.MenuOptions[]>([]);
</script>
<style scoped></style>
