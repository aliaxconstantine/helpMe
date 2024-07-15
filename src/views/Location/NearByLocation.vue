<template>
    <div id="container" style="height: 800px;width: 1400px;"></div>

</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, ref } from 'vue'
import { getNearbyTasks } from '@/apis/apis'
import { userStore } from '@/stores/role';
import type { TaskFrom } from '@/pojos/Typeimpl';
import { routerTeskView } from '@/apis/routeApis';
import type { Task } from '@/pojos/TypeInclass';
const map = ref()
const isclose = ref(false)
const locationList = ref<Task[]>()
onMounted(async () => {
    locationList.value = await getNearbyTasks(1, userStore().location[0], userStore().location[1]) as Task[];
})


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

const showTaskDetails = () => {

}

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
    function showDetails(id: number) {
        routerTeskView('tesk', id)
    }

    //构建自定义信息窗体
    function createInfoWindow(title: string, id: number|undefined, content: string, price: number | undefined) {
        // 创建容器元素
        const container = document.createElement('div');
        container.className = 'container';
        container.style.backgroundColor = '#fff';

        // 创建任务窗口元素
        const taskWindow = document.createElement('div');
        taskWindow.className = 'task-window';
        taskWindow.style.width = '220px';
        taskWindow.style.height = '140px';
        taskWindow.style.padding = '20px';
        taskWindow.style.border = '2px solid #ccc';
        taskWindow.style.borderRadius = '8px';
        taskWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

        // 创建任务内容元素
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.style.display = 'flex';
        taskContent.style.alignItems = 'center';

        // 创建任务图标元素
        const taskIcon = document.createElement('div');
        taskIcon.className = 'task-icon';
        taskIcon.style.width = '50px';
        taskIcon.style.height = '50px';
        taskIcon.style.marginRight = '10px';

        const iconImg = document.createElement('img');
        iconImg.src = 'http://tpc.googlesyndication.com/simgad/5843493769827749134';
        iconImg.alt = 'Task Icon';
        iconImg.style.width = '100%';
        iconImg.style.height = '100%';
        taskIcon.appendChild(iconImg);

        // 创建任务信息元素
        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
        taskInfo.style.flex = '1';

        const titleDiv = document.createElement('div');
        titleDiv.style.backgroundColor = '#f0f0f0';
        titleDiv.style.padding = '5px';
        titleDiv.textContent = title;
        taskInfo.appendChild(titleDiv);

        const priceDiv = document.createElement('div');
        priceDiv.style.fontSize = '13px';
        priceDiv.style.color = '#ff0000';
        priceDiv.textContent = price + '￥';
        taskInfo.appendChild(priceDiv);

        const descriptionP = document.createElement('p');
        descriptionP.style.fontSize = '12px';
        descriptionP.style.height = '50px';
        descriptionP.style.overflowY = 'auto';
        descriptionP.textContent = content;
        taskInfo.appendChild(descriptionP);

        // 创建详情按钮
        const detailButton = document.createElement('button');
        detailButton.textContent = '详情';
        detailButton.style.backgroundColor = '#007bff';
        detailButton.style.color = '#fff';
        detailButton.style.border = 'none';
        detailButton.style.borderRadius = '4px';
        detailButton.style.padding = '5px 10px';
        detailButton.style.marginRight = '10px';
        detailButton.style.cursor = 'pointer';
        detailButton.onclick = function () {
            if(id!=undefined){
                showDetails(id);
            }
        };


        // 将所有元素组合起来
        taskContent.appendChild(taskIcon);
        taskContent.appendChild(taskInfo);
        taskWindow.appendChild(taskContent);
        container.appendChild(taskWindow);
        taskInfo.appendChild(detailButton);

        return container;
    }

    if (locationList.value != null) {
        locationList.value.forEach(element => {
            const marker = new AMap.Marker({
                icon: Icon,
                position: [element.x, element.y],
                offset: new AMap.Pixel(-13, -30)
            })
            var infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: createInfoWindow(element.name,element.id,element.description,element.price),
                offset: new AMap.Pixel(16, -45)
            });
            marker.on('click', () => {
                if (isclose.value) {
                    infoWindow.close();
                    isclose.value = false;
                    return;
                }
                infoWindow.open(map.value, marker.getPosition());
                isclose.value = true;
            });
            map.value.add(marker);
        });
    }
})

</script>