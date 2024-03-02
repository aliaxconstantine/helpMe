import { ref, reactive, toRefs, onMounted, onUnmounted } from 'vue';
import type { TUser, Task, OtherUserFrom } from '@/pojos/TypeInclass';
import { getTask, getOtherUser, getTypeTasks, getTaskTime, submitTask } from '@/apis/apis';
import type { TaskItem, TaskTime } from '@/pojos/Typeimpl';
import { userStore } from '@/stores/role';
import { useOneTask } from '../useOneTask/useOneTask';


export const useUserTask = ( taskId: number ) => {
    const task = ref<TaskItem>()
    const publish = ref<OtherUserFrom>()
    const taskTime = ref<TaskTime>()
    task.value = useOneTask( taskId ) as Task

    const getTaskData = async () => {
        if (task.value != null) {
            if (task.value.assigneeId != undefined && task.value.id != null) {
                publish.value = await getOtherUser(userStore().userId) as OtherUserFrom
                taskTime.value = await getTaskTime(task.value.id) as TaskTime
            }
        }
    }
    
    onMounted( async () => {
        await getTaskData()
    })

    return {
        task,
        publish,
        taskTime,
    }
}



