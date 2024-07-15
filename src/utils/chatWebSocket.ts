// 在Vue中使用，不需要可以去除以下引用
import { errorLog } from "@/apis/axiosRequest";
import { userStore } from "@/stores/role";
import {ref } from "vue";
export class ChatMessageForm {
  publishId: number; // 发布者ID
  sender: string; // 发送者的标识，比如用户名
  message: string; // 消息内容
  timestamp: Date ; // 消息发送的时间戳
  messageType: string; // 消息类型，比如"text"、"image"等
  targetId?: number; // 目标用户ID，用于私聊；如果为undefined，表示群发或广播

  constructor(
    publishId: number,
    sender: string,
    message: string,
    messageType: string,
    targetId?: number
  ) {
    this.publishId = publishId;
    this.sender = sender;
    this.message = message;
    this.timestamp = new Date();
    this.messageType = messageType;
    this.targetId = targetId;
  }
}

// 导出socket对象
export { socketconnect };
// 假设环境变量的类型已在 .env.d.ts 文件中声明
interface Socket {
  websock: WebSocket | null;
  ws_url: string | undefined;
  socket_open: boolean;
  hearbeat_timer: number | null;
  hearbeat_interval: number;
  is_reonnect: boolean;
  reconnect_count: number;
  reconnect_current: number;
  reconnect_timer: number | null;
  reconnect_interval: number;

  init: () => void;
  send: (data: any, callback?: () => void) => void;
  receive: (message: MessageEvent) => MessageEvent;
  heartbeat: () => void;
  reconnect: () => void;
  close: () => void;
}

const socketconnect: Socket = {
  websock: null,
  ws_url: "",
  socket_open: false,
  hearbeat_timer: null,
  hearbeat_interval: 5000,
  is_reonnect: true,
  reconnect_count: 3,
  reconnect_current: 1,
  reconnect_timer: null,
  reconnect_interval: 3000,

  init: function () {
    if (!("WebSocket" in window)) {
      errorLog("浏览器不支持WebSocket");
      return;
    }

    if (this.websock) {
      return;
    }

    if (!this.ws_url) {
      errorLog("WebSocket URL未定义");
      return;
    }

    this.websock = new WebSocket(this.ws_url);
    this.websock.onopen = () => {
      this.socket_open = true;
      this.is_reonnect = true;
      this.heartbeat();
    };
  },

  heartbeat: function () {
    if (this.hearbeat_timer !== null) {
      clearInterval(this.hearbeat_timer);
    }
    this.hearbeat_timer = window.setInterval(() => {
      if (this.websock && this.socket_open) {
        // 发送心跳消息的逻辑，例如：
        this.websock.send("ping");
      }
    }, this.hearbeat_interval);
  },

  reconnect: function () {
    errorLog("尝试重连...");
    this.init();
  },

  send: function (
    data: any,
    callback: () => void = () => {}
  ) {
    //发送消息
    if (!this.websock) {
      errorLog("WebSocket未初始化");
      return;
    }

    switch (this.websock.readyState) {
      case WebSocket.OPEN:
        console.log("WebSocket已连接");
        console.log(data);
        this.websock.send(JSON.stringify(data));
        callback();
        break;
      case WebSocket.CONNECTING:
        console.log("WebSocket已连接");
        console.log(data);
        setTimeout(() => {
          this.send(data, callback);
        }, 1000);
        break;
      default:
        this.init();
        setTimeout(() => {
          this.send(data, callback);
        }, 1000);
        break;
    }
  },

  receive: function (e:MessageEvent) {
    return e;
  },

  // 之前的heartbeat方法...

  close: function () {
    errorLog("主动断开连接");
    if (this.hearbeat_timer !== null) {
      clearInterval(this.hearbeat_timer);
    }
    this.is_reonnect = false;
    if (this.websock) {
      this.websock.close();
    }
  },
};

export default socketconnect;
