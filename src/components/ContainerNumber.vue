<template>
    <a-card :title="title" hoverable>
        <a-row>
            <a-col>
                <h2>{{ content }}</h2>
            </a-col>
            <a-col>
                <slot name="icon" />
            </a-col>
        </a-row>
    </a-card>
</template>

<script>

export default {
    props: ['content', 'title'],
}

</script>

<style>
    .chart-icon {
        font-size: 1.8rem;
        margin-left: .8rem;
    }
</style>