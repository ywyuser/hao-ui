
import Lodash from './src/lodash.vue';
Lodash.install = function (Vue) {
  Vue.component(Lodash.name, Lodash);
};

export default Lodash;
