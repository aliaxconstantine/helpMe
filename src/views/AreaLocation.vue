<template>
  <div id="container" style="height: 1800px;width: 1500px;"></div>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref } from 'vue'
import { getLocationUserTasks } from '@/utils/utils';
import { errorLog } from '@/utils/axiosRequest';
import type { Task } from '@/utils/TypeInclass';
const props = defineProps({
  teskId: {
    type: String,
    required: true
  },
  publisherId: {
    type: String,
    required: true
  }
})

const map = ref()
const locations = ref(Array<Task>())

declare global {
  interface Window {
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
  }
}

const getLocationOfCUser = async () => {
  try {
    locations.value = await getLocationUserTasks(Number(props.publisherId), Number(props.teskId)) as Task[]
  } catch (error) {
    errorLog(error)
  }
}

window._AMapSecurityConfig = {
  securityJsCode: '4dfc0f4be660ab821cd8b992c174c22f',
};
AMapLoader.load({
  "key": "	943b2ee717d97fdbe7007ff300db16d9",          // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "",                                // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": [],                                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  "AMapUI": {                                         // 是否加载 AMapUI，缺省不加载
    "version": '',                               // AMapUI 缺省 1.1
    "plugins": [],                                   // 需要加载的 AMapUI ui插件
  },
  "Loca": {                                            // 是否加载 Loca， 缺省不加载
    "version": ''                              // Loca 版本，缺省 1.3.2
  },

}).then((AMap) => {
  map.value = new AMap.Map('container', {
    zoom: 11,
    viewMode: '3D',
    resizeEnable: true
  });

  map.value.clearMap()

  let Icon = new AMap.Icon({
      size: new AMap.Size(20, 35),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      imageSize: new AMap.Size(20, 35),
    });

  locations.value.forEach(location => {
    const marker = new AMap.Marker({
      icon: Icon,
      position: [location.x,location.y],
      offset: new AMap.Pixel(-13, -30)
    });

    map.value.add(marker)
  })

}).catch(error => {
  errorLog(error)
})

getLocationOfCUser()

</script>
  @/apis/axiosRequest@/utils/apis@/pojos/TypeInclass