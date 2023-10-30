import { useState } from 'react'

import mapPin from './assets/map-pin.svg'
import thermometer from './assets/thermometer.svg'
import wind from './assets/wind.svg'
import weatherIcon from './assets/weather.svg'

type Weather = {
  weather: [
    {
      main: string
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  name: string
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

  const handleForm = () => {
    if (!city) {
      return alert('ERRO')
    }

    if (city.length < 2) {
      return alert('ERRO')
    }

    return fetchWeather()
  }

  return (
    <div className="background">
      <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-sm">
        <div className="m-auto w-[75%] z-10">
          <h1 className="text-center font-bold mt-52 text-4xl text-gray-600">
            Weather App
          </h1>
          {!weather ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col items-center"
            >
              <input
                className="font-bold text-black rounded-xl text-center p-3"
                placeholder="Your city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <button
                onClick={handleForm}
                type="submit"
                className="font-medium bg-yellow-200 hover:bg-yellow-100 mt-3 rounded-md p-2 w-40"
              >
                Check the weather
              </button>
            </form>
          ) : (
            <div className="mt-8 bg-zinc-300 text-gray-800 bg-opacity-40 rounded-xl md:max-w-md md:mx-auto">
              <div className="relative p-4 font-semibold">
                <button
                  className="cursor-pointer absolute top-0 right-0 p-4"
                  type="button"
                  onClick={() => setWeather(undefined)}
                >
                  <svg
                    className="cursor-pointer"
                    width="28px"
                    height="28px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 20.75C10.0772 20.75 8.23311 19.9862 6.87348 18.6265C5.51384 17.2669 4.75 15.4228 4.75 13.5C4.75 11.5772 5.51384 9.73311 6.87348 8.37348C8.23311 7.01384 10.0772 6.25 12 6.25H14.5C14.6989 6.25 14.8897 6.32902 15.0303 6.46967C15.171 6.61032 15.25 6.80109 15.25 7C15.25 7.19891 15.171 7.38968 15.0303 7.53033C14.8897 7.67098 14.6989 7.75 14.5 7.75H12C10.8628 7.75 9.75105 8.08723 8.80547 8.71905C7.85989 9.35087 7.1229 10.2489 6.68769 11.2996C6.25249 12.3502 6.13862 13.5064 6.36048 14.6218C6.58235 15.7372 7.12998 16.7617 7.93414 17.5659C8.73829 18.37 9.76284 18.9177 10.8782 19.1395C11.9936 19.3614 13.1498 19.2475 14.2004 18.8123C15.2511 18.3771 16.1491 17.6401 16.781 16.6945C17.4128 15.7489 17.75 14.6372 17.75 13.5C17.75 13.3011 17.829 13.1103 17.9697 12.9697C18.1103 12.829 18.3011 12.75 18.5 12.75C18.6989 12.75 18.8897 12.829 19.0303 12.9697C19.171 13.1103 19.25 13.3011 19.25 13.5C19.2474 15.422 18.4827 17.2645 17.1236 18.6236C15.7645 19.9827 13.922 20.7474 12 20.75Z"
                        fill="#15262F"
                      ></path>
                      <path
                        d="M12 10.75C11.9015 10.7505 11.8038 10.7313 11.7128 10.6935C11.6218 10.6557 11.5392 10.6001 11.47 10.53C11.3296 10.3894 11.2507 10.1988 11.2507 10C11.2507 9.80128 11.3296 9.61066 11.47 9.47003L13.94 7.00003L11.47 4.53003C11.3963 4.46137 11.3372 4.37857 11.2962 4.28657C11.2552 4.19457 11.2332 4.09526 11.2314 3.99455C11.2296 3.89385 11.2482 3.79382 11.2859 3.70043C11.3236 3.60705 11.3797 3.52221 11.451 3.45099C11.5222 3.37977 11.607 3.32363 11.7004 3.28591C11.7938 3.24819 11.8938 3.22966 11.9945 3.23144C12.0952 3.23322 12.1945 3.25526 12.2865 3.29625C12.3785 3.33724 12.4613 3.39634 12.53 3.47003L15.53 6.47003C15.6705 6.61066 15.7493 6.80128 15.7493 7.00003C15.7493 7.19878 15.6705 7.38941 15.53 7.53003L12.53 10.53C12.4608 10.6001 12.3782 10.6557 12.2872 10.6935C12.1962 10.7313 12.0985 10.7505 12 10.75Z"
                        fill="#15262F"
                      ></path>
                    </g>
                  </svg>
                </button>
                <div className="mt-8">
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
                      {weather?.main.temp} °C
                    </p>
                    <p className="flex mb-2">
                      <img className="mr-2" src={wind} alt="" />
                      {weather.wind.speed} m/sec
                    </p>
                  </div>
                  <div className="absolute top-11 right-3">
                    <div className="flex flex-col items-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].main}
                        title={weather.weather[0].main}
                      />
                      <p className="capitalize text-sm md:text-lg">
                        {weather.weather[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
