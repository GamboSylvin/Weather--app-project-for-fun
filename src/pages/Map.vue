<script setup>

import navBar from '../components/navBar.vue';
import { useRouter } from 'vue-router'

const router = useRouter();
function goToSettings(){
  router.push('/Settings')
}
function goToMap(){
  router.push('/Map')
}
function goToMain(){
  router.push('/')
}
</script>

<template>
    <div>
        Hello Map section
        <navBar @go-to-settings="goToSettings()" @go-to-map="goToMap()" @go-to-main="goToMain()"></navBar>
    </div>
    <RouterView></RouterView>
</template>