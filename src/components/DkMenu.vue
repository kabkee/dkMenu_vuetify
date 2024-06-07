<script setup>
import { computed, onBeforeMount, watch } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { get } from 'aws-amplify/api';

axios.defaults.withCredentials = false;
const cookies = useCookies(['menuType']);

const dkMenuLoading = ref(false);
const dkMenuType = ref(null);
const dkMenuOfficer = ref(null);
const dkMenuStudent = ref(null);
const dkMenuTodayIdx = ref(null);
const dkMenuCurrentIdx = ref(0);
const today = ref(moment().format('YYYY-MM-DD'));
const todayData = ref(null);

let requestUrl = '/';
// requestUrl = 'https://kabkee.azurewebsites.net/dkmenu';
requestUrl = 'http://localhost:3000';


onBeforeMount(() => {

    dkMenuType.value = cookies.get('menuType') || 'officer';

    // axios(requestUrl).then((response) => {
    //     dkMenuOfficer.value = response.data?.officer || [];
    //     dkMenuStudent.value = response.data?.student || [];

    //     // == Data of Current Date 찾기 ==
    //     // 1. 오늘 일짜 만들기
    //     // 2. Current Date 찾기
    //     todayData.value = dkMenuOfficer.value.filter((dkMenuByDate, menuIdx) => {
    //         if (dkMenuByDate?.date?.normal == today.value) {
    //             dkMenuByDate.date.today = true;
    //             dkMenuTodayIdx.value = menuIdx;
    //             dkMenuCurrentIdx.value = menuIdx;
    //             return true;
    //         }
    //         return;
    //     })
    // })
    callApi();
})
async function callApi() {
    dkMenuLoading.value = true;
    try {
        const restOperation = get({
            apiName: 'dkmenuapi',
            path: '/',
            options: {
                body: {
                    // message: 'Mow the lawn'
                }
            }
        });
        
        const { body } = await restOperation.response;
        const response = await body.json();

        console.info('response', response)

        dkMenuOfficer.value = response.officer || [];
        dkMenuStudent.value = response.student || [];
        // == Data of Current Date 찾기 ==
        // 1. 오늘 일짜 만들기
        // 2. Current Date 찾기
        todayData.value = dkMenuOfficer.value.filter((dkMenuByDate, menuIdx) => {
            if (dkMenuByDate?.date?.normal == today.value) {
                dkMenuByDate.date.today = true;
                dkMenuTodayIdx.value = menuIdx;
                dkMenuCurrentIdx.value = menuIdx;
                return true;
            }
            return;
        })

    } catch (error) {
        console.error('API 호출 오류:', error);
    }
    dkMenuLoading.value = false;
}

watch(dkMenuType, (newValue, oldValue) => {
    let type = newValue;
    if(!type){
        type = oldValue;
    }
    dkMenuType.value = type;
    cookies.set('menuType', type);
    //   console.log(`dkMenuType:: ${newValue}`)
});


const weekdayTitle = ['', '월', '화', '수', '목', '금', '토', '일'];
const dateTitle = computed(() => {
    if (dkMenuOfficer.value && dkMenuOfficer.value[dkMenuCurrentIdx.value]) {
        return `${dkMenuOfficer.value[dkMenuCurrentIdx.value].date.normal}(${weekdayTitle[moment(dkMenuOfficer.value[dkMenuCurrentIdx.value].date.normal).weekday()]}) ${dkMenuOfficer.value[dkMenuCurrentIdx.value].date.today ? '[오늘]' : ''}`
    }
    return today.value;
})

const barTheme = computed(() => {
    const nowMoment = moment();
    let theme = 'primary';
    if (dkMenuOfficer.value) {
        const currentDate = moment(dkMenuOfficer.value[dkMenuCurrentIdx.value].date.normal);
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

const theMenuDateOffice = computed(() => {
    if (dkMenuOfficer.value && dkMenuCurrentIdx.value !== null) {
        return dkMenuOfficer.value[dkMenuCurrentIdx.value];
    }
    return {}
})
const theMenuDateStudent = computed(() => {
    if (dkMenuStudent.value && dkMenuCurrentIdx.value !== null) {
        return dkMenuStudent.value[dkMenuCurrentIdx.value];
    }
    return {}
})

const createContent = (contents) => {
    let created = [...contents];
    created.shift();

    created = created.map((line) => {
        let newLine = line.replace(/([￦\\￥¥$][" "]?[0-9,]+)/g, '<span class="badge">$&</span>');
        newLine = newLine.replace(/([\\]+)/g, '￦');
        return newLine
    })
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
     <div v-if="dkMenuLoading" class="fixed d-flex left-0 top-0 w-full h-full align-center justify-center mt-5 bg-gray-500/40 z-10">
        <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
    </div>
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
            <v-icon icon="mdi-arrow-right" v-if="dkMenuCurrentIdx < dkMenuOfficer?.length - 1"
                @click="dkMenuCurrentIdx += 1"></v-icon>
        </template>
    </v-app-bar>

    <v-main class="pt-0">
       
        <v-container fluid>
            <div class="d-flex flex-column align-center bg-grey-lighten-4 pa-2">
                <v-btn-toggle v-model="dkMenuType" color="blue-darken-1">
                    <v-btn value="officer">교직원 식당</v-btn>
                    <v-btn value="student">학생 식당</v-btn>
                </v-btn-toggle>
            </div>
            <v-row v-if='dkMenuType == "officer"' dense>
                <v-col cols="12" v-if="theMenuDateOffice && theMenuDateOffice.content">
                    <v-card :subtitle="theMenuDateOffice.content.breakfast.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>아침</span>
                                <v-chip class='ml-4' v-if="theMenuDateOffice.content.breakfast.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateOffice.content.breakfast.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateOffice.content.breakfast.content)">
                            </p>
                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateOffice.content.lunch.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>점심 </span>
                                <v-chip class='ml-4' v-if="theMenuDateOffice.content.lunch.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateOffice.content.lunch.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateOffice.content.lunch.content)"></p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateOffice.content.dinner.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>저녁 </span>
                                <v-chip class='ml-4' v-if="theMenuDateOffice.content.dinner.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateOffice.content.dinner.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateOffice.content.dinner.content)">
                            </p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateOffice.content.etc.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>기타 </span>
                                <v-chip class='ml-4' v-if="theMenuDateOffice.content.etc.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateOffice.content.etc.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateOffice.content.etc.content)"></p>

                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else dense>
                <v-col cols="12" v-if="theMenuDateStudent && theMenuDateStudent.content">
                    <v-card :subtitle="theMenuDateStudent.content.breakfast.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>아침</span>
                                <v-chip class='ml-4' v-if="theMenuDateStudent.content.breakfast.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateStudent.content.breakfast.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4"
                                v-html="createContent(theMenuDateStudent.content.breakfast.content)"></p>
                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateStudent.content.lunch.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>점심 </span>
                                <v-chip class='ml-4' v-if="theMenuDateStudent.content.lunch.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateStudent.content.lunch.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateStudent.content.lunch.content)">
                            </p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateStudent.content.dinner.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>저녁 </span>
                                <v-chip class='ml-4' v-if="theMenuDateStudent.content.dinner.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateStudent.content.dinner.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateStudent.content.dinner.content)">
                            </p>

                        </template>
                    </v-card>
                    <v-card :subtitle="theMenuDateStudent.content.etc.content[0]" class="my-2">
                        <template #title>
                            <span class="font-bold">
                                <span>기타 </span>
                                <v-chip class='ml-4' v-if="theMenuDateStudent.content.etc.price">
                                    <v-icon start icon='mdi-currency-krw'></v-icon> {{
                                        formatThousands(theMenuDateStudent.content.etc.price) }}
                                </v-chip></span>
                        </template>
                        <template #text>
                            <p class="text-xl pl-4" v-html="createContent(theMenuDateStudent.content.etc.content)"></p>

                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<style>
.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 90%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
}
</style>