<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { METEO_API_KEY } from '../constants/env.js';
import { reactive, ref } from 'vue';
import { data } from 'autoprefixer'
import { useRouter } from 'vue-router'
import TestComponents from '../components/testComponents.vue';
import InfoBox from '../components/infoBox.vue';
import WindInfoBox from '../components/windInfoBox.vue';
import HumidityInfoBox from '../components/humidityInfoBox.vue';
import VisibilityInfoBox from '../components/visibilityInfoBox.vue'
import forecastInfoBox from '../components/forecastInfoBox.vue';
import Visibility from '../cards/visibilityCard.js';
import { fetchData } from '../components/componentDependencies/forecastGetData.js'
import navBar from '../components/navBar.vue';

const userName = ref(localStorage.getItem('name'));
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

async function getDataObject(location){
    let response= await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${METEO_API_KEY}`,{
        headers:{
                "retry-after" : "3600",
        }
    })

    let json = await response.json()

    return json;
}


async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function displayCurrentData(){
    const locationInLatAndLong = ref("")
    let position = await getCurrentPosition()
    locationInLatAndLong.value= `${position?.coords?.latitude},${position?.coords?.longitude}`
    displayData(locationInLatAndLong.value)
}

displayCurrentData();


function clearSearchBar(){
    const searchBarElement= document.querySelector('#searchBar')
    searchBarElement.value='';
    
}

const weatherIcon = reactive({
    isCloudy : false,
    isRainy : false,
    isSunny : false,
    isSnowy : false,
    isPartlyCloudy : false,
    rainIntensity : 0,
    snowIntensity : 0,
    cloudCover : 0,
    setIsCloudy (){
        if (this.rainIntensity > 1 || this.snowIntensity > 1)
        {
            this.isCloudy = false;
        }else if(this.cloudCover >= 70){
            this.isCloudy = true;
        }else{
            this.isCloudy = false;
        }
    },
    setIsPartlyCloudy (){
        if (this.rainIntensity > 1 || this.snowIntensity > 1)
        {
            this.isPartlyCloudy = false;
        }else if(this.cloudCover >= 40 && this.cloudCover < 70){
            this.isPartlyCloudy = true;
        }else{
            this.isPartlyCloudy = false;
        }
    },
    setIsSunny (){
        if (this.rainIntensity > 1 || this.snowIntensity > 1)
        {
            this.isSunny = false;
        }else if(this.cloudCover < 40){
            this.isSunny = true;
        }else{
            this.isSunny= false;
        }
    },
    setIsRainy (){
        if(this.rainIntensity > 1){
            this.isRainy = true;
        }else{
            this.isRainy= false;
        }
    },
    setIsSnowy (){
        if(this.snowIntensity >1){
            this.isSnowy = true;
        }else{
            this.isSnowy= false;
        }
    },
    getInfoForWeatherIcon(Data) {
        this.cloudCover = Data?.data?.values?.cloudCover
        this.rainIntensity = Data?.data?.values?.rainIntensity
        this.snowIntensity = Data?.data?.values?.snowIntensity
    },
    setStates(){
        this.setIsCloudy()
        this.setIsSnowy()
        this.setIsSunny()
        this.setIsRainy()
        this.setIsPartlyCloudy()
    },
})

const uvIndex = reactive({
    uvIndexValue : 0,
    uvIndexMessage : "",
    setUvIndexValue(Data){
        this.uvIndexValue = Data?.data?.values?.uvIndex
        return this.uvIndexValue
    },
    setUvIndexMessage(){
        if(this.uvIndexValue <= 2){
            this.uvIndexMessage ="Low"
        }else if (this.uvIndexValue >=3 && this.uvIndexValue<=7){
            this.uvIndexMessage ="Moderate"
        }else if(this.uvIndexValue >=8 && this.uvIndexValue<10){
            this.uvIndexMessage = "High"
        }else{
            this.uvIndexMessage = "Very High"
        }
        return this.uvIndexMessage
    }
})
const windInfo = reactive({
    windSpeed : 0,
    windDirection : 0,
    windGust : 0,
    getSpeedAndConvertToKmh(Data){
        this.windSpeed = Math.ceil(Data?.data?.values?.windSpeed * 3.6);
        this.windGust = Math.ceil(Data?.data?.values?.windGust * 3.6);
        return {
            windSpeed : this.windSpeed,
            windGust : this.windGust
        }
    },
    getWindDirection(Data){
        this.windDirection = Data?.data?.values?.windDirection
        return this.windDirection
    },
})

const humidityInfo = reactive({
    humidity : 0,
    dewPoint : 0,
    getHumidity(Data){
        this.humidity = Data?.data?.values?.humidity
        return this.humidity
    },
    getDewPoint(Data){
        this.dewPoint = Data?.data?.values?.dewPoint
        return this.dewPoint
    },
})
const visibilityInfo = new Visibility(0,-1)


const temperatureValue = ref('');
const locationSearched = ref('');
const locatonDisplayed = ref('');
const uvIndexValue = ref(0);
const uvIndexMessage = ref("");
const windDirection = ref(0);
const windSpeed = ref('');
const windGust = ref(0);
const dewPoint = ref('');
const humidity = ref(0);
const apparentTemperature = ref('');
const visibility = ref('');
const visibilityMessage = ref('');
const displayForecast = ref(0);

const forecastFetch = new fetchData({});
const forecastData = reactive({});


async function displayData(location) {
    let loadedData = await getDataObject(location)
    let forecastLoadedData = await forecastFetch.getDataObject(location)
    forecastData.value = forecastLoadedData
    displayForecast.value = 1;
    console.log(forecastLoadedData)
    console.log(loadedData)
    temperatureValue.value= loadedData.data.values.temperature;
    apparentTemperature.value= loadedData.data.values.temperatureApparent;
    locatonDisplayed.value=isNaN(location.charAt(0)) ? location:"My Location";
    weatherIcon.getInfoForWeatherIcon(loadedData)
    weatherIcon.setStates()
    uvIndexValue.value = uvIndex.setUvIndexValue(loadedData)
    uvIndexMessage.value = uvIndex.setUvIndexMessage()
    windSpeed.value = windInfo.getSpeedAndConvertToKmh(loadedData).windSpeed
    windGust.value = windInfo.getSpeedAndConvertToKmh(loadedData).windGust
    windDirection.value = windInfo.getWindDirection(loadedData)
    humidity.value = humidityInfo.getHumidity(loadedData)
    dewPoint.value = humidityInfo.getDewPoint(loadedData)
    visibility.value = visibilityInfo.getVisibility(loadedData)
    visibilityMessage.value = visibilityInfo.displayVisibilityMessage(visibility.value)
    
    

    clearSearchBar();
    // locationSearched.value='';
}
</script>

<template>
    <div class="bg-slate-200">
        <div class="bg-slate-800 h-full md:w-3/5 m-auto">
            <div class="py-7 flex flex-col  items-center">
                <div class="mb-4 text-slate-200">Hello <span class="font-bold">{{ userName }}</span>! Nice to see you again</div>
                <div class="flex w-3/4 h-10 relative mb-10">
                    <input type="search" name="searchBar" id="searchBar" placeholder="Search for a town"
                    class="peer transition-all w-full h-full rounded-xl bg-slate-500 px-10 focus:px-3 outline-none text-slate-400" v-model.lazy="locationSearched" @change="displayData(locationSearched)"/>
                    <label for="searchBar" class="absolute origin-center scale-150 left-3 top-1/2 -translate-y-1/2 transition-all peer-focus:opacity-0 peer-focus:left-1">
                        <svg class="w-4 h-4 text-blue-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </label>
                </div>
                <!-- <TestComponents></TestComponents> -->
                <div class="flex gap-7 DisplayMainInfo items-center text-center font-semibold text-5xl text-slate-200">
                    <div class="weatherIcon">
                        <svg v-if="weatherIcon.isRainy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-24 h-24 fill-current rainy">
                            <path d="M398.2,137.208a144.013,144.013,0,0,0-284.545.979,122.364,122.364,0,0,0-64.357,32.926A109.4,109.4,0,0,0,16,249.619c0,31.119,12.789,60.762,36.01,83.469q2.84,2.776,5.845,5.347l11.327-33.981C56.091,289.3,48,270.017,48,249.619c0-42.362,35.724-78.015,81.329-81.168l14.055-.972.814-14.065a111.995,111.995,0,0,1,223.589-.22l.891,14.888,14.913.155c46.592.488,80.409,34.714,80.409,81.382,0,33.152-16.706,61.38-41.84,75.9L409.032,364.9a110.012,110.012,0,0,0,54.938-32.358C484.625,310.339,496,280.889,496,249.619,496,190.507,454.859,144.4,398.2,137.208Z"></path>
                            <polygon points="126.029 496 159.817 496 223.153 309.136 192.847 298.864 126.029 496"></polygon>
                            <polygon points="294.029 496 327.817 496 391.153 309.136 360.847 298.864 294.029 496"></polygon>
                            <polygon points="290.11 251.033 225.781 448 259.445 448 320.529 260.967 290.11 251.033"></polygon>
                            <polygon points="128.791 251.033 64.461 448 98.125 448 159.209 260.967 128.791 251.033"></polygon>
				        </svg> 
                        <svg v-if="weatherIcon.isSunny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-24 h-24 p-2 text-yellow-500 fill-current sunny">
                            <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
                            <rect width="32" height="48" x="240" y="16"></rect>
                            <rect width="32" height="48" x="240" y="448"></rect>
                            <rect width="48" height="32" x="448" y="240"></rect>
                            <rect width="48" height="32" x="16" y="240"></rect>
                            <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
                            <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
                            <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
                            <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
                        </svg>
                        <svg v-if="weatherIcon.isCloudy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-24 h-24 fill-current cloudy">
                            <path d="M382.76,432H136c-30.732,0-61.371-12.725-84.061-34.912-23.221-22.707-36.009-52.35-36.009-83.469A109.4,109.4,0,0,1,49.136,235.2a122.281,122.281,0,0,1,62.794-32.707V200c0-79.4,64.6-144,144-144s144,64.6,144,144v1.453c55.716,7.939,96,53.729,96,112.166,0,31.27-11.375,60.72-32.031,82.927A109.747,109.747,0,0,1,382.76,432ZM255.93,88a112.127,112.127,0,0,0-112,112v31.405l-14.864,1.059c-45.5,3.239-81.136,38.887-81.136,81.155C47.93,359.635,89.084,400,136,400H382.76c45.515,0,81.17-37.943,81.17-86.381,0-46.566-33.731-80.791-80.2-81.379l-15.8-.2V200A112.127,112.127,0,0,0,255.93,88Z"></path>
                        </svg>
                        <svg v-if="weatherIcon.isPartlyCloudy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-24 h-24 fill-current partlyCloudy">
                            <path d="M399.667,264.875v-3.813c0-79.4-64.6-144-144-144-2.2,0-4.391.057-6.569.156A116.689,116.689,0,1,0,112.315,247.444c-.422,4.484-.648,9.025-.648,13.618v3.813A116.633,116.633,0,0,0,132.287,496.3H379.046a116.633,116.633,0,0,0,20.621-231.427ZM48.75,132.688a84.677,84.677,0,0,1,168.705-10.47,144.606,144.606,0,0,0-98.59,93.876A84.807,84.807,0,0,1,48.75,132.688ZM379.046,464.3H132.287a84.619,84.619,0,0,1-3.9-169.148l15.277-.69v-33.4a112,112,0,1,1,224,0v33.4l15.277.69a84.619,84.619,0,0,1-3.9,169.148Z"></path>
                        </svg>
                        <svg v-if="weatherIcon.isSnowy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-24 h-24 fill-current snowy">
                            <polygon points="135.279 206.728 224.136 258.323 144.097 304.797 48.308 279.129 48.308 312.259 123.155 332.313 102.99 407.571 131.68 424.135 155.518 335.169 240 286.115 240 374.402 168.823 445.579 197.513 462.144 258 401.657 317.135 460.792 345.826 444.228 272 370.402 272 286.115 355.002 334.31 379.279 424.914 407.97 408.349 387.596 332.313 464 311.841 464 278.712 367.508 304.567 287.864 258.323 376.327 206.957 464 230.449 464 197.32 394.346 178.657 413.576 106.888 384.886 90.323 361.196 178.739 272 230.53 272 130.568 338.833 63.735 310.143 47.171 254.971 102.343 200.664 48.037 171.974 64.601 240 132.627 240 230.53 149.325 177.88 126.073 91.103 97.382 107.667 116.404 178.657 48.308 196.903 48.308 230.032 135.279 206.728"></polygon>
                        </svg>
                    </div>
                    <div class="text-6xl" v-if="temperatureValue=== 0? true: temperatureValue">{{ temperatureValue+'°' }}</div>
                </div>
                <div class="DisplaySubInfo font-semibold text-slate-200 text-center text-xl">
                    {{ locatonDisplayed }}
                </div>
                <div v-if="apparentTemperature === 0? true:apparentTemperature" class="font-semibold text-slate-200 text-center">{{ `It feels like ${apparentTemperature}°` }}</div>
            </div>
            <div>
                <forecastInfoBox v-if="displayForecast" :recievedData="forecastData"></forecastInfoBox>
            </div>
            <div class="flex justify-around mb-10">
                <WindInfoBox v-if="windSpeed=== 0? true: windSpeed" :windDirection="windDirection" :windSpeed="windSpeed" :windGust="windGust"></WindInfoBox>
                <InfoBox v-if="uvIndexMessage" :uvIndexValue="uvIndexValue" :uvIndexMessage="uvIndexMessage"></InfoBox>
            </div>
            <div class="flex justify-around mb-10">
             <HumidityInfoBox v-if="dewPoint=== 0? true: dewPoint" :humidity="humidity" :dewPoint="dewPoint"></HumidityInfoBox>
             <VisibilityInfoBox v-if="visibility=== 0? true: visibility" :visibility="visibility" :message="visibilityMessage"></VisibilityInfoBox>
            </div>
            <navBar @go-to-settings="goToSettings()" @go-to-map="goToMap()" @go-to-main="goToMain()"></navBar>
        </div>
    </div>
</template>
