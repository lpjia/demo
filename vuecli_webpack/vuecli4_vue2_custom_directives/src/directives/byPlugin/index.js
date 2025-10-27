import Vue from "vue";
import myPluginShow from "./my-plugin-show";

const install = function (Vue) {
  Vue.directive('my-plugin-show', myPluginShow)
}

myPluginShow.install = install

Vue.use(myPluginShow)