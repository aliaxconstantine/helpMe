<template>
    <div class="main">
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
                        
                        <el-image v-for="picture in pictures" :src="picture"></el-image>
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
                            <TaskLocationView v-if="task?.x != undefined && task?.y != undefined" :x="task?.x"
                                :y="task?.y" />
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
                        <picturdLoadView :pictures="pictures"></picturdLoadView>
                    </div>
                    <div>
                        <el-button type="primary" @click="okTask">提交进度</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { submitTask } from '@/apis/apis';
import { useUserTask } from '@/composables/useUserTask/useUserTask';
import { routerTeskView, handleAvatarClick, routerView } from '@/apis/routeApis';
import picturdLoadView from "@/views/picture/pictureLoadView.vue"
import { TaskImages } from "@/pojos/Typeimpl";
import { getType, formatToYMDHM } from '@/utils/dataUtils'
import TaskLocationView from '@/views/Location/taskLocationView.vue';
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { on } from 'events';
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

const isPublish = props.isPublisher === 1
const pictures = ref<string[]>([])
const { task, taskTime, publish, submitTaskImage } = useUserTask(props.teskid, props.isPublisher == 1)

onMounted(() => {
    if (submitTaskImage.value) {
        submitTaskImage.value.forEach((item) => {
            if (item.imageUrl) {
                pictures.value.push(item.imageUrl)
            }
        })
    }
})


const callPublisher = (id: number) => {
    routerTeskView('/message', id)
}

const getPrgress = () => {
    submitTaskImage.value?.forEach(
        (item) => {
            if (item.imageUrl) {
                pictures.value.push(item.imageUrl);
            }
        }
    )
    return pictures.value
}

const confirmTask = () => {
    //转换到付款界面

}

const okTask = async () => {
    const flag = await submitTask(pictures.value, props.teskid) as boolean;
    if (flag) {
        //提交成功，返回主页
        ElMessage.success('提交成功');
        //返回主页
        routerView('');
    }
}


</script>
<style scoped>
@import '../../assets/bask.css';

.main {
    background-color: aliceblue;
}
</style>