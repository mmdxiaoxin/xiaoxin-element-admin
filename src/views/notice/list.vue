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
                <el-button text @click="getNoticeData">
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
            <el-table-column prop="title" label="公告标题" />
            <el-table-column
                prop="create_time"
                label="发布时间"
                width="380"
            />
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
                        title="是否要删除该公告？"
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
                @current-change="getNoticeData"
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
import { Refresh } from '@element-plus/icons-vue';
import FormDrawer from '@/components/FormDrawer/FormDrawer.vue';
import { ref, reactive, computed } from 'vue';
import {
    createNotice,
    deleteNotice,
    getNoticeList,
    updateNotice,
} from '@/api/modules/notice';
import { toast } from '@/utils/common';

/**
 * Notice基本模块
 */
const tableData = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

function getNoticeData(page = null) {
    if (typeof page == 'number') {
        currentPage.value = page;
    }

    loading.value = true;
    getNoticeList(currentPage.value)
        .then(({ list: listData, totalCount }) => {
            tableData.value = listData;
            total.value = totalCount;
        })
        .finally(() => {
            loading.value = false;
        });
}

getNoticeData();

/**
 * Notice功能模块
 */
const formDrawerRef = ref(null);
const formRef = ref(null);
const form = reactive({
    title: '',
    content: '',
});
const rules = {
    title: [
        {
            required: true,
            message: '公告标题不能为空',
            trigger: 'blur',
        },
    ],
    content: [
        {
            required: true,
            message: '公告内容不能为空',
            trigger: 'blur',
        },
    ],
};
const editId = ref(0);
const drawerTitle = computed(() =>
    editId.value ? '修改' : '新增',
);

function handleSubmit() {
    formRef.value.validate((valid) => {
        if (!valid) return;

        formDrawerRef.value.showLoading();
        const activeFunction = editId.value
            ? updateNotice(editId.value, form)
            : createNotice(form);

        activeFunction
            .then(() => {
                toast(drawerTitle.value + '成功');
                getNoticeData(editId.value ? false : 1);
                formDrawerRef.value.close();
            })
            .finally(() => {
                formDrawerRef.value.hideLoading();
            });
    });
}

function resetForm(row = false) {
    if (formRef.value) formRef.value.clearValidate();
    if (row) {
        for (const key in form) {
            form[key] = row[key];
        }
    }
}

function handleCreate() {
    editId.value = 0;
    resetForm({
        title: '',
        content: '',
    });
    formDrawerRef.value.open();
}

function handleEdit(row) {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
}

function handleDelete(id) {
    loading.value = true;
    deleteNotice(id)
        .then(() => {
            toast('删除成功');
            getNoticeData();
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>
<style scoped></style>
