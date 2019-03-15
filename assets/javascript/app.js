


function eventInputValid(input){
    var rawInput = document.forms["eventInputField"]["eventInput"];
    if (rawInput.value == ""){
        return false;
    }
    return true;
    
},
//what inputs will we be accepting for the location input?
//zip code, city, 
function locationInputValid(input){
    var rawInput = document.forms["locationInputField"]["locationInput"];
    if (rawInput.value == ""){
        return false;
    }
    return true;
}

//listens for event input submission, runs basic validaion then take th input and submits it to the 
//zomato ajax api function
$(document).on("click", "#eventBtn", function () {

})
//listens for location input submission, then takes that input, runs basic validation
//and then forwards that data to the googlemaps/mapquest ajax function and runs it.
$(document).on("click", "#locationBtn", function () {

})

// *************************************************************

var queryLocationURL = "https://developers.zomato.com/api/v2.1/locations";

        $("#location-submit").on("click", function (event) {
            event.preventDefault();

            var userLocationInput = $("#location-input").val().trim();
            var userStateInput = $("#state").val();
            var userCityState = userLocationInput + " " + userStateInput;

            console.log("user state: " + userStateInput);
            console.log("user location input: " + userLocationInput);
            console.log("city state: " + userCityState);

            $.ajax({
                url: queryLocationURL + "?query=" + userCityState,
                method: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
                },
                success: function (data) {
                    console.log('success');
                    console.log(data);
                }
            }).done(function (data) {
                // var results = response;
                var objLocation = data;
                console.log(objLocation.location_suggestions[0].entity_id);
                console.log(objLocation.location_suggestions[0].latitude);
                console.log(objLocation.location_suggestions[0].longitude);
                var objLocationEntityId = objLocation.location_suggestions[0].entity_id;
                var objLocationLat = objLocation.location_suggestions[0].latitude;
                var objLocationLon = objLocation.location_suggestions[0].longitude;

                
            });

        });