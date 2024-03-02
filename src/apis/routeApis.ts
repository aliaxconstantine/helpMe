import { router } from "../router/index";
import { sendRequest, errorLog } from "../apis/axiosRequest";
import { Message, TaskMessageImpl } from "../pojos/Typeimpl";
export const routerView = (name: string) => {
  try {
    router.push({
      path: `/${name}`,
    });
  } catch (error) {
    errorLog(error);
  }
};

export const routerIdView = async (id: number) => {
  try {
    await router.push({
      path: `/${id}`,
    });
  } catch (error) {
    errorLog(error);
  }
};

export const routerTeskView = async (name: string, id: number | undefined) => {
  try {
    await router.push({
      path: `/${name}/${id}`,
    });
  } catch (error) {
    errorLog(error);
  }
};

export const routerStringView = async (name: string, prop: string) => {
  try {
    await router.push({ path: `/${name}` });
  } catch (error) {
    errorLog(error);
  }
};

export const routerKeyView = async (name: string, key: string) => {
  try {
    await router.push({ path: `/${name}/${key}` });
  } catch (error) {
    errorLog(error);
  }
};

export const handleAvatarClick = async (uid: number | undefined) => {
  await router.push({ name: "other", params: { id: uid } });
};

export const routerUserTaskView = async (
  isPublish: number | undefined,
  id: number | undefined
) => {
  try {
    // 在你的组件中
    await router.push({
      name: "taskinfo",
      params: { id: id, isPublish: isPublish },
    });
  } catch (error) {
    errorLog(error);
  }
};
