<template>
    <a-row>
        <a-col 
            :lg="{ span: 6, order: 1 }" 
            :xs="{ span: 24, order: 2 }">
            <a-row>
                <a-col
                    :xs="{ span: 24 }"
                    class="mt-col-1"
                >
                    <slot name="first_panel"></slot>
                </a-col>
                <a-col
                    :xs="{ span: 24 }"
                    class="mt-col-1"
                >
                    <slot name="second_panel"></slot>
                </a-col>
            </a-row>
        </a-col>
        <a-col 
            :xs="{ span: 24, order: 1 }"
            :lg="{ span: 18 }"
            class="mt-col-1"
        >
            <slot name="third_panel"></slot>
        </a-col>
    </a-row>
</template>

<script>

export default {
    name: 'LayoutStatitics'
}
</script>

<style>
    .mt-col-1 {
        margin-top: 1rem;
    }
</style>
