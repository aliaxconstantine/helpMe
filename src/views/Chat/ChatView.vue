<template>
    <!--聊天框-->
    <div class="chat-box-back">
        <div class="chat-box-1">
            <FriendBox></FriendBox>
            <div class="chat-back">
                <ChatBox class="chat-box"></ChatBox>
                <MsgInput class="msg-input"></MsgInput>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ChatBox from './ChatBox/ChatBox.vue'
import FriendBox from './FriendBox/FriendBox.vue';
import MsgInput from './MsgInput/MsgInput.vue';
import socketconnect from '@/utils/chatWebSocket';

onMounted(() => {
    socketconnect.init();
}) 
</script>

<style scoped>
.chat-box-back {
    width: 100%;
    height: 100%;
    background-color: #2c2c2cfb;
}


.chat-box-1 {
    display: flex;
    justify-content: space-between;
    margin-left: 180px;
    width:80%
}

.chat-back {
    border: 1px solid #1576a67b;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 将子元素分别放在两边 */
    align-items: center;
    /* 垂直居中对齐 */
    background-color: #f1f1f1;
    /* 聊天框颜色 - 浅蓝色 */
    margin-top: 30px;
    margin-right: 30px;
    width: 76%;
    height: 90%;
}

.chat-box {
    width: 100%;
    height: 600px;
}

.msg-input {
    width: 100%;
    height: 120px;
    border-top: 1px solid #00000035;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}
</style>
