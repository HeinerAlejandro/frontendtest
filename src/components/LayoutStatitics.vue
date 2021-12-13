<template>
    <a-row>
        <a-col span="6">
            <a-row>
                <a-col class="mt-col-1">
                    <slot name="first_panel"></slot>
                </a-col>
                <a-col class="mt-col-1">
                    <slot name="second_panel"></slot>
                </a-col>
            </a-row>
        </a-col>
        <a-col class="mt-col-1" span="18">
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
