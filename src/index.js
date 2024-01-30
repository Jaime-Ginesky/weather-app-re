
function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
     
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    timeElement.innerHTML = formatDate(date);
    windElement.innerHTML = `${response.data.wind.speed}mph`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`

}

 function searchCity(city) {
    // make api call and update the interface
    let apiKey = `f3b5c0e756b3t43ba00423f6a67boe48`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
   event.preventDefault();
   let searchInput = document.querySelector("#search-form-input");

   searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = `f3b5c0e756b3t43ba00423f6a67boe48`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lquery=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast() {

    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml +=
    `<ul class="forecast-days">
      <li>${day}<a href="#">⛅️</a>
      <span class="daily-temp">
      <span class="min-temp">58</span>
      <span class="max-temp">72</span>
      </span></li>
     </ul>
     `;
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml; 
};

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Los Angeles");




