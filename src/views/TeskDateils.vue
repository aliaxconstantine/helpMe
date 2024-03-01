<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderView from './HeaderView.vue';
import TeskView from './TeskView.vue';
import { getTask, getTaskChat, sendTaskMessage, handleAvatarClick } from "../utils/utils"
import { type Task, type TUser } from "../utils/TypeInclass"
import { errorLog } from '@/utils/axiosRequest'
import { userStore } from "../utils/role"
import { routerView, deleteTask } from '../utils/utils';
import { ElMessageBox } from 'element-plus';
import { type TaskItem, TaskMessageImpl } from '@/utils/Typeimpl';
import { routerTeskView } from '../utils/utils';
import { getTimeElapsedString } from '@/utils/dataUtils';
import { watch } from "vue";

watch(() => props.id, () => { onMounted })

const tesk = ref<TaskItem>();
const teskChat = ref();
const chatList = ref<Array<TaskMessageImpl>>();
const teskUser = ref({
    id: 0,
    name: "",
    image: ""
});
const users = userStore();
const isLoading = ref(true)

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const updateMessage = async () => {
    teskChat.value = null;
    const data = await getTaskChat(Number(props.id)) as Array<TaskMessageImpl>;
    chatList.value = data;
}

onMounted(async () => {
    try {
        const data = await getTask(Number(props.id)) as Task;
        if (data.userId != undefined && data.userName != undefined && data.userIcon != undefined) {
            teskUser.value.id = data.userId;
            teskUser.value.name = data.userName;
            teskUser.value.image = data.userIcon;
        }
        tesk.value = data;
    } catch (error) {
        errorLog(error)
    }

    try {
        updateMessage();
    } catch (error) {
        errorLog(error)
    }
    isLoading.value = false;
})
const ifself = (teskUserid: number, asid: number) => {
    if (users.userId != null) {
        if (users.userId == teskUserid) {
            return false
        }
        if (asid == users.userId) {
            return false
        }
        else {
            return true
        }
    }
}

const sendMessage = async (message: string) => {
    const date = new TaskMessageImpl()
    date.message = message
    date.userId = users.getUserId
    date.taskId = Number(props.id)
    date.state = 0
    const ifFlag = await sendTaskMessage(Number(props.id), date) as boolean;
    console.log(ifFlag)
    if (!ifFlag) {
        ElMessageBox.alert("发送失败", "提示");
    }
    else {
        updateMessage()
    }
}

//接受任务
const teskPost = (teskId: number | undefined) => {
    if (teskId != undefined) {
        //跳转到订单确认界面
        routerTeskView("ok", teskId)
    }
}

//撤销发布的任务
const deTesk = async (teskid: number | undefined) => {
    if (teskid != undefined) {
        //弹出提示撤销
        ElMessageBox.confirm("确定撤销发布的任务吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(async () => {
            //执行撤销任务
            const flag = await deleteTask(teskid) as boolean;
            if (flag) {
                //删除成功
                ElMessageBox.alert("撤销成功");
            } else {
                //删除失败
                ElMessageBox.alert("撤销失败");
            }
            //返回主页 
            routerView("")
        }).catch(() => {
            //取消撤销任务

        });
    }
}

const gettaskUrl = (taskurl: string | undefined) => {
    console.log(taskurl)
    if (taskurl == undefined) {
        return ""
    }
    const list: String[] = []
    //不存在逗号时返回原来的url
    if (taskurl.indexOf(",") == -1) {
        list.push(taskurl)
        console.log(list)
        return list;
    }
    //通过每个逗号分隔taskurl获取到列表
    return taskurl.split(",")
}

const getTime = (date: string | undefined) => {
    if (date != null) {
        return getTimeElapsedString(date)
    }
}
</script>

<template>
    <body class="tesk-details">
        <el-skeleton :row="20" v-if="isLoading" animated />
        <div v-else>
            <Suspense>
                <HeaderView :ismain="false"></HeaderView>
            </Suspense>
            <el-main>
                <el-card shadow="never">
                    <el-container>
                        <el-header>
                            <div class="header-container">
                                <el-avatar :src="teskUser?.image" @click="handleAvatarClick(teskUser?.id)"></el-avatar>
                                <div class="header-info">
                                    <el-text class="header-name">{{ teskUser.name }}</el-text>
                                    <el-text class="header-id">no:{{ teskUser.id }}</el-text>
                                </div>
                            </div>
                            <div class="header-title">
                                <el-text class="header-title-name">{{ tesk?.name }}</el-text>
                                <div>
                                    <el-text class="header-title-price">酬金：￥</el-text>
                                    <el-text class="header-price">{{ tesk?.price }}</el-text>
                                </div>
                            </div>
                        </el-header>
                        <el-main>
                            <el-text>{{ tesk?.description }}</el-text>
                            <div class="main-image" v-for="image in gettaskUrl(tesk?.imageUrl)">
                                <el-image fit="contain" :src="image"></el-image>
                            </div>
                        </el-main>
                        <el-text class="main-post-Button" v-if="tesk?.assigneeId == users.userId">已承接该任务</el-text>
                        <el-button class="main-post-Button"
                            v-if="ifself(Number(tesk?.initiatorId), Number(tesk?.assigneeId))"
                            @click="teskPost(tesk?.id)">接受任务</el-button>
                        <el-button class="main-post-Button" v-if="tesk?.initiatorId == users.userId"
                            @click="deTesk(tesk?.id)">撤销任务</el-button>
                    </el-container>
                </el-card>

                <el-card shadow="never">
                    <div class="chat-box">
                        <el-avatar :src="users.userImage"></el-avatar>
                        <el-input v-model="teskChat" placeholder="留下你的留言吧~" class="input"></el-input>
                        <el-button type="primary" @click="sendMessage(teskChat)">发送</el-button>
                    </div>

                    <div v-for=" chat in chatList" :key="chat.userName" class="chat-item">
                        <div class="chat-header">
                            <el-avatar :src="chat.userIcon"></el-avatar>
                            <div class="chat-header-info">
                                <el-text style=" color: #000; font-size: 16px;"> {{ chat.userName }}</el-text>
                                <el-text style="color: #999 ; font-size: 12px;">&nbsp;&nbsp;&nbsp;{{
                                    getTime(chat.createTime) }}</el-text>
                            </div>
                        </div>
                        <div class="chat-content">
                            <el-text>{{ chat.message }}</el-text>
                        </div>
                    </div>
                </el-card>
                <Suspense>
                    <TeskView :ismain="false"></TeskView>
                </Suspense>
            </el-main>
        </div>
    </body>
</template>

<style scoped>
@import '../assets/bask.css';
</style>



@/apis/axiosRequest../utils/apis../utils/apis../utils/apis../pojos/TypeInclass@/pojos/Typeimpl