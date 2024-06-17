<template>
    <component :is="LayoutComponents[layout]" />
</template>
<script setup lang="ts">
import type { LayoutType } from '@/stores/interface';
import type { Component } from 'vue';
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import LayoutDefault from './LayoutDefault/LayoutDefault.vue';

const LayoutComponents: Record<LayoutType, Component> = {
    vertical: LayoutDefault,
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style scoped></style>
