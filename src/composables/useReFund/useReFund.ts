import { getRefundData } from "@/apis/apis";
import type { Order, RefundForm } from "@/pojos/Typeimpl";
import { onMounted, ref } from "vue";

export const useReFund = (orderId: string) => {
  const unPay = ref<RefundForm>();
  //判断订单是否在退款
  const getRefund = async(orderId: string) => {
    //获取退款数据
    //获取退款单
    const unOrder = (await getRefundData(orderId)) as RefundForm;
    if (unOrder) {
      unPay.value = unOrder;
    }
  };

  return {
    unPay,
    getRefund
  };
};
