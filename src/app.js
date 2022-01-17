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
}

// Return 5-day weather forecast
function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = [""];

  forecastHTML = forecastHTML +
  `
  <div class="col-2">
    <div class="forecast-day">Mon</div> 
      <img 
        src="https://openweathermap.org/img/wn/13n@2x.png" 
        alt="" 
        width="48"
      />
      <div class="forecast-temprange">
        <span class="forecast-tempmax">18°</span>
        <span class="forecast-tempmin">12°</span>
      </div>
  </div>`;

  
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
displayForecast();

// Location search and processing
function search(city) {
  let apiKey = `7847c8cdbdd3f4d4e829321a937f5c42`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}
search(`New York`);

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSearch);

// Metric-Imperial unit conversion
function displayImperial(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");

  // Upon click, transfer the active class from convertMetric to convertImperial
  convertMetric.classList.remove("active");
  convertImperial.classList.add("active");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

function displayMetric(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");

  // Upon click, transfer the active class from convertImperial to convertMetric
  convertImperial.classList.remove("active");
  convertMetric.classList.add("active");

  temp.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let convertImperial = document.querySelector("#convert-imperial");
convertImperial.addEventListener("click", displayImperial);

let convertMetric = document.querySelector("#convert-metric");
convertMetric.addEventListener("click", displayMetric);
