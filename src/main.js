import Vue from 'vue'
import App from './App';
import router from './router'
import 'highlight.js/styles/color-brewer.css' //导入高亮样式
import './assets/styl/index.styl'; //导入基本样式
import demoBlock from './components/demo-block.vue'//高亮代码块组件

// 组件库
import '../package/theme-set/lib/index.css' //导入UI样式
import haoUI from '../package/index' // 导入ui组件
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
// 引入jshint用于实现js自动补全提示
import jshint from "jshint";
window.JSHINT = jshint.JSHINT;
// 引入代码编辑器
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
Vue.use(ElementUI);
Vue.use(codemirror);


Vue.component('demo-block', demoBlock)
Vue.use(haoUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  window.scrollTo({top: 0, behavior: "smooth"})
  next();
})
