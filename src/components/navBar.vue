<script setup>

const emit = defineEmits(["goToSettings","goToMap", "goToMain"])
function goToSettings(){
    emit('goToSettings')
}
function goToMain(){
    emit('goToMain')
}
function goToMap(){
    emit('goToMap')
}
</script>

<template>
    <div class="flex justify-around items-center w-full">
        <button @click="goToMap()" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Map</button>
        <button @click="goToMain()" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Main</button>
        <button @click="goToSettings()" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Settings</button>
    </div>
</template>