$(document).ready(function(){
    var stateArray = [{ initials: 'AL', state: 'Alabama' }, { initials: 'AZ', state: 'Arizona' }, {initials: 'AK', state: 'Alaska'}, {initials: 'AZ', state: 'Arizona'}, {initials: 'AR', state: 'Arkansas'}, {initials: 'CA', state: 'California'}, {initials: 'CO', state: 'Colorado'}, {initials: 'CT', state: 'Connecticut'}, {initials: 'DE', state: 'Delaware'}, {initials: 'FL', state: 'Florida'}, {initials: 'GA', state: 'Georgia'}, {initials: 'HI', state: 'Hawaii'}, {initials: 'ID', state: 'Idaho'}, {initials: 'IL', state: 'Illinois'}, {initials: 'IN', state: 'Indiana'}, {initials: 'IA', state: 'Iowa'}, {initials: 'KS', state: 'Kansas'}, {initials: 'KY', state: 'Kentucky'}, {initials: 'LA', state: 'Louisiana'}, {initials: 'ME', state: 'Maine'}, {initials: 'MD', state: 'Maryland'}, {initials: 'MA', state: 'Massachusetts'}, {initials: 'ME', state: 'Maine'}, {intials: 'MI', state: 'Michigan'}, {initials: 'MN', state: 'Minnesota'}, {initials: 'MS', state: 'Mississippi'}, {initials: 'MO', state: 'Missouri'}, {intials: 'MT', state: 'Montana'}, {initials: 'NE', state: 'Nebraska'}, {initials: 'NV', state: 'Nevada'}, {initals: 'NH', state: 'New Hampshire'}, {initals: 'NJ', state: 'New Jersey'}, {initials: 'NM', state: 'New Mexico'}, {initials: 'NY', state: 'New York'}, {initials: 'NC', state: 'North Carolina'}, {initials: 'ND', state: 'North Dakota'}, {initials: 'OH', state: 'Ohio'}, {initials: 'OK', state: 'Oklahoma'}, {initials: 'OR', state: 'Oregon'}, {initials: 'PA', state: 'Pennsylvania'}, {initials: 'RI', state: 'Rhode Island'}, {initials: 'SC', state: 'South Carolina'}, {initials: 'SD', state: 'South Dakota'}, {initials: 'TN', state: 'Tennessee'}, {initials: 'TX', state: 'Texas'}, {initials: 'UT', state: 'Utah'}, {initials: 'VT', state: 'Vermont'}, {initials: 'VA', state: 'Virginia'}, {initials: 'WA', state: 'Washington'}, {initials: 'WV', state: 'West Virginia'}, {initials: 'WI', state: 'Wisconsin'}, {initials: 'WY', state: 'Wyoming'}];
    for (var i = 0; i < stateArray.length; i++) {

        var option = $("<option>");
        option.attr('value',stateArray[i].initials); 
        option.text(stateArray[i].state); 
        $(".custom-select").append(option)
    }
    
    $("select").change(function () {
        $("html, body").animate(
            {
                scrollTop: $("#state-parks").offset().top,
            },
            1000,
            "easeInOutExpo"
        );

  

        event.preventDefault();
        $(".results").empty()
        $("#map").attr("style", "display: block;")

    var stateCode = $(this).val();
    console.log(stateCode)
    var npsUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX"

    $.ajax({
        url: npsUrl,
        method: "GET"
    }).then(function(response){

        var address = response.data[0].addresses[0].line3
        var city = response.data[0].addresses[0].city
        var state = response.data[0].addresses[0].stateCode
        var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "," + city + "," + state + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"

        $.ajax({
            url: geocodingUrl,
            method: "GET"
        }).then(function(addResponse){
            console.log(addResponse)
            if ($(this).attr("value"))
            // location = new google.maps.LatLng(addResponse.results[0].geometry.location.lat,addResponse.results[0].geometry.location.long)

            function initMap() {
                 map = new google.maps.Map(document.getElementById("map"), {
                    center: {
                        lat: 0,
                        long: 0
                    },
                    zoom: 6
                })
                }
                // function getRestaurants(location) {
                //     var pyromont = new google.maps.LatLng(lat,long);
                //     var request = {
                //         location: pyromont,
                //         radius: "1500",
                //         type: ["park"]
                //     };
                //     service = new google.maps.places.PlacesService(map);
                //     service.nearbySearch(request, callback)
                // }
    
                function callback(results, status){
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var content = '<h3>' + results[i].name + '</h3>' + '<h4>' + results[i].vicinity + '</h4>'
                            var marker = new google.maps.Marker({
                                position: results[i].geometry.location,
                                map: map,
                                tittle: results[i].name
                            });
        
                            var infoWindow = new google.maps.InfoWindow({
                                content: content
                            })
        
                            marker.setMap(map);
                            bindInfoWindow(marker, map, infoWindow, content);
        
        
                        }
                    }
                }
                function bindInfoWindow(marker, map, infoWindow, html) {
                    marker.addListener("click", function(){
                        infoWindow.setContent(html)
                        infoWindow.open(map, this)
                    })
                }
            initMap()
        })
        

        console.log(response)

        for (var i = 0; i < 5; i++) {
            var parkName = $("<p>")
            var info = $("<p>")
            var fees = $("<p>")
            var parkImg = $("<img>")
            if (response.data[i].images[0]) {
                parkImg.attr("src", response.data[i].images[0].url)
                parkImg.attr("alt", response.data[i].images[0].altText)
                parkImg.attr("style", "height: 150px;  width: 150px")
                }

            if (response.data[i].entranceFees[0]) {
                fees.text(response.data[i].entranceFees[0].cost)
                }
            else {
                fees.text("") 
                }
            parkName.text(response.data[i].fullName)
            info.text(response.data[i].designation)
            $("#result" + i).append(parkName, info, fees, parkImg)
        }
    })
})
   
})