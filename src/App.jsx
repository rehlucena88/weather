import React from 'react'
import { useState, useEffect } from 'react'

import { v4 as uuid } from 'uuid'
import { FaTemperatureHigh as ThermometerIcon, FaWind as WindIcon}  from 'react-icons/fa'


export function App() {

  const [searchedCity, setSearchedCity] = useState('Campinas')
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')

  const handleSubmit = ev => {
    ev.preventDefault()
    setCity(searchedCity)
    console.log(searchedCity)
  }

  const handlerChange = ev => {
    setSearchedCity(ev.target.value)
  }

  useEffect(() => {
      async function getCityWeather(){
        const response = await fetch(`https://goweather.herokuapp.com/weather/${searchedCity}`)
    const data = await response.json()
    setWeather(data)
    console.log(data)
      }
      getCityWeather()
  },[city])
  return(
<div>
<form action="" onSubmit={handleSubmit} >
    <input
    type="text"
    placeholder="ex: Campinas"
    value={searchedCity}
    onChange={handlerChange}
    />
    <button type="submit">Pesquisar cidade</button>
</form>
       {city && weather &&(
        <>
          <div className='today'>
            <h1>{city}</h1>
          <h2>Tempo atual</h2>
          <p>
            <ThermometerIcon/>
            {weather.temperature}
          </p>
          <p>
            <WindIcon/>
            {weather.wind}
          </p>
          <p>
            {weather.description}
          </p>
          </div>
         <div className='nextDay'>
          <h2>Previsão</h2>
           <ul>
              {weather.forecast.map((dayForecast, index) =>{
                return (
                  <li key={uuid()}>
                    <h3>
                      {index == 0 ? 'Amanhã'
                       : Intl.DateTimeFormat(
                        'pt-BR',
                        { weekday: 'long' }
                       )
                        .format(
                          new Date().setDate(new Date().getDate() + index +1)
                        )
                       }
                    </h3>
                    <div className='thermometer'>
                      <ThermometerIcon />
                      <p>{dayForecast.temperature}</p>
                    </div>
                    <div className='wind'>
                      <WindIcon />
                      <p>{dayForecast.wind}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
        </div>
        </>
       )}
      <h1></h1>
  </div>
  )

}


