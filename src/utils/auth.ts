import { type Commit } from "vuex";
import { createStore } from "vuex";
import { getFriends, getSelfInfo, loginGetToken } from "../apis/apis";
import { userStore } from "../stores/role";
import type { friendInfo } from "@/pojos/Typeimpl";
import type { UserFrom } from "@/pojos/TypeInclass";
import { ElMessageBox } from "element-plus";
import axios from "axios";
import { ref } from "vue";

interface AuthState {
  isAuthenticated: boolean;
}

interface RootState {
  auth: AuthState;
}

interface LoginPayload {
  username: string;
  password: string;
  code: string;
}

const state: AuthState = {
  isAuthenticated: false,
};

const mutations = {
  SET_AUTHENTICATED(state: AuthState, isAuthenticated: boolean) {
    state.isAuthenticated = isAuthenticated;
  },
};

const actions = {
  login(
    { commit }: { commit: Commit },
    payload: LoginPayload
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const token = (await loginGetToken(
            payload.username,
            payload.password,
            payload.code
          )) as string;
          if (token == null) {
            reject(false);
          }
          localStorage.setItem("token", token.toString());
          userStore().token = token;
          commit("SET_AUTHENTICATED", true);
          resolve(token.toString());
          freshMe();
          //获取ip和地址编码
          getLocation()

        } catch (e) {
          reject(false);
        }
      }, 1000);
    });
  },

  logout({ commit }: { commit: Commit }) {
    commit("SET_AUTHENTICATED", false);
    localStorage.removeItem("token");
  },
};

const getters = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
};

export const store = createStore<RootState>({
  modules: {
    auth: {
      namespaced: true,
      state,
      mutations,
      actions,
      getters,
    },
  },
});

const freshMe = async () => {
  //获取好友第一位id
  const fid = (await getFriends()) as friendInfo[];
  if (fid.length > 0 && fid[0].friendId != undefined) {
    userStore().friendId = fid[0].friendId;
  }
  const me = (await getSelfInfo()) as UserFrom;
  if(me.userId != undefined){
    userStore().userId = me.userId;
    console.log(me.userId);
  }
  else{
    ElMessageBox.alert("请重新登录");
  }
  //获取自己的头像
  userStore().userImage = me.icon;
  //获取自己的的资料
  userStore().userName = me.nickName;
  console.log(me.nickName);
  if (me.userId != undefined) {
    //获取自己id
    userStore().userId = me.userId;
  }
  console.log("freshMe");
};


const getLocation = () => {
  //获取ip和地址编码
  const ip = ref("");
  axios.get("https://api.ipify.org/").then((res) => {
      ip.value = String(res.data)
  });
  //根据ip获取城市

  axios.get(`https://restapi.amap.com/v3/ip?ip=${ip.value}&output=xml&key=943b2ee717d97fdbe7007ff300db16d9`).then((res) =>{
      userStore().city = res.data.city
  })

  axios.get(`https://restapi.amap.com/v3/geocode/geo?address=${userStore().city}&key=943b2ee717d97fdbe7007ff300db16d9`).then((res) =>{
    userStore().location = res.data.geocodes[0].location
  })
};