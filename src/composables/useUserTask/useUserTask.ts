import { ref, reactive, toRefs, onMounted, onUnmounted } from "vue";
import type { TUser, Task, OtherUserFrom } from "@/pojos/TypeInclass";
import {
  getTask,
  getOtherUser,
  getTaskTime,
  getTasksImages,
  getOrder,
  getRefundData,
} from "@/apis/apis";
import type { Order, TaskImages, TaskItem, TaskTime,RefundForm } from "@/pojos/Typeimpl";

export const useUserTask = (taskId: number, isPublish: boolean) => {
  const task = ref<TaskItem>();
  const publish = ref<OtherUserFrom>();
  const taskTime = ref<TaskTime>();
  const submitTaskImage = ref<TaskImages[]>();
  const pictures = ref<string[]>([]);

  const getTaskData = async () => {
    task.value = (await getTask(taskId)) as Task;
    taskTime.value = (await getTaskTime(taskId)) as TaskTime;
    submitTaskImage.value = (await getTasksImages(taskId)) as TaskImages[];
    if (task.value != null) {
      if (isPublish && task.value.assigneeId) {
        publish.value = (await getOtherUser(
          task.value.assigneeId
        )) as OtherUserFrom;
      }
      if (!isPublish && task.value.initiatorId) {
        publish.value = (await getOtherUser(
          task.value.initiatorId
        )) as OtherUserFrom;
      }
    }
  };

  const getImages = () => {
    if (submitTaskImage.value) {
      submitTaskImage.value.forEach((item) => {
        if (item.imageUrl) {
          pictures.value.push(item.imageUrl);
        }
      });
    }
  };
  
  onMounted(async () => {
    await getTaskData();
    getImages();
  });

  return {
    task,
    publish,
    taskTime,
    pictures,
  };
};
