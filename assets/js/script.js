// var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={17e65b89990b0db2e2339b8d268552e4}`';

// var responseText = document.getElementById('.input-group-append');

// function getApi(requestUrl) {
//   fetch(requestUrl)
//     .then(function (response) {
//       console.log(response);
//       if (response.status != 200) {
//         responseText.textContent = response.status;
//       }
//       return response.json();
//   });
// }

// getApi(requestUrl);



var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){
// fetch('api.openweathermap.org/data/2.5/forecast?lat=40.7143&lon=74.006&appid=63606d5f87fb1ca9e2705345f9cb648e')
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=63606d5f87fb1ca9e2705345f9cb648e')
// fetch('api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=63606d5f87fb1ca9e2705345f9cb648e')
.then(response => response.json())
.then(data => {
    console.log(data);
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";
//   Math.round((data.list[i].main.temp - 273.15) * 1.8 + 32) +
//                 " &#176;F";

})

.catch(err => alert("Wrong city name!"));
})