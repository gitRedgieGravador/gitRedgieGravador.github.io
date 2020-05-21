import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Registration from '../views/registration.vue'
import NotFound from '../components/redgie/notfound.vue'
import Verify from '../components/redgie/verify'
import ForbiddenPage from '../components/redgie/ForbiddenPage'

export default [{
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/verify/:insertId',
        name: 'verify',
        component: Verify
    },
    {
        path: '/forbidden-page',
        name: 'forbidden-page',
        component: ForbiddenPage
    },
    {
        path: '*',
        name: 'notfound',
        component: NotFound
    }
]