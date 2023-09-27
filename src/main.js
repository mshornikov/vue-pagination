import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import PaginationGroup from './components/PaginationGroup.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: PaginationGroup,
        },
    ],
});

createApp(App).use(router).mount('#app');
