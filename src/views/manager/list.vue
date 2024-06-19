<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button
                type="primary"
                size="small"
                @click="handleCreate"
                >新增
            </el-button>
            <el-tooltip
                effect="dark"
                content="刷新数据"
                placement="top"
            >
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column label="管理员" width="200">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-avatar :size="40" :src="row.avatar">
                            <img
                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                            />
                        </el-avatar>
                        <div class="ml-3">
                            <h6>{{ row.username }}</h6>
                            <small>ID:{{ row.id }}</small>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="所属管理员" align="center">
                <template #default="{ row }">
                    {{ row.role?.name || '-' }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch
                        :modelValue="row.status"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="180"
                align="center"
            >
                <template #default="scope">
                    <el-button
                        type="primary"
                        size="small"
                        text
                        @click="handleEdit(scope.row)"
                        >修改
                    </el-button>

                    <el-popconfirm
                        title="是否要删除该管理员？"
                        confirmButtonText="确认"
                        cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                text
                                type="primary"
                                size="small"
                                >删除</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-5">
            <el-pagination
                background
                layout="prev, pager ,next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
            />
        </div>

        <FormDrawer
            ref="formDrawerRef"
            :title="drawerTitle"
            @submit="handleSubmit"
        >
            <el-form
                :model="form"
                ref="formRef"
                :rules="rules"
                label-width="80px"
                :inline="false"
            >
                <el-form-item label="公告标题" prop="title">
                    <el-input
                        v-model="form.title"
                        placeholder="公告标题"
                    ></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input
                        v-model="form.content"
                        placeholder="公告内容"
                        type="textarea"
                        :rows="5"
                    ></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue';
import { Refresh } from '@element-plus/icons-vue';
</script>
<style scoped></style>
