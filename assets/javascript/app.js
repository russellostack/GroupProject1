$(document).ready(function () {

    var queryLocationURL = "https://developers.zomato.com/api/v2.1/locations";

    $("#sumbitCityState").on("click", function (event) {
        event.preventDefault();
        // user input values
        var userLocationInput = $("#city").val().trim();
        var userStateInput = $("#state").val().trim();
        var userCityState = userLocationInput + " " + userStateInput;
        // first ajax call
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=ujQ6emhGAxGPdAKfj3Xpd11EGKJaqgdG";
        $.ajax({
            url: queryURL + "&city=" +userLocationInput,
            method: "GET",
            success: function (TMObj) {
                console.log('success');
                console.log(TMObj);
            }
        }).then(function (TMObj) {
        $.each(TMObj._embedded.events, function(index, value){
            var $eventList = $("<ul>");
            $eventList.addClass("list-group");
            $("#event-deets").append($eventList);
            var $eventListItem = $("<li class='list-group-item eventName'>");
            $eventListItem.append("<h5>" + value.name + "</h5>");
            $eventListItem.append("<h6>" + value.classifications[0].genre.name + "</h6>");
            $eventListItem.append("<h1>" + value._embedded.venues[0].name + "</h1>");

            $eventListItem.append("<h2>" + value._embedded.venues[0].address.line1 + ", " + value._embedded.venues[0].city.name + "</h2>");

            $eventList.append($eventListItem);
        });
    });

        $.ajax({
            url: queryLocationURL + "?query=" + userCityState,
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
            },
            success: function (zomdata) {
                console.log("success");
                console.log(zomdata);
            }
        }).then(function (zomdata) {
            // location lat and long and entity_id
            var objLocationEntityId = zomdata.location_suggestions[0].entity_id;
            var objLocationLat = zomdata.location_suggestions[0].latitude;
            var objLocationLon = zomdata.location_suggestions[0].longitude;

            // Zom search
            var radius = 5;
            var count = 10;
            var queryZomSearchURL = "https://developers.zomato.com/api/v2.1/search?";
            // second ajax call
        var modal = $("#mymodal");
        console.log("userLocationInput: " + userLocationInput);
        console.log("userStateInput: " + userStateInput);

        // Input validation
        if (userLocationInput.length !== 0 &&
            userStateInput !== "none") {

            $.ajax({
                url: queryLocationURL + "?query=" + userCityState,
                method: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
                },
                success: function (zomdata) {
                    console.log("success");
                    console.log(zomdata);
                }
            }).then(function (zomdata) {
                // location lat and long and entity_id
                // var objLocation = data;
                console.log(zomdata.location_suggestions[0].entity_id);
                console.log(zomdata.location_suggestions[0].latitude);
                console.log(zomdata.location_suggestions[0].longitude);
                var objLocationEntityId = zomdata.location_suggestions[0].entity_id;
                var objLocationLat = zomdata.location_suggestions[0].latitude;
                var objLocationLon = zomdata.location_suggestions[0].longitude;

                // Zom search
                var radius = 5;
                var count = 10;
                var queryZomSearchURL = "https://developers.zomato.com/api/v2.1/search?";
                console.log("query search: " + queryZomSearchURL + "entity_id=" + objLocationEntityId + "&entity_type=city" + "&count=" + count + "&lat=" + objLocationLat + "&lon=" + objLocationLon + "&radius=" + radius);

                $.ajax({
                    url: queryZomSearchURL + "entity_id=" + objLocationEntityId + "&entity_type=city" + "&count=" + count + "&lat=" + objLocationLat + "&lon=" + objLocationLon + "&radius=" + radius,
                    method: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Accept', 'application/json');
                        xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
                    },
                    success: function (zomdata2) {
                        console.log("success");
                        console.log(zomdata2);
                    }
                }).then(function (zomdata2) {
                    var count = 0;
                    for (var i = 0; i < 10; i++) {
                        console.log("--------------------------------------------------");
                        count++;
                        console.log("COUNT:" + count);
                        // var restName = zomdata2.restaurants[i].restaurant.name;
                        // console.log ("restName var: " + restName);
                        console.log("Name: " + zomdata2.restaurants[i].restaurant.name);
                        console.log("Cuisine: " + zomdata2.restaurants[i].restaurant.cuisines);
                        console.log("address: " + zomdata2.restaurants[i].restaurant.location.address);
                        console.log("locality: " + zomdata2.restaurants[i].restaurant.location.locality);
                        console.log("rating text: " + zomdata2.restaurants[i].restaurant.user_rating.rating_text);
                        console.log("rating number: " + zomdata2.restaurants[i].restaurant.user_rating.aggregate_rating);
                        console.log("URL: " + zomdata2.restaurants[i].restaurant.url);
                        console.log("URL: " + zomdata2.restaurants[i].restaurant.photos_url);



                        // Create the  list group to contain the content for each
                        var $restList = $("<ul>");
                        $restList.addClass("list-group");

                        // Add the newly created element to the DOM
                        $("#rest-deets").append($restList);

                        var $restListItem = $("<li class='list-group-item restName'>");
                        $restListItem.append("<h5>" + zomdata2.restaurants[i].restaurant.name + "</h5>");
                        $restListItem.append("<h6>" + zomdata2.restaurants[i].restaurant.location.address);
                        $restListItem.append("<h6>" + "Locality: " + zomdata2.restaurants[i].restaurant.location.locality);
                        $restListItem.append("<h6>" + "Cuisine: " + zomdata2.restaurants[i].restaurant.cuisines);
                        $restListItem.append("<h6>" + "Rating text: " + zomdata2.restaurants[i].restaurant.user_rating.rating_text);
                        $restListItem.append("<h6>" + "Rating number: " + zomdata2.restaurants[i].restaurant.user_rating.aggregate_rating);
                        $restListItem.append("<h6>" + "<a href=" + zomdata2.restaurants[i].restaurant.url + ">" + "Zomato MENU URL" + "</a>");
                        $restListItem.append("<h6>" + "<a href=" + zomdata2.restaurants[i].restaurant.photos_url + ">" + "Zomato PHOTOS URL" + "</a>");

                        $restList.append($restListItem);




                    };

                });
            });

        } else
            if (userLocationInput.length === 0) {
                modal.show();
                $(".errormessage").text("Please enter a city");
            }
            else
                if (userStateInput === "none") {
                    modal.show();
                    $(".errormessage").text("Please select the state");
                };

        $(".close").on("click", function () {
            modal.hide();

        });
    });

});
})

