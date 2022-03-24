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

var FirebaseDatabase = firebase.database().ref('items/All');

FirebaseDatabase.once('value', (snapshot) => {

    snapshot.forEach(
        function(Childsnapshot) {
            let description = Childsnapshot.val().description;
            let imageUrl = Childsnapshot.val().imageUrl;
            let price = Childsnapshot.val().price;

            let div1 = document.getElementsByClassName('container');
            let createElement = document.createElement('p');
            createElement.innerHTML =
                `
            <div class="card" style="width: 18rem;">
                <img src="` + imageUrl + `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Rs ` + price + `</h5>
                    <p class="card-text">` + description + `</p>
                    <br><a href="App_download.html" class="btn btn-primary">Order Now</a>
                </div>
            </div>
            `

            div1[0].appendChild(createElement);
        });
    document.getElementsByClassName('loading')[0].style.display = 'none';
});

/*
FirebaseDatabase.orderByChild('ref').equalTo('sharee').on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        // console.log(data.key);
        console.log(data.val().description);
    });
});*/