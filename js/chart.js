// INICIALIZAR FIREBASE
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

function fetchFirebaseData() {
  return db
    .collection("resultados")
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      renderChart(data);
    })
    .catch((error) => {
      console.error("Error al obtener datos de Firebase:", error);
    });
}

function renderChart(data) {
  const labels = data.map((item) => item.Nombre);
  const scores = data.map((item) => item.Aciertos);

  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Puntajes",
          data: scores,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    },
  });
}

fetchFirebaseData();
