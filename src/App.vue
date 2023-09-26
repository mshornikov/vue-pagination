<script setup>
const getProductsFromApi = async () => {
    const urlMain = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(urlMain);
    const data = await response.json();
    return data;
};
</script>

<template>
    <RouterView :fetch-data="getProductsFromApi"></RouterView>
</template>

<style>
* {
    font-family: Arial, Helvetica, sans-serif;
}
</style>
