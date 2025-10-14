// Update weather elements in html file
function refreshWeather(response) {
  let cityName = document.querySelector("#city-name");

  let tempElement = document.querySelector("#temp");
  console.log(response);

  let conditionsElement = document.querySelector("#weather-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let currentTemp = Math.round(response.data.temperature.current);
  let date = new Date(response.data.time * 1000);
  let newIcon = response.data.condition.icon_url;

  cityName.innerHTML = response.data.city;
  tempElement.innerHTML = `${currentTemp}ºC`;
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  timeElement.innerHTML = formatTime(date);
  dateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${newIcon}" alt="weather-icon" />`;
}

// Format date
function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let fullMonth = months[date.getMonth()];

  let currentDate = date.getDate();
  console.log(date);

  let year = date.getFullYear();

  return `${day} ${currentDate} ${fullMonth} ${year}`;
}

// Get weather API
function searchCity(city) {
  let apiKey = "e4d7d87d81aef5843860374o00tff38b";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(refreshWeather);
}

// Update city name on HTML page
function searchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("London");
