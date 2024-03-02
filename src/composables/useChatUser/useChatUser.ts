import type { TUser, Communication, Friend } from "@/pojos/TypeInclass";
import { friendInfo } from "@/pojos/Typeimpl";
import { getFriendMessages, getFriends, sendUserMessage } from "@/apis/apis";
import { errorLog } from "@/apis/axiosRequest";
import { userStore } from "@/stores/role";
import { ref, onMounted } from "vue";
//获取好友列表
export const useChatUserList = (userId: number) => {
  const chatUserList = ref(Array<friendInfo>());
  const getFriendList = async () => {
    chatUserList.value = (await getFriends()) as friendInfo[];
  };
  onMounted(() => getFriendList());
  return {
    chatUserList,
  };
};

//获取好友消息
export const useChatMessage = (userId: number) => {
    const chatList = ref(Array<Communication>())
    const getFriendMessage = async () => {
        chatList.value = (await getFriendMessages(userId)) as Communication[];
    };
    onMounted(getFriendMessage);
    return {
        chatList,
    };
};

