import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Main from '../components/Main'
import Home from '../pages/home/Home'
import Ins from '../pages/ins/Ins'
import Submit from '../pages/Submit/Submit'
import Settings from '../pages/usersetting/Settings'
import SettingIndex from '../pages/usersetting/SettingIndex'
import AddressEdit from '../pages/usersetting/AddressEdit'
import registerOrLogin from '../pages/usersetting/registerOrLogin'

import Show from '../pages/show/Show'
const routes = [{
    path: '/main',
    name: 'main',
    component: Main,
    children: [{
            path: 'home',
            name: 'home',
            component: Home,
        },
        {
            path: 'ins',
            name: 'ins',
            component: Ins,
        }, {
            path: 'submit',
            name: 'submit',
            component: Submit
        }, {
            path: 'setting',
            name: 'setting',
            redirect: '/main/setting/index',
            component: Settings,
            children: [{
                path: 'index',
                name: 'index',
                component: SettingIndex
            }]
        }

    ]
}, {
    path: '/show',
    name: 'show',
    component: Show
}, {
    path: '/address',
    name: 'address',
    component: AddressEdit
}, {
    path: '/login',
    name: 'login',
    component: registerOrLogin
}, {
    path: '/',
    redirect: '/main/home'
}]
const router = new VueRouter({
    routes
})

export default router