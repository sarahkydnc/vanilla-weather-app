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

function displayWeather(response) {
  console.log(response.data);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.dt * 1000);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temp = document.querySelector("#temp");
  let roundedTemp = Math.round(response.data.main.temp);
  temp.innerHTML = roundedTemp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  let roundedWind = Math.round(response.data.wind.speed);
  wind.innerHTML = roundedWind;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
}

let cityName = `New York`;
let apiKey = `7847c8cdbdd3f4d4e829321a937f5c42`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeather);
