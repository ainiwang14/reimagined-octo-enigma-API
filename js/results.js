$(document).ready(function () {
    var stateArray = [
        { initials: "AL", state: "Alabama" },
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
        { initials: "MI", state: "Michigan" },
        { initials: "MN", state: "Minnesota" },
        { initials: "MS", state: "Mississippi" },
        { initials: "MO", state: "Missouri" },
        { initials: "MT", state: "Montana" },
        { initials: "NE", state: "Nebraska" },
        { initials: "NV", state: "Nevada" },
        { initials: "NH", state: "New Hampshire" },
        { initials: "NJ", state: "New Jersey" },
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
    var numberOfResults = 5;
    var chooseNumberOfResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    for (var i = 0; i < stateArray.length; i++) {
        var option = $("<option>");
        option.attr("value", stateArray[i].initials);
        option.text(stateArray[i].state);
        $("#select-a-state").append(option);
    }
    for (var i = 0; i < chooseNumberOfResults.length; i++) {
        var option = $("<option>");
        option.attr("value", chooseNumberOfResults[i]);
        option.text(chooseNumberOfResults[i]);
        $("#select-a-number").append(option);
    }
    $("#state-and-number-search-result").on("click", function () {
        $("html, body").animate(
            {
                scrollTop: $("#state-parks").offset().top,
            },
            1000,
            "easeInOutExpo"
        );
        var stateCode = $("#select-a-state").val();
        numberOfResults = $("#select-a-number").val();
        var npsUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX";
        $.ajax({
            url: npsUrl,
            method: "GET",
        }).then(function (response) {
            $(".resultBoxes").empty();
            $(".resultBoxes").attr("style", "padding-bottom: 0px;");
            console.log(response);
            var stateOnlyData = [];
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].states === stateCode && response.data[i].addresses[0]) {
                    stateOnlyData.push(response.data[i]);
                } else if (stateCode === "DE") {
                    stateOnlyData.push(response.data[i]);
                }
            }
            console.log(stateOnlyData)
            var parkMap = new google.maps.Map(document.getElementById("map"), {
                center: new google.maps.LatLng(37.0902, -95.7129),
                zoom: 4,
            });
            var geocodingUrl = [];
            var names = [];
            var address = [];
            var postCode = [];
            var parkAbv = [];
            if (stateOnlyData.length < numberOfResults) {
                numberOfResults = stateOnlyData.length;
            }
            for (var i = 0; i < numberOfResults; i++) {
                parkAbv.push(stateOnlyData[i].parkCode)
                postCode.push(stateOnlyData[i].addresses[0].postalCode)
                names.push(stateOnlyData[i].fullName);
                address.push(stateOnlyData[i].addresses[0].city + " " + stateOnlyData[i].addresses[0].stateCode);
                var lineOne = stateOnlyData[i].addresses[0].line1;
                var city = stateOnlyData[i].addresses[0].city;
                geocodingUrl.push("https://maps.googleapis.com/maps/api/geocode/json?address=" + lineOne + "," + city + "," + stateCode + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM");
            }
            for (var i = 0; i < numberOfResults; i++) {
                callAjaxMethod(names[i], address[i], postCode[i], parkAbv[i], geocodingUrl[i]);
            }
            function callAjaxMethod(name, address, postal, parkCode, url) {
                $.ajax({
                    url: url,
                    method: "GET"
                }).then(function (addResponse) {
                    console.log(addResponse);
                    function initMap() {
                        parkMap.panTo(
                            new google.maps.LatLng(
                                addResponse.results[0].geometry.location.lat,
                                addResponse.results[0].geometry.location.lng
                            )
                        );
                        parkMap.setZoom(6);
                        getParks();
                    }
                    function getParks() {
                        var basicParkInfo = "<h5>" + name + "</h5>" + 
                        "<h6>" + address + "</h6>" + 
                        "<a href=display.html?PostalCode=" + postal + "&parkCode=" + parkCode + ">More Info</a>" ;
                        if (addResponse.results[0]) {
                          var parkMarker = new google.maps.Marker({
                              position: addResponse.results[0].geometry.location,
                              map: parkMap
                          });
                      }
                        var parkInfoPopUp = new google.maps.InfoWindow({
                            content: basicParkInfo
                        });
                        parkMarker.setMap(parkMap);
                        bindInfoWindow(parkMarker, parkMap, parkInfoPopUp, basicParkInfo);
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
                resultBtn.text("More Info");
                resultBtn.attr("id", "infoBtn");
                resultBtn.attr("class", "btn btn-primary");
                resultBtn.attr("href", "./display.html?PostalCode=" + stateOnlyData[i].addresses[0].postalCode + "&parkCode=" + stateOnlyData[i].parkCode);
                if (stateOnlyData[i].images[0]) {
                    parkImg.attr("src", stateOnlyData[i].images[0].url);
                    parkImg.attr("alt", stateOnlyData[i].images[0].altText);
                    parkImg.attr("style", "height: 150px;  width: 150px;");
                }
                else {
                  parkImg.attr("src", "https://images.pexels.com/photos/618608/pexels-photo-618608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
                  parkImg.attr("alt", "Sun behind large rock");
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
                resultDiv.append( parkName, info, fees, parkImg, resultBtn);
                resultDiv.prepend(`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M1.018 7.5h2.49c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM2.255 4H4.09a9.266 9.266 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.024 7.024 0 0 0 2.255 4zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.077c-.67.204-1.335.82-1.887 1.855-.173.324-.33.682-.468 1.068H7.5V1.077zM7.5 5H4.847a12.5 12.5 0 0 0-.338 2.5H7.5V5zm1 2.5V5h2.653c.187.765.306 1.608.338 2.5H8.5zm-1 1H4.51a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm1 2.5V8.5h2.99a12.495 12.495 0 0 1-.337 2.5H8.5zm-1 1H5.145c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm-2.173 2.472a6.695 6.695 0 0 1-.597-.933A9.267 9.267 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM1.674 11H3.82a13.651 13.651 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm8.999 3.472A7.024 7.024 0 0 0 13.745 12h-1.834a9.278 9.278 0 0 1-.641 1.539 6.688 6.688 0 0 1-.597.933zM10.855 12H8.5v2.923c.67-.204 1.335-.82 1.887-1.855A7.98 7.98 0 0 0 10.855 12zm1.325-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm.312-3.5h2.49a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.91 4a9.277 9.277 0 0 0-.64-1.539 6.692 6.692 0 0 0-.597-.933A7.024 7.024 0 0 1 13.745 4h-1.834zm-1.055 0H8.5V1.077c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068z"/>
                </svg>`)
                $(".resultBoxes").append(resultDiv);
            }
            $("#map").attr("style", "display: block;");
        });
    });
});