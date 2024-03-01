<template>
    <div class="main">
        <Suspense>
            <HeaderView :ismain="false"></HeaderView>
        </Suspense>
        <div v-if="isPublish">
            <el-card class="acc-tesk" shadow="never">
                <div>
                    <div class="acc-teskMessage">
                        <div class="acc-taskTitle">
                            <el-text tag="b" class="acc-taskTitleText">任务信息</el-text>
                        </div>
                        <el-divider />
                        <div class="acc-taskInfo">
                            <div>
                                <div>
                                    <el-text tag="b">任务编号：</el-text>
                                    <el-text>{{ task?.id }}</el-text>
                                </div>
                                <div>
                                    <el-text tag="b">任务名称：</el-text>
                                    <el-text>{{ task?.name }}</el-text>
                                </div>
                                <div>
                                    <el-text tag="b">任务描述：</el-text>
                                    <el-text>{{ task?.description }}</el-text>
                                </div>
                            </div>
                            <div>
                                <el-image>
                                    <img :src="task?.imageUrl" alt="任务图片" />
                                </el-image>
                            </div>
                        </div>
                        <el-divider />
                        <div class="acc-taskTitle">
                            <el-text tag="b" class="acc-taskTitleText">任务时间</el-text>
                        </div>
                        <el-divider />
                        <div class="acc-taskContent">
                            <div>
                                <el-text tag="b">任务创建时间：</el-text>
                                <el-text>{{ formatToYMDHM(taskTime?.createTime) }}</el-text>
                            </div>
                            <div>
                                <el-text tag="b">任务截止时间：</el-text>
                                <el-text>{{ formatToYMDHM(taskTime?.dueTime) }}</el-text>
                            </div>
                        </div>
                        <el-divider />
                    </div>
                    <div class="acc-userInfo">
                        <el-card shadow="never">
                            <el-avatar :src="publish?.achUrl" @click="handleAvatarClick(task?.assigneeId)"></el-avatar>
                            <el-text tag="b">承接者</el-text>
                            <el-text>{{ publish?.nickname }}</el-text>
                            <el-button @click="callPublisher(Number(task?.assigneeId))">联系承接者</el-button>
                        </el-card>
                    </div>
                </div>
                <div class="acc-teskState" shadow="never">
                    <div>
                        <el-text tag="b">任务状态：</el-text>
                        <el-text>{{ getType(Number(task?.status)) }}</el-text>
                    </div>
                    <div>
                        <el-text tag="b">当前完成进度</el-text>
                        <picturdLoadView :pictures="getPrgress()"></picturdLoadView>
                    </div>
                    <el-button @click="confirmTask">确认任务完成</el-button>
                </div>
            </el-card>
        </div>
        <div v-else>
            <el-card class="acc-tesk" shadow="never">
                <div>
                    <div class="acc-teskMessage">
                        <div class="acc-taskTitle">
                            <el-text tag="b" class="acc-taskTitleText">任务信息</el-text>
                        </div>
                        <el-divider />
                        <div class="acc-taskInfo">
                            <div>
                                <div>
                                    <el-text tag="b">任务编号：</el-text>
                                    <el-text>{{ task?.id }}</el-text>
                                </div>
                                <div>
                                    <el-text tag="b">任务名称：</el-text>
                                    <el-text>{{ task?.name }}</el-text>
                                </div>
                                <div>
                                    <el-text tag="b">任务描述：</el-text>
                                    <el-text>{{ task?.description }}</el-text>
                                </div>
                            </div>
                            <div>
                                <el-image>
                                    <img :src="task?.imageUrl" alt="任务图片" />
                                </el-image>
                            </div>
                        </div>
                        <el-divider />
                        <div class="acc-taskTitle">
                            <el-text tag="b" class="acc-taskTitleText">任务时间</el-text>
                        </div>
                        <el-divider />
                        <div class="acc-taskContent">
                            <div>
                                <el-text tag="b">任务创建时间：</el-text>
                                <el-text>{{ formatToYMDHM(taskTime?.createTime) }}</el-text>
                            </div>
                            <div>
                                <el-text tag="b">任务截止时间：</el-text>
                                <el-text>{{ formatToYMDHM(taskTime?.dueTime) }}</el-text>
                            </div>
                        </div>
                        <el-divider />
                    </div>
                    <div>
                        <el-card class="location-card">
                            <TaskLocationView v-if="task?.x != undefined && task?.y != undefined" :x="task?.x" :y="task?.y" />
                        </el-card>
                    </div>
                    <div class="acc-userInfo">
                        <el-card shadow="never">
                            <el-avatar :src="publish?.achUrl" @click="handleAvatarClick(task?.initiatorId)"></el-avatar>
                            <el-text tag="b">发布者：</el-text>
                            <el-text>{{ publish?.nickname }}</el-text>
                            <el-button @click="callPublisher(Number(task?.initiatorId))">联系发布者</el-button>
                        </el-card>
                    </div>
                </div>
                <div class="acc-teskState" shadow="never">
                    <div>
                        <el-text tag="b">任务状态：</el-text>
                        <el-text>{{ getType(Number(task?.status)) }}</el-text>
                    </div>
                    <div>
                        <el-text tag="b">上传完成图片</el-text>
                        <picturdLoadView :pictures="getPrgress()"></picturdLoadView>
                    </div>
                    <div>
                        <el-button type="primary" @click="uploadPictures">上传完成图片</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, onUnmounted } from 'vue';
import type { TUser, Task, OtherUserFrom } from '@/utils/TypeInclass';
import { getTask, getOtherUser, routerTeskView, getTypeTasks, getTaskTime, handleAvatarClick, submitTask } from '@/utils/utils';
import picturdLoadView from "../views/picture/pictureLoadView.vue"
import AreaLocation from './AreaLocation.vue';
import type { TaskItem, TaskTime } from '@/utils/Typeimpl';
import { userStore } from '@/utils/role';
import HeaderView from './HeaderView.vue';
import { getType, formatToYMDHM } from '@/utils/dataUtils'
import TaskLocationView from './taskLocationView.vue';
import router from '@/router';
const props = defineProps({
    teskid: {
        type: Number,
        required: true
    },
    isPublisher: {
        type: Number,
        required: true
    }
})

const task = ref<TaskItem>()
const isPublish = props.isPublisher === 1
const publish = ref<OtherUserFrom>()
const taskTime = ref<TaskTime>()

const callPublisher = (id: number) => {
    routerTeskView('/message', id)
}

const getPrgress = () => {
    if (task.value && task.value.progress) {
        const urls = task.value.progress.split(",").filter(item => {
            // 使用正则表达式匹配URL
            const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            return urlPattern.test(item);
        });
        return urls;
    } else {
        return [];
    }
}

const confirmTask = () => {
    //转换到付款界面
    
}

const uploadPictures = async () => {
    //上传图片
    if (task.value != null && task.value.id!= null)  {
        const flag = await submitTask(task.value.id, task.value.progress) as boolean
    }
    else {
        alert("未知错误")
    }
}



const init = async () => {
    task.value = await getTask(props.teskid) as Task
    if (task.value != null) {
        if (task.value.assigneeId != undefined && task.value.id != null) {
            publish.value = await getOtherUser(userStore().userId) as OtherUserFrom
            taskTime.value = await getTaskTime(task.value.id) as TaskTime
        }
    }
}
init()
</script>
<style scoped>
@import '../assets/bask.css';

.main {
    background-color: aliceblue;
}
</style>@/utils/apis@/pojos/TypeInclass@/pojos/Typeimpl