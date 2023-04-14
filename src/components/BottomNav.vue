<script setup>
// import { useAppStore } from '@/stores/app'
// const { bottomNavi } = useAppStore();


</script>
<template>
    <v-bottom-navigation color="teal" grow>
        <v-btn to="/">
            <v-icon>mdi-calendar-blank</v-icon>
            식단표
        </v-btn>

        <v-btn to="/roullet">
            <v-icon>mdi-movie-roll</v-icon>
            룰렛
        </v-btn>

        <v-btn to="/ladder">
            <v-icon>mdi-ladder</v-icon>
            사다리
        </v-btn>
    </v-bottom-navigation>
</template>