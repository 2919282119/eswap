<template>
    <div class="outclass">
        <div class="topbar">
            <LeftOutlined style="line-height: 10vh;" @click="goback" />
            <span class="fontset">设置</span>
            <span style="line-height: 10vh;">·</span>
        </div>
        <div class="scrollpart">
            <div class="midpart">
                <div v-for="(item, index) in midtext" :key="'midpart_' + index">
                    <div class="miditem">
                        <span class="fontset">{{ item }}</span>
                        <RightOutlined style="line-height: 5.5vh;margin-right: 1vh;" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div v-for="(item, index) in bottomtext" :key="'botpart_' + index">
                    <div class="botitem">
                        <span class="fontset">{{ item }}</span>
                        <RightOutlined style="line-height: 5.5vh;margin-right: 1vh;" />
                    </div>
                </div>
            </div>
            <div class="exit" @click="goLogin">
                <div class="btn">{{ exittext }}</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'

const router = useRouter();
const midtext = ['个人资料设置', '地址管理', '支付管理', '账号与安全'];
const bottomtext = ['新消息通知', '所有宝贝自动回复', '消息提示音设置', '隐私', '清除缓存'];
const exittext = '退出登录';
import { useUserStore } from "@/stores/userStore"
import { onMounted } from 'vue';
const userStore = useUserStore();
const goLogin = () => {
    router.push('/login');
    userStore.userInfo.userid = ""
    userStore.userInfo.username = ""
    userStore.userInfo.password = ""
    userStore.userInfo.phoneno = ""
    userStore.userInfo.avater = "https://pic4.zhimg.com/80/v2-2189b7ca8f3a68eedf7f016fb0a9786b_1440w.webp"
    userStore.userInfo.collection = []
    userStore.userInfo.fans = []
    userStore.userInfo.focus = []
}
const goback = () => {
    router.go(-1);
}

</script>
<style lang="less">
.outclass {
    background-color: rgb(231, 240, 240);
    height: 88vh;
}
.scrollpart{
    height:78vh;
    overflow-y: scroll;
}
.topbar {
    height: 10vh;
    background-color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0 1em;

    .fontset {
        line-height: 10vh;
        font-size: 3.5vh;
    }
}

.midpart {
    height: 28vh;
    background-color: #fff;
    margin-top: 3.5vh;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    padding: 0 0.5em;
    gap: 0.2vh;

    .miditem {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .fontset {
            margin-left: 1vh;
            line-height: 5.5vh;
            font-size: 2.5vh;
        }
    }
}

.bottom {
    height: 35vh;
    background-color: #fff;
    margin-top: 3.5vh;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    gap: 0.2vh;
    padding: 0 0.5em;

    .botitem {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .fontset {
            margin-left: 1vh;
            line-height: 5.5vh;
            font-size: 2.5vh;
        }
    }
}

.exit {
    display: flex;
    justify-content: center;
    margin: 0.6em 0;

    .btn {
        width: 90vw;
        background-color: rgb(254, 45, 45);
        height: 8vh;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6em;
        font-size: 1.4em;
    }

}
</style>