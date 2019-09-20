import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
// const Login = () => import('../pages/Login/Login.vue')
// const Shop = () => import('../pages/Shop/Shop.vue')
// const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
// const ShopRating = () => import('../pages/Shop/ShopRating/ShopRating.vue')
// const ShopInfo = () => import('../pages/Shop/ShopInfo/ShopInfo.vue')
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: ShopGoods,
        },
        {
          path: '/shop/ratings',
          component: ShopRatings,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        }
      ]
    },
  ]
})