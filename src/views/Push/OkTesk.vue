<template>
    <Suspense>
        <HeaderView :ismain="false"></HeaderView>
    </Suspense>
    <el-card class="task-cord">
        <div class="task-info">
            <div class="task-image">
                <el-image :src="task?.imageUrl" fit="cover" style="width: 100px; height: 100px"></el-image>
                <div class="task-status">
                    <el-text class="task-name">{{ task?.name }}</el-text>
                    <el-text class="task-description">{{ task?.description }}</el-text>
                </div>
            </div>
            <div class="task-price-info">
                <el-text class="task-price" type="danger">任务酬劳：</el-text>
                <el-text class="task-price" type="danger">￥{{ task?.price }}</el-text>
            </div>
            <div>
                <el-card class="location-card">
                    <el-text class="task-price" type="warning">任务地点</el-text>
                    <TaskLocationView v-if="task?.x != undefined && task?.y != undefined" :x="task?.x" :y="task?.y" />
                </el-card>
            </div>
            <div class="task-time">
                <div class="task-createTime">
                    <el-text class="task-create">创建时间</el-text>
                    <el-text class="task-create" type="warning">{{ taskTime?.createTime }}</el-text>
                </div>
                <div class="task-dueTime">
                    <el-text class="task-due">期望结束时间</el-text>
                    <el-text class="task-due" type="warning">{{ taskTime?.dueTime }}</el-text>
                </div>
            </div>
        </div>
        <el-card shadow="never">
            <el-avatar :src="task?.userIcon" @click="handleAvatarClick(task?.initiatorId)"></el-avatar>
            <el-text tag="b">发布者：</el-text>
            <el-text>{{ task?.userName }}</el-text>
            <el-button @click="callPublisher(Number(task?.initiatorId))">联系发布者</el-button>
        </el-card>
        <div class="task-button">
            <el-button type="primary" @click="acceptTask">接受任务</el-button>
            <el-button type="danger" @click="rejectTask">拒绝任务</el-button>
        </div>
    </el-card>
</template>
  
<script lang="ts" setup>
import { TaskItem, UserStar, TaskTime, User } from '@/pojos/Typeimpl'; // 请替换为正确的路径
import HeaderView from './HeaderView.vue';
import { onMounted, ref } from 'vue';
import { getTask, getTaskTime, sendUserMessage, addFriend, finishTask, getOtherUser } from '@/apis/apis';
import { routerTeskView,routerView, handleAvatarClick } from '@/apis/routeApis';
import { ElMessageBox } from 'element-plus';
import type { UserFrom } from '@/pojos/TypeInclass';
const props = defineProps(
    {
        id: {
            type: String,
            required: true
        }
    }
)
const task = ref<TaskItem>();
const taskTime = ref<TaskTime>();
const userStar = ref<UserFrom>();
const taskCordMessage = ref('');
onMounted(async () => {
    const idnu = Number(props.id);
    if (idnu != undefined) {
        //获取任务信息
        task.value = await getTask(idnu) as TaskItem;
        //获取任务时间
        taskTime.value = await getTaskTime(idnu) as TaskTime;
        if (task.value.userId != null) {
            //获取用户信息
            userStar.value = await getOtherUser(task.value.userId) as UserFrom;
        }
    }
    else {
        ElMessageBox.alert('任务不存在！');
    }
})
const callPublisher = (id: number) => {
    routerTeskView('/message', id)
}


//接受任务
const acceptTask = async () => {
    if (task.value != null && task.value.initiatorId != null) {
        //完成任务请求
        const taskflag = await finishTask(Number(props.id)) as boolean;
        if (!taskflag) {
            return
        }
        //添加任务发起者为好友
        const friendflag = await addFriend(task.value.initiatorId) as boolean;
        //给任务发起者发送消息提示
        const messageflag = await sendUserMessage(taskCordMessage.value, task.value.initiatorId) as boolean;
        if (friendflag && messageflag && taskflag) {
            alert('任务已接受！');
        }
        routerView("")
    }
}
//放弃任务
const rejectTask = () => {
    //返回到任务介绍页面
    routerTeskView("task", Number(props.id))
}

</script>
  
<style scoped>
@import '../assets/bask.css';

.task-button {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
  ../utils/apis../utils/apis@/pojos/TypeInclass../pojos/Typeimpl