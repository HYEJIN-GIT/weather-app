import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'
import { ClipLoader } from 'react-spinners';
import WeatherSearch from './component/WeatherSearch';


//1. 앱 시작하자마자 현재 위치 기반의 날씨가 보임
//2. 날씨 정보에는 도시 섭씨/화씨온도 현재 날씨 상태
//3. 버튼 5개가 있음.(1개는 현재위치, 4개는 다른 도시)
//4. 도시 버튼 누를 때 마다 도시 별 날씨 나오기
//5. 현위치 버튼을 누르면 다시 현위치 기반의 날씨가 나온다.
//6. 로딩 스피너 보여주기!

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [weather,setWeather] = useState(null)
  const [forest,setForest] = useState(null)
  const [pollution,setPollution] = useState(null)
  const cities = [
    "Tokyo","New york","Paris","seoul"
  ]
  const [city,setCity] = useState('')
  const [loading,setLoading] = useState(false)

 
  // 앱 시작시 -> 현재위치 가져오기 (useEffect 사용)
  useEffect(()=>{
  
    if(city === "" ||city === "current"){
      getCurrentLocation()
  
    }
    else {
      getWeatherByCity()
      getWeatherByCityForecast()
    }  
  },[city])


  const getCurrentLocation = ()=>{
   // api 가져오가 console.log("앱 시작 시 위치 보여줌")
   // 먼저 위도 경도 값 가져오기
   navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon)
    getWeatherByCurrentForecast(lat,lon)
    getAirPollution(lat,lon)


   })
  }

  //현재 날씨 정보 3시간 마다 보여주기
const getWeatherByCurrentForecast = async (lat,lon) =>{
  try {
    let url =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr`
  const response = await fetch(url)
  if(!response.ok){
    throw new Error("예보 불러오기 실패")
  }
  const data = await response.json()
  const temps = data.list.map(item => ({
    
    time: item.dt_txt.split(' ')[1].slice(0,2),
    temp: Math.floor(item.main.temp)
  }))
  setForest(temps)
  } catch (error) {
   alert(error.message)
  }
  
}


//현재 날씨 보여주기
const getWeatherByCurrentLocation = async (lat,lon)=>{

  try {
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr` 
  const response = await fetch(url)
  if(!response.ok){
    throw new Error("현재 날씨 불러오기 실패")
  }
  const data = await response.json()
  setWeather(data)
 
  } catch (error) {
    alert(error.message)
  }finally{
    setLoading(false)
  }
  
}


//도시 날씨 정보 보여주기
const getWeatherByCity = async ()=>{
  try {
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=kr&cnt`

    const response = await fetch(url)
    if(!response.ok){
      throw new Error("도시 정보 불러오기 실패")
    }
    const data = await response.json()
    setWeather(data)
    const lat = data.coord.lat
    const lon = data.coord.lon
    getAirPollution(lat, lon)

  } catch (error) {
    alert(error.message)
  }
  
 
}
//도시별 3시간 마다 날씨 보여주기
const getWeatherByCityForecast = async()=>{
  try {
    let url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=kr`

    const response = await fetch(url)
    if(!response.ok){
      throw new Error("예보 불러오기 실패")
    }
    const data = await response.json()
    const temps = data.list.map(item => ({
      time: item.dt_txt.split(' ')[1].slice(0,2),
      temp: Math.floor(item.main.temp)
    }))
    setForest(temps)

  } catch (error) {
    console.log(error.message)
  }
 
}

const getAirPollution= async (lat,lon)=>{
  try {
    
   let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
   const response = await fetch(url)
   if(!response.ok){
    throw new Error("미세번지 정보 불러오기 실패")
  }
   const data = await response.json()
   const airPollution = data.list.map(item=>({
        aqi :item.main.aqi
      }))
   setPollution(airPollution)
 
  } catch (error) {
    console.log(error.message)
  }
}



  return (
    <div>
          <WeatherSearch setCity={setCity}></WeatherSearch>
          <WeatherButton cities={cities} setCity={setCity} city={city}></WeatherButton>

      {
        loading? 
        <div className='loading-location'>
        <ClipLoader loading={loading} size={100}></ClipLoader>
        </div>

        :
        <div className='weather-box-area'>
        <WeatherBox weather ={weather} forest={forest} pollution={pollution}></WeatherBox>
        </div>
      }
    </div>
  )
}

export default App
