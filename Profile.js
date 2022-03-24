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

var ordersCount, emailId, userName, phoneNumber, imageUrlPorfile, passWord;

if (localStorage.getItem('sign') == '1') {
    var toastTrigger = document.getElementById('liveToastBtn')
    var toastLiveExample = document.getElementById('liveToast1')
    console.warn('toast.show')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
} else {
    var toastTrigger = document.getElementById('liveToastBtn')
    var toastLiveExample = document.getElementById('liveToast2')
    console.warn('toast.show')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        // window.location.href = "Profile.html"
        // document.getElementsByTagName('a')[2].innerHTML = 'Profile'
        console.log(firebase.auth().currentUser.uid);

        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on("value", function(snapshot) {
            ordersCount = snapshot.val().ordersCount;
            emailId = snapshot.val().emailId;
            userName = snapshot.val().userName;
            phoneNumber = snapshot.val().phoneNumber;
            imageUrlPorfile = snapshot.val().imageUrl;
            passWord = snapshot.val().passWord;

            console.log("Uid 1 " + userName);
            console.log("Uid 1 " + emailId);
            console.log("Uid 1 " + phoneNumber);
            console.log("Uid 1 " + ordersCount);

            document.getElementsByTagName('span')[1].innerHTML = '<img src="' + imageUrlPorfile + '" class="img-1">';
            document.getElementsByTagName('font')[1].innerHTML = userName;
        });
    } else {
        // User is signed out
        // ...
        console.log("NO acc");
    }
});

function Logout() {
    // document.getElementsByClassName('loading')[0].style.display = 'block';
    document.getElementsByClassName('about-img')[1].innerHTML =
        `<div class="spinner-border text-warning" role="status">
<span class="visually-hidden">Loading...</span>
</div>`
    setTimeout(() => {
        firebase.auth().signOut().then(() => {
            document.getElementsByClassName('about-img')[1].innerHTML =
                `<div class="alert alert-primary" role="alert">Logout successful.</div>`;

            setTimeout(() => {
                window.location.href = "old_items.html";
            }, 2000);
        }).catch((error) => {
            console.log(error.message);
        });
    }, 2000);

}