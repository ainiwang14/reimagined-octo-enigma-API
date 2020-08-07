$(document).ready(function(){

var citySearch = "los angeles"
var lat;
var long;
var myResponse;

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast/daily?q=" + citySearch + ",maine&cnt=7&appid=166a433c57516f51dfab1f7edaed8413",
    method: "GET"
}).then(function(response){
    myResponse = response;
    console.log(response)
    console.log(response.city.name)
    console.log(response.list[0].weather[0].description)
    console.log(response.list[0].weather[0])
    console.log(response.list[0].temp)
    lat = response.city.coord.lat
    long = response.city.coord.lon
    "use strict";

    let map;

    function initMap() {
        let location = new Object();
        navigator.geolocation.getCurrentPosition(function(pos){
            location.lat = pos.coords.latitude;
            location.long = pos.coords.longitude;
            map = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: lat ,
                    lng: long
                },
                zoom: 15
        })
        getRestaurants(location);
        
        });
        }

        function getRestaurants(location) {
            var pyromont = new google.maps.LatLng(lat,long);
            var request = {
                location: pyromont,
                radius: "1500",
                type: ["park"]
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback)
        }

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
       initMap();

}).catch(function(error){
    console.log(error)
})



// $.ajax({
//     url: "https://cors-anywhere.herokuapp.com/https://www.movebank.org/movebank/service/direct-read?entity_type=individual&study_id=2911040"    ,
//     method: "GET"
// }).then(function(response){
//     console.log(response)

// })

})


