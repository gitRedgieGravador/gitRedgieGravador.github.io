import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)
import RoutesCashier from './cashier'
import RoutesAdmin from './admin'
import RoutesAuth from './auth'
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...RoutesCashier,
        ...RoutesAdmin,
        ...RoutesAuth
    ]
})

router.beforeEach((to, from, next) => {
    const role = store.getters.user.role
    const isLogin = store.getters.isLogin
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (isLogin) {
            if (to.meta.isAdmin) {
                if (role == 'admin') next()
                else next({ name: "forbidden-page" });
            } else if (to.meta.isCashier) {
                if (role == 'cashier') next()
                else next({ name: "forbidden-page" });
            } else {
                next({ path: "/login" });
            }
        } else {
            next({ path: "/login" });
        }
    }
    next();
});

export default router;