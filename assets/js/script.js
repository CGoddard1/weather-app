var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={17e65b89990b0db2e2339b8d268552e4}`';

var responseText = document.getElementById('input-group-append');

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        responseText.textContent = response.status;
      }
      return response.json();
  });
}

getApi(requestUrl);