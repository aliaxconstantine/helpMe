<script setup lang="ts">
import { ElHeader } from 'element-plus';
import TeskViewVue from '@/views/TeskView.vue';
import HeaderView from '@/views/HeaderView.vue'
import { ref } from 'vue'
import { routerView } from '@/apis/routeApis';

const ismain = ref(true)
document.title = "主页"
</script>
<template>
  <body>
    <el-scrollbar height="1000px">
      <Suspense>
        <div class="main">
          <HeaderView :ismain="true"></HeaderView>
          <TeskViewVue :ismain="true"></TeskViewVue>
        </div>
      </Suspense>
    </el-scrollbar>

  </body>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.main {
  background-color: aliceblue;
  width: 100%;
  height: 100%;
}
</style>
../utils/apis