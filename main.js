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

firebase.database().ref('items/NewsFeet').once('value', (snapshot) => {

    snapshot.forEach(
        function(Childsnapshot) {
            let description = Childsnapshot.val().description;
            let imageUrl = Childsnapshot.val().imageUrl;
            let price = Childsnapshot.val().price;
            let item = Childsnapshot.val().item;
            let status = Childsnapshot.val().status;
            let Key = Childsnapshot.key;

            //View Details

            let TextView;

            if (status == '0') {
                if (item == '1') {
                    TextView = 'Available';
                } else {
                    TextView = 'Temporary Unavailable';
                }
            } else {
                TextView = 'Sold Out';
            }



            let div1 = document.getElementsByClassName('container');
            let createElement = document.createElement('p');
            createElement.innerHTML =
                `
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="` + imageUrl + `" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                        <center>
                            <h5 class="card-title">` + price + `</h5>
                            <p class="card-text">` + description + `.</p><br>
                            <p class="card-text"><small class="text-muted">` + TextView + `</small></p>
                        </center>  
                    </div>
                  </div>
                </div>
              </div>
            `

            div1[0].appendChild(createElement);
        });
    // document.getElementsByClassName('loading')[0].style.display = 'none';
});