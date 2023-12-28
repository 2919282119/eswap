<script setup>
import { SettingOutlined, SearchOutlined } from "@ant-design/icons-vue"
import MsgItem from "./MsgItem.vue"
import { useMsgStore } from "../../../stores/useMsgStore";
const msgStore = useMsgStore();
</script>

<template>
    <div class="msgpage">
        <div class="topbar">
            <div class="pagename">
                消息
            </div>
            <div class="config">
                <SettingOutlined />
            </div>
        </div>
        <div class="search">
            <a-input placeholder="搜索聊天记录/联系人" size="large">
                <template #prefix>
                    <SearchOutlined class="searchicon" />
                </template>
            </a-input>
        </div>
        <div class="msglist">
            <MsgItem v-for="item of msgStore.state.msgList" v-bind="item"/>
            <a-result v-if="msgStore.state.msgList.length==0" status="404" title="没有聊天记录" sub-title="快去和商家聊聊吧"></a-result>
        </div>
    </div>
</template>

<style scoped lang="less">
.msglist{
    height:70vh;
    overflow-y: scroll;
}

.search {
    padding: 0 1em 0.5em;

    .searchicon {
        font-size: 1.3em;
    }

    &:deep(span) {
        background-color: #eeeeef;
        border-radius: 999em;
    }

    &:deep(input) {
        background-color: #eeeeef;
        font-size: 1.1em;
    }
}

.topbar {
    display: flex;
    justify-content: space-between;
    padding: 1em;

    .config {
        font-size: 1.3em;
    }

    .pagename {
        .config();
        font-weight: bold;
    }
}</style>