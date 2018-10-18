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