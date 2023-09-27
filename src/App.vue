<script setup>
const getDataFromApi = async () => {
    const urlMain = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(urlMain);
    const data = await response.json();
    return data;
};
</script>

<template>
    <RouterView :fetch-data="getDataFromApi"></RouterView>
</template>

<style>
* {
    font-family: Arial, Helvetica, sans-serif;
}
</style>
