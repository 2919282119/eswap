import { createRouter, createWebHistory } from 'vue-router'
import App from "./../App.vue"
import Eswap from "@/components/Eswap.vue";
import Campus from "./../views/Campus.vue";
import Index from "./../views/Index.vue";
import Message from "./../views/Message.vue";
import My from "./../views/My.vue";
import Post from "./../views/Post.vue";
import Content from "@/components/PageFrame/Content.vue";
import Details from "@/components/E-swap/index/Details.vue";
import Login from "@/components/E-swap/my/My/Login.vue";
import Register from "@/components/E-swap/my/My/Register.vue";
import Findbackpass from "@/components/E-swap/my/My/Findbackpass.vue";
import Cart from "@/components/E-swap/index/Cart.vue";
import Classify from "@/components/E-swap/index/Classify/Classify.vue";
import Sell from "@/components/E-swap/post/Sell.vue";
import PostWall from "@/components/E-swap/post/PostWall.vue";
import AskBuy from "@/components/E-swap/post/AskBuy.vue";
import PassRiver from "@/components/Test/PassRiver.vue";
import Chat from "@/components/E-swap/message/Chat.vue";
import { useUserStore } from "@/stores/userStore"
import AuthWallPage from "@/components/E-swap/my/My/AuthWallPage.vue";
// const userStore = useUserStore();//注意不能写在这里，因为此时路由还没创建，pinia实例也没有创建

const routes = [
    {
        path: "/", component: Content, children: [//这里只要嵌套路由，父路由必须是一个只含<RouterView/>的vue组件
            { path: "", redirect: "/login" },
            { path: "index", component: () => import("./../views/Index.vue") },
            { path: "index/:category", name: "index-s", component: Index },
            { path: "campus", component: Campus },
            { path: "post", component: Post },
            { path: "message", component: Message },
            { path: "my", component: My }
        ]
    },
    { path: "/modal", name: "modal", component: <h1>遮罩层</h1> },
    { path: "/details", component: Details },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/findbackpass", component: Findbackpass },
    { path: "/cart", component: Cart },
    { path: "/classify", component: Classify },
    { path: "/sell", component: Sell },
    { path: "/bbwall", component: PostWall },
    { path: "/askbuy", component: AskBuy },
    { path: "/passriver", component: () => import("@/components/Test/PassRiver.vue") },
    { path: "/chat/:item/:dialogList", name: "chat", component: Chat },
    { path: "/conclude", component: () => import("@/components/E-swap/index/Conclude.vue") },
    { path: "/authwall", component: AuthWallPage },
    { path: "/setting", component: ()=>import("@/components/E-swap/my/My/Setting.vue")}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (userStore.isAuth) {
        next();
    } else {
        if (to.path == "/login" || to.path == "/register" || to.path == "/findbackpass" || to.path == "/authwall") {
            next();
        } else {
            next("/authwall");
        }
    }
})
export default router
