<script setup lang="ts">
import login from "../components/Login.vue"
</script>
<template>
    <div class="back">
        <login></login>
    </div>
</template>

<style scoped>
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("icons/login_background.png");
  background-size: 100%;
  background-repeat: no-repeat; 
  background-position: center; 
  background-attachment: fixed;
}

</style>