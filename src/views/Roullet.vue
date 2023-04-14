<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { useStorage } from '@vueuse/core'
import moment from 'moment';


const newProduct = ref(null);
const selectedProduct = ref(null);
const dialog = ref(null);
const snackbar = ref(null);
const rotating = ref(false);
const canvas = ref(null);
const presetProducts = [
    "손가네", '용짜장', "맘스터치", "교직원식당", "한양김치찌개", "빨간파이프", "큰맘할매", "마카모인", "서브웨이", "천향마라탕"
];
const useProducts = useStorage('use-products', []);
const products = useStorage('products', []);

const colors = ref(["#dc0936", "#e6471d", "#f7a416", "#efe61f ", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"]);


// computed
const ctx = computed(() => {
    return canvas.value.getContext(`2d`);
})
const unUsedProducts = computed(() => {
    return products.value.filter((item) => {
        return !useProducts.value.includes(item);
    })
})


// onMounted
onMounted(() => {
    // 사용 제품 목록 확인
    if (!products.value.length) {
        products.value = presetProducts;
    }
    newMake();
})
const onClickTest = () => {
    useProducts.value = [];
}

const newMake = () => {
    const [cw, ch] = [canvas.value.width / 2, canvas.value.height / 2];
    const arc = Math.PI / (useProducts.value.length / 2);
    if (useProducts.value.length > 1) {
        for (let i = 0; i < useProducts.value.length; i++) {
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

        for (let i = 0; i < useProducts.value.length; i++) {
            const angle = (arc * i) + (arc / 2);

            ctx.value.save();

            ctx.value.translate(
                cw + Math.cos(angle) * (cw - 50),
                ch + Math.sin(angle) * (ch - 50),
            );

            ctx.value.rotate(angle + Math.PI / 2);

            useProducts.value[i].split(" ").forEach((text, j) => {
                ctx.value.fillText(text, 0, 30 * j);
            });

            ctx.value.restore();
        }
    } else {
        ctx.value.beginPath();
        ctx.value.fillStyle = colors.value[0];
        ctx.value.moveTo(cw, ch);
        ctx.value.arc(cw, ch, cw, 0, Math.PI * 2);
        ctx.value.fill();
        ctx.value.closePath();

        ctx.value.save();

        ctx.value.fillStyle = "#000";
        ctx.value.font = "30px Pretendard";
        ctx.value.textAlign = "center";

        if (useProducts.value.length >= 1) {
            ctx.value.fillText('2개 이상 골라주세요.', cw, ch);
        } else {
            ctx.value.fillText('메뉴를 선택해주세요.', cw, ch);
        }
        ctx.value.restore();
    }

}

const rotate = () => {
    snackbar.value = false;
    rotating.value = true;
    canvas.value.style.transform = `initial`;
    canvas.value.style.transition = `initial`;

    setTimeout(() => {

        const ran = Math.floor(Math.random() * useProducts.value.length);

        const arc = 360 / useProducts.value.length;
        const rotate = (ran * arc) + 3600 + (arc * 3 / 9 * useProducts.value.length) - (arc / 4 / 9 * useProducts.value.length);

        canvas.value.style.transform = `rotate(-${rotate}deg)`;
        canvas.value.style.transition = `2s`;

        setTimeout(() => {

            rotating.value = false;
            selectedProduct.value = useProducts.value[ran] == presetProducts[0] ? '또가네(?)' : useProducts.value[ran];
            snackbar.value = true;

        }, 2000);
    }, 1);
};

const onClickUseChip = (product) => {

    const newPrds = useProducts.value.filter(item => {
        console.info(item, product)
        return item !== product;
    });
    useProducts.value = [...newPrds]
    newMake();
}

const onClickUnUseChip = (product) => {
    useProducts.value.push(product);
    newMake();
}

const addNewProduct = () => {
    let newProducts = [...useProducts.value];
    newProducts.push(newProduct.value);
    useProducts.value = [...newProducts]
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
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ props }">
                <v-btn density="comfortable" prepend-icon="mdi-archive-edit-outline" v-bind="props">선택지 편집</v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field clearable label="새 메뉴" v-model="newProduct" append-icon="mdi-language-go"
                                    @click:append="addNewProduct"></v-text-field>
                                <v-card title="사용 메뉴" subtitle="">
                                    <template #text>
                                        <v-chip v-if="products.length" v-for='(product, prdIdx) in useProducts'
                                            :key='`${prdIdx}_${product}`' class="ma-2" closable
                                            :color="colors[prdIdx % (colors.length - 1)]" @click="onClickUseChip(product)">
                                            <template #default>
                                                <span class="text-black">{{ product }}</span>
                                            </template>
                                        </v-chip>
                                    </template>
                                </v-card>
                                <v-card title="미사용 메뉴" subtitle="">
                                    <template #text>
                                        <v-chip v-if="products.length" v-for='(product, prdIdx) in unUsedProducts'
                                            :key='`${prdIdx}_${product}`' class="ma-2" closable
                                            :color="colors[prdIdx % (colors.length - 1)]"
                                            @click="onClickUnUseChip(product)">
                                            <template #default>
                                                <span class="text-black">{{ product }}</span>
                                            </template>
                                        </v-chip>
                                    </template>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        닫기
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="text-h4 mb-6 text-center">"딴 소리 없기"</div>
    <div class="roullet mb-[100px] mx-auto">
        <canvas ref='canvas' width="380" height='380' class="mb-12"></canvas>
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
