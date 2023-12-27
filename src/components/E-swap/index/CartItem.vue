<script setup>
import { useCartStore } from "@/stores/useCartStore"
import Counter from "./Counter.vue"
const cartStore = useCartStore();
const props=defineProps(["item","operable"]);

const addToCart = (item) => {
    cartStore.addToCart(item);
}
const removeFromCart = (item) => {
    cartStore.removeFromCart(item.id);//记住一定要根据id删
}
</script>


<template>
    <div class="itemcontent" v-show="item.count != 0">
        <div class="left">
            <div class="img">
                <img v-lazy="props.item.image" />
            </div>
            <div class="info">
                <div class="name">
                    <a-tooltip>
                        <template #title>
                            {{ props.item.name }}
                        </template>
                        {{ props.item.brand }}牌{{ props.item.category }}
                    </a-tooltip>
                </div>
                <div class="price">
                    {{ props.item.price }}
                </div>

            </div>
        </div>

        <div class="operation" v-if="props.operable??true">
            <Counter :count="item.count" @do-add="addToCart(item)" @do-minus="removeFromCart(item)" />
        </div>
    </div>
</template>

<style scoped lang="less">
.operation {
    display: flex;
    justify-content: center;
    align-items: center;
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
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
    .img {
        img {
            height: 9vh;
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

</style>