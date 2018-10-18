$(document).ready(function () {

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiLinkDS = "https://api.darksky.net/forecast/087545328826e2aa2daf703ad2508bfd/33.303176,-111.839866";

    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            console.log(data)
            console.log(data.currently.apparentTemperature);
            
            var current = data.currently.apparentTemperature;

            var currentDiv = $("<div>");

            currentDiv.attr("src", current);

            $("#current").prepend(current);

        }
    });

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiLinkDS = "https://api.darksky.net/forecast/087545328826e2aa2daf703ad2508bfd/33.303176,-111.839866";

    $.ajax({
        url: proxy + apiLinkDS,
        success: function (data) {
            console.log(data.daily.data[0].apparentTemperatureMax);
          console.log(data.daily.data[0].apparentTemperatureMin);
          console.log(data.daily.summary);

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

});  