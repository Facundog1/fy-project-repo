// Variables for WeatherStickers
var giphyAPIKey = "sDv42NVlG2ZVPXsd3YNYJKouegkM1X18";
var weatherAPIkey = "fed330d490f63f8a5e01b53eaa09b02c"

var searchForm = document.getElementById("search-form");
var gifForm = document.getElementById("gif-form");
var temperatureSpan = document.getElementById("temperature");
var highTempSpan = document.getElementById("High-Temp");
var lowTempSpan = document.getElementById("Low-Temp");
var weatherIcon = document.getElementById("weather-Icon");
var conditons = document.getElementById("conditions");
var weatherImage = document.getElementById("weather-Image");

console.log(searchForm);

function displayCities() {
    var cities = JSON.parse(localStorage.getItem('searches')) || [];
    var searchHistoryEl = document.getElementById('history');
    searchHistoryEl.innerHTML = null;

    for (var city of cities) {
        var item = document.createElement('div');
        item.className = 'col-12';
        item.textContent = city;
        searchHistoryEl.appendChild(item);
    }
}
//
function getWeather(cityname) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherAPIkey}&units=imperial`
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cities = JSON.parse(localStorage.getItem('searches')) || [];
            cities.push(cityname);
            localStorage.setItem('searches', JSON.stringify(cities));
            temperatureSpan.innerText = data.main.temp;
            highTempSpan.innerText = data.main.temp_max;
            lowTempSpan.innerText = data.main.temp_min
            weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            conditions.innerText = data.weather[0].description;
            getGIF(data.weather[0].main);
        })
}

//
function getGIF(weather) {
    console.log(weather);
    var giphyURL = `https://api.giphy.com/v1/gifs/search?q=${weather}+sky+weather&api_key=${giphyAPIKey}&rating=pg-13`
    fetch(giphyURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var imgUrl = data.data[0].images.fixed_height.url;
            var alt = data.data[0].title;
            weatherImage.src = imgUrl;
            weatherImage.alt = alt;
            // local storage 
            displayCities()

        })
}
//
searchForm.addEventListener("submit", function (event) {
    event.preventDefault()
    var searchInput = document.getElementById("city-input")
    console.log(searchInput)
    var cityName = searchInput.value.trim()
    getWeather(cityName)
})

displayCities();