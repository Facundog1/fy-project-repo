 var giphyAPIKey = "sDv42NVlG2ZVPXsd3YNYJKouegkM1X18";
 var weatherAPIkey = "fed330d490f63f8a5e01b53eaa09b02c"

var searchForm = document.getElementById("search-form")
var gifForm = document.getElementById("gif-form");
var temperatureSpan = document.getElementById("temperature");

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
        })
}


function getGIF(weather) {
    var giphyURL = `https://api.giphy.com/v1/gifs/search?q=${weather}&api_key=${giphyAPIKey}`
    fetch(giphyURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
        })
}

searchForm.addEventListener("submit",function(event){
    event.preventDefault() 
    var searchInput = document.getElementById("search-input")
    console.log(searchInput)
    var cityName = searchInput.value.trim()
    getWeather(cityName)
})

gifForm.addEventListener("submit", function(event){
    event.preventDefault();
    var gifSearch = document.getElementById("gif-search");
    var gifInput = gifSearch.value.trim();
    getGIF(gifInput);
})