<script setup>
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import CartItem from "./cartItem.vue"
import { message } from "ant-design-vue"
import { useCartStore } from "@/stores/useCartStore"
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "vue-router"
import { reactive } from "vue"
const cartStore = useCartStore()
const router = useRouter()
const userStore = useUserStore()
const goback = () => {
    router.go(-1);
}
const state = reactive({
    selectPay: false,
    paymethod: "微信支付"
})
const selectPay = () => {
    state.selectPay = true;
}
const paymList = ["微信支付", "支付宝支付", "现金支付"]
const doSubmit = () => {
    cartStore.clearCart();
    message.success("恭喜您已下单成功！")
    router.push("/index")
}
</script>

<template>
    <div class="conclude">
        <div class="topbar">
            <div class="goback">
                <LeftOutlined @click="goback" />
            </div>
            <div class="title">
                提交订单
            </div>
        </div>
        <div class="mid">
            <div class="address">
                <div class="addname">
                    浙江理工大学生活2区
                    <span>
                        <RightOutlined class="grayicon" />
                    </span>
                </div>
                <div class="buyerinfo">
                    {{ userStore.userInfo.username }}先生
                    <span>{{ userStore.userInfo.phoneno }}</span>
                </div>
            </div>
            <div class="paymethod">
                <span>支付方式</span>
                <span @click="selectPay">
                    {{ state.paymethod }}
                    <RightOutlined class="grayicon" />
                </span>
            </div>
            <div class="commoditylist">
                <CartItem v-for="item in cartStore.state.aggCart" :item="item" :countable="true"></CartItem>
            </div>
        </div>

        <div class="sumbar">
            <div class="suminfo">
                <div class="summoney">
                    {{ cartStore.sumMoney }}
                </div>
            </div>
            <div class="submit" @click="doSubmit">提交订单</div>
        </div>
    </div>
    <a-drawer title="支付方式" placement="bottom" height="20vh" :open="state.selectPay" @close="state.selectPay = false">
        <div class="payitem">
            <a-radio-group :options="paymList" v-model:value="state.paymethod" />
        </div>
    </a-drawer>
</template>

<style scoped lang="less">
@bgblue: rgb(8, 181, 244);

.payitem {
    &:deep(span) {
        font-size: 1.1em;
    }
}

.conclude {
    height: 88vh;
    background: linear-gradient(@bgblue, #f3f3f3 50%, #fff 70%);
}

.mid {
    height: 70vh;
    overflow-y: scroll;
}

.commoditylist {
    width: 92vw;
    margin: 1.5vh 0 0 4vw;
    border-radius: 0.7em;
    background-color: #fff;
    padding: 0.8em;
    .count{
        text-align: right;
        font-size: 1.3em;
    }
}

.address {
    width: 92vw;
    height: 14vh;
    background-color: #fff;
    border-radius: 0.7em;
    margin-left: 4vw;
    display: grid;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;

    .addname {
        display: flex;
        align-items: center;
        padding-left: 5vw;
        font-size: 1.3em;
        font-weight: 600;

        span {
            font-size: 0.9em;
        }
    }

    .buyerinfo {
        display: flex;
        padding-left: 5vw;
        align-items: center;
        color: #5d5d5d;

        span {
            margin-left: 0.5em;
        }
    }
}

.paymethod {
    width: 92vw;
    height: 10vh;
    background-color: #fff;
    border-radius: 0.7em;
    margin-left: 4vw;
    margin-top: 1.5vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;

    span:nth-child(1) {
        font-weight: 600;
    }
}

.grayicon {
    margin-left: 0.2em;
    color: #7a7a7a;
}

.sumbar {
    position: absolute;
    width: 92vw;
    height: 8vh;
    left: 4vw;
    bottom: 13vh;
    background-color: 1.1*@bgblue;
    border-radius: 999em;
    overflow: hidden;
    display: grid;
    grid-template-columns: 7fr 3fr;

    .suminfo {
        background-color: #2b2b2b;
        display: flex;
        align-items: center;
        padding-left: 1.5em;

        .summoney {
            color: #fff;
            font-size: 1.6em;

            &::before {
                content: "￥";
                font-size: smaller;
            }
        }
    }

    .submit {
        font-size: 1.2em;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.topbar {
    height: 8vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    font-size: 1.2em;
    background-color: 1.1*@bgblue;

    .goback {
        margin-left: 1em;
        font-size: 1.1em;
    }

    .title {
        text-align: center;
        font-weight: 600;

    }
}</style>