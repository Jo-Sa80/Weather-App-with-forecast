function showTemperature(response) {
  let currentTemp = document.querySelector("#value");
  let currentCity = document.querySelector("#weather-city");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  currentCity.innerHTML = response.data.city;
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" >`;

  getForecast(response.data.city);
}

function showCity(city) {
  let apiKey = "1c9131f04b7fo56320ba61f00b43t4cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function showSubmittedCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  showCity(searchInput.value);
}

let searchElement = document.querySelector("#searchForm");
searchElement.addEventListener("submit", showSubmittedCity);

showCity("Berlin");

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formatetDay = days[day];
  return `${formatetDay}, ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "1c9131f04b7fo56320ba61f00b43t4cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios(apiUrl).then(displayForecast);
}
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return forecastDays[date.getDay()];
}
function displayForecast(response) {
  let forecastDaysElement = document.querySelector("#forecastDay");

  let forecastHtml = "";

  response.data.daily.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forcast">
  <div class="weather-forcast-day" id="forecastDay">${formatForecastDate(
    forecast.time
  )}</div>
  <div ><img src="${
    forecast.condition.icon_url
  }"class="weather-forcast-icon"> </div>
  <div class="weather-forcast-temperatures">
    <div class="weather-forcast-temp">
      <strong>${Math.round(forecast.temperature.maximum)}°</strong>
    </div>
    <div class="weather-forcast-temp">${Math.round(
      forecast.temperature.minimum
    )}°</div>
  </div>
</div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
