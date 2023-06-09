import { useState } from 'react'

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
      <div className="m-auto w-[75%] bg-blur">
        <h1 className="text-center font-bold mt-52 text-4xl">
          <span className="text-orange-300">Weather</span>
          <span className="text-green-400">App</span>
        </h1>
        {!weather ? (
          <form className="mt-16 flex flex-col items-center">
            <input
              className="font-bold text-black rounded-xl text-center p-3"
              placeholder="Your city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
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
          <div className="mt-16 bg-blue-500 p-8 rounded-xl">
            <h2 className="font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="">{weather.weather[0].main} Weather</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <p>
              <span>C°</span> {weather?.main.temp}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
