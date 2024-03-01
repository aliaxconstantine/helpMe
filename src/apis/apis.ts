import { type RegisterForm, type Task, type UserFrom } from "../pojos/TypeInclass";
import type { TaskFrom, UserInfo } from "../pojos/Typeimpl";
import { sendRequest, errorLog } from "./axiosRequest";
import { Message, TaskMessageImpl } from "../pojos/Typeimpl";
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
  return await sendRequest("DELETE", `/user/friends?otherUserId=${userId}`);
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
 * 获取用户自身任务
 * @param {number} pageNum - 页码
 * @returns {Promise<any>} 返回任务列表
 */
export const getUserTasks = async (pageNum: number) => {
  return await sendRequest("GET", `/user/getAcceptedTasks?pageNum=${pageNum}`);
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
 * @param {number} publisherId - 发布者ID
 * @param {number} taskId - 任务ID
 * @returns {Promise<any>} 返回任务信息
 */
export const getLocationUserTasks = async (
  publisherId: number,
  taskId: number
) => {
  return await sendRequest("GET", "/TeskPublisher ", { publisherId, taskId });
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
  return await sendRequest("POST", "/user/me/update", user);
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
export const submitTask = async (id: number, img: string) => {
  const res = await sendRequest(
    "POST",
    `/task/progress?taskId=${id}&progress=${img}`
  );
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