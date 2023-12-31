<script setup>
import AuthWall from './AuthWall.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goLogin = () => {
    router.push('/login');
}
</script>

<template>
    <a-result class="authwall" status="403" title="403" sub-title="您还未登录，请先登录">
        <template #extra>
            <a-button type="primary" @click="goLogin">登录</a-button>
        </template>
    </a-result>
</template>

<style scoped></style>