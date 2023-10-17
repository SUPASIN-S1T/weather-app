// API KEY : https://openweathermap.org/
const API_KEY = "1b0f62386e7e2b705d523b6eda753097";
const weatherDetail = document.querySelector(".weather-detail");
const inputSearch = document.querySelector(".input-search");

// when page loaded , start this function 
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
});

// set loading when search data and waiting data from api
const setLoading = () => {
  return (weatherDetail.innerHTML = "Loading...");
};

// fetch data from api
const fetchWeather = async (city = "Thailand") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      weatherDetail.innerHTML = displayWeather(data);
      weatherDetail.classList.add("animation-active");
    } else {
      setLoading();
      weatherDetail.classList.remove("animation-active");
    }
  } catch (err) {
    console.log("error : " + err);
  }
};

const searchWeather = (e) => {
  const inputValue = e.target.value;
  if (inputValue.trim() !== "" && inputValue.length !== 0) {
    fetchWeather(inputValue);
  } else {
    setLoading();
  }
};

inputSearch.addEventListener("input", searchWeather);

// display data
const displayWeather = (data) => {
  const {
    name,
    main: { humidity, temp },
    wind: { speed },
    sys: { country },
  } = data;

  const { description, icon } = data.weather[0];
  const temparture = parseInt(temp);

  return `<div class="weather-title">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
          <h1>${temparture} °C</h1>
          <h2>${name}, ${country}</h2>
          <p>${data.weather[0].description}</p>
        </div>
        <div class="weather-sub-title">
          <div class="humidity">
            <div class="icon">
              <i class="fa-solid fa-water"></i>
            </div>
            <div class="humidity-detail">
              <p>Humidity : ${humidity}%</p>
            </div>
          </div>
          <div class="wind-speed">
            <div class="icon">
              <i class="fa-solid fa-wind"></i>
            </div>
            <p>Wind : ${speed} km/h</p>
          </div>
        </div>`;
};
