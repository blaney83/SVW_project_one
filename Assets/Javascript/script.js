
$(document).ready(function () {

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


    //? Sign-in or create account functions below
    function createAccount() {
        event.preventDefault();
        console.log("wooo")
        var displayID = $("#userNameEntry").val().trim();
        var email = $("#emailEntry").val().trim();
        var password = $("#passwordEntry").val().trim();

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            //add the display name after the user is done being created 
            firebase.auth().currentUser.updateProfile({ displayName: displayID });
        });

    };

    function signInFn() {
        event.preventDefault();
        var email = $("#emailLogin").val().trim();
        var password = $("#passwordLogin").val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password);
    };


    function authStateChangeListener(user) {
        var userID = firebase.auth().currentUser.displayName
        //signin
        if (user) {
            //perform login operations
            event.preventDefault();
            //change login visibility
            $(".signInPage").css({ "opacity": "0" })
            $(".signInPage").css({ "z-index": "0" })
            // Chat.onlogin();
            // Game.onlogin();
            console.log("Welcome Back " + userID);
        } else {
            // signout
            // window.location.reload();
        };
    };

    $(document).on("submit", "#signUp", createAccount)

    $(document).on("submit", "#signIn", signInFn)

    firebase.auth().onAuthStateChanged(authStateChangeListener);

    //Display Current Time  
    function getTime() {
        var currentTime = moment().format("hh:mm a");
        $("#time").text(currentTime);
    }

    function setTime() {
        setInterval(getTime, 1000);
    }

    setTime();

    //Currently set to show communication to firebase DB, will set to contain address, or coordinates of saved location.
    var name = "Oops, I did it again!";

    $("#savedDest1").on("click", function () {
        console.log(name);
    });

    //Saves information for new destination
    $("#dest-btn").on("click", function (event) {
        event.preventDefault();
        // var countDestinations = 0;

        // countDestinations++;

        var destInput = $("#dest-input").val().trim();
        var destName = $("#dest-name").val().trim();
        var newDest = {
            name: destName,
            address: destInput
        };

        database.ref("/savedDestination:" + destName).push(newDest);


    });
    //     //Adds new destination button
    //     database.ref().on("child_added", function (childSnapshot) {
    //         console.log(childSnapshot.val());

    //         var $newDest = $("<button>").addClass("favButts").attr("id", destName).text(destName);

    //         $("#new-destinations").append($newDest);

    //         console.log($newDest);

    //         $("form").trigger("reset");
    // });


    //WORKING ON MAPS/DISTANCE MATRIX API VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    //this is the Distance Matrix API Code
    var currentLatitude;
    var currentLongitude;
    var currentPhysicalAddress;
    var destLatitude;
    var destLongitude;
    // Create a DirectionsService object to use the route method and get a result for our request
    var directionsService = new google.maps.DirectionsService();
    //run Geo initialization outright
    initGeoCode();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            var geocoder = new google.maps.Geocoder();
            //once everything is set and variables defined, then we run the reverse geocoding to get our current street address VVVVVVVVVVV
            geocodeLatLng(geocoder);
        }, function () {
            //runs if they dont allow geo location
            alert("please active your geolocation services!!! turd.")
        });
    } else {
        // Browser doesn't support Geolocation
        alert("Your browser doesnt support Geolocation Services:(")
    }

    // Define calcRoute function
    function calcRoute() {
        //create request
        console.log(destLatitude)
        var request = {
            origin: { lat: currentLatitude, lng: currentLongitude },
            // document.getElementById("location-1").value,
            destination: { lat: destLatitude, lng: destLongitude },
            // document.getElementById("location-2").value,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        }
        console.log(request.destination)
        // Routing
        directionsService.route(request, function (result, status) {
            console.log("listening")
            if (status == google.maps.DirectionsStatus.OK) {
                //Get distance and time amd display           
                $("#trip-info-target").append("Distance= " + result.routes[0].legs[0].distance.text + "<br> Duration: " + result.routes[0].legs[0].duration.text)
                console.log(result.routes[0].legs[0].distance.text)
                console.log(result.routes[0].legs[0].duration.text)
                //display route
            } else {
                //Show error message           
                alert("Can't find road! Please try again!");
            }
        });
    }

    //holds the newly initialized asynchronous geocoder call upon init()
    var destGeocoder;

    function initGeoCode() {
        destGeocoder = new google.maps.Geocoder();
    }

    function calculateAddressCoordinates() {
        var address = $("#dest-input").val().trim();
        destGeocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                destCoordinates = results[0].geometry.location
                destLatitude = destCoordinates.lat()
                destLongitude = destCoordinates.lng()   
            } else {
                alert('Geocode was not successful. Please re-enter your address or business name. Unsuccessful for the following reason: ' + status);
            }
            //invoking the route calculation
            calcRoute()
        });
    }

    //unltimately has all of the other functionality chained to this event listener
    $("#dest-btn").on("click", calculateAddressCoordinates)
    //geocoding the user address ^^^^^^^^^^

    //reverse geocoding the current coordinates to create a physical address for current location VVVVVVVVVVVVVVVVVVV
    var destGeocoder = new google.maps.Geocoder();

    function geocodeLatLng(geocoder) {

        var latlng = { lat: parseFloat(currentLatitude), lng: parseFloat(currentLongitude) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    currentPhysicalAddress = results[0].formatted_address
                    //display the coordinates and address where we are
                    $("#GPS").text("lat: " + currentLatitude + " lng: " + currentLongitude + " address: " + currentPhysicalAddress);

                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    //reverse geocoding the current coordinates to create a physical address for current location ^^^^^^^^^^^^^^^^^^^^

    //WORKING ON MAPS/DISTANCE MATRIX API ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


});

