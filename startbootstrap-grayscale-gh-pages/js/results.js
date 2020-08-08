$(document).ready(function(){
    $(document).on("click", ".infoBtn", function(){
        console.log("hello")
    })
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
        var map;
        map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(0,0),
            zoom: 5
        })
        for (var i = 0; i < 3; i++) {

        var name = response.data[i].fullName
        console.log(name + "1")
        var content = '<h3>' + name + '</h3>' + '<h4>' + '</h4>'
        var city = response.data[i].addresses[0].city
        var state = response.data[i].addresses[0].stateCode
        var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"
        $.ajax({
            url: geocodingUrl,
            method: "GET"
        }).then(function(addResponse){
            function initMap() {
                map.panTo(new google.maps.LatLng(addResponse.results[0].geometry.location.lat,addResponse.results[0].geometry.location.lng))
                getParks();
                }
                function getParks() {
                    console.log(name + "2")
                        var marker = new google.maps.Marker({
                            position: addResponse.results[0].geometry.location,
                            map: map,
                            title: addResponse.results[0].name
                        });
                        var infoWindow = new google.maps.InfoWindow({
                            content: content
                        })
                        marker.setMap(map);
                        bindInfoWindow(marker, map, infoWindow, content);
                }

                function bindInfoWindow(marker, map, infoWindow, html) {
                    marker.addListener("click", function(){
                        infoWindow.setContent(html)
                        infoWindow.open(map, this)
                    })
                }
            initMap()
        })
    }
        console.log(response)
        for (var i = 0; i < 4; i++) {
            var resultDiv = $("<div>")
            var parkName = $("<p>")
            var info = $("<p>")
            var fees = $("<p>")
            var parkImg = $("<img>")
            var resultBtn = $("<button>")
            resultBtn.text("More Info")
            resultBtn.attr("class", "infoBtn")
            resultBtn.click(() => handleInfoClick(zipcode))
            const zipcode = response.data[i].addresses[0].postalcode
            if (response.data[i].images[0]) {
                parkImg.attr("src", response.data[i].images[0].url)
                parkImg.attr("alt", response.data[i].images[0].altText)
                parkImg.attr("style", "height: 150px;  width: 150px;")
                }
            if (response.data[i].entranceFees[0]) {
                fees.text("$" + response.data[i].entranceFees[0].cost)
                }
            else {
                fees.text("$0.000") 
                }
            parkName.text(response.data[i].fullName)
            info.text(response.data[i].description)
            resultDiv.append(parkName, info, fees, parkImg, resultBtn)
            $("#result" + i).html(resultDiv)
        }
    })
})

function zipToGeo(zipcode) {
    const url = `https://public.opendatasoft.com//api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipcode}`
    $.ajax({
        url,
        method: "GET"
    }).then(response => {
        const latitude = response.records[0].fields.latitude;
        const longitude = response.records[0].fields.longitude;
        console.log(latitude, longitude)
        return {latitude, longitude}
    })
}

function handleInfoClick(zipcode) {
    zipToGeo(zipcode)
}



})