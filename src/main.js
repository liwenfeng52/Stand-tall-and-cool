import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//animate
import 'animate.css'
// vant2组件
import Vant from 'vant'
import {
  Button,
  TabbarItem,
  Tabbar, Icon, Search, Tab, Tabs, Swipe,
  SwipeItem, Loading, CollapseItem, Collapse,
  Toast, Field, Form, NavBar, SwipeCell, Cell, Card, SubmitBar,
  Checkbox, Dialog, Popup
} from 'vant'
// bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"
// 标题名
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
//调用
Vue.use(Button).use(Tabbar)
  .use(TabbarItem).use(Icon)
  .use(Search).use(Tab).use(Tabs)
  .use(Swipe).use(SwipeItem).use(Loading)
  .use(CollapseItem).use(Collapse).use(Toast).use(Field).use(Form).use(NavBar).use(SwipeCell).use(Cell)
  .use(Card).use(SubmitBar).use(Checkbox).use(Dialog).use(Popup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
