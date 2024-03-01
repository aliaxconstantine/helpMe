<template>
    <div>
        <el-container>
            <el-header>
                <h1>订单详情</h1>
            </el-header>
            <el-main>
                <el-form :model="form" label-width="100px">
                    <el-form-item label="订单号">
                        <span>123456789</span>
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <span>¥100.00</span>
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
                <el-dialog title="支付结果" :visible.sync="dialogVisible">
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
import { ref } from 'vue';
//传入订单数据
const props = defineProps({
    order: Object,
});


const form = ref({
    paymentMethod: '',
});
const dialogVisible = ref(false);
const paymentSuccess = ref(true);

const submitPayment = () => {
    // 模拟支付请求
    // 这里可以添加真实的支付逻辑
    // 模拟支付成功
    dialogVisible.value = true;
};

const handleBack = () => {
    // 返回上一页
    // 这里可以添加返回上一页的逻辑
    // 模拟支付成功
    
};

</script>