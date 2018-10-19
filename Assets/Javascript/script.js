// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqTulegEmK-HXtVXBF1Cq_Z9OGasmKJoE",
    authDomain: "svw-project-one.firebaseapp.com",
    databaseURL: "https://svw-project-one.firebaseio.com",
    projectId: "svw-project-one",
    storageBucket: "svw-project-one.appspot.com",
    messagingSenderId: "59061588756"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "Shakira";


$("#savedDest1").on("click", function () {
    console.log(name);
    database.ref().push({
        name: name
    });
});





// Create the XHR object.
// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//       // XHR for Chrome/Firefox/Opera/Safari.
//       xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//       // XDomainRequest for IE.
//       xhr = new XDomainRequest();
//       xhr.open(method, url);
//     } else {
//       // CORS not supported.
//       xhr = null;
//     }
//     return xhr;
//   }
  
//   // Helper method to parse the title tag from the response.
//   function getTitle(text) {
//     return text.match('<title>(.*)?</title>')[1];
//   }
  
//   // Make the actual CORS request.
//   function makeCorsRequest() {
//     // This is a sample server that supports CORS.
//     var distanceMatrixAPIKey = "AIzaSyCnld7M2q0X9q22-OcTXrb-UBdfKxKDs2s"
//     var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=" + distanceMatrixAPIKey
  
//     var xhr = createCORSRequest('GET', url);
//     if (!xhr) {
//       alert('CORS not supported');
//       return;
//     }
  
//     // Response handlers.
//     xhr.onload = function() {
//       var text = xhr.responseText;
//       var title = getTitle(text);
//       alert('Response from CORS request to ' + url + ': ' + title);
//       console.log(response)
//     };
  
//     xhr.onerror = function() {
//       alert('Woops, there was an error making the request.');
//     };
  
//     xhr.send();
//   }

  var distanceMatrixAPIKey = "AIzaSyCnld7M2q0X9q22-OcTXrb-UBdfKxKDs2s"
  var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=" + distanceMatrixAPIKey

  var myLatLng = { lat: 40.741895, lng: 40.741895};

  // Create a DirectionsService object to use the route method and get a result for our request
  var directionsService = new google.maps.DirectionsService();
  
  
  // Define calcRoute function
  function calcRoute() {
      //create request
      var request = {
          origin: { lat: 40.741895, lng: 40.741895},
          // document.getElementById("location-1").value,
          destination: { lat: 10.741895, lng: 10.741895},
          // document.getElementById("location-2").value,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
      }
  
      // Routing
      directionsService.route(request, function (result, status) {
        console.log("listening")
          if (status == google.maps.DirectionsStatus.OK) {
  
              //Get distance and time            
              
              $("#output").html("<div class='result-table'> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
              // document.getElementById("output").style.display = "block";
              console.log(result.routes[0].legs[0].distance.text)
              console.log(result.routes[0].legs[0].duration.text)
              //display route
          } else {
              //delete route from map
              directionsDisplay.setDirections({ routes: [] });
              //center map in London
              map.setCenter(myLatLng);
  
              //Show error message           
             
              alert("Can't find road! Please try again!");
              clearRoute();
          }
      });
  
  }
  
  // Clear results
  
  function clearRoute(){
      document.getElementById("output").style.display = "none";
      document.getElementById("location-1").value = "";
      document.getElementById("location-2").value = "";
      directionsDisplay.setDirections({ routes: [] });
      
  }

  calcRoute()
  
  // Create autocomplete objects for all inputs
  
  var options = {
      types: ['(cities)']
  }
  
  
  var input1 = document.getElementById("location-1");
  var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  
  var input2 = document.getElementById("location-2");
  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
  