<script setup lang="ts">
import { onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import socketconnect from './utils/chatWebSocket';
import { userStore } from './stores/role';
socketconnect.ws_url = import.meta.env.VITE_APP_WEBSOCKET_URL + `/${userStore().getUserId}`
console.log(socketconnect.ws_url)
//连接webSocket
socketconnect.init()
</script>
<template>
  <div class="wrapper">
    <RouterView></RouterView>
  </div>
</template>


<style>
body {
  margin: 0;
  padding: 0;
  border: 0
}
</style>
