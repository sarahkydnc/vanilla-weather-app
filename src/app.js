function displayWeather(response) {
  console.log(response.data);
  let temp = document.querySelector("#temp");
  let roundedTemp = Math.round(response.data.main.temp);
  temp.innerHTML = roundedTemp;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

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
