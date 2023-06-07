import Vue from "vue";
import componentLoading from "./loading.vue";

const comLoading = Vue.extend(componentLoading);

const instance = new comLoading({
  el: document.createElement("div"),
});

instance.show = false;
const loading = {
  show() {
    instance.show = true;
    document.body.appendChild(instance.$el);
  },
  hide() {
    instance.show = false;
  },
};
export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      },
    });
  },
};
