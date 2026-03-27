import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const WeatherBox = ({weather}) => {
  
  return (
    <div className='weather-box'> 
    {weather ? (
      <div>
        <div className='weather-title'>
        <h3><FontAwesomeIcon icon={faLocationDot} /> {weather?.name}</h3>
  
        <h1>{Math.floor(weather.main?.temp)}°</h1>
        <p className="desc">{weather.weather?.[0]?.main}</p>
        </div>
       
  
        {/* 👉 카드 영역 */}
        <div className="weather-details">
  
          <div className="detail-card">
            <p>상세 날씨</p>
            <h4>{weather.weather?.[0]?.description}</h4>
          </div>
          <div className="detail-card">
            <p>체감온도</p>
            <h4>{Math.floor(weather.main?.feels_like)}°</h4>
          </div>
  
          <div className="detail-card">
            <p>최고</p>
            <h4>{Math.floor(weather.main?.temp_max)}°</h4>
          </div>
  
          <div className="detail-card">
            <p>최저</p>
            <h4>{Math.floor(weather.main?.temp_min)}°</h4>
          </div>
  
          <div className="detail-card">
            <p>습도</p>
            <h4>{weather.main?.humidity}%</h4>
          </div>
  
          <div className="detail-card">
            <p>바람</p>
            <h4>{weather.wind?.speed} m/s</h4>
          </div>
  
          <div className="detail-card">
            <p>일출</p>
            <h4>
              {new Date(weather.sys?.sunrise * 1000)
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h4>
          </div>
  
          <div className="detail-card">
            <p>일몰</p>
            <h4>
              {new Date(weather.sys?.sunset * 1000)
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h4>
          </div>
  
        </div>
  
      </div>
    ) : (
      <div className='waiting'>
 <h3>날씨 정보 가져오는 중...</h3>
      </div>
     
    )}
  </div>
  )
}

export default WeatherBox
