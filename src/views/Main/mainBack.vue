<script setup lang="ts">
import HeaderView from '@/views/Main/HeaderView.vue'
import { ref } from 'vue'
import FooterView from '@/views/Main/FooterView.vue'
import NearByLocation from '../Location/NearByLocation.vue';
const ismain = ref(true)
document.title = "主页"
</script>
<template>
  <Suspense>
    <HeaderView></HeaderView>
  </Suspense>
  <RouterView :key="$route.fullPath"></RouterView>
  <FooterView></FooterView>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>