<script setup>
import {useRouter} from "vue-router"
const router=useRouter()
const props=defineProps({
    user:{
        type:Object,
        default:()=>({})
    },
    commodity:{
        type:Object,
        default:()=>({})
    },
    dialogList:{
        type:Array,
        default:()=>[]
    },
    date:{
        type:Date,
        default:""
    }
})
const goChat=()=>{
    router.push({name:"chat",params:{item:JSON.stringify(props.commodity),dialogList:JSON.stringify(props.dialogList)}})
}
</script>

<template>
    <div class="msgitem" @click="goChat">
        <div class="avatar">
            <a-badge dot>
                <a-avatar size="large">
                    <template #icon>
                        <img v-lazy="user.avater" />
                    </template>
                </a-avatar>
            </a-badge>

        </div>
        <div class="content">
            <div class="username">
                {{ user.username }}
            </div>
            <div class="text">
                {{ commodity.name }}
            </div>
            <div class="msgtime">
                {{ date.toLocaleString("zh",{"dateStyle":"short"}) }}
            </div>
        </div>
        <div class="img">
            <img v-lazy="props.commodity.image" />
        </div>
    </div>
</template>

<style scoped lang="less">
.content{
    width:50vw;
    margin-left: 0.2em;
}
.username{
    font-size: 1.1em;
    font-weight: 500;
}
.text{
    font-size: 0.8em;
    color:#999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin:0.4em 0;
}
.msgtime{
    font-size: 0.5em;
    color:#999;
}
.msgitem{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:1em;
}
.img{
    img{
        width:4em;
        height:4em;
        border-radius: 0.5em;
    }
}
.avatar{
    &:deep(.ant-avatar){
        width:2.5em;
        height:2.5em;
    }
}
</style>