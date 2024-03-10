import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => {
    return {
      userId: 0,
      userName: "未登录",
      token: "",
      userImage: "",
      friendId: 0,
    };
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getToken: (state) => state.token,
    getUserImage: (state) => state.userImage,
    getFriendId: (state) => state.friendId,
  },
  actions: {},
  persist: {
    key: 'user'
  }
});
