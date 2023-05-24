import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/iconfont/iconfont.css';
ElementUI.Dialog.props.lockScroll.default = false; //解决dialog遮罩层抖动问题
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");