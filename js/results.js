$(document).ready(function () {

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

        var npsUrl = "https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX";
       
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
                address.push(stateOnlyData[i].addresses[0].city + " " + stateOnlyData[i].addresses[0].stateCode);
                
                var city = stateOnlyData[i].addresses[0].city;
                var state = stateOnlyData[i].addresses[0].stateCode;
               
                geocodingUrl.push("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM");
           
            }

            for (var i = 0; i < geocodingUrl.length; i++) {

                callAjaxMethod(names[i], address[i], geocodingUrl[i]);

            }

            function callAjaxMethod(name, address, url) {

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

                        getParks();
                    }

                    function getParks() {

                        var basicParkInfo = "<h3>" + name + "</h3>" + "<h4>" + address + "</h4>";
                        
                        var parkMarker = new google.maps.Marker({

                            position: addResponse.results[0].geometry.location,
                            map: parkMap

                        });

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
                resultBtn.attr("class", "infoBtn");
                resultBtn.attr("class", "btn btn-primary");
                resultBtn.attr("href", "./display.html?PostalCode=" + stateOnlyData[i].addresses[0].postalCode + "?parkCode=" + stateOnlyData[i].parkCode);
                
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

                resultDiv.append( parkName, info, fees, parkImg, resultBtn);
                resultDiv.prepend(`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="" />
                </svg>`)
                $(".resultBoxes").append(resultDiv);
            }

            $("#map").attr("style", "display: block;");

        });
    });
});
