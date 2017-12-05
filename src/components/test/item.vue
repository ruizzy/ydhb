<template>
    <div>
        {{item}}
    </div>
</template>

<script>
import { item } from 'business'
export default {
    created() {
    },
    methods: {
    },
    data () {
        return {
            item: item.temp
        }
    }
}
</script>

<style scoped>
</style>