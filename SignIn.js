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

firebase.auth().onAuthStateChanged((user) => {
    // document.getElementsByClassName('loading')[0].style.display = 'block';

    document.getElementsByClassName('button_div')[0].innerHTML = `<div class="loading">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        window.location.href = "Profile.html"
        document.getElementsByTagName('a')[2].innerHTML = 'Profile'
        console.log(firebase.auth().currentUser.uid);
    } else {
        // User is signed out
        // ...
        console.log("NO acc");
        // document.getElementsByClassName('loading')[0].style.display = 'none';
        document.getElementsByClassName('button_div')[0].innerHTML =
            `<button type="button" class="btn btn-primary" onclick="SignUp()">Sign In</button>`;
    }
});

function Creat() {
    window.location.href = "SinIn.html"
}

function SignUp() {

    var EmailId = document.getElementsByClassName('form-control')[1].value;
    var PassWord = document.getElementsByClassName('form-control')[2].value;

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
    // document.getElementsByClassName('loading')[0].style.display = 'block';

    document.getElementsByClassName('button_div')[0].innerHTML =
        `<div class="loading">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`

    firebase.auth().signInWithEmailAndPassword(EmailId, PassWord)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            console.log(auth.currentUser.uid);
            window.location.href = "Profile.html"
            localStorage.setItem('sign', '0');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
            console.log(errorCode);
            document.getElementsByClassName('loading')[0].style.display = 'none';
            document.getElementsByClassName('dis')[0].style.display = 'block';
            document.getElementsByClassName('text_al')[0].innerHTML = errorMessage;
            document.getElementsByClassName('button_div')[0].innerHTML =
                `<button type="button" class="btn btn-primary" onclick="SignUp()">Sign In</button>`;
        });
}