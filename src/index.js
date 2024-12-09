function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");

  let windSpeedElement = document.querySelector("#wind-speed");

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  let iconDescription = response.data.condition.icon;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = description.toUpperCase();
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = customIcon(iconDescription);

  getForecast(response.data.city);
}

function customIcon(iconDescription) {
  //I've added my custom icons. But not sure about this or if there was an easier way to setting this up:
  let iconURL =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/118/619/original/Sunny.png?1710177830";

  if (iconDescription === "clear-sky-day") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/118/619/original/Sunny.png?1710177830";
  } else if (iconDescription === "few-clouds-day") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/627/original/few-clouds-day.png?1731867953";
  } else if (iconDescription === "scattered-clouds-day") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/628/original/scattered-clouds-day.jpg?1731867961";
  } else if (
    iconDescription === "broken-clouds-day" ||
    iconDescription === "broken-clouds-night"
  ) {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/630/original/broken-clouds.jpg?1731867980";
  } else if (iconDescription === "rain-day") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/629/original/raind-day.jpg?1731867971";
  } else if (
    iconDescription === "snow-day" ||
    iconDescription === "snow-night"
  ) {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/638/original/snow-day.jpg?1731869859";
  } else if (
    iconDescription === "mist-day" ||
    iconDescription === "mist-night"
  ) {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/637/original/mist-day.jpg?1731869852";
  } else if (
    iconDescription === "shower-rain-day" ||
    iconDescription === "shower-rain-night"
  ) {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/640/original/shower-rain-day.jpg?1731869872";
  } else if (iconDescription === "clear-sky-night") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/646/original/clear-sky-night.jpg?1731871306";
  } else if (iconDescription === "few-clouds-night") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/644/original/few-clouds-night.jpg?1731871290";
  } else if (iconDescription === "scattered-clouds-night") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/645/original/scattered-clouds-night.jpg?1731871298";
  } else if (iconDescription === "rain-night") {
    iconURL =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/150/647/original/rain-night.jpg?1731871434";
  }

  return `<img src=${iconURL} alt="Weather icon" class="current-icon"/>`;
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
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "db2eaa70afcd7t05847a43o4d14ba820";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "db2eaa70afcd7t05847a43o4d14ba820";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = ""; //creating a variable that is empty. But I want to inject the html inside this variable later.

  response.data.daily.forEach(function (day) {
    //I'm going to look into each of the elements of the days array and for each of them:

    forecastHtml = //creation of a string
      forecastHtml + //I'm adding the empty variable plus this information for each of the days
      ` <div class="weather-forecast-day">
        <div class="weather-forecast-date">Tue</div>
        <div class="weather-forecast-icon" id="icon-forecast">
          <img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/118/619/original/Sunny.png?1710177830" class="weather-forecast-icon">
        </div>
        <div class="weather-forecast-temperatures"> 
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong> 
            </div>
            <div class="weather-forecast-temperature"> ${Math.round(
              day.temperature.minimum
            )}°</div>
         </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Barcelona");
getForecast("Barcelona");
