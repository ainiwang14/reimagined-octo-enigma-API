$(document).ready(function(){
    $(".dropdown-item").on("click", function(){
        var stateName = $(this).text()
        $(".dropdown-toggle").text(stateName)
        $(".results").empty()

    var stateCode = $(this).attr("value")
    console.log(stateCode)
    var queryUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX"

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){

        console.log(response)

        for (var i = 0; i < 5; i++) {
            var long = response.data[i].longitude
            var lat = response.data[i].latitude
            console.log(long, lat)
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