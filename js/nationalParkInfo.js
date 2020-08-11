$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parkCode = urlParams.get("parkCode");
  
    var parkCodeUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=8TwvOB64CVZ7My6tRYYfqqq4Tz82BObwHj5wzbyX"
  
    $.ajax({
  
      url: parkCodeUrl,
      method: "GET"
  
    }).then(function(response){
  
        console.log(response)

        var parkName = $("<p>")
        var activitiesP = $("<p>")
        var contactDiv = $("<div>")
        var email = $("<p>")
        var parkNumber = $("<p>")


        parkName.text(response.data[0].fullName)

        if (response.data[0].contacts.emailAddresses[0] && response.data[0].contacts.phoneNumbers[0]) {

                email.text("Email: " + response.data[0].contacts.emailAddresses[0].emailAddress)
                parkNumber.text("Phone Number: " + response.data[0].contacts.phoneNumbers[0].phoneNumber)

        }
        else if (response.data[0].contacts.phoneNumbers[0] && response.data[0].contacts.emailAddresses[0] === null) {

            email.text("Email: No Email")
            parkNumber.text("Phone Number: " + response.data[0].contacts.phoneNumbers[0].phoneNumber)

        }
        else if (response.data[0].contacts.phoneNumbers[0] === null && response.data[0].contacts.emailAddresses[0]) {

            email.text("Email: " + response.data[0].contacts.emailAddresses[0].emailAddress)
            parkNumber.text("Phone Number: No Number")

        }


        if (response.data[0].activities[0]) {
            for (var i = 0; i < response.data[0].activities.length; i++) {

                activitiesP.append(response.data[0].activities[i].name + "<br/>")


            }


        }
        else {

            activitiesP.text("No Activities")

        }

        document.title = response.data[0].fullName;
        contactDiv.append(email, parkNumber)
        $("#contact").append(contactDiv)
        $(".park-name").append(parkName)
        $("#activities").append(activitiesP)

  
    })
  
  });
  