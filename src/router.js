import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import allorders from './views/allorders/delivery/delivery'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',//登录
            name: 'login',
            component: login
        },
        {
            path: '/',    //默认选择登录
            redirect: '/login'
        },
        {
            path: '/home/:id', //首页
            name: 'home',
            component: Home
        },
        {
            path: '/shop',//选择店铺
            name: 'shop',
            component: () => import('./views/shop.vue'),
        },
        {
            path: '/apply/:id',//申请提现
            name: 'apply',
            component: () => import('./views/apply.vue')
        },
        {
            path: '/allorders/:id',  //全部订单
            name: 'allorders',
            component: () => import('./views/allorders/allorders.vue'),
            children: [
                {
                    path: '/allorders/delivery/:supplierId',//已完成
                    name:'delivery',
                    component: () => import('./views/allorders/delivery/delivery.vue')
                },
                {
                    path: '/allorders/good/:supplierId',//待发货
                    name:'good',
                    component: () => import('./views/allorders/good/good.vue')
                },
                {
                    path: '/allorders/neworder/:supplierId',//新订单
                    name:'allneworder',
                    component: () => import('./views/allorders/neworder/neworder.vue')
                },
                {
                    path: '/allorders/reject/:supplierId',//已驳回
                    name:'reject',
                    component: () => import('./views/allorders/reject/reject.vue')
                },
                {
                    path: '/allorders/whole/:supplierId',//默认显示全部订单
                    name:'whole',
                    component: () => import('./views/allorders/whole/whole.vue')
                },

            ],
        },
        {
            path: '/orderlist',//订单详情
            name: 'orderlist',
            component: () => import('./views/orderlist.vue')
        },
        {
            path: '/record/:id',//提现记录
            name: 'record',
            component: () => import('./views/record.vue')
        },
        {
            path: '/detailsBal/:id',//余额明细
            name: 'detailsBal',
            component: () => import('./views/detailsBal.vue')
        },
        {
            path: '/neworder/:id',//新订单
            name: 'neworder',
            component: () => import('./views/neworder.vue')
        },
        {
            path: '/submit/:id',//提交成功
            name: 'submit',
            component: () => import('./views/submit.vue')
        },
        {
            path: '/Rejected',//已驳回
            name: 'Rejected',
            component: () => import('./views/Rejected.vue')
        },
        {
            path: '/PendingShipment/:id',//待发货
            name: 'PendingShipment',
            component: () => import('./views/PendingShipment.vue')
        },
        {
            path: '/Completed/:id',//已完成订单
            name: 'Completed',
            component: () => import('./views/Completed.vue')
        },
        {
            path: '/selfreporteddetails',//自提详情
            name: 'selfreporteddetails',
            component: () => import('./views/selfreporteddetails.vue')
        }


    ]
})
