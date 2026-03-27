import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



const WeatherButton = ({cities,setCity,city}) => {
  return (
    <div className='button-area'>
    <button 
    className={city === "current"?"active":""}
      onClick={()=>{setCity("current")}}>
      현재위치
    </button>

    {cities.map((item,index)=>(
      <button key={index} 
      className={city === item?"active":""}
        onClick={()=>setCity(item)}
      >
        {item}
      </button>
    ))}
  </div>
  )
}

export default WeatherButton
