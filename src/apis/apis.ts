import { type RegisterForm, type Task, type UserFrom } from "../pojos/TypeInclass";
import type { TaskFrom, TaskImages, UserInfo } from "../pojos/Typeimpl";
import { sendRequest, errorLog } from "./axiosRequest";
import { Message, TaskMessageImpl } from "../pojos/Typeimpl";
import axios, { type AxiosResponse } from "axios";
/**
 * 注册用户
 * @param {RegisterForm} user - 用户信息
 * @returns {Promise<any>} 返回注册结果
 */
export const registerUser = async (user: RegisterForm) => {
  return sendRequest("POST", "/user/register", user);
};
/**
 * 添加好友
 * @param {number} userId - 用户ID
 * @returns {Promise<any>} 返回添加好友结果
 */
export const addFriend = async (userId: number) => {
  return await sendRequest("POST", `/user/friends?otherUserId=${userId}`);
};
/** 
* 移除好友
 * @param {number} userId - 用户ID
 * @returns {Promise<any>} 返回删除结果
*/
export const removeFriend = async (userId: number) => {
  return await sendRequest("POST", `/user/defriend?otherUserId=${userId}`);
};
/**
 * 
 * 获取用户信息
 * @returns {Promise<any>} 返回用户信息
 */
export const getUserInfo = async () => {
  return await sendRequest("GET", "/user/me/info");
};
/**
 * 获取用户信息
 * @returns {Promise<any>} 返回好友列表
 */
export const getSelfInfo = async () => {
  return await sendRequest("GET", "/user/me");
};

/**
 * 获取用户自身接收的任务
 * @param {number} pageNum - 页码
 * @returns {Promise<any>} 返回任务列表
 */
export const getUserTasks = async (pageNum: number) => {
  return await sendRequest("GET", `/user/getAcceptedTasks?pageNum=${pageNum}`);
};
//获取用户发布的任务
export const getUserPublishedTasks = async (pageNum: number) => {
  return await sendRequest("GET", `/user/getPublishedTasks?pageNum=${pageNum}`);
};


/**
 * 删除任务
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回删除结果
 */
export const deleteTask = async (taskId: number) => {
  return await sendRequest("DELETE", `/task/${taskId}`);
};

/**
 * 获取其他用户资料
 * @param {number} userId - 用户ID
 * @returns {Promise<any>} 返回用户资料
 */
export const getOtherUser = async (userId: number) => {
  return await sendRequest("GET", `/user/other?otherId=${userId}`);
};


/**
 * 获取自己的评价
 * @returns {Promise<any>} 返回自己的评价
 */
export const getMyStars = async () => {
  return await sendRequest("GET", "/user/me/stars");
};

// 登录相关API

/**
 * 用户名密码获取token
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} code - 验证码
 * @returns {Promise<any>} 返回token
 */
export const loginGetToken = async (
  username: string,
  password: string,
  code: string
) => {
  return await sendRequest(
    "POST",
    `/userLogin?name=${username}&psd=${password}&code=${code}`
  );
};

/**
 * 手机号验证码获取token
 * @param {string} phone - 手机号
 * @param {string} code - 验证码
 * @returns {Promise<any>} 返回token
 */
export const loginGetTokenByPhone = async (phone: string, code: string) => {
  return await sendRequest("POST", `/phoneLogin?phone=${phone}&code=${code}`);
};

/**
 * 校验token是否有效
 * @param {string} token - token
 * @returns {Promise<boolean>} 返回校验结果
 */
export const validateToken = async (token: string) => {
  const result = await sendRequest("POST", `/Token/token?token=${token}`);
  return result;
};

/**
 * 获取验证码
 * @param {string} name - 用户名
 * @returns {Promise<string>} 返回验证码
 */
export const getVerificationCode = async (name: string) => {
  const code = await sendRequest("POST", `/user/pwdCode?name=${name}`);
  return code;
};

//获取全部回复字典
/**
 * 获取全部回复字典
 * @returns {Promise<string>} 返回全部回复字典
 */
export const getAllRecodeList = async () => {
  const result = await sendRequest("GET", "/chat/recode/all");
  return result;
};

//发送字典
/**
 * 发送字典
 * @param {number} recodeId - 字典ID
 * @returns {Promise<string>} 返回发送字典
 */
export const sendResetCode = async (recode: any) => {
  const result = await sendRequest("POST", `/chat/recode`,recode);
  return result;
};

/**
 * 完成任务
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回任务信息
 */
export const finishTask = async (taskId: number) => {
  return await sendRequest("POST", `/task/${taskId}/accept`);
};
/**
 * 获取任务列表
 * @param {number} pageNum - 页码
 * @returns {Promise<any>} 返回任务列表
 */
export const getPageTasks = async (pageNum: number) => {
  const data = await sendRequest("GET", `/task/tasks?pageNum=${pageNum}`);
  return data;
};

/**
 * 获取指定id的任务
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回任务信息
 */
export const getTask = async (taskId: number) => {
  return await sendRequest("GET", `/task/${taskId}`);
};

/**
 * 获取任务下的聊天记录
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回聊天记录
 */
export const getTaskChat = async (taskId: number) => {
  return await sendRequest("GET", `/task/${taskId}/chat`);
};

//获取符合任务类别的全部任务
/**
 * 获取符合任务类别的全部任务
 * @param {string} taskType - 任务类别
 * @returns {Promise<any>} 返回任务列表
 */
export const getTaskByCategory = async (taskType: string, pageNum: number) => {
  const res = await sendRequest(
    "GET",
    `/task/type?type=${taskType}&pageNum=${pageNum}`
  );
  return res;
};

//获取符合关键字的全部任务
/**
 * 获取符合关键字的全部任务
 * @param {string} keyword - 关键字
 * @returns {Promise<any>} 返回任务列表
 */
export const getTaskByKeyword = async (keyword: string, pageNum: number) => {
  const res = await sendRequest(
    "GET",
    `/task/key?taskType=${keyword}&pageNum=${pageNum}`
  );
  return res;
};

/**
 * 发起任务
 * @param {TaskFrom} task - 任务信息
 * @returns {Promise<boolean>} 发起任务结果
 */
export const sendTask = async (task: TaskFrom) => {
  return await sendRequest("POST", "/task/send", task);
};

/**
 * 发送任务消息
 * @param {number} taskId - 任务ID
 * @param {TaskMessageImpl} message - 任务消息
 * @returns {Promise<any>} 返回发送结果
 */
export const sendTaskMessage = async (
  taskId: number,
  message: TaskMessageImpl
) => {
  return await sendRequest("POST", `/task/${taskId}/conversation`, message);
};

/**
 * 获取用户方位附近的任务
 * @param {number} pageNum - 页码
 */
export const getLocationUserTasks = async (
  pageNum:Number =1,
) => {
  //获取用户位置

  return await sendRequest("GET", `/tasks?x=1&y=1&page=${pageNum}`);
};

/**
 * 获取任务时间
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回任务时间
 */
export const getTaskTime = async (taskId: number) => {
  return await sendRequest("GET", `/task/time?taskId=${taskId}`);
};

//更新任务
/**
 * 更新任务
 * @param {TaskFrom} task - 任务信息
 * @returns {Promise<boolean>} 更新任务结果
 */
export const updateTask = async (task: TaskFrom) => {
  return await sendRequest("POST", "/task/update", task);
};

//更新本人资料
/**
 * 更新本人资料
 * @param {UserFrom} user - 用户信息
 * @returns {Promise<boolean>} 更新结果
 */
export const updateInfoUser = async (user: UserFrom) => {
  return await sendRequest("POST", "/user/update", user);
};


//更新本人详细信息
/**
 * 更新本人详细信息
 * @param {UserInfo} user - 用户信息
 * @returns {Promise<boolean>} 更新结果
 */
export const updateDetailUser = async (user: UserInfo) => {
  return await sendRequest("POST", "/user/me/infoUpdate", user);
};

//修改密码
export const updatePassword = async (oldPassword: string, newPassword: string) => {
  return await sendRequest("POST", `/user/me/password?oldPassword=${oldPassword}&newPassword=${newPassword}`);
};
// 聊天相关API

/**
 * 获取好友消息
 * @param {number} friendId - 好友ID
 * @returns {Promise<any>} 返回好友消息
 */
export const getFriendMessages = async (friendId: number) => {
  return await sendRequest("GET", `/chat/${friendId.toString()}`);
};

/**
 * 获取好友列表
 * @returns {Promise<any>} 返回好友列表
 */
export const getFriends = async () => {
  return await sendRequest("GET", "/user/friends");
};

/**
 * 发送好友消息
 * @param {string} message - 消息内容
 * @param {number} userId - 用户ID
 * @returns {Promise<any>} 返回发送结果
 */
export const sendUserMessage = async (message: string, userId: number) => {
  return await sendRequest("POST", `/chat/send`, {
    message: message,
    id: userId,
  });
};

// 文件上传API

/**
 * 上传文件
 * @param {File} file - 文件对象
 * @returns {Promise<any>} 返回上传结果
 */
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const header = {
    "Content-Type": "multipart/form-data",
  };
  const res = await sendRequest("POST", `/upload/blog`, formData, header);
  return res;
};

//提交任务完成图片
/**
 * 提交任务完成图片
 * @param {number} id - 任务id
 * @param {string} img - 图片地址
 * @returns {Promise<any>} 返回上传结果
 */
export const submitTask = async (list: string[],taskId: number) => {
  const res = await sendRequest(
    "POST",
    `/task/progress?taskId=${taskId}`
    ,
    list,
  );
  return res;
};

//提交任务完成
export const okTask = async (taskId: number) => {
  const res = await sendRequest("POST", `/task/ok?taskId=${taskId}`);
  return res;
};

//支付订单
export const payOrder = async (id: string) => {
  const res = await sendRequest("POST", `/task/pay?orderId=${id}`);
  return res;
};

//退款
export const unpayOrder = async (id: string) => {
  const res = await sendRequest("POST", `/task/unPay?orderId=${id}`);
  return res;
};

//确认退款
export const refundOrder = async (id: string) => {
  const res = await sendRequest("POST", `/task/confirmRefund?refundId=${id}`);
  return res;
};

//获取退款单
export const getRefundData = async (id: string) => {
  const res = await sendRequest("GET", `/task/confirmRefund?orderId=${id}`);
  return res;
};

//获取订单数据
export const getOrderData = async (id: string) => {
  const res = await sendRequest("GET", `/task/pay?orderId=${id}`);
  return res;
};

//获取有没有该任务的订单
export const getOrder = async (id: string) => {
  const res = await sendRequest("GET", `/task/order?taskID=${id}`);
  return res;
};

/**
 * 获取全部任务标签
 * @returns {Promise<any>} 返回任务标签
 */
export const getTasksImages = async (id: number) => {
  const res = await sendRequest("GET", `/task/tasks/progress?taskId=${id}`);
  return res;
};

//获取全部任务标签
/**
 * 获取全部任务标签
 * @returns {Promise<any>} 返回任务标签
 */
export const getTaskTags = async () => {
  const res = await sendRequest("GET", `/taskCategory/all`);
  return res;
};

/**
 * 获取指定任务类型下的任务
 * @param {string} taskType - 任务类型
 * @returns {Promise<any>} 返回任务列表
 */
export const getTypeTasks = async (taskType: number,pageNum: number) => {
  const res = await sendRequest("GET", `/user/tasks?sortKey=${taskType}&pageNum=${pageNum}`);
  return res;
};

/**
 * 获取其他用户任务
 * @param {number} userId - 用户ID
 * @param {number} pageNum - 页码
 * @param {number} sortKey - 排序关键字
 * @returns {Promise<any>} 返回任务列表
 */
export const getOtherUserTasks = async (
  userId: number,
  pageNum: number,
  sortKey: number
) => {
  return await sendRequest("GET",`/user/other/tasks?otherId=${userId}&pageNum=${pageNum}&sortKey=${sortKey}`);
};

/**
 * 获取其他用户评价
 * @param {number} userId - 用户ID
 * @param {number} pageNum - 页码
 * @returns {Promise<any>} 返回评价列表
 */
export const getOtherUserStars = async (userId: number, pageNum: number) => {
  return await sendRequest("GET",`/user/other/star?otherId=${userId}&pageNum=${pageNum}`);
};

//上传头像
export const updateAavatar = async (file: string) => {
  return await sendRequest("POST", `/user/avatar?url=${file}`);
};

//给任务评价点赞
export const starTask = async (messageId: number) => {
  return await sendRequest("POST", `/taskMessage/star?messageId=${messageId}`);
};

//给任务取消点赞
export const cancelStarTask = async (messageId: number) => {
  return await sendRequest("DELETE", `/taskMessage/star?messageId=${messageId}`);
};

//查询任务点赞数
export const getMessageStar = async (messageId: number) => {
  return await sendRequest("GET", `/taskMessage/star?taskId=${messageId}`);
};

//获取任务评价点赞与否
export const getMessaegStarStatus = async (messageId: number) => {
  return await sendRequest("GET", `/taskMessage/star/status?messageId=${messageId}/status`);
};

//获取所有系统消息
export const getSystemMessages = async (pageNum: number) => {
  return await sendRequest("GET", `/smsg/all?pageNum=${pageNum}` );
};

//获取附近的任务
export const getNearbyTasks = async (pageNum:number,x:number,y:number) => {
  return await sendRequest("GET", `/task/tasks?x=${x}&y=${y}&pageNum=${pageNum}`);
};