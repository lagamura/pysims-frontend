import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomeWind from '@/views/HomeWind.vue'
import HistoryView from '@/views/HistoryView.vue'
import StudentDashboardView from '@/views/StudentDashboardView.vue'
import TutorDashboardView from '@/views/TutorDashboardView.vue'
import Register from '@/views/account/Register.vue'
import AdminPanelViewVue from '@/views/AdminPanelView.vue'
import PageNotFound404Vue from '@/components/PageNotFound404.vue'
import ClassroomView from '@/views/ClassroomView.vue'
import SignInUthView from '@/views/SignInUthView.vue'
import pinia from "@/store/store.js";
import accountRoutes from './account.routes';
import usersRoutes from './users.routes';
import { useAuthStore, useAlertStore } from '@/store';
import SimulationsView from '@/views/simulations/SimulationsView.vue'
import SimsLayout from '@/views/simulations/SimsLayout.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeWind
    },
    {
        path: '/tutor-dashboard',
        name: 'TutorDashboard',
        component: TutorDashboardView
    },
    {
        path: '/history',
        name: 'History',
        component: HistoryView
    },
    {
        path: '/dashboard',
        name: 'StudentDashboardView',
        component: StudentDashboardView
    },
    {
        path: '/simulations',
        name: 'simulations',
        component: SimsLayout,
        children: [
            { path: '', component: SimulationsView },
            { path: ':simulation', component: StudentDashboardView }
        ]
    },
    {
        path: '/about',
        name: 'AboutView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/sign-up',
        name: 'Register',
        component: Register
    },
    {
        path: '/admin-panel/:classname',
        name: 'AdminPanel',
        component: AdminPanelViewVue,

    },
    {
        path: '/admin-panel/classes/:classname',
        name: 'ClassroomView.vue',
        component: ClassroomView,
    },
    {
        path: '/signinuth',
        name: 'SignIn',
        component: SignInUthView,
    },

    {
        path: '/myhomepage',
        name: 'HomeWind',
        component: HomeWind,
    },

    { ...accountRoutes },
    { ...usersRoutes },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound404Vue },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: PageNotFound404Vue },
]
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    const authStore = useAuthStore(pinia);

    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});
export default router