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

    var email = prompt("Enter email to login")
    var password = prompt("Enter password to login")
    //todo creat new user/ existing user, dpending on selection it will send you to create an account or sign-in
    //todo use local storage to see if use has an account already
    var database = firebase.database();
    //! Start Email/Password Login (Existing User)
    $("#existingUser").on("click", function () { 
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
    });
});
    //! End of Email/Password Login (Existing User)
    //! This is to create the Email/Password Login
    $("#createUser").on("click", function () {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    });
    //! End create Email/Password Login

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

    var name = "Shakira";

    $("#savedDest1").on("click", function () {
        console.log(name);
        database.ref().push({
            name: name
        });
    });
});