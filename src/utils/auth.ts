import { type Commit} from 'vuex';
import { createStore } from 'vuex';
import {getFriends, getSelfInfo, loginGetToken} from '../apis/apis'
import { userStore } from '../stores/role';
import type { friendInfo } from '@/pojos/Typeimpl';
import socketconnect from './chatWebSocket';
import type { TUser, UserFrom } from '@/pojos/TypeInclass';
 
interface AuthState {
  isAuthenticated: boolean;
}

interface RootState {
  auth: AuthState;
}

interface LoginPayload {
  username: string;
  password: string;
  code:string
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
  login ({ commit }: { commit: Commit }, payload: LoginPayload): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout( async () => {
            try{const token = await loginGetToken(payload.username,payload.password,payload.code) as string; 
              if (token == null) {
                reject(false);
              }
              localStorage.setItem("token", token.toString());
              userStore().token = token;
              commit('SET_AUTHENTICATED', true);
              resolve(token.toString());
            }
            catch(e){
              reject(false);
            }
            //获取好友第一位id
            const fid = (await getFriends() as friendInfo[])[0];
            if(fid.friendId){
              userStore().friendId = fid.friendId;
            }
            const me = await getSelfInfo() as UserFrom;
            //获取自己的头像
            userStore().userImage = me.icon;
      }, 1000);
    });
  },

  logout({ commit }: { commit: Commit }) {
    commit('SET_AUTHENTICATED', false);
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

