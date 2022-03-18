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

var FirebaseDatabase = firebase.database().ref('items/slider1');



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        // document.getElementsByTagName('a')[2].innerHTML = 'Profile'
        document.getElementsByClassName("nav-link")[2].innerHTML = 'Profile'
        console.log(firebase.auth().currentUser.uid);
    } else {
        // User is signed out
        // ...
        console.log("NO acc");
    }
});

FirebaseDatabase.once('value', (snapshot) => {
    let i = 0;

    snapshot.forEach(
        function(Childsnapshot) {
            let ref = Childsnapshot.val().ref;
            let imageUrl = Childsnapshot.val().imageUrl;
            let price = Childsnapshot.val().price;

            let div1 = document.getElementsByClassName('carousel-inner');
            let createElement = document.createElement('div');

            if (i == 0) {
                createElement.className = 'carousel-item active';
                createElement.innerHTML =
                    `
                <img src="` + imageUrl + `" width="300px">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Rs ` + price + `</h5>
                    <p>` + ref + `.</p>
                </div>
            `

            } else {
                createElement.className = 'carousel-item';
                createElement.innerHTML =
                    `
                    <img src="` + imageUrl + `" width="300px">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Rs ` + price + `</h5>
                        <p>` + ref + `.</p>
                    </div> 
            `

            }

            div1[0].appendChild(createElement);
            i++;
        });

});