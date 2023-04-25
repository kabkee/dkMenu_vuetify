<script setup>
import { computed } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { ref } from 'vue';

axios.defaults.withCredentials = true;

const dkMenu = ref(null);
const dkMenuTodayIdx = ref(null);
const dkMenuCurrentIdx = ref(0);
const today = ref(moment().format('YYYY-MM-DD'));
const todayData = ref(null);


let requestUrl = 'https://kabkee.azurewebsites.net/dkmenu';
// requestUrl = 'http://localhost:3000/dkmenu';

axios(requestUrl).then((response) => {
    dkMenu.value = response.data;

    // == Data of Current Date 찾기 ==
    // 1. 오늘 일짜 만들기
    // 2. Current Date 찾기
    todayData.value = dkMenu.value.filter((dkMenuByDate, menuIdx) => {
        if (dkMenuByDate?.date?.normal == today.value) {
            dkMenuByDate.date.today = true;
            dkMenuTodayIdx.value = menuIdx;
            dkMenuCurrentIdx.value = menuIdx;
            return true;
        }
        return;
    })
})

const weekdayTitle = ['', '월', '화', '수', '목', '금', '토', '일'];
const dateTitle = computed(() => {
    if (dkMenu.value && dkMenu.value[dkMenuCurrentIdx.value]) {
        return `${dkMenu.value[dkMenuCurrentIdx.value].date.normal}(${weekdayTitle[moment(dkMenu.value[dkMenuCurrentIdx.value].date.normal).weekday()]}) ${dkMenu.value[dkMenuCurrentIdx.value].date.today ? '[오늘]' : ''}`
    }
    return today.value;
})

const barTheme = computed(() => {
    const nowMoment = moment();
    let theme = 'primary';
    if (dkMenu.value) {
        const currentDate = moment(dkMenu.value[dkMenuCurrentIdx.value].date.normal);
        if (currentDate.isAfter(nowMoment, 'days')) {
            theme = 'info';
        } else if (currentDate.diff(nowMoment, 'days') < 0) {
            theme = 'grey-lighten-2'
        }
    }
    return theme;
    /*
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',

    */
})

const theMenuDate = computed(() => {
    if (dkMenu.value && dkMenuCurrentIdx.value !== null) {
        return dkMenu.value[dkMenuCurrentIdx.value];
    }
    return {}
})

const createContent = (contents) => {
    const created = [...contents];
    created.shift();
    return created.join('<br>');
}

const formatThousands = (num) => {
    return (
        Number(num)
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    );
};


</script>


<template>
    <v-app-bar :color="barTheme">
        <template v-slot:prepend>
            <v-icon icon="mdi-arrow-left" v-if="dkMenuCurrentIdx > 0" @click="dkMenuCurrentIdx -= 1"></v-icon>
        </template>

        <v-app-bar-title><template #default>
                <div class="text-center font-bold">{{ dateTitle }}</div>
            </template></v-app-bar-title>

        <template v-slot:append>
            <v-icon icon="mdi-calendar-today" class="mr-2" v-if="dkMenuCurrentIdx != dkMenuTodayIdx"
                @click="dkMenuCurrentIdx = dkMenuTodayIdx"></v-icon>
            <v-icon icon="mdi-arrow-right" v-if="dkMenuCurrentIdx < dkMenu?.length - 1"
                @click="dkMenuCurrentIdx += 1"></v-icon>
        </template>
    </v-app-bar>

    <v-main class="pt-0">
        <v-container fluid>
            <v-row dense>
                <v-col cols="12" v-if="theMenuDate && theMenuDate.content">
                    <v-card :subtitle="theMenuDate.content.breakfast.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>아침</span>
                                <v-chip class='ml-4' v-if="theMenuDate.content.breakfast.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDate.content.breakfast.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDate.content.breakfast.content)"></p>
                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDate.content.lunch.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>점심 </span>
                                <v-chip class='ml-4' v-if="theMenuDate.content.lunch.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDate.content.lunch.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDate.content.lunch.content)"></p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDate.content.dinner.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>저녁 </span>
                                <v-chip class='ml-4' v-if="theMenuDate.content.dinner.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDate.content.dinner.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDate.content.dinner.content)"></p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDate.content.etc.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>기타 </span>
                                <v-chip class='ml-4' v-if="theMenuDate.content.etc.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDate.content.etc.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDate.content.etc.content)"></p>

                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
