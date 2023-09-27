<script setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    amountOfPages: {
        type: Number,
        required: true,
    },
});

// Получить текущий путь
const getBaseUrl = () => route.path;

// Проверка на первую страницу
const stopPrev = () => props.currentPage === 1;

// Проверка на последнюю страницу
const stopNext = () => props.currentPage === props.amountOfPages;

// Предыдущая страница
const prevPage = () => (stopPrev() ? props.currentPage : props.currentPage - 1);

// Следующая страница
const nextPage = () => (stopNext() ? props.currentPage : props.currentPage + 1);
</script>

<template>
    <div class="pagination-group">
        <RouterLink
            :class="!stopPrev() ? 'button' : 'button button--disabled'"
            :to="{ path: getBaseUrl(), query: { page: prevPage() } }"
            >Назад</RouterLink
        >
        <ul class="pages-group">
            <li v-for="(n, index) in amountOfPages" :key="index">
                <RouterLink
                    :class="
                        currentPage === n
                            ? 'button button--pages button--current'
                            : 'button button--pages'
                    "
                    :to="{ path: getBaseUrl(), query: { page: n } }"
                    >{{ n }}</RouterLink
                >
            </li>
        </ul>
        <RouterLink
            :class="!stopNext() ? 'button' : 'button button--disabled'"
            :to="{ path: getBaseUrl(), query: { page: nextPage() } }"
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

    margin: 0;
    padding: 0;

    list-style: none;
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
