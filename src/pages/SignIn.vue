<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const password = ref ('');
const router = useRouter();
const hasError = ref(false);
const modalCtrl = reactive({
    visible: false,
    title: "Sorry there is an Error!!!",
    content: "",
    popupDisplay() {
    this.visible = true;
    setTimeout(() => {
        this.visible = false
    }, 5000)
    },
});

function credentialsVerification(){
    let userName = localStorage.getItem("name");
    let userPassword = localStorage.getItem("password");

    if (name.value == userName && password.value == userPassword){
        sessionStorage.setItem("name", userName)
        router.push('/');
    }else{ 
        modalCtrl.popupDisplay();
    }
}
</script>

<template>
    <div v-if="!modalCtrl.visible" class="flex m-auto justify-center items-center h-[600px] w-full">
        <div class="w-[400px] border-2 h-[400px] flex flex-col justify-center items-center" >
            <form @submit.prevent="credentialsVerification">
                <div>
                    <input autocomplete="off" type="text" name="Name" id="Name" placeholder="Name" v-model="name" class="border mb-5 w-[300px] h-10 px-3"/>
                </div>
                <div>
                    <input autocomplete="new-password" type="password" name="Password" id="Password" placeholder="Password" v-model="password" class="border mb-5 w-[300px] h-10 px-3"/>
                </div>
                <button @click.prevent="credentialsVerification">Sign In</button>
            </form>        
        </div>
    </div>
    <div v-if="modalCtrl.visible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="bg-white rounded-lg p-8">
        <!-- Modal Content -->
        <h2 class="text-2xl font-medium mb-4">{{ modalCtrl.title }}</h2>
    </div>
    </div>
</template>