<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { authentication } from '../outerModule/authentication';

const name = ref("");
const email = ref("");
const  password = ref("");
let currentRoute = useRouter()

function storeCredentials(){
    if (!nameErrorCheck() && !passwordErrorCheck() && authentication.emailAuthentication){
        localStorage.setItem("name", name.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);

        currentRoute.push('/SignIn');
    }
}
function nameErrorCheck(){
    let errorMessage = authentication.nameAuthentication(name.value)
    if (authentication.isInvalidName){
        return errorMessage
    }else{
        return false //Returns false if there is no error in the name input
    }
}
function passwordErrorCheck(){
    let errorMessage = authentication.passwordAuthentication(password.value)
    if (!authentication.isGoodPassword){
        return errorMessage;
    }else{
        return false;
    }
}
const low = ref('Low security password')
const high = ref('High security password')
function passwordLevelCheck(){
    if (passwordErrorCheck()){
        return passwordErrorCheck()
    }else {
        let levelOfSecurity = authentication.passwordAuthentication(password.value)
        if (levelOfSecurity.isStrong && levelOfSecurity.isVeryStrong){
            return high.value;
        }else {
            return low.value;
        }
    }
}

</script>

<template>
    <div class="flex m-auto justify-center items-center h-[600px] w-full">
        <div class="w-[400px] border-2 h-[400px] flex flex-col justify-center items-center" >
            <form @submit.prevent="storeCredentials">
                <div>
                    <input type="text" name="Name" id="Name" placeholder="Name" @change="authentication.nameAuthentication(name)" v-model.lazy="name" class="border mb-5 w-[300px] h-10 px-3"/>
                </div>
                <div v-if="name==''? false: nameErrorCheck()" class="text-red-500">{{ nameErrorCheck() }}</div>
                <div>
                    <input type="email" name="Email" id="Email" placeholder="Email" v-model="email" class="border mb-5 w-[300px] h-10 px-3"/>
                </div>
                <div>
                    <input type="password" name="Password" id="Password" placeholder="Password" @change="authentication.passwordAuthentication(password)" v-model.lazy="password" class="border mb-5 w-[300px] h-10 px-3"/>
                </div>
                <div v-if="password==''? false: passwordErrorCheck()" class="text-red-500">{{ passwordErrorCheck() }}</div>
                <div v-if="!passwordErrorCheck()" :class=" passwordLevelCheck()==low? 'text-yellow-500':'text-green-500'">{{ passwordLevelCheck() }}</div>
                <button>Sign Up</button>
            </form>        
        </div>
    </div>
</template>