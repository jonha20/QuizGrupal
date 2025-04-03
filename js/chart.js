// INICIALIZAR FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBWb1Dn92SCNUbWnn6SWQVF4UaMxypPm9s",
  authDomain: "quiz-grupal.firebaseapp.com",
  projectId: "quiz-grupal",
  storageBucket: "quiz-grupal.firebasestorage.app",
  messagingSenderId: "589625917984",
  appId: "1:589625917984:web:2c7a74a3ccfeff9bfef245",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

db.collection("partidas")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });

function fetchFirebaseData() {
  return db
    .collection("partidas")
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        data.push({
          name: docData.name,
          aciertos: docData.aciertos || 0,
        });
      });

      console.log("Datos obtenidos:", data); // <-- Verificar en consola

      renderChart(data);
    })
    .catch((error) => {
      console.error("Error al obtener datos de Firebase:", error);
    });
}

function renderChart(data) {
  const labels = data.map((item) => item.name);
  const scores = data.map((item) => item.aciertos);

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
