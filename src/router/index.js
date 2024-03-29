import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  // 个人信息
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    children: [{
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: {
        title: '个人信息',
        icon: 'el-icon-info'
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 平台数据
  {
    path: '/platformData', // 路径
    component: Layout,
    redirect: '/platformData/userData', // 重定向
    name: 'PlatformData', // 元素名
    meta: {
      title: '平台数据', // 显示的名字
      icon: 'el-icon-s-data', // 图标
      roles: ['ROLE_admin']
    },
    children: [{ // 子项
      path: 'userData',
      name: 'UserData',
      component: () => import('@/views/platformData/userData/index'),
      meta: {
        title: '用户数据',
        icon: 'peoples'
      }
    },
    {
      path: 'articleData',
      name: 'ArticleData',
      component: () => import('@/views/platformData/articleData/index'),
      meta: {
        title: '文章数据',
        icon: 'el-icon-notebook-2'
      }
    }]
  },

  // 平台管理
  {
    path: '/platformManage',
    component: Layout,
    redirect: '/platformManage/userList',
    name: 'PlatformManage',
    meta: {
      title: '平台管理',
      icon: 'el-icon-menu',
      roles: ['ROLE_admin']
    },
    children: [{
      path: 'userList',
      name: 'UserList',
      component: () => import('@/views/platformManage/userList/index'),
      meta: {
        title: '用户列表',
        icon: 'el-icon-s-custom'
      }
    },
    {
      path: 'articleList',
      name: 'ArticleList',
      component: () => import('@/views/platformManage/articleList/index'),
      meta: {
        title: '文章列表',
        icon: 'el-icon-s-check'
      }
    }
    ]
  },

  // 文章数据
  {
    path: '/myArticleData',
    component: Layout,
    redirect: '/myArticleData',
    children: [{
      path: 'myArticleData',
      name: 'MyArticleData',
      component: () => import('@/views/myArticleData/index'),
      meta: {
        title: '文章数据',
        icon: 'el-icon-s-data',
        roles: ['ROLE_editor']
      }
    }]
  },

  // 编辑文章
  {
    path: '/editArticle',
    component: Layout,
    redirect: '/editArticle',
    children: [{
      path: 'editArticle',
      name: 'EditArticle',
      component: () => import('@/views/editArticle/index'),
      meta: {
        title: '编辑文章',
        icon: 'el-icon-menu',
        roles: ['ROLE_editor']
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
