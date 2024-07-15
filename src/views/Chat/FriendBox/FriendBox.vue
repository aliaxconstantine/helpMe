<template>
    <div class="friend-box">
        <el-text class="all-friend">全部好友:{{ friendList.length }}</el-text>
        <el-scrollbar>
            <el-card shadow="hover" v-for="item in friendList"  :class="{ clicked: item.isSelected }"
                @click="setThisFriend(item.friendId)">
                <div class="friend-item">
                    <div>
                        <el-avatar :src="item.userIcon" size="large" class="friend-avatar"></el-avatar>
                    </div>
                    <div class="friend-info">
                        <el-text class="friend-name">{{ item.userName }}</el-text>
                        <div>
                            <el-text v-if="!isSelfMessage(item.friendId)">{{ item.userName }}:</el-text>
                            <el-text>{{ getMessageLast(item.friendId) }}</el-text>
                            <el-text>{{ getMessageData(item.friendId) }}</el-text>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import { useUserChat } from '@/views/Chat/useChat'
const { friendList, setThisFriend,friendChatList,isSelf} = useUserChat()
const getLastChatMessage = (id: number | undefined) => {
    if (id !== undefined) {
        const chatList = friendChatList.value.get(id);
        if (chatList && chatList.length > 0) {
            return chatList[chatList.length - 1];
        }
    }
    return null;
}

const isSelfMessage = (id: number | undefined): boolean => {
    const lastMessage = getLastChatMessage(id);
    if (lastMessage) {
        const messageSenderId = lastMessage.senderUserId;
        if (messageSenderId !== undefined) {
            return isSelf(messageSenderId); // Assuming isSelf returns boolean
        }
    }
    return true; // Default to true if no valid message or sender ID found
}

const getMessageLast = (id: number | undefined): string => {
    const lastMessage = getLastChatMessage(id);
    if (lastMessage) {
        return lastMessage.content;
    }
    return "";
}

const getMessageData = (id: number | undefined): string => {
    const lastMessage = getLastChatMessage(id);
    if (lastMessage) {
        return lastMessage.data;
    }
    return "刚刚";
}

</script>
<style scoped>
.friend-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #fdfcfc;
    border-radius: 10px;
    margin-top: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid #1576a67b;
}
.friend-item {
    display: flex !important;
    flex-direction: row;
    height: 30px;
    margin-right: 150px;
    margin-left: 9px;
    width: 95%;
    
}
.friend-info{
    display: flex !important;
    flex-direction: column;
    margin-top: -10px;
}

.clicked {
    background-color: rgb(153, 198, 240);
    /* 设置选中时的背景颜色 */
}

.all-friend {
    font-weight: 600;
    font-size: 16px;
    margin-right: 180px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.friend-name {
    margin-left: 3px;
    font-size: 17px;
    color: black !important;
}

.friend-avatar {
    margin-right: 5px;
    margin-top: -15px;
    border: 2px solid white;
}
</style>../useChat