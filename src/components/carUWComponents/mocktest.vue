<template>
</template>

<script>
import { item } from 'business'
import Service from '../Service'
export default {
    created() {
        item.initItem(Service.getItem());
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
