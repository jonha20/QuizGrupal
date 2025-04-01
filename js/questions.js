// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBjTSABchzKfRpzqMCvUiZT-c-0GTCAtnc",
  authDomain: "pruebadatabase-7e515.firebaseapp.com",
  projectId: "pruebadatabase-7e515",
  storageBucket: "pruebadatabase-7e515.firebasestorage.app",
  messagingSenderId: "299548159984",
  appId: "1:299548159984:web:6493e90ad4f315439ff735",
  measurementId: "G-TBR64S993K",
};

//firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

//const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

function paintQuestions(dataset) {
  document.getElementById("questions-section").innerHTML = "";
  document.getElementById("questions-section").innerHTML = `
           <article>
          <p>${dataset.question}</p>
        </article> `;
  document.getElementById("answer-section").innerHTML = "";

  const allAnswers = [dataset.correct_answer, ...dataset.incorrect_answers];
  const shuffledAnswers = shuffleArray([...allAnswers]);

  document.getElementById("answer-section").innerHTML = `
    
    ${shuffledAnswers
      .map(
        (answer) =>
          `<li onclick="checkAnswer('${answer}', '${dataset.correct_answer}')">${answer}</li>`
      )
      .join("")}
      `;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function checkAnswer(selectedAnswer, correctAnswer) {
  const listItems = document.querySelectorAll("#answer-section li");

  listItems.forEach((item) => {
    item.classList.remove("selected", "incorrect");
    if (item.textContent === selectedAnswer) {
      item.classList.add(
        selectedAnswer === correctAnswer ? "selected" : "incorrect"
      );
    }
    if (item.textContent === correctAnswer) {
      item.classList.add("selected");
    }
  });

  // Mostrar feedback
  if (selectedAnswer == null) {
  } else {
    if (selectedAnswer === correctAnswer) {
      alert("¡Correcto!"); // feedback.innerHTML = "<p style='color:green;'>¡Correcto! 😊</p>";
    } else {
      alert("Incorrecto, la respuesta correcta era: " + correctAnswer);
      /*feedback.innerHTML =
      "<p style='color:red;'>Incorrecto. La respuesta correcta es <strong>" +
      correctAnswer +
      "</strong>.</p>";*/
    }
  }
}
// Habilitar visualmente el botón de siguiente

async function getData() {
  try {
    // 1 - Obtención de datos
    const response = await fetch("../json/questions.json");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }
    let currentQuestionIndex = 0;
    let contadorPreguntas = 1;
    const data = await response.json();

    // Tratamiento + representar gráficamente los datos. Pasos 2-3
    document.getElementById("next-button").addEventListener("click", () => {
      document.getElementById(
        "pregunta"
      ).innerHTML = `Pregunta ${contadorPreguntas}/10`;
      console.log(data.results[currentQuestionIndex]);
      paintQuestions(data.results[currentQuestionIndex]);
      checkAnswer(data.results[currentQuestionIndex]);
      if (currentQuestionIndex >= 9) {
        // Fin del quiz
        alert("Quiz completado!");
      }
      currentQuestionIndex++;
      contadorPreguntas++;
    });
  } catch (error) {
    // Manejar el error de manera personalizada
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData();
