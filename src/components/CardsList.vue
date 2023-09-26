<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Card from './CardItem.vue';

const route = useRoute();
const cardPerPage = 10;

const dataLen = ref(1);

const pages = computed(() => Math.ceil(dataLen.value / cardPerPage));

const data = ref([{ id: 0, title: 'Неизвестно' }]);
const currentPage = ref(Number(route.query.page) || 1);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * cardPerPage;
    const end = start + cardPerPage;

    return data.value.slice(start, end);
});

const GET_PRODUCTS_FROM_API = async () => {
    const urlMain = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios(urlMain, {
        method: 'GET',
        timeout: 1000,
    });
    data.value = response.data;
    dataLen.value = response.data.length;
    return paginatedData;
};

onMounted(() => {
    GET_PRODUCTS_FROM_API();
});

const stopPrev = computed(() => currentPage.value === 1);

const stopNext = computed(() => currentPage.value === pages.value);

const nextPage = () => {
    currentPage.value += 1;
};

const prevPage = () => {
    currentPage.value -= 1;
};

const goToPage = (n) => {
    currentPage.value = n;
};
</script>

<template>
    <Card
        v-for="(card, index) in paginatedData"
        :key="index"
        :card-data="card" />
    <div class="pagination-group">
        <RouterLink
            :class="!stopPrev ? 'button' : 'button button--disabled'"
            :to="{ path: '/', query: { page: currentPage - 1 } }"
            @click="prevPage"
            >Назад</RouterLink
        >
        <div class="pages-group">
            <RouterLink
                v-for="(n, index) in pages"
                :key="index"
                :class="
                    currentPage === n
                        ? 'button button--pages button--current'
                        : 'button button--pages'
                "
                :to="{ path: '/', query: { page: n } }"
                @click="goToPage(n)"
                >{{ n }}</RouterLink
            >
        </div>
        <RouterLink
            :class="!stopNext ? 'button' : 'button button--disabled'"
            :to="{ path: '/', query: { page: currentPage + 1 } }"
            @click="nextPage"
            >Вперёд</RouterLink
        >
    </div>
</template>

<style scoped>
.pagination-group {
    display: flex;
    gap: 40px;
}

.pages-group {
    display: flex;
    gap: 10px;
}

.button {
    display: inline-block;

    padding: 10px 15px;

    color: white;
    text-decoration: none;

    background-color: slateblue;
    border-radius: 5px;
}

.button--pages {
    background-color: mediumpurple;
}

.button--current {
    background-color: darkviolet;
}

.button--disabled {
    pointer-events: none;
    background-color: dimgray;
}
</style>
