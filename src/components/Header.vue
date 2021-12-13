<template>
    <p class="title-header">{{ pageTitle }}</p>
</template>

<script>

export default {
    name: 'Header',
    props: ['pageTitle']
}
</script>

<style>
    .title-header {
        color:white;
        display:inline-block;
        margin-left:24px;
        font-size:24px;
        font-weight:bold;
    }
    
</style>
