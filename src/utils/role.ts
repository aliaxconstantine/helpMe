import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => {
    return {
      userId: 0,
      userName: "未登录",
      token: "",
      userImage: "",
    };
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getToken: (state) => state.token,
    getUserImage: (state) => state.userImage,
  },
  actions: {},
  persist: {
    key: 'user'
  }
});
