function updateDataWeather(response) {
  // current temperature and place- h1
  let currentTempElement = document.querySelector("#current_temp");
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);

  let placeDisplay = document.querySelector("h1");
  placeDisplay.innerHTML =
    response.data.city.charAt(0).toUpperCase() + response.data.city.slice(1);

  // icon condition

  // date - week day, day, month, year, hours
  let date = new Date(response.data.time * 1000);
  let sentenceDayHour = document.querySelector("#date_hours");
  sentenceDayHour.innerHTML = formatDate(date);

  // extra values - sky, humidity, wind
  let skyElement = document.querySelector("#sky");
  let skyResponse = response.data.condition.description;
  skyElement.innerHTML =
    skyResponse.charAt(0).toUpperCase() + skyResponse.slice(1);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  console.log(response.data);
}

function formatDate(date) {
  let currentWeekDay = date.getDay();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = week[currentWeekDay];

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
  let thisMonth = months[currentMonth];

  return `${weekDay}, ${currentDay} ${thisMonth.toLowerCase()} ${currentYear} | ${hour}:${minutes}`;
}

function searchPlace(place) {
  let apiKey = "ba3t92f6af6b8204143cbo1c5a032ba3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${place}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateDataWeather);
}

function displayPlaceSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input_search");
  searchPlace(searchInput.value);
}

let searchForm = document.querySelector("#form_search");
searchForm.addEventListener("submit", displayPlaceSubmit);

searchPlace("Ghent");
