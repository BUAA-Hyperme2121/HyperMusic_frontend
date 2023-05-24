import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "./assets/css/PageCss/Title.css"
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/PageCss/Label.css";
import axios from 'axios'
// 挂载到vue原型链上
Vue.prototype.axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
