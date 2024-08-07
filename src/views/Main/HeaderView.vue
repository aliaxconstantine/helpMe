<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSystemMessages, getUserTasks, } from '@/apis/apis'
import { routerStringView, routerView, routerTeskView, routerKeyView } from '@/apis/routeApis'
import { type Task } from "@/pojos/TypeInclass"
import { type SysMessage } from "@/pojos/Typeimpl"
import { checkLoginStatus, router, } from '@/router/index'
import { userStore } from '@/stores/role'
import { store } from '@/utils/auth'
import { errorLog } from '@/apis/axiosRequest'
import { getType } from '@/utils/dataUtils'
import { ElMessage, ElMessageBox } from 'element-plus'

const dropdownVisible = ref(false)
const selectMainKey = ref("")
const isDrawerOpen = ref(false)
const istesks = ref(false)
const messages = ref<SysMessage[]>([])
const handleSelectClick = async function () {
    try {
        if (selectMainKey.value == "" || selectMainKey.value == null) {
            ElMessage.error("您还没有输入搜索内容")
            return
        }
        // 处理搜索事件的逻辑
        routerKeyView('search', selectMainKey.value)
    } catch (error) {
        errorLog(error)
    }
};
const tesks = ref(Array<Task>());
const isAuthenticated = await checkLoginStatus() as boolean;
const currentPage = ref(); // 当前页码
const pageSize = 8; // 每页显示的任务数量
//打开用户任务清单
const openDraw = () => {
    if (isAuthenticated) {
        isDrawerOpen.value = true
        handlePageChange(1);
    }
    else {
        routerView("loginback")
        return
    }
}
// 处理分页点击事件
const handlePageChange = async (newPage: number) => {
    try {
        if (userStore().userId != 0) {
            currentPage.value = newPage;
            await fetchTasks(newPage);
        }
    } catch (error) {
        errorLog(error)
    }
};

// 通过接口请求获取对应页码的任务数据
const fetchTasks = async (page: number) => {
    try {
        tesks.value = await getUserTasks(page) as Task[];
        istesks.value = true
    } catch (error) {
        errorLog(error)
    }
};


const loginOut = () => {
    store.dispatch('auth/logout')
    routerView("loginback")
}
//打开用户中心
const showDropdown = () => {
    if (isAuthenticated && dropdownVisible.value == false) {
        dropdownVisible.value = true
    }
    else {
        dropdownVisible.value = false
    }
}

const chatRoute = (otherId: number) => {
    if (otherId == null) {
        routerView("loginback")
    }
    routerTeskView("message", otherId)
}

onMounted(async () => {
    //获取系统消息
    messages.value = await getSystemMessages(1) as SysMessage[];
})
</script>
<template>
    <el-affix>
        <el-menu :unique-opened="true" :ellipsis="false" mode="horizontal" class="header-menu"
            background-color="#ffffff">
            <div>
                <el-image src="../../../src/components/icons/helpme.png" class="helpme"></el-image>
            </div> ·
            <div class="flex-grow"></div>
            <el-menu-item index="1" @click="routerView('')">首页</el-menu-item>
            <el-menu-item index="4" @click="routerKeyView('search', 'all')">分类</el-menu-item>

            <el-popover trigger="click" :width="300">
                <template #reference>
                    <el-menu-item index="2">消息</el-menu-item>
                </template>
                <div v-for="item in messages">
                    <el-text>{{ item.message }}</el-text>
                </div>
            </el-popover>
            <div class="flex-grow"></div>
            <div class="input-parent">
                <el-input v-model="selectMainKey" placeholder="请输入需要搜索的对象" class="input-style">
                    <template #append>
                        <el-button @click="handleSelectClick">搜索</el-button>
                    </template>
                </el-input>
            </div>

            <div class="flex-grow"></div>
            <el-popover trigger="click" :visible="dropdownVisible" class="el-popover__popper" placement="top"
                :width="160">
                <template #reference>
                    <el-avatar v-if="isAuthenticated" @click="showDropdown" :src="userStore().userImage" />
                </template>
                <div class="dropdown-content">
                    <div class="user-info">
                        <span class="username">{{ userStore().userName }}</span>
                    </div>
                    <el-menu default-active="1" class="el-menu--vertical" theme="dark">
                        <el-menu-item index="1" @click="routerView('config')">个人中心</el-menu-item>
                        <el-menu-item index="3" @click="loginOut">退出登录</el-menu-item>
                    </el-menu>
                </div>
            </el-popover>
            <el-menu-item index="6" @click="chatRoute(0)">通讯</el-menu-item>

            <el-menu-item index="5" @click="openDraw">任务栏</el-menu-item>
            <el-menu-item index="3" @click="routerView('state')">我的</el-menu-item>

            <el-button type="primary" size="large" @click="routerView('makeTesk')" round>发起任务</el-button>
            <div>
                <el-button v-if="!isAuthenticated" size="large" @click="routerView('loginback')" title="登录" round>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    &nbsp;请登录
                </el-button>
            </div>
        </el-menu>
    </el-affix>
    <el-drawer v-model="isDrawerOpen" title="任务栏" :with-header="false" class="drawer-style">
        <el-header class="container-header">
            <el-pagination background layout="prev, pager, next" :default-page-size="1"
                v-model:current-page="currentPage" :total="100" class="mt-4" :pager-count="5" :page-count="30"
                :page-size="pageSize" @current-change="handlePageChange(currentPage)" />
        </el-header>
        <el-card v-if="tesks.length > 0" v-for=" tesk in tesks " :key="tesk.id" shadow="hover" class="custom-card"
            @click="router.push('/taskinfo/' + tesk.id)">
            <div class="custom-card-content">
                <el-text class="custom-title">{{ tesk.name }}</el-text>
                <div class="custom-publisher">
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    {{ tesk.initiatorId }}
                </div>
                <el-text class="custom-content">{{ tesk.description }}</el-text>
                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
            </div>
        </el-card>
    </el-drawer>
</template>

<style scoped>
@import '../../assets/bask.css';

.helpme {
    width: 70px;
    height: 70px;
}
</style>