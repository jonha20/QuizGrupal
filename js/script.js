// // Array para almacenar los contactos//
// let contactos = JSON.parse(localStorage.getItem('contactos')) ||[];
// document.querySelector("form").addEventListener("submit", function(event) {
//  event.preventDefault();
    
// Obtener valores de el formulario//
//  const nuevoContacto = {
//      username: document.getElementById("username").value,
//      email: document.getElementById("email").value,
//      password: document.getElementById("password").value,
//     }
//     contactos.push(nuevoContacto)
//     localStorage.setItem("contactos", JSON.stringify(contactos));
//     })

var firebaseConfig = {
    apiKey: "AIzaSyBjTSABchzKfRpzqMCvUiZT-c-0GTCAtnc",
    authDomain: "pruebadatabase-7e515.firebaseapp.com",
    projectId: "pruebadatabase-7e515",
    storageBucket: "pruebadatabase-7e515.firebasestorage.app",
    messagingSenderId: "299548159984",
    appId: "1:299548159984:web:6493e90ad4f315439ff735",
    measurementId: "G-TBR64S993K",
  };
  
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
