import { type Commit} from 'vuex';
import { createStore } from 'vuex';
import {loginGetToken} from '../apis/apis'
import { userStore } from '../stores/role';
 
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
