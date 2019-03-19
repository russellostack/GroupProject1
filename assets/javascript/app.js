$(document).ready(function () {

    var queryLocationURL = "https://developers.zomato.com/api/v2.1/locations";

    $("#sumbitCityState").on("click", function (event) {
        $("#rest-deets").empty();
        $("#event-deets").empty();
        event.preventDefault();
        // user input values
        var userLocationInput = $("#city").val().trim();
        var userStateInput = $("#state").val().trim();
        var userCityState = userLocationInput + " " + userStateInput;

        // input validation
        var modal = $("#mymodal");
        if (userLocationInput.length !== 0 &&
            userStateInput !== "") {

            // first ajax call
            var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=ujQ6emhGAxGPdAKfj3Xpd11EGKJaqgdG";
            $.ajax({
                url: queryURL + "&city=" + userLocationInput,
                method: "GET",
                success: function (TMObj) {
                    console.logTMObj;
                }
            }).then(function (TMObj) {
                $.each(TMObj._embedded.events, function (index, value) {

                    var $eventListItem = $("<li class='list-group-item event' id='" + value.name + "'>");
                    $eventListItem.append($("<h5>" + value.classifications[0].genre.name + "</h5>"));
                    var $eventList = $("<ul>");
                    $eventList.addClass("list-group");
                    $("#event-deets").append($eventList);
                    $eventListItem.append("<h5>" + value.name + "</h5>");
                    $eventListItem.append("<h6>" + "Event Genre: " + value.classifications[0].genre.name + "</h6>");
                    $eventListItem.append("<h6>" + "Location: " + value._embedded.venues[0].name + "</h6>");
                    $eventListItem.append("<h6>" + "Event Date: " + value.dates.start.localDate + "<h6>");
                    $eventListItem.append("<h6>" + "Start Time: " + moment(value.dates.start.localTime, 'HH:mm').format("hh:mm") + "<h6>");
                    $eventListItem.append("<h6>" + "Address: " + value._embedded.venues[0].address.line1 + value._embedded.venues[0].city.name + "</h6>");
                    $eventListItem.append("<h6>" + "<a target='_blank' href=" + value.url + ">" + "Click Here for tickets" + "</a>");
                    $eventListItem.append("<i class='far fa-heart eheart' heart-state='empty' id='eventHeart_" + index + "'></i>");

                    $eventList.append($eventListItem);
                });
                $(".eheart").on("click", function (event) {
                    event.preventDefault();
                    $(".insertFavEvent").empty();
                    var state = $(this).attr("heart-state");


                    if (state === "empty") {
                        $(this).removeClass("far");
                        $(this).addClass("fas");
                        $(this).attr("heart-state", "full");
                        $(".event").click(function () {
                            var eventNameText = $(this).attr("id");
                            $(".insertFavEvent").empty();
                            $(".insertFavEvent").append(eventNameText);
                        });
                        $(".eheart").hide();
                        $(this).show();
                    } else {
                        $(this).addClass("far");
                        $(this).removeClass("fas");
                        $(this).attr("heart-state", "empty");
                        $(".event").click(function () {
                            var eventNameText = "";
                            $(".insertFavEvent").empty();
                            $(".insertFavEvent").append("Your LIKED event goes HERE");
                        });
                        $(".eheart").show();
                    };
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

                $.ajax({
                    url: queryZomSearchURL + "entity_id=" + objLocationEntityId + "&entity_type=city" + "&count=" + count + "&lat=" + objLocationLat + "&lon=" + objLocationLon + "&radius=" + radius, method: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Accept', 'application/json');
                        xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
                    },
                    success: function (zomdata) {
                    }
                }).then(function (zomdata) {
                    // location lat and long and entity_id
                    // var objLocation = data;

                    // Zom search
                    var radius = 5;
                    var count = 10;
                    var queryZomSearchURL = "https://developers.zomato.com/api/v2.1/search?";

                    $.ajax({
                        url: queryZomSearchURL + "entity_id=" + objLocationEntityId + "&entity_type=city" + "&count=" + count + "&lat=" + objLocationLat + "&lon=" + objLocationLon + "&radius=" + radius,
                        method: 'GET',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Accept', 'application/json');
                            xhr.setRequestHeader('user-key', '5bf4f29ca59c03031cc0830248eed6b3');
                        },
                        success: function (zomdata2) {
                        }
                    }).then(function (zomdata2) {
                        // validation if there is data to show
                        if (zomdata2.results_found > 0) {

                            for (var i = 0; i < 10; i++) {

                                var $restList = $("<ul>");
                                $restList.addClass("list-group");

                                // Add the newly created element to the DOM
                                $("#rest-deets").append($restList);
                                var restName = zomdata2.restaurants[i].restaurant.name;
                                var $restListItem = $("<li class='list-group-item restaurant' id='" + restName + "'>");
                                $restListItem.append($("<h5>" + restName + "</h5>"));
                                $restListItem.append("<h6>" + zomdata2.restaurants[i].restaurant.location.address);
                                $restListItem.append("<h6>" + "Locality: " + zomdata2.restaurants[i].restaurant.location.locality);
                                $restListItem.append("<h6>" + "Cuisine: " + zomdata2.restaurants[i].restaurant.cuisines);
                                $restListItem.append("<h6>" + "Rating text: " + zomdata2.restaurants[i].restaurant.user_rating.rating_text);
                                $restListItem.append("<h6>" + "Rating number: " + zomdata2.restaurants[i].restaurant.user_rating.aggregate_rating);
                                $restListItem.append("<h6>" + "<a target='_blank' href=" + zomdata2.restaurants[i].restaurant.url + ">" + "Zomato MENU URL" + "</a>");
                                $restListItem.append("<h6>" + "<a target='_blank' href=" + zomdata2.restaurants[i].restaurant.photos_url + ">" + "Zomato PHOTOS URL" + "</a>");
                                $restListItem.append("<i class='far fa-heart heart' id='heart_" + i + "'></i>");
                                $restList.append($restListItem);
                            };






                            // if there is no data to show
                        } else {
                            modal.show();
                            $(".errormessage").text("No data to show");
                        }
                        $(".heart").on("click", function (event) {
                            event.preventDefault();
                            $(".insertFavRest").empty();
                            var state = $(this).attr("heart-state");


                            if (state === "empty") {
                                $(this).removeClass("far");
                                $(this).addClass("fas");
                                $(this).attr("heart-state", "full");
                                $(".restaurant").click(function () {
                                    var restNameText = $(this).attr("id");
                                    $(".insertFavRest").empty();
                                    $(".insertFavRest").append(restNameText);
                                });
                                $(".heart").hide();
                                $(this).show();
                            } else {
                                $(this).addClass("far");
                                $(this).removeClass("fas");
                                $(this).attr("heart-state", "empty");
                                $(".restaurant").click(function () {
                                    var restNameText = "";
                                    $(".insertFavRest").empty();
                                    $(".insertFavRest").append("Your LIKED event goes HERE");
                                });
                                $(".heart").show();

                            }
                        });

                    });

                });
            });

            // if input fields empty
        } else
            if (userLocationInput.length === 0) {
                modal.show();
                $(".errormessage").text("Please enter a city");
            }
            else
                if (userStateInput === "") {
                    modal.show();
                    $(".errormessage").text("Please select the state");
                };

        // modal closing
        $(".close").on("click", function () {
            modal.hide();
        });

        // heart
        $(".heart").on("click", function (event) {
            event.preventDefault();

            $(this).removeClass("far");
            $(this).addClass("fas");
        });
    })
})