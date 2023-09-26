<script setup>
defineProps({
    cardData: {
        type: Object,
        default() {
            return { id: 0, title: 'Неизвестно' };
        },
    },
});
</script>
<template>
    <h2>{{ cardData.id }}</h2>
    <p>{{ cardData.title }}</p>
</template>
