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

// console.log(firebase.auth().currentUser.uid);

var Uid, ordersCount, emailId, userName, phoneNumber, Count, item, imageUrl, price, imageUrlPorfile, passWord, description, ref, status1;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        console.log('Uid ' + firebase.auth().currentUser.uid);
        Uid = firebase.auth().currentUser.uid

        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on("value", function(snapshot) {
            ordersCount = snapshot.val().ordersCount;
            emailId = snapshot.val().emailId;
            userName = snapshot.val().userName;
            phoneNumber = snapshot.val().phoneNumber;
            imageUrlPorfile = snapshot.val().imageUrl;
            passWord = snapshot.val().passWord;

            // console.log("Uid 1 " + userName);
            // console.log("Uid 1 " + emailId);
            // console.log("Uid 1 " + phoneNumber);
            // console.log("Uid 1 " + ordersCount);
        });

    } else {
        // User is signed out
        // ...
        console.log("NO acc");
        window.location.href = 'old_items.html'
    }
});


firebase.database().ref('AcountData/Orders').on("value", function(snapshot) {
    Count = snapshot.val().count;

    // console.log("count " + Count);
});

var FirebaseDatabase = firebase.database().ref('items').child(localStorage.getItem("item_name"));

FirebaseDatabase.once("value", function(snapshot) {
    description = snapshot.child(localStorage.getItem("Key_Value")).val().description;
    imageUrl = snapshot.child(localStorage.getItem("Key_Value")).val().imageUrl;
    price = snapshot.child(localStorage.getItem("Key_Value")).val().price;
    item = snapshot.child(localStorage.getItem("Key_Value")).val().item;
    ref = snapshot.child(localStorage.getItem("Key_Value")).val().ref;
    status1 = snapshot.child(localStorage.getItem("Key_Value")).val().status;

    let fieldset1 = document.getElementsByClassName('img_box');
    let createElement = document.createElement('p');
    createElement.innerHTML =
        `
                <img id="Img-1" src="` + imageUrl + `" width="300px">
            `

    fieldset1[0].appendChild(createElement);

    document.getElementById('text1').innerHTML = "price: " + price;
    document.getElementById('text2').innerHTML = description;

    if (status1 == '0') {
        if (item == '1') {
            document.getElementsByClassName('container')[0].innerHTML =
                `<center>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Order now
            </button>
        </center>`;
        } else {
            document.getElementsByClassName('container')[0].innerHTML =
                `<center>
            <div class="alert alert-warning   d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
                <div>
                    Temporary Unavailable
                </div>
            </div>
        </center>`;
        }
    } else {
        document.getElementsByClassName('container')[0].innerHTML =
            `<center>
    <div class="alert alert-danger  d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
        <div>
            Sold Out
        </div>
    </div>
</center>`;
    }

    // document.getElementsByClassName('loading')[0].style.display = 'none';

    /**  https://firebase.google.com/docs/auth/web/manage-users */

    // console.log(description);
    // console.log(imageUrl);
    // console.log(price);
    // console.log("Uid 1 " + Uid);
}).then(() => {
    document.getElementsByClassName('loading')[0].style.display = 'none';
});

function button_buy() {
    // document.getElementsByClassName('loading')[0].style.display = 'block';
    // console.warn("New output");

    document.getElementsByClassName('modal-footer')[0].innerHTML = `<div class="loading">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`

    console.log("Uid 1 " + userName);
    console.log("Uid 1 " + emailId);
    console.log("Uid 1 " + phoneNumber);
    console.log("Uid 1 " + ordersCount);

    console.log("count " + Count);

    console.log(imageUrl);
    console.log("Uid 1 " + Uid);

    let sum = parseInt(ordersCount) + 1;
    let id = sum.toString();

    let sum1 = parseInt(Count) + 1;
    let id1 = sum1.toString();

    let sum2 = parseInt(item) - 1;
    let id2 = sum2.toString();

    firebase.database().ref("Orders").child("Users").child(Uid).child(id).set({
        emailId: emailId,
        imageUrl: imageUrl,
        item: item,
        key: localStorage.getItem("Key_Value"),
        phoneNumber: phoneNumber,
        price: price,
        ref: localStorage.getItem("item_name"),
        status: "0",
        userName: userName,
    }).then(() => {
        firebase.database().ref("Orders").child("Owner").child(id1).set({
            key: id,
            ref: Uid,
            status: "0",
            userName: userName,
        }).then(() => {
            firebase.database().ref("AcountData").child("Orders").set({
                count: id1,
            }).then(() => {
                firebase.database().ref("Users").child(Uid).set({
                    emailId: emailId,
                    imageUrl: imageUrlPorfile,
                    ordersCount: id,
                    passWord: passWord,
                    phoneNumber: phoneNumber,
                    userId: Uid,
                    userName: userName,
                }).then(() => {
                    firebase.database().ref("items").child(localStorage.getItem("item_name")).child(localStorage.getItem("Key_Value")).set({
                        description: description,
                        imageUrl: imageUrl,
                        item: id2,
                        price: price,
                        ref: ref,
                        status: status1,
                    }).then(() => {
                        setTimeout(() => {
                            document.getElementsByClassName('loading')[0].style.display = 'none';
                            window.location.href = 'OnSuccess.html';
                        }, 3000);
                    });
                });
            });
        });
    });









}