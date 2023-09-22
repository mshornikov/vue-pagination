import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import User from './components/User.vue';
import List from './components/List.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: User,
        },
        {
            path: '/posts',
            component: List,
        },
    ],
});

createApp(App).use(router).mount('#app');
