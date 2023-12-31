<script setup>
import { reactive, onMounted,onUnmounted } from "vue";
import CartItem from "./../index/CartItem.vue";
import {myGPT2} from "@/functions/ai/openai"
import { useUserStore } from "../../../stores/userStore";
import { useMsgStore } from '../../../stores/useMsgStore';
import { LeftOutlined, SettingOutlined, AudioOutlined, SmileFilled, SmileOutlined } from "@ant-design/icons-vue"
import { useRoute, useRouter } from "vue-router";
const msgStore = useMsgStore();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const state = reactive({
    item: {},
    dialogList: [],
    user: {},
    text: ""
})
const goBack = () => {
    router.go(-1);
}
const loadDialog=()=>{
    const dialogList=JSON.parse(route.params?.dialogList??"[]");
    if(dialogList){
        state.dialogList=dialogList;
    }
}
onMounted(() => {
    loadDialog();
    state.item = JSON.parse(route.params.item);
    state.user = userStore.allUsers.find(item => item.userid == state.item.userid);
})
const sendmsg = async (e) => {
    if (e.keyCode == 13) {
        let premodel=`你现在是一个二手交易平台上的个体户商家，
        你要回答买家的咨询，语气像正常聊天一样尽量简短不用太客气，
        必要时你可以编造一些内容，用户问题如下：`;
        let xtext = premodel+state.text;
        state.dialogList.push({text:state.text,type:"Q"});
        state.text = "";
        await myGPT2(xtext).then(res=>{
            state.dialogList.push({text:res.data.choices[0].message.content,type:"A"});
        })
    }
}
onUnmounted(() => {
    if(state.dialogList.length>0){
        msgStore.addChat(state.user,state.item,state.dialogList,new Date());
    }
})

</script>

<template>
    <div class="chat">
        <div class="topbar">
            <div class="goback" @click="goBack">
                <LeftOutlined />
                <span class="userid">{{ state.user.username }}</span>
            </div>
            <div class="setting">
                <SettingOutlined />
            </div>
        </div>
        <div class="preview">
            <CartItem @click="goBack" :item="state.item" :operable="false"></CartItem>
        </div>
        <div class="chatcontent">
            <div class="chatItem" :class="'chatItem'+item.type" v-for="item of state.dialogList">
                <span class="avater">
                    <img v-lazy="item.type=='Q'?userStore.userInfo.avater:state.user.avater" />
                </span>
                <span class="text">
                    {{ item.text }}
                </span>
            </div>
        </div>
        <div class="chatinput">
            <a-input size="large" v-model:value="state.text" @keydown="sendmsg">
                <template #prefix>
                    <AudioOutlined />
                </template>
                <template #suffix>
                    <SmileOutlined />
                </template>
            </a-input>
        </div>
    </div>
</template>

<style scoped lang="less">
@chatgray: #f3f2f2;

.chatcontent {
    height: 60vh;
    overflow-y: scroll;
    background-color: @chatgray;
    padding: 0.5em 0.8em;
    
    .chatItem {
        display: flex;
        flex-direction: row-reverse;
        padding:0.4em 0;
        .avater {
            img {
                width:6vh;
                height: 6vh;
                border-radius: 50%;
            }
        }

        .text {
            margin-right: 0.5em;
            background-color: #ffffff;
            padding: 0.5em 0.8em;
            border-radius: 0.5em;
            display: flex;
            align-items: center;
        }
    }
    .chatItemA{
        flex-direction: row;
        .text{
            margin-left: 0.5em;
        }
    }
}

.topbar {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;

    .goback {
        font-size: 1.4em;

        .userid {
            font-size: 0.9em;
            margin-left: 0.5em;
            color: #4e4e4e;
            font-weight: 600;
        }
    }

    .setting {
        .goback();
    }
}

.preview {
    padding-left: 1em;
}

.chatinput {
    position: absolute;
    bottom: 12vh;
    width: 100vw;
    background-color: @chatgray;
    padding: 0.5em 5vw;
}
</style>