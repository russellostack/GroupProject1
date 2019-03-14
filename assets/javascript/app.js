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
