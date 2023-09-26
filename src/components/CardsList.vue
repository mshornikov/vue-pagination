<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Card from './CardItem.vue';

const route = useRoute();

const props = defineProps({
    fetchData: {
        type: Function,
        required: true,
    },
});

const isLoaded = ref(false);
const isError = ref(false);
const data = ref([{ id: 0, title: 'None' }]);

const cardPerPage = 10;

const pages = computed(() =>
    isLoaded.value ? Math.ceil(data.value.length / cardPerPage) : 1,
);

onMounted(async () => {
    try {
        data.value = await props.fetchData();
        isLoaded.value = true;
        if (Number(route.query.page) > pages.value) {
            isError.value = true;
        }
    } catch {
        isError.value = true;
    }
});

const currentPage = ref(Number(route.query.page) || 1);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * cardPerPage;
    const end = start + cardPerPage;

    return isLoaded.value ? data.value.slice(start, end) : 0;
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
    <div v-if="isLoaded && !isError">
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
    </div>
    <div v-else-if="!isError">Загрузка...</div>
    <div v-if="isError">ОШИБКА</div>
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
