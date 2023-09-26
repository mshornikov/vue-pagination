import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import List from './components/CardsList.vue';
import NotFound from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: List,
        },
        { path: '/404', component: NotFound },
    ],
});

createApp(App).use(router).mount('#app');
