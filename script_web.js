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
    document.getElementsByClassName('loading')[0].style.display = 'none';

    /**  https://firebase.google.com/docs/auth/web/manage-users */

    // console.log(description);
    // console.log(imageUrl);
    // console.log(price);
    // console.log("Uid 1 " + Uid);
});

function button_buy() {
    document.getElementsByClassName('loading')[0].style.display = 'block';
    console.warn("New output");

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
    });

    firebase.database().ref("Orders").child("Owner").child(id1).set({
        key: id,
        ref: Uid,
        status: "0",
        userName: userName,
    });

    firebase.database().ref("AcountData").child("Orders").set({
        count: id1,
    });

    firebase.database().ref("Users").child(Uid).set({
        emailId: emailId,
        imageUrl: imageUrlPorfile,
        ordersCount: id,
        passWord: passWord,
        phoneNumber: phoneNumber,
        userId: Uid,
        userName: userName,
    });

    firebase.database().ref("items").child(localStorage.getItem("item_name")).child(localStorage.getItem("Key_Value")).set({
        description: description,
        imageUrl: imageUrl,
        item: id2,
        price: price,
        ref: ref,
        status: status1,
    });

    setTimeout(() => {
        document.getElementsByClassName('loading')[0].style.display = 'none';
        window.location.href = 'OnSuccess.html';
    }, 4000);
}