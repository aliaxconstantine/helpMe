<template>
    <div class="main">
        <el-card class="card">
            <div class="type-card-header">
                <el-text>分类</el-text>
                <el-col :span="24">
                    <el-row span="5" v-for="item in alltypes">
                        <el-space wrap :size="10" spacer=":">
                            <div class="card-item">
                                <el-text type="info" size="default">{{ item?.[0] }}</el-text>
                            </div>
                            <el-space wrap :size="20" spacer="|">
                                <el-row span="1" v-for="t in item?.[1]" class="type-row">
                                    <el-link @click="selectBykey(t, 1)" :underline="false">{{ t }}</el-link>
                                </el-row>
                            </el-space>
                        </el-space>
                    </el-row>
                </el-col>
            </div>
            <div class="task-card">
                <div class="task-card-title">
                    <el-row>
                        <el-col span="5" v-for="item in tasks" :key="item.id">
                            <el-card style="height: 250px; width: 300px;" v-if="tasks != undefined && tasks?.length > 0"
                                shadow="hover" @click="openTask(item.id)">
                                <el-image :src="item.imageUrl" fit="cover" style="width:200px;height:150px;"></el-image>
                                <div>
                                    <el-text class="title">{{ item.name }}</el-text>
                                </div>
                                <div><el-text class="price" type="danger" size="large">{{ item.price }}￥</el-text></div>

                                <div class="footer-text">
                                    <el-avatar size="small" :src="item?.userIcon"
                                        @click="handleAvatarClick(item?.id)"></el-avatar>
                                    <el-text size="small" class="info">{{ item.userName }}</el-text>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <div class="pagination">
                    <el-pagination layout="prev, pager, next" :default-page-size="1" v-model:current-page="currentPage"
                        :total="100" class="mt-4" :page-count="300" :page-size="20"
                        @current-change="selectBykey(type, currentPage)" />
                </div>
            </div>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { TaskItem } from "@/pojos/Typeimpl";
import { getTaskTags, getTaskByCategory, getTaskByKeyword } from "@/apis/apis";
import { routerTeskView, handleAvatarClick } from "@/apis/routeApis";
import type { TaskCategory } from "@/pojos/TypeInclass";
const props = defineProps({
    select: {
        type: String,
        default: 'all'
    }
})

const currentPage = ref(1)
const categories = ref<TaskCategory[]>()
const alltypes = ref<Map<string, string[]>>()
const tasks = ref<TaskItem[]>()
const type = ref<string>("all")
onMounted(async () => {
    try {
        categories.value = await getTaskTags() as TaskCategory[];
        if (props.select != 'all') {
            type.value = props.select;
            tasks.value = await getTaskByKeyword(type.value, 1) as TaskItem[];
        }
        else {
            tasks.value = await getTaskByCategory(props.select, 1) as TaskItem[];
        }
        alltypes.value = getAllTypes(categories.value)
    } catch (error) {
    }
}
)

const getAllTypes = (types: TaskCategory[]) => {
    const dict: Map<string, string[]> = new Map();
    types.forEach(t => {
        if (dict.has(t.bigClass)) {
            dict.get(t.bigClass)?.push(t.category);
        } else {
            dict.set(t.bigClass, [t.category]);
        }
    });
    return dict;
}

const openTask = (id: number | undefined) => {
    routerTeskView('tesk', id)
};


const selectBykey = async (key: string, num: number) => {
    type.value = key;
    tasks.value = await getTaskByKeyword(key, num) as TaskItem[];
}

</script>
  
<style scoped>
@import '../../assets/bask.css';

.card {
    width: 90%;
    height: 1500px;
}

.main {
    background-color: aliceblue;
    height: 1500px;
    display: flex;
    justify-content: center;
}

.card-item {
    margin-left: 10px;
}



.type-card-header {
    display: flex;
    flex-direction: column;
    height:150px;
}
.task-card {
    display: flex;
    width: 80%;
    height: 1300px;
    justify-content: center;
    align-items: center;
    position: relative; /* 添加相对定位，以便绝对定位子元素 */
}

.pagination {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.task-card-title {
    margin-top: 20px;
    position: absolute;
    left: 0;
    top: 0;
}

</style>
  @/utils/apis@/pojos/TypeInclass@/pojos/Typeimpl