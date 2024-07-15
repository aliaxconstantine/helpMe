import { onMounted, ref } from "vue";
import { userStore } from "@/stores/role";
import { getFriendMessages } from "@/apis/apis";
import socketconnect, { ChatMessageForm } from "@/utils/chatWebSocket";
import { getFriends } from "@/apis/apis";
import type { friendInfo } from "@/pojos/Typeimpl";

// 通信信息
export interface Communication {
  id?: number;
  receiverUserId?: number;
  senderUserId?: number;
  content: string;
  data: string;
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

export const useUserChat = () => {
  //所有用户聊天列表
  const friendChatList = ref<Map<number, Message[]>>(new Map()); //好友聊天列表
  const friendList = ref(Array<friendInfo>());
  const thisFriend = ref<friendInfo>();

  const setThisFriend = (id: number | undefined) => {
    if (id === undefined) {
      return;
    }
    userStore().friendId = id;
    const item = friendList.value.find(
      (item: friendInfo) => item.friendId == id
    );

    if (item) {
      thisFriend.value = item;
      item.isSelected = true;
      //其他变成未选中
      friendList.value.forEach((other: any) => {
        if (other.id !== item.id) {
          other.isSelected = false;
        }
      });
    }
  };

  //判断是否是给本人发消息
  const isSelf = (id: number) => {
    return id === userStore().userId;
  };

  const getInitChatlist = async () => {
    //获取所有消息记录，获取前20条
    friendList.value = (await getFriends()) as Array<friendInfo>;
    thisFriend.value = friendList.value.find(
      (item: friendInfo) => item.friendId == userStore().friendId
    );
    friendList.value.forEach(async (item: friendInfo) => {
      if (item.friendId) {
        const message = (await getFriendMessages(item.friendId)) as Message[];
        friendChatList.value.set(item.friendId, message);
      }
    });
    //选择
    setThisFriend(userStore().friendId);  
  };

  const addByFriend = (message: Message) => {
    if (!message.receiverUserId) {
      return;
    }
    if (friendChatList.value.has(message.receiverUserId)) {
     const list = friendChatList.value.get(message.receiverUserId);
     if(list){
      message.id = list.length + 1;
      list.push(message);
     }
    } else {
      message.id = 0;
      friendChatList.value.set(message.receiverUserId, [message]);
    }
  };

  const onMessageManger = () => {
    if (socketconnect.websock) {
      socketconnect.websock.onmessage = async (e) => {
        const data = JSON.parse(e.data) as ChatMessageForm;
        //将自己或者朋友的消息放入列表
        //如果是自己发的
        if(isSelf(data.publishId)){
          addByFriend(new Message(0, data.targetId, data.publishId, data.message, new Date().getTime().toString()));
        }
        //如果是发给自己的
        if (data.targetId && isSelf(data.targetId)) {
          addByFriend(new Message(0, data.targetId, data.publishId, data.message, new Date().getTime().toString()));
        }
      };
    }
  }
  const getThisChatList = () => {
    return friendChatList.value.get(userStore().friendId);
  };

  const getThisFriend = () => {
    return thisFriend.value;
  };

  onMounted(() => {
    getInitChatlist();
    onMessageManger();
  });

  return {
    friendList,
    friendChatList,
    thisFriend,
    addByFriend,
    onMessageManger,
    setThisFriend,
    getInitChatlist,
    getThisFriend,
    getThisChatList,
    isSelf
  }
};
