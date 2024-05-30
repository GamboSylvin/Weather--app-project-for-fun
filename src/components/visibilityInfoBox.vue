<script setup>

const props = defineProps({
    visibility: Number,
    message : String
})
</script>

<template>
    <div class="bg-slate-300 w-36 md:w-60 rounded-xl p-2">
        <div class=" flex items-center font-semibold gap-3 mb-3">
            <svg class="w-6 h-6 fill-slate-500" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h48v48h-48z" fill="none"/><path d="M24 9c-10 0-18.54 6.22-22 15 3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
            </svg>
            <span>Visibility</span>
        </div>
        <div class="text-4xl font-semibold ml-2 mb-3">
            {{ `${visibility}Km` }}
        </div>
        <div class=" text-sm font-semibold ml-2">
            {{ message }}
        </div>
    </div>
</template>