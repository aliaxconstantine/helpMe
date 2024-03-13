import { getOrder } from "@/apis/apis";
import type { Order } from "@/pojos/Typeimpl";
import { ref, onMounted } from "vue";
export const useOrder = (taskId: string) => {
  const tOrder = ref<Order>();
  //是否已经支付过
  const isPay = ref(false);

  //判断订单是否已支付
  const isOrderPay = (order: Order | undefined) => {
    //如果为空
    if (!order) {
      return false;
    }
    if (order.status === "已支付") {
      return true;
    }
    if (order.status === "未退款") {
      return true;
    }
    return false;
  };
  const getOrderData = async () => {
    const order = (await getOrder(taskId)) as Order;
    tOrder.value = order;
  };

  onMounted(() => {
    getOrderData();
    if(isOrderPay(tOrder.value)){
        isPay.value = true;
    }
  });

  return {
    tOrder,
    isPay
  };
};
