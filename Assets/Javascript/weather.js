//ajax calling current weather data for current location

$(document).ready(function () {

    //var longNlatCurrent = $("#longNLatVar")
    var longNlatCurrent = "33.303176,-111.839866"
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiLinkDS = "https://api.darksky.net/forecast/087545328826e2aa2daf703ad2508bfd/" + longNlatCurrent;


    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data)
            // console.log(data.currently.apparentTemperature);

            var current = data.currently.apparentTemperature;

            var currentDiv = $("<div>");

            currentDiv.attr("src", current);

            $("#current").prepend(current);

        }
    });
    // calling weather information for current location
    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data.daily.data[0].apparentTemperatureMax);
            // console.log(data.daily.data[0].apparentTemperatureMin);
            // console.log(data.daily.summary);

            var tempMax = data.daily.data[0].apparentTemperatureMax;

            var maxDiv = $("<div>");

            maxDiv.attr("src", tempMax);

            $("#tempMax").prepend(tempMax);

            var tempMin = data.daily.data[0].apparentTemperatureMin;

            var minDiv = $("<div>");

            minDiv.attr("src", tempMin);

            $("#tempMin").prepend(tempMin);

            var summary = data.daily.summary;

            var summaryDiv = $("<p>");

            summaryDiv.attr("src", summary);

            $("#summary").prepend(summary);

        }
    });

    //weather icons for current location
    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data.daily.icon);
            var icon = data.daily.icon

            var iconDiv = $("<div>");

            iconDiv.attr("src", icon);

            $(".weather").prepend(icon);

            if (icon === "clear-day" || icon === "clear-night") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/sunny-icon.jpg" />');
            }

            if (icon === "rain") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/rain-icon.jpg" />');
            }

            if (icon === "cloudy" || icon === "partly-cloudy-night" || icon === "partly-cloudy-day") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/cloudy-icon.png" />');
            }


            if (icon === "sleet") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/sleet-icon.png" />');
            }

            if (icon === "wind") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/wind-icon.png" />');
            }

            if (icon === "fog") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/fog-icon.png" />');
            }

            if (icon === "hail") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/hail-icon.png" />');
            }

            if (icon === "thunderstorm") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/thunderstorm-icon.png" />');
            }

            if (icon === "tornado") {
                $('.icon-weather').prepend('<img class="icon" src="Assets/images/weather-icons/tornado-icon.png" />');
            }

        }
    })
    // calling weather for destination
    var longNlatDestination = "36.106964,-112.112999"
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiLinkDS = "https://api.darksky.net/forecast/087545328826e2aa2daf703ad2508bfd/" + longNlatDestination;

    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data)
            // console.log(data.currently.apparentTemperature);

            var destination = data.currently.apparentTemperature;

            var destinationDiv = $("<div>");

            destinationDiv.attr("src", destination);

            $("#destination").prepend(destination);

        }
    });
    // calling weather information for destination

    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data.daily.data[0].apparentTemperatureMax);
            // console.log(data.daily.data[0].apparentTemperatureMin);
            // console.log(data.daily.summary);

            var tempMax = data.daily.data[0].apparentTemperatureMax;

            var maxDiv = $("<div>");

            maxDiv.attr("src", tempMax);

            $("#tempMaxDestination").prepend(tempMax);

            var tempMin = data.daily.data[0].apparentTemperatureMin;

            var minDiv = $("<div>");

            minDiv.attr("src", tempMin);

            $("#tempMinDestination").prepend(tempMin);

            var summary = data.daily.summary;

            var summaryDiv = $("<p>");

            summaryDiv.attr("src", summary);

            $("#summaryDestination").prepend(summary);

        }
    });

    //weather icons for destination
    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            // console.log(data.daily.icon);
            var icon = data.daily.icon

            var iconDiv = $("<div>");

            iconDiv.attr("src", icon);

            $(".weatherDestination").prepend(icon);

            if (icon === "clear-day" || icon === "clear-night") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/sunny-icon.jpg" />');
            }

            if (icon === "rain") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/rain-icon.jpg" />');
            }

            if (icon === "cloudy" || icon === "partly-cloudy-night" || icon === "partly-cloudy-day") {
                $('.icon-destination').prepend('<img class="icon" src="Assets/images/weather-icons/cloudy-icon.png" />');
            }


            if (icon === "sleet") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/sleet-icon.png" />');
            }

            if (icon === "wind") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/wind-icon.png" />');
            }

            if (icon === "fog") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/fog-icon.png" />');
            }

            if (icon === "hail") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/hail-icon.png" />');
            }

            if (icon === "thunderstorm") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/thunderstorm-icon.png" />');
            }

            if (icon === "tornado") {
                $('.icon-destination').prepend('<img class="icon-destination" src="Assets/images/weather-icons/tornado-icon.png" />');
            }

        }
    })
});  