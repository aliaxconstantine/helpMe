<script setup lang="ts">
import { routerTeskView } from '@/apis/routeApis'
import { useTask } from '@/composables/useTask/useTask'
const { taskPageList } = useTask();
</script>
<template>
    <el-card shadow="never">
        <div class="class-center">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in 4" :key="item">

                </el-carousel-item>
            </el-carousel>
        </div>
    </el-card>
    <el-card shadow="never">
        <el-scrollbar height="800px">
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
</template>
  

  
<style scoped>
@import '../../assets/bask.css';
</style>