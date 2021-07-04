import Vue from 'vue'
import App from './App.vue'

/* eventBus */
import Bus from './eventBus'

/* 引入使用ElementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* 配置vue-router */
import VueRouter from 'vue-router'
import Index from './views/Index.vue'
import Article from './views/Article.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  mode:"hash",
  routes:[{
    path:'/', //路径
    component:Index //在router-view全局组件显示的组件
  },{
    path:'/article',
    component:Article
  }]
})

/* vuex实例 */
import store from './store/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Bus,
  render: h => h(App),
}).$mount('#app')
