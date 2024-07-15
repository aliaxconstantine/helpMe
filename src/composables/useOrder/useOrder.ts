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
    if (order == undefined) {
      return false;
    }
    if (order.status == "已支付") {
      return true;
    }
    if (order.status == "未退款") {
      return true;
    } else {
      return false;
    }
  };
  const getOrderData = async () => {
    const order = (await getOrder(taskId)) as Order;
    if (order != undefined) {
      tOrder.value = order;
      isPay.value = isOrderPay(order);
    }
  };

  onMounted(() => {
    getOrderData();
  });

  return {
    tOrder,
    isPay,
    isOrderPay,
    getOrderData,
  };
};
