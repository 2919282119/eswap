<script setup>
import { SettingOutlined } from "@ant-design/icons-vue"
import Kingkong from "../index/Kingkong.vue";
import {reactive,computed,onMounted} from "vue"
import {useCommodityStore} from "@/stores/useCommodityStore"
import {useUserStore} from "@/stores/userStore";
import { useRouter } from "vue-router";
const router = useRouter()
const userStore = useUserStore()
const commodityStore = useCommodityStore()

const memberid=computed(()=>{
    const uid=userStore.userInfo.userid;
    const part1=uid[0];
    const part2=uid[uid.length-1];
    return  part1+"***"+part2;
})
const info1 = [
    { altername: "收藏" },
    { altername: "历史浏览"},
    { altername: "关注" },
    { altername: "粉丝" }
];
const trades=[
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t01.png",name:"我发布的"},
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t02.png",name:"我卖出的"},
    {icon:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/t03.png",name:"我买到的"},
]
const kingkong=[
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e01.png",label:"小易公约"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e02.png",label:"客服中心"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e03.png",label:"我的勋章"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e04.png",label:"退款售后"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e05.png",label:"个性装扮"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e06.png",label:"夜间模式"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e07.png",label:"红包奖券"},
    {url:"https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/e08.png",label:"小易公益"},
]
const showItem=(item)=>{
    alert(item)
}
const tradeNums=(name)=>{
    if(name=="我发布的"){
        return name+" "+commodityStore.state.commodityList.filter(item=>item.userid==userStore.userInfo.userid).length;
    }
    else return name+" "+(4+Math.floor(Math.random()*15))
}
const getInfo1Count=(name)=>{
    switch(name){
        case "收藏":
        return userStore.userInfo.collection.length;
        case "关注":
        return userStore.userInfo.focus.length;
        case "粉丝":
        return userStore.userInfo.fans.length;
        case "历史浏览":
        return userStore.historyScan.length;
    }
        

}
const goSetting=()=>{
    router.push("/setting");
}
</script>

<template>
    <div class="mypage">
        <div class="config">
            <SettingOutlined @click="goSetting"/>
        </div>
        <div class="userinfo">
            <div class="avatar">
                <a-avatar size="large">
                    <template #icon>
                        <img v-lazy="userStore.userInfo.avater"/>
                    </template>
                </a-avatar>
            </div>
            <div class="names">
                <div class="username">
                    {{ userStore.userInfo.username }}
                </div>
                <div class="membername">
                    会员名:{{ memberid}}
                </div>
            </div>

        </div>
        <div class="info1">
            <div class="alter" v-for="item of info1">
                <div class="count">
                    {{ getInfo1Count(item.altername) }}
                </div>
                <div class="altername">
                    {{ item.altername }}
                </div>
            </div>
        </div>
        <a-divider />
        <div class="mytrade">
            <div class="info">
                <div class="title">
                    我的交易
                </div>
                <div class="achieve">
                    在小易赚了{{ (200+Math.random()*1200).toFixed(0) }}.00元
                </div>
            </div>
            <div class="tradeinfo">
                <div class="tradealter" v-for="item of trades">
                    <div class="tradeicon">
                        <img v-lazy="item.icon" />
                    </div>
                    <div class="tradetext">
                        {{ tradeNums(item.name) }}
                    </div>
                </div>
            </div>
        </div>
        <a-divider />
        <div class="extra">
            <div class="title">
                更多服务
            </div>
            <div class="extraitems">
                <!-- <Kingkong :items="kingkong" itemwidth="22vw"/> -->
                <div class="extraitem" v-for="item of kingkong" @click="showItem(item.label)">
                    <div class="icon">
                        <img v-lazy="item.url"/>
                    </div>
                    <div class="name">{{ item.label }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
.extraitems{
    width:100%;
    height:29vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    padding:1em 1em 0;
    gap: 1em;
    .extraitem{
        .icon{
            display: flex;
            justify-content: center;
        }
        .name{
            margin-top: 0.3em;
        }

        img{
            width:60%;
        }
    }
}
.extra .title{
    font-size: 1.2em;
    font-weight: 600;
    margin-left: 1em;
}
.tradeinfo{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 1em;
}
.tradealter {
    img {
        width: 2.8em;
        height: 2.8em;
    }
    .tradetext{
        margin-top: 0.2em;
    }
    text-align: center;

}

.mytrade .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    .title {
        font-size: 1.2em;
        font-weight: bold;
    }

    .achieve {
        font-size: 0.9em;
        color: #999;
    }
}

.ant-divider {
    margin: 1em 0;
}

.altername {
    margin-top: 0.2em;
}

.alter {
    text-align: center;
}

.info1 {
    padding: 1.2em 0 0;
    display: flex;
    justify-content: space-around;
}

.names {
    margin-left: 0.5em;
}

.membername {
    font-size: 0.8em;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.username {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 0.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.userinfo {
    width: 50vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-left: 1em;
}

.ant-avatar {
    //直接这样修改avatar大小
    width: 3.2em;
    height: 3.2em;
}

.config {
    font-size: 1.3em;
    display: flex;
    justify-content: end;
    margin-top: 0.2em;
}

.mypage {
    padding: 1em;
}
</style>