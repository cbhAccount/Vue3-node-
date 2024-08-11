import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import ProductView from '../views/ProductView.vue'
import New from '../views/New.vue'

//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
    {
        //路由初始指向
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
      //路由初始指向
      path: '/news',
      name: 'NewsView',
      component: NewsView,
  },
    //动态路由
    {
        path: '/news/:id',
        name: 'New',
        component: New,
    },
  {
    //路由初始指向
    path: '/product',
    name: 'ProductView',
    component: ProductView,
}
]
 
const router = createRouter({
    history: createWebHistory(),
    hash: true,
    routes
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router