
import Vuerun from './src/vuerun.vue';
Vuerun.install = function (Vue) {
  Vue.component(Vuerun.name, Vuerun);
};

export default Vuerun;
