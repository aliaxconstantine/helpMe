import { getFriendMessages, getPageTasks } from "@/apis/apis";
import { type Task } from "@/pojos/TypeInclass";
import { onMounted, ref } from "vue";
export const useTask = (pageNum: number = 1) => {
  const taskPageList = ref<Task[]>();
  const getFristPageData = async () => {
    const data = (await getPageTasks(1)) as Task[];
    taskPageList.value = data;
    return taskPageList.value;
  };
  onMounted(() => {
    getFristPageData();

  });


  return {
    taskPageList
  };
};
