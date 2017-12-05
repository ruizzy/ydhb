<template>
    <div>
        <box gap="10px 10px">
            <x-button :gradients="['#1D62F0', '#19D5FD']" link="/item">
                {{getData}}
            </x-button>
        </box>
    </div>
</template>

<script>
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux'
import {item, itemkind} from 'business'
import Service from '../Service'
export default {
    created() {
        this.getItem();
        console.log(this.data);
    },
    methods: {
        getItem(){
            Service.getItem().then((res) => {
                item.initItem(res.data.data);
            },
            (res) => {
                console.log(res);
            });
        }
    },
    data () {
        return {
            data: item.temp.proposalNo
        }
    },
    computed: {
        getData(){
            return this.data;
        }
    },
    components: {
        XButton, 
        Box, 
        GroupTitle, 
        Group, 
        Flexbox, 
        FlexboxItem, 
        Divider
    }
}
</script>

<style scoped>
</style>
