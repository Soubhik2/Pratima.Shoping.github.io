const firebaseConfig = {
    apiKey: "AIzaSyCFb4bVBAWTF6JDy_7QZrI8rU_6jBxo7Bo",
    authDomain: "online-app-a440d.firebaseapp.com",
    databaseURL: "https://online-app-a440d-default-rtdb.firebaseio.com",
    projectId: "online-app-a440d",
    storageBucket: "online-app-a440d.appspot.com",
    messagingSenderId: "436158401586",
    appId: "1:436158401586:web:3e8588a8a4bdc1c75c402b",
    measurementId: "G-TFXW24ZZVV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function Creat() {
    window.location.href = "SinIn.html"
}

function SignUp() {

    var EmailId = document.getElementsByClassName('form-control')[0].value;
    var PassWord = document.getElementsByClassName('form-control')[1].value;

    /** 
        firebase.auth().createUserWithEmailAndPassword(EmailId, PassWord)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(auth.currentUser.uid);

                // firebase.database().ref('Users/'+id)

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage);
                console.log(errorCode);
                // ..
            });*/

    firebase.auth().signInWithEmailAndPassword(EmailId, PassWord)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            console.log(auth.currentUser.uid);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
            console.log(errorCode);
        });
}