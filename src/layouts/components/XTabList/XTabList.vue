<template>
    <div class="tabs-box">
        <div class="tabs-menu">
            <el-tabs v-model="tabsMenuValue" type="card">
                <el-tab-pane
                    v-for="item in tabsMenuList"
                    :key="item.path"
                    :label="item.title"
                    :name="item.path"
                    :closable="item.close"
                >
                    <template #label>
                        <el-icon
                            v-show="item.icon && tabsIcon"
                            class="tabs-icon"
                        >
                            <component
                                :is="item.icon"
                            ></component>
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = ref([]);
const tabsIcon = ref([]);
</script>

<style scoped></style>
