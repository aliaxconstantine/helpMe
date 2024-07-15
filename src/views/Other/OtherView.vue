<template>
    <div class="other-view">
        <div class="other-info">
            <el-card style="height: 100%; width: 80%;">
                <div class="other-info-card">
                    <el-card class="other-info-img">
                        <el-image fit="cover" :src="otherUser?.achUrl"></el-image>
                    </el-card>
                    <div class="other-info-info">
                        <el-text tag="h2" size="large">{{ otherUser?.nickname }}</el-text>
                        <div style="margin-top: 20px;"></div>
                        <div class="other-info-info-text">
                            <div style="margin-top: 5px;"></div>
                            <div>
                                <el-icon>
                                    <Suitcase />
                                </el-icon>
                                <el-text> &nbsp; {{ otherUser?.tuserInfo?.workType }}</el-text>
                            </div>
                            <div style="margin-top: 5px;"></div>
                        </div>
                    </div>
                    <div style="margin-top: 60px; margin-left: 100px;">
                        <el-text>简介:{{ otherUser?.tuserInfo?.desc }}</el-text>
                    </div>
                    <div>
                        <el-button v-if="isFriend == false" type="primary" @click="clickAddFriend">添加好友</el-button>
                        <el-button v-if="isFriend == true" type="primary"
                            @click="router.push(`/message/${otherUserId}`)"><el-icon>
                                <ChatRound />
                            </el-icon></el-button>
                        <el-button v-if="isFriend == true" type="danger" @click="clickDeFriend">移除好友</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="other-tesk">
            <el-card style="height: 100%; width: 80%;">
                <el-tabs type="border-card" style="width:100%;height:500px;">
                    <el-tab-pane label="评价">
                        <el-card shadow="never" v-for="star in stars" :key="star.id">
                            <div class="other-tesk-card">
                                <div>
                                    <el-card shadow="never">
                                        <el-image fit="cover" style="width: 100px; height: 100px;"
                                            :src="star.taskUrl"></el-image>
                                    </el-card>
                                    <el-text>{{ star.taskName }}</el-text>
                                </div>
                                <div style=" margin-top: 20px; margin-left: 100px;">
                                    <div class="other-tesk-card-user">
                                        <el-avatar size="small" :src="star.achUrl">头像</el-avatar>
                                        <el-text>{{ star.nickName }}</el-text>
                                    </div>
                                    <div>
                                        <el-rate v-model="value" disabled show-score text-color="#ff9900"
                                            score-template="{value} points" />
                                    </div>
                                    <div>
                                        <el-text>{{ star.desc }}</el-text>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="发布任务">
                        <el-card v-if="tasks.length > 0" v-for=" tesk in tasks " :key="tesk.id" shadow="hover"
                            class="custom-card" @click="router.push(`/taskInfo/${tesk.id}`)">
                            <div class="custom-card-content">
                                <el-text class="custom-title">{{ tesk.name }}</el-text>
                                <div class="custom-publisher">
                                    <el-icon>
                                        <user-filled />
                                    </el-icon>
                                    {{ tesk.assigneeId }}
                                </div>
                                <el-text class="custom-content">{{ tesk.description }}</el-text>
                                <el-text class="custom-status" id="status">{{ getType(Number(tesk.status)) }}</el-text>
                            </div>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { OtherUser, UserInfo, UserStar } from '@/pojos/Typeimpl'
import { type TaskItem, type friendInfo } from '@/pojos/Typeimpl';
import { ref } from "vue";
import { getType } from '@/utils/dataUtils';
import {  routerView, routerTeskView, } from '@/apis/routeApis';
import { getOtherUserTasks, getOtherUserStars, getOtherUser, addFriend, getFriends, removeFriend } from '@/apis/apis';
import { userStore } from '@/stores/role';
import { onMounted } from "vue";
import router from '@/router';
import type { Task } from '@/pojos/TypeInclass';
const props = defineProps({
    otherUserId: {
        type: Number,
        required: true
    }
})
const value = ref(2)

//是否是好友
const isFriend = ref<boolean>(false)

const otherUser = ref<OtherUser>()
const tasks = ref<TaskItem[]>([])
const stars = ref<UserStar[]>([])


const clickAddFriend = async () => {
    if (otherUser.value != null && otherUser.value.id != null) {
        //添加任务发起者为好友
        const friendflag = await addFriend(otherUser.value.id) as boolean;
        if (friendflag) {
            //添加成功
            alert("添加成功")
            isFriend.value = true
        } else {
            //添加失败
            alert("添加失败")
        }
    }
}

const clickDeFriend = async () => {
    if (otherUser.value != null && otherUser.value.id != null) {
        //移除任务发起者为好友
        const friendflag = await removeFriend(otherUser.value.id) as boolean;
        if (friendflag) {
            //添加成功
            alert("移除成功")
            isFriend.value = false
        }
    }
}

onMounted(async () => {
    const friendInfo = await getFriends() as friendInfo[]

    //检查如果是本人
    if (props.otherUserId == userStore().userId) {
        routerView('state')
    }
    //获取用户资料
    if (props.otherUserId != undefined && props.otherUserId != userStore().userId) {
        otherUser.value = await getOtherUser(props.otherUserId) as OtherUser
        if(otherUser.value.tuserInfo != undefined && otherUser.value.tuserInfo.desc == undefined){
            otherUser.value.tuserInfo.desc = "这家伙很懒，什么都没写"
        }
        tasks.value = await getOtherUserTasks(props.otherUserId, 1, 5) as Task[]
        console.log(tasks.value)
        stars.value = await getOtherUserStars(props.otherUserId, 1) as UserStar[]
    }
    //检查是不是好友
    friendInfo.forEach(friend => {
        if (friend.friendId === props.otherUserId) {
            //是好友
            isFriend.value = true
        }
    })
})



</script>
<style scoped>
@import '../../assets/bask.css';
</style>../utils/apis../pojos/Typeimpl../pojos/Typeimpl@/stors/role