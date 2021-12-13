<template>
    <a-card :title="title" hoverable>
        <slot></slot>
    </a-card>
</template>

<script>

    export default {
        props: ['title'],
    }
</script>