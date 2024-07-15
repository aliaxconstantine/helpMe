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
                                <el-image :src="task?.imageUrl"></el-image>
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
                        <el-carousel indicator-position="outside" style="width: 800px; height: 100%">
                            <el-carousel-item v-for="picture in pictures" :key="picture">
                                <el-image :src="picture"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <el-button @click="confirmTask" v-if="task?.status == '3'">确认任务完成</el-button>
                    <el-button @click="refund" v-if="isPay && !isOrderRefund(tOrder)">退款</el-button>
                    <el-text v-if="isOrderRefund(tOrder)">等待退款中</el-text>
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
                                <el-image :src="task?.imageUrl"></el-image>
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
                    <div v-if="task?.status == '3'">
                        <el-text tag="b">上传完成图片</el-text>
                        <pictureLoadView :pictures="pictures"></pictureLoadView>
                    </div>
                    <div v-else>
                        <el-text tag="b">当前完成进度</el-text>
                        <el-carousel indicator-position="outside" style="width: 800px; height: 100%">
                            <el-carousel-item v-for="picture in pictures" :key="picture">
                                <el-image :src="picture"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div>
                        <el-button type="primary" @click="okSTask" v-if="task?.status == '3'">提交进度</el-button>
                        <el-button v-if="isOrderRefund(tOrder)" @click="confirmRefund">确认退款</el-button>
                        <el-text v-if="isOrderRefund(tOrder)">等待退款中</el-text>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { okTask, submitTask, unpayOrder, refundOrder } from '@/apis/apis';
import { useUserTask } from '@/composables/useUserTask/useUserTask';
import { routerTeskView, handleAvatarClick, routerView } from '@/apis/routeApis';
import pictureLoadView from "@/views/Picture/pictureLoadView.vue"
import { getType, formatToYMDHM } from '@/utils/dataUtils'
import TaskLocationView from '@/views/Location/taskLocationView.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Order, RefundForm } from '@/pojos/Typeimpl';
import router from '@/router';
import { useOrder } from '@/composables/useOrder/useOrder';
import { useReFund } from '@/composables/useReFund/useReFund';
const props = defineProps({
    teskid: {
        type: Number,
        required: true
    },
})
const { task, taskTime, publish, pictures, isPublish } = useUserTask(props.teskid)
const { tOrder, isPay } = useOrder(props.teskid.toString());
const isOrderRefund = (order: Order | undefined) => {
    if (!order) {
        return false;
    }
    if (order.status === "未退款") {
        return true;
    }
    return false;
};



const callPublisher = (id: number) => {
    routerTeskView('/message', id)
}

const confirmTask = async () => {
    const flag = await okTask(props.teskid) as Order;
    if (flag) {
        //转换到付款界面
        router.push(`/pay/${flag.id}`);
    }
}

const okSTask = async () => {
    const flag = await submitTask(pictures.value, props.teskid) as boolean;
    if (flag) {
        //提交成功，返回主页
        ElMessage.success('提交成功');
        //返回主页
        routerView('');
    }
}
//发出退款请求
const refund = async () => {
    if (tOrder.value && tOrder.value.id) {
        const flag = await unpayOrder(tOrder.value.id.valueOf()) as RefundForm;
        if (flag) {
            //退款成功
            ElMessage.success('您已申请退款');
            //返回主页
            routerView('');
        }
    }
}

//确认退款
const confirmRefund = async () => {
    //提示退款成功
    ElMessageBox.confirm('确认退款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        if (tOrder.value && tOrder.value.id) {
            const { unPay,getRefund } = useReFund(tOrder.value.id.valueOf());
            await getRefund(tOrder.value.id.valueOf())
            if (unPay.value && unPay.value.id) {
                const flag = await refundOrder(unPay.value?.id) as RefundForm;
                console.log(flag);
                if (flag) {
                    //退款成功
                    ElMessage.success('退款成功');
                    //返回主页
                    routerView('');
                }
            }
        }
        else {
            ElMessage.error('退款失败');
        }
    }).catch(() => {
        //取消退款
        ElMessage.info('已取消退款');
    });
}

</script>
<style scoped>
@import '../../assets/bask.css';

.main {
    background-color: aliceblue;
}
</style>