<template>
    <div class="tool-bar-r">
        <div class="header-icon">
            <SearchMenu />
            <el-icon>
                <Menu />
            </el-icon>
            <el-icon>
                <QuestionFilled />
            </el-icon>
            <Message />
        </div>
        <Avatar />
    </div>
</template>
<script setup lang="ts">
import Avatar from '@/layouts/components/XHeader/components/Avatar.vue';
import SearchMenu from '@/layouts/components/XHeader/components/SearchMenu.vue';
import Message from '@/layouts/components/XHeader/components/Message.vue';
import { Menu, QuestionFilled } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.tool-bar-r {
    @apply flex items-center;
    height: 100%;
    padding-right: 28px;

    .header-icon {
        @apply flex items-center ml-auto;
        & > * {
            margin-right: 28px;
            color: var(--el-header-text-color);
        }
    }
}
</style>
