<template>
    <el-scrollbar height="580px">
        <div class="chat-l-box" v-for="item in getThisChatList()">
            <div class="chat-self" v-if="item.senderUserId === Number(self.getUserId)">
                <div class="chat-self-content-box">
                    <el-text class="chat-self-name">{{ self.userName }}</el-text>
                    <el-text class="chat-self-other-content">{{ item.content }}</el-text>
                </div>
                <el-avatar :src="self.getUserImage" :size="30" />
            </div>
            <div class="chat-other" v-else>
                <el-avatar :src="getThisFriend()?.userIcon" :size="30" />
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
</style>@/views/Chat/useChat@/views/Chat/useChat