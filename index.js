// Update city name on HTML page
function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-search-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchInput.value;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchCity);
