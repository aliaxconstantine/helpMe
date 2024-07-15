<script setup lang="ts">
import { routerTeskView } from '@/apis/routeApis'
import { useTask } from '@/composables/useTask/useTask'
import { ref } from 'vue';
import NearByLocation from '../Location/NearByLocation.vue';
import ManagerView from '@/managerView/managerView.vue';
const { taskPageList, getIPageTasks } = useTask();
//广告图片
const categories = [
    {
        id: 1,
        imageUrl: 'https://img2.imgtp.com/2024/04/25/SiWi57gG.png',
    }
    , {
        id: 2,
        imageUrl: 'https://img2.imgtp.com/2024/04/25/6XqlKe2o.png',
    }
]

const ifNear = ref(false);
</script>
<template>
    <el-card shadow="never">
        <div class="class-center">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in categories" :key="item">
                    <el-image :src="item.imageUrl" style="width: 100%; height: 100%" fit="cover"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-card>
    <div style="display: flex; margin-left: 20px; margin-top: 20px;">
        <el-link style="margin-right: 20px; color: #333; text-decoration: none;" @click="ifNear = false">主页</el-link>
        <el-link style="color: #333; text-decoration: none;" @click="ifNear = true">附近</el-link>
    </div>

    <el-card shadow="never" v-if="!ifNear">
        <el-empty :image-size="200" v-if="taskPageList == undefined || taskPageList.length < 0" />
        <el-scrollbar height="1200px">
            <div class="orders-row">
                <el-card class="orders-card" v-for="item in taskPageList" :key="item.id" shadow="hover"
                    @click="routerTeskView('tesk', item.id)">
                    <el-container>
                        <el-main>
                            <el-image :src="item.imageUrl" style="width: 300px; height: 150px" fit="cover"></el-image>
                            <div><el-text class="title">{{ item.name }}</el-text></div>
                            <div><el-text class="price" type="danger" size="large">{{ item.price }}￥</el-text></div>
                        </el-main>
                        <el-footer>
                            <div class="footer-text">
                                <el-avatar :src="item.userIcon" size="small"></el-avatar>
                                <el-text size="small" class="info">{{ item.userName }}</el-text>
                            </div>
                        </el-footer>
                    </el-container>
                </el-card>
            </div>
        </el-scrollbar>
    </el-card>
    <el-card shadow="never" v-else>
        <NearByLocation></NearByLocation>
    </el-card>
</template>



<style scoped>
@import '../../assets/bask.css';
</style>