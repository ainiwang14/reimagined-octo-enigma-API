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
        // for result field 1
        var parkName0 = $("<p>")
        var info0 = $("<p>")
        var fees0 = $("<p>")
        var parkImg0 = $("<img>")
        if (response.data[0].images[0]) {
            parkImg0.attr("src", response.data[0].images[0].url)
            parkImg0.attr("alt", response.data[0].images[0].altText)
            parkImg0.attr("style", "height: 150px;  width: 150px")
            }

        if (response.data[0].entranceFees[0]) {
            fees0.text(response.data[0].entranceFees[0].cost)
            }
        else {
            fees0.text("") 
            }
        parkName0.text(response.data[0].fullName)
        info0.text(response.data[0].designation)
        $("#result1").append(parkName0, info0, fees0, parkImg0)
// result field 2
        var parkName1 = $("<p>")
        var info1 = $("<p>")
        var fees1 = $("<p>")
        var parkImg1 = $("<img>")
        if (response.data[1].images[0]) {
            parkImg1.attr("src", response.data[1].images[0].url)
            parkImg1.attr("alt", response.data[1].images[0].altText)
            parkImg1.attr("style", "height: 150px;  width: 150px")
            }

        if (response.data[1].entranceFees[0]) {
            fees1.text(response.data[1].entranceFees[0].cost)
            }
        else {
            fees1.text("") 
            }
        parkName1.text(response.data[1].fullName)
        info1.text(response.data[1].designation)
        $("#result2").append(parkName1, info1, fees1, parkImg1)
// result box 3

        var parkName2 = $("<p>")
        var info2 = $("<p>")
        var fees2 = $("<p>")
        var parkImg2 = $("<img>")
        if (response.data[2].images[0]) {
            parkImg2.attr("src", response.data[2].images[0].url)
            parkImg2.attr("alt", response.data[2].images[0].altText)
            parkImg2.attr("style", "height: 150px;  width: 150px")
            }

        if (response.data[2].entranceFees[0]) {
            fees2.text(response.data[2].entranceFees[0].cost)
            }
        else {
            fees2.text("") 
            }
        parkName2.text(response.data[2].fullName)
        info2.text(response.data[2].designation)
        $("#result3").append(parkName2, info2, fees2, parkImg2)
        // result box 4
        var parkName4 = $("<p>")
        var info4 = $("<p>")
        var fees4 = $("<p>")
        var parkImg4 = $("<img>")
        if (response.data[4].images[0]) {
            parkImg4.attr("src", response.data[4].images[0].url)
            parkImg4.attr("alt", response.data[4].images[0].altText)
            parkImg4.attr("style", "height: 150px;  width: 150px")
            }

        if (response.data[4].entranceFees[0]) {
            fees4.text(response.data[4].entranceFees[0].cost)
            }
        else {
            fees4.text("") 
            }
        parkName4.text(response.data[4].fullName)
        info4.text(response.data[4].designation)
        $("#result4").append(parkName, info, fees, parkImg)
        // result box 5
        var parkName5 = $("<p>")
        var info5 = $("<p>")
        var fees5 = $("<p>")
        var parkImg5 = $("<img>")
        if (response.data[5].images[0]) {
            parkImg5.attr("src", response.data[5].images[0].url)
            parkImg5.attr("alt", response.data[5].images[0].altText)
            parkImg5.attr("style", "height: 150px;  width: 150px")
            }

        if (response.data[5].entranceFees[0]) {
            fees5.text(response.data[5].entranceFees[0].cost)
            }
        else {
            fees5.text("") 
            }
        parkName5.text(response.data[5].fullName)
        info5.text(response.data[5].designation)
        $("#result5").append(parkName, info, fees, parkImg) 
    })
  }) 
})