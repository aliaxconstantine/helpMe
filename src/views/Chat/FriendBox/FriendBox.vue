<template>
    <div class="friend-box" height="400px">
        <el-text class="all-friend">全部好友:{{ friendList.length }}</el-text>
        <el-scrollbar>
            <el-card shadow="hover" v-for="item in friendList" class="friend-item" :class="{ clicked: item.isSelected }"
                @click="setThisFriend(item.friendId)">
                <el-avatar size="small" :src="item.userIcon" class="friend-avatar"></el-avatar>
                <el-text class="friend-name">{{ item.userName }}</el-text>
            </el-card>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import { useUserChat } from '@/views/Chat/useChat'
import type { friendInfo } from '@/pojos/Typeimpl';
const { friendList,setThisFriend } = useUserChat()

</script>
<style  scoped>
@import url('friendBox.css');
</style>../useChat