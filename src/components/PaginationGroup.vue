<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PaginationItem from './PaginationItem.vue';
import PaginationButtons from './PaginationButtons.vue';

const route = useRoute();

const props = defineProps({
    fetchData: {
        type: Function,
        required: true,
    },
});

// Загружены ли данные
const isLoaded = ref(false);

// Есть ли ошибка
const isError = ref(false);

// Количество объектов на странице
const cardPerPage = 10;

// Объект с данными
const data = ref([{ id: 0, title: 'None' }]);

// Расчёт количества страниц
const amountOfPages = computed(() =>
    isLoaded.value ? Math.ceil(data.value.length / cardPerPage) : 1,
);

// Текущая страница
const currentPage = computed(() => Number(route.query.page) || 1);

// Срез данных на текущей странице
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * cardPerPage;
    const end = start + cardPerPage;

    return isLoaded.value ? data.value.slice(start, end) : 0;
});

onMounted(async () => {
    try {
        data.value = await props.fetchData();
        isLoaded.value = true;
        if (
            Number(route.query.page) > amountOfPages.value ||
            Number(route.query.page) < 1
        ) {
            isError.value = true;
        }
    } catch {
        isError.value = true;
    }
});
</script>

<template>
    <div v-if="isLoaded && !isError">
        <PaginationItem
            v-for="(card, index) in paginatedData"
            :key="index"
            :card-data="card" />
        <PaginationButtons
            :current-page="currentPage"
            :amount-of-pages="amountOfPages" />
    </div>
    <div v-else-if="!isError">Загрузка...</div>
    <div v-if="isError">ОШИБКА</div>
</template>
