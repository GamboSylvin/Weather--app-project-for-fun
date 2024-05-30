<script setup>
import { onMounted, reactive, ref } from 'vue';
import hourlyInfo from './hourlyInfo.vue';
import { data } from 'autoprefixer';
const props = defineProps({
    recievedData:Object,
})
    const dataObject = reactive({})
    const displayHourlyInfo = ref(0)
    dataObject.value = props.recievedData
    displayHourlyInfo.value = 1
 


</script>

<template>
    <div class="flex bg-slate-200 rounded-xl p-6 h-60 my-10 mx-10 overflow-auto gap-10 items-center">
        <hourlyInfo v-if="dataObject.value" :recievedData="dataObject" :id="1"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="2"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="3"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="4"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="5"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="6"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="7"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="8"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="9"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="11"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="12"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="13"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="14"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="15"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="16"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="17"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="18"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="19"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="20"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="21"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="22"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="23"></hourlyInfo>
        <hourlyInfo v-if="dataObject" :recievedData="dataObject" :id="24"></hourlyInfo>
    </div>
</template>