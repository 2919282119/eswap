<script setup lang="jsx">
import { onMounted, onUnmounted, reactive, ref, inject, getCurrentInstance, computed, watch, watchEffect, toRefs } from 'vue';
import { message, notification } from "ant-design-vue"
message.config({
    duration: 3,
    top: '40vh'
})
const proxy = getCurrentInstance().proxy;
const state = reactive({
    boatPosition: "boat",
    objectPosition: {
        farmer: 1,
        wolf: 1,
        sheep: 1,
        vegetable: 1
    },
    usedtime: 0,
    movesteps: 0,
    successfulRoute: [],
    successfulState: []
})
let timer = null;
const lives = ref({});
const lives2 = ref({});
const docker = ref({});
const doStop = ref(0);

const passriver = () => {
    if (state.usedtime == 0) {
        message.warning("请先点击开始游戏再进行操作！")
    }
    state.movesteps++;
    //点击过河后：
    //船上不能没有农夫
    //船上不能超过两个
    const livesondocker = docker.value.childNodes;
    const livesondockerx = [...docker.value.childNodes];
    const livesondockerArr = [];
    for (let i = 0; i < livesondocker.length; i++) {
        livesondockerArr.push(livesondocker[i].className);
    }
    const isFarmeronDocker = livesondockerArr.includes("farmer");
    if (livesondockerArr.length > 2) {
        message.error("超重了！船上只能载两样东西！");
        return;
    }
    if (!isFarmeronDocker) {
        message.error("农夫不在船上,无法开动！");
        return;
    }



    if (state.boatPosition === "boat") {
        state.boatPosition = "boatleft";
    } else {
        state.boatPosition = (state.boatPosition === "boatright") ? "boatleft" : "boatright"
    }



    // 过河之后自动上岸
    setTimeout(() => {
        for (let i = 0; i < livesondockerx.length; i++) {
            if (state.boatPosition == "boatleft") {
                lives2.value.appendChild(livesondockerx[i]);
                state.objectPosition[livesondockerx[i].className] = -1;
            } else if (state.boatPosition == "boatright") {
                lives.value.appendChild(livesondockerx[i]);
                state.objectPosition[livesondockerx[i].className] = 1;
            }
            // docker.value.removeChild(livesondocker[i]);
            // 可能是由于浅拷贝的原因，那边append之后这边自动消失了，就不用了remove了
        }


        //农夫不在场情况下：
        //狼和羊不能在一起
        //羊和菜不能在一起

        //左岸检验
        const livesonleft = lives.value.childNodes;
        const leftclass = [];
        for (let i = 0; i < livesonleft.length; i++) {
            leftclass.push(livesonleft[i].className);
        }
        let failure1 = leftclass.includes("wolf") && leftclass.includes("sheep") && !leftclass.includes("farmer")
        let failure2 = leftclass.includes("sheep") && leftclass.includes("vegetable") && !leftclass.includes("farmer")
        //右岸检验
        const livesonright = lives2.value.childNodes;
        const rightclass = [];
        for (let i = 0; i < livesonright.length; i++) {
            rightclass.push(livesonright[i].className);
        }
        let failure3 = rightclass.includes("wolf") && rightclass.includes("sheep") && !rightclass.includes("farmer")
        let failure4 = rightclass.includes("sheep") && rightclass.includes("vegetable") && !rightclass.includes("farmer")
        if (failure1 || failure3) {
            message.warning("狼吃掉了羊，游戏失败！")
            clearInterval(timer);
        }
        if (failure2 || failure4) {
            message.warning("羊吃掉了青菜，游戏失败！")
            clearInterval(timer);
        }
        //过河之后要进行成功检验
        const isSuccess = rightclass.includes("farmer") && rightclass.includes("sheep") && rightclass.includes("wolf") && rightclass.includes("vegetable")
        if (isSuccess) {
            message.success(`恭喜您游戏通关！用时${state.usedtime}秒！共走了${state.movesteps}步!`);
            clearInterval(timer);
            proxy.$confetti.addConfetti();
        }

    }, 2200);

}


const onoffboard = (e) => {
    if (state.usedtime == 0) {
        message.warning("请先点击开始游戏再进行操作！")
    }
    const checkedLive = e.target.parentNode;
    const checkClass = checkedLive.className;
    switch (state.objectPosition[checkClass]) {
        case 1:
            if (state.boatPosition == "boatleft") {
                message.warning("船在对岸，无法上船！")
            } else {
                state.objectPosition[checkClass] = 0;
                lives.value.removeChild(checkedLive);
                docker.value.appendChild(checkedLive);
            }

            break;
        case 0:
            if (state.boatPosition == "boatright" || state.boatPosition == "boat") {
                state.objectPosition[checkClass] = 1;
                docker.value.removeChild(checkedLive);
                lives.value.appendChild(checkedLive);
            } else if (state.boatPosition == "boatleft") {
                state.objectPosition[checkClass] = -1;
                docker.value.removeChild(checkedLive);
                lives2.value.appendChild(checkedLive);
            }
            break;
        case -1:
            if (state.boatPosition == "boatright") {
                message.warning("船在对岸，无法上船！")
            } else {
                state.objectPosition[checkClass] = 0;
                lives2.value.removeChild(checkedLive);
                docker.value.appendChild(checkedLive);
            }
            break;
    }
}
const rules = [
    "点击开始游戏计时开始",
    "点击角色即可上船",
    "只有农夫会划船",
    "小船每次最多只能载两个角色",
    "农夫不在时，狼会吃掉羊，羊会吃掉青菜，游戏失败",
    "所有角色安然无恙到达对岸游戏通关，用时越少，得分越高"
]

const openrules = () => {
    notification.open({
        message: '游戏规则',
        description:
            <ul>
                {rules.map(item => <li>{item}</li>)}
            </ul>,
        placement: 'topLeft',
    });
}
const initGame = () => {
    //右边的送到左边
    const livesonright = lives2.value.childNodes;
    const livesonrightx = [...lives2.value.childNodes];
    for (let i = 0; i < livesonrightx.length; i++) {
        lives.value.appendChild(livesonrightx[i]);
        state.objectPosition[livesonrightx[i].className] = 1;//一定要注意append之后要把objectPosition同步更新
    }
    //船上的送到左边
    const livesondocker = docker.value.childNodes;
    const livesondockerx = [...docker.value.childNodes];
    for (let i = 0; i < livesondockerx.length; i++) {
        lives.value.appendChild(livesondockerx[i]);
        state.objectPosition[livesondockerx[i].className] = 1;
    }

    //船回到左边
    state.boatPosition = "boat";

}
const startGame = () => {
    initGame();
    state.usedtime = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        state.usedtime++;
    }, 1000);
}

// const getRandomN = (arr = [], n = 1) => {
//     const pickedones = [];
//     if (n <= arr.length) {
//         while (pickedones.length < n) {
//             let r = Math.floor(Math.random() * arr.length);
//             const pickedIndexes = pickedones.map(item => item.index);
//             while (pickedIndexes.includes(r)) {
//                 r = Math.floor(Math.random() * arr.length);
//             }
//             pickedones.push({ item: arr[r], index: r });
//         }
//     } else {
//         console.log("getRandomN:n大于数组长度,自动为您取数组的全部元素");
//         return arr.map((item, index) => ({ item, index }))
//     }

//     return pickedones;
// }

const isWin = (left) => {
    for (let item in left) {
        if (left[item] === true && item !== "empty") {
            return false;
        }
    }
    return true;
}

const isLost = (left) => {
    const { wolf, sheep, vegetable, farmer } = left;
    const lost = [];
    lost.push((wolf && sheep && !farmer) || (!wolf && !sheep && farmer));
    lost.push((sheep && vegetable && !farmer) || (!sheep && !vegetable && farmer));
    return lost.includes(true);
}

const move = (left, visited, successfulRoute) => {
    if (isWin(left) || isLost(left)) {
        if (isWin(left)) {
            successfulRoute.push({ state: left });// 记录成功的状态
            return true;
        }
        else if (isLost(left) || visited.includes(JSON.stringify(left))) {
            return false;
        }
    } else {
        const sameside = [];
        for (let item in left) {
            if (left[item] === left.farmer && item !== "farmer") {
                sameside.push(item);
                if (!sameside.includes("empty")) {
                    sameside.push("empty");
                }
            }
        }

        for (const item of sameside) {
            const newState = { ...left };
            newState.farmer = !left.farmer;
            newState[item] = !left[item];//表示农夫自己过河

            // 检查是否已经走过该状态
            const stateString = JSON.stringify(newState);
            if (!visited.includes(stateString)) {
                visited.push(stateString);
                //找到一条可行的路径后递归回溯，将状态记录到successfulRoute中
                if (move(newState, visited, successfulRoute)) {
                    successfulRoute.unshift({ state: left, target: item }); // 记录成功的状态
                    return true;
                }
            }
        }
        return false;
    }

}

const stateSpace = () => {
    const initial = {
        farmer: true,
        wolf: true,
        sheep: true,
        vegetable: true,
        empty: true
    };
    const visited = [JSON.stringify(initial)];
    move(initial, visited, state.successfulRoute);

    state.successfulState = state.successfulRoute.map(item => {
        let istate = item.state;
        return {
            farmer: istate.farmer ? 1 : -1,
            wolf: istate.wolf ? 1 : -1,
            sheep: istate.sheep ? 1 : -1,
            vegetable: istate.vegetable ? 1 : -1,
        }
    })

}

onMounted(() => {
    openrules();
    stateSpace();
})
onUnmounted(() => {
    clearInterval(timer);
})
const isAllonLand = () => {
    for (let obj in state.objectPosition) {
        if (state.objectPosition[obj] == 0) {
            return false;
        }
    }
    return true;
}
const getTipWord = (tip) => {
    switch (tip) {
        case "wolf":
            return "带狼过河";
        case "sheep":
            return "带羊过河";
        case "vegetable":
            return "带青菜过河";
        case "empty":
            return "农夫自己过河";
        case undefined:
            return "您已成功过河！"
    }
}
const giveTip = () => {
    if (!isAllonLand()) {
        message.info('请先让所有角色上岸！');
    } else {
        const { farmer, wolf, sheep, vegetable } = state.objectPosition
        const tindex = state.successfulState.findIndex(item => {
            return item.farmer == farmer && item.wolf == wolf && item.sheep == sheep && item.vegetable == vegetable
        })
        if (tindex == -1) {
            message.info('请先点击开始游戏让所有角色归位再点击提示！');
        }
        console.log(state.successfulRoute[tindex + 1]);
        let tip = state.successfulRoute[tindex].target;
        const tipword = getTipWord(tip);
        message.info(`温馨提示：${tipword}!`)
    }

}
</script>

<template>
        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/sky.png'" class="bgouter"/>
        <div class="topbar">
            <div class="config">
                <a-button-group class="rules">

                    <a-button @click="openrules">游戏规则</a-button>
                    <a-button type="primary" @click="startGame">开始游戏</a-button>
                    <a-button @click="giveTip">提示</a-button>
                </a-button-group>

                <div class="time">
                    用时：<span>{{ state.usedtime }}</span> 秒
                </div>
            </div>
            <div class="operation">
                <button @click="passriver" class="passBtn">过河</button>
            </div>


        </div>


        <div class="xouter">
            <div class="leftland">
                <div class="lives" ref="lives" @click="onoffboard">
                    <div class="farmer">
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/农夫.png'" />
                    </div>
                    <div class="sheep">
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/羊.png'" />
                    </div>
                    <div class="wolf">
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/狼.png'" />
                    </div>
                    <div class="vegetable">
                        <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/青菜.png'" />
                    </div>
                </div>
            </div>
            <div class="river">
                <div :class="state.boatPosition">
                    <div class="docker" ref="docker" @click="onoffboard">

                    </div>
                    <div class="boatboard">

                    </div>
                </div>
            </div>
            <div class="rightland">
                <div class="lives2" ref="lives2" @click="onoffboard"></div>
            </div>
        </div>

</template>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 767px)";
@tablet: ~"only screen and (min-width: 768px) and (max-width: 991px)";
@desktop: ~"only screen and (min-width: 992px)";
.bgouter{
    position:absolute;
    width:100vw;
    height:88vh;
    z-index: -10;
}
.config {
    display: flex;
    height: 15vh;
    justify-content: space-between;
}

.operation {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rules {
    padding: 1em 0 0 2em;
}

.object(@height: 10vh) {
    height: @height;

    img {
        height: @height;

        &:hover {
            transform: scale(1.1);
        }
    }
}

.passBtn {
    border: none;
    width: 10vw;
    height: 7vh;
    font-size: 1.3em;
    border-radius: 10px;

    @media @mobile {
        width: 15vw;
    }

    &:hover {
        background-color: #bfbfbf;
    }

    &:active {
        background-color: #4f4e4e;
    }
}

.farmer {
    .object(15vh);

    @media @mobile {
        .object(10vh);
    }
}

.sheep {
    .object(7vh);

    @media @mobile {
        .object(5vh);
    }
}

.wolf {
    .object(11vh);

    @media @mobile {
        .object(6vh);
    }
}

.vegetable {
    .object(7vh);

    @media @mobile {
        .object(5vh);
    }
}

.topbar {
    height: 30vh;

    // align-items: center;
    .time {
        justify-self: end;
        padding: 1em 2em 0 0;

        span {
            color: rgb(243, 73, 73);
        }
    }


}

.xouter {
    width: 100vw;
    height: 70vh;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;

}

.leftland {
    position: relative;
    width: 20vw;
    height: 50vh;
    background-color: #232323;
}

.rightland {
    .leftland();
}

.boatleft {
    .boat();
    animation: passriver 2s ease-in-out forwards;
}

.boatright {
    .boat();
    animation: passriver2 2s ease-in-out forwards;
}

.boat {
    position: relative;
    top: -23vh;
    width: 20vw;
}

.boatboard {
    width: 20vw;
    height: 8vh;
    background-color: rgb(120, 31, 31);
    border-bottom-left-radius: 999em;
    border-bottom-right-radius: 999em;
}

.docker {
    width: 20vw;
    height: 15vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}


.river {
    flex: 1;
    height: 35vh;
    background-color: #49b1f5;
    position: relative;
}

@keyframes passriver {
    0% {
        left: 0;
    }

    100% {
        left: 40vw;
    }
}

@keyframes passriver2 {
    0% {
        left: 40vw;
    }

    100% {
        left: 0;
    }
}

.lives {
    position: relative;
    height: 10vh;
    top: -10vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}

.lives2 {
    position: relative;
    height: 10vh;
    top: -10vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}

</style>