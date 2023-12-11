function searchPlace(place) {
  let apiKey = "ba3t92f6af6b8204143cbo1c5a032ba3";
  let url = `https://api.shecodes.io/weather/v1/current?query=${place}&key=${apiKey}&units=metric`;
  console.log(url);
}

function displayPlaceSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input_search");
  let placeDisplay = document.querySelector("h1");
  placeDisplay.innerHTML = searchInput.value;
  searchPlace(searchInput.value);
}

let searchForm = document.querySelector("#form_search");
searchForm.addEventListener("submit", displayPlaceSubmit);
