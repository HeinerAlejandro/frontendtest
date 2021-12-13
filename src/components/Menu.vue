<template>
    <a-menu
        v-model:openkeys="openkeys"
        v-model:selectedKeys="selectedKeys"
        :mode="vertical"
        :theme="light"
        style="min-height: 100%"
    >
        <a-menu-item key="1">
            <template #icon>
                <pie-chart-filled />
            </template>
            <router-link to="/">
                Poll
            </router-link>
        </a-menu-item>
        <a-menu-item key="2">
            <template #icon>
                <edit-filled />
            </template>
            <router-link to="/statitics">
                Statitics
            </router-link>
        </a-menu-item>
    </a-menu>    
</template>

<script>

import {
    PieChartFilled,
    EditFilled
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Menu',
    setup() {
        const selectedKeys = ref(['1'])
        return {
            selectedKeys
        }
    },
    components: {
        PieChartFilled,
        EditFilled,
    }
})

</script>
