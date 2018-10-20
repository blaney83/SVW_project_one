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


    // ? This is the firebase given popup for Google sign in function
    // //Sign-In with Google Redirect page
    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope("user");
    // provider.addScope("email");
    // provider.addScope("https://www.googleapis.com/auth/plus.me");

    // firebase.auth().signInWithPopup(provider).then(function (result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;

    //     console.log("Function")
    // }).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     console.log(error);
    // });
    // ? End the firebase given popup for Google sign in function

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
                "name": destName,
                "address": destInput
            };
            
            database.ref().push(newDest);
            
        });

        
        //Adds new destination button
        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val().name);

            var destName = childSnapshot.val().name
            
            var $newDest = $("<button>").addClass("favButts").attr("id", destName).text(destName);
            
            $("#new-destinations").append($newDest);
            
            console.log($newDest);
            
            $("form").trigger("reset");
    });
});