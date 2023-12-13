function updateDataWeather(response) {
  // current temperature and place- h1
  let currentTempElement = document.querySelector("#current_temp");
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);

  let placeDisplay = document.querySelector("h1");
  placeDisplay.innerHTML =
    response.data.city.charAt(0).toUpperCase() + response.data.city.slice(1);

  // icon condition
  let mainIcon = document.querySelector("#icon_sky");
  mainIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="main-icon"/>`;
  // date - week day, day, month, year, hours
  let date = new Date(response.data.time * 1000);
  let sentenceDayHour = document.querySelector("#date_hours");
  sentenceDayHour.innerHTML = formatDate(date);

  // extra values - sky, humidity, wind
  let skyElement = document.querySelector("#sky");
  skyElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";

  getForecast(response.data.city);
  //console.log(response.data);
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

function formatNextDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursaday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(place) {
  let apiKey = "ba3t92f6af6b8204143cbo1c5a032ba3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${place}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  // Today Maximum and minimum temperatures values
  let tempMaxThisDay = document.querySelector("#temp_max_value");
  tempMaxThisDay.innerHTML =
    Math.round(response.data.daily[0].temperature.maximum) + " ºC";
  let tempMinThisDay = document.querySelector("#temp_min_value");
  tempMinThisDay.innerHTML =
    Math.round(response.data.daily[0].temperature.minimum) + " ºC";

  // Forecast of the 5 days ahead (without today)
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <li class="forecast-week-day">
      <img src="${day.condition.icon_url}" class="week-icon"/>
      <span class="span-weekdays">
      <h3>${formatNextDay(day.time)}</h3>
      <p>${Math.round(day.temperature.maximum)}ºc 
      <span class="value-min">
      ${Math.round(day.temperature.minimum)}ºC
      </span>
      </p>
      </span>
      </li>`;
    }
    //console.log(day);
  });

  let forecastList = document.querySelector("#forecast-week-list");
  forecastList.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#form_search");
searchForm.addEventListener("submit", displayPlaceSubmit);

searchPlace("Ghent");
