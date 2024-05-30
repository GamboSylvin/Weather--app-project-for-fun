
import { METEO_API_KEY } from '../../constants/env.js';
import HourlyInfo from '../hourlyInfo.vue';
class filterData{
    constructor(data, id, array){
        this._data = data
        this._id = id
        this._hourDataArray =array
    }
    get data(){
        return this._data
    }
    set data(value){
        this._data = value
    }
    get hourDataArray(){
        return this._hourDataArray
    }
    set hourDataArray(value){
        this._hourDataArray = value
    }
    getLoadedData(Data){
        let hourDataArray = Data?.value?.timelines?.hourly
        this.data = {
            cloudCover : hourDataArray[this._id]?.values?.cloudCover,
            rainIntensity : hourDataArray[this._id]?.values?.rainIntensity,
            snowIntensity : hourDataArray[this._id]?.values?.snowIntensity,
            temperature : hourDataArray[this._id]?.values?.temperature,
            time : hourDataArray[this._id]?.time
        }
        return this.data
    }

}

export { filterData }

class fetchData{
    constructor(data){
        this._mainData = data
    }
    get mainData(){
        return this._mainData
    }
    set mainData(value){
        this._mainData = value
}
async getDataObject(location){
    let response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${METEO_API_KEY}`,{
        headers:{
                "retry-after" : "3600",
        }
    })
    this.mainData = await response.json()
    return this.mainData

}
}
export { fetchData }