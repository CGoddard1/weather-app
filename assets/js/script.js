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

// return forecast function using API
function returnWeatherForecast(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`;

  $.get(queryURL).then(function(response){
      let forecastInfo = response.list;
      forecastDiv.empty();
      $.each(forecastInfo, function(i) {
          if (!forecastInfo[i].dt_txt.includes("12:00:00")) {
              return;
          }
          let forecastDate = new Date(forecastInfo[i].dt*1000);
          let weatherIcon = `https://openweathermap.org/img/wn/${forecastInfo[i].weather[0].icon}.png`;

          forecastDiv.append(`
          <div class="col-md">
              <div class="card text-white bg-primary">
                  <div class="card-body">
                      <h4>${forecastDate.getMonth()+1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                      <img src=${weatherIcon} alt="Icon">
                      <p>Temp: ${forecastInfo[i].main.temp} &#176;C</p>
                      <p>Humidity: ${forecastInfo[i].main.humidity}%</p>
                  </div>
              </div>
          </div>
          `)
      })
  })
};

// The current UV index collection
function returnUVIndex(coordinates) {
  let queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${apiKey}`;

  $.get(queryURL).then(function(response){
      let currUVIndex = response.value;
      let uvSeverity = "green";
      let textColour = "white"
      //if/else function to change the color fo the UV index
      if (currUVIndex >= 11) {
          uvSeverity = "purple";
      } else if (currUVIndex >= 8) {
          uvSeverity = "red";
      } else if (currUVIndex >= 6) {
          uvSeverity = "orange";
          textColour = "black"
      } else if (currUVIndex >= 3) {
          uvSeverity = "yellow";
          textColour = "black"
      }
      currWeatherDiv.append(`<p>UV Index: <span class="text-${textColour} uvPadding" style="background-color: ${uvSeverity};">${currUVIndex}</span></p>`);
  })
}

function createHistoryButton(cityName) {
  // creates a history for the button to pull from for precious searches
  var citySearch = cityName.trim();
  var buttonCheck = $(`#previousSearch > BUTTON[value='${citySearch}']`);
  if (buttonCheck.length == 1) {
    return;
  }
  
  if (!citiesArray.includes(cityName)){
      citiesArray.push(cityName);
      localStorage.setItem("localWeatherSearches", JSON.stringify(citiesArray));
  }

  $("#previousSearch").prepend(`
  <button class="btn btn-dark cityHistoryBtn" value='${cityName}'>${cityName}</button>
  `);
}

function writeSearchHistory(array) {
  $.each(array, function(i) {
      createHistoryButton(array[i]);
  })
}

// Get a deafult weather search
returnCurrentWeather("Toronto");
returnWeatherForecast("Toronto");

$("#submitCity").click(function() {
    event.preventDefault();
    let cityName = $("#cityInput").val();
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
});

$("#previousSearch").click(function() {
    let cityName = event.target.value;
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
})

// function to change celcius to feirenheit in the console but not on the page
function cToF(celsius) 
{
  var Temp = celsius;
  var cToFahr = Temp * 9 / 5 + 32;
  var message = Temp+'\xB0C is ' + cToFahr + ' \xB0F.';
    console.log(message);
}

function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
    console.log(message);
} 
cToF(60);
fToC(45);
