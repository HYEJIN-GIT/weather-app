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
    }
    
   
  },[city])


  const getCurrentLocation = ()=>{
   // api 가져오가 console.log("앱 시작 시 위치 보여줌")
   // 먼저 위도 경도 값 가져오기
   navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon)


   })
  }
const getWeatherByCurrentLocation = async (lat,lon)=>{

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  setLoading(true)
  const response = await fetch(url)
  const data = await response.json()
  setWeather(data)
  console.log(data)
  setLoading(false)
}

const getWeatherByCity = async ()=>{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  setLoading(true)
  const response = await fetch(url)
  const data = await response.json()
  setWeather(data)
  setLoading(false)

}

  return (
    <div>
<WeatherSearch setCity={setCity}></WeatherSearch>


      {
      
        loading? 
        <div className='loading-location'>
        <ClipLoader loading={loading} size={100}></ClipLoader>
        </div>

        :
        <div>


<WeatherBox weather ={weather}></WeatherBox>
<WeatherButton cities={cities} setCity={setCity} city={city}></WeatherButton>

        </div>
        
      }
    
     
    </div>
  )
}

export default App
