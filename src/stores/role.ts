import { defineStore } from "pinia";
export const userStore = defineStore("user", {
  state: () => {
    return {
      userId: 0,
      userName: "未登录",
      token: "",
      userImage: "",
      friendId: 0,
      location: [116.482145,39.990039],
      city:"北京市"
    };
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getToken: (state) => state.token,
    getUserImage: (state) => state.userImage,
    getFriendId: (state) => state.friendId,
    getLocation: (state) => state.location,
    getCity: (state) => state.city
  },
  actions: {},
  persist: {
    key: 'user'
  }
});
