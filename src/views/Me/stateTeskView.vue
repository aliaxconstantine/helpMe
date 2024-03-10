<template>
    <!-- 右侧任务展示 -->
    <el-tabs type="border-card" class="test-border" @tab-click="handleTabClick">
        <el-tab-pane label="发布任务">
            <el-empty :image-size="200" v-if="typeTesks.inItTesks.length < 1" />
            <el-card class="custom-card" @click="routerUserTaskView(1, tesk.id)" v-for="tesk in typeTesks.inItTesks"
                v-if="ifLoad">
                <el-text class="custom-title">{{ tesk.name }}</el-text>
                <div class="custom-publisher">
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    {{ tesk.initiatorId }}
                </div>
                <el-text class="custom-content">{{ tesk.description }}</el-text>
                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="接受任务">
            <el-empty :image-size="200" v-if="typeTesks.sendTesks.length < 1" />
            <el-card class="custom-card" @click="routerUserTaskView(1, tesk.id)" v-for="tesk in typeTesks.sendTesks"
                v-if="ifLoad">
                <el-text class="custom-title">{{ tesk.name }}</el-text>
                <div class="custom-publisher">
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    {{ tesk.initiatorId }}
                </div>
                <el-text class="custom-content">{{ tesk.description }}</el-text>
                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="未完成任务">
            <el-empty :image-size="200" v-if="typeTesks.IncompleteTasks.length < 1" />
            <el-card class="custom-card" @click="routerUserTaskView(0, tesk.id)" v-for="tesk in typeTesks.IncompleteTasks"
                v-if="ifLoad">
                <el-text class="custom-title">{{ tesk.name }}</el-text>
                <div class="custom-publisher">
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    {{ tesk.initiatorId }}
                </div>
                <el-text class="custom-content">{{ tesk.description }}</el-text>
                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="全部任务">
            <el-empty :image-size="200" v-if="typeTesks.publishTesks.length < 1" />
            <el-card class="custom-card" v-for="tesk in typeTesks.publishTesks" v-if="ifLoad"
                @click="routerUserTaskView(ifPublish(tesk), tesk.id)">
                <el-text class="custom-title">{{ tesk.name }}</el-text>
                <div class="custom-publisher">
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    {{ tesk.initiatorId }}
                </div>
                <el-text class="custom-content">{{ tesk.description }}</el-text>
                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { type TaskItem, TaskEnum } from '@/pojos/Typeimpl'
import { getTypeTasks, getTask, getUserTasks, getUserPublishedTasks, } from '@/apis/apis'
import { routerTeskView, routerUserTaskView } from '@/apis/routeApis'
import { userStore } from '@/stores/role'
import { errorLog } from '@/apis/axiosRequest'
import { type TabsPaneContext } from 'element-plus'
import { getType } from '@/utils/dataUtils'


const ifLoad = ref(false)
const selectedFilters = ref()
const selectedType = ref()
const handleTabClick = (tab: TabsPaneContext, event: Event) => {

}

const typeTesks = ref({
    completeTesks: Array<TaskItem>(),
    IncompleteTasks: Array<TaskItem>(),
    publishTesks: Array<TaskItem>(),
    sendTesks: Array<TaskItem>(),
    inItTesks: Array<TaskItem>(),
})


// 获取收藏任务
//const getFavoriteTasks = (async () => {
//    typeTesks.value.favoriteTesks = await getTypeTasks("favorite") as Task[]
//});

// 完成任务
const completeTask = (async (pageNum: number) => {
    typeTesks.value.completeTesks = await getTypeTasks(TaskEnum.FINISH, pageNum) as TaskItem[]
    console.log(typeTesks.value.completeTesks)
});

// 获取未完成任务
const getIncompleteTasks = async (pageNum: number) => {
    typeTesks.value.IncompleteTasks = await getTypeTasks(TaskEnum.UNFINISH, pageNum) as TaskItem[]
    console.log(typeTesks.value.IncompleteTasks)
};

//获取全部任务
const getAllTesk = async (pageNum: number) => {
    typeTesks.value.publishTesks = await getTypeTasks(TaskEnum.TRUE, pageNum) as TaskItem[]
    console.log(typeTesks.value.publishTesks)
}

//获取用户已接受的任务
const getSendTesk = async (pageNum: number) => {
    typeTesks.value.sendTesks = await getUserTasks(pageNum) as TaskItem[]
    console.log(typeTesks.value.sendTesks)
}

//获取用户发布的任务
const getPublishTesk = async (pageNum: number) => {
    typeTesks.value.inItTesks = await getUserPublishedTasks(pageNum) as TaskItem[]
    console.log(typeTesks.value.publishTesks)
}

const ifPublish = (task: TaskItem) => {
    const userId = userStore().userId
    if (task.initiatorId === userId) {
        return 1
    }
    if (task.assigneeId === userId) {
        return 0
    }
}

onMounted(async () => {
    try {
        completeTask(1);
        getIncompleteTasks(1);
        getAllTesk(1);
        getSendTesk(1);
        getPublishTesk(1);
        ifLoad.value = true
    } catch (error) {
        errorLog(error)
    }
}
)
</script>
<style scoped>
@import '../../assets/bask.css';
</style>
  @/apis/axiosRequest../utils/apis../pojos/Typeimpl@/stors/role