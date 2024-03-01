<template>
  <div>
    <el-text> 搜索地点 </el-text>
    <el-input :v-model="props.map"> </el-input>
  </div>
  <div id="container" style="height: 800px;width: 800px;"></div>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref } from 'vue'
import{ areaM } from '../utils/Typeimpl'
import { ElMessage } from 'element-plus';
const map = ref()
declare global {
  interface Window {
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
  }
}

const props = defineProps({
    map: {
      type: areaM,
      required: true,
    }
  })


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


  const onClick = (e: any) => {
    const point = [e.lnglat.getLng(), e.lnglat.getLat()]

    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder()
      geocoder.getAddress(point, function (status: any, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          const address = result.regeocode.formattedAddress as string;
          ElMessage('您选择了：' + address)
          props.map.name = address
        }
        props.map.x = e.lnglat.getLng()
        props.map.y = e.lnglat.getLat()
        props.map.ifSelect = true
      })
    })


    let Icon = new AMap.Icon({
      size: new AMap.Size(20, 35),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      imageSize: new AMap.Size(20, 35),
    });


    const marker = new AMap.Marker({
      icon: Icon,
      position: point,
      offset: new AMap.Pixel(-13, -30)
    });
    map.value.clearMap()
    map.value.add(marker)

  }
  map.value.on('click', onClick);


}).catch(e => {

})


</script>
../pojos/Typeimpl