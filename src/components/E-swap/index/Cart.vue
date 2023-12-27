<script setup>
import { useCartStore } from "@/stores/useCartStore"
import { LeftOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import { onMounted, onUpdated, reactive, watch, computed } from "vue";
import CartItem from "./CartItem.vue";
import router from "../../../router";
import Counter from "./Counter.vue"
const cartStore = useCartStore();

const goBack = () => {
    router.go(-1);
}
const clearCart = () => {
    cartStore.clearCart();
}

const addToCart = (item) => {
    cartStore.addToCart(item);
}
const removeFromCart = (item) => {
    cartStore.removeFromCart(item.id);//记住一定要根据id删
}
const goIndex = () => {
    router.push('/index');
}

</script>

<template>
    <div class="cart">
        <div class="topbar">
            <LeftOutlined class="goback" @click="goBack" />
            <span class="title">购物车</span>
            <DeleteOutlined class="clearcart" @click="clearCart" />
        </div>
        <div class="items">
            <a-empty v-if="cartStore.state.aggCart.length==0" class="emptyCart">
                <template #description>
                    购物车空空如也，快去选购吧
                </template>
                <a-button type="primary" @click="goIndex">去选购</a-button>
            </a-empty>
            <div class="cartItem" v-for="item of cartStore.state.aggCart">
                <!-- <div class="itemcontent" v-show="item.count != 0">
                    <div class="left">
                        <div class="img">
                            <img v-lazy="item.image" />
                        </div>
                        <div class="info">
                            <div class="name">
                                <a-tooltip>
                                    <template #title>
                                        {{ item.name }}
                                    </template>
                                    {{ item.brand }}牌{{ item.category }}
                                </a-tooltip>
                            </div>
                            <div class="price">
                                {{ item.price }}
                            </div>

                        </div>
                    </div>

                    <div class="operation">
                        <Counter :count="item.count" @do-add="addToCart(item)" @do-minus="removeFromCart(item)" />
                    </div>
                </div> -->
                <CartItem :item="item"></CartItem>
            </div>
            <div class="total" v-show="cartStore.sumMoney!=0">
                总计：{{ cartStore.sumMoney }}元
                <a-button class="goPay" size="large">去结算</a-button>
            </div>
        </div>


    </div>
</template>

<style scoped lang="less">
.goPay{
    margin-left: 1em;
}
.emptyCart{
    margin-top: 10vh;
}
.operation {
    display: flex;
    justify-content: center;
    align-items: center;
}

.goback {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: #666;
}

.items {
    height: 80vh;
    overflow-y: scroll;
}

.total {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
}

.left {
    display: flex;
}

.price {
    color: rgb(230, 63, 50);
    font-size: 1.2em;
    font-weight: 600;

    &::before {
        content: "¥ ";
        font-size: 0.5em;
    }
}

.itemcontent {
    display: flex;
    justify-content: space-between;
    height: 12vh;
    padding: 1em;
    border-bottom: 1px solid rgb(239, 239, 239);

    .img {
        img {
            height: 10vh;
        }
    }

    .info {
        font-size: 0.9em;
        width: 40vw;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 2vw;

        .name {
            font-size: 1.1em;
            font-weight: 600;
            overflow: hidden;
            width: 40vw;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.goback {
    font-size: 1.5em;
    color: #4d4c4c;
}

.topbar {
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    .title {
        font-size: 1.3em;
        font-weight: 600;
    }

    .clearcart {
        font-size: 1.3em;
    }
}
</style>