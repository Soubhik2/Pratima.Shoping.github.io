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

// firebase.auth().onAuthStateChanged((user) => {
//     document.getElementsByClassName('loading')[0].style.display = 'block';
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         var uid = user.uid;
//         // ...
//         window.location.href = "Profile.html"
//         document.getElementsByTagName('a')[2].innerHTML = 'Profile'
//         console.log(firebase.auth().currentUser.uid);
//     } else {
//         // User is signed out
//         // ...
//         console.log("NO acc");
//         document.getElementsByClassName('loading')[0].style.display = 'none';
//     }
// });

function Creat() {
    window.location.href = "SinIn.html"
}

function SignUp() {
    var UserName = document.getElementsByClassName('form-control')[1].value;
    var EmailId = document.getElementsByClassName('form-control')[2].value;
    var PassWord = document.getElementsByClassName('form-control')[3].value;
    var PhoneNumber = document.getElementsByClassName('form-control')[4].value;

    document.getElementsByClassName('loading')[0].style.display = 'block';

    console.log(UserName);
    console.log(EmailId);
    console.log(PassWord);
    console.log(PhoneNumber);

    firebase.auth().createUserWithEmailAndPassword(EmailId, PassWord)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(auth.currentUser.uid);

            let ImageUrl = "https://firebasestorage.googleapis.com/v0/b/online-app-a440d.appspot.com/o/empty-profile.png?alt=media&token=9d884c2e-e9ab-4ac0-9d28-cd7ec5ba917f";

            firebase.database().ref('Users/' + auth.currentUser.uid).set({
                userName: UserName,
                emailId: EmailId,
                passWord: PassWord,
                userId: auth.currentUser.uid,
                phoneNumber: PhoneNumber,
                imageUrl: ImageUrl,
                ordersCount: "0",
            }).then(() => {
                window.location.href = "Profile.html"
                localStorage.setItem('sign', '1');
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
            console.log(errorCode);
            document.getElementsByClassName('loading')[0].style.display = 'none';
            document.getElementsByClassName('dis')[0].style.display = 'block';
            document.getElementsByClassName('text_al')[0].innerHTML = errorMessage;
            // ..
        });
}