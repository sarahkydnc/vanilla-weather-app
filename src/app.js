// Return current date and time
function formatDate(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = today.getDate();
  let year = today.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  return `${date} ${month} ${year}, ${day}, ${hours}:${minutes}`;
}

// Return current weather information
function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.dt * 1000);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temp = document.querySelector("#temp");
  celsiusTemp = Math.round(response.data.main.temp);
  temp.innerHTML = celsiusTemp;

  let icon = document.querySelector("#icon");
  let currentIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
  icon.setAttribute("alt", currentIcon);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  let roundedWind = Math.round(response.data.wind.speed);
  wind.innerHTML = roundedWind;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;

  getForecast(response.data.coord);
}

// Formatting forecast days of the week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

// Return 5-day weather forecast
function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDaily = response.data.daily;

  forecastDaily.forEach(function(forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
      `
        <div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div> 
            <img 
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
              alt="" 
              width="48"
            />
          <div class="forecast-temprange">
            <span class="forecast-tempmax">${Math.round(forecastDay.temp.max)}°</span>
            <span class="forecast-tempmin">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

// Location search and processing
function search(city) {
  let apiKey = `7847c8cdbdd3f4d4e829321a937f5c42`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

// Location coordinates' retrieval and processing
function getForecast(coordinates) {
  let apiKey = `7847c8cdbdd3f4d4e829321a937f5c42`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}
search(`New York`);

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSearch);
