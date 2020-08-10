$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const zipCode = urlParams.get("PostalCode");
  console.log(zipCode);
  const latLongUrl =
    "https://public.opendatasoft.com//api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=" +
    zipCode;
  $.ajax({
    url: latLongUrl,
    method: "GET",
  }).then((response) => {
    var longitude = response.records[0].fields.longitude;
    var latitude = response.records[0].fields.latitude;
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=927924e4c73455c7286d71a6b1b45a4c";
    $.ajax({
      url: weatherUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
      console.log(response.current.temp);
      var currentTemp = response.current.temp;
      currentTemp = currentTemp - 273;
      currentTemp = currentTemp * (9 / 5);
      currentTemp = Math.floor(currentTemp + 32);
      console.log(currentTemp);
    });
  });
});
