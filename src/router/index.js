import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import DexListView from "@/views/DexListView.vue";
import DexDetailView from "@/views/DexDetailView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/dex-list',
            name: 'dex-list',
            component: DexListView,
        },
        {
            path: '/dex-detail/:id(\\d+)',
            name: 'dex-detail',
            component: DexDetailView,
        },
        {
            path: '/:error(.*)',
            name: 'error',
            component: ErrorView,
        },
    ],
})

export default router
