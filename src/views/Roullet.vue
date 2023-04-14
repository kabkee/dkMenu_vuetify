<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';

const newProduct = ref(null);
const selectedProduct = ref(null);
const snackbar = ref(null);
const rotating = ref(false);
const canvas = ref(null);
const products = ref([
    "손가네", '용짜장', "맘스터치", "교직원식당", "한양김치찌개", "빨간파이프"
]);
const colors = ref(["#dc0936", "#e6471d", "#f7a416", "#efe61f ", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"]);

const ctx = computed(() => {
    return canvas.value.getContext(`2d`);
})
onMounted(() => {
    newMake();
})


const newMake = () => {
    const [cw, ch] = [canvas.value.width / 2, canvas.value.height / 2];
    const arc = Math.PI / (products.value.length / 2);

    for (let i = 0; i < products.value.length; i++) {
        ctx.value.beginPath();
        ctx.value.fillStyle = colors.value[i % (colors.value.length - 1)];
        ctx.value.moveTo(cw, ch);
        ctx.value.arc(cw, ch, cw, arc * (i - 1), arc * i);
        ctx.value.fill();
        ctx.value.closePath();
    }

    ctx.value.fillStyle = "#000";
    ctx.value.font = "18px Pretendard";
    ctx.value.textAlign = "center";

    for (let i = 0; i < products.value.length; i++) {
        const angle = (arc * i) + (arc / 2);

        ctx.value.save();

        ctx.value.translate(
            cw + Math.cos(angle) * (cw - 50),
            ch + Math.sin(angle) * (ch - 50),
        );

        ctx.value.rotate(angle + Math.PI / 2);

        products.value[i].split(" ").forEach((text, j) => {
            ctx.value.fillText(text, 0, 30 * j);
        });

        ctx.value.restore();
    }
}

const rotate = () => {
    snackbar.value = false;
    rotating.value = true;
    canvas.value.style.transform = `initial`;
    canvas.value.style.transition = `initial`;

    setTimeout(() => {

        const ran = Math.floor(Math.random() * products.value.length);

        const arc = 360 / products.value.length;
        const rotate = (ran * arc) + 3600 + (arc * 3 / 9 * products.value.length) - (arc / 4 / 9 * products.value.length);

        canvas.value.style.transform = `rotate(-${rotate}deg)`;
        canvas.value.style.transition = `2s`;

        setTimeout(() => {

            rotating.value = false;
            selectedProduct.value = products.value[ran];
            snackbar.value = true;

        }, 2000);
    }, 1);
};

const onClickRemoveChip = (product) => {
    const newPrds = products.value.filter(item => {
        console.info(item, product)
        return item !== product;
    });

    products.value = [...newPrds]
    newMake();
}

const addNewProduct = () => {
    let newProducts = [...products.value];
    newProducts.push(newProduct.value);
    products.value = [...newProducts]
    newMake();
}
</script>

<template>
    <v-snackbar v-model="snackbar" location="top">
        <span class="text-3xl">
            {{ selectedProduct }}
        </span>
        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
    <div class="my-4 p-4">
        <v-text-field clearable label="새 메뉴" v-model="newProduct" append-icon="mdi-language-go"
            @click:append="addNewProduct"></v-text-field>

        <div class="text-center">
            <v-chip v-if="products.length" v-for='(product, prdIdx) in products' :key='`${prdIdx}_${product}`' class="ma-2"
                size="x-large" closable :color="colors[prdIdx % (colors.length - 1)]"
                @click:close="onClickRemoveChip(product)">
                {{ product }} {{ prdIdx }}
            </v-chip>
        </div>
    </div>
    <div class="roullet mb-[100px]">
        <canvas ref='canvas' width="380" height='380'></canvas>
        <button class="rock" :disabled="rotating" @click="rotate()">룰렛 돌리기</button>
    </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

* {
    font-family: Pretendard;
}

body {
    background: #f7f8fc;
}

canvas {
    transition: 2s;
}

button.rock {
    background: #febf00;
    margin-top: 1rem;
    padding: .8rem 1.8rem;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 5px;
    transition: .2s;
    cursor: pointer;
}

button.rock:active {
    background: #444;
    color: #f9f9f9;
}

div.roullet {
    width: 380px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
}

div.roullet::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 50px;
    border-radius: 5px;
    background: #000;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 22;
}
</style>
