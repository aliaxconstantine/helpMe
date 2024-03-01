<template>
    <Suspense>
        <el-container>
            <el-header>
                <HeaderView :ismain="false"></HeaderView>
            </el-header>
            <el-main>
                <el-card shadow="never" class="create-card">
                    <el-text tag="h2" style="display: flex; justify-content: center; align-items: center; font-size: 20px; ">新建任务</el-text>
                    <el-form :model="tesk" ref="form" label-width="100px" style="margin-top: 30px;">
                        <el-form-item label="名称：">
                            <el-input v-model="tesk.name" placeholder="情输入名称"></el-input>
                        </el-form-item>
                        <el-form-item label="分区：">
                            <el-select v-model="tesk.bigType" placeholder="请选择" style="width: 120px">
                                <el-option v-for="item in bigTypes" :key="item.name" :label="item.name"
                                    :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标签：">
                            <el-space>
                                <el-tag v-for="tag in tesk.type" :closable=true class="mx-1" @close="handleClose(tag)">
                                    {{ tag }}
                                </el-tag>
                            </el-space>
                            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1-w-20"
                                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" size="small" />
                            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                                + 新标签
                            </el-button>
                        </el-form-item>
                        <el-form-item label="描述：">
                            <el-input v-model="tesk.description" class="input-textarea" type="textarea" show-word-limit
                                maxlength="500"></el-input>
                        </el-form-item>
                        <el-form-item label="地点选择：">
                            <el-button v-if="!map.ifSelect" type="primary" @click="handleAreaSelect()">选择地点</el-button>
                            <el-button v-if="map.ifSelect" @click="handleAreaCancel()" type="primary">确认地点</el-button>
                            <SelectAreaViewVue v-if="isArea && map.name != undefined" :map="map"></SelectAreaViewVue>
                            <el-input v-model="map.name" class="area-input"></el-input>
                        </el-form-item>
                        <el-form-item label="设定酬劳">
                            <el-input v-model="tesk.price" style="width: 100px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="dataflag = !dataflag">设定期望完成时间</el-button>
                            <el-text type="info" tag="h2" >{{ tesk.dueTime }}</el-text>
                        </el-form-item>
                        <el-form-item label="图片：">
                            <picturdLoadView :pictures="tesk.imageUrl"></picturdLoadView>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="tesk != undefined" type="primary" @click="handleSubmit(tesk)">提交任务</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-dialog v-model="dataflag" title="期望时间"  :before-close="handleClose">
                    <el-calendar v-model="taskData" />
                    <el-button @click="dataOk(true)">确定</el-button>
                    <el-button @click="dataOk(false)">取消</el-button>
                </el-dialog>
            </el-main>
        </el-container>
    </Suspense>
</template>
<script setup lang="ts">
import HeaderView from './HeaderView.vue';
import { ref, type Ref, nextTick } from "vue"
import { sendTask } from "@/apis/apis"
import { userStore } from '@/utils/role';
import { ElInput, ElMessage } from 'element-plus'
import picturdLoadView from '@/views/Picture/pictureLoadView.vue'
import { TaskItem, TaskFrom, areaM } from '@/pojos/Typeimpl';
import SelectAreaViewVue from '@/views/Select/SelectAreaView.vue';
import { routerView } from '@/apis/routeApis';


const dataflag = ref(false)
const bigTypes = ref([
    { name: "日常杂务", value: "daily" },
    { name: "学习考试", value: "study" },
    { name: "工作事务", value: "work" },
    { name: "健康运动", value: "health" },
    { name: "出行旅游", value: "travel" },
    { name: "社交聚会", value: "social" },
    { name: "家居装修", value: "home" },
    { name: "娱乐休闲", value: "entertainment" },
    { name: "电子数码", value: "digital" }
]);


const inputValue = ref('')
const inputVisible = ref(false)
const isArea = ref(false)
const map = ref(new areaM("", 0, 0, false))
const taskData = ref<Date>(new Date()) 

const InputRef = ref<InstanceType<typeof ElInput>>()
const uStore = userStore()
const handleAreaSelect = () => {
    isArea.value = true
}

const dataOk = (flag: boolean) => {
    if (flag && tesk.value != undefined) {
        tesk.value.dueTime = taskData.value
    }
    dataflag.value =!dataflag.value
}

const handleSubmit = async (tesk: TaskFrom) => {
    if (uStore.userId != null) {
        const res = await sendTask(tesk)
        console.log(res)
        if (res) {
            ElMessage.success("提交成功")
            routerView('')
        }
    }
    else {
        ElMessage.success("提交失败")
    }
}
const tesk = ref<TaskFrom>(new TaskFrom());
const handleClose = (tag: string) => {
    tesk.value.type.push(tag);
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

//标签输入框结束后
const handleInputConfirm = () => {
    if (inputValue.value) {
        tesk.value.type.push(inputValue.value);
    }
    inputVisible.value = false
    inputValue.value = ''
}

const handleAreaCancel = () => {
    isArea.value = false
    map.value.ifSelect = false
    tesk.value.x = map.value.x
    tesk.value.y = map.value.y
}

</script>
<style scoped>
@import '../assets/bask.css';
</style>../utils/apis../utils/apis@/pojos/Typeimpl