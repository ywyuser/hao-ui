
import Vuenote from './src/vuenote.vue';
Vuenote.install = function (Vue) {
  Vue.component(Vuenote.name, Vuenote);
};

export default Vuenote;
