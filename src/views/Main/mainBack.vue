<script setup lang="ts">
import HeaderView from '@/views/Main/HeaderView.vue'
import { ref } from 'vue'
import TeskViewVue from '@/views/Task/TeskView.vue'
import AdvertisingViewVue from '@/views/Task/AdvertisingView.vue';
import FooterView from '@/views/Main/FooterView.vue'
const ismain = ref(true)
document.title = "主页"
</script>
<template>
  <Suspense>
    <HeaderView :ismain="true"></HeaderView>
  </Suspense>
  <RouterView :key="$route.fullPath"></RouterView>
  <FooterView></FooterView>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>