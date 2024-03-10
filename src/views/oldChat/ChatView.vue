<script setup lang="ts">
import { userStore } from '@/stores/role'
import { ref } from "vue"
import type { TUser, Communication, Friend } from "@/pojos/TypeInclass";
import { friendInfo } from "@/pojos/Typeimpl";
import { getFriendMessages, getFriends, sendUserMessage } from "@/apis/apis";
import { errorLog } from "@/apis/axiosRequest";
import { getTimeElapsedString } from "@/utils/dataUtils";
import { onMounted } from "vue";
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})
const selfUser = userStore()
const openEnjoydrow = ref(false)
const CUserId = ref<Number>(props.id)
const chat = ref<string>('')
const oldChatUser = ref<friendInfo>()
const chatUser = ref<friendInfo>()
const chatList = ref(Array<Communication>())
const chatUserList = ref(Array<friendInfo>())

const selectChatUser = async (user: friendInfo) => {
    try {
        CUserId.value = 0
        if (user.friendId != undefined && CUserId.value != undefined) {
            chatUser.value = user
            CUserId.value = user.friendId
            chatList.value = await getFriendMessages(user.friendId) as Communication[]
        }
    } catch (error) {
        errorLog(error)
    }
}

const sendMessage = async (message: string, chatUserid: number | undefined) => {
    try {
        if (chatUserid != undefined) {
            const flag = await sendUserMessage(message, chatUserid) as boolean
            if (flag) {
                const userid = CUserId.value as number
                chatList.value = await getFriendMessages(userid) as Communication[]
                chat.value = ""
            }
        }

    } catch (error) {
        errorLog(error)
    }
}
onMounted(async () => {
    try {
        CUserId.value = 0
        chatUserList.value = await getFriends() as friendInfo[]
        // 获取聊天信息
        if (props.id != 0 && props.id != undefined) {
            const chatFriend = chatUserList.value[props.id] as friendInfo // 修改变量名
            if (chatFriend.friendId != undefined && CUserId.value != undefined) {
                chatUser.value = chatFriend // 使用新变量名
                CUserId.value = chatFriend.friendId
                chatList.value = await getFriendMessages(chatFriend.friendId) as Communication[]
            }
        }
        if (chatUserList.value.length > 0) {
            const chatFriend = chatUserList.value[0] as friendInfo // 修改变量名
            if (chatFriend.friendId != undefined && CUserId.value != undefined) {
                chatUser.value = chatFriend // 使用新变量名
                CUserId.value = chatFriend.friendId
                chatList.value = await getFriendMessages(chatFriend.friendId) as Communication[]
            }
        }

    } catch (error) {
        errorLog(error)
    }
})

const isSelected = () => {
    if (chatUser.value == undefined) {
        return false
    }
    return CUserId.value == chatUser.value.friendId
}

const addEmoji = (e: string) => {
    chat.value = chat.value + e
    openEnjoydrow.value = false
}

</script>
<template>
    <el-card shadow="never" class="message-card">
        <el-container class="container">
            <div class="container-aside">
                <el-scrollbar>
                    <el-card v-for="u in chatUserList" @click="selectChatUser(u)" shadow="hover"
                        :class="[isSelected() ? 'chatUser-selected-card' : 'chatUser-card']">
                        <div class="selected-chatUser">
                            <el-avatar :src="u.userIcon" class="chatUser-image"></el-avatar>
                            <div class="chatUser-info">
                                <el-text class="chatUser-name">
                                    {{ u.userName }}
                                </el-text>
                                <el-text class="chatUser-message">
                                    {{ chatList[0]?.content }}
                                </el-text>
                            </div>
                        </div>
                    </el-card>
                </el-scrollbar>
            </div>

            <div class="container-main">
                <el-scrollbar>
                    <el-card class="main-card" shadow="never">
                        <div v-for="chat in chatList" class="chatMessage-card">
                            <!--如果是好友发送的消息-->
                            <div v-if="chat.senderUserId != selfUser.userId" class="chatMessage-left">
                                <div class="chatMessage-header">
                                    <div class="chatMessage-header-left">
                                        <el-avatar class="sender-image" :src="chatUser?.userIcon"></el-avatar>
                                        <el-text class="sender-name">{{ chatUser?.userName }}</el-text>
                                    </div>
                                    <el-text class="sender-time">{{ getTimeElapsedString(chat.data) }}</el-text>
                                </div>
                                <div class="sender-content">
                                    <el-text class="sender-message">{{ chat.content }}</el-text>
                                </div>
                            </div>
                             <!--如果是自己发送的消息-->
                            <div v-else class="chatMessage-right">
                                <div class="chatMessage-header">
                                    <div class="chatMessage-header-left">
                                        <el-avatar class="sender-image" :src="selfUser.userImage"></el-avatar>
                                        <el-text class="sender-name">{{ selfUser.userName }}</el-text>
                                    </div>
                                    <el-text class="sender-time">{{ getTimeElapsedString(chat.data) }}</el-text>
                                </div>
                                <div class="sender-content">
                                    <el-text class="sender-message">{{ chat.content }}</el-text>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-scrollbar>

                <el-scrollbar>
                    <el-card class="card-footer-message">
                        <el-popover placement="bottom" :visible="openEnjoydrow" :width="600" trigger="click">
                            <template #reference>
                                <el-button circle @click="openEnjoydrow = !openEnjoydrow">😊</el-button>
                            </template>
                            <el-row :gutter="3">

                            </el-row>
                        </el-popover> 
                        <el-input v-model="chat" type="textarea" class="message-input"
                            resize="none"></el-input>
                        <el-button class="card-send" type="primary" v-if="chat != undefined"
                            @click="sendMessage(chat, chatUser?.friendId)">发送</el-button>
                    </el-card>
                </el-scrollbar>
            </div>
        </el-container>
    </el-card>
</template>
  
<style scoped>
@import '../../assets/bask.css';
</style>@/apis/axiosRequest@/utils/apis@/pojos/TypeInclass@/pojos/Typeimpl@/stors/role