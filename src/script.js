function searchPlaceSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input_search");
  let valueSearchInput = searchInput.value;

  let placeDisplay = document.querySelector("h1");
  placeDisplay.innerHTML = valueSearchInput.trim().toLowerCase();
}

let searchForm = document.querySelector("#form_search");
searchForm.addEventListener("submit", searchPlaceSubmit);
