// Array para almacenar los contactos//
let contactos = JSON.parse(localStorage.getItem('contactos')) ||[];
document.querySelector("form").addEventListener("submit", function(event) {
 event.preventDefault();
    
// Obtener valores de el formulario//
 const nuevoContacto = {
     username: document.getElementById("username").value,
     email: document.getElementById("email").value,
     password: document.getElementById("password").value,
    }
    contactos.push(nuevoContacto)
    localStorage.setItem("contactos", JSON.stringify(contactos));
    })


   