<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import Card from './Card.vue';
import { RouterLink } from 'vue-router';

const data = ref();
const dataLen = ref();
const currentPage = ref(1);
const pagesAmount = 10;
const GET_PRODUCTS_FROM_API = async () => {
    const urlMain = 'https://jsonplaceholder.typicode.com/posts';
    try {
        try {
            const response = await axios(urlMain, {
                method: 'GET',
                timeout: 1000,
            });
            data.value = response.data;
            dataLen.value = response.data.length;
            return paginatedData;
        } finally {
        }
    } catch (error) {
        console.log(error, 'Wrong data from API');
    }
};

onMounted(() => {
    GET_PRODUCTS_FROM_API();
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pagesAmount;
    const end = start + pagesAmount;

    if (data.value) return data.value.slice(start, end);
});

const stopPrev = computed(() => {
    return currentPage.value == 1;
});

const stopNext = computed(() => {
    return currentPage.value === dataLen.value / pagesAmount;
});

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
    <!-- <pre>{{ data }}</pre> -->
    <Card
        v-for="(card, index) in paginatedData"
        :card-data="card"
        :key="index"
    />
    <button @click="prevPage" :disabled="stopPrev">-</button>
    <button v-for="n in pagesAmount" @click="goToPage(n)">{{ n }}</button>
    <input type="number" v-model="currentPage" min="1" :max="pagesAmount" />
    <button @click="nextPage" :disabled="stopNext">+</button>
    <RouterLink :to="{ path: '/posts', query: { page: nextPage } }"
        >Туда</RouterLink
    >
</template>

<style scoped></style>
