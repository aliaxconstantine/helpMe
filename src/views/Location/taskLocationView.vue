<template>
    <div id="container" style="height: 300px;width: 450px;"></div>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }

})

const map = ref()

declare global {
    interface Window {
        _AMapSecurityConfig: {
            securityJsCode: string;
        };
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
        zooms: [3, 14],
        viewMode: '3D',
        resizeEnable: true
    });

    let Icon = new AMap.Icon({
        size: new AMap.Size(30, 35),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        imageSize: new AMap.Size(30, 35),
    });

    if (props.x != undefined && props.y != undefined) {
        const marker = new AMap.Marker({
            icon: Icon,
            position: [props.x, props.y],
            offset: new AMap.Pixel(-13, -30)
        })
        map.value.add(marker);
    }
    else {
        ElMessage.error("未知错误")
    }
})

</script>