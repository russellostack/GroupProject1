


$(document).ready(function () {

    var queryLocationURL = "https://developers.zomato.com/api/v2.1/locations";

    $("#sumbitCityState").on("click", function (event) {
        event.preventDefault();

        var userLocationInput = $("#city").val().trim();
        var userStateInput = $("#state").val();
        var userCityState = userLocationInput + " " + userStateInput;

        // console.log("user state: " + userStateInput);
        // console.log("user location input: " + userLocationInput);
        // console.log("city state: " + userCityState);

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

    });
});


