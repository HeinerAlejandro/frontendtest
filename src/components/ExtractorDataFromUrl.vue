<template>
    <slot :data='data'></slot>
</template>

<script>
import { ref } from 'vue'
import { doFetch } from '../utils'

export default {
    props: ['url'],
    setup(props) {
        const data = ref(null)

        const options = {
            url: props.url,
            data: {},
            method: 'get'
        }

        doFetch(
            options,
            response => data.value = response.data,
            err => console.log(err)
        )

        return {
            data
        }
    } 
}
</script>