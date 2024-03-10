import { ref, reactive, toRefs, onMounted, onUnmounted } from "vue";
import type { TUser, Task, OtherUserFrom } from "@/pojos/TypeInclass";
import {
  getTask,
  getOtherUser,
  getTypeTasks,
  getTaskTime,
  submitTask,
  getTasksImages,
} from "@/apis/apis";
import type { TaskImages, TaskItem, TaskTime } from "@/pojos/Typeimpl";
import { userStore } from "@/stores/role";
import { useOneTask } from "../useOneTask/useOneTask";

export const useUserTask = (taskId: number, isPublish: boolean) => {
  const task = ref<TaskItem>();
  const publish = ref<OtherUserFrom>();
  const taskTime = ref<TaskTime>();
  const submitTaskImage = ref<TaskImages[]>();

  const getTaskData = async () => {
    task.value = await getTask(taskId) as Task;
    taskTime.value = await getTaskTime(taskId) as TaskTime;
    submitTaskImage.value = await getTasksImages(taskId) as TaskImages[];
    if (task.value != null) {
      if (isPublish && task.value.assigneeId) {
        publish.value = (await getOtherUser(
          task.value.assigneeId
        )) as OtherUserFrom;
      }
      if (!isPublish && task.value.initiatorId ) {
        publish.value = (await getOtherUser(
          task.value.initiatorId
        )) as OtherUserFrom;
      }
    }
  };

  onMounted(async () => {
    await getTaskData();
  });

  return {
    task,
    publish,
    taskTime,
    submitTaskImage
  };
};
