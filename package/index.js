
import Button from './button/index.js';
import Htmlpanel from './htmlpanel/index.js';
import Vuenote from './vuenote/index.js';
import Run from './run/index.js';
import Vuerun from './vuerun/index.js';
import Lodash from './lodash/index.js';
import NativeTool from './nativeTool/index.js';
import collapseTransition from './collapse-transition/collapse-transition.js';
import Message from './message/index.js';
import BreadCrumb from './breadCrumb/index'
import ModalMore from './ModalMore/index'
import PayPwd from './payPwd/index'

const components = [
  Vuerun,
  Vuenote,
  Htmlpanel,
  Run,
  NativeTool,
  Lodash,
  Button,
  BreadCrumb,
  ModalMore,
  PayPwd,
  collapseTransition,
]

const install = function(Vue) {
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$message = Message;
}

export default {
  install,
  NativeTool,
  Vuenote,
  Htmlpanel,
  Vuerun,
  Run,
  Lodash,
  Button,
  Message,
  BreadCrumb,
  ModalMore,
  PayPwd,
  collapseTransition,
}
