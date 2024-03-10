<template>
    <!--聊天框-->
    <div class="chat-box-back">
        <FriendBox></FriendBox>
        <div class="chat-back">
            <ChatBox class="chat-box"></ChatBox>
            <MsgInput class="msg-input"></MsgInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ChatBox from './ChatBox/ChatBox.vue'
import FriendBox from './FriendBox/FriendBox.vue';
import MsgInput from './MsgInput/MsgInput.vue';
import socketconnect from '@/utils/chatWebSocket';

onMounted(()=>{
    socketconnect.init();
}) 
</script>

<style scoped>
.chat-box-back {
    margin-left: 25px;
    height: 800px;
    width: 1400px;
    background-color: #f0f8ff;
    /* 背景色 - 淡蓝色 */
    display: flex;
    justify-content: space-between;
}

.chat-back {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 将子元素分别放在两边 */
    align-items: center;
    /* 垂直居中对齐 */
    background-color: #d3e9fa;
    /* 聊天框颜色 - 浅蓝色 */
    margin-top: 30px;
    margin-right: 30px;
    width: 76%;
    height: 90%;
}

.chat-box {
    width: 100%;
    height: 600px;
    border: 2px solid white;
}

.msg-input {
    width: 600px;
    height: 50px;
    margin-bottom: 30px;
}
</style>
