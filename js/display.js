$(document).ready(function () {
  var aladin = A.aladin("#aladin-lite-div", {
    survey: "P/DSS2/color",
    fov: 60,
  });

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
      var iconWeather = response.current.weather[0].main
      currentTemp = currentTemp - 273;
      currentTemp = currentTemp * (9 / 5);
      currentTemp = Math.floor(currentTemp + 32);
      console.log(response.current.weather[0].main);
      $("#weather").html(currentTemp);
      if (iconWeather === "Clear") {
      var image = $("<img>");
      image.attr("class", "weather-icons");
      image.attr("src", "assets/img/sun-icon.png");
      $("#weather").append(image);
      }
      else if (iconWeather === "Clouds") {
        var image = $("<img>");
        image.attr("class", "weather-icons");
        image.attr("src", "assets/img/cloudy-icon.png");
        $("#weather").append(image);
      }
      else if (iconWeather === "Snow") {
        var image = $("<img>");
        image.attr("class", "weather-icons");
        image.attr("src", "assets/img/snowy-icon.png");
        $("#weather").append(image);
     }
     else if (iconWeather === "Rain") {
      var image = $("<img>");
      image.attr("class", "weather-icons");
      image.attr("src", "assets/img/rainy-icon.png");
      $("#weather").append(image);
    }
    else if (iconWeather === "Thunderstorm") {
      var image = $("<img>");
      image.attr("class", "weather-icons");
      image.attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
      $("#weather").append(image);
    }
    else if (iconWeather === "Drizzle") {
      var image = $("<img>");
      image.attr("class", "weather-icons");
      image.attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
      $("#weather").append(image);
    }
    else {
      var image = $("<img>");
      image.attr("class", "weather-icons");
      image.attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
      $("#weather").append(image);
    }
    
    });
  });
});
