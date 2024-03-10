<script setup lang="ts">
import { routerTeskView } from '@/apis/routeApis'
import { useTask } from '@/composables/useTask/useTask'
import { ref } from 'vue';
const { taskPageList,getNearPageTasks,getIPageTasks} = useTask();
//广告图片
const categories = [
    {
        id: 1,
        imageUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    }
    , {
        id: 2,
        imageUrl: 'https://fuss10.elemecdn.com/0/3f/1978e4693ab0d38eed188f0974c0jpeg.jpeg',
    }
    , {
        id: 3,
        imageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda23648d74782486jpeg.jpeg',
    }
    , {
        id: 4,
        imageUrl: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    }
]


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
    <el-card shadow="never">
        <el-empty :image-size="200" v-if="taskPageList == undefined || taskPageList.length < 1" />
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
  

  
<style scoped>@import '../../assets/bask.css';</style>