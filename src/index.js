
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
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = `${Math.round(temperature)}`;
    
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
    ];


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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = `f3b5c0e756b3t43ba00423f6a67boe48`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);

   let forecastHtml = "";

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
        forecastHtml =
          forecastHtml +
   `
      <li> 
      <span class="forecast-daily">${formatDay(day.time)}</span> 
      <span class="daily-temp">
      <span class="max-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
      <span class="min-temp">${Math.round(day.temperature.minimum)}°</span>
      </span>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>  
      </li>
     `;
        };
});


let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml; 
};

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Los Angeles");




