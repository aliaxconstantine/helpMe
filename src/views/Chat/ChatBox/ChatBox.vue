<template>
    <el-scrollbar height="600px">
        <div class="chat-l-box" v-for="item in getThisChatList()">
            <div class="chat-self" v-if="item.senderUserId === Number(self.getUserId)">
                <div class="chat-self-content-box">
                    <el-text class="chat-self-name">{{ self.userName }}</el-text>
                    <el-text class="chat-self-other-content">{{ item.content }}</el-text>
                </div>
                <el-avatar  class="chat-avatar" :src="self.getUserImage" :size="40" />
            </div>
            <div class="chat-other" v-else>
                <el-avatar class="chat-avatar" :src="getThisFriend()?.userIcon" :size="40" />
                <div class="chat-content-box">
                    <el-text class="chat-name">{{ getThisFriend()?.userName }}</el-text>
                    <el-text class="chat-other-content">{{ item.content }}</el-text>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { userStore } from "@/stores/role";
import { ref } from "vue";
import { useUserChat } from "../useChat";
const self = userStore();
const {getThisFriend,getThisChatList} = useUserChat();
</script>

<style  scoped>
@import "./ChatBox.css";
.chat-avatar {
    margin-top: -25px;
}
</style>@/views/Chat/useChat@/views/Chat/useChat