/* Cashier routes here */
import CashierDashboard from '../components/redgie/cashier.dashboard'

export default [{
    path: '/cashier',
    name: 'cashier',
    component: CashierDashboard,
    meta: {
        requiresAuth: true,
        isAdmin: false,
        isCashier: true
    }
}]