$(document).ready(function () {
  //
  $(document).on("click", ".infoBtn", function () {
    console.log("hello");
  });

  var stateArray = [
    { initials: "AL", state: "Alabama" },
    { initials: "AZ", state: "Arizona" },
    { initials: "AK", state: "Alaska" },
    { initials: "AZ", state: "Arizona" },
    { initials: "AR", state: "Arkansas" },
    { initials: "CA", state: "California" },
    { initials: "CO", state: "Colorado" },
    { initials: "CT", state: "Connecticut" },
    { initials: "DE", state: "Delaware" },
    { initials: "FL", state: "Florida" },
    { initials: "GA", state: "Georgia" },
    { initials: "HI", state: "Hawaii" },
    { initials: "ID", state: "Idaho" },
    { initials: "IL", state: "Illinois" },
    { initials: "IN", state: "Indiana" },
    { initials: "IA", state: "Iowa" },
    { initials: "KS", state: "Kansas" },
    { initials: "KY", state: "Kentucky" },
    { initials: "LA", state: "Louisiana" },
    { initials: "ME", state: "Maine" },
    { initials: "MD", state: "Maryland" },
    { initials: "MA", state: "Massachusetts" },
    { initials: "ME", state: "Maine" },
    { intials: "MI", state: "Michigan" },
    { initials: "MN", state: "Minnesota" },
    { initials: "MS", state: "Mississippi" },
    { initials: "MO", state: "Missouri" },
    { intials: "MT", state: "Montana" },
    { initials: "NE", state: "Nebraska" },
    { initials: "NV", state: "Nevada" },
    { initals: "NH", state: "New Hampshire" },
    { initals: "NJ", state: "New Jersey" },
    { initials: "NM", state: "New Mexico" },
    { initials: "NY", state: "New York" },
    { initials: "NC", state: "North Carolina" },
    { initials: "ND", state: "North Dakota" },
    { initials: "OH", state: "Ohio" },
    { initials: "OK", state: "Oklahoma" },
    { initials: "OR", state: "Oregon" },
    { initials: "PA", state: "Pennsylvania" },
    { initials: "RI", state: "Rhode Island" },
    { initials: "SC", state: "South Carolina" },
    { initials: "SD", state: "South Dakota" },
    { initials: "TN", state: "Tennessee" },
    { initials: "TX", state: "Texas" },
    { initials: "UT", state: "Utah" },
    { initials: "VT", state: "Vermont" },
    { initials: "VA", state: "Virginia" },
    { initials: "WA", state: "Washington" },
    { initials: "WV", state: "West Virginia" },
    { initials: "WI", state: "Wisconsin" },
    { initials: "WY", state: "Wyoming" },
  ];

  var icons = [
    {
      class: "bi-droplet",
      d:
        "M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z",
    },
    {
      class: "bi-globe",
      d:
        "M1.018 7.5h2.49c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM2.255 4H4.09a9.266 9.266 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.024 7.024 0 0 0 2.255 4zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.077c-.67.204-1.335.82-1.887 1.855-.173.324-.33.682-.468 1.068H7.5V1.077zM7.5 5H4.847a12.5 12.5 0 0 0-.338 2.5H7.5V5zm1 2.5V5h2.653c.187.765.306 1.608.338 2.5H8.5zm-1 1H4.51a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm1 2.5V8.5h2.99a12.495 12.495 0 0 1-.337 2.5H8.5zm-1 1H5.145c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm-2.173 2.472a6.695 6.695 0 0 1-.597-.933A9.267 9.267 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM1.674 11H3.82a13.651 13.651 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm8.999 3.472A7.024 7.024 0 0 0 13.745 12h-1.834a9.278 9.278 0 0 1-.641 1.539 6.688 6.688 0 0 1-.597.933zM10.855 12H8.5v2.923c.67-.204 1.335-.82 1.887-1.855A7.98 7.98 0 0 0 10.855 12zm1.325-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm.312-3.5h2.49a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.91 4a9.277 9.277 0 0 0-.64-1.539 6.692 6.692 0 0 0-.597-.933A7.024 7.024 0 0 1 13.745 4h-1.834zm-1.055 0H8.5V1.077c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068z",
    },
  ];

  var numberOfResults = 5;

  for (var i = 0; i < stateArray.length; i++) {
    var option = $("<option>");
    option.attr("value", stateArray[i].initials);
    option.text(stateArray[i].state);
    $(".custom-select").append(option);
  }

  $("select").change(function () {
    $(".resultBoxes").empty();

    numberOfResults = 7;

    $("html, body").animate(
      {
        scrollTop: $("#state-parks").offset().top,
      },

      1000,

      "easeInOutExpo"
    );

    var stateCode = $(this).val();

    var npsUrl =
      "https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?stateCode=" +
      stateCode +
      "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX";

    $.ajax({
      url: npsUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var stateOnlyData = [];

      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].states === stateCode) {
          stateOnlyData.push(response.data[i]);
        }
      }

      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(0, 0),
        zoom: 6,
      });

      var geocodingUrl = [];
      var names = [];
      var address = [];

      if (stateOnlyData.length < numberOfResults) {
        numberOfResults = stateOnlyData.length;
      }

      for (var i = 0; i < numberOfResults; i++) {
        names.push(stateOnlyData[i].fullName);
        address.push(
          stateOnlyData[i].addresses[0].city +
            " " +
            stateOnlyData[i].addresses[0].stateCode
        );

        var city = stateOnlyData[i].addresses[0].city;
        var state = stateOnlyData[i].addresses[0].stateCode;

        geocodingUrl.push(
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" +
            city +
            "," +
            state +
            "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"
        );
      }

      for (var i = 0; i < geocodingUrl.length; i++) {
        callAjaxMethod(names[i], address[i], geocodingUrl[i]);
      }

      function callAjaxMethod(name, address, url) {
        $.ajax({
          url: url,
          method: "GET",
        }).then(function (addResponse) {
          console.log(addResponse);

          function initMap() {
            map.panTo(
              new google.maps.LatLng(
                addResponse.results[0].geometry.location.lat,
                addResponse.results[0].geometry.location.lng
              )
            );

            getParks();
          }

          function getParks() {
            var content = "<h3>" + name + "</h3>" + "<h4>" + address + "</h4>";

            var marker = new google.maps.Marker({
              position: addResponse.results[0].geometry.location,
              map: map,
            });

            var infoWindow = new google.maps.InfoWindow({
              content: content,
            });

            marker.setMap(map);
            bindInfoWindow(marker, map, infoWindow, content);
          }

          function bindInfoWindow(marker, map, infoWindow, html) {
            marker.addListener("click", function () {
              infoWindow.setContent(html);
              infoWindow.open(map, this);
            });
          }

          initMap();
        });
      }

      for (var i = 0; i < numberOfResults; i++) {
        var resultDiv = $("<div>");
        var parkName = $("<p>");
        var info = $("<p>");
        var fees = $("<p>");
        var parkImg = $("<img>");
        var resultBtn = $("<a>");
        var svg = $("<svg>");
        var path = $("<path>");

        svg.attr("width", "1rem");
        svg.attr("height", "1rem");
        svg.attr("viewBox", "0 0 16 16");
        svg.attr("class", "bi " + icons[1].class);
        svg.attr("fill", "red");
        svg.attr("xmlns", "http://www.w3.org/2000/svg");

        path.attr("fill-rule", "evenodd");
        path.attr("d", icons[1].d);

        resultBtn.text("More Info");
        resultBtn.attr("class", "btn btn-primary");
        resultBtn.attr(
          "href",
          "https://ainiwang14.github.io/reimagined-octo-enigma-API/secondpage.html" +
            "?" +
            response.data[i].addresses[0].postalCode
        );

        if (stateOnlyData[i].images[0]) {
          parkImg.attr("src", stateOnlyData[i].images[0].url);
          parkImg.attr("alt", stateOnlyData[i].images[0].altText);
          parkImg.attr("style", "height: 150px;  width: 150px;");
        }

        if (stateOnlyData[i].entranceFees[0]) {
          fees.text("$" + stateOnlyData[i].entranceFees[0].cost);
        } else {
          fees.text("$0.000");
        }

        parkName.text(stateOnlyData[i].fullName);

        info.text(stateOnlyData[i].description);

        resultDiv.attr("class", "alert alert-dark");
        resultDiv.attr("role", "alert");

        svg.append(path);

        resultDiv.append(svg, parkName, info, fees, parkImg, resultBtn);

        $(".resultBoxes").append(resultDiv);
      }

      $("#map").attr("style", "display: block;");
    });
  });
});
