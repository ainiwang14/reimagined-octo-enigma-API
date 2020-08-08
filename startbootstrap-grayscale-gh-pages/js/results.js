$(document).ready(function(){
// 
    $(document).on("click", ".infoBtn", function(){

        console.log("hello");

    });

    var stateArray = [{ initials: 'AL', state: 'Alabama' }, { initials: 'AZ', state: 'Arizona' }, {initials: 'AK', state: 'Alaska'}, {initials: 'AZ', state: 'Arizona'}, {initials: 'AR', state: 'Arkansas'}, {initials: 'CA', state: 'California'}, {initials: 'CO', state: 'Colorado'}, {initials: 'CT', state: 'Connecticut'}, {initials: 'DE', state: 'Delaware'}, {initials: 'FL', state: 'Florida'}, {initials: 'GA', state: 'Georgia'}, {initials: 'HI', state: 'Hawaii'}, {initials: 'ID', state: 'Idaho'}, {initials: 'IL', state: 'Illinois'}, {initials: 'IN', state: 'Indiana'}, {initials: 'IA', state: 'Iowa'}, {initials: 'KS', state: 'Kansas'}, {initials: 'KY', state: 'Kentucky'}, {initials: 'LA', state: 'Louisiana'}, {initials: 'ME', state: 'Maine'}, {initials: 'MD', state: 'Maryland'}, {initials: 'MA', state: 'Massachusetts'}, {initials: 'ME', state: 'Maine'}, {intials: 'MI', state: 'Michigan'}, {initials: 'MN', state: 'Minnesota'}, {initials: 'MS', state: 'Mississippi'}, {initials: 'MO', state: 'Missouri'}, {intials: 'MT', state: 'Montana'}, {initials: 'NE', state: 'Nebraska'}, {initials: 'NV', state: 'Nevada'}, {initals: 'NH', state: 'New Hampshire'}, {initals: 'NJ', state: 'New Jersey'}, {initials: 'NM', state: 'New Mexico'}, {initials: 'NY', state: 'New York'}, {initials: 'NC', state: 'North Carolina'}, {initials: 'ND', state: 'North Dakota'}, {initials: 'OH', state: 'Ohio'}, {initials: 'OK', state: 'Oklahoma'}, {initials: 'OR', state: 'Oregon'}, {initials: 'PA', state: 'Pennsylvania'}, {initials: 'RI', state: 'Rhode Island'}, {initials: 'SC', state: 'South Carolina'}, {initials: 'SD', state: 'South Dakota'}, {initials: 'TN', state: 'Tennessee'}, {initials: 'TX', state: 'Texas'}, {initials: 'UT', state: 'Utah'}, {initials: 'VT', state: 'Vermont'}, {initials: 'VA', state: 'Virginia'}, {initials: 'WA', state: 'Washington'}, {initials: 'WV', state: 'West Virginia'}, {initials: 'WI', state: 'Wisconsin'}, {initials: 'WY', state: 'Wyoming'}];
    
    for (var i = 0; i < stateArray.length; i++) {

        var option = $("<option>");
        option.attr('value',stateArray[i].initials); 
        option.text(stateArray[i].state); 
        $(".custom-select").append(option);

    };

    $("select").change(function () {

        $("#result0").attr("style", "display:block;");
        $("#result1").attr("style", "display:block;");
        $("#result2").attr("style", "display:block;");
        $("#result3").attr("style", "display:block;");
        $("#result4").attr("style", "display:block;");

        $("html, body").animate(

            {
                scrollTop: $("#state-parks").offset().top,
            },

            1000,

            "easeInOutExpo"

        );
        
    var stateCode = $(this).val();
    
    var npsUrl = "https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX";

    $.ajax({

        url: npsUrl,
        method: "GET"

    }).then(function(response){

        console.log(response);

        var resultData = [];

        for (var i = 0; i < response.data.length; i++) {

            if (response.data[i].states === stateCode) {

                resultData.push(response.data[i]);

            };

        };

        var map = new google.maps.Map(document.getElementById("map"), {

            center: new google.maps.LatLng(0,0),
            zoom: 6

        });

        var geocodingUrl = [];
        var names = [];
        var address = [];

        for (var i = 0; i < resultData.length; i++) {

        names.push(resultData[i].fullName);
        address.push(resultData[i].addresses[0].city + " " +  resultData[i].addresses[0].stateCode);

        var city = resultData[i].addresses[0].city;
        var state = resultData[i].addresses[0].stateCode;

        geocodingUrl.push("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" +  city + "," + state + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM");

        };
        
        $.ajax({

            url: geocodingUrl[0],
            method: "GET"

        }).then(function(addResponse){

            console.log(addResponse);

            function initMap() {

                map.panTo(new google.maps.LatLng(addResponse.results[0].geometry.location.lat,addResponse.results[0].geometry.location.lng));

                getParks();

                };

                function getParks() {

                        var content = '<h3>' + names[0] + '</h3>' + '<h4>' + address[0] + '</h4>';

                        var marker = new google.maps.Marker({

                            position: addResponse.results[0].geometry.location,
                            map: map,

                        });

                        var infoWindow = new google.maps.InfoWindow({

                            content: content

                        });

                        marker.setMap(map);
                        bindInfoWindow(marker, map, infoWindow, content);

                };

                function bindInfoWindow(marker, map, infoWindow, html) {

                    marker.addListener("click", function(){

                        infoWindow.setContent(html);
                        infoWindow.open(map, this);

                    });
                };

            initMap();

        })
        
        $.ajax({

            url: geocodingUrl[1],
            method: "GET"

        }).then(function(addResponse){

            console.log(addResponse)

            getParks();

            function getParks() {

                var content = '<h3>' + names[1] + '</h3>' + '<h4>' + address[1] + '</h4>';

                var marker = new google.maps.Marker({

                    position: addResponse.results[0].geometry.location,
                    map: map,
                    title: addResponse.results[0].name

                });

                var infoWindow = new google.maps.InfoWindow({

                    content: content

                });

                marker.setMap(map);

                bindInfoWindow(marker, map, infoWindow, content);

            };

            function bindInfoWindow(marker, map, infoWindow, html) {

                marker.addListener("click", function(){

                    infoWindow.setContent(html)
                    infoWindow.open(map, this)

                });

            };
        });

        $.ajax({

            url: geocodingUrl[2],
            method: "GET"

        }).then(function(addResponse){

            console.log(addResponse)

            getParks();

            function getParks() {

                var content = '<h3>' + names[2] + '</h3>' + '<h4>' + address[2] + '</h4>';

                var marker = new google.maps.Marker({

                    position: addResponse.results[0].geometry.location,
                    map: map,
                    title: addResponse.results[0].name

                });

                var infoWindow = new google.maps.InfoWindow({

                    content: content

                });

                marker.setMap(map);

                bindInfoWindow(marker, map, infoWindow, content);

            };

            function bindInfoWindow(marker, map, infoWindow, html) {

                marker.addListener("click", function(){

                    infoWindow.setContent(html)
                    infoWindow.open(map, this)

                });

            };
        });

        $.ajax({

            url: geocodingUrl[3],
            method: "GET"

        }).then(function(addResponse){

            console.log(addResponse)

            getParks();

            function getParks() {

                var content = '<h3>' + names[3] + '</h3>' + '<h4>' + address[3] + '</h4>';

                var marker = new google.maps.Marker({

                    position: addResponse.results[0].geometry.location,
                    map: map,
                    title: addResponse.results[0].name

                });

                var infoWindow = new google.maps.InfoWindow({

                    content: content

                });

                marker.setMap(map);

                bindInfoWindow(marker, map, infoWindow, content);

            };

            function bindInfoWindow(marker, map, infoWindow, html) {

                marker.addListener("click", function(){

                    infoWindow.setContent(html)
                    infoWindow.open(map, this)

                });

            };
        });

        $.ajax({

            url: geocodingUrl[4],
            method: "GET"

        }).then(function(addResponse){

            console.log(addResponse)

            getParks();

            function getParks() {

                var content = '<h3>' + names[4] + '</h3>' + '<h4>' + address[4] + '</h4>';

                var marker = new google.maps.Marker({

                    position: addResponse.results[0].geometry.location,
                    map: map,
                    title: addResponse.results[0].name

                });

                var infoWindow = new google.maps.InfoWindow({

                    content: content

                });

                marker.setMap(map);

                bindInfoWindow(marker, map, infoWindow, content);

            };

            function bindInfoWindow(marker, map, infoWindow, html) {

                marker.addListener("click", function(){

                    infoWindow.setContent(html)
                    infoWindow.open(map, this)

                });

            };
        });

        if (resultData.length < 5 &&  resultData.length > 3){

            $("#result4").attr("style", "display:none;");

        }
        else if (resultData.length < 4 &&  resultData.length > 2) {

            $("#result3").attr("style", "display:none;");
            $("#result4").attr("style", "display:none;");

        }
        else if (resultData.length < 3 &&  resultData.length > 1) {

            $("#result2").attr("style", "display:none;");
            $("#result3").attr("style", "display:none;");
            $("#result4").attr("style", "display:none;");

        }
        else if (resultData.length < 2 &&  resultData.length > 0) {

            $("#result1").attr("style", "display:none;");
            $("#result2").attr("style", "display:none;");
            $("#result3").attr("style", "display:none;");
            $("#result4").attr("style", "display:none;");

        }
        else if (resultData.length === 0) {

            $("#result0").attr("style", "display:none;");
            $("#result1").attr("style", "display:none;");
            $("#result2").attr("style", "display:none;");
            $("#result3").attr("style", "display:none;");
            $("#result4").attr("style", "display:none;");

        };

        for (var i = 0; i < resultData.length; i++) {

            console.log(resultData)

            var resultDiv = $("<div>");
            var parkName = $("<p>");
            var info = $("<p>");
            var fees = $("<p>");
            var parkImg = $("<img>");
            var resultBtn = $("<button>");

            resultBtn.text("More Info");
            resultBtn.attr("class", "infoBtn");

            if (resultData[i].images[0]) {

                parkImg.attr("src", resultData[i].images[0].url);
                parkImg.attr("alt", resultData[i].images[0].altText);
                parkImg.attr("style", "height: 150px;  width: 150px;");

            };

            if (resultData[i].entranceFees[0]) {

                fees.text("$" + resultData[i].entranceFees[0].cost);

            }
            else {

                fees.text("$0.000"); 

            };

            parkName.text(resultData[i].fullName);

            info.text(resultData[i].description);

            resultDiv.append(parkName, info, fees, parkImg, resultBtn);

            $("#result" + i).html(resultDiv);

        };

        $("#map").attr("style", "display: block;");

    });
  })
})