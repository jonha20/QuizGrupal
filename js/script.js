const firebaseConfig = {
  apiKey: "AIzaSyBWb1Dn92SCNUbWnn6SWQVF4UaMxypPm9s",
  authDomain: "quiz-grupal.firebaseapp.com",
  projectId: "quiz-grupal",
  storageBucket: "quiz-grupal.firebasestorage.app",
  messagingSenderId: "589625917984",
  appId: "1:589625917984:web:2c7a74a3ccfeff9bfef245"
};
firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

//**********AUTHENTICATION**********
const createUser = (user) => {
  db.collection("users")
    .add(user)
    .then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error));
};

const signUpUser = ( email, password) => {
firebase
  .auth()
  .createUserWithEmailAndPassword( email, password)
  .then((userCredential) => {
    // Signed in
    let user = userCredential.user;
    console.log(`se ha registrado ${user.email} ID:${user.uid}`)
    alert(`se ha registrado ${user.email} ID:${user.uid}`)
    // ...
    // Saves user in firestore
    createUser({
      email: user.email,
      id: user.id,
    });

  })
  .catch((error) => {
    console.log("Error en el sistema" + error.message, "Error: " + error.code);
  });
};


document.getElementById("form1").addEventListener("submit", function (event) {
event.preventDefault();
let email = event.target.elements.email.value;
let pass = event.target.elements.pass.value;
let pass2 = event.target.elements.pass2.value;
let error="";
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.,-])[A-Za-z\d@$!%*?&_.,-]{8,}$/;
//....//
if (emailRegex.test(email)) {
} else {
  alert((error += "Formato email incorrecto\n"));

}
if (passwordRegex.test(pass)) {
} else {
  alert((error += "Formato contraseña incorrecto\n"));
}

pass === pass2 ? signUpUser( email, pass) : alert("error password");
})



const signInUser = (email, password) => {
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    let user = userCredential.user;
    console.log(`se ha logado ${user.email} ID:${user.uid}`)
    alert(`se ha logado ${user.email} ID:${user.uid}`)
    console.log("USER", user);
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
}


const signOut = () => {
let user = firebase.auth().currentUser;

firebase.auth().signOut().then(() => {
  console.log("Sale del sistema: " + user.email)
}).catch((error) => {
  console.log("hubo un error: " + error);
});
}
document.getElementById("btn").addEventListener("click", function (event) {
  sessionStorage.removeItem("usuarios");
  let nombre = prompt("Introduzca su nombre")
  const formData = {
    name: nombre
  };
  let usuarios = sessionStorage.getItem("usuarios") || "[]"; 
  usuarios = JSON.parse(usuarios);
  usuarios.push(formData);
  sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
  window.location.href = "./questions.html";
})

document.getElementById("form2").addEventListener("submit", function (event) {
event.preventDefault();
let email = event.target.elements.email2.value;
let pass = event.target.elements.pass3.value;
let nombre = email.split("@")
signInUser(email, pass)
sessionStorage.removeItem("usuarios");
  const formData = {
    name: nombre[0]
  };
  let usuarios = sessionStorage.getItem("usuarios") || "[]"; 
  usuarios = JSON.parse(usuarios);
  usuarios.push(formData);
  sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
window.location.href = "./questions.html";
})
document.getElementById("salir").addEventListener("click", signOut);

// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
if (user) {
  console.log(`Está en el sistema:${user.email} ${user.uid}`);
} else {
  console.log("no hay usuarios en el sistema");
}
});



