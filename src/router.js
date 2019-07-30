import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/Login'
// import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 路由的 -> 组件懒加载
      component: () =>
            import('@/views/tabbar-layout'),
      children: [
        {
          path: '/',
          name: 'home',
          // 路由的 -> 组件懒加载
          component: () =>
                      import('@/views/Home')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      // 路由的 -> 组件懒加载
      component: () =>
      import('@/views/Login')
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   // 路由的 -> 组件懒加载
    //   component: () =>
    //         import('@/views/home')
    // }

  ]
})
