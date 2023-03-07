// var input = document.querySelector('.input_text');
// var main = document.querySelector('#name');
// var temp = document.querySelector('.temp');
// var desc = document.querySelector('.desc');
// var clouds = document.querySelector('.clouds');
// var button= document.querySelector('.submit');


// button.addEventListener('click', function(name){
// // fetch('api.openweathermap.org/data/2.5/forecast?lat=40.7143&lon=74.006&appid=63606d5f87fb1ca9e2705345f9cb648e')
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=63606d5f87fb1ca9e2705345f9cb648e')
// // fetch('api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=63606d5f87fb1ca9e2705345f9cb648e')
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//   var tempValue = data['main']['temp'];
//   var nameValue = data['name'];
//   var descValue = data['weather'][0]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   input.value ="";
// //   Math.round((data.list[i].main.temp - 273.15) * 1.8 + 32) +
// //                 " &#176;F";

// })

// .catch(err => alert("Wrong city name!"));
// })

// api key + variables
const apiKey = "63606d5f87fb1ca9e2705345f9cb648e";
var currWeatherDiv = $("#currentWeather");
var forecastDiv = $("#weatherForecast");
var citiesArray;

// local storage for weather array to keep search history
if (localStorage.getItem("localWeatherSearches")) {
    citiesArray = JSON.parse(localStorage.getItem("localWeatherSearches"));
    writeSearchHistory(citiesArray);
} else {
    citiesArray = [];
};

// current weather function using the API, allows for date and calls from the current weather H2 + temp/humidity/wind speed
function returnCurrentWeather(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

  $.get(queryURL).then(function(response){
      let currTime = new Date(response.dt*1000);
      let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

      currWeatherDiv.html(`
      <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
      <p>Temperature: ${response.main.temp} &#176;C</p>
      <p>Humidity: ${response.main.humidity}%</p>
      <p>Wind Speed: ${response.wind.speed} m/s</p>
      `, returnUVIndex(response.coord))
      createHistoryButton(response.name);
  })
};