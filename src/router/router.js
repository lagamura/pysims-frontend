import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HistoryView from '@/views/HistoryView.vue'
import StudentDashboardView from '@/views/StudentDashboardView.vue'
import TutorDashboardView from '@/views/TutorDashboardView.vue'
import SignInViewVue from '@/views/SignInView.vue'
import AdminPanelViewVue from '@/views/AdminPanelView.vue'
import PageNotFound404Vue from '@/components/PageNotFound404.vue'
import ClassroomView from '@/views/ClassroomView.vue'
import SignInUthView from '@/views/SignInUthView.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
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
        path: '/about',
        name: 'AboutView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/sign-up',
        name: 'SignInView',
        component: SignInViewVue
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
        name: 'SignInuthView.vue',
        component: SignInUthView,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound404Vue },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: PageNotFound404Vue },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router