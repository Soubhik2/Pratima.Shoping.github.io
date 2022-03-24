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

var FirebaseDatabase = firebase.database().ref('items').child(localStorage.getItem("item_name"));

var arr = [];
var i = 0;

FirebaseDatabase.once('value', (snapshot) => {

    snapshot.forEach(
        function(Childsnapshot) {
            let description = Childsnapshot.val().description;
            let imageUrl = Childsnapshot.val().imageUrl;
            let price = Childsnapshot.val().price;
            let item = Childsnapshot.val().item;
            let status = Childsnapshot.val().status;
            let Key = Childsnapshot.key;

            //View Details

            let ButtonView, ButtonTextView;

            if (status == '0') {
                if (item == '1') {
                    ButtonView = 'btn-primary';
                    ButtonTextView = 'View Details';
                } else {
                    ButtonView = 'btn-warning';
                    ButtonTextView = 'Temporary Unavailable';
                }
            } else {
                ButtonView = 'btn-dark';
                ButtonTextView = 'Sold Out';
            }

            arr[i] = Key;

            let div1 = document.getElementsByClassName('container');
            let createElement = document.createElement('p');
            createElement.innerHTML =
                `
            <div class="card" style="width: 18rem;">
                <img src="` + imageUrl + `" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Rs ` + price + `</h5>
                    <p class="card-text">` + description + `</p>
                    <br><a href="#" onclick="ButtonClick(` + Key + `)" class="btn ` + ButtonView + `">` + ButtonTextView + `</a>
                </div>
            </div>
            `

            div1[0].appendChild(createElement);
            i++;
        });
    document.getElementsByClassName('loading')[0].style.display = 'none';
});

function ButtonClick(key_val) {
    console.log(key_val);
    localStorage.setItem('Key_Value', key_val);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
            console.log(firebase.auth().currentUser.uid);
            window.location.href = 'web_side.html';
        } else {
            // User is signed out
            // ...
            console.log("NO acc");
            window.location.href = 'old_items.html'
        }
    });
}