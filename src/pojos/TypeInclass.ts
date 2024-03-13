

// 广告信息
export interface Advertisement {
  id?: number;
  description: string;
  imageUrl: string;
  data: Date;
}

// 通信信息
export interface Communication {
  id?: number;
  receiverUserId?: number;
  senderUserId?: number;
  content: string;
  data: string; 
}

// 好友
export interface Friend {
  userId?: number;
  friendId?: number;
  status: string;
  createTime: string; 
}

// 订单信息
export interface Orders {
  id?: string;
  customerId?: number;
  orderData: string; 
  productId?: number;
  unitPrice?: number;
  totalAmount: string;
  status: string;
}

// 退款记录
export interface RefundRecord {
  id?: number;
  orderId?: number;
  amount?: number;
  status: string;
  createdAt: string; 
  updatedAt: string; 
}



// 任务信息
export interface Task {
  id?: number;
  imageUrl: string;
  name: string;
  status: string;
  description: string;
  initiatorId?: number;
  assigneeId?: number;
  date: string; // 使用string类型表示日期
  comments?: number;
  type: string;
  x?: number;
  y?: number;
  progress: string;
  price?: number;
  userId?: number;
  userName?: string;
  userIcon?: string;
  distance?: number;
}

// 任务分类信息
export interface TaskCategory {
  id?: number;
  category: string;
  imageUrl: string;
  bigClass: string;
}

// 任务评论信息
export interface TaskMessage {
  id?: number;
  message: string;
  userId?: number;
  taskId?: number;
  state: string;
}

// 用户信息
export interface TUser {
  id?: number;
  loginName: string;
  nickName: string;
  password: string;
  email: string;
  achUrl: string;
  phone?: number;
}

// 用户信息(来自)
export interface UserFrom {
  userId?: number;
  icon: string;
  nickName: string;
}

// 登录表单
export interface LoginForm {
  phone: string;
  code: string;
  password: string;
}

//请求返回内容
export interface HttpResult {
  code: number;
  msg: string;
  data: object;
}

//注册表
export interface RegisterForm {
  loginName: string;
  nickName: string;
  password: string;
  email: string;
  achUrl: string;
  phone?: number;
}

//其他用户
export interface OtherUserFrom {
  id?: number;
  loginName: string;
  nickname: string;
  email: string;
  achUrl: string;
  accessTask: Task[];
  publishTask: Task[];
}
