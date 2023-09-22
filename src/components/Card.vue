<script setup>
defineProps({
    cardData: Object,
});
</script>
<template>
    <h2>{{ cardData.id }}</h2>
    <p>{{ cardData.title }}</p>
</template>
<style scoped></style>
