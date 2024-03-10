/// <reference types="vite/client" />
declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
  }
declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_WEBSOCKET_URL: string;
    VUE_APP_BACKEND_URL: string;
  }
}
