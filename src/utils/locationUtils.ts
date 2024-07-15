import {ref} from "vue";
//高德地图获取用户所在城市地址编码
const geourl = "https://restapi.amap.com/v3/geocode/geo?parameters"
const ipurl = "https://restapi.amap.com/v3/ip?parameters"
const key = import.meta.env.VITE_KEY;
export const getCityCode = () => {
    const location = ref({
        x: 0,
        y: 0,
    })
    //ip定位
 
    //获取ip所在城市的地址编码


}

