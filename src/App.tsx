import { useState } from 'react'

import restart from './assets/restart.svg'
import mapPin from './assets/map-pin.svg'
import thermometer from './assets/thermometer.svg'
import wind from './assets/wind.svg'
import weatherIcon from './assets/weather.svg'

type Weather = {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    one_hour: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<Weather>()

  const apikey = import.meta.env.VITE_WEATHER_API_KEY

  async function fetchWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    )
      .then((res) => res.json())
      .then((res) => setWeather(res))
  }

  return (
    <div className="background">
      <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-sm">
        <div className="m-auto w-[75%] z-10">
          <h1 className="text-center font-bold mt-52 text-4xl text-gray-600">
            Weather App
          </h1>
          {!weather ? (
            <form className="mt-8 flex flex-col items-center">
              <input
                className="font-bold text-black rounded-xl text-center p-3"
                placeholder="Your city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <button
                onClick={fetchWeather}
                type="button"
                className="font-medium bg-yellow-200 hover:bg-yellow-100 mt-3 rounded-md p-2 w-40"
              >
                Check the weather
              </button>
            </form>
          ) : (
            <div className="mt-8 bg-zinc-300 text-gray-800 bg-opacity-40 rounded-xl">
              <div className="flex items-center relative p-4 font-semibold">
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => setWeather(undefined)}
                >
                  <img src={restart} className="absolute top-0 right-0 p-4" />
                </button>
                <div className="mr-3">
                  <h2 className="flex mb-2">
                    <img className="mr-2" src={mapPin} alt="" />
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="flex mb-2">
                    <img className="mr-2" src={weatherIcon} alt="" />
                    {weather.weather[0].main}
                  </p>
                  <p className="flex mb-2">
                    <img className="mr-2" src={thermometer} alt="" />
                    {weather?.main.temp} <span>°C</span>
                  </p>
                  <p className="flex mb-2">
                    <img className="mr-2" src={wind} alt="" />
                    {weather.wind.speed}
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].main}
                  title={weather.weather[0].main}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
