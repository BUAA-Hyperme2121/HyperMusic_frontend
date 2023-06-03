import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import ElementUI from "element-ui";
import "./assets/css/PageCss/Title.css"
import "./assets/css/PageCss/Layout.css"
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/iconfont/iconfont.css';
ElementUI.Dialog.props.lockScroll.default = false; //解决dialog遮罩层抖动问题
import "./assets/css/PageCss/Label.css";
// 挂载到vue原型链上
Vue.prototype.axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://8.130.12.73/api/'

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");