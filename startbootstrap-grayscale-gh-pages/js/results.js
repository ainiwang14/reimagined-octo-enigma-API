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
        var lat0 = response.data[0].latitude
        var long0 = response.data[0].longitude
        var lat1 = response.data[1].latitude
        var long1 = response.data[1].longitude
        var lat2 = response.data[2].latitude
        var long2 = response.data[2].longitude
        var lat3 = response.data[3].latitude
        var long3 = response.data[3].longitude
        var lat4 = response.data[4].latitude
        var long4 = response.data[4].longitude
        var lat5 = response.data[5].latitude
        var long5 = response.data[5].longitude
        console.log(response)
        for (var i = 0; i < 5; i++){
            var resultDiv = $("<div>")
            var parkName = $("<p>")
            var info = $("<p>")
            var fees = $("<p>")
            var parkImg = $("<img>")
            if (response.data[i].images[0]) {
                parkImg.attr("src", response.data[i].images[0].url)
                parkImg.attr("alt", response.data[i].images[0].altText)
                parkImg.attr("style", "height: 150px;  width: 150px")
            }

            if (response.data[i].entranceFees[i]) {
                fees.text(response.data[i].entranceFees[i].cost)
            }
            else {
                fees.text("") 
            }
            parkName.text(response.data[i].fullName)
            info.text(response.data[i].designation)
            resultDiv.append(parkName, info, fees, parkImg)
            $(".results").append(resultDiv)
            console.log(response.data[i].fullName)
        }
    })
  }) 
})