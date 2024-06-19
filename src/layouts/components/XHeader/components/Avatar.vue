<template>
    <el-dropdown trigger="click">
        <div class="avatar">
            <!-- <img :src="avatar" alt="avatar" />-->
            <img src="@/assets/images/avatar.png" alt="avatar" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="openDialog('infoRef')">
                    <el-icon>
                        <User />
                    </el-icon>
                    个人信息
                </el-dropdown-item>
                <el-dropdown-item
                    @click="openDialog('passwordRef')"
                >
                    <el-icon>
                        <Edit />
                    </el-icon>
                    更改密码
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout">
                    <el-icon>
                        <SwitchButton />
                    </el-icon>
                    退出登陆
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/modules/user';
import {
    Edit,
    SwitchButton,
    User,
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { logoutApi } from '@/api/modules/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const avatar = computed(() => userStore.user.avatar);

// 退出登录逻辑
const logout = () => {
    ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        // 1.执行退出登录接口
        await logoutApi();

        // 2.清除 Token
        userStore.setToken('');

        // 3.重定向到登陆页
        router.push('/login');
        ElMessage.success('退出登录成功！');
    });
};
const openDialog = (ref: string) => {
    console.log(ref);
};
</script>

<style scoped>
.avatar {
    width: 28px;
    height: 28px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
