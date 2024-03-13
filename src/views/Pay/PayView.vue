<template>
    <div>
        <el-container>
            <el-header>
                <h1>订单详情</h1>
            </el-header>
            <el-main>
                <el-form :model="form" label-width="100px">
                    <el-form-item label="订单号">
                        <span>{{ task?.id }}</span>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-tag>{{ task?.status }}</el-tag>
                    </el-form-item>
                    <el-form-item label="订单详情">
                        {{ task?.description }}
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <span>¥{{ task?.price }}</span>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select v-model="form.paymentMethod" placeholder="请选择">
                            <el-option label="支付宝" value="alipay"></el-option>
                            <el-option label="微信支付" value="wechatpay"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitPayment">立即支付</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="支付结果" v-model="dialogVisible">
                    <el-col :sm="12" :lg="6" v-if="paymentSuccess">
                        <el-result icon="success" title="支付成功" sub-title="您已成功完成支付">
                            <template #extra>
                                <el-button type="primary" @click="handleBack">返回</el-button>
                            </template>
                        </el-result>
                    </el-col>
                    <el-col :sm="12" :lg="6" v-else>
                        <el-result icon="error" title="支付失败" sub-title="支付过程中出现问题，请重试">
                            <template #extra>
                                <el-button type="primary" @click="handleBack">返回</el-button>
                            </template>
                        </el-result>
                    </el-col>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { getTask, okTask, payOrder,getOrderData } from '@/apis/apis';
import { routerView } from '@/apis/routeApis';
import type { Task } from '@/pojos/TypeInclass';
import { TaskTime, Order, type TaskFrom } from '@/pojos/Typeimpl';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
//传入订单数据
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const task = ref<Task>();
const order = ref<Order>();
const time = ref<TaskTime>()
onMounted(async () => {
    console.log('订单详情', props.id);
    // 获取订单数据
    order.value = await getOrderData(props.id) as Order;
    // 这里可以添加获取订单数据的逻辑
    if (order.value.customerId) {
        task.value = await getTask(order.value.customerId) as Task;
    }
    //如果订单已经支付
    if (task.value && task.value.status === '已支付') {
        // 订单已经支付
        ElMessage.info('订单已支付，即将返回主页。');
        routerView('');
    }
});

const form = ref({
    paymentMethod: '',
});
const dialogVisible = ref(false);
const paymentSuccess = ref(true);

const submitPayment = async () => {
    // 模拟支付请求
    // 这里可以添加真实的支付逻辑
    if (order.value && order.value.id) {
        const flag = await payOrder(order.value.id.valueOf()) as boolean;
        if (flag) {
            // 支付成功
            dialogVisible.value = true;
        }
        else {
            // 支付失败
            paymentSuccess.value = false;
        }
    }
    else{
        ElMessage.error('请重试');
    }
};

const handleBack = () => {
    // 返回上一页
    // 这里可以添加返回上一页的逻辑
    // 模拟支付成功
    routerView("")
};

</script>