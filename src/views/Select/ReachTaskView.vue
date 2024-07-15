<template>
    <div class="main">
      <!-- 分类卡片 -->
      <el-card class="card">
        <div class="type-card-header">
          <el-row>
            <el-col :span="12">
              <el-row v-for="(item, index) in alltypes" :key="index">
                <el-col :span="4">
                  <el-text class="category-title">{{ item?.[0] }}></el-text>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-link v-for="(t, i) in item?.[1]" :key="i" @click="selectBykey(t, 1)">
                      {{ t }}&nbsp;|&nbsp;
                    </el-link>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-card>
  
      <!-- 任务列表卡片 -->
      <el-card class="task-card">
        <div class="task-card-title">
          <el-row>
            <el-col :span="24">
              <el-row justify="center" gutter="20">
                <el-col :span="8" v-for="item in tasks" :key="item.id">
                  <el-card shadow="hover" @click="openTask(item.id)">
                    <el-image :src="item.imageUrl" fit="cover" style="height: 150px;"></el-image>
                    <el-text class="title">{{ item.name }}</el-text>
                    <el-text class="price" type="danger">{{ item.price }}￥</el-text>
                    <div class="footer-text">
                      <el-avatar size="small" :src="item.userIcon" @click="handleAvatarClick(item.id)"></el-avatar>
                      <el-text size="small" class="info">{{ item.userName }}</el-text>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-card>
  
      <!-- 分页组件 -->
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          v-model:current-page="currentPage"
          :total="100"
          :page-size="20"
          @current-change="selectBykey(type, currentPage)"
        />
      </div>
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
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.card {
  width: 80%;
  padding: 20px;
  background-color: #ffffff;
}

.type-card-header {
  padding: 10px;
}

.category-title {
  font-size: 15px;
  font-weight: bold;
}

.task-card {
  width: 80%;
  padding: 20px;
  background-color: #f9f9f9;
}

.task-card-title {
  padding: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.price {
  font-size: 14px;
}

.footer-text {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.info {
  margin-left: 5px;
  font-size: 12px;
  color: #f7f7f7;
}
</style>