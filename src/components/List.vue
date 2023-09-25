<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import Card from './Card.vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();

const getPageQuery = () => {
    if (Number(route.query.page) > pagesAmount) {
        return pagesAmount;
    } else if (Number(route.query.page) < 1) {
        return 1;
    } else {
        return Number(route.query.page) || 1;
    }
};

const data = ref();
const dataLen = ref();
const pagesAmount = 10;
const currentPage = ref(getPageQuery());
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
    <Card
        v-for="(card, index) in paginatedData"
        :card-data="card"
        :key="index"
    />
    <div class="pagination-group">
        <RouterLink
            :class="!stopPrev ? 'button' : 'button button--disabled'"
            @click="prevPage"
            :to="{ path: '/', query: { page: currentPage - 1 } }"
            >Назад</RouterLink
        >
        <div class="pages-group">
            <RouterLink
                :class="
                    currentPage === n
                        ? 'button button--pages button--current'
                        : 'button button--pages'
                "
                v-for="n in pagesAmount"
                @click="goToPage(n)"
                :to="{ path: '/', query: { page: n } }"
                >{{ n }}</RouterLink
            >
        </div>
        <RouterLink
            :class="!stopNext ? 'button' : 'button button--disabled'"
            @click="nextPage"
            :to="{ path: '/', query: { page: currentPage + 1 } }"
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
