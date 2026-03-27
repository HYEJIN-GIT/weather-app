import React from 'react'
import { useState } from 'react'
const WeatherSearch = ({setCity}) => {
    const [input, setInput] = useState("")

  return (
    <div className="search-box">
    <input 
      className="search-input"
      value={input}  
      placeholder="도시를 입력하세요..."
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setCity(input)
          setInput('')
        }
      }}
    />
  
    <button 
      className="search-btn"
      onClick={()=>{setCity(input)
        setInput('')
      }}
    >
      검색
    </button>
  </div>
  )
}

export default WeatherSearch
