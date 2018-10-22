
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

    //Creating an account
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

    //Sign-in to account
    function signInFn() {
        event.preventDefault();

        var email = $("#emailLogin").val().trim();
        var password = $("#passwordLogin").val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password);
    };

    var userUID;
    var userPath;
    var destName;

    //This will auto-sign in.
    function authStateChangeListener(user) {
        var userID = firebase.auth().currentUser.displayName
        userUID = firebase.auth().currentUser.uid
        userPath = database.ref("users/" + userUID)
        //signin
        if (user) {
            //perform login operations
            event.preventDefault();
            //change login visibility
            $(".signInPage").css({ "opacity": "0" })
            $(".signInPage").css({ "z-index": "0" })

            console.log("Welcome Back " + userID);

        } else {
            signout
        };
        //Calling exisitng saved destinations
        return userPath.on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val().name);

            destName = childSnapshot.val().name

            var $newDest = $("<button>").addClass("favButts btns").attr("id", destName).text(destName);

            $("#new-destinations").append($newDest);

            $("form").trigger("reset");
        });
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
    //todo This is a work in progress to get saved buttons to access saved address.  Current issue is getting these buttons to run at all, due to the fact that the buttons are set up through an asychronus function, so when it comes time to run the .on("click", function) it doesn't read the buttons.  Will look into this tomorrow.  May possibly roll into Monday, because I have to work tomorrow.
    // //Will pull address from saved destination, and run to see desired time and weather.
    // $("#School").on("click", function () {
    //     event.preventDefault();

    //     console.log("test");
    //     userID = firebase.auth().currentUser.displayName
    //     userUID = firebase.auth().currentUser.uid
    //     userPath = database.ref("users/" + userUID)

    //     return userPath.on("child_added", function (childSnapshot) {
    //         destAddy = childSnapshot.val().address

    //         console.log(destAddy);

    //     });
    // });

    //Saves information for new destination
    $("#dest-btn").on("click", function (event) {
        event.preventDefault();

        var destInput = $("#dest-input").val().trim();
        var destName = $("#dest-name").val().trim();
        var newDest = {
            "name": destName,
            "address": destInput
        };

        userPath.push(newDest);

    });

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
        alert("Your browser doesnt support Geolocation Services :(")
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
        // console.log(navigator.geolocation)
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
            };
        });
    };
    //reverse geocoding the current coordinates to create a physical address for current location ^^^^^^^^^^^^^^^^^^^^

    //WORKING ON MAPS/DISTANCE MATRIX API ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

});

