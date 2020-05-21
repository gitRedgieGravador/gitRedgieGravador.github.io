import Dashboard from '../views/dashboard'
import ProductTable from '../components/adrian/productTable'
import AddProduct from '../components/lealyn/addProduct'
import UserTable from '../components/adrian/userTable'

export default [{
        path: '/admin',
        name: 'admin',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isCashier: false
        }
    },
    {
        path: '/admin/products',
        component: ProductTable,
        name: "productTable",
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isCashier: false
        }
    },
    {
        path: '/admin/editProduct',
        component: AddProduct,
        name: "editProduct",
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isCashier: false
        }
    },
    {
        path: '/admin/addproduct',
        name: 'addproduct',
        component: AddProduct,
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isCashier: false
        }
    },
    {
        path: '/admin/users',
        name: 'usertable',
        component: UserTable
    }
]