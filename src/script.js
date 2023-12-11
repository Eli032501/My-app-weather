function updateDataWeather(response) {
  // current temperature and place- h1
  let currentTempElement = document.querySelector("#current_temp");
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);

  let placeDisplay = document.querySelector("h1");
  placeDisplay.innerHTML =
    response.data.city.charAt(0).toUpperCase() + response.data.city.slice(1);

  // date - week day, day, month, year, hours

  // extra values - sky, humidity, wind
  let skyElement = document.querySelector("#sky");
  let skyResponse = response.data.condition.description;
  skyElement.innerHTML =
    skyResponse.charAt(0).toUpperCase() + skyResponse.slice(1);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";
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
