<script setup>
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import tt from '@tomtom-international/web-sdk-maps';
// import Home from './pages/Home.vue';
// import Settings from './pages/Settings.vue'



const router = useRouter();
function checkUserInfo(){
  if (localStorage.getItem("name")){
    if (sessionStorage.getItem("name")){
      router.push('/')
    }else {
      router.push('/SignIn')
    }
  } else {
    router.push('/SignUp')
  }
}

onMounted(()=>{
  checkUserInfo();

})


// tt.map({
//     key : "rPaGp7Oo24i6xuysuzK6wk5QeOFs0i6G",
//     container : "my-map",
// })
</script>

<template>
  <!-- <RouterLink to="/">Home</RouterLink> |
  <RouterLink to="/SignUp">SignUp</RouterLink> |
  <RouterLink to="/SignIn">SignIn</RouterLink>  -->
  <!-- <div class="border w-screen h-screen" id="my-map"></div> -->
  <RouterView></RouterView>
</template>



