import { getTask } from '@/apis/apis'
import { type Task } from "@/pojos/TypeInclass"
import { onMounted, ref } from 'vue';


export const useOneTask = (taskId:number = 0) => {
    const task = ref<Task[]>()

    const getTaskData = async(taskId:number) => {
        const data = await getTask(1) as Task[]
        task.value = data
        return task.value
    }

    onMounted(() => {
        getTaskData(taskId)
    })
    return {
       
    }
}