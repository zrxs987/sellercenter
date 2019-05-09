import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 子菜单只在路由子菜单时出现。长度> = 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不总是设置show，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             名称由<keep-alive>(必须设置!!)使用
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  { path: '/authredirect',
   component: () => import('@/views/login/authredirect'),
    hidden: true },
  {
    path: '/forget',
    component: () => import('@/views/forget/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      hidden: true,
      meta: { title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  
  // 去开店
  {
    path: '/openShop',
    component: Layout,
    redirect: '/openShop',
    name: 'openShop',
    meta: { title: '开店申请', icon: 'component' },
    children: [
      {
        path: 'applyFor',
        name: 'applyFor',
        component: () => import('@/views/openShop/applyFor'),
        meta: { title: '去申请'}
      },
      {
        path: 'productType',
        name: 'ProductType',
        component: () => import('@/views/openShop/productType'),
        meta: { title: '选择产品类型',},
     
      },
      {
        path: 'foodCategory',
        name: 'foodCategory',
        component: () => import('@/views/openShop/foodCategory'),
        meta: { title: '提供厂家资料',},
      },
      {
        path: 'contract',
        name: 'contract',
        component: () => import('@/views/openShop/contract'),
        meta: { title: '上传合同',},
      },
      {
        path: 'shopSucceed',
        name: 'shopSucceed',
        component: () => import('@/views/openShop/shopSucceed'),
        meta: { title: '开店成功',},
      },
    ]
  },

//交易管理
  {
    path: '/dealManage',
    component: Layout,
    redirect: '/dealManage',
    name: 'dealManage',
    alwaysShow: true ,
    meta: {
      title: '交易管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'classify',
        component: () => import('@/views/dealManage/classify'),
        name: 'classify',
        meta: { title: '订单分类' },

      },
    ]
  },

//评价管理
  {
    path: '/evaluate',
    component: Layout,
    redirect: '/evaluate',
    name: 'evaluate',
    alwaysShow: true ,
    meta: {
      title: '评价管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'evaluateInfo',
        component: () => import('@/views/evaluate/evaluateInfo'),
        name: 'evaluateInfo',
        meta: { title: '评价信息' },
      },
    ]
  },

  // 结算管理
  {
    path:'/clearing',
    component:Layout,
    redirect:'/clearing',
    name:'clearing',
    alwaysShow:true,
    meta:{
      title:'结算管理',
      icon: 'money'
    },
    children: [
        {
        path:'blanketOrder',
        component: () => import('@/views/clearing/blanketOrder.vue'), 
        name: 'blanketOrder',
        meta: { title: '总完成订单' },
       } ,
        {
        path:'openOrder',
        component: () => import('@/views/clearing/openOrder.vue'), 
        name: 'openOrder',
        meta: { title: '已结算订单' },
       } ,
        {
        path:'openAccount',
        component: () => import('@/views/clearing/openAccount.vue'), 
        name: 'openAccount',
        meta: { title: '未结算订单' },
       } ,
        {
        path:'divideInto',
        component: () => import('@/views/clearing/divideInto.vue'), 
        name: 'divideInto',
        meta: { title: '分红统计' },
       } ,
    ]
  },

 //发货管理
 {
  path: '/deliverGoods',
  component: Layout,
  redirect: '/deliverGoods',
  name: 'deliverGoods',
  alwaysShow: true ,
  meta: {
    title: '发货管理',
    icon: 'international'
  },
  children: [
    {
      path: 'dropShipping',
      component: () => import('@/views/deliverGoods/dropShipping'),
      name: 'dropShipping',
      meta: { title: '待发货订单' },
    },
    {
      path: 'subscribe',
      component: () => import('@/views/deliverGoods/subscribe'),
      name: 'subscribe',
      meta: { title: '已预约订单' },
    },
    {
      path: 'booking',
      component: () => import('@/views/deliverGoods/booking'),
      name: 'booking',
      meta: { title: '一键预约' },
    },
  ]
},

 //退货管理
 {
  path: '/returnManagement',
  component: Layout,
  redirect: '/returnManagements',
  name: 'returnManagement',
  alwaysShow: true ,
  meta: {
    title: '退货管理',
    icon: 'guide'
  },
  children: [
    {
      path: 'exchangeGoods',
      component: () => import('@/views/returnManagement/exchangeGoods'),
      name: 'exchangeGoods',
      meta: { title: '换货订单' },
    },
    {
      path: 'salesReturn',
      component: () => import('@/views/returnManagement/salesReturn'),
      name: 'salesReturn',
      meta: { title: '退货订单' },
    },
  ]
},

 //商品管理
 {
  path: '/commodity',
  component: Layout,
  redirect: '/commodity',
  name: 'commodity',
  alwaysShow: true ,
  meta: {
    title: '商品管理',
    icon: 'theme'
  },
  children: [
    {
      path: 'commodityList',
      component: () => import('@/views/commodity/commodityList.vue'),
      name: 'commodityList',
      meta: { title: '商品列表' },
    },
    {
      path: 'issueCommodity',
      component: () => import('@/views/commodity/issueCommodity.vue'),
      name: 'issueCommodity',
      meta: { title: '发布商品' },
    },
  ]
},

 //秒杀管理
 {
  path: '/seckill',
  component: Layout,
  redirect: '/seckill',
  name: 'seckill',
  alwaysShow: true ,
  meta: {
    title: '秒杀管理',
    icon: 'size'
  },
  children: [
    {
      path: 'seckillList',
      component: () => import('@/views/seckill/seckillList.vue'),
      name: 'commodityLiist',
      meta: { title: '秒杀列表' },
    },
    {
      path: 'seckillCommodity',
      component: () => import('@/views/seckill/seckillCommodity.vue'),
      name: 'seckillCommodity',
      meta: { title: '发布商品' },
    },
  ]
},

 //团购管理
 {
  path: '/groupPurchase',
  component: Layout,
  redirect: '/groupPurchase',
  name: 'groupPurchase',
  alwaysShow: true ,
  meta: {
    title: '团购管理',
    icon: 'international'
  },
  children: [
    {
      path: 'purchaselList',
      component: () => import('@/views/groupPurchase/purchaselList.vue'),
      name: 'purchaseLiist',
      meta: { title: '团购列表' },
    },
    {
      path: 'purchaseCommodity',
      component: () => import('@/views/groupPurchase/purchaseCommodity.vue'),
      name: 'purchaseCommodity',
      meta: { title: '发布商品' },
    },
  ]
},

 //促销管理
 {
  path: '/salesPromotion',
  component: Layout,
  redirect: '/salesPromotion',
  name: 'salesPromotion',
  alwaysShow: true ,
  meta: {
    title: '促销管理',
    icon: 'bug'
  },
  children: [
    {
      path: 'salesPromotionList',
      component: () => import('@/views/salesPromotion/salesPromotionList.vue'),
      name: 'salesPromotionList',
      meta: { title: '促销列表' },
    },
  ]
},

 //优惠卷管理
 {
  path: '/discountCoupon',
  component: Layout,
  redirect: '/discountCoupon',
  name: 'discountCoupon',
  alwaysShow: true ,
  meta: {
    title: '优惠卷管理',
    icon: 'example'
  },
  children: [
    {
      path: 'discountCouponList',
      component: () => import('@/views/discountCoupon/discountCouponList.vue'),
      name: 'discountCouponList',
      meta: { title: '优惠卷列表' },
    },
  ]
},

 //数据中心
 {
  path: '/recordsCenter',
  component: Layout,
  redirect: '/recordsCenter',
  name: 'recordsCenter',
  alwaysShow: true ,
  meta: {
    title: '数据中心',
    icon: 'chart'
  },
  children: [
    {
      path: 'dailySales',
      component: () => import('@/views/recordsCenter/dailySales'),
      name: 'dailySales',
      meta: { title: '日销量统计' },
    },
    {
      path: 'weekSales',
      component: () => import('@/views/recordsCenter/weekSales'),
      name: 'weekSales',
      meta: { title: '周销量统计' },
    },
    {
      path: 'salesActivities',
      component: () => import('@/views/recordsCenter/salesActivities'),
      name: 'salesActivities',
      meta: { title: '活动销量统计' },
    },
  ]
},

 //个人信息
 {
  path: '/personalDetails',
  component: Layout,
  redirect: '/personalDetails',
  name: 'personalDetails',
  alwaysShow: true ,
  meta: {
    title: '个人信息',
    icon: 'user'
  },
  children: [
    {
      path: 'personalData',
      component: () => import('@/views/personalDetails/personalData'),
      name: 'personalData',
      meta: { title: '个人资料' },
    },
  ]
},

 //地址管理
 {
  path: '/locationManage',
  component: Layout,
  redirect: '/locationManage',
  name: 'locationManage',
  alwaysShow: true ,
  meta: {
    title: '地址管理',
    icon: 'link'
  },
  children: [
    {
      path: 'addLocation',
      component: () => import('@/views/locationManage/addLocation'),
      name: 'addLocation',
      meta: { title: '添加地址'},
    },
  ]
},

 //账户管理
 {
  path: '/account',
  component: Layout,
  redirect: '/account',
  name: 'account',
  alwaysShow: true ,
  meta: {
    title: '账户管理',
    icon: 'password'
  },
  children: [
    {
      path: 'securitySettings',
      component: () => import('@/views/account/securitySettings'),
      name: 'securitySettings',
      meta: { title: '安全设置'},
    },
    {
      path: 'bankAccount',
      component: () => import('@/views/account/bankAccount'),
      name: 'bankAccount',
      meta: { title: '银行账号'},
    },
  ]
},



// {
//   path: '/404',
//   component: () => import('@/views/404'),
//   hidden: true
// },
//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
