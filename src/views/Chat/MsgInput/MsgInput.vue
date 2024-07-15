<template>
    <div class="msg-input">
        <el-input size="large" placeholder="来聊点什么吧~" v-model="message" style="margin-left: 10px;" ></el-input>
        <el-button class="send-btn" size="large" type="primary"
            @click="sendMessage(message, userStore().friendId)"><el-icon size="large"><ChatSquare /></el-icon></el-button>
        <el-popover placement="bottom" :visible="openEnjoydrow"  trigger="click">
            <template #reference>
                <el-button circle @click="openEnjoydrow = !openEnjoydrow" size="large"  style="margin-right: 10px;" type="primary">😊</el-button>
            </template>
            <el-row :gutter="3">
                <el-col v-for="e in Emoji.emojis" :key="e[0]" :span="10">
                    <el-button @click="addEmoji(e[1])">{{ e[1] }}</el-button>
                </el-col>
            </el-row>
        </el-popover>
    </div>
</template>
<script lang="ts" setup>
import { errorLog } from "@/apis/axiosRequest";
import { userStore } from "@/stores/role";
import { onMounted, ref } from "vue";
import { Emoji } from './enjoy'
import { socketconnect, ChatMessageForm } from "@/utils/chatWebSocket";
const message = ref("")
const openEnjoydrow = ref(false)
const addEmoji = (e: string) => {
    message.value = message.value + e
    openEnjoydrow.value = false
}
const sendMessage = async (me: string, chatUserid: number | undefined) => {
    try {
        if (chatUserid != undefined) {

            const chat = new ChatMessageForm(
                userStore().userId,
                userStore().userName,
                me,
                "text",
                chatUserid
            )
            socketconnect.send(chat)
            message.value = ""
        }
    } catch (error) {
        errorLog(error)
    }
}

</script>
<style  scoped>
.msg-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.send-btn {
    margin-left: 12px;
}
</style>