import axios, { type AxiosResponse } from "axios";
import type { HttpResult } from "../pojos/TypeInclass";
import { ElMessage } from "element-plus";
import { userStore } from "../stores/role";

export const errorLog = async (error: unknown) => {
   ElMessage.error(String(error));  
   console.error("错误信息" + error);
};

export const url = import.meta.env.VITE_APP_BACKEND_URL;

export const getResponse = async (response: AxiosResponse) => {
  return response.data;
};

//获取请求体
export const sendRequestAll = async (
  method: string,
  endpoint: string,
  data?: object,
  header?:object
): Promise<object | undefined> => {
  try {
    const headers: {
      "Content-Type": string;
      Authorization?: string;
      "X-CSRF-TOKEN"?: string,
      [key: string]: any;
    } = {
      "Content-Type": "application/json",
    };

    if (userStore().token !== "") {
       headers["Authorization"] = userStore().token;
    }
    const targetObject = Object.assign(headers, header);
    const response = await axios({
      method,
      url: url + endpoint,
      data,
      headers: targetObject,
    });

    if (response.status !== 200) {
      errorLog(response.statusText);
      return undefined;
    }
    const rs = response.data as HttpResult;
    if (rs.code !== 0) {
      errorLog(rs.msg);
      return undefined;
    }
    return rs;
  } catch (error) {
    errorLog(error);
    return undefined;
  }
};

//获取请求体
export const sendRequest = async (
  method: string,
  endpoint: string,
  data?: object,
  header?:object
): Promise<unknown | undefined> => {
  try {
    const response = await sendRequestAll(method, endpoint, data, header);
    if (response == undefined) {
      return undefined;
    } else {
      const result = response as HttpResult;

      return result.data;
    }
  } catch (error) {
    errorLog(error);
    return undefined;
  }
};
