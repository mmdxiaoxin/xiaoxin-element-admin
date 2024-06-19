<template>
    <component :is="LayoutComponents[layout]" />
</template>
<script setup lang="ts" name="layout">
import type { LayoutType } from '@/stores/interface';
import type { Component } from 'vue';
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import LayoutClassic from '@/layouts/LayoutClassic/LayoutClassic.vue';
import LayoutColumns from '@/layouts/LayoutColumns/LayoutColumns.vue';

const LayoutComponents: Record<LayoutType, Component> = {
    classic: LayoutClassic,
    columns: LayoutColumns,
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style scoped>
.layout {
    min-width: 600px;
}
</style>
