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

function getWeather(cityname) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherAPIkey}&units=imperial`
    fetch(weatherURL) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            temperatureSpan.innerText = data.main.temp;
            highTempSpan.innerText = data.main.temp_max;
            lowTempSpan.innerText = data.main.temp_min
            weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            conditions.innerText = data.weather[0].description;
            getGIF(data.weather[0].main);
        })
}


function getGIF(weather) {
    console.log(weather);
    var giphyURL = `https://api.giphy.com/v1/gifs/search?q=${weather}+sky+weather&api_key=${giphyAPIKey}&rating=pg-13`
    fetch(giphyURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            // var oldWeatherPic = document.getElementById("weather-picture");
            // if (oldWeatherPic){
            //     oldWeatherPic.remove();
            // }
            // var imgEl = document.createElement('img');
            // imgEl.id = "weather-picture";
            var imgUrl = data.data[0].images.fixed_height.url;
            var alt = data.data[0].title;
            weatherImage.src = imgUrl;
            weatherImage.alt = alt;
            // local storage 
            // document.body.appendChild(imgEl);

        })
}

searchForm.addEventListener("submit",function(event){
    event.preventDefault() 
    var searchInput = document.getElementById("city-input")
    console.log(searchInput)
    var cityName = searchInput.value.trim()
    getWeather(cityName)
})

// gifForm.addEventListener("submit", function(event){
//     event.preventDefault();
//     var gifSearch = document.getElementById("gif-search");
//     var gifInput = gifSearch.value.trim();
//     getGIF(gifInput);
// })