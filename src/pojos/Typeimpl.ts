import type {
  Advertisement,
  Communication,
  Friend,
  Orders,
  RefundRecord,
  Task,
  TaskCategory,
  TaskMessage,
  TUser,
  LoginForm,
  HttpResult,
  RegisterForm,
  OtherUserFrom,
} from "./TypeInclass";
export class Ad implements Advertisement {
  constructor(
    public id?: number,
    public description: string = "",
    public imageUrl: string = "",
    public data: Date = new Date()
  ) {}
}

export class Message implements Communication {
  constructor(
    public id?: number,
    public receiverUserId?: number,
    public senderUserId?: number,
    public content: string = "",
    public data: string = ""
  ) {}
}

export class FriendConnection implements Friend {
  constructor(
    public userId?: number,
    public friendId?: number,
    public status: string = "",
    public createTime: string = ""
  ) {}
}

export class Order implements Orders {
  constructor(
    public id?: number,
    public customerId?: number,
    public orderData: string = "",
    public productId?: number,
    public unitPrice?: number,
    public totalAmount: string = "",
    public status: string = ""
  ) {}
}

export class Refund implements RefundRecord {
  constructor(
    public id?: number,
    public orderId?: number,
    public amount?: number,
    public status: string = "",
    public createdAt: string = "",
    public updatedAt: string = ""
  ) {}
}

export class TaskItem implements Task {
  constructor(
    public id?: number,
    public imageUrl: string = "",
    public name: string = "",
    public status: string = "",
    public description: string = "",
    public initiatorId?: number,
    public assigneeId?: number,
    public date: string = "",
    public comments?: number,
    public type: string = "",
    public x?: number,
    public y?: number,
    public progress: string = "",
    public price?: number,
    public userId?: number,
    public userName?: string,
    public userIcon?: string,
    public distance?: number
  ) {}
}

export class TaskFrom {
  constructor(
    public imageUrl: string[] = [],
    public name: string = "",
    public status: string = "",
    public description: string = "",
    public type: string[] = [],
    public price: number = 0,
    public bigType: string = "",
    public dueTime: Date = new Date(),
    public x?: number,
    public y?: number
  ) {}
}

export class User implements TUser {
  constructor(
    public id?: number,
    public loginName: string = "",
    public nickName: string = "",
    public password: string = "",
    public email: string = "",
    public achUrl: string = "",
    public phone?: number
  ) {}
}

export class Login implements LoginForm {
  constructor(
    public phone: string = "",
    public code: string = "",
    public password: string = ""
  ) {}
}

export class HttpResponse implements HttpResult {
  constructor(
    public code: number = 200,
    public msg: string = "OK",
    public data: object = {}
  ) {}
}

export class Register implements RegisterForm {
  constructor(
    public loginName: string = "",
    public nickName: string = "",
    public password: string = "",
    public email: string = "",
    public achUrl: string = "",
    public phone?: number
  ) {}
}

export class OtherUser {
  constructor(
    public id?: number,
    public loginName: string = "",
    public nickname: string = "",
    public email: string = "",
    public achUrl: string = "",
    public userInfo?: UserInfo
  ) {}
}

export class areaM {
  public name: string;
  public x: number;
  public y: number;
  public ifSelect: boolean;
  constructor(name: string, x: number, y: number, ifSelect: boolean) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.ifSelect = ifSelect;
  }
}

export class UserInfo {
  constructor(
    public id?: number,
    public desc: string = "",
    public userId?: number,
    public sex: string = "",
    public workAddress: string = "",
    public createTime?: Date,
    public workType: string = ""
  ) {}
}

// 个人信息
export class UserInfoFrom {
  constructor(
    public userId?: number,
    public icon: string = "",
    public nickName: string = "",
    public userInfo?: UserInfo
  ) {}
}

export class UserStar {
  constructor(
    public id?: number,
    public taskId?: number,
    public userId?: number,
    public star?: number,
    public desc: string = "",
    public achUrl: string = "",
    public nickName: string = "",
    public taskUrl: String = "",
    public taskName?: string
  ) {}
}

export class TaskMessageImpl {
  constructor(
    public id?: number,
    public message: string = "",
    public userId?: number,
    public taskId?: number,
    public state?: number,
    public userName?: string,
    public userIcon?: string,
    public createTime?: string
  ) {}
}

export enum TaskEnum {
  TRUE = 1,
  FINISH = 2,
  UNFINISH = 3,
  PUBLISH = 4,
  FALSE = 5,
  PFINISH = 6,
  PUNFILSH = 7,
}

export class TaskTime {
  constructor(
    public id?: number,
    public createTime?: Date,
    public getTime?: Date,
    public finishTime?: Date,
    public dueTime?: Date,
    public taskId?: number
  ) {}
}

export class friendInfo {
  constructor(
    public id?: number,
    public userId?: number,
    public friendId?: number,
    public status: string = "",
    public createTime: string = "",
    public userName?: string,
    public userIcon?: string,
    public isSelected: boolean = false
  ) {}
}
export class TaskImages {
  constructor(
    public id?: number,
    public taskId?: number,
    public imageUrl?: string
  ) {}
}
