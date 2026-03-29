# 🌤️ Weather App (React)

## 🎬 프로젝트 소개

React를 이용하여 만든 날씨 정보 웹 애플리케이션입니다.
현재 위치 기반 날씨, 도시 버튼 및 도시 검색창, 시간별 예보 및 기타 정보를 얻을 수 있습니다.
사용자는 현재 위치 또는 원하는 도시를 검색하여 날씨 정보를 확인할 수 있습니다.

💡 배포 링크 :https://today-weather-app-hj.netlify.app/
<br>
<br>

## 🎮 주요 기능
1. 📍 현재 위치 기반 날씨 조회 (Geolocation API)
2. 🔍 도시 검색 기능 (weather API))
3. 🌡️ 섭씨 / 화씨 온도 표시 (weather API)
4. ⏱️ 3시간 단위 날씨 예보 (Forecast API)
5. 🌫️ 미세먼지(AQI) 정보 제공 (Air Pollution API)
6. 📊 체감온도 / 최고 / 최저 / 습도 / 바람  (weather API)
7. 🌅 일출 / 🌇 일몰 시간 표시  (weather API)
8. 🎨 반응형 UI (모바일 지원) 
9. ⏳ 로딩 스피너 표시
<br>

## ⚙️ 사용 기술
- React (useState, useEffect)
- CSS 
- OpenWeather API
- Geolocation API
- React Spinners
<br>

## 📍 핵심 로직 정리
### (1) 상태 관리
```
const [weather, setWeather] = useState(null)
const [forest, setForest] = useState(null)
const [pollution, setPollution] = useState(null)
const [city, setCity] = useState('')
const [loading, setLoading] = useState(false)
```

weather → 현재 날씨 데이터
forest → 3시간 예보 데이터
pollution → 미세먼지 데이터
city → 선택된 도시
loading → 로딩 상태

→ UI / API / 로딩 상태를 분리하여 설계
<br>
### (2) 위치 기반 데이터 가져오기

```
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  getWeatherByCurrentLocation(lat, lon)
  getWeatherByCurrentForecast(lat, lon)
  getAirPollution(lat, lon)
})
```
🙌 현재 위치 → 위도/경도 → API 호출
<br>
### (3) 날씨 / 시간별 예보 / 미세먼지 API
 - 각각의 API 가져와서 사용
 - 시간별 예보 (forcast)에서는 필요한 데이터만 뽑아 UI에 사용
```
   const temps = data.list.map(item => ({
  time: item.dt_txt.split(' ')[1].slice(0,2), //년도 x 시간만 가져오기 o
  temp: Math.floor(item.main.temp)
}))

```

<br>

### (4) try-catch 에러 처리

```
try {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("데이터 불러오기 실패")
  }
  const data = await response.json()
} catch (error) {
  alert(error.message)
}
```
 🙌  API 응답 실패시 alert()를 이용하여 에러 메세지 표시

<br>

## ⚠️ 문제점 및 배운 점

### Air Pollution API 오류
- air pollution 에서는 q 쿼리를 쓸 수 없기때문에 lan,lon을 필수적으로 써야한다.
- ✅ 해결 방안 :도시 url에서 lat,lon의 정보를 가져와 getAirPollution(lat,lon)을 다시 호출하여 도시에 따라 미세먼지 지수를 알 수있게 해결하였습니다.
     
```
const lat = data.coord.lat
const lon = data.coord.lon
getAirPollution(lat, lon)
```
<br>

##  🎯 정리

- useEffect()는 앱 시작시 바로 실행 (렌더 후 실행). 따라서 앱 실행시 현재 위치 날씨 알 수 있음(앱 실행 시, API 호출)
- 또 state의 업데이트에 따라 실행 (도시별 날씨 상태 알 수 있음)
