<template>
  <div class="player-container" v-if="showVideo">
    <video ref="videoPlayer" class="video-player" controls></video>
    <div class="remote-video">
      <video ref="remoteVideoPlayer" class="remote-video-player" autoplay></video>
    </div>
    <video id="video" width="500px" height="500px"></video>
    <canvas id="canvas" width="500px" height="500px"></canvas>

    <el-button class="hang-up-button" @click="hangUp">挂断视频通话</el-button>
  </div>

  <div class="video-container" v-else>
    <div>
      <video id="video" width="500px" height="500px"></video>
      <canvas id="canvas" width="500px" height="500px"></canvas>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { onMounted } from 'vue';
const props = defineProps({
  showVideo: {
    type: Boolean,
    default: true,
  },
});

const showVideo = true; //是接通通话还是拨打通话
const webStocket = new WebSocket("ws://127.0.0.1:8080/ws");
const canvas = document.getElementById("canvas");

//连接成功后
webStocket.onopen = function (event) {
  //显示视频人像

};

//接收到消息
webStocket.onmessage = async function (event) {
  //切换视频人像

}

//连接关闭后
webStocket.onclose = function (event) {
  ElMessageBox.alert("视频通话结束");
}

var interval;

onMounted(() => {
  //显示视频通话页面
  interval = window.setInterval(function () {
    if (canvas != null) {

    }

  }, 60);
})

const hangUp = () => {
  //退出视频通话页面跳转到聊天页面
  webStocket.close();
}


</script>

<style scoped>
@import '../assets/bask.css';

.player-container {
  position: relative;
  background-color: black;
}

.video-player,
.remote-video-player {
  width: 100%;
  height: auto;
}

.remote-video {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 200px;
  height: auto;
}

.hang-up-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}
</style>